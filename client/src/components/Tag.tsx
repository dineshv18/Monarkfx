"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        jQuery: any;
        seoScriptLoaded?: boolean;
        seoCleanup?: () => void;
    }
}

export default function RawSEO(): JSX.Element {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInitialMount = useRef<boolean>(true);

    useEffect(() => {
        // Cleanup previous instance first
        if (window.seoCleanup) {
            window.seoCleanup();
            window.seoCleanup = undefined;
        }

        // Reset flag on pathname change
        window.seoScriptLoaded = false;

        const injectedElements: HTMLElement[] = [];
        let jqueryScript: HTMLScriptElement | null = null;

        const cleanup = (): void => {
            // Remove all injected elements
            injectedElements.forEach((element) => {
                try {
                    if (element && element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                } catch (e) {
                    // Ignore
                }
            });
            injectedElements.length = 0;

            // Clear container
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }

            // Remove jQuery if we added it
            if (jqueryScript && jqueryScript.parentNode) {
                try {
                    jqueryScript.parentNode.removeChild(jqueryScript);
                } catch (e) {
                    // Ignore
                }
            }
        };

        // Store cleanup function globally
        window.seoCleanup = cleanup;

        const loadJQuery = (): Promise<void> => {
            return new Promise((resolve) => {
                if (window.jQuery) {
                    resolve();
                    return;
                }
                jqueryScript = document.createElement('script');
                jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
                jqueryScript.async = true;
                jqueryScript.onload = () => resolve();
                jqueryScript.onerror = () => resolve();
                document.head.appendChild(jqueryScript);
            });
        };

        const loadSEOData = async (): Promise<void> => {
            if (window.seoScriptLoaded) {
                return;
            }
            window.seoScriptLoaded = true;

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
                                // Remove all previous dynamic SEO tags
                                const oldSeoTags = document.querySelectorAll('[data-seo-plugin="true"]');
                                oldSeoTags.forEach((tag) => {
                                    try {
                                        if (tag.parentNode) {
                                            tag.parentNode.removeChild(tag);
                                        }
                                    } catch (e) {
                                        // Ignore
                                    }
                                });

                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = temp[0];

                                Array.from(tempDiv.children).forEach((child) => {
                                    const cloned = child.cloneNode(true) as HTMLElement;
                                    cloned.setAttribute('data-seo-plugin', 'true');
                                    document.head.appendChild(cloned);
                                    injectedElements.push(cloned);
                                });
                            }

                            // Handle body content
                            if (temp[1] && containerRef.current) {
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = temp[1];

                                Array.from(tempDiv.children).forEach((child) => {
                                    const cloned = child.cloneNode(true) as HTMLElement;
                                    cloned.setAttribute('data-seo-plugin', 'true');
                                    containerRef.current?.appendChild(cloned);
                                    injectedElements.push(cloned);
                                });

                                // Re-execute scripts in body content for click handlers
                                const scripts = containerRef.current.querySelectorAll('script');
                                scripts.forEach((oldScript) => {
                                    const newScript = document.createElement('script');
                                    Array.from(oldScript.attributes).forEach(attr => {
                                        newScript.setAttribute(attr.name, attr.value);
                                    });
                                    newScript.textContent = oldScript.textContent;

                                    if (oldScript.parentNode) {
                                        oldScript.parentNode.replaceChild(newScript, oldScript);
                                    }
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

        // Small delay for hydration, but skip on initial mount
        const timer = setTimeout(() => {
            loadSEOData();
        }, isInitialMount.current ? 0 : 100);

        isInitialMount.current = false;

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, [pathname]);

    return <div ref={containerRef} style={{ display: 'contents' }} data-seo-container="true" />;
}