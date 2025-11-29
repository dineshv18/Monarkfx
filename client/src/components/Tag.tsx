"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        jQuery: any;
    }
}

export default function RawSEO(): null {
    const pathname = usePathname();
    const isLoaded = useRef<boolean>(false);
    const injectedElements = useRef<HTMLElement[]>([]);

    useEffect(() => {
        // Cleanup previous injected elements
        const cleanup = (): void => {
            injectedElements.current.forEach((element: HTMLElement) => {
                try {
                    if (element && element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                } catch (e) {
                    console.warn('Cleanup error:', e);
                }
            });
            injectedElements.current = [];
        };

        // Load jQuery if not present
        const loadJQuery = (): Promise<void> => {
            return new Promise((resolve) => {
                if (window.jQuery) {
                    resolve();
                    return;
                }
                const jqueryScript: HTMLScriptElement = document.createElement('script');
                jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
                jqueryScript.onload = () => resolve();
                jqueryScript.onerror = () => resolve(); // Continue even if jQuery fails
                document.head.appendChild(jqueryScript);
            });
        };

        // Main SEO script logic
        const loadSEOData = async (): Promise<void> => {
            await loadJQuery();

            const eppathurl: string = window.location.origin + window.location.pathname;
            const eptagmanage: XMLHttpRequest = new XMLHttpRequest();

            eptagmanage.onreadystatechange = function (): void {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.response && this.response !== "0") {
                        try {
                            const temp: string[] = this.response.split("||||||||||");

                            // Remove existing title safely
                            const existingTitles: NodeListOf<HTMLTitleElement> = document.querySelectorAll("head title");
                            existingTitles.forEach((title: HTMLTitleElement) => {
                                if (title.parentNode) {
                                    title.parentNode.removeChild(title);
                                }
                            });

                            // Create temporary container for head content
                            if (temp[0]) {
                                const headContainer: HTMLDivElement = document.createElement('div');
                                headContainer.innerHTML = temp[0];
                                const headElements: Element[] = Array.from(headContainer.children);

                                headElements.forEach((element: Element) => {
                                    const clonedElement: Node = element.cloneNode(true);
                                    document.head.appendChild(clonedElement);
                                    injectedElements.current.push(clonedElement as HTMLElement);
                                });
                            }

                            // Create temporary container for body content
                            if (temp[1]) {
                                const bodyContainer: HTMLDivElement = document.createElement('div');
                                bodyContainer.innerHTML = temp[1];
                                const bodyElements: Element[] = Array.from(bodyContainer.children);

                                bodyElements.forEach((element: Element) => {
                                    const clonedElement: Node = element.cloneNode(true);
                                    document.body.appendChild(clonedElement);
                                    injectedElements.current.push(clonedElement as HTMLElement);
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

        // Only load once or on pathname change
        if (!isLoaded.current || pathname) {
            cleanup();
            loadSEOData();
            isLoaded.current = true;
        }

        // Cleanup on unmount or pathname change
        return () => {
            cleanup();
        };
    }, [pathname]);

    return null;
}