export type Review = {
  id: string;
  name: string;
  programme: string;
  batch: string;
  rating: number;
  review: string;
  image?: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Student Review",
    programme: "PGDM",
    batch: "2023 - 2025",
    rating: 5,
    review:
      "My experience at FOSTIIMA has been enriching. The faculty, peer learning and industry exposure helped me develop both professionally and personally.",
  },
  {
    id: "review-2",
    name: "Student Review",
    programme: "PGDM",
    batch: "2023 - 2025",
    rating: 5,
    review:
      "The learning environment at FOSTIIMA encourages students to participate, communicate and understand management concepts through practical experiences.",
  },
  {
    id: "review-3",
    name: "Student Review",
    programme: "PGDM",
    batch: "2022 - 2024",
    rating: 5,
    review:
      "The combination of experienced faculty, corporate interaction and campus activities made my overall management education experience valuable.",
  },
];