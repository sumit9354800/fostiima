import { cloudinaryAsset } from "@/lib/cloudinary";

export type FounderTrustee = {
  name: string;
  image: string;
};

export const founderTrustees: FounderTrustee[] = [
  {
    name: "Anil Somani",
    image: cloudinaryAsset("home/faculty/faculty1.webp"),
  },
  {
    name: "Kamal Sharma",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty2"),
  },
  {
    name: "Jaithirth Rao",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty3"),
  },
  {
    name: "Sunil Kala",
    image: cloudinaryAsset("home/faculty/faculty2.webp"),
  },
  {
    name: "Rajesh Kaura",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty5"),
  },
  {
    name: "T L Palani Kumar",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty6"),
  },
  {
    name: "Rajan Shangi",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty7"),
  },
];
