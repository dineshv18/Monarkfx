import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CourseData } from "@/type";
import { truncateDescription } from "../../dashboard/_components/TruncateDescription";
import { formatPrice } from "@/helper/FormatPrice";

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {


  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md bg-white max-w-sm">
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}`}
          alt={course.title}
          width={300}
          height={170}
          className="w-full h-32 sm:h-36 object-cover"
        />
      </div>
      <CardContent className="p-2.5">
        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-gray-500 text-[11px] mb-2 line-clamp-2">
          {truncateDescription(course?.description)}
        </p>
        <div className="flex justify-end items-center">
          {course.salePrice && course.salePrice < course.price ? (
            <div className="flex flex-col items-end">
              <span className="text-base font-bold text-[#601b79]">
                {formatPrice(course.salePrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(course.price)}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-[#601b79]">
              {formatPrice(course.price)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
