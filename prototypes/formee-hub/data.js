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
    "artIcon": "circle-user-round",
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
          "Photo: university campus", "assets/tools/hr-edu-campus.jpg"
              ],
              [
                "id-card",
                "Academic staff types",
                "Tag staff as academic teaching, academic non-teaching or general staff.",
          "Photo: lecturer with students", "assets/tools/hr-edu-lecturer.jpg"
              ],
              [
                "clipboard-check",
                "Reporting data",
                "Collect the staff details your reporting needs in the same record.",
          "Photo: staff member at a desk", "assets/tools/hr-edu-reporting.jpg"
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
        "heroVisual": true,
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
        ],
        "page": {
          "journey": {
            "type": "flow",
            "title": "From one description to a working team.",
            "steps": [
              [
                "Describe your business",
                "Tell Crew OS what you do and how you work, in your own words.",
                []
              ],
              [
                "Design the team",
                "Crew OS proposes roles, responsibilities and an org chart for you to edit.",
                []
              ],
              [
                "Train",
                "Agents learn your procedures and documents, then pass a role check.",
                []
              ],
              [
                "Practice week",
                "Each agent works through test cases before it touches real work.",
                []
              ],
              [
                "Go live step by step",
                "Agents start by suggesting, and take on more as they prove themselves.",
                []
              ]
            ]
          },
          "features": [
            {
              "title": "A team from one description",
              "text": "Describe your business in plain language. Crew OS works out which roles you need and sets each one up with responsibilities, tools and a reporting line.",
              "points": [
                "Roles from a library of 22, plus your own custom roles",
                "Templates for 20 industries, from childcare to aged care and retail",
                "An org chart you can edit before anything goes live"
              ],
              "visual": "scene:crewDesign"
            },
            {
              "title": "Trained on your own rules",
              "text": "Agents learn from your procedures, documents and worked examples, then prove they are ready before they start.",
              "points": [
                "Upload your procedures and documents",
                "Role checks with a pass mark of 90 out of 100",
                "A practice week of test cases before any real work"
              ],
              "visual": "scene:crewTrain"
            },
            {
              "title": "You stay in control",
              "text": "Agents start by suggesting and earn more freedom one step at a time. Anything risky comes to a person.",
              "points": [
                "Three levels: Suggest only, Act and report, Full auto",
                "Payments above your limit and safety issues always go to a person",
                "Pause one agent or the whole team at any time"
              ],
              "visual": "scene:crewControl"
            },
            {
              "title": "See what your team did",
              "text": "A daily summary for the owner, with each agent's work and every open exception in one place.",
              "points": [
                "A daily summary of completed work and open exceptions",
                "Results for each agent, with a sample of tasks reviewed",
                "A full log of every action"
              ],
              "visual": "scene:crewSummary"
            }
          ],
          "ai": {
            "title": "Work your AI team takes on.",
            "items": [
              [
                "headset",
                "Reception",
                "Answers enquiries and books tours and appointments."
              ],
              [
                "calculator",
                "Accounts",
                "Matches payments and follows up overdue invoices."
              ],
              [
                "users",
                "HR",
                "Fills relief shifts and keeps staff records up to date."
              ],
              [
                "layers",
                "A CEO agent",
                "Hands work between agents and sends you a summary every day."
              ]
            ]
          },
          "extra": {
            "title": "Ready for your industry.",
            "text": "Start from a template for your industry, then shape it to the way you work.",
            "items": [
              [
                "baby",
                "Childcare",
                "Enrolments, room ratios and family messages, with anything about child safety sent to a person.",
                "Photo: childcare centre",
                "assets/industries/childcare.jpg"
              ],
              [
                "heart-pulse",
                "Aged care",
                "Rosters, family updates and daily records, with care decisions kept with your staff.",
                "Photo: aged care",
                "assets/industries/health.jpg"
              ],
              [
                "graduation-cap",
                "Colleges",
                "Enquiries, enrolments and timetables handled day to day, with lecturers kept in the loop.",
                "Photo: college",
                "assets/industries/education.jpg"
              ]
            ]
          },
          "faq": [
            [
              "Does Crew OS act on its own?",
              "Only as far as you allow. Every agent starts by suggesting, and moves up a level only after it passes its checks. Risky work always comes to a person."
            ],
            [
              "What happens when an agent is unsure?",
              "It stops and sends the task to your exceptions queue, where you can approve, reject, reply or hand it to someone else."
            ],
            [
              "Which businesses is Crew OS for?",
              "Organisations with routine back-office work. There are templates for 20 industries, including childcare, aged care and retail."
            ],
            [
              "How can I try Crew OS?",
              "Start a 14-day free trial, or request a demo and the Formee team will set up a sample team for your business."
            ]
          ]
        }
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
    "desc": "BigBrother watches every camera for you, and Security Watchdog keeps an eye on your whole security setup. Two AI tools that work together.",
    "comingSoon": false,
    "products": [
      {
        "slug": "bigbrother",
        "heroVisual": true,
        "name": "BigBrother",
        "short": "BigBrother",
        "scene": "bbHero",
        "summary": "AI video security and monitoring.",
        "desc": "BigBrother watches every camera for you, spots what matters and sends the right person a clip, so your team stops watching screens and starts responding.",
        "highlights": [
          [
            "Every camera in one view",
            "See all your sites and cameras live in one place, on any device.",
            "cctv"
          ],
          [
            "AI spots what matters",
            "Set zones and hours, and BigBrother flags people, vehicles or open doors where they should not be.",
            "radar"
          ],
          [
            "Alerts with the clip attached",
            "The right person gets an alert with a short clip, so they can act in seconds.",
            "shield-alert"
          ]
        ],
        "page": {
          "journey": {
            "type": "flow",
            "title": "From camera to the right person.",
            "steps": [
              [
                "Connect cameras",
                "Add the cameras you already have, across every site.",
                []
              ],
              [
                "Set zones and rules",
                "Choose areas, hours and what counts as unusual.",
                []
              ],
              [
                "AI watches every feed",
                "BigBrother checks every camera around the clock.",
                []
              ],
              [
                "Alert with a clip",
                "The right person gets a short clip of what happened.",
                []
              ],
              [
                "Review and report",
                "Every alert is logged, with what was done about it.",
                []
              ]
            ]
          },
          "features": [
            {
              "title": "Every camera in one view",
              "text": "See every site and camera live in one place, and jump straight to the one that needs attention.",
              "points": [
                "Cameras from every site in one view",
                "Works with the cameras you already have",
                "Open on a laptop, tablet or phone"
              ],
              "visual": "scene:bbWall"
            },
            {
              "title": "AI spots what matters",
              "text": "Tell BigBrother what matters at each spot and when, and it flags only that, not every passing shadow.",
              "points": [
                "Rules by area and time of day",
                "People, vehicles and doors left open",
                "Fewer false alarms over time"
              ],
              "visual": "scene:bbDetect"
            },
            {
              "title": "Alerts with the clip attached",
              "text": "Each alert comes with a short clip and goes to the person on shift, then up the line if nobody responds.",
              "points": [
                "A short clip with every alert",
                "Sent to the person on shift",
                "Logged with who responded and when"
              ],
              "visual": "scene:bbAlert"
            },
            {
              "title": "Privacy built in",
              "text": "Decide what is recorded, how long it is kept and who can see it.",
              "points": [
                "Face blurring where you need it",
                "Footage kept only as long as you choose",
                "Access limited to the people you name"
              ],
              "visual": "scene:bbPrivacy"
            }
          ],
          "ai": {
            "title": "AI where it saves time.",
            "items": [
              [
                "radar",
                "Rules that fit your site",
                "Set areas and hours once, and AI ignores everyday movement."
              ],
              [
                "clock",
                "Alerts in seconds",
                "Something happens, and the right person knows straight away."
              ],
              [
                "list-checks",
                "Fewer false alarms",
                "Alerts you dismiss teach BigBrother what to ignore."
              ],
              [
                "file-text",
                "Shift reports written for you",
                "A short summary of every alert and what was done."
              ]
            ]
          },
          "extra": {
            "title": "Built for sites like yours.",
            "text": "From a single shop to campuses with many buildings.",
            "items": [
              [
                "building-2",
                "Shops and warehouses",
                "Loading docks, store rooms and car parks watched after hours.",
                "Photo: warehouse",
                "assets/industries/security.jpg"
              ],
              [
                "school",
                "Schools and campuses",
                "Gates and grounds watched, with privacy settings for students and staff.",
                "Photo: campus",
                "assets/industries/education.jpg"
              ],
              [
                "baby",
                "Childcare centres",
                "Entrances watched and visitors checked, with footage kept private.",
                "Photo: childcare centre",
                "assets/industries/childcare.jpg"
              ]
            ]
          },
          "faq": [
            [
              "Do I need new cameras?",
              "No. BigBrother is designed to work with the cameras you already have. The Formee team checks your setup with you first."
            ],
            [
              "Who sees the footage?",
              "Only the people you choose. You also decide how long footage is kept and where faces are blurred."
            ],
            [
              "What happens when nobody responds to an alert?",
              "It goes to the next person on your list, and everything is logged."
            ],
            [
              "How can I try BigBrother?",
              "Start a 14-day free trial, or request a demo and the Formee team will walk you through it."
            ]
          ]
        }
      },
      {
        "slug": "security-watchdog",
        "heroVisual": true,
        "name": "Security Watchdog",
        "short": "Security Watchdog",
        "scene": "swHero",
        "summary": "AI watchdog for your security.",
        "desc": "Security Watchdog keeps an eye on your whole security setup: it checks cameras, doors and alarms are working, flags unusual activity and makes sure every alert reaches someone.",
        "highlights": [
          [
            "Your setup, always checked",
            "Cameras, doors, alarms and recorders checked around the clock, with a warning the moment something stops working.",
            "activity"
          ],
          [
            "Unusual activity flagged",
            "AI learns what normal looks like at each site and tells you when something is different.",
            "shield-alert"
          ],
          [
            "Nothing left unanswered",
            "Alerts move up your list until someone responds, and every incident is recorded.",
            "list-checks"
          ]
        ],
        "page": {
          "journey": {
            "type": "flow",
            "title": "Keep watch over your whole setup.",
            "steps": [
              [
                "Connect your systems",
                "Cameras, doors, alarms and recorders across every site.",
                []
              ],
              [
                "Check health",
                "Every device is checked around the clock.",
                []
              ],
              [
                "Spot the unusual",
                "AI learns what normal looks like and flags what is not.",
                []
              ],
              [
                "Escalate",
                "Alerts move up your list until someone responds.",
                []
              ],
              [
                "Report",
                "Weekly reports for the owner, with every incident.",
                []
              ]
            ]
          },
          "features": [
            {
              "title": "Your security setup, always checked",
              "text": "Security Watchdog checks every camera, door, alarm and recorder, and tells you as soon as something stops working.",
              "points": [
                "Health of every device on every site",
                "A warning when a camera goes offline",
                "Recording time checked, so footage is there when you need it"
              ],
              "visual": "scene:swHealth"
            },
            {
              "title": "Unusual activity flagged",
              "text": "It learns the normal pattern at each site and flags what stands out, like a door opening far more often than usual.",
              "points": [
                "A normal pattern for each site",
                "Alerts when activity is out of the ordinary",
                "Works alongside BigBrother's camera alerts"
              ],
              "visual": "scene:swPattern"
            },
            {
              "title": "The right person, every time",
              "text": "Set who hears about what, and when. If nobody responds, the alert moves to the next person.",
              "points": [
                "Escalation rules by site and time",
                "Each step timed and logged",
                "The owner told only when it matters"
              ],
              "visual": "scene:swEscalate"
            },
            {
              "title": "Incident records and reports",
              "text": "Every alert and what was done about it, kept in one record, with a weekly report for the owner.",
              "points": [
                "One record for every incident",
                "Response times for each site",
                "A weekly report by email"
              ],
              "visual": "scene:swReport"
            }
          ],
          "ai": {
            "title": "AI where it saves time.",
            "items": [
              [
                "activity",
                "Learns what normal looks like",
                "Each site gets its own pattern, so alerts are about real changes."
              ],
              [
                "shield-check",
                "Problems found before they matter",
                "An offline camera is found today, not after an incident."
              ],
              [
                "users",
                "Alerts that find a person",
                "Nobody has to watch a dashboard to know something is wrong."
              ],
              [
                "file-text",
                "Reports written for you",
                "A weekly summary of incidents and response times."
              ]
            ]
          },
          "extra": {
            "title": "Built for sites like yours.",
            "text": "For organisations with more than one site to look after.",
            "items": [
              [
                "building-2",
                "Offices and warehouses",
                "Doors, alarms and cameras checked across every building.",
                "Photo: warehouse",
                "assets/industries/security.jpg"
              ],
              [
                "school",
                "Schools and campuses",
                "Every building on campus checked, with the right staff told.",
                "Photo: campus",
                "assets/industries/education.jpg"
              ],
              [
                "heart-pulse",
                "Aged care and health",
                "Entrances and alarms checked day and night.",
                "Photo: aged care",
                "assets/industries/health.jpg"
              ]
            ]
          },
          "faq": [
            [
              "How is it different from BigBrother?",
              "BigBrother watches camera footage. Security Watchdog watches your whole security setup: whether devices work, what is unusual and whether alerts are answered. They work well together."
            ],
            [
              "Does it work with our existing systems?",
              "It is designed to connect to the cameras, doors and alarms you already have. The Formee team checks your setup with you first."
            ],
            [
              "Who gets told when something happens?",
              "You decide, by site and time of day. If someone does not respond, the alert moves to the next person."
            ],
            [
              "How can I try Security Watchdog?",
              "Start a 14-day free trial, or request a demo and the Formee team will walk you through it."
            ]
          ]
        }
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
    "artIcon": "building-complex",
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
    "artIcon": "sport-shoe",
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
    "desc": "Lead data you can trust with BlueGen, and on-brand social content with Pulse. Two tools for teams that sell and market.",
    "comingSoon": false,
    "products": [
      {
        "slug": "bluegen",
        "heroVisual": true,
        "name": "BlueGen",
        "short": "BlueGen",
        "scene": "bgHero",
        "summary": "AI lead data verification.",
        "desc": "BlueGen checks and enriches the lead records you already hold, builds a targeted audience for each campaign, and delivers a fresh batch every day, with every message approved by a person.",
        "highlights": [
          [
            "Clean, checked lead data",
            "Import CRM exports or lead files. BlueGen tidies them, merges duplicates and checks every record against your own reference data.",
            "list-checks"
          ],
          [
            "A targeted batch every day",
            "Save an audience by industry, area and need, and get a ranked batch of leads each morning.",
            "radar"
          ],
          [
            "Outreach a person approves",
            "Prepare email, SMS or WhatsApp messages from templates. A second person approves every message before it goes.",
            "shield-check"
          ]
        ],
        "page": {
          "journey": {
            "type": "flow",
            "title": "From raw lead lists to approved outreach.",
            "steps": [
              [
                "Import",
                "Bring in CRM exports or lead files. Records are tidied and duplicates merged.",
                []
              ],
              [
                "Check",
                "Stored LinkedIn addresses are checked against your reference data, and doubtful records go to a reviewer.",
                []
              ],
              [
                "Enrich",
                "AI fills in missing details from what is already on each record.",
                []
              ],
              [
                "Target",
                "Save an audience for each campaign and get a ranked batch every day.",
                []
              ],
              [
                "Reach out",
                "Prepare messages from templates. A second person approves every send.",
                []
              ]
            ]
          },
          "features": [
            {
              "title": "Clean, checked lead data",
              "text": "Import the lead data you already have. BlueGen tidies it, merges duplicates and keeps track of where every detail came from.",
              "points": [
                "Names, phone numbers and addresses put into one format",
                "Duplicates merged, never overwritten",
                "Do-not-contact and suppression lists applied on import"
              ],
              "visual": "scene:bgImport"
            },
            {
              "title": "LinkedIn addresses checked, not scraped",
              "text": "BlueGen checks the LinkedIn addresses stored on your records against your own reference data. It never looks anything up online.",
              "points": [
                "Each address marked genuine, suspect or unverifiable",
                "Doubtful records go to a person for review",
                "Nothing is collected from websites"
              ],
              "visual": "scene:bgCheck"
            },
            {
              "title": "A targeted batch every day",
              "text": "Save an audience for each campaign and BlueGen delivers the best-matched leads every morning.",
              "points": [
                "Filters by industry, area and the details that matter to you",
                "Leads ranked by a quality score",
                "Daily batches sent to a file or your CRM"
              ],
              "visual": "scene:bgTarget"
            },
            {
              "title": "Outreach a person approves",
              "text": "Prepare messages from templates for email, SMS or WhatsApp. Nothing goes out until a second person approves it.",
              "points": [
                "Templates for each channel",
                "A second person approves every message",
                "Opt-outs honoured straight away, and every action logged"
              ],
              "visual": "scene:bgOutreach"
            }
          ],
          "ai": {
            "title": "AI where it saves time.",
            "items": [
              [
                "sparkles",
                "Missing details filled in",
                "AI works out details such as job function from a job title, using only what is on the record."
              ],
              [
                "list-checks",
                "A quality score for every lead",
                "Each lead is scored, so your team starts with the best."
              ],
              [
                "shield-check",
                "Privacy built in",
                "AI never sees email addresses, phone numbers or consent details."
              ],
              [
                "trending-up",
                "Results for every campaign",
                "Dashboards show leads delivered, replies and positive outcomes."
              ]
            ]
          },
          "extra": {
            "title": "Built for five industries.",
            "text": "Audiences shaped for the industries BlueGen serves, including childcare, aged care, retail, health and education.",
            "items": [
              [
                "baby",
                "Childcare",
                "Reach families near your centre by area and children's ages.",
                "Photo: childcare centre",
                "assets/industries/childcare.jpg"
              ],
              [
                "heart-pulse",
                "Aged care and health",
                "Reach families and referrers in the regions you serve.",
                "Photo: aged care",
                "assets/industries/health.jpg"
              ],
              [
                "graduation-cap",
                "Colleges and education",
                "Reach prospective students by course interest and area.",
                "Photo: college",
                "assets/industries/education.jpg"
              ]
            ]
          },
          "faq": [
            [
              "Does BlueGen collect leads from LinkedIn?",
              "No. BlueGen works only with data you already hold. It checks the LinkedIn addresses stored on your records against reference data, and never fetches anything from a website."
            ],
            [
              "Who approves outreach?",
              "A second person on your team approves every message before it is sent, and opt-outs are honoured straight away."
            ],
            [
              "What data does the AI see?",
              "Only what it needs. Email addresses, phone numbers and consent details are removed before any AI step."
            ],
            [
              "How can I try BlueGen?",
              "Start a 14-day free trial, or request a demo and the Formee team will walk you through it."
            ]
          ]
        }
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
            "Images, carousels and videos that follow your brand kit.",
            "image"
          ],
          [
            "Plan and publish",
            "Schedule posts to every channel from one place.",
            "calendar-clock"
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
