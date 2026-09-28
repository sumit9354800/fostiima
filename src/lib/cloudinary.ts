import assets from "./cloudinary-assets.json";

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
    .replace(
      /\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF|pdf|PDF)$/i,
      ""
    );

  const parts = cleanPath.split("/").filter(Boolean);

  let current: unknown = assets;

  for (const part of parts) {
    if (!isObject(current) || !(part in current)) {
      return path;
    }

    current = current[part];
  }

if (isObject(current) && typeof current.url === "string") {
  return current.url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto/"
  );
}

  return path;
}