import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCardProps } from "@/type";
import { TrendingUp, Crown, Flame, Clock } from "lucide-react";
import { formatDate, formatPrice } from "@/helper/FormatPrice";

export default function EnhancedCourseCard({ course }: CourseCardProps) {
  const isFree = !course.paid;

 

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg font-plus-jakarta-sans">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}`}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Course Tags */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 font-inter">
              {isFree ? (
                <Badge className="bg-green-500 text-white font-semibold px-3 py-1">
                  Free Course
                </Badge>
              ) : (
                <Badge className="bg-blue-500 text-white font-semibold px-3 py-1">
                  Premium
                </Badge>
              )}
            </div>

            {/* Feature Tags */}
            <div className="absolute right-3 top-3 flex flex-col gap-2 font-inter">
              {course.isTrending && (
                <Badge className="bg-orange-500 text-white font-semibold flex items-center gap-1 px-3 py-1">
                  <TrendingUp className="w-3 h-3" /> Trending
                </Badge>
              )}
              {course.isPopular && (
                <Badge className="bg-purple-500 text-white font-semibold flex items-center gap-1 px-3 py-1">
                  <Flame className="w-3 h-3" /> Popular
                </Badge>
              )}
              {course.isBestseller && (
                <Badge className="bg-yellow-500 text-white font-semibold flex items-center gap-1 px-3 py-1">
                  <Crown className="w-3 h-3" /> Bestseller
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-grow flex-col gap-4 p-5">
          <div>
            <CardTitle className="mb-2 text-xl font-bold text-gray-800 line-clamp-2">
              {course.title}
            </CardTitle>
            {course.language && (
              <Badge variant="outline" className="mb-3 capitalize">
                {course.language}
              </Badge>
            )}
            <CardDescription className="text-sm text-gray-600 line-clamp-3 font-inter">
              {parse(course.description)}
            </CardDescription>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-5 border-t">
          <div className="flex items-center gap-3">
            {isFree ? (
              <span className="text-lg font-bold text-green-600">
                Free Access
              </span>
            ) : (
              <div className="flex flex-col">
                {course.salePrice && course.salePrice < course.price ? (
                  <>
                    <span className="text-lg font-bold text-[#601b79]">
                      {formatPrice(course.salePrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(course.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-[#601b79]">
                    {formatPrice(course.price)}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {course.createdAt ? formatDate(course.createdAt) : "N/A"}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
