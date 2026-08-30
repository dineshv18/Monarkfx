/* ─────────────────────────────────────────────────────────────
   MonarkFX — Program catalogue (static, SEO-first)
   Each entry powers /courses/programs/[slug]
   ───────────────────────────────────────────────────────────── */

export type ProgramModule = {
    title: string;
    lessons: string[];
};

export type Program = {
    slug: string;
    /* card + hero */
    name: string;
    shortName: string;
    tagline: string;
    market: string;
    image: string;
    duration: string;
    priceOnline: string;
    priceOffline: string;
    /* SEO */
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    /* sections */
    overview: string;
    disclosure: string;
    fitFor: string[];
    beforeYouStart: string[];
    prerequisites: string[];
    topics: string[];
    tools: string[];
    curriculum: ProgramModule[];
    modes: { name: string; description: string; points: string[] }[];
    careers: string[];
    faqs: { q: string; a: string }[];
};

const SHARED_MODES = [
    {
        name: "Online (Live)",
        description:
            "High-definition live streaming with active Q&A. Sessions are recorded and available for revision through your dashboard.",
        points: [
            "3 live sessions per week with your mentor",
            "Every session recorded for lifetime revision",
            "Active chat + voice Q&A during class",
            "Join from anywhere in India",
        ],
    },
    {
        name: "Offline (Classroom)",
        description:
            "In-person mentorship at the MonarkFX academy. Best for hands-on backtesting, peer learning and an immersive trading-floor environment.",
        points: [
            "Face-to-face strategy backtesting with mentors",
            "Access to the academy trading terminals",
            "Direct peer networking with your batch",
            "Priority doubt resolution",
        ],
    },
];

const SHARED_FAQS = [
    {
        q: "Do I need prior trading experience to join?",
        a: "No prior experience is needed. The program is designed to take you from absolute zero: the first modules build your foundation in trading psychology, market structure and risk management, and only then do we move into advanced Smart Money and institutional execution. Traders who already have some screen time still benefit because most of the value is in unlearning bad habits and replacing guesswork with a tested, rule-based process.",
    },
    {
        q: "How much time do I need to commit each week?",
        a: "Plan for roughly 6 to 8 hours a week: three live mentor sessions of about 60 to 90 minutes each, plus 3 to 4 hours of self-study, chart marking and journaling. Every live class is recorded and stays in your dashboard, so if you miss one you can catch up without falling behind. The traders who progress fastest are the ones who treat the practice hours as non-negotiable, not the ones who only attend class.",
    },
    {
        q: "How does the EMI / payment plan work?",
        a: "All plans support interest-free EMI. A single course can be split into 3 monthly payments; the 2-course and combo programs can be spread over 6 months. There is no hidden financing charge — the EMI total equals the listed price plus GST. Tell our team on WhatsApp which plan and mode (online or offline) you want and they will set up the schedule and share the payment link.",
    },
    {
        q: "What is the difference between the online and offline batches?",
        a: "The curriculum, mentors and assignments are identical. Online batches run as high-definition live streams with live chat and voice Q&A, and every session is recorded for lifetime revision — ideal if you are outside Delhi NCR or have a fixed job. Offline batches are held in person at the MonarkFX academy and are better for hands-on backtesting, using the academy terminals and building a peer network with your batchmates. You can start online and shift to offline for a later course if your situation changes.",
    },
    {
        q: "Will I get a certificate, and does it mean anything?",
        a: "Yes. On completion you receive a MonarkFX professional certificate, and MonarkFX is an ISO 21008:2018 certified financial-market academy. The certificate confirms you completed a structured, assessed program — it is useful for prop-firm applications and trading-desk interviews. It is not a regulatory licence and does not by itself authorise you to advise others or manage money.",
    },
    {
        q: "What support do I get after the 2-month program ends?",
        a: "You keep lifetime access to all recorded lessons and course material, plus 1 month of free access to the live Trading Room where mentors analyse the market in real time. After that the Trading Room continues as an optional monthly subscription you can pause or cancel anytime. Graduates also get access to the alumni community and periodic refresher sessions, so you are not left on your own once class finishes.",
    },
    {
        q: "Do you guarantee that I will make money after this course?",
        a: "No, and any course that promises guaranteed returns should be treated as a red flag. This is an education program: it gives you a tested framework, live mentorship and a risk process. Whether you become profitable depends on your discipline, your risk management and market conditions. Trading carries a real risk of loss and past performance of any strategy shown in class does not guarantee future results.",
    },
];

export const PROGRAMS: Program[] = [
    {
        slug: "indian-market-mastery",
        name: "Indian Market Mastery",
        shortName: "Indian Markets",
        tagline: "Dominate Nifty, Bank Nifty, F&O and Equity with institutional precision.",
        market: "Nifty · Bank Nifty · F&O · Equity",
        image: "/courses/indian.png",
        duration: "2 Months",
        priceOnline: "14,999",
        priceOffline: "17,999",
        metaTitle:
            "Indian Market Mastery Course — Nifty, Bank Nifty & F&O Trading | MonarkFX",
        metaDescription:
            "Learn Nifty, Bank Nifty, F&O and equity trading with Smart Money and ICT frameworks. 2-month mentor-led program, live sessions, risk management and a professional certificate. Online & offline batches in India.",
        keywords: [
            "Nifty trading course",
            "Bank Nifty course",
            "F&O trading course India",
            "share market course",
            "price action course India",
            "institutional trading course",
            "MonarkFX Indian Market Mastery",
        ],
        overview:
            "Indian Market Mastery is a 2-month, mentor-led program that turns beginners and struggling retail traders into disciplined, rule-based operators in the Indian equity and derivatives markets. The curriculum is built on real price action and Smart Money / ICT concepts — not indicators or theory — and is applied specifically to Nifty, Bank Nifty, F&O and cash equity. You trade live with a mentor three times a week, build your own tested playbook, and finish with a risk framework you can run every session.",
        disclosure:
            "This program is delivered strictly for education and skill-building. It teaches how to read and analyse the Indian equity and derivatives markets — market structure, technical analysis, options mechanics and risk management — using historical and live charts as teaching material. MonarkFX is not a SEBI-registered investment adviser or research analyst. Nothing in this course is investment advice, a portfolio-management service, a trade-execution service, a stock tip or trading signal, or a promise of returns. Trading Nifty, Bank Nifty, F&O and equities carries a real and substantial risk of loss, losses in derivatives can exceed the capital you deposit, and past performance of any strategy shown in class does not guarantee future results. Every trading decision you make after the course is your own; trade only with money you can afford to lose and consult a SEBI-registered adviser before acting.",
        fitFor: [
            "Complete beginners who want a structured, professional start in the Indian markets",
            "Retail traders who are inconsistent and want a rule-based system",
            "Working professionals who can commit to 3 evening sessions a week",
            "Investors who want to add active F&O and intraday skills",
        ],
        beforeYouStart: [
            "Set up a demat + trading account with any Indian broker (we help you choose)",
            "Keep a laptop or desktop for charting — mobile-only is not recommended",
            "Block 3 fixed slots a week for live classes plus ~3 hours for practice",
            "Start with risk capital only — never borrowed money",
        ],
        prerequisites: [
            "No prior trading knowledge required",
            "Basic comfort using a computer and the internet",
            "A TradingView account (free tier is enough to begin)",
            "Willingness to journal every trade honestly",
        ],
        topics: [
            "Market structure & institutional price action",
            "Liquidity, order blocks and fair-value gaps (ICT)",
            "Nifty & Bank Nifty intraday frameworks",
            "Options basics: greeks, expiry behaviour, spreads",
            "F&O position building and hedging",
            "Risk management & position sizing models",
            "Trade planning, journaling and review discipline",
            "Trading psychology and routine building",
        ],
        tools: [
            "TradingView (charting & alerts)",
            "Broker terminal (order execution)",
            "Option chain & OI analysis tools",
            "MonarkFX trade journal template",
            "Economic & event calendar",
        ],
        curriculum: [
            {
                title: "Module 1 — Foundation & Market Structure",
                lessons: [
                    "How Indian markets actually move: participants and sessions",
                    "Reading market structure: breaks of structure & shifts",
                    "Support/resistance the institutional way",
                    "Building your chart workspace",
                ],
            },
            {
                title: "Module 2 — Smart Money & ICT Concepts",
                lessons: [
                    "Liquidity pools and stop hunts",
                    "Order blocks and mitigation",
                    "Fair-value gaps and imbalance",
                    "Premium vs discount pricing",
                ],
            },
            {
                title: "Module 3 — Nifty & Bank Nifty Playbooks",
                lessons: [
                    "Opening-range and first-hour models",
                    "Trend-day vs range-day identification",
                    "Entry, stop and target placement",
                    "Backtesting your playbook",
                ],
            },
            {
                title: "Module 4 — Options & F&O",
                lessons: [
                    "Option greeks in plain language",
                    "Expiry-day behaviour and traps",
                    "Directional spreads and hedges",
                    "Position building for swings",
                ],
            },
            {
                title: "Module 5 — Risk, Psychology & Routine",
                lessons: [
                    "Fixed-fractional and R-multiple sizing",
                    "Daily loss limits and circuit breakers",
                    "The pre-market and post-market routine",
                    "Journaling and weekly review",
                ],
            },
        ],
        modes: SHARED_MODES,
        careers: [
            "Independent full-time or part-time trader",
            "Prop-firm funded trader (FTMO, MyFundedFX and similar)",
            "Dealer / trader at a broking desk",
            "Research or technical analyst",
            "Trading educator or mentor",
        ],
        faqs: [
            {
                q: "Does this course cover investing or only trading?",
                a: "The core focus is active trading — intraday and short-term positions in Nifty, Bank Nifty, F&O and cash equity. That said, the market-structure and Smart Money concepts you learn also sharpen positional and swing decisions, so many students apply the same framework to a longer-horizon equity portfolio after the course.",
            },
            {
                q: "How much trading capital do I need to start?",
                a: "You can complete the entire program on a demo or a very small live account — the goal during the 2 months is a green, tested playbook, not returns. When you do go live, most students start with ₹25,000 to ₹50,000 of genuine risk capital for options and intraday, and scale only after 2 to 3 consistent months. Never trade with borrowed money or funds you need for living expenses.",
            },
            {
                q: "Which broker and tools will I need?",
                a: "Any mainstream Indian broker works; we help you pick one based on charges and platform stability during the first week. For charting you will use TradingView (the free tier is enough to begin), plus an option-chain / open-interest tool and the MonarkFX trade-journal template that is provided in the course.",
            },
            ...SHARED_FAQS,
        ],
    },

    {
        slug: "forex-gold-specialist",
        name: "Forex & Gold Specialist",
        shortName: "Forex & Gold",
        tagline: "Master EUR/USD, GBP/JPY and XAUUSD with institutional order flow.",
        market: "EUR/USD · GBP/JPY · XAUUSD",
        image: "/courses/forex.png",
        duration: "2 Months",
        priceOnline: "14,999",
        priceOffline: "17,999",
        metaTitle:
            "Forex & Gold Trading Course — XAUUSD, EUR/USD & Major Pairs | MonarkFX",
        metaDescription:
            "Master forex and gold (XAUUSD) trading with institutional order flow, session timing and macro setups. 2-month mentor-led program with live sessions, risk frameworks and a professional certificate.",
        keywords: [
            "forex trading course India",
            "gold trading course",
            "XAUUSD course",
            "EUR USD trading course",
            "order flow course",
            "smart money forex course",
            "MonarkFX Forex Gold Specialist",
        ],
        overview:
            "Forex & Gold Specialist is a 2-month, mentor-led program focused on the world's most liquid markets — major currency pairs and gold (XAUUSD). You learn to read institutional order flow, trade the London and New York sessions, and align entries with macro drivers like interest rates and risk sentiment. The approach is pure price action and Smart Money concepts, applied through a tested playbook you build and backtest with a mentor three times a week.",
        disclosure:
            "This program exists to teach a skill, not to manage your money. It covers how currency and commodity markets are structured, how to analyse order flow and session behaviour, how macro data moves price, and how to size and control risk — using historical and live charts as study material. MonarkFX is an education provider, not a registered investment adviser, broker or fund manager. Nothing here is investment advice, portfolio management, order execution, a trading signal, or any assurance of profit. Forex and gold trade with high leverage, which magnifies both gains and losses; a leveraged position can be closed out for more than the margin you posted, and any results or setups demonstrated in class are illustrative and do not predict future outcomes. What you do in a live account after the course is entirely your responsibility — risk only capital you can afford to lose and take independent professional advice where required.",
        fitFor: [
            "Traders who want to trade global markets outside Indian hours",
            "Beginners drawn to forex and gold but unsure where to start",
            "Retail forex traders who keep getting stopped out and want structure",
            "Anyone preparing for international prop-firm challenges",
        ],
        beforeYouStart: [
            "Open a demo account with a regulated forex broker (we guide broker choice)",
            "Understand that forex/gold trading carries high leverage risk",
            "Keep evenings free — the best setups are in the London & NY sessions",
            "Use risk capital only and start on demo until your playbook is green",
        ],
        prerequisites: [
            "No prior forex experience required",
            "A TradingView account for charting",
            "Basic understanding of what a currency pair is (covered again in Module 1)",
            "Commitment to journal every trade",
        ],
        topics: [
            "Institutional order flow and market structure",
            "Liquidity, order blocks and fair-value gaps (ICT)",
            "Session timing: Asia, London, New York",
            "Gold (XAUUSD) behaviour and volatility",
            "Macro drivers: rates, DXY, risk-on / risk-off",
            "Risk management & position sizing",
            "Trade planning, journaling and review",
            "Psychology for leveraged markets",
        ],
        tools: [
            "TradingView (charting & alerts)",
            "MT4 / MT5 broker terminal",
            "Forex economic calendar (news & events)",
            "DXY and correlation dashboards",
            "MonarkFX trade journal template",
        ],
        curriculum: [
            {
                title: "Module 1 — Forex & Gold Foundations",
                lessons: [
                    "How the FX market is structured: banks, brokers, retail",
                    "Pairs, pips, lots and leverage",
                    "Why gold trades like it does",
                    "Setting up MT4/MT5 and TradingView",
                ],
            },
            {
                title: "Module 2 — Institutional Order Flow",
                lessons: [
                    "Liquidity engineering and stop runs",
                    "Order blocks and mitigation blocks",
                    "Fair-value gaps and imbalance",
                    "Premium/discount and dealing ranges",
                ],
            },
            {
                title: "Module 3 — Session-Based Playbooks",
                lessons: [
                    "Asian range and London open model",
                    "New York reversal and continuation",
                    "XAUUSD volatility windows",
                    "Backtesting across 6 months of data",
                ],
            },
            {
                title: "Module 4 — Macro & Context",
                lessons: [
                    "Reading the economic calendar",
                    "Interest-rate expectations and the DXY",
                    "Risk-on vs risk-off and correlations",
                    "Avoiding high-impact news traps",
                ],
            },
            {
                title: "Module 5 — Risk, Psychology & Routine",
                lessons: [
                    "R-multiple sizing under high leverage",
                    "Daily and weekly loss limits",
                    "Pre-session and post-session routine",
                    "Journaling and weekly performance review",
                ],
            },
        ],
        modes: SHARED_MODES,
        careers: [
            "Independent forex / gold trader",
            "International prop-firm funded trader",
            "Trading educator or signals provider",
            "Analyst at a forex or commodities desk",
            "Portfolio assistant for a trading team",
        ],
        faqs: [
            {
                q: "Is forex trading legal for Indian residents?",
                a: "Trading INR-based currency derivatives (USD/INR, EUR/INR and similar) on Indian exchanges such as NSE is fully permitted and regulated. Trading international pairs like EUR/USD or GBP/JPY through offshore brokers sits in a regulatory grey area for Indian residents under FEMA. We teach the price-action and order-flow skills using major pairs and gold, and we cover the compliance context openly so you can decide what is appropriate for your situation.",
            },
            {
                q: "Do I need a big account to trade forex and gold?",
                a: "No. Because forex and gold are highly leveraged, position size matters far more than account size. You will spend the course on demo until your playbook is consistently green, and when you go live most students begin with a small account and a strict per-trade risk of 0.5 to 1 percent. Leverage cuts both ways — it can liquidate an under-margined position for more than you deposited — so the course spends real time on sizing and stop discipline.",
            },
            {
                q: "Which platform will I be trading on?",
                a: "You will learn on TradingView for analysis and MT4 or MT5 for execution, since those are the industry standard for forex and gold. We also walk through reading a forex economic calendar and the DXY / correlation dashboards so you can keep entries aligned with the macro backdrop rather than trading blind into high-impact news.",
            },
            ...SHARED_FAQS,
        ],
    },

    {
        slug: "crypto-institutional-edge",
        name: "Crypto Institutional Edge",
        shortName: "Crypto",
        tagline: "Dominate spot & futures across BTC, ETH and high-alpha altcoins.",
        market: "BTC · ETH · Altcoins · Futures",
        image: "/courses/crypto.png",
        duration: "2 Months",
        priceOnline: "14,999",
        priceOffline: "17,999",
        metaTitle:
            "Crypto Trading Course — BTC, ETH, Altcoins & Futures | MonarkFX",
        metaDescription:
            "Learn spot and futures crypto trading across BTC, ETH and altcoins with institutional price action and on-chain analysis. 2-month mentor-led program, live sessions, risk frameworks and a professional certificate.",
        keywords: [
            "crypto trading course India",
            "bitcoin trading course",
            "crypto futures course",
            "altcoin trading course",
            "on-chain analysis course",
            "smart money crypto course",
            "MonarkFX Crypto Institutional Edge",
        ],
        overview:
            "Crypto Institutional Edge is a 2-month, mentor-led program for trading Bitcoin, Ethereum and high-alpha altcoins across spot and futures. You learn institutional price action and Smart Money concepts adapted to a 24/7 market, layer in on-chain and exchange data, and manage the leverage risk that ends most crypto accounts. You trade live with a mentor three times a week and finish with a tested playbook and a strict risk framework.",
        disclosure:
            "This program is purely educational. It teaches how digital-asset markets work — spot and perpetual-futures mechanics, price-action analysis, on-chain and funding data, and disciplined risk management — with historical and live charts used as learning material. MonarkFX does not provide investment advice, run a portfolio-management service, execute trades on your behalf, sell trading signals, or guarantee any return, and it is not a registered adviser or exchange. Crypto assets are highly volatile and can lose value rapidly; futures positions use leverage and can be liquidated in full, and any strategy performance shown in class is for illustration only and is not indicative of future results. All trades you place after the course are your own decision — commit only funds you can afford to lose entirely and seek qualified advice on tax and suitability before you act.",
        fitFor: [
            "Traders who want to operate a 24/7 market with a real edge",
            "Crypto holders who want to actively trade, not just HODL",
            "Retail futures traders who keep getting liquidated and want structure",
            "Anyone moving from Indian markets or forex into digital assets",
        ],
        beforeYouStart: [
            "Create accounts on a major spot and a major futures exchange (we advise on choice and security)",
            "Enable 2FA and learn wallet hygiene — covered in Module 1",
            "Understand that crypto leverage can liquidate positions fast",
            "Start with risk capital only and paper-trade until your playbook is green",
        ],
        prerequisites: [
            "No prior crypto trading experience required",
            "A TradingView account for charting",
            "Basic understanding of what a blockchain wallet is (revisited in Module 1)",
            "Commitment to journal every trade",
        ],
        topics: [
            "Institutional price action in a 24/7 market",
            "Liquidity, order blocks and fair-value gaps (ICT)",
            "Spot vs perpetual futures and funding rates",
            "On-chain metrics and exchange flow analysis",
            "Altcoin rotation and BTC dominance",
            "Risk management under high leverage",
            "Trade planning, journaling and review",
            "Psychology for a market that never closes",
        ],
        tools: [
            "TradingView (charting & alerts)",
            "Spot & futures exchange terminals",
            "On-chain dashboards (exchange flows, funding, OI)",
            "Wallet & 2FA security setup",
            "MonarkFX trade journal template",
        ],
        curriculum: [
            {
                title: "Module 1 — Crypto Foundations & Security",
                lessons: [
                    "How crypto markets and exchanges work",
                    "Spot, margin and perpetual futures explained",
                    "Wallet types, custody and 2FA security",
                    "Setting up your charting and exchange workspace",
                ],
            },
            {
                title: "Module 2 — Institutional Price Action",
                lessons: [
                    "Liquidity hunts in a 24/7 market",
                    "Order blocks and mitigation",
                    "Fair-value gaps and imbalance",
                    "Premium/discount and dealing ranges",
                ],
            },
            {
                title: "Module 3 — Futures, Funding & Playbooks",
                lessons: [
                    "Funding rates and open interest as signals",
                    "BTC / ETH intraday and swing models",
                    "Long/short setups with defined risk",
                    "Backtesting across market regimes",
                ],
            },
            {
                title: "Module 4 — On-Chain & Altcoin Rotation",
                lessons: [
                    "Exchange inflows/outflows and what they mean",
                    "BTC dominance and the altcoin cycle",
                    "Screening altcoins for liquidity and alpha",
                    "Avoiding low-liquidity traps and scams",
                ],
            },
            {
                title: "Module 5 — Risk, Psychology & Routine",
                lessons: [
                    "Sizing and stop placement under leverage",
                    "Daily loss limits and liquidation buffers",
                    "Building a routine around a market that never sleeps",
                    "Journaling and weekly performance review",
                ],
            },
        ],
        modes: SHARED_MODES,
        careers: [
            "Independent crypto spot / futures trader",
            "Prop-firm funded crypto trader",
            "On-chain or market analyst",
            "Trading educator or research writer",
            "Trader for a crypto fund or desk",
        ],
        faqs: [
            {
                q: "Is crypto trading legal in India?",
                a: "Yes, crypto trading is legal for Indian residents. Gains are taxed under the current virtual-digital-asset rules — a flat 30 percent tax on profits plus 1 percent TDS on transfers, with losses that cannot be set off against other income. We cover the tax and compliance basics in class so you can keep clean records and trade responsibly, but this is not tax advice and you should confirm your position with a qualified professional.",
            },
            {
                q: "Do I need to understand blockchain or coding for this?",
                a: "No. This is a trading course, not a development course. Module 1 revisits the essentials — what a wallet is, how exchanges work, and the difference between spot, margin and perpetual futures — in plain language. The focus after that is price action, funding and on-chain data as trading signals, not smart-contract programming.",
            },
            {
                q: "How do you handle the risk of crypto volatility and liquidation?",
                a: "Head on. A large part of the program is position sizing under leverage, keeping a liquidation buffer, and hard daily loss limits — because leverage and 24/7 volatility are exactly what end most crypto accounts. You will practise on paper or small size until your playbook is green, and you will learn wallet and 2FA security in Module 1 so exchange risk is managed too.",
            },
            ...SHARED_FAQS,
        ],
    },
];

export const getProgram = (slug: string) =>
    PROGRAMS.find((p) => p.slug === slug);

export const programSlugs = PROGRAMS.map((p) => p.slug);
