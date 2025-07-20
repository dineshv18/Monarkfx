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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-black px-4 py-12 font-plus-jakarta-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 max-w-md w-full space-y-8 text-center">
          <div className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-zinc-700/50 p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                  <AlertTriangle className="h-16 w-16 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Course Not Found
              </h2>
              <p className="text-zinc-300 font-inter">
                We couldn&apos;t find the course you&apos;re looking for. It
                might have been removed or is no longer available.
              </p>
            </div>

            <div className="p-8 space-y-4">
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-300 text-sm">
                  The course may have been moved, deleted, or you may have an
                  incorrect URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/courses"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Browse Courses
                </a>

                <button
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 hover:border-green-500/50 text-zinc-300 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-zinc-500">
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
