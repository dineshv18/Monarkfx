import type { MetadataRoute } from "next";
import { programSlugs } from "./(pages)/(user)/courses/programs/programs-data";

const SITE = "https://monarkfx.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes = [
        "",
        "/about",
        "/courses",
        "/live-classes",
        "/contact",
        "/support",
        "/refund-policy",
        "/privacy-policy",
        "/terms",
        "/disclaimer",
    ].map((path) => ({
        url: `${SITE}${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.7,
    }));

    const programRoutes = programSlugs.map((slug) => ({
        url: `${SITE}/courses/programs/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...programRoutes];
}
