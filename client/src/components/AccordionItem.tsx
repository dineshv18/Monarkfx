"use client";

import { AccordionItemProps } from "@/type";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function AccordionItem({
  title,
  content,
  icon,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="bg-gray-50/80 rounded-lg max-w-[450px]  mb-5">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 px-6 text-left"
      >
        <span className="text-xl font-medium text-gray-800">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 relative">
              <div className="text-gray-600 text-lg pr-16">{content}</div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -right-2 -top-2 text-4xl opacity-50"
              >
                {icon}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
