(function () {
    'use strict';

    var currentPath = '';
    var injectedElements = [];

    function cleanup() {
        // Remove previously injected elements
        injectedElements.forEach(function (el) {
            try {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            } catch (e) {
                // Ignore
            }
        });
        injectedElements = [];
    }

    function loadJQuery(callback) {
        if (window.jQuery) {
            callback();
            return;
        }
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initSEO() {
        var newPath = window.location.pathname;

        // Skip if same path
        if (currentPath === newPath) {
            return;
        }

        currentPath = newPath;
        cleanup();

        var eppathurl = window.location.origin + window.location.pathname;
        var eptagmanage = new XMLHttpRequest();

        eptagmanage.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response && this.response !== "0") {
                    try {
                        var temp = this.response.split("||||||||||");

                        if (temp[0] && window.jQuery) {
                            // Remove old SEO titles
                            jQuery("head").find("title[data-seo]").remove();

                            var headContent = jQuery(temp[0]);
                            headContent.attr('data-seo', 'true');
                            jQuery("head").append(headContent);

                            // Track injected head elements
                            headContent.each(function () {
                                injectedElements.push(this);
                            });
                        }

                        if (temp[1] && window.jQuery) {
                            // Remove old SEO body elements
                            jQuery("body").find("[data-seo='true']").remove();

                            var bodyContent = jQuery(temp[1]);
                            bodyContent.attr('data-seo', 'true');
                            jQuery("body").append(bodyContent);

                            // Track injected body elements
                            bodyContent.each(function () {
                                injectedElements.push(this);
                            });
                        }
                    } catch (e) {
                        console.error('SEO Plugin Error:', e);
                    }
                }
            }
        };

        eptagmanage.open("GET", atob("aHR0cHM6Ly9wbHVnaW5zLmF1dG9zZW9wbHVnaW4uY29tL2FsbGhlYWRkYXRhP2VrZXk9ZS1BVVRPU0VPUExVR0lONTU0OTQxMTQ5NyZla2V5cGFzcz1vZFlpcGFHRzl5ZmM4NlBLNGIyWkliTHNDVVpxTWxheldBeXAmc2l0ZXVybD0=") + eppathurl);
        eptagmanage.send();
    }

    // Initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadJQuery(initSEO);
        });
    } else {
        loadJQuery(initSEO);
    }

    // Listen for Next.js route changes
    var observer = new MutationObserver(function () {
        if (window.location.pathname !== currentPath) {
            loadJQuery(initSEO);
        }
    });

    // Watch for URL changes (Next.js client-side navigation)
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also listen for popstate (back/forward buttons)
    window.addEventListener('popstate', function () {
        setTimeout(function () {
            loadJQuery(initSEO);
        }, 100);
    });

    // Listen for Next.js specific route change events
    window.addEventListener('popstate', function () {
        loadJQuery(initSEO);
    });

})();