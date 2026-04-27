import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read Monark FX Terms of Service to understand the rules, regulations, and guidelines for using our trading education platform. Learn about user rights, payment terms, and service policies.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'service terms',
    'Monark FX terms',
    'trading education terms',
    'platform terms',
    'legal agreement'
  ],
  openGraph: {
    title: 'Terms of Service | Monark FX',
    description: 'Read Monark FX Terms of Service to understand the rules and guidelines for using our trading education platform.',
    url: 'https://monarkfx.com/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Monark FX',
    description: 'Read Monark FX Terms of Service to understand the rules and guidelines for using our trading education platform.',
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfService() {
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
          <span className="text-sm font-medium text-primary">
            Terms of Service
          </span>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/disclaimer"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Disclaimer
          </Link>
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
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using the Monark FX website located at <strong className="text-foreground">monarkfx.com</strong> (&quot;Website&quot;) and our educational services (&quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Website or Services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Monark FX (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on the Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
            <p>
              Monark FX provides professional trading education services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online courses and educational content on forex and stock market trading</li>
              <li>Structured learning programs and curriculum</li>
              <li>Expert mentorship and guidance</li>
              <li>Community access and support</li>
              <li>Educational resources, materials, and tools</li>
            </ul>
            <p className="mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Eligibility and Registration</h2>
            <p>To use our Services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding agreements</li>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information as necessary</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="mt-4">
              You agree to notify us immediately of any unauthorized use of your account or any breach of security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.1 Fees</h3>
            <p>
              Access to certain courses and services requires payment of fees. All fees are stated in Indian Rupees (INR) unless otherwise specified. Fees are subject to change at our discretion, but changes will not affect courses you have already purchased.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.2 Payment Processing</h3>
            <p>
              Payments are processed through secure third-party payment processors. You agree to provide valid payment information and authorize us to charge your payment method for the applicable fees.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.3 Refund Policy</h3>
            <p>
              Refund requests must be submitted within 7 days of course purchase. Refunds are subject to our discretion and may be granted on a case-by-case basis. Once course materials have been substantially accessed, refunds may not be available. Please contact us at <a href="mailto:service@monarkfx.com" className="text-primary hover:underline">service@monarkfx.com</a> for refund inquiries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property Rights</h2>
            <p>
              All content on the Website and Services, including but not limited to text, graphics, logos, images, audio, video, software, and course materials, is the property of Monark FX or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-4">
              You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial educational purposes only. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reproduce, distribute, or publicly display any content without our written permission</li>
              <li>Modify, adapt, or create derivative works from our content</li>
              <li>Share your account credentials or course access with others</li>
              <li>Use our content for commercial purposes</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Conduct and Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful, offensive, or illegal content</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt to gain unauthorized access to any part of the Services</li>
              <li>Use automated systems to access the Services without permission</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest information about other users</li>
              <li>Engage in any activity that could damage, disable, or impair the Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Educational Disclaimer</h2>
            <p>
              Our Services provide educational content and training. We do not provide financial, investment, or trading advice. The information provided is for educational purposes only and should not be construed as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Investment advice or recommendations</li>
              <li>Guarantees of trading success or profits</li>
              <li>Financial planning or advisory services</li>
              <li>Legal, tax, or accounting advice</li>
            </ul>
            <p className="mt-4">
              Trading involves substantial risk of loss. Past performance does not guarantee future results. You are solely responsible for your trading decisions and their outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Monark FX and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of profits, revenue, or data</li>
              <li>Trading losses or financial damages</li>
              <li>Business interruption</li>
              <li>Personal injury or property damage</li>
            </ul>
            <p className="mt-4">
              Our total liability for any claims arising from or related to the Services shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Monark FX and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your trading activities and decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to Services at any time, with or without cause or notice, for any reason including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Extended periods of account inactivity</li>
            </ul>
            <p className="mt-4">
              Upon termination, your right to use the Services will immediately cease. We may delete your account and data, subject to our Privacy Policy and legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Dispute Resolution</h2>
            <p>
              Any disputes arising from or related to these Terms or the Services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India, and shall be governed by the laws of India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be notified through the Website or via email. Your continued use of the Services after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Information</h2>
            <p>For questions about these Terms, please contact us:</p>
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
        </div>
      </div>
    </div>
  );
}


