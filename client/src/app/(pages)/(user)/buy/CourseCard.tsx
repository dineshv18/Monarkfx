import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCardProps } from "@/type";
import { formatPrice } from "@/helper/FormatPrice";
import { getCourseImageUrl } from "@/lib/cloudinary";

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const discount = course.salePrice
    ? Math.round(((course.price - course.salePrice) / course.price) * 100)
    : 0;

  const displayPrice =
    (course.salePrice ?? 0) > 0 ? course.salePrice! : course.price;
  const showOriginalPrice =
    (course.salePrice ?? 0) > 0 && (course.salePrice ?? 0) < course.price;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 bg-zinc-800 border border-green-500/30 rounded-lg">
      {/* Image Container with Overlay */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={getCourseImageUrl(course.thumbnail)}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-black border-0 text-xs px-2 font-bold">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-1">
          {course.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-green-400">
            {formatPrice(displayPrice)}
          </span>
          {showOriginalPrice && (
            <span className="text-xs text-zinc-500 line-through">
              {formatPrice(course.price)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
