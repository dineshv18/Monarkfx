'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Mail, Calendar, User } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { format } from 'date-fns'

interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
}

export default function ContactMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/contact/all`,
                { withCredentials: true }
            )
            setMessages(response.data.data)
        } catch (error: any) {
            toast.error('Failed to fetch contact messages')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`,
                { withCredentials: true }
            )
            toast.success('Message deleted successfully')
            setMessages(messages.filter(msg => msg.id !== id))
        } catch (error: any) {
            toast.error('Failed to delete message')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Messages</h1>

            <div className="grid gap-6">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {message.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {message.email}
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">
                                        {format(new Date(message.createdAt), 'PPpp')}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium text-gray-900">
                                        {message.subject}
                                    </h4>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {message.message}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(message.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete message"
                            >
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                        <p className="text-gray-600">Contact messages will appear here</p>
                    </div>
                )}
            </div>
        </div>
    )
}