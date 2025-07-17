import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CourseLoading from "./loading";

const CourseClient = dynamic(() => import("./course-client"), {
  ssr: false,
  loading: () => <CourseLoading />,
});

type Props = {
  params: { slug: string };
};

async function getCourse(slug: string) {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API URL not configured");
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/course/get-course-page/${slug}?v=${Date.now()}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch course: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "Failed to fetch course",
      data: null,
    };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseData = await getCourse(params.slug);
  const defaultTitle = "MonarkFX - Global Trading Excellence";
  const defaultDesc =
    "Empower your financial future with expert trading education in stocks, forex, and cryptocurrency.";

  if (courseData.error || !courseData.data) {
    return {
      title: "Course Not Found | " + defaultTitle,
      description: defaultDesc,
    };
  }

  const { data } = courseData;
  const ogImage = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.thumbnail}`;

  return {
    title: data.metaTitle || data.title || defaultTitle,
    description: data.metaDesc || defaultDesc,
    openGraph: {
      title: data.title,
      description: data.metaDesc || defaultDesc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDesc || defaultDesc,
      images: [ogImage],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const courseData = await getCourse(params.slug);

  if (courseData.error || !courseData.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black font-plus-jakarta-sans">
        <div className="max-w-md w-full space-y-8 text-center p-6">
          <div className="flex flex-col items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-yellow-400 animate-bounce" />
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
              Course Not Found
            </h1>
            <p className="mt-4 text-gray-600">
              The course you're looking for might have been moved or deleted.
            </p>
            <a
              href="/courses"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent
                text-base font-medium rounded-md shadow-sm text-white bg-blue-600
                hover:bg-blue-700 transition-colors duration-200 ease-in-out"
            >
              Explore Trading Courses
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<CourseLoading />}>
      <CourseClient initialCourseData={courseData.data} slug={params.slug} />
    </Suspense>
  );
}
