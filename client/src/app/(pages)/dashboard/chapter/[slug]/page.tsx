import { Metadata } from "next";
import CourseChapters from "../../_components/chapters/CourseChapters";

const formatSlugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const title = formatSlugToTitle(params.slug);

  return {
    title: `${title} - Course Management`,
    description: `Manage chapters for ${title}`,
  };
}

export default function CourseManagement({
  params,
}: {
  params: { slug: string };
}) {
  const SectionSlug = formatSlugToTitle(params.slug);

  return (
    <div className="py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{SectionSlug}</h1>
        <p className="text-gray-400">Manage chapters and course content</p>
      </div>
      <CourseChapters sectionSlug={params.slug} />
    </div>
  );
}
