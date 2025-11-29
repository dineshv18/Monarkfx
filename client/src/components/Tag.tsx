"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        jQuery: any;
        seoScriptLoaded?: boolean;
    }
}

export default function RawSEO(): JSX.Element {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cleanupFunctionsRef = useRef<Array<() => void>>([]);

    useEffect(() => {
        // Wait for full hydration
        const timer = setTimeout(() => {
            // Prevent multiple loads
            if (window.seoScriptLoaded) {
                return;
            }
            window.seoScriptLoaded = true;

            const loadJQuery = (): Promise<void> => {
                return new Promise((resolve) => {
                    if (window.jQuery) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => resolve();
                    document.head.appendChild(script);

                    cleanupFunctionsRef.current.push(() => {
                        if (script.parentNode) {
                            script.parentNode.removeChild(script);
                        }
                    });
                });
            };

            const loadSEOData = async (): Promise<void> => {
                await loadJQuery();

                const eppathurl: string = window.location.origin + window.location.pathname;
                const eptagmanage: XMLHttpRequest = new XMLHttpRequest();

                eptagmanage.onreadystatechange = function (): void {
                    if (this.readyState === 4 && this.status === 200) {
                        if (this.response && this.response !== "0") {
                            try {
                                const temp: string[] = this.response.split("||||||||||");

                                // Handle head content
                                if (temp[0]) {
                                    // Remove existing dynamic titles (not the one from Next.js metadata)
                                    const dynamicTitles = document.querySelectorAll("head title[data-dynamic]");
                                    dynamicTitles.forEach((title) => {
                                        try {
                                            if (title.parentNode) {
                                                title.parentNode.removeChild(title);
                                            }
                                        } catch (e) {
                                            // Ignore
                                        }
                                    });

                                    const tempDiv = document.createElement('div');
                                    tempDiv.innerHTML = temp[0];

                                    Array.from(tempDiv.children).forEach((child) => {
                                        const cloned = child.cloneNode(true) as HTMLElement;

                                        // Mark dynamic elements
                                        if (cloned.tagName === 'TITLE') {
                                            cloned.setAttribute('data-dynamic', 'true');
                                        }

                                        document.head.appendChild(cloned);

                                        cleanupFunctionsRef.current.push(() => {
                                            try {
                                                if (cloned.parentNode) {
                                                    cloned.parentNode.removeChild(cloned);
                                                }
                                            } catch (e) {
                                                // Ignore cleanup errors
                                            }
                                        });
                                    });
                                }

                                // Handle body content - use the container ref
                                if (temp[1] && containerRef.current) {
                                    const tempDiv = document.createElement('div');
                                    tempDiv.innerHTML = temp[1];

                                    Array.from(tempDiv.children).forEach((child) => {
                                        const cloned = child.cloneNode(true) as HTMLElement;
                                        containerRef.current?.appendChild(cloned);
                                    });
                                }
                            } catch (error) {
                                console.error('SEO injection error:', error);
                            }
                        }
                    }
                };

                try {
                    const baseUrl: string = atob("aHR0cHM6Ly9wbHVnaW5zLmF1dG9zZW9wbHVnaW4uY29tL2FsbGhlYWRkYXRhP2VrZXk9ZS1BVVRPU0VPUExVR0lONTU0OTQxMTQ5NyZla2V5cGFzcz1vZFlpcGFHRzl5ZmM4NlBLNGIyWkliTHNDVVpxTWxheldBeXAmc2l0ZXVybD0=");
                    eptagmanage.open("GET", baseUrl + eppathurl);
                    eptagmanage.send();
                } catch (error) {
                    console.error('SEO request error:', error);
                }
            };

            loadSEOData();
        }, 100); // Small delay for hydration

        return () => {
            clearTimeout(timer);
            // Run all cleanup functions
            cleanupFunctionsRef.current.forEach(cleanup => {
                try {
                    cleanup();
                } catch (e) {
                    // Ignore cleanup errors
                }
            });
            cleanupFunctionsRef.current = [];
            window.seoScriptLoaded = false;
        };
    }, [pathname]);

    // Return a hidden container for body content
    return <div ref={containerRef} style={{ display: 'contents' }} />;
}