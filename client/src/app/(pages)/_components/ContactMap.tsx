"use client";

import { useEffect } from "react";

// MonarkFX — Uttam Nagar, New Delhi
const LAT = 28.6173;
const LNG = 77.0455;

export default function ContactMap() {
    useEffect(() => {
        // Dynamically import leaflet (client-only)
        let map: import("leaflet").Map | null = null;

        import("leaflet").then((L) => {
            // Fix default marker icon paths for Next.js
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            const container = document.getElementById("contact-map");
            if (!container) return;

            // Prevent double-init
            if ((container as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

            map = L.map("contact-map", {
                center: [LAT, LNG],
                zoom: 15,
                zoomControl: true,
                scrollWheelZoom: false,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            // Custom red marker
            const redIcon = L.divIcon({
                html: `<div style="
                    width:36px;height:36px;border-radius:50% 50% 50% 0;
                    background:#E8B923;border:3px solid #fff;
                    transform:rotate(-45deg);
                    box-shadow:0 4px 16px rgba(232,185,35,0.5);
                "></div>`,
                iconSize: [36, 36],
                iconAnchor: [18, 36],
                popupAnchor: [0, -38],
                className: "",
            });

            L.marker([LAT, LNG], { icon: redIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="font-family:sans-serif;padding:6px 2px">
                        <b style="color:#E8B923;font-size:14px">MonarkFX Academy</b><br/>
                        <span style="font-size:12px;color:#555">Uttam Nagar, New Delhi — 110059</span>
                    </div>
                `)
                .openPopup();
        });

        return () => {
            map?.remove();
        };
    }, []);

    return (
        <>
            {/* Leaflet CSS */}
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />
            <div
                id="contact-map"
                style={{ width: "100%", height: "100%", minHeight: 240, zIndex: 1 }}
            />
        </>
    );
}
