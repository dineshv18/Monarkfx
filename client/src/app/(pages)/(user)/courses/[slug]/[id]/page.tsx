import { getCourse } from "@/lib/api";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Metadata } from "next";
import CourseLayout from "./components/CourseLayout";
import { CourseDataNew } from "@/type";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const courseData = await getCourse(params.slug);
    return {
      title: courseData.metaTitle || `${courseData.title} | Monark FX`,
      description:
        courseData.metaDesc || `Learn ${courseData.title} on Monark FX`,
    };
  } catch {
    return {
      title: "Course Not Found | Monark FX",
      description: "The requested course could not be found",
    };
  }
}

export default async function CoursePage({ params }: Props) {
  try {
    const courseData: CourseDataNew = await getCourse(params.slug);
    return <CourseLayout initialCourseData={courseData} slug={params.slug} />;
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 font-plus-jakarta-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d72638' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#D72638]/10 to-[#A01020]/10 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#D72638]/10 to-[#A01020]/10 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 max-w-md w-full space-y-8 text-center">
          <div className="bg-white border border-[#E8E8E8] rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden backdrop-blur-sm">
            <div className="bg-[#FFF0F2] border-b border-[#E8E8E8] p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#D72638] rounded-full">
                  <AlertTriangle className="h-16 w-16 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-4">
                Course Not Found
              </h2>
              <p className="text-[#4A4A4A] font-inter">
                We couldn&apos;t find the course you&apos;re looking for. It
                might have been removed or is no longer available.
              </p>
            </div>

            <div className="p-8 space-y-4">
              <div className="bg-[#FFF0F2] border border-[#E8E8E8] rounded-xl p-4">
                <p className="text-[#A01020] text-sm">
                  The course may have been moved, deleted, or you may have an
                  incorrect URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/courses"
                  className="w-full sm:w-auto px-6 py-3 bg-[#D72638] hover:bg-[#A01020] text-white rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Browse Courses
                </a>

                <button
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E8E8E8] hover:border-[#D72638] text-[#4A4A4A] hover:text-[#D72638] rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-[#4A4A4A]">
                  Need help? Contact our support team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
