import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { PROGRAMS, getProgram, programSlugs } from "../programs-data";
import ProgramView from "./program-view";

const SITE = "https://monarkfx.com";

type Props = { params: { slug: string } };

export function generateStaticParams() {
    return programSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
    const program = getProgram(params.slug);
    if (!program) {
        return { title: "Course Not Found | MonarkFX" };
    }

    const url = `${SITE}/courses/programs/${program.slug}`;
    const ogImage = `${SITE}${program.image}`;

    return {
        title: program.metaTitle,
        description: program.metaDescription,
        keywords: program.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: program.metaTitle,
            description: program.metaDescription,
            url,
            type: "website",
            siteName: "MonarkFX",
            images: [{ url: ogImage, width: 1200, height: 630, alt: program.name }],
        },
        twitter: {
            card: "summary_large_image",
            title: program.metaTitle,
            description: program.metaDescription,
            images: [ogImage],
        },
    };
}

export default function ProgramPage({ params }: Props) {
    const program = getProgram(params.slug);
    if (!program) notFound();

    const url = `${SITE}/courses/programs/${program.slug}`;

    /* ── JSON-LD: Course + FAQPage + Breadcrumb ── */
    const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: program.name,
        description: program.metaDescription,
        url,
        image: `${SITE}${program.image}`,
        provider: {
            "@type": "Organization",
            name: "MonarkFX",
            url: SITE,
        },
        hasCourseInstance: program.modes.map((m) => ({
            "@type": "CourseInstance",
            name: `${program.name} — ${m.name}`,
            courseMode: m.name.toLowerCase().includes("online")
                ? "online"
                : "onsite",
            courseWorkload: program.duration,
            offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: m.name.toLowerCase().includes("online")
                    ? program.priceOnline.replace(/,/g, "")
                    : program.priceOffline.replace(/,/g, ""),
                availability: "https://schema.org/InStock",
                url: `${SITE}/courses`,
            },
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: program.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            {
                "@type": "ListItem",
                position: 2,
                name: "Courses",
                item: `${SITE}/courses`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: program.name,
                item: url,
            },
        ],
    };

    return (
        <>
            <Script
                id={`ld-course-${program.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
            />
            <Script
                id={`ld-faq-${program.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id={`ld-crumb-${program.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ProgramView
                program={program}
                related={PROGRAMS.filter((p) => p.slug !== program.slug)}
            />
        </>
    );
}
