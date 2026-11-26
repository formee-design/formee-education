/* Formee store data. Industries and tools follow the CEO's catalogue (by Zubair/formee-ai-site 2/content/catalogue.json),
   plus Pulse under Sales and Marketing. Names/short names, colours, scenes and one-line descriptions are our presentation layer.
   Pricing comes from the CEO's pricing.json: illustrative starter prices, NOT final. */
window.FD = (() => {
  // Prices: each tool can carry its own "prices" ({ basic|standard|premium: { monthly, annual_monthly } }).
  // Tools without it use the shared PRICING.tiers. Bundles are worked out from the tools' own prices (2026-11-26).
  const PULSE_URL = 'https://formee-design.github.io/formee-education/prototypes/ai-social-media/pulse-landing/index.html';
  const BUSINESSES = [
  {
    "id": "hr",
    "icon": "users",
    "banner": "assets/industries/hr-banner.jpg",
    "name": "HR",
    "headline": "AI tools for HR.",
    "tagline": "Hiring, staff records and an AI team.",
    "desc": "From hiring and leave to an AI team that runs your routine back-office work. Two tools today, with more on the way.",
    "comingSoon": true,
    "products": [
      {
        "slug": "hr-module",
        "heroVisual": true,
        "prices": {
          "basic": { "monthly": 29, "annual_monthly": 23 },
          "standard": { "monthly": 79, "annual_monthly": 63 },
          "premium": { "monthly": 199, "annual_monthly": 159 }
        },
        "name": "HR Module",
        "short": "HR Module",
        "scene": "hr",
        "summary": "Hiring, leave and staff records in one portal.",
        "desc": "One HR portal for the whole staff journey: recruitment with AI screening, leave and approvals, staff records and shifts, and HR documents.",
        "highlights": [
          [
            "Hire with AI screening",
            "Post jobs to your careers page, let AI screen applicants, then manage interviews, offers and a talent pool in one place.",
            "users"
          ],
          [
            "Leave and approvals",
            "Staff request leave online and managers approve it in a few clicks, with a clear record of every decision.",
            "calendar-clock"
          ],
          [
            "Staff records and HR documents",
            "Keep staff records, teams, shifts, policies and HR documents together, with reminders when a document is due for review.",
            "id-card"
          ]
        ],
        "page": {
          "journey": {
          "type": "flow",
          "title": "One flow, from headcount to training.",
          "steps": [
            [
              "Plan headcount",
              "Set departments, teams and positions, and how many people each still needs.",
              [
                "Departments"
              ]
            ],
            [
              "Hire",
              "Post jobs, screen applicants with AI and send offers.",
              [
                "Jobs",
                "Talent pool"
              ]
            ],
            [
              "Bring them on board",
              "When a contract is accepted, the new hire moves into your staff records in one step.",
              [
                "Move to Staff"
              ]
            ],
            [
              "Manage",
              "Approvals, shifts, attendance and HR documents in one place.",
              [
                "Approvals",
                "Work shifts",
                "Documents"
              ]
            ],
            [
              "Develop",
              "Training events with sessions, attendees and required documents.",
              [
                "Events"
              ]
            ]
          ]
        },
        "features": [
            {
              "title": "Hire with AI screening",
              "text": "Every application gets an AI match score and a short analysis of fit, strengths and risks, so your team reviews the strongest candidates first.",
              "points": [
                "A match score from 0 to 100 for each application",
                "Screening questions compared with your ideal answers",
                "A talent pool that brings good candidates back for other roles"
              ],
              "visual": "scene:hrAiScore"
            },
            {
              "title": "Staff, approvals and shifts",
              "text": "Keep current, incoming and past staff in one list, and handle everyday requests without spreadsheets.",
              "points": [
                "Approval types for leave, business trips, overtime and reimbursement",
                "Shift templates with fixed or flexible working hours",
                "Clock-in records with late and overtime flags"
              ],
              "visual": "scene:hrApprovals"
            },
            {
              "title": "Documents and communication",
              "text": "Issue HR documents from versioned templates and keep people informed with ready-made emails.",
              "points": [
                "AI writes an email from a few lines of requirements",
                "Templates fill in each person's details when you send",
                "Issue documents to one person or a whole department, with review reminders"
              ],
              "visual": "scene:hrAiEmail"
            },
            {
              "title": "Training and events",
              "text": "Plan workshops and training with AI suggestions for categories, sessions and learning outcomes.",
              "points": [
                "A three-step event setup",
                "Attendees and required documents tracked for each session",
                "A summary document for every event"
              ],
              "visual": "scene:hrAiSessions"
            }
          ],
          "ai": {
            "title": "AI where it saves time.",
            "items": [
              [
                "sparkles",
                "Match score on every application",
                "Applications are scored and summarised before anyone opens them."
              ],
              [
                "mail",
                "One brief, one email draft",
                "Describe what the email needs to say, and AI writes it."
              ],
              [
                "graduation-cap",
                "To a training event",
                "AI suggests categories, sessions and learning outcomes as you go."
              ],
              [
                "lightbulb",
                "An assistant while you review",
                "Ask questions about an applicant or a document as you read it."
              ]
            ]
          },
          "extra": {
            "title": "Built for education providers.",
            "text": "Features education providers need, beyond a general HR tool.",
            "items": [
              [
                "school",
                "Staff to student ratio",
                "Staff to student ratios worked out by campus and discipline for regulator reporting, with the share of casual staff checked.",
          "Photo: university campus"
              ],
              [
                "id-card",
                "Academic staff types",
                "Tag staff as academic teaching, academic non-teaching or general staff.",
          "Photo: lecturer with students"
              ],
              [
                "clipboard-check",
                "Reporting data",
                "Collect the staff details your reporting needs in the same record.",
          "Photo: staff member at a desk"
              ]
            ]
          },
          "faq": [
            [
              "Does AI decide who gets hired?",
              "No. AI gives each application a match score and a short analysis. Your team reviews applicants and makes every decision."
            ],
            [
              "Who uses HR Module?",
              "HR staff, hiring managers and department managers. Access is set per group, module by module."
            ],
            [
              "Can we manage more than one organisation?",
              "Yes. One account can switch between several companies, each with its own departments, approval types and settings."
            ],
            [
              "How can I try HR Module?",
              "Start a 14-day free trial, or request a demo and the Formee team will walk you through it."
            ]
          ]
        }
      },
      {
        "slug": "crew-os",
        "prices": {
          "basic": { "monthly": 29, "annual_monthly": 23 },
          "standard": { "monthly": 79, "annual_monthly": 63 },
          "premium": { "monthly": 199, "annual_monthly": 159 }
        },
        "name": "Crew OS",
        "short": "Crew OS",
        "scene": "crewos",
        "summary": "An AI team for your daily back-office work.",
        "desc": "Describe your organisation in plain language, and Crew OS designs, trains and runs a team of AI agents, from a CEO agent to accounts, HR and reception, that handles routine work and brings only the exceptions to you.",
        "highlights": [
          [
            "A team from one description",
            "Crew OS turns a description of your business into an org chart of AI roles, each with responsibilities, tools and a reporting line.",
            "network"
          ],
          [
            "Trained on your own rules",
            "Agents learn from your procedures and documents, and must pass role checks and a practice week before they go live.",
            "book-open"
          ],
          [
            "You stay in control",
            "Agents take on work one step at a time. Exceptions, safety issues and payments above your limits always come to a person, and you can pause any agent.",
            "shield-check"
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-purple-300)",
    "c2": "var(--color-brand-violet)"
  },
  {
    "id": "education",
    "icon": "graduation-cap",
    "name": "Education",
    "headline": "AI tools for Education.",
    "tagline": "From school admin to young learners.",
    "desc": "From school admin to young learners: five AI tools for education, in one place.",
    "comingSoon": false,
    "products": [
      {
        "slug": "lms",
        "name": "Learning Management System",
        "short": "LMS",
        "scene": "lms",
        "summary": "Learning management system.",
        "desc": "Deliver courses, track progress and keep every learner on the same page.",
        "highlights": [
          [
            "Learning management",
            "A learning management system built into the Formee education range."
          ],
          [
            "Works with Course Design and Grading",
            "Sits alongside Formee’s other education tools in one place."
          ]
        ]
      },
      {
        "slug": "sms",
        "name": "Student Management System",
        "short": "SMS",
        "scene": "sms",
        "summary": "Student management system.",
        "desc": "Enrolments, attendance and student records for running a school or college.",
        "highlights": [
          [
            "Student management",
            "A student management system for school and college administration."
          ],
          [
            "Part of the education range",
            "One of five Formee AI tools for education."
          ]
        ]
      },
      {
        "slug": "lumina-for-kids",
        "name": "Lumina for Kids",
        "short": "Lumina for Kids",
        "scene": "lumina",
        "summary": "AI learning companion for children.",
        "desc": "An AI learning companion designed for children, private by design.",
        "highlights": [
          [
            "Made for young learners",
            "An AI learning companion designed for children."
          ],
          [
            "Private by design",
            "Privacy and compliance are built in from the start."
          ]
        ]
      },
      {
        "slug": "grading",
        "name": "Marking & Grading Tool",
        "short": "Marking & Grading",
        "scene": "marking",
        "summary": "AI-assisted grading.",
        "desc": "AI-assisted grading, with feedback teachers can review and edit.",
        "highlights": [
          [
            "AI-assisted grading",
            "AI support for the grading work educators do every week."
          ],
          [
            "Part of the education range",
            "Sits alongside LMS and Course Design in one place."
          ]
        ]
      },
      {
        "slug": "course-design",
        "name": "Course Design",
        "short": "Course Design",
        "scene": "course",
        "summary": "AI-assisted course design.",
        "desc": "AI-assisted course design for schools, colleges and course providers.",
        "highlights": [
          [
            "AI-assisted course design",
            "AI support for planning and building courses."
          ],
          [
            "Part of the education range",
            "Works alongside LMS and Grading in one place."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-blue-300)",
    "c2": "var(--color-brand-primary)"
  },
  {
    "id": "security",
    "icon": "shield-check",
    "name": "Security",
    "headline": "AI tools for Security.",
    "tagline": "AI video security and monitoring.",
    "desc": "AI video security and monitoring with BigBrother, plus Security Watchdog.",
    "comingSoon": false,
    "products": [
      {
        "slug": "bigbrother",
        "name": "BigBrother",
        "short": "BigBrother",
        "scene": "bigbrother",
        "summary": "AI video security and monitoring.",
        "desc": "AI video security and monitoring that spots what matters on every camera.",
        "highlights": [
          [
            "AI video security",
            "AI applied to video security and monitoring."
          ],
          [
            "Works with Security Watchdog",
            "One of two Formee AI tools for security."
          ]
        ]
      },
      {
        "slug": "security-watchdog",
        "name": "Security Watchdog",
        "short": "Security Watchdog",
        "scene": "secwatch",
        "summary": "AI watchdog for your security.",
        "desc": "An AI watchdog for your security that flags unusual activity as it happens.",
        "highlights": [
          [
            "An AI watchdog",
            "AI that keeps watch over your security."
          ],
          [
            "Works with BigBrother",
            "One of two Formee AI tools for security."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-red-300)",
    "c2": "var(--color-scale-rose-400)"
  },
  {
    "id": "childcare",
    "icon": "baby",
    "name": "Childcare",
    "headline": "AI tools for Childcare.",
    "tagline": "Humanoid robot software for childcare centres.",
    "desc": "Childcare Humanoid Robotics brings AI humanoid robotics to childcare centres: humanoid robot software, built for the way childcare works.",
    "comingSoon": false,
    "products": [
      {
        "slug": "childcare-humanoid-robotics",
        "name": "Childcare Humanoid Robotics",
        "short": "Humanoid Robotics",
        "scene": "robotics",
        "summary": "AI humanoid robotics for childcare centres.",
        "desc": "Humanoid robot software that helps children learn and play, designed around childcare routines.",
        "highlights": [
          [
            "Humanoid robot software",
            "Software for humanoid robots, built for childcare settings."
          ],
          [
            "Built for childcare centres",
            "Designed around the way childcare centres work."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-yellow-300)",
    "c2": "var(--color-scale-orange-300)"
  },
  {
    "id": "health",
    "icon": "heart-pulse",
    "name": "Health",
    "headline": "AI tools for Health.",
    "tagline": "Aged care, hospitals and dental.",
    "desc": "Two AI tools for care: one platform for aged care, and a human rights stack for aged care, hospitals and dental.",
    "comingSoon": false,
    "products": [
      {
        "slug": "aged-care-platform",
        "name": "Aged Care platform",
        "short": "Aged Care",
        "scene": "agedcare",
        "summary": "AI platform for aged care.",
        "desc": "An AI platform designed for aged care providers, private by design.",
        "highlights": [
          [
            "Built for aged care",
            "An AI platform designed for aged care providers."
          ],
          [
            "Private by design",
            "Privacy and compliance are built in from the start."
          ]
        ]
      },
      {
        "slug": "ai-human-rights-stack",
        "name": "AI Human Rights Stack",
        "short": "Human Rights Stack",
        "scene": "rights",
        "summary": "For aged care, hospitals and dental.",
        "desc": "A human rights stack for aged care, hospitals and dental. Currently in design.",
        "highlights": [
          [
            "Three care settings",
            "Designed for aged care, hospitals and dental."
          ],
          [
            "Currently in design",
            "Talk to the Formee team to follow its progress."
          ]
        ],
        "status": "In design"
      }
    ],
    "c1": "var(--color-scale-teal-300)",
    "c2": "var(--color-scale-teal-500)"
  },
  {
    "id": "real-estate",
    "icon": "house",
    "name": "Real Estate",
    "headline": "AI tools for Real Estate.",
    "tagline": "An AI platform for real estate.",
    "desc": "Plotara is Formee’s AI platform for the real estate industry.",
    "comingSoon": false,
    "products": [
      {
        "slug": "plotara",
        "name": "Plotara",
        "short": "Plotara",
        "scene": "plotara",
        "summary": "AI platform for the real estate industry.",
        "desc": "Analyse a site, see what can be built on it and spot the risks before you commit.",
        "highlights": [
          [
            "Made for real estate",
            "Built for the real estate industry."
          ],
          [
            "Part of Formee",
            "One of 15 AI tools across eight industries."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-orange-300)",
    "c2": "var(--color-scale-rose-300)"
  },
  {
    "id": "sports",
    "icon": "trophy",
    "name": "Sports",
    "headline": "AI tools for Sports.",
    "tagline": "One performance platform, 30 sports.",
    "desc": "Primeform is an all-in-one AI sports app: one performance platform covering 30 sports.",
    "comingSoon": false,
    "products": [
      {
        "slug": "primeform",
        "name": "Primeform",
        "short": "Primeform",
        "scene": "primeform",
        "summary": "All-in-one AI sports app covering 30 sports.",
        "desc": "Training load, recovery and performance in one AI sports app, across 30 sports.",
        "highlights": [
          [
            "All-in-one",
            "Everything in one AI sports app."
          ],
          [
            "30 sports",
            "One platform covers 30 different sports."
          ],
          [
            "AI performance",
            "An AI platform built for sports performance."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-rose-300)",
    "c2": "var(--color-brand-accent)"
  },
  {
    "id": "sales-marketing",
    "icon": "trending-up",
    "name": "Sales and Marketing",
    "headline": "AI tools for Sales and Marketing.",
    "tagline": "Verified lead data for sales and marketing.",
    "desc": "AI lead data verification with BlueGen, and on-brand social content with Pulse.",
    "comingSoon": false,
    "products": [
      {
        "slug": "bluegen",
        "name": "BlueGen",
        "short": "BlueGen",
        "scene": "leads",
        "summary": "AI lead data verification.",
        "desc": "AI lead data verification, so your team only spends time on real, reachable leads.",
        "highlights": [
          [
            "Lead data verification",
            "AI verification of lead data."
          ],
          [
            "For sales teams",
            "Verified lead data for sales teams."
          ],
          [
            "For marketing teams",
            "Verified lead data for marketing teams."
          ]
        ]
      },
      {
        "slug": "pulse",
        "name": "Pulse",
        "short": "Pulse",
        "scene": "pulse",
        "external": true,
        "summary": "AI content platform for social media.",
        "desc": "An AI content platform that turns your brand into ready-to-post images, carousels and videos.",
        "highlights": [
          [
            "On-brand content",
            "Images, carousels and videos that follow your brand kit."
          ],
          [
            "Plan and publish",
            "Schedule posts to every channel from one place."
          ]
        ]
      }
    ],
    "c1": "var(--color-scale-cyan-300)",
    "c2": "var(--color-scale-blue-400)"
  }
];
  BUSINESSES.forEach(b => b.products.forEach(p => { if (p.external) p.href = PULSE_URL; }));
  const PRICING = {
  "tiers": [
    {
      "id": "basic",
      "name": "Basic",
      "monthly": 29,
      "annual_monthly": 23,
      "trial_card_required": false
    },
    {
      "id": "standard",
      "name": "Standard",
      "monthly": 79,
      "annual_monthly": 63,
      "trial_card_required": false
    },
    {
      "id": "premium",
      "name": "Premium",
      "monthly": 199,
      "annual_monthly": 159,
      "trial_card_required": true
    },
    {
      "id": "enterprise",
      "name": "Enterprise",
      "contact_sales": true
    }
  ],
  "annualDiscount": 20,
  "bundleDiscount": 25,
  "trialDays": 14,
  "moneyBackDays": 30,
  "pending": "Illustrative starter price, suggested, pending Formee confirmation",
  "bundles": [
    {
      "id": "hr-bundle",
      "industry": "hr",
      "name": "HR bundle",
      "tools": [
        "hr-module",
        "crew-os"
      ]
    },
    {
      "id": "education-bundle",
      "industry": "education",
      "name": "Education bundle",
      "tools": [
        "lms",
        "sms",
        "lumina-for-kids",
        "grading",
        "course-design"
      ]
    },
    {
      "id": "security-bundle",
      "industry": "security",
      "name": "Security bundle",
      "tools": [
        "bigbrother",
        "security-watchdog"
      ]
    }
  ],
  "regions": [
    {
      "id": "southeastasia",
      "name": "Southeast Asia (Singapore)"
    },
    {
      "id": "australiaeast",
      "name": "Australia East (Sydney)"
    },
    {
      "id": "westeurope",
      "name": "West Europe (Netherlands)"
    },
    {
      "id": "eastus",
      "name": "East US (Virginia)"
    }
  ],
  "comparison": [
    {
      "label": "Free trial",
      "values": {
        "basic": "14 days, no card",
        "standard": "14 days, no card",
        "premium": "14 days",
        "enterprise": "By arrangement"
      }
    },
    {
      "label": "30-day money-back guarantee",
      "values": {
        "basic": true,
        "standard": true,
        "premium": true,
        "enterprise": "By arrangement"
      }
    },
    {
      "label": "Industry bundles at 25% off",
      "values": {
        "basic": true,
        "standard": true,
        "premium": true,
        "enterprise": "By arrangement"
      }
    },
    {
      "label": "One Formee account and one invoice",
      "values": {
        "basic": true,
        "standard": true,
        "premium": true,
        "enterprise": true
      }
    },
    {
      "label": "Choice of Azure data region",
      "values": {
        "basic": true,
        "standard": true,
        "premium": true,
        "enterprise": true
      }
    },
    {
      "label": "Credits and usage",
      "values": {
        "basic": "To be set by Formee",
        "standard": "To be set by Formee",
        "premium": "To be set by Formee",
        "enterprise": "Custom"
      }
    },
    {
      "label": "Features included",
      "values": {
        "basic": "To be set by Formee",
        "standard": "To be set by Formee",
        "premium": "To be set by Formee",
        "enterprise": "Custom"
      }
    },
    {
      "label": "Support",
      "values": {
        "basic": "To be set by Formee",
        "standard": "To be set by Formee",
        "premium": "To be set by Formee",
        "enterprise": "To be set by Formee"
      }
    }
  ],
  "paymentMethods": [
    "Cards",
    "Apple Pay",
    "Google Pay",
    "PayPal"
  ]
};
  const FAQ = [
    ['What is Formee?', 'Formee offers {tools} AI tools across 8 industries: HR, Education, Security, Childcare, Health, Real Estate, Sports, and Sales and Marketing. Every tool sits on one secure platform.'],
    ['How do I try a tool?', 'Every tool starts with a 14-day free trial. For questions, use Contact us and the Formee team will get back to you.'],
    ['Can I use more than one Formee tool?', 'Yes. All Formee tools share the same platform, so you can choose the tools that fit your industry and use them together.'],
    ['Where is my data hosted?', 'Formee runs on Microsoft Azure, with hosting options across multiple countries.'],
    ['How does Formee handle privacy?', 'Privacy and compliance are built into every Formee tool from the start.'],
    ['How much does Formee cost?', 'Basic is US$29, Standard US$79 and Premium US$199 per tool per month, with 20% off on annual billing and 25% off industry bundles. Enterprise is arranged with sales.'],
    ['Is there a free trial?', 'Yes. Every plan starts with a 14-day free trial. Basic and Standard need no card for the trial; Premium asks for a card and charges only when the trial ends.'],
    ['Can I get my money back?', 'Yes. Your first payment is covered by a 30-day money-back guarantee.'],
    ['How do the tools connect?', 'One Formee account holds every tool you choose, on one invoice. You can add or remove tools from your account at any time.']
  ];
  const PRICING_FAQ = [
    ['Do I need a card for the free trial?', 'No, not for Basic and Standard. Their 14-day free trial needs no card. Premium asks for a card at the start of the trial and charges only when the trial ends. Cancel during the trial and you are not charged.'],
    ['Can I get a refund?', 'Yes, within 30 days of your first payment. Request it from the billing area of your account; the money goes back to the card or PayPal account you paid with.'],
    ['How does billing work?', 'You pay per tool, per month, or per year with 20% off. Everything in your cart is on one subscription and one invoice.'],
    ['Can I change or cancel my plan?', 'Yes, from your account. Upgrades take effect at once; downgrades take effect at the end of the billing period. If you cancel, you keep access until the end of the period you have paid for.'],
    ['Where are my invoices?', 'Every invoice is listed and downloadable in the billing area of your account, and emailed to you.'],
    ['How is tax handled?', 'Tax, GST or VAT is calculated from your billing address and shown before you submit payment. Prices on this page exclude tax.'],
    ['Which currency do you charge in?', 'Prices are in US dollars.'],
    ['Where is my data kept?', 'You choose your Azure data region at checkout, and your data stays in that region.'],
    ['Which payment methods can I use?', 'Cards, Apple Pay and Google Pay through Stripe, or PayPal. Formee never stores card details.']
  ];
  const TOOLS = BUSINESSES.reduce((n, b) => n + b.products.length, 0);
  const findTool = slug => { for (const b of BUSINESSES) { const p = b.products.find(x => x.slug === slug); if (p) return [b, p]; } return []; };
  return { PULSE_URL, BUSINESSES, PRICING, FAQ, PRICING_FAQ, TOOLS, findTool };
})();
