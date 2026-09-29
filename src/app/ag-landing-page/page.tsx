import { redirect } from "next/navigation";

type AgLandingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AgLandingPage({
  searchParams,
}: AgLandingPageProps) {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        query.append(key, item);
      });
    } else if (value !== undefined) {
      query.set(key, value);
    }
  });

  const queryString = query.toString();

  redirect(queryString ? `/?${queryString}` : "/");
}