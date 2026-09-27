/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const OUTPUT_FILE = path.join(
  process.cwd(),
  "src",
  "lib",
  "cloudinary-assets.json"
);
async function getAllResources(resourceType) {
  const resources = [];

  let nextCursor;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: resourceType,
      prefix: "fostiima/",
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources.push(...result.resources);

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
}

function buildFolderObject(resources) {
  const root = {};

  for (const resource of resources) {
    const publicId = resource.public_id;

    const parts = publicId.split("/");

    if (parts[0] === "fostiima") {
      parts.shift();
    }

    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      if (isLast) {
        current[part] = {
          type: resource.resource_type,
          format: resource.format,
          publicId: resource.public_id,
          url: resource.secure_url,
          width: resource.width,
          height: resource.height,
        };
      } else {
        if (!current[part]) {
          current[part] = {};
        }

        current = current[part];
      }
    });
  }

  return root;
}

async function main() {
  console.log("☁️ Fetching Cloudinary assets...\n");

  const [images, videos, raw] = await Promise.all([
    getAllResources("image"),
    getAllResources("video"),
    getAllResources("raw"),
  ]);

  const allResources = [...images, ...videos, ...raw];

  console.log(`🖼️ Images: ${images.length}`);
  console.log(`🎥 Videos: ${videos.length}`);
  console.log(`📄 Raw/PDF: ${raw.length}`);
  console.log(`📦 Total: ${allResources.length}\n`);

  const folderObject = buildFolderObject(allResources);

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(folderObject, null, 2),
    "utf8"
  );

  console.log(`✅ Saved: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("\n❌ Cloudinary Error:");
  console.error(error);
  process.exit(1);
});