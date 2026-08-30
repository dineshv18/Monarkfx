import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/auth", "/reset-password", "/verify-email", "/cart", "/buy"],
        },
        sitemap: "https://monarkfx.com/sitemap.xml",
    };
}
