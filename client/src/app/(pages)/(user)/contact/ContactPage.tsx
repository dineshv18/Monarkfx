'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MapPin, Send, Phone, Mail, Clock } from 'lucide-react'
import Background from '../../_components/Background'
import { toast } from 'sonner'
import axios from 'axios'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 2500)
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

  return (
    <>
      <Background
        title="Get in"
        highlightedText="Touch"
        subtitle="We'd love to hear from you"
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Greeting Animation */}
        <motion.div
          key={currentGreeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center my-10"
        >
          <p className="text-3xl font-bold text-gray-900">
            {greetings[currentGreeting].text}
          </p>
          <p className="text-gray-600 mt-2">
            {greetings[currentGreeting].lang}
          </p>
        </motion.div>
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-red-100 hover:border-red-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <info.icon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 mt-1">{info.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-red-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none resize-none"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
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
            className="bg-white p-8 rounded-xl shadow-lg border border-red-100 h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0168431857125!2d77.0797493!3d28.6198138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b4a5e42cf8d%3A0xb2c1e0d574e77ba4!2sDwarka%20Sector%207%2C%20Dwarka%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </motion.div>
        </div>


      </div>
    </>
  )
}