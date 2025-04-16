"use client";

import {
  motion,
  useSpring,
  MotionValue,
  AnimatePresence,
  useTransform,
  useScroll,
  useInView,
  useMotionTemplate,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Send,
  Phone,
  Mail,
  Clock,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  CreditCard,
  ChevronRight,
  Sparkles,
  Book,
  Users,
  ExternalLink,
  Zap,
  Copy,
  Check,
  MessageSquare,
  X,
} from "lucide-react";
import Image from "next/image";
import Background from "../../_components/Background";
import { toast } from "sonner";
import axios from "axios";

// Custom cursor variants
const cursorVariants = {
  default: {
    height: 32,
    width: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 59, 59, 0.3)",
    x: "-50%",
    y: "-50%",
  },
  text: {
    height: 64,
    width: 64,
    backgroundColor: "rgba(255, 59, 59, 0.1)",
    border: "1px solid rgba(255, 59, 59, 0.6)",
    x: "-50%",
    y: "-50%",
  },
  button: {
    height: 48,
    width: 48,
    backgroundColor: "rgba(255, 59, 59, 0.3)",
    border: "1px solid rgba(255, 59, 59, 0.8)",
    x: "-50%",
    y: "-50%",
  },
  hover: {
    height: 80,
    width: 80,
    backgroundColor: "rgba(255, 59, 59, 0.05)",
    border: "1px solid rgba(255, 59, 59, 0.4)",
    x: "-50%",
    y: "-50%",
  },
};

const greetings = [
  { text: "Welcome to MonarkFX!", lang: "English" },
  { text: "मोनार्क FX में आपका स्वागत है!", lang: "Hindi" },
  { text: "¡Bienvenido a MonarkFX!", lang: "Spanish" },
  { text: "Bienvenue sur MonarkFX!", lang: "French" },
  // { text: "Benvenuti su MonarkFX!", lang: "Italian" },
  // { text: "MonarkFXへようこそ!", lang: "Japanese" },
  // { text: "MonarkFX에 오신 것을 환영합니다!", lang: "Korean" },
  // { text: "Välkommen till MonarkFX!", lang: "Swedish" },
  // { text: "Willkommen bei MonarkFX!", lang: "German" },
  // { text: "Bem-vindo ao MonarkFX!", lang: "Portuguese" }
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Branch",
    details: "Uttam Nagar, New Delhi, India",
    link: "https://maps.app.goo.gl/your-location-link-here",
    info: "Visit us for in-person consultations and course enrollments",
  },
  {
    icon: MapPin,
    title: "Branch Office",
    details: "Dashrath Puri, New Delhi, India",
    link: "https://maps.app.goo.gl/your-second-location-link-here",
    info: "Our expansion location serving more students in the Delhi region",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 9220797499 / +91 9773927706",
    link: "tel:+919220797499",
    info: "Our representatives are available during business hours",
    copyable: true,
  },
  {
    icon: Mail,
    title: "Email Us",
    details: (
      <>
        service@monarkfx.com
        <br />
        monarkfx@gmail.com
      </>
    ),
    rawDetails: "service@monarkfx.com",
    link: "mailto:service@monarkfx.com",
    info: "We typically respond within 24 business hours",
    copyable: true,
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sat: 9AM to 6PM",
    info: "Classes run throughout the day in scheduled batches",
  },
  {
    icon: Globe,
    title: "Website",
    details: "www.monarkfx.com",
    link: "https://www.monarkfx.com",
    info: "Explore our courses and trading resources online",
  },
];

const socialMedia = [
  {
    name: "Instagram",
    icon: Instagram,
    handle: "@monarkfx / @monarkfx_community",
    link: "https://instagram.com/monarkfx",
    color: "from-pink-500 to-orange-500",
    bgStart: "#E1306C",
    bgEnd: "#F56040",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    handle: "Monark FX™ - Financial Market Institute",
    link: "https://linkedin.com/company/monarkfx",
    color: "from-blue-600 to-blue-800",
    bgStart: "#0077B5",
    bgEnd: "#0A66C2",
  },
  {
    name: "Facebook",
    icon: Facebook,
    handle: "Monark FX™ - Financial Market Institute",
    link: "https://facebook.com/monarkfx",
    color: "from-blue-500 to-blue-700",
    bgStart: "#1877F2",
    bgEnd: "#166FE5",
  },
  {
    name: "Twitter",
    icon: Twitter,
    handle: "Monark FX™",
    link: "https://twitter.com/monarkfx",
    color: "from-blue-400 to-blue-600",
    bgStart: "#1DA1F2",
    bgEnd: "#0D8FD8",
  },
];

const paymentOptions = [
  {
    method: "Cash Payment",
    description: "Available at our branches",
    icon: "💵",
  },
  {
    method: "UPI Transfer",
    description: "Scan QR code for instant payment",
    icon: "📱",
  },
  {
    method: "One-shot Payment",
    description: "Get 10% discount on full payment",
    icon: "💯",
  },
];

const courseInfo = [
  {
    name: "STP Course",
    description: "Smart Trader Profile - 2-month duration across four levels",
    icon: "/icons/stocks-icon.png",
    color: "#FF3A3A",
    features: [
      "Stock Market Focus",
      "Technical Analysis",
      "Risk Management",
      "Portfolio Building",
    ],
  },
  {
    name: "FCH Course",
    description: "Forex Crypto Hustler - 2-month duration across four levels",
    icon: "/icons/forex-icon.png",
    color: "#FF4D00",
    features: [
      "Global Markets",
      "Cryptocurrency Trading",
      "Forex Strategies",
      "Technical Analysis",
    ],
  },
];

// New component for contact info cards with 3D effect
const ContactCard = ({ info, index }: { info: any; index: number }) => {
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    if (info.copyable) {
      navigator.clipboard.writeText(
        info.rawDetails ||
          (typeof info.details === "string" ? info.details : "")
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Copied to clipboard!");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${
              (mousePosition.y - (cardRef.current?.offsetHeight || 0) / 2) / 20
            }deg) rotateY(${
              -(mousePosition.x - (cardRef.current?.offsetWidth || 0) / 2) / 20
            }deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: isHovered ? "none" : "transform 0.5s ease",
      }}
      className="group bg-white p-8 rounded-2xl shadow-lg border border-red-50 hover:border-red-200 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
    >
      {/* Hover gradient effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 59, 59, 0.1) 0%, transparent 70%)`
            : "none",
        }}
      />

      {/* Decorative background element */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

      <div className="flex items-start space-x-4 relative z-10">
        <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white shadow-md shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
          <info.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-gray-900 mb-2">
              {info.title}
            </h3>
            {info.copyable && (
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-red-600 transition-colors p-1"
              >
                {isCopied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </motion.button>
            )}
          </div>
          {info.link ? (
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 mt-1 hover:text-red-600 transition-colors flex items-center"
            >
              {info.details}
              <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
            </a>
          ) : (
            <p className="text-gray-600 mt-1">{info.details}</p>
          )}
          <p className="text-gray-500 text-sm mt-3 italic">{info.info}</p>
        </div>
      </div>

      {/* Top corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-0.5 h-7 bg-red-200 group-hover:h-14 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-7 h-0.5 bg-red-200 group-hover:w-14 transition-all duration-500"></div>
      </div>

      {/* Bottom shine effect on hover */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-[-1px] transition-all duration-700"></div>
    </motion.div>
  );
};

// Social card with enhanced 3D effects
const SocialCard = ({ platform, index }: { platform: any; index: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = platform.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      ref={cardRef}
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${
              (mousePosition.y - (cardRef.current?.offsetHeight || 0) / 2) / 20
            }deg) rotateY(${
              -(mousePosition.x - (cardRef.current?.offsetWidth || 0) / 2) / 20
            }deg) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: isHovered ? "none" : "transform 0.5s ease",
      }}
      className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
    >
      {/* Hover gradient effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${
                mousePosition.y
              }px, rgba(${
                platform.name === "Instagram"
                  ? "225, 48, 108"
                  : platform.name === "LinkedIn"
                  ? "0, 119, 181"
                  : platform.name === "Facebook"
                  ? "24, 119, 242"
                  : "29, 161, 242"
              }, 0.1) 0%, transparent 70%)`
            : "none",
        }}
      />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white via-transparent to-transparent"></div>

      {/* Decorative bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-6 relative z-10">
        <div
          className={`p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          style={{
            background: `linear-gradient(to bottom right, ${platform.bgStart}, ${platform.bgEnd})`,
          }}
        >
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 mb-1">
            {platform.name}
          </h3>
          <p className="text-gray-600">{platform.handle}</p>
        </div>

        {/* Animated arrow on hover */}
        <motion.div
          className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ x: isHovered ? [0, 5, 0] : 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ExternalLink className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.a>
  );
};

export default function ContactPage() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("contact"); // contact, social, payment, courses
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ type: "user" | "agent"; message: string }>
  >([{ type: "agent", message: "Hi there! How can I help you today?" }]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Reference for scroll behavior
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse position tracking for custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Spring animations for smoother movements
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.8, 0.5]);

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Functions to handle cursor variants
  const handleTextEnter = () => setCursorVariant("text");
  const handleButtonEnter = () => setCursorVariant("button");
  const handleHoverEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/create`,
        formData
      );
      if (response.data?.message) {
        toast.success(response.data.data || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tab navigation animation
  const tabVariants = {
    active: {
      color: "#dc2626",
      fontWeight: 600,
      backgroundColor: "rgba(254, 226, 226, 0.5)",
    },
    inactive: {
      color: "#6b7280",
      fontWeight: 400,
      backgroundColor: "transparent",
    },
  };

  // Add new function to handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { type: "user", message: chatInput }]);
    setChatInput("");

    // Simulate agent typing
    setIsTyping(true);

    // Simulate response after delay
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "agent",
          message:
            "Thanks for reaching out! Our team will get back to you shortly. For faster assistance, please call us at +91 9220797499 or email service@monarkfx.com.",
        },
      ]);
    }, 2000);
  };

  // Scroll to the bottom of chat when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  return (
    <>
      <Background
        title="Get in"
        highlightedText="Touch"
        subtitle="We'd love to hear from you"
      />

      <main className="bg-white overflow-hidden relative">
        {/* Custom cursor */}
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
          style={{
            left: mouseX,
            top: mouseY,
          }}
        />

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-400/10 to-transparent blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-0 top-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-l from-red-500/5 to-transparent blur-3xl"
            animate={{
              x: [0, -100, 0],
              scale: [0.8, 1, 0.8],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Floating Chat Button */}
        <motion.button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg shadow-red-500/20 flex items-center justify-center"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.25)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="font-semibold">MonarkFX Support</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.type === "user"
                            ? "bg-red-600 text-white rounded-tr-none"
                            : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                            style={{ animationDelay: "200ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                            style={{ animationDelay: "400ms" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleChatSubmit}
                className="p-3 border-t border-gray-200 bg-white"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-xl flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
          {/* Greeting Animation */}
          <motion.div
            key={currentGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-16 text-center"
            onMouseEnter={handleTextEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 via-transparent to-red-50/50 rounded-3xl backdrop-blur-sm" />

            <div className="relative">
              <motion.p
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent py-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {greetings[currentGreeting].text}
              </motion.p>
              <motion.div
                className="mt-6 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 text-sm font-medium border border-red-200">
                  {greetings[currentGreeting].lang}
                </span>
              </motion.div>
            </div>

            {/* Add decorative elements */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-red-100/80 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-20 right-20 w-24 h-24 bg-orange-100/70 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute bottom-4 left-[30%] w-32 h-32 bg-pink-100/70 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-8 p-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-100 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.button
                animate={activeTab === "contact" ? "active" : "inactive"}
                variants={tabVariants}
                onClick={() => setActiveTab("contact")}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleMouseLeave}
                className="py-3 px-6 rounded-full transition-all hover:bg-red-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Info
              </motion.button>
              <motion.button
                animate={activeTab === "social" ? "active" : "inactive"}
                variants={tabVariants}
                onClick={() => setActiveTab("social")}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleMouseLeave}
                className="py-3 px-6 rounded-full transition-all hover:bg-red-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Social Media
              </motion.button>
              <motion.button
                animate={activeTab === "payment" ? "active" : "inactive"}
                variants={tabVariants}
                onClick={() => setActiveTab("payment")}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleMouseLeave}
                className="py-3 px-6 rounded-full transition-all hover:bg-red-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Payment Options
              </motion.button>
              <motion.button
                animate={activeTab === "courses" ? "active" : "inactive"}
                variants={tabVariants}
                onClick={() => setActiveTab("courses")}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleMouseLeave}
                className="py-3 px-6 rounded-full transition-all hover:bg-red-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Course Info
              </motion.button>
            </motion.div>
          </div>

          {/* Tab Content */}
          <div className="mb-20">
            <AnimatePresence mode="wait">
              {/* Contact Info Tab */}
              {activeTab === "contact" && (
                <motion.div
                  key="contact-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {contactInfo.map((info, index) => (
                    <ContactCard key={info.title} info={info} index={index} />
                  ))}
                </motion.div>
              )}

              {/* Social Media Tab */}
              {activeTab === "social" && (
                <motion.div
                  key="social-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  {socialMedia.map((platform, index) => (
                    <SocialCard
                      key={platform.name}
                      platform={platform}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}

              {/* Payment Options Tab */}
              {activeTab === "payment" && (
                <motion.div
                  key="payment-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-10 rounded-2xl shadow-lg border border-red-50 backdrop-blur-sm"
                >
                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Payment Options
                        </h3>
                      </div>

                      <ul className="space-y-8">
                        {paymentOptions.map((option, index) => (
                          <motion.li
                            key={option.method}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.1 + index * 0.1,
                            }}
                            className="flex items-start gap-4 group"
                            onMouseEnter={handleTextEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 mt-1 group-hover:shadow-md transition-all">
                              <CreditCard className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900 mb-1">
                                {option.method}
                              </h4>
                              <p className="text-gray-600">
                                {option.description}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        className="mt-10 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-5 h-5 text-red-600" />
                          <p className="text-red-700 font-semibold">
                            Special Offer
                          </p>
                        </div>
                        <p className="text-red-700">
                          Payment plans and installment options are available
                          for all courses. Contact our advisors for personalized
                          payment arrangements.
                        </p>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="flex justify-center items-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="p-10 bg-white rounded-2xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center shadow-inner">
                        <motion.div
                          className="w-56 h-56 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center rounded-2xl mb-6 relative overflow-hidden"
                          whileHover={{
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          onMouseEnter={handleButtonEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {/* Placeholder for QR code */}
                          <motion.div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                          <span className="text-gray-500 font-medium">
                            QR Code
                          </span>
                          {/* You can replace this with an actual QR code image */}
                          {/* <Image src="/payment-qr.png" alt="Payment QR Code" width={200} height={200} /> */}
                        </motion.div>
                        <p className="text-center text-gray-700">
                          Scan to make UPI payment
                          <br />
                          <span className="font-semibold text-red-600">
                            @monarkfx
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Course Info Tab */}
              {activeTab === "courses" && (
                <motion.div
                  key="courses-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-10 rounded-2xl shadow-lg border border-red-50 backdrop-blur-sm"
                >
                  <motion.div
                    className="flex items-center gap-3 mb-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
                      <Book className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Course Information
                    </h3>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-10">
                    {courseInfo.map((course, index) => (
                      <motion.div
                        key={course.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{
                          y: -8,
                          boxShadow:
                            "0 25px 50px -12px rgba(249, 40, 40, 0.15)",
                        }}
                        onMouseEnter={handleTextEnter}
                        onMouseLeave={handleMouseLeave}
                        className="p-8 rounded-2xl border border-red-100 hover:border-red-300 transition-all bg-gradient-to-br from-white to-red-50 group relative overflow-hidden"
                      >
                        {/* Decorative background element */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-red-50 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                        <div className="flex items-start gap-6 relative z-10">
                          <div className="p-4 bg-red-100 rounded-2xl shadow-md group-hover:shadow-lg transition-all">
                            {/* Use either actual icon or placeholder */}
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                              {course.name.split(" ")[0][0]}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-2xl text-gray-900 mb-3">
                              {course.name}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {course.description}
                            </p>

                            <motion.button
                              className="mt-6 inline-flex items-center text-red-600 font-medium"
                              whileHover={{ x: 5 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              Learn more{" "}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-12 p-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-red-600" />
                      Contact Our Mentors
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Our team of seven dedicated trading mentors are available
                      to help determine which course best fits your trading
                      goals. Schedule a consultation today to discuss your
                      options and begin your trading journey.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-red-50 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full opacity-40"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-50 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseEnter={handleTextEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-red-600 font-medium">
                    Contact Us
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please provide details about your inquiry..."
                      className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none resize-none"
                      required
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl shadow-lg shadow-red-500/20 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={{
                      scale: isSubmitting ? 1 : 1.02,
                      boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.25)",
                    }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    onMouseEnter={handleButtonEnter}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {/* Button background animation on hover */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/0 via-red-300/20 to-red-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <Send
                      className={`w-4 h-4 relative z-10 ${
                        isSubmitting ? "" : "group-hover:translate-x-1"
                      } transition-transform`}
                    />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-red-50 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-50 rounded-full opacity-40"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-50 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseEnter={handleTextEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-red-600 font-medium">
                    Locations
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">
                    Visit Our Branches
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Come meet us in person for a consultation with our expert
                    trainers.
                  </p>
                </motion.div>

                <motion.div
                  className="h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7837997936613!2d77.05616367528806!3d28.606262075679115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05de8d29cab9%3A0x2d77bb4a1742f15c!2sEquity%20Tank%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1740240805113!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-100 hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Head Branch
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Uttam Nagar, New Delhi
                    </p>
                    <a
                      href="#"
                      className="text-sm text-red-600 hover:underline mt-3 inline-flex items-center gap-1 group"
                    >
                      Get Directions
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>

                  <motion.div
                    className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-100 hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Branch Office
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Dashrath Puri, New Delhi
                    </p>
                    <a
                      href="#"
                      className="text-sm text-red-600 hover:underline mt-3 inline-flex items-center gap-1 group"
                    >
                      Get Directions
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
