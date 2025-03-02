'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MapPin, Send, Phone, Mail, Clock, Globe, Instagram, Linkedin, Facebook, Twitter, CreditCard } from 'lucide-react'
import Background from '../../_components/Background'
import { toast } from 'sonner'
import axios from 'axios'

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
]

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Branch",
    details: "Uttam Nagar, New Delhi, India",
    link: "https://maps.app.goo.gl/your-location-link-here",
    info: "Visit us for in-person consultations and course enrollments"
  },
  {
    icon: MapPin,
    title: "Branch Office",
    details: "Dashrath Puri, New Delhi, India",
    link: "https://maps.app.goo.gl/your-second-location-link-here",
    info: "Our expansion location serving more students in the Delhi region"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 9220797499 / +91 9773927706",
    link: "tel:+919220797499",
    info: "Our representatives are available during business hours"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: (
      <>
        service@monarkfx.com<br />
        monarkfx@gmail.com
      </>
    ),
    link: "mailto:service@monarkfx.com",
    info: "We typically respond within 24 business hours"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sat: 9AM to 6PM",
    info: "Classes run throughout the day in scheduled batches"
  },
  {
    icon: Globe,
    title: "Website",
    details: "www.monarkfx.com",
    link: "https://www.monarkfx.com",
    info: "Explore our courses and trading resources online"
  }
]

const socialMedia = [
  {
    name: "Instagram",
    icon: Instagram,
    handle: "@monarkfx / @monarkfx_community",
    link: "https://instagram.com/monarkfx",
    color: "from-pink-500 to-orange-500"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    handle: "Monark FX™ - Financial Market Institute",
    link: "https://linkedin.com/company/monarkfx",
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "Facebook",
    icon: Facebook,
    handle: "Monark FX™ - Financial Market Institute",
    link: "https://facebook.com/monarkfx",
    color: "from-blue-500 to-blue-700"
  },
  {
    name: "Twitter",
    icon: Twitter,
    handle: "Monark FX™",
    link: "https://twitter.com/monarkfx",
    color: "from-blue-400 to-blue-600"
  }
]

const paymentOptions = [
  { method: "Cash Payment", description: "Available at our branches" },
  { method: "UPI Transfer", description: "Scan QR code for instant payment" },
  { method: "One-shot Payment", description: "Get 10% discount on full payment" }
]

const courseInfo = [
  {
    name: "STP Course",
    description: "Smart Trader Profile - 2-month duration across four levels",
    icon: "/icons/stocks-icon.png"
  },
  {
    name: "FCH Course",
    description: "Forex Crypto Hustler - 2-month duration across four levels",
    icon: "/icons/forex-icon.png"
  }
]

export default function ContactPage() {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("contact") // contact, social, payment, courses
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/create`,
        formData
      )
      if (response.data?.message) {
        toast.success(response.data.data)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed to send message. Please try again later."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabVariants = {
    active: {
      color: "#dc2626",
      borderColor: "#dc2626",
      fontWeight: 600
    },
    inactive: {
      color: "#6b7280",
      borderColor: "transparent",
      fontWeight: 400
    }
  }

  return (
    <>
      <Background
        title="Get in"
        highlightedText="Touch"
        subtitle="We'd love to hear from you"
      />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Greeting Animation */}
        <motion.div
          key={currentGreeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative py-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-transparent to-red-50 opacity-40" />
          <div className="relative">
            <motion.p
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent py-10"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {greetings[currentGreeting].text}
            </motion.p>
            <motion.div
              className="mt-4 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                {greetings[currentGreeting].lang}
              </span>
            </motion.div>
          </div>

          {/* Add decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-4 left-20 w-24 h-24 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 border-b border-gray-200">
          <div className="flex space-x-8">
            <motion.button
              animate={activeTab === "contact" ? "active" : "inactive"}
              variants={tabVariants}
              onClick={() => setActiveTab("contact")}
              className="py-4 px-2 border-b-2 transition-all"
            >
              Contact Info
            </motion.button>
            <motion.button
              animate={activeTab === "social" ? "active" : "inactive"}
              variants={tabVariants}
              onClick={() => setActiveTab("social")}
              className="py-4 px-2 border-b-2 transition-all"
            >
              Social Media
            </motion.button>
            <motion.button
              animate={activeTab === "payment" ? "active" : "inactive"}
              variants={tabVariants}
              onClick={() => setActiveTab("payment")}
              className="py-4 px-2 border-b-2 transition-all"
            >
              Payment Options
            </motion.button>
            <motion.button
              animate={activeTab === "courses" ? "active" : "inactive"}
              variants={tabVariants}
              onClick={() => setActiveTab("courses")}
              className="py-4 px-2 border-b-2 transition-all"
            >
              Course Info
            </motion.button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-red-100 hover:border-red-300 transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 mt-1 hover:text-red-600 transition-colors"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-600 mt-1">{info.details}</p>
                      )}
                      <p className="text-gray-500 text-sm mt-2 italic">{info.info}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Social Media Tab */}
          {activeTab === "social" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {socialMedia.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.a
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${platform.color} rounded-lg text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{platform.name}</h3>
                        <p className="text-gray-600">{platform.handle}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          )}

          {/* Payment Options Tab */}
          {activeTab === "payment" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-red-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Options</h3>
                  <ul className="space-y-6">
                    {paymentOptions.map((option, index) => (
                      <motion.li
                        key={option.method}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-2 bg-red-50 rounded-full border border-red-200 mt-1">
                          <CreditCard className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{option.method}</h4>
                          <p className="text-gray-600">{option.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <p className="text-red-700 font-medium">
                      Note: Payment plans and installment options are available for all courses.
                      Contact our advisors for personalized payment arrangements.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="p-8 bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                      <span className="text-gray-500">QR Code</span>
                      {/* You can replace this with an actual QR code image */}
                      {/* <Image src="/payment-qr.png" alt="Payment QR Code" width={180} height={180} /> */}
                    </div>
                    <p className="text-center text-gray-600">
                      Scan to make UPI payment<br />
                      <span className="font-semibold">@monarkfx</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Course Info Tab */}
          {activeTab === "courses" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-red-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h3>

              <div className="grid md:grid-cols-2 gap-8">
                {courseInfo.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-red-100 hover:border-red-300 transition-all bg-gradient-to-br from-white to-red-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-100 rounded-full">
                        {/* Replace with actual icon or use placeholder */}
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                          {course.name.split(" ")[0][0]}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{course.name}</h4>
                        <p className="text-gray-600 mt-2">{course.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Contact Our Mentors</h4>
                <p className="text-gray-700">
                  Our team of seven dedicated trading mentors are available to help determine which course best fits your trading goals.
                  Schedule a consultation today to discuss your options and begin your trading journey.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-red-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg shadow-red-500/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className={`w-4 h-4 ${isSubmitting ? '' : 'group-hover:translate-x-1'
                  } transition-transform`} />
              </motion.button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-red-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Visit Our Branches</h2>
            <p className="text-gray-600 mb-6">Come meet us in person for a consultation with our expert trainers.</p>

            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7837997936613!2d77.05616367528806!3d28.606262075679115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05de8d29cab9%3A0x2d77bb4a1742f15c!2sEquity%20Tank%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1740240805113!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <h3 className="font-semibold text-gray-900">Head Branch</h3>
                <p className="text-sm text-gray-600">Uttam Nagar, New Delhi</p>
                <a href="#" className="text-sm text-red-600 hover:underline mt-1 inline-block">Get Directions</a>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <h3 className="font-semibold text-gray-900">Branch Office</h3>
                <p className="text-sm text-gray-600">Dashrath Puri, New Delhi</p>
                <a href="#" className="text-sm text-red-600 hover:underline mt-1 inline-block">Get Directions</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}