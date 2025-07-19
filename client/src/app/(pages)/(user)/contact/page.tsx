"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Info,
  CheckCircle,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation refs
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true });
  const isInfoInView = useInView(infoRef, { once: true });
  const isMapInView = useInView(mapRef, { once: true });

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
        `${process.env.NEXT_PUBLIC_API_URL}/contact/submit`,
        formData
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Uttam Nagar, New Delhi, India",
      description: "Head Branch - Visit us for in-person consultations",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9220797499 / +91 9773927706",
      description: "Available during business hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "service@monarkfx.com",
      description: "We respond within 24 business hours",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon - Sat: 9AM to 6PM",
      description: "Classes run throughout the day",
      color: "from-orange-500 to-red-500",
    },
  ];

  const courseInfo = [
    {
      name: "STP Course",
      description: "Smart Trader Profile - 2-month duration across four levels",
      features: ["Stock Market Focus", "Technical Analysis", "Risk Management"],
    },
    {
      name: "FCH Course",
      description: "Forex Crypto Hustler - 2-month duration across four levels",
      features: [
        "Global Markets",
        "Cryptocurrency Trading",
        "Forex Strategies",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-plus-jakarta-sans">
      {/* Add CSS for grid pattern */}
      <style jsx global>{`
        .bg-dot-pattern {
          background-image: radial-gradient(
            circle,
            #cccccc 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>

      {/* Hero Section with Animated Elements */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden">
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
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Touch
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Ready to start your trading journey? Get in touch with our expert
              team for personalized guidance and course information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Send Message
              </motion.a>

              <motion.a
                href="/business"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-6 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
              >
                <span>Join Affiliate Program</span>
              </motion.a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    1000+
                  </div>
                  <div className="text-sm text-zinc-400">Students Trained</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Award className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">ISO</div>
                  <div className="text-sm text-zinc-400">
                    Certified Institute
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">2</div>
                  <div className="text-sm text-zinc-400">Premium Courses</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">24h</div>
                  <div className="text-sm text-zinc-400">Response Time</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            id="contact-form"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
                <Info className="h-4 w-4" />
                Send us a Message
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Started Today
              </h2>
              <p className="text-zinc-400">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Course inquiry, General question, etc."
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your trading goals and how we can help..."
                      rows={6}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
                <Info className="h-4 w-4" />
                Contact Information
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-zinc-400">
                Choose the most convenient way to get in touch with our expert
                trading team.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 bg-gradient-to-r ${info.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            {info.title}
                          </h3>
                          <p className="text-green-400 font-medium mb-1">
                            {info.details}
                          </p>
                          <p className="text-zinc-400 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isMapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                Visit Our Branch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 rounded-lg overflow-hidden border border-zinc-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7837997936613!2d77.05616367528806!3d28.606262075679115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05de8d29cab9%3A0x2d77bb4a1742f15c!2sEquity%20Tank%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1740240805113!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
