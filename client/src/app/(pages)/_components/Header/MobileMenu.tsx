import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { MobileMenuProps } from "@/type";

const menuVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function MobileMenu({ menuItems, onClose }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/30 z-50 lg:hidden backdrop-blur-sm"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="flex flex-col h-full px-6">
        <div className="flex justify-between items-center py-6 border-b border-[var(--custom-green-4)]">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[var(--custom-green-4)] flex items-center justify-center text-white hover:bg-[var(--custom-green-5)] hover:scale-105 transition-all duration-300"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-6 mt-8">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={menuVariants}
            >
              <Link
                href={item.href}
                className="text-white/90 hover:text-[var(--custom-green-10)] hover:translate-x-2 text-2xl font-medium tracking-wide transition-all duration-300 block"
                onClick={onClose}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
      
        </nav>

        <div className="mt-auto pb-8">
          <div className="flex justify-center space-x-8 py-6">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-[var(--custom-green-7)] hover:text-[var(--custom-green-10)] hover:scale-110 transition-all duration-300"
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>
          <p className="text-center text-[var(--custom-green-7)] text-sm">
            © 2024 All rights reserved
          </p>
        </div>
      </div>
    </motion.div>
  );
}
