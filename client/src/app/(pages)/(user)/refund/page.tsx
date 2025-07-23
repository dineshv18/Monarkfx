import React from "react";

const RefundPolicy = () => (
  <main className="max-w-3xl mx-auto px-4 py-20 md:pt-32 text-gray-200">
    <h1 className="text-3xl font-bold mb-6 text-green-400">Refund Policy</h1>
    <p className="mb-4">
      At Monark FX, we strive to provide the best learning experience through
      our online courses and live classes. Please read our refund policy
      carefully before making any purchase.
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      No Refunds
    </h2>
    <p className="mb-4">
      All purchases of courses and live classes on Monark FX are final. We do
      not offer refunds once a course or class has been purchased or accessed.
    </p>
    <h2 className="text-xl font-semibold mt-8 mb-2 text-green-300">
      Need Help?
    </h2>
    <p className="mb-4">
      If you have any questions or concerns about your purchase, please contact
      our support team. We are here to help you with any issues or queries you
      may have.
    </p>
    <p>
      Contact us at{" "}
      <a
        href="mailto:service@monarkfx.com"
        className="text-green-400 underline"
      >
        service@monarkfx.com
      </a>{" "}
      or use the{" "}
      <a href="/contact" className="text-green-400 underline">
        Contact
      </a>{" "}
      page to submit your query.
    </p>
  </main>
);

export default RefundPolicy;
