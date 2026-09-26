import assets from "@/../cloudinary-assets.json";

type CloudinaryAssetNode = {
  url?: string;
  [key: string]: unknown;
};

function isObject(value: unknown): value is CloudinaryAssetNode {
  return typeof value === "object" && value !== null;
}

export function cloudinaryAsset(path: string): string {
  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF)$/i, "");

  const parts = cleanPath.split("/").filter(Boolean);

  let current: unknown = assets;

  for (const part of parts) {
    if (!isObject(current) || !(part in current)) {
      // Cloudinary mein nahi mila → original public path use karo
      return path;
    }

    current = current[part];
  }

  if (
    isObject(current) &&
    typeof current.url === "string"
  ) {
    return current.url;
  }

  // Mapping incomplete ho to local image break mat karo
  return path;
}