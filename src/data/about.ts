import { cloudinaryAsset } from "@/lib/cloudinary";

export type FounderTrustee = {
  name: string;
  role: string;
  image: string;
};

export const founderTrustees: FounderTrustee[] = [
  {
    name: "Anil Somani",
    role: "Founder Trustee",
    image: cloudinaryAsset("home/faculty/faculty1.webp"),
  },
  {
    name: "Kamal Sharma",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty2"),
  },
  {
    name: "Jaithirth Rao",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty3"),
  },
  {
    name: "Sunil Kala",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty4"),
  },
  {
    name: "Rajesh Kaura",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty5"),
  },
  {
    name: "T L Palani Kumar",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty6"),
  },
  {
    name: "Rajan Shangi",
    role: "Founder Trustee",
    image: cloudinaryAsset("about/trustees-faculty/trustees-faculty7"),
  },
];
