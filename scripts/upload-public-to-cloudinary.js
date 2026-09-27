import { readdirSync } from "fs";
import { join, extname, relative, sep, basename } from "path";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = join(process.cwd(), "public");
const CLOUDINARY_ROOT = "fostiima";

const SKIP_FILES = new Set([
  ".DS_Store",
  ".gitkeep",
  ".gitignore",
]);

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);

const VIDEO_EXTENSIONS = new Set([
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".webm",
]);

const RAW_EXTENSIONS = new Set([
  ".pdf",
]);

function getAllFiles(dir) {
  const entries = readdirSync(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function getResourceType(filePath) {
  const ext = extname(filePath).toLowerCase();

  if (IMAGE_EXTENSIONS.has(ext)) {
    return "image";
  }

  if (VIDEO_EXTENSIONS.has(ext)) {
    return "video";
  }

  if (RAW_EXTENSIONS.has(ext)) {
    return "raw";
  }

  return "raw";
}

function getPublicId(filePath) {
  const relativePath = relative(PUBLIC_DIR, filePath);

  const withoutExtension = relativePath.replace(
    extname(relativePath),
    ""
  );

  return `${CLOUDINARY_ROOT}/${withoutExtension}`
    .split(sep)
    .join("/");
}

async function uploadFile(filePath) {
  const resourceType = getResourceType(filePath);
  const publicId = getPublicId(filePath);

  const relativePath = relative(
    process.cwd(),
    filePath
  );

  console.log(`\n⬆️  Uploading: ${relativePath}`);
  console.log(`   → ${publicId}`);
  console.log(`   → type: ${resourceType}`);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true,
    });

    console.log(`   ✅ Uploaded`);
    console.log(`   🔗 ${result.secure_url}`);

    return {
      success: true,
      filePath,
      url: result.secure_url,
    };
  } catch (error) {
    console.error(`   ❌ FAILED`);
    console.error("   Error:", error);
    console.error("   Message:", error?.message);
    console.error("   HTTP Code:", error?.http_code);
    console.error("   Name:", error?.name);

    return {
      success: false,
      filePath,
      error: error.message,
    };
  }
}

async function main() {
  console.log("\n========================================");
  console.log(" FOSTIIMA → CLOUDINARY UPLOADER");
  console.log("========================================\n");

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_CLOUD_NAME is missing");
  }

  if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error("CLOUDINARY_API_KEY is missing");
  }

  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is missing");
  }

  console.log(
    `☁️  Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`
  );

  console.log(`📁 Source: ${PUBLIC_DIR}`);
  console.log(`📦 Cloudinary root: ${CLOUDINARY_ROOT}\n`);

  const allFiles = getAllFiles(PUBLIC_DIR);

  const files = allFiles.filter((file) => {
    const name = basename(file);

    if (SKIP_FILES.has(name)) {
      console.log(`⏭️  Skipping: ${file}`);
      return false;
    }

    return true;
  });

  console.log(`\n📊 Total files to upload: ${files.length}\n`);

  if (files.length === 0) {
    console.log("Nothing to upload.");
    return;
  }

  const results = [];

  for (const file of files) {
    const result = await uploadFile(file);
    results.push(result);
  }

  const successful = results.filter(
    (result) => result.success
  );

  const failed = results.filter(
    (result) => !result.success
  );

  console.log("\n========================================");
  console.log(" UPLOAD COMPLETE");
  console.log("========================================");

  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`📦 Total: ${results.length}`);

  if (failed.length > 0) {
    console.log("\n❌ FAILED FILES:");

    for (const result of failed) {
      console.log(`- ${result.filePath}`);
      console.log(`  ${result.error}`);
    }
  }

  console.log("\nDone.\n");
}

main().catch((error) => {
  console.error("\n❌ UPLOADER ERROR:");
  console.error(error);
  process.exit(1);
});