import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Risk Disclaimer',
    description: 'Read Monark FX Risk Disclaimer to understand the risks associated with trading. Learn about trading risks, market volatility, leverage risks, and your responsibilities as a trader.',
    keywords: [
        'risk disclaimer',
        'trading risks',
        'trading disclaimer',
        'investment risks',
        'forex risks',
        'trading warnings',
        'Monark FX disclaimer',
        'trading education disclaimer',
        'market risks'
    ],
    openGraph: {
        title: 'Risk Disclaimer | Monark FX',
        description: 'Read Monark FX Risk Disclaimer to understand the risks associated with trading and financial markets.',
        url: 'https://monarkfx.com/disclaimer',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Risk Disclaimer | Monark FX',
        description: 'Read Monark FX Risk Disclaimer to understand the risks associated with trading and financial markets.',
    },
    alternates: {
        canonical: '/disclaimer',
    },
};

export default function Disclaimer() {
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
                    <span className="text-sm font-medium text-primary">
                        Disclaimer
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
                    Risk Disclaimer
                </h1>
                <p className="text-muted-foreground mb-8">
                    Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section className="p-6 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-lg font-semibold text-foreground mb-4">
                            ⚠️ IMPORTANT: Please read this disclaimer carefully before using our services.
                        </p>
                        <p>
                            Trading forex, stocks, and other financial instruments involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Please trade responsibly and only with capital you can afford to lose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Educational Purpose Only</h2>
                        <p>
                            Monark FX provides educational content, training, and mentorship services related to trading and financial markets. Our services are designed for educational purposes only and do not constitute:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Investment advice or recommendations</li>
                            <li>Financial planning or advisory services</li>
                            <li>Trading signals or buy/sell recommendations</li>
                            <li>Guarantees of trading success or profits</li>
                            <li>Legal, tax, or accounting advice</li>
                        </ul>
                        <p className="mt-4">
                            The information provided through our courses, materials, and mentorship is for educational and informational purposes only. It should not be considered as a substitute for professional financial advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Trading Risks</h2>

                        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 High Risk of Loss</h3>
                        <p>
                            Trading in forex, stocks, commodities, cryptocurrencies, and other financial instruments carries a high level of risk. You may lose some or all of your invested capital. The risk of loss in trading can be substantial and may exceed your initial investment.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Market Volatility</h3>
                        <p>
                            Financial markets are highly volatile and unpredictable. Market conditions can change rapidly, and prices can move against your position, resulting in significant losses. Past market performance does not guarantee future results.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.3 Leverage Risks</h3>
                        <p>
                            Trading with leverage amplifies both potential profits and losses. While leverage can increase returns, it also significantly increases the risk of substantial losses. You may lose more than your initial investment when trading with leverage.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.4 No Guarantee of Success</h3>
                        <p>
                            There is no guarantee that you will achieve profits or success in trading, regardless of the education, training, or mentorship you receive. Trading success depends on numerous factors including market conditions, your skill level, risk management, and discipline.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Not Suitable for All Investors</h2>
                        <p>
                            Trading is not suitable for everyone. You should carefully consider whether trading is appropriate for you based on your:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Financial situation and resources</li>
                            <li>Investment objectives and goals</li>
                            <li>Risk tolerance and capacity</li>
                            <li>Experience and knowledge level</li>
                            <li>Time commitment and availability</li>
                        </ul>
                        <p className="mt-4">
                            If you are unsure whether trading is suitable for you, please consult with a qualified financial advisor before making any trading decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. No Investment Recommendations</h2>
                        <p>
                            Monark FX does not provide investment advice, trading signals, or recommendations to buy, sell, or hold any financial instrument. Any examples, case studies, or scenarios presented in our educational content are for illustrative purposes only and should not be construed as:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Trading recommendations or signals</li>
                            <li>Investment advice or suggestions</li>
                            <li>Guarantees of similar results</li>
                            <li>Endorsements of specific trading strategies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Past Performance Disclaimer</h2>
                        <p>
                            Past performance, whether actual or indicated by historical tests of strategies, is not indicative of future results. Trading results can vary significantly, and there is no guarantee that you will achieve similar results or profits.
                        </p>
                        <p className="mt-4">
                            Any performance data, statistics, or results shared in our educational content are for informational purposes only and should not be relied upon as a predictor of future performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Responsibility</h2>
                        <p>
                            You are solely responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All trading decisions and actions you take</li>
                            <li>The management of your trading account and capital</li>
                            <li>Understanding and managing the risks associated with trading</li>
                            <li>Complying with all applicable laws and regulations</li>
                            <li>Seeking professional advice when necessary</li>
                            <li>Evaluating the suitability of trading for your personal circumstances</li>
                        </ul>
                        <p className="mt-4">
                            Monark FX is not responsible for any losses, damages, or negative consequences resulting from your trading activities or decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">7. Regulatory Compliance</h2>
                        <p>
                            Trading activities may be subject to regulation in your jurisdiction. It is your responsibility to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Understand and comply with all applicable laws and regulations</li>
                            <li>Ensure that trading is legal in your jurisdiction</li>
                            <li>Use only regulated and licensed brokers or trading platforms</li>
                            <li>Report trading activities for tax purposes as required by law</li>
                        </ul>
                        <p className="mt-4">
                            Monark FX does not provide legal, tax, or regulatory advice. Please consult with appropriate professionals for guidance on these matters.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">8. Technology and Platform Risks</h2>
                        <p>
                            Trading platforms and technology systems may experience:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Technical failures, interruptions, or delays</li>
                            <li>System errors or bugs</li>
                            <li>Internet connectivity issues</li>
                            <li>Cyber security threats or breaches</li>
                        </ul>
                        <p className="mt-4">
                            These issues may prevent you from executing trades, accessing your account, or managing your positions, potentially resulting in losses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">9. Third-Party Services</h2>
                        <p>
                            Our educational content may reference or discuss third-party brokers, trading platforms, tools, or services. Monark FX does not endorse, recommend, or guarantee the services of any third party. You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Conducting your own due diligence on any third-party services</li>
                            <li>Verifying the legitimacy and regulatory status of brokers or platforms</li>
                            <li>Understanding the terms, conditions, and risks of third-party services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Monark FX, its officers, directors, employees, instructors, and agents shall not be liable for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Any trading losses or financial damages</li>
                            <li>Loss of profits, revenue, or opportunities</li>
                            <li>Decisions made based on our educational content</li>
                            <li>Inability to access or use our services</li>
                            <li>Any indirect, incidental, or consequential damages</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">11. Acknowledgment</h2>
                        <p>
                            By using Monark FX&apos;s services, you acknowledge that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You have read, understood, and agree to this disclaimer</li>
                            <li>You understand the risks associated with trading</li>
                            <li>You are solely responsible for your trading decisions and outcomes</li>
                            <li>You will not hold Monark FX liable for any trading losses</li>
                            <li>You have the financial capacity to bear potential losses</li>
                            <li>Trading may not be suitable for your circumstances</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">12. Seek Professional Advice</h2>
                        <p>
                            Before engaging in trading activities, we strongly recommend that you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Consult with a qualified financial advisor</li>
                            <li>Seek advice from a licensed investment professional</li>
                            <li>Understand your local regulations and tax implications</li>
                            <li>Start with a demo account or small capital amounts</li>
                            <li>Continuously educate yourself and practice risk management</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
                        <p>If you have questions about this disclaimer, please contact us:</p>
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

                    <section className="p-6 rounded-lg bg-primary/10 border border-primary/30 mt-8">
                        <p className="text-center font-semibold text-foreground">
                            Remember: Only trade with capital you can afford to lose. Trading involves risk, and you may lose your entire investment.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}


