import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read Monark FX Privacy Policy to understand how we collect, use, and protect your personal information. Learn about data security, cookies, and your privacy rights.',
  keywords: [
    'privacy policy',
    'data protection',
    'privacy rights',
    'data security',
    'cookie policy',
    'Monark FX privacy',
    'trading education privacy',
    'personal information protection'
  ],
  openGraph: {
    title: 'Privacy Policy | Monark FX',
    description: 'Read Monark FX Privacy Policy to understand how we collect, use, and protect your personal information.',
    url: 'https://monarkfx.com/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Monark FX',
    description: 'Read Monark FX Privacy Policy to understand how we collect, use, and protect your personal information.',
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container px-4 py-16 md:py-24 max-w-4xl mx-auto">
      {/* Navigation Links */}
      <div className="mb-8 p-4 rounded-lg bg-card border border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span className="text-sm font-medium text-primary">
            Privacy Policy
          </span>
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to Monark FX (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong className="text-foreground">monarkfx.com</strong> and use our services.
            </p>
            <p>
              By accessing or using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Contact Information:</strong> Name, email address, phone number, postal address</li>
              <li><strong className="text-foreground">Account Information:</strong> Username, password, account preferences</li>
              <li><strong className="text-foreground">Payment Information:</strong> Billing address, payment method details (processed through secure third-party payment processors)</li>
              <li><strong className="text-foreground">Educational Information:</strong> Course enrollment details, progress tracking, assessment results</li>
              <li><strong className="text-foreground">Communication Data:</strong> Messages, inquiries, feedback, and correspondence with us</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information (type, operating system)</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our educational services</li>
              <li>To process enrollments, payments, and course access</li>
              <li>To communicate with you about your account, courses, and updates</li>
              <li>To respond to your inquiries, comments, and support requests</li>
              <li>To send educational content, newsletters, and promotional materials (with your consent)</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Service Providers:</strong> With trusted third-party service providers who assist in operating our website, processing payments, or conducting business operations (under strict confidentiality agreements)</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
              <li><strong className="text-foreground">Protection of Rights:</strong> To protect our rights, property, safety, or that of our users</li>
              <li><strong className="text-foreground">With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure server infrastructure and regular security audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie preferences through your browser settings. However, disabling cookies may limit certain website functionalities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Access:</strong> Request access to your personal data</li>
              <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
              <li><strong className="text-foreground">Objection:</strong> Object to processing of your personal data</li>
              <li><strong className="text-foreground">Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong className="text-foreground">Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:service@monarkfx.com" className="text-primary hover:underline">service@monarkfx.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
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


