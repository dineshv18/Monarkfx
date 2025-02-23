import React from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function MonarkTestimonials() {
    const testimonials = [
        {
            quote: "MonarkFX's STP course transformed my trading journey. Their practical approach and mentorship helped me develop a consistent trading strategy. The live trading sessions were particularly invaluable.",
            name: "Rajesh Kumar",
            designation: "Professional Trader, Delhi",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "The institutional trading methods taught at MonarkFX gave me a completely new perspective. I learned to analyze markets like professionals and their risk management strategies are exceptional.",
            name: "Priya Sharma",
            designation: "Full-time Trader, Mumbai",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "Coming from a non-finance background, I was skeptical at first. But MonarkFX's structured curriculum and patient mentors helped me understand complex trading concepts easily.",
            name: "Amit Patel",
            designation: "Options Trader, Ahmedabad",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "The F&O Freak module was a game-changer for me. The advanced options strategies and practical implementation helped me develop a solid trading system.",
            name: "Sneha Verma",
            designation: "Derivatives Trader, Bangalore",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "MonarkFX's mentorship program stands out. The personal attention from experienced traders and regular market insights helped me become consistent in my trades.",
            name: "Vikram Singh",
            designation: "Forex Trader, Pune",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "The crypto trading course was comprehensive and up-to-date. I learned everything from fundamentals to advanced trading strategies. Their 24/7 support is commendable.",
            name: "Ananya Gupta",
            designation: "Crypto Trader, Hyderabad",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "The live trading sessions were the highlight of the program. Learning to implement strategies in real-time market conditions was incredibly valuable.",
            name: "Rahul Mehta",
            designation: "Intraday Trader, Chennai",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            quote: "MonarkFX's multi-timeframe analysis techniques and sector rotation strategies helped me improve my trade selection significantly.",
            name: "Deepika Shah",
            designation: "Swing Trader, Kolkata",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-black">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Student Success Stories</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Hear from our alumni who have transformed their trading journey with MonarkFX's comprehensive training and mentorship programs.
                </p>
            </div>
            <AnimatedTestimonials
                testimonials={testimonials}
                autoplay={true}
            />
            <div className="mt-12 text-center">
                <p className="text-sm text-red-500 hover:text-red-400">
                    Join over 250+ successful traders who have benefited from our expert-led programs
                </p>
            </div>
        </div>
    );
}