import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import sharp from "sharp";

const PUBLIC_DIR = join(process.cwd(), "public");

// 2 MB

const MAX_SIZE = 2 * 1024 * 1024;

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
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

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function compressImage(filePath) {
  const extension = extname(filePath).toLowerCase();

  if (!IMAGE_EXTENSIONS.has(extension)) {
    return;
  }

  const beforeSize = statSync(filePath).size;

  // Only compress images larger than 2 MB
  if (beforeSize <= MAX_SIZE) {
    return;
  }

  console.log(`\n🖼️  ${filePath}`);
  console.log(`   Before: ${formatSize(beforeSize)}`);

  const tempPath = `${filePath}.compressed`;

  try {
    const image = sharp(filePath);

    if (extension === ".jpg" || extension === ".jpeg") {
      await image
        .jpeg({
          quality: 82,
          mozjpeg: true,
        })
        .toFile(tempPath);
    }

    if (extension === ".png") {
      await image
        .png({
          compressionLevel: 9,
          quality: 82,
          effort: 10,
        })
        .toFile(tempPath);
    }

    if (extension === ".webp") {
      await image
        .webp({
          quality: 82,
          effort: 6,
        })
        .toFile(tempPath);
    }

    const afterSize = statSync(tempPath).size;

    // Only replace original if compression actually reduced size
    if (afterSize < beforeSize) {
      const fs = await import("fs");

      fs.renameSync(tempPath, filePath);

      console.log(`   After:  ${formatSize(afterSize)}`);
      console.log(
        `   ✅ Saved: ${formatSize(beforeSize - afterSize)}`
      );
    } else {
      const fs = await import("fs");

      fs.unlinkSync(tempPath);

      console.log("   ⚠️ Compression did not reduce size. Original kept.");
    }
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);

    try {
      const fs = await import("fs");

      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch {}
  }
}

async function main() {
  console.log("\n========================================");
  console.log(" FOSTIIMA IMAGE COMPRESSOR");
  console.log("========================================\n");

  console.log(`📁 Source: ${PUBLIC_DIR}`);
  console.log("🎯 Target: Images larger than 2 MB\n");

  const allFiles = getAllFiles(PUBLIC_DIR);

  let imageCount = 0;
  let compressedCount = 0;

  for (const file of allFiles) {
    const extension = extname(file).toLowerCase();

    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    imageCount++;

    const beforeSize = statSync(file).size;

    if (beforeSize > MAX_SIZE) {
      const oldSize = beforeSize;

      await compressImage(file);

      const newSize = statSync(file).size;

      if (newSize < oldSize) {
        compressedCount++;
      }
    }
  }

  console.log("\n========================================");
  console.log(" COMPRESSION COMPLETE");
  console.log("========================================");

  console.log(`🖼️ Images scanned: ${imageCount}`);
  console.log(`✅ Images compressed: ${compressedCount}`);

  console.log("\nDone.\n");
}

main().catch((error) => {
  console.error("\n❌ COMPRESSION ERROR:");
  console.error(error);
  process.exit(1);
});