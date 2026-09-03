import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CourseLoading from "./loading";
import { getCourseImageUrl } from "@/lib/cloudinary";

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
      `${process.env.NEXT_PUBLIC_API_URL
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
  const ogImage = getCourseImageUrl(data.thumbnail);

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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="max-w-md w-full space-y-8 text-center p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 bg-red-900/20 rounded-full mb-6">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              Course Not Found
            </h1>
            <p className="mt-4 text-[#737373]">
              The course you&apos;re looking for might have been moved or deleted.
            </p>
            <a
              href="/courses"
              className="mt-8 inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white transition-colors"
              style={{ background: "linear-gradient(135deg, #C79A1E 0%, #A07C16 100%)" }}
            >
              Browse All Courses
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
