import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseData } from "@/type";
import { formatPrice } from "@/helper/FormatPrice";

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const discount = course.salePrice
    ? Math.round(((course.price - course.salePrice) / course.price) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-red-100/50 rounded-lg">
      {/* Image Container with Overlay */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}`}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-600 text-white border-0 text-xs px-2">
            -{discount}%
          </Badge>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {course.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          {course.salePrice && course.salePrice < course.price ? (
            <>
              <span className="text-base font-bold text-red-600">
                {formatPrice(course.salePrice)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(course.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-red-600">
              {formatPrice(course.price)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;