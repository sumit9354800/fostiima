import "dotenv/config";
import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import path from "node:path";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("❌ Cloudinary environment variables missing.");
}

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const backupDir = path.resolve("backups/cloudinary");
await fs.mkdir(backupDir, { recursive: true });

const manifest = [];
const failures = [];

async function downloadAsset(asset) {
  const extension = asset.format ? `.${asset.format}` : "";
  const relativePath = path.join(
    asset.resource_type,
    `${asset.public_id}${extension}`
  );
  const destination = path.join(backupDir, relativePath);

  await fs.mkdir(path.dirname(destination), { recursive: true });

  const response = await fetch(asset.secure_url);

  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destination, bytes);

  const stat = await fs.stat(destination);

  if (stat.size !== asset.bytes) {
    throw new Error(
      `Size mismatch for ${asset.public_id}: expected ${asset.bytes}, got ${stat.size}`
    );
  }

  manifest.push({
    public_id: asset.public_id,
    asset_id: asset.asset_id,
    resource_type: asset.resource_type,
    format: asset.format,
    bytes: asset.bytes,
    secure_url: asset.secure_url,
    local_path: relativePath,
    verified_size: stat.size,
  });

  console.log(`✅ ${asset.resource_type}: ${asset.public_id}`);
}

for (const resourceType of ["image", "video", "raw"]) {
  let nextCursor;

  do {
    const result = await cloudinary.v2.api.resources({
      resource_type: resourceType,
      type: "upload",
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });

    for (const asset of result.resources ?? []) {
      try {
        await downloadAsset(asset);
      } catch (error) {
        failures.push({
          public_id: asset.public_id,
          resource_type: resourceType,
          error: String(error),
        });
        console.error(`❌ ${asset.public_id}: ${String(error)}`);
      }
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);
}

await fs.writeFile(
  path.join(backupDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

await fs.writeFile(
  path.join(backupDir, "failures.json"),
  JSON.stringify(failures, null, 2)
);

console.log("\n========== BACKUP SUMMARY ==========");
console.log(`✅ Downloaded and size-verified: ${manifest.length}`);
console.log(`❌ Failed: ${failures.length}`);
console.log(`📁 Backup location: ${backupDir}`);

if (failures.length > 0) {
  process.exitCode = 1;
}