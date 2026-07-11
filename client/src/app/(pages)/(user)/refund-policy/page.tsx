import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Read Monark FX Refund Policy to understand the terms and conditions regarding course enrollment, payments, and refund eligibility for our trading education programs.',
  keywords: [
    'refund policy',
    'refund terms',
    'course refund',
    'enrollment refund',
    'Monark FX refund',
    'trading education refund',
    'payment refund',
    'no refund policy'
  ],
  openGraph: {
    title: 'Refund Policy | Monark FX',
    description: 'Read Monark FX Refund Policy to understand the terms and conditions regarding course enrollment, payments, and refund eligibility.',
    url: 'https://monarkfx.com/refund-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | Monark FX',
    description: 'Read Monark FX Refund Policy to understand the terms and conditions regarding course enrollment, payments, and refund eligibility.',
  },
  alternates: {
    canonical: '/refund-policy',
  },
};

export default function RefundPolicy() {
  return (
    <div className="container px-4 py-16 md:py-24 max-w-4xl mx-auto">
      {/* Navigation Links */}
      <div className="mb-8 p-4 rounded-lg bg-card border border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link
            href="/privacy-policy"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/terms"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/disclaimer"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Disclaimer
          </Link>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm font-medium text-primary">
            Refund Policy
          </span>
        </div>
      </div>

      {/* Risk Warning Box */}
      <div className="mb-8 p-6 rounded-lg bg-[#3d1a1a] border border-[#dc2626]/50">
        <p className="text-white text-base leading-relaxed">
          <strong>Remember:</strong> Only trade with capital you can afford to lose. Trading involves risk, and you may lose your entire investment.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Refund Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: June 11, 2026
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              At Monark FX, we are committed to providing world-class trading education that stands on par with the best institutions globally. Our courses are designed with meticulous care, backed by years of industry expertise, and crafted to deliver real value to every student who enrolls. India&apos;s education ecosystem has grown remarkably strong, and we take pride in contributing to that strength by offering courses that meet international standards of quality and excellence.
            </p>
            <p>
              This Refund Policy outlines the terms and conditions under which refunds may or may not be granted for courses and services purchased through our platform at <strong className="text-foreground">monarkfx.com</strong>. By enrolling in any of our courses, you acknowledge and agree to the terms set forth in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. No Refund After Purchase or Enrollment</h2>
            <div className="p-6 rounded-lg bg-[#3d1a1a] border border-[#dc2626]/50 mb-4">
              <p className="text-white text-lg font-semibold leading-relaxed">
                IMPORTANT: Once you have purchased any service or enrolled in any course — whether online or offline — NO REFUND will be provided under any circumstances.
              </p>
            </div>
            <p>
              Monark FX maintains a strict <strong className="text-foreground">no-refund policy</strong> after purchase or enrollment. This applies to all services, courses, programs, mentorship sessions, and educational offerings on our platform, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online trading courses (forex, stock market, cryptocurrency)</li>
              <li>Offline classroom sessions and workshops</li>
              <li>Live trading mentorship programs</li>
              <li>Community access and premium memberships</li>
              <li>Educational materials, resources, and tools</li>
              <li>Webinars and masterclass sessions</li>
              <li>Any bundled or package course offerings</li>
            </ul>
            <p className="mt-4">
              This policy is non-negotiable and applies uniformly to all services and courses regardless of the type, duration, or mode of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Rationale Behind the No-Refund Policy</h2>
            <p>
              The no-refund policy after purchase or enrollment is in place for the following important reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Immediate Access:</strong> Upon purchase or enrollment, clients and students gain instant and full access to services, course materials, proprietary strategies, live sessions, and mentorship — all of which are non-retrievable digital assets.</li>
              <li><strong className="text-foreground">Commitment to Learning:</strong> A firm policy ensures that students are serious and committed to their trading education journey, fostering a disciplined learning environment.</li>
              <li><strong className="text-foreground">Protection Against Misuse:</strong> This policy safeguards the integrity of our services and educational programs, protecting the interests of genuinely committed participants.</li>
              <li><strong className="text-foreground">Resource Allocation:</strong> Each purchase or enrollment triggers immediate resource allocation including mentor assignment, personalized learning path creation, and community onboarding. These resources cannot be recovered once deployed.</li>
              <li><strong className="text-foreground">Quality Education Requires Investment:</strong> Our pricing reflects the true value of the expertise, infrastructure, and ongoing support we provide.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Pre-Purchase and Pre-Enrollment Due Diligence</h2>
            <p>
              We strongly encourage all prospective clients and students to exercise due diligence before purchasing or enrolling. To assist you in making an informed decision, we provide:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Free Demo Content:</strong> Access to sample lessons and introductory material to understand our teaching methodology.</li>
              <li><strong className="text-foreground">Detailed Information:</strong> Comprehensive service and course outlines, curriculum details, and outcomes listed on our website.</li>
              <li><strong className="text-foreground">Reviews:</strong> Authentic testimonials and reviews from past and current students.</li>
              <li><strong className="text-foreground">Direct Communication:</strong> You may reach out to our team via phone, email, or WhatsApp to clarify any doubts before purchase.</li>
              <li><strong className="text-foreground">Preview:</strong> Preview sessions are available for select programs.</li>
            </ul>
            <p className="mt-4">
              By purchasing or enrolling, you confirm that you have reviewed the details, understand the terms, and are making a conscious and informed decision to invest in your education.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Disputes and Chargebacks</h2>
            <p>
              Any attempt to initiate a chargeback or payment dispute after purchase or enrollment will be treated as a violation of our terms. Monark FX reserves the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Immediately revoke your service and course access and all associated privileges</li>
              <li>Report the dispute to relevant financial institutions with documentation of service delivery</li>
              <li>Take legal action as deemed necessary to protect our interests</li>
              <li>Blacklist the individual from future purchases, enrollments, and services</li>
            </ul>
            <p className="mt-4">
              We maintain comprehensive records of all service delivery, including content access logs, session attendance, and mentorship interactions, which will be presented in the event of any dispute.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Indian Education &amp; Consumer Protection Compliance</h2>
            <p>
              Monark FX operates in compliance with applicable Indian laws and regulations. Our no-refund policy is clearly communicated to all clients prior to purchase or enrollment, and by completing the transaction, you provide informed consent to these terms. This policy is consistent with industry practices in the digital education and services sector, where immediate access to non-retrievable content and setup costs justifies the no-refund stance.
            </p>
            <p className="mt-4">
              India&apos;s education sector has emerged as one of the strongest in the world, with a growing emphasis on quality, accountability, and value-driven learning. Monark FX is proud to uphold these standards by ensuring that every rupee invested by our students translates into tangible educational value.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact for Refund Queries</h2>
            <p>
              If you have any questions or concerns regarding this Refund Policy, you may contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-foreground">Monark FX</strong></p>
              <p>
                Metro Pillar Number 654, Second floor B-28, Hari Nagar,<br />
                B Block, JJ Colony, Uttam Nagar, New Delhi, Delhi, 110059<br />
                (Near - Uttam Nagar East Metro Station)
              </p>
              <p>
                <strong className="text-foreground">Phone:</strong> <a href="tel:+918750475852" className="text-primary hover:underline">+91 87504 75852</a> / <a href="tel:+919315071969" className="text-primary hover:underline">+91 93150 71969</a>
              </p>
              <p>
                <strong className="text-foreground">Email:</strong> <a href="mailto:service@monarkfx.com" className="text-primary hover:underline">service@monarkfx.com</a>
              </p>
              <p>
                <strong className="text-foreground">Website:</strong> <a href="https://monarkfx.com" className="text-primary hover:underline">monarkfx.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Policy Acceptance</h2>
            <p>
              By purchasing any service or enrolling in any course offered by Monark FX, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy in its entirety. You further confirm that you have made a well-informed decision to invest in your trading education or services and accept the terms of this no-refund policy without reservation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
