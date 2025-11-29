(function () {
    'use strict';

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
        var eppathurl = window.location.origin + window.location.pathname;
        var eptagmanage = new XMLHttpRequest();

        eptagmanage.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response && this.response !== "0") {
                    try {
                        var temp = this.response.split("||||||||||");

                        if (temp[0]) {
                            jQuery("head").find("title").remove();
                            jQuery("head").append(temp[0]);
                        }

                        if (temp[1]) {
                            jQuery("body").append(temp[1]);
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadJQuery(initSEO);
        });
    } else {
        loadJQuery(initSEO);
    }
})();