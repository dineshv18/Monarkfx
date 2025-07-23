import React from "react";

const PrivacyPolicy = () => (
  <main className="max-w-3xl mx-auto px-4 py-20 md:pt-32 text-gray-200">
    <h1 className="text-3xl font-bold mb-6 text-green-400">Privacy Policy</h1>
    <p className="mb-4">
      At Monark FX, we are committed to protecting your privacy. This Privacy
      Policy explains how we collect, use, and safeguard your information when
      you use our website, courses, and live classes.
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      Information We Collect
    </h2>
    <ul className="list-disc ml-6 mb-4">
      <li>
        Personal details (name, email, phone) when you register or enroll in a
        course or class.
      </li>
      <li>
        Payment information for course/class purchases (processed securely via
        third-party providers).
      </li>
      <li>
        Usage data (pages visited, course progress, etc.) to improve your
        experience.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      How We Use Your Information
    </h2>
    <ul className="list-disc ml-6 mb-4">
      <li>To provide access to courses, live classes, and related services.</li>
      <li>To communicate important updates, offers, and support.</li>
      <li>To improve our platform and personalize your learning experience.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      Data Security
    </h2>
    <p className="mb-4">
      We use industry-standard security measures to protect your data. Your
      payment details are never stored on our servers.
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      Third-Party Services
    </h2>
    <p className="mb-4">
      We may use trusted third-party services for payments, analytics, and
      communication. These providers have their own privacy policies.
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      Your Rights
    </h2>
    <p className="mb-4">
      You can request to access, update, or delete your personal information by
      contacting us at{" "}
      <a
        href="mailto:service@monarkfx.com"
        className="text-green-400 underline"
      >
        service@monarkfx.com
      </a>
      .
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">Contact</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us at{" "}
      <a
        href="mailto:service@monarkfx.com"
        className="text-green-400 underline"
      >
        service@monarkfx.com
      </a>
      .
    </p>
  </main>
);

export default PrivacyPolicy;
