"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Star } from "lucide-react";
import { Category } from "@/type";
import { courses } from "./courses";
import Image from "next/image";

const categories: Category[] = ["All", "DEVELOPMENT", "DESIGN", "CLOUD"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CourseListing() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredCourses = courses.filter(
    (course) =>
      selectedCategory === "All" ||
      course.category === selectedCategory.toUpperCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <LayoutGroup>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6">
            <motion.h2
              layout
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 text-center lg:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Popular courses
            </motion.h2>

            {/* Category Tabs */}
            <motion.div
              layout
              className="flex flex-wrap justify-center gap-3 md:gap-4 w-full lg:w-auto"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all font-medium relative text-sm md:text-base
                ${
                  selectedCategory === category
                    ? "text-primary after:w-full"
                    : "text-gray-600 after:w-0"
                }
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-0.5 after:bg-primary 
                after:transition-all after:duration-300
                hover:after:w-full
              `}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Course Grid */}
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layoutId={course.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Course Image */}
                  <div className="relative h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <motion.div
                      className="absolute -bottom-7 right-4 bg-[var(--custom-green-1)] text-white w-16 h-16 rounded-full 
                        font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {formatPrice(course.price)}
                    </motion.div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="uppercase font-medium">
                        {course.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{course.instructor}</span>
                    </div>

                    <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({course.reviews} Reviews)
                      </span>
                    </div>

                    {/* Course Details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{course.lessons} Lessons</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{course.students} Students</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <motion.p
            layout
            className="text-center text-gray-600 mt-8 md:text-lg"
          >
            We help you find the perfect tutor. It's completely free.{" "}
            <motion.a
              href="#"
              className="text-primary hover:underline font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore all courses →
            </motion.a>
          </motion.p>
        </div>
      </LayoutGroup>
    </div>
  );
}
