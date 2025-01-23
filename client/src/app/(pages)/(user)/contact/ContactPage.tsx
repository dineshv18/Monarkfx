'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Smile, MapPin, Send, Phone, Mail, Clock } from 'lucide-react'
import Background from '../../_components/Background'

const greetings = [
  { text: "Hello!", lang: "English" },
  { text: "नमस्ते!", lang: "Hindi" },
  { text: "¡Hola!", lang: "Spanish" },
  { text: "Bonjour!", lang: "French" },
  { text: "Ciao!", lang: "Italian" },
  { text: "こんにちは!", lang: "Japanese" },
  { text: "안녕하세요!", lang: "Korean" },
  { text: "Hej!", lang: "Swedish" },
  { text: "Hallo!", lang: "German" },
  { text: "Olá!", lang: "Portuguese" }
]
const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Dwarka Sector 7, New Delhi, India"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 981 180 8558"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@monarkfx.com"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sat: 9AM to 6PM"
  }
]

export default function ContactPage() {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <Background 
        title="Get in"
        highlightedText="Touch"
        subtitle="We'd love to hear from you"
      />

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Animated Greeting */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl md:text-3xl text-gray-600">Say</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreeting}
                  className="text-2xl md:text-3xl text-red-600 font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {greetings[currentGreeting].text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl border border-red-100 hover:border-red-200"
              >
                <info.icon className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.details}</p>
              </motion.div>
            ))}
          </div>

          {/* Map and Form Container */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div 
              className="relative rounded-xl overflow-hidden h-[400px] lg:h-full shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7837997936613!2d77.05616367528806!3d28.606262075679115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05de8d29cab9%3A0x2d77bb4a1742f15c!2sEquity%20Tank%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1736783993706!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full rounded-xl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-red-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                />

                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none resize-none"
                  required
                />

                <motion.button
                  type="submit"
                  className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}