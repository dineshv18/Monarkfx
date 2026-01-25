"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div
                className={`max-w-md w-full text-center space-y-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                {/* Success Icon */}
                <div className="relative mx-auto w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                    <div className="relative w-full h-full bg-green-500/10 rounded-full flex items-center justify-center ring-1 ring-green-500/50 backdrop-blur-sm">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Thank You!
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Your submission has been received successfully.
                        <br />
                        Our team will contact you shortly.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Button
                        asChild
                        size="lg"
                        variant="default"
                        className="w-full sm:w-auto min-w-[160px] group"
                    >
                        <Link href="/">
                            <Home className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto min-w-[160px] group"
                    >
                        <Link href="tel:+919220797499">
                            Call Us Now
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                {/* Additional Info */}
                <div className="pt-12 text-sm text-muted-foreground/60">
                    <p>Have urgent queries? Reach us at</p>
                    <a href="mailto:service@monarkfx.com" className="hover:text-primary transition-colors">
                        service@monarkfx.com
                    </a>
                </div>
            </div>
        </main>
    );
}
