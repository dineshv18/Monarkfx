"use client";

import { useCallback } from 'react';

export default function RawSEO() {
    useCallback(() => {
        // Load jQuery if not present
        if (!(window as any).jQuery) {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
            document.head.appendChild(jqueryScript);
        }

        // Main SEO script logic
        const eppathurl = window.location.origin + window.location.pathname;
        const eptagmanage = new XMLHttpRequest();

        eptagmanage.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (this.response !== "0" && this.response) {
                    const temp = this.response.split("||||||||||");

                    // Remove existing title
                    const existingTitle = document.head.querySelector("title");
                    if (existingTitle) {
                        existingTitle.remove();
                    }

                    // Append new content
                    if (temp[0]) {
                        document.head.insertAdjacentHTML('beforeend', temp[0]);
                    }
                    if (temp[1]) {
                        document.body.insertAdjacentHTML('beforeend', temp[1]);
                    }
                }
            }
        };

        const baseUrl = atob("aHR0cHM6Ly9wbHVnaW5zLmF1dG9zZW9wbHVnaW4uY29tL2FsbGhlYWRkYXRhP2VrZXk9ZS1BVVRPU0VPUExVR0lONTU0OTQxMTQ5NyZla2V5cGFzcz1vZFlpcGFHRzl5ZmM4NlBLNGIyWkliTHNDVVpxTWxheldBeXAmc2l0ZXVybD0=");
        eptagmanage.open("GET", baseUrl + eppathurl);
        eptagmanage.send();
    }, []);

    return null;
}