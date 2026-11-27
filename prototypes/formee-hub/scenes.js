/* Formee store: small illustrative UI per tool (mock data only). Used on the home page and tool pages. */
window.FS = (() => {
  /* ---------- Product scenes (v2): small illustrative UI per product. Content is mock data. ---------- */
  const SPARK = window.FI.icon('sparkles', 14, 'ui-spark');
  const CHECK = window.FI.icon('check', 14);
  const avatar = (initials, tone) => `<span class="ui-avatar ui-avatar--${tone}">${initials}</span>`;
  const bar = (w, k = 0) => `<span class="ui-bar"><i style="--w:${w}%;--k:${k}"></i></span>`;
  const SCENES = {
    course: () => `
      <div class="ui-card ui-pos-a" style="--k:0;--l:0%;--t:4%;--wd:92%">
        <div class="ui-prompt">${SPARK}<span>Create a 10-week unit on workplace communication</span><i class="ui-caret"></i></div>
      </div>
      <div class="ui-card" style="--k:1;--l:8%;--t:28%;--wd:86%">
        <div class="ui-head"><b>Unit plan</b><span class="ui-chip ui-chip--blue">Aligned to curriculum</span></div>
        <ol class="ui-list">
          <li><span class="ui-num">W1</span>Communication basics<span class="ui-done">${CHECK}</span></li>
          <li><span class="ui-num">W2</span>Writing for the workplace<span class="ui-done">${CHECK}</span></li>
          <li><span class="ui-num">W3</span>Presenting ideas<span class="ui-chip ui-chip--violet">${SPARK}Generating</span></li>
          <li class="is-ghost"><span class="ui-num">W4</span><span class="ui-skel"></span></li>
        </ol>
      </div>`,
    marking: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:4%;--wd:84%">
        <div class="ui-head"><span class="ui-who">${avatar('MC', 'rose')}<span><b>Mia Chen</b><small>Assessment 2 · Business report</small></span></span><span class="ui-score">78<small>/100</small></span></div>
        <div class="ui-rubric">
          <div><span>Structure</span>${bar(90, 0)}<b>18/20</b></div>
          <div><span>Evidence</span>${bar(60, 1)}<b>12/20</b></div>
          <div><span>Clarity</span>${bar(75, 2)}<b>15/20</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--ai" style="--k:1;--l:34%;--t:60%;--wd:64%">
        <div class="ui-ai-label">${SPARK}AI feedback</div>
        <p>Clear structure. Add one more source to support section 3.</p>
        <div class="ui-actions"><span class="ui-btn ui-btn--dark">Accept</span><span class="ui-btn">Edit</span></div>
      </div>`,
    lms: () => `
      <div class="ui-card" style="--k:0;--l:4%;--t:4%;--wd:88%">
        <div class="ui-head"><span><b>Diploma of Business</b><small>Module 4 of 8</small></span><span class="ui-chip ui-chip--green">52% complete</span></div>
        ${bar(52, 0)}
        <div class="ui-people">
          <div>${avatar('LP', 'blue')}<span>Liam Patel</span>${bar(84, 1)}<b>84%</b></div>
          <div>${avatar('AN', 'mint')}<span>Ava Nguyen</span>${bar(66, 2)}<b>66%</b></div>
          <div>${avatar('NS', 'amber')}<span>Noah Smith</span>${bar(41, 3)}<b>41%</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:46%;--t:78%;--wd:auto">
        <span class="ui-dot"></span>12 learners on track this week
      </div>`,
    sms: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:4%;--wd:90%">
        <div class="ui-head"><b>Students</b><span class="ui-chip">Term 2</span></div>
        <div class="ui-table">
          <div class="ui-tr ui-th"><span>Name</span><span>Status</span><span>Attendance</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('MC', 'rose')}Mia Chen</span><span class="ui-chip ui-chip--green">Enrolled</span><span>96%</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('LP', 'blue')}Liam Patel</span><span class="ui-chip ui-chip--orange">Pending</span><span>-</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('AN', 'mint')}Ava Nguyen</span><span class="ui-chip ui-chip--green">Enrolled</span><span>91%</span></div>
        </div>
      </div>
      <div class="ui-card" style="--k:1;--l:52%;--t:66%;--wd:46%">
        <div class="ui-stat"><small>Attendance today</small><b>94%</b></div>
        <div class="ui-spark-bars">${[60, 72, 68, 80, 76, 88, 94].map((h, i) => `<i style="--h:${h}%;--k:${i}"></i>`).join('')}</div>
      </div>`,
    plotara: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:70%">
        <div class="ui-head"><span><b>Lot 14, Maple St</b><small>612 m² · corner block</small></span><span class="ui-chip ui-chip--blue">R2 Residential</span></div>
        <svg class="ui-map" viewBox="0 0 240 110" aria-hidden="true">
          <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".6"/></pattern></defs>
          <rect width="240" height="110" fill="url(#g)"/>
          <path class="ui-map__lot" d="M70 22 L168 16 L182 84 L84 94 Z"/>
          <circle class="ui-map__pin" cx="126" cy="54" r="5"/>
        </svg>
      </div>
      <div class="ui-card" style="--k:1;--l:44%;--t:56%;--wd:56%">
        <div class="ui-ai-label">${SPARK}Site check</div>
        <ol class="ui-list ui-list--tight">
          <li>Flood overlay<span class="ui-chip ui-chip--green">Low</span></li>
          <li>Max height<span class="ui-chip">9 m</span></li>
          <li>Heritage<span class="ui-chip ui-chip--green">None</span></li>
        </ol>
      </div>`,
    pulse: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-prompt">${SPARK}<span>Launch post for our new oat latte, warm morning light</span><i class="ui-caret"></i></div>
      </div>
      <div class="ui-card ui-post" style="--k:1;--l:16%;--t:24%;--wd:36%">
        <div class="ui-post__img"></div>
        <span class="ui-skel"></span><span class="ui-skel ui-skel--short"></span>
      </div>
      <div class="ui-card ui-card--pill" style="--k:2;--l:58%;--t:44%;--wd:auto"><span class="ui-dot"></span>Scheduled · Mon 9:00</div>
      <div class="ui-card ui-card--pill" style="--k:3;--l:60%;--t:62%;--wd:auto">Instagram · 4:5</div>`,
    // Based on the HR Staffing Portal design (formee-design.github.io/.../hr-tool/hr-portal, Jobs overview):
    // "Needs you today" task list with status chips, and candidates by stage.
    hr: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-head"><b>Needs you today</b><span class="ui-chip">4 tasks</span></div>
        <ol class="ui-list ui-list--tight ui-tasks">
          <li><span class="ui-ico ui-ico--red">${window.FI.icon('clipboard-check', 14)}</span><span class="ui-task"><b>3 interviews missing feedback</b><small>Panel feedback overdue</small></span><span class="ui-chip ui-chip--red">Overdue</span></li>
          <li><span class="ui-ico ui-ico--blue">${window.FI.icon('mail', 14)}</span><span class="ui-task"><b>2 offers need you</b><small>One offer expires in 24h</small></span><span class="ui-chip ui-chip--orange">Due today</span></li>
          <li><span class="ui-ico ui-ico--green">${window.FI.icon('shield-check', 14)}</span><span class="ui-task"><b>1 candidate ready to join</b><small>Pre-employment checks done</small></span><span class="ui-chip ui-chip--green">Ready</span></li>
        </ol>
      </div>
      <div class="ui-card" style="--k:1;--l:30%;--t:64%;--wd:68%">
        <div class="ui-head"><b>Candidates by stage</b></div>
        <div class="ui-pipe ui-pipe--4">
          <div><small>New</small><b>145</b></div>
          <div><small>Interview</small><b>24</b></div>
          <div><small>Offer</small><b>09</b></div>
          <div><small>Hired</small><b>03</b></div>
        </div>
      </div>`,
    // HR Module, "AI where it saves time" bento graphics, each a different form (2026-11-26):
    // score ring + result pills / email composer + brief bubble / session timeline / resume page + chat
    hrAiScore: () => `
      <div class="bx bx-review" style="--k:0;--l:12%;--t:7%;--wd:76%">
        <div class="bx-review__label">${SPARK}AI candidate review</div>
        <div class="bx-review__who">${avatar('SK', 'blue')}<span><b>Sarah Kim</b><small>Senior Lecturer</small></span><span class="ui-chip ui-chip--violet">Strong match</span></div>
        <div class="bx-review__score">
          <span class="bx-ring bx-ring--sm"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" class="bx-ring__track"/><circle cx="60" cy="60" r="50" class="bx-ring__fill" style="--p:.86"/></svg><span class="bx-ring__num"><b>86</b><small>Match score</small></span></span>
          <span class="bx-review__verdict"><b>A strong fit for this role</b><small>Experience and skills line up with the job description</small></span>
        </div>
        <ul class="bx-review__list">
          <li><span class="ui-ok">${CHECK}</span>8 years of teaching</li>
          <li><span class="ui-ok">${CHECK}</span>9 of 10 key skills</li>
          <li class="is-warn"><span class="ui-warn">!</span>Visa status to confirm</li>
        </ul>
      </div>`,
    // Request in, AI draft out (2026-11-26, from the user's reference): only the Write with AI button carries the sparkle.
    hrAiEmail: () => `
      <div class="bx bx-req" style="--k:0;--l:22%;--t:0%;--wd:56%"><small>Your request</small><b>Invite to a 2nd interview, Tue 10am</b></div>
      <span class="bx bx-down" style="--k:1;--l:calc(50% - 10px);--t:19.5%">${window.FI.icon('arrow-down', 20)}</span>
      <div class="bx bx-win bx-win--draft" style="--k:2;--l:6%;--t:27%;--wd:88%">
        <div class="bx-win__title">${window.FI.icon('mail', 18)}<b>Email draft</b><span class="ui-chip ui-chip--violet">AI-generated</span></div>
        <div class="bx-win__row"><small>To</small><span class="bx-to">${avatar('AM', 'blue')}Ava Martin</span></div>
        <div class="bx-win__row"><small>Subject</small><b>Second interview</b></div>
        <div class="bx-win__body"><p>Hi Ava,</p><p>Thank you for your time last week. We would like to invite you to a second interview on Tuesday at 10am.<span class="bx-caret"></span></p></div>
        <div class="bx-win__foot bx-win__foot--split"><span class="bx-btn bx-btn--ai">${SPARK}Write with AI</span><small>Draft · Not sent</small></div>
      </div>`,
    // AI-suggested workshop plan: sessions with learning outcomes, attendees and documents tracked, summary document (2026-11-26, from the user's reference)
    hrAiSessions: () => `
      <div class="bx bx-plan" style="--k:0;--l:7%;--t:6.8%;--wd:85.9%">
        <div class="bx-plan__head">${window.FI.icon('calendar', 22)}<span><b>Communication workshop</b><span class="ui-chip ui-chip--violet">AI-suggested plan</span></span></div>
        <ol class="bx-plan__steps">${[['Active listening', 'Sum up a colleague\'s point accurately'], ['Giving feedback', 'Give clear, kind feedback'], ['Handling conflict', 'Calm a tense conversation']].map(([t, o], i) => `
          <li><span class="bx-plan__num">0${i + 1}</span><span><b>${t}</b><small><em>Learning outcome:</em> ${o}</small></span></li>`).join('')}
        </ol>
        <div class="bx-plan__foot"><span class="bx-plan__people">${avatar('A', 'blue')}${avatar('M', 'rose')}${avatar('J', 'mint')}12 attendees</span><span class="bx-plan__docs">${window.FI.icon('file-check', 16)}Required documents tracked</span></div>
      </div>
      <div class="bx bx-sumdoc" style="--k:1;--l:51.9%;--t:77%;--wd:48%">${window.FI.icon('file-text', 22)}<span><b>Summary document</b><small>Communication workshop</small></span>${window.FI.icon('download', 18)}</div>`,
    // Approvals inbox by type + one person's shift against their clock-in (2026-11-26, from the user's reference).
    // Positions from Figma 1178:777 (2026-11-27), converted to the scene box (the stage keeps its padding): the shift card overlaps the inbox's lower right corner by about 25px.
    hrApprovals: () => `
      <div class="bx bx-inbox" style="--k:0;--l:4%;--t:6.2%;--wd:74%">
        <div class="bx-inbox__head"><b>Approvals inbox</b><span class="ui-chip ui-chip--violet">10 pending</span></div>
        <div class="bx-inbox__grid">${[['calendar', 'Leave', 4], ['briefcase', 'Business trip', 1], ['clock', 'Overtime', 3], ['receipt', 'Reimbursement', 2]].map(([ic, t, n]) => `
          <div>${window.FI.icon(ic, 22)}<span><small>${t}</small><b>${n}<em>pending</em></b></span></div>`).join('')}
        </div>
      </div>
      <div class="bx bx-shift" style="--k:1;--l:24%;--t:53.8%;--wd:72%">
        <div class="bx-shift__head">${avatar('PR', 'mint')}<b>Priya R.</b><small>Today</small></div>
        <div class="bx-shift__times"><span><small>Shift starts</small><b>09:00</b></span><span><small>Clock in</small><b>09:12</b></span><span><small>Clock out</small><b>18:05</b></span></div>
        <div class="bx-shift__foot"><span class="bx-shift__track"><i></i></span><span class="ui-chip ui-chip--orange">${window.FI.icon('clock', 12)}12 mins late</span></div>
      </div>`,
    hrAiAssist: () => `
      <div class="bx bx-doc" style="--k:0;--l:6%;--t:6%;--wd:40%">
        <b>Resume</b><small>Daniel Lee</small>
        <i style="--w:90%"></i><i style="--w:72%"></i><i class="is-hit" style="--w:84%"></i><i style="--w:66%"></i><i style="--w:80%"></i>
      </div>
      <div class="bx bx-chat bx-chat--q" style="--k:1;--l:50%;--t:16%;--wd:44%">Does he hold a teaching registration?</div>
      <div class="bx bx-chat bx-chat--a" style="--k:2;--l:44%;--t:44%;--wd:50%">${SPARK}Yes. A current registration is listed, renewed in 2025.</div>`,
    // Crew OS: the AI team's day at a glance (proposal: operations dashboard + childcare sample "Sunny Days").
    // Roles each finish their routine, one hands work on, one decision comes to the owner. (2026-11-26, from the user's sketch)
    crewos: () => `
      <div class="bx bx-team" style="--k:0;--l:4%;--t:5%;--wd:88%">
        <div class="bx-team__head"><span class="bx-team__logo">${window.FI.icon('layers', 18)}</span><span><b>Your AI team at work</b><small>Sunny Days Early Learning</small></span><span class="ui-chip ui-chip--violet">${SPARK}7 agents</span></div>
        <div class="bx-team__roles">
          <div><span class="bx-team__role">${window.FI.icon('headset', 16)}Reception<i></i></span><span class="bx-team__done"><span class="ui-ok">${CHECK}</span>3 tours booked</span></div>
          <div><span class="bx-team__role">${window.FI.icon('calculator', 16)}Accounts<i></i></span><span class="bx-team__done"><span class="ui-ok">${CHECK}</span>42 payments matched</span></div>
          <div><span class="bx-team__role">${window.FI.icon('users', 16)}HR<i></i></span><span class="bx-team__done"><span class="ui-ok">${CHECK}</span>Relief shift filled</span><span class="bx-team__handoff">${window.FI.icon('arrow-right', 12)}Agent handoff</span></div>
        </div>
        <div class="bx-team__foot"><span class="ui-ok">${CHECK}</span>Daily summary sent to owner</div>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:46%;--t:58%;--wd:50%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Needs your decision</span>
        <b>Fee waiver request</b>
        <small>$480 · Awaiting approval</small>
        <div class="bx-decide__btns"><span class="bx-btn">Review request</span><span class="bx-decide__alt">Reassign</span></div>
      </div>`,
    // Crew OS tool page feature visuals (2026-11-27). Mock data from the CrewOS proposal's childcare sample ("Sunny Days").
    // 1. One description in, a proposed org chart out
    crewDesign: () => `
      <div class="bx bx-req bx-req--wrap" style="--k:0;--l:14%;--t:0%;--wd:72%"><small>Your business</small><b>A childcare centre with 3 rooms, 40 families and a small office team</b></div>
      <span class="bx bx-down" style="--k:1;--l:calc(50% - 10px);--t:23.5%">${window.FI.icon('arrow-down', 20)}</span>
      <div class="bx bx-org" style="--k:2;--l:6%;--t:31%;--wd:88%">
        <div class="bx-org__head">${window.FI.icon('network', 18)}<b>Proposed AI team</b><span class="ui-chip ui-chip--violet">7 roles</span></div>
        <div class="bx-org__tree">
          <span class="bx-org__node bx-org__node--top">${window.FI.icon('layers', 14)}CEO agent</span>
          <div class="bx-org__row">
            <span class="bx-org__node">${window.FI.icon('headset', 14)}Reception</span>
            <span class="bx-org__node">${window.FI.icon('calculator', 14)}Accounts</span>
            <span class="bx-org__node">${window.FI.icon('users', 14)}HR</span>
          </div>
        </div>
        <div class="bx-org__foot"><span>+ Room leaders, Compliance, Operations</span><span class="bx-org__edit">Edit before going live</span></div>
      </div>`,
    // 2. Learns your procedures, then passes a role check and a practice week
    crewTrain: () => `
      <div class="bx bx-docs" style="--k:0;--l:4%;--t:6%;--wd:64%">
        <div class="bx-docs__head">${window.FI.icon('book-open', 18)}<b>Your procedures</b><span class="ui-chip ui-chip--violet">3 learned</span></div>
        <ul>${[['Enrolment procedure', 'docx'], ['Fee and payment policy', 'docx'], ['Incident reporting', 'md']].map(([n, t]) => `
          <li>${window.FI.icon('file-text', 16)}<span>${n}<small>.${t}</small></span><span class="ui-ok">${CHECK}</span></li>`).join('')}
        </ul>
      </div>
      <div class="bx bx-pass" style="--k:1;--l:36%;--t:52%;--wd:60%">
        <span class="bx-ring bx-ring--sm"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" class="bx-ring__track"/><circle cx="60" cy="60" r="50" class="bx-ring__fill" style="--p:.94"/></svg><span class="bx-ring__num"><b>94</b><small>Role check</small></span></span>
        <span class="bx-pass__text"><b>Accounts agent passed</b><small>Pass mark 90 of 100</small><span class="ui-chip ui-chip--green">Practice week 34 of 34</span></span>
      </div>`,
    // 3. Autonomy one step at a time, risky work comes to a person, pause any agent
    crewControl: () => `
      <div class="bx bx-auto" style="--k:0;--l:4%;--t:6%;--wd:68%">
        <div class="bx-auto__head"><span class="bx-auto__ico">${window.FI.icon('calculator', 16)}</span><b>Accounts agent</b><span class="ui-chip ui-chip--green">Live</span></div>
        <small class="bx-auto__label">Autonomy</small>
        <div class="bx-auto__seg"><span>Suggest only</span><span class="is-on">Act and report</span><span>Full auto</span></div>
        <div class="bx-auto__pause"><span>Pause this agent</span><i class="bx-toggle"></i></div>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:44%;--t:51%;--wd:52%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Needs your decision</span>
        <b>Refund request</b>
        <small>$620 · Above your $500 limit</small>
        <div class="bx-decide__btns"><span class="bx-btn">Approve</span><span class="bx-decide__alt">Reject</span></div>
      </div>`,
    // 4. The owner's daily summary
    crewSummary: () => `
      <div class="bx bx-daily" style="--k:0;--l:8%;--t:5%;--wd:84%">
        <div class="bx-daily__head">${window.FI.icon('file-text', 18)}<span><b>Daily summary</b><small>Sunny Days Early Learning · Thursday</small></span><span class="ui-chip ui-chip--violet">Sent to owner</span></div>
        <div class="bx-daily__kpis"><div><b>128</b><small>tasks done</small></div><div><b>94%</b><small>without a person</small></div><div><b>3</b><small>exceptions</small></div></div>
        <ul class="bx-daily__list">
          <li>${window.FI.icon('headset', 14)}<span>Reception</span><b>3 tours booked</b></li>
          <li>${window.FI.icon('calculator', 14)}<span>Accounts</span><b>42 payments matched</b></li>
          <li>${window.FI.icon('users', 14)}<span>HR</span><b>Relief shift filled</b></li>
        </ul>
      </div>
      <div class="bx bx-say" style="--k:1;--l:50%;--t:84%">${window.FI.icon('shield-check', 14)}1 exception waiting for you</div>`,
    // BlueGen visuals (2026-11-27). Mock data from the BlueGen build's childcare sample ("Sunny Days", Point Cook).
    // BlueGen only checks and enriches data you already hold: nothing here suggests scraping or web lookups.
    bgHero: () => `
      <div class="bx bx-docs bx-docs--table" style="--k:0;--l:5%;--t:6%;--wd:90%">
        <div class="bx-docs__head">${window.FI.icon('list-checks', 18)}<span><b>Today's batch</b><small>Point Cook parents · Sunny Days</small></span><span class="ui-chip ui-chip--violet">20 leads</span></div>
        <ul>${[['SR', 'mint', 'Sara Reid', 92, 'Genuine', 'green'], ['AL', 'rose', 'Amy Lee', 88, 'Genuine', 'green'], ['RP', 'amber', 'Raj Patel', 81, 'No LinkedIn', '']].map(([i, t, n, q, c, k]) => `
          <li>${avatar(i, t)}<span>${n}</span><span class="bx-q"><i style="--w:${q}%"></i><b>${q}</b></span><span class="ui-chip${k ? ' ui-chip--' + k : ''}">${c}</span></li>`).join('')}
        </ul>
      </div>
      <div class="bx bx-say" style="--k:1;--l:46%;--t:80%">${window.FI.icon('shield-check', 14)}18 messages approved for today</div>`,
    bgImport: () => `
      <div class="bx bx-docs" style="--k:0;--l:4%;--t:6%;--wd:66%">
        <div class="bx-docs__head">${window.FI.icon('file-text', 18)}<span><b>crm-export.csv</b><small>2,480 rows imported</small></span></div>
        <ul>${['Names, phones and addresses tidied', '312 duplicates merged', '18 on do-not-contact skipped'].map(x => `
          <li>${window.FI.icon('check', 16)}<span>${x}</span></li>`).join('')}
        </ul>
      </div>
      <div class="bx bx-pass" style="--k:1;--l:38%;--t:56%;--wd:58%">
        <span class="bx-ring bx-ring--sm"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" class="bx-ring__track"/><circle cx="60" cy="60" r="50" class="bx-ring__fill" style="--p:.87"/></svg><span class="bx-ring__num"><b>87%</b><small>Ready</small></span></span>
        <span class="bx-pass__text"><b>2,150 leads ready</b><small>Every field keeps its source</small><span class="ui-chip ui-chip--green">Checked</span></span>
      </div>`,
    bgCheck: () => `
      <div class="bx bx-docs bx-docs--table" style="--k:0;--l:4%;--t:6%;--wd:70%">
        <div class="bx-docs__head">${window.FI.icon('id-card', 18)}<span><b>LinkedIn address check</b><small>Against your reference data</small></span></div>
        <ul>${[['SR', 'mint', 'Sara Reid', 'Genuine', 'green'], ['TB', 'amber', 'Tom Byrne', 'Suspect', 'red'], ['AL', 'rose', 'Amy Lee', 'Genuine', 'green'], ['JM', 'blue', 'Jo Marsh', 'Unverifiable', '']].map(([i, t, n, c, k]) => `
          <li>${avatar(i, t)}<span>${n}</span><span class="ui-chip${k ? ' ui-chip--' + k : ''}">${c}</span></li>`).join('')}
        </ul>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:46%;--t:46%;--wd:50%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Sent to a reviewer</span>
        <b>Tom Byrne · Suspect</b>
        <small>Address does not match the reference record</small>
        <div class="bx-decide__btns"><span class="bx-btn">Mark genuine</span><span class="bx-decide__alt">Keep suspect</span></div>
      </div>`,
    bgTarget: () => `
      <div class="bx bx-auto" style="--k:0;--l:4%;--t:8%;--wd:72%">
        <div class="bx-auto__head"><span class="bx-auto__ico">${window.FI.icon('radar', 16)}</span><span><b>Point Cook parents</b><small class="bx-sub">Saved audience · Sunny Days</small></span></div>
        <small class="bx-auto__label">Filters</small>
        <div class="bx-chips"><span>Childcare</span><span>Within 15 km</span><span>Children 0 to 5</span><span>20 leads a day</span></div>
        <div class="bx-auto__pause"><span>Ranked by quality score</span><b class="bx-strong">1,120 match</b></div>
      </div>
      <div class="bx bx-say" style="--k:1;--l:40%;--t:78%">${window.FI.icon('check', 14)}Today's batch delivered · 20 leads · 8:00 am</div>`,
    bgOutreach: () => `
      <div class="bx bx-win bx-win--draft" style="--k:0;--l:4%;--t:4%;--wd:74%">
        <div class="bx-win__title">${window.FI.icon('mail', 18)}<b>Message draft</b><span class="ui-chip ui-chip--violet">SMS</span></div>
        <div class="bx-win__row"><small>To</small><b>Point Cook parents · 20</b></div>
        <div class="bx-win__body"><p>Hi Sara, Sunny Days has three places open for 2026. Reply BOOK for a tour, or STOP to opt out.</p></div>
        <div class="bx-win__foot bx-win__foot--split"><small>From a template</small><small>Waiting for approval</small></div>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:46%;--t:58%;--wd:50%">
        <span class="bx-decide__tag bx-decide__tag--ok">${CHECK}Approved by a second person</span>
        <b>Rita approved 20 messages</b>
        <small>Opt-outs are removed before sending</small>
      </div>`,
    // Security visuals (2026-11-27). DRAFT: the CEO material only says "AI video security and monitoring" (BigBrother) and
    // "AI watchdog for your security" (Security Watchdog); features and data here are placeholders to confirm. Camera tiles are drawn, not footage.
    bbHero: () => `
      <div class="bx bx-wall" style="--k:0;--l:4%;--t:5%;--wd:62%">
        <div class="bx-docs__head">${window.FI.icon('cctv', 18)}<span><b>All cameras</b><small>Riverside site · live</small></span><span class="ui-chip ui-chip--green">12 online</span></div>
        <div class="bx-wall__grid">${['Front gate', 'Loading dock', 'Car park', 'Reception'].map((c, i) => `<span class="bx-cam${i === 1 ? ' is-hit' : ''}"><i></i><small>${c}</small></span>`).join('')}</div>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:46%;--t:50%;--wd:50%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Person after hours</span>
        <b>Loading dock · Camera 3</b>
        <small>22:14 · clip saved</small>
        <div class="bx-decide__btns"><span class="bx-btn">View clip</span><span class="bx-decide__alt">Dismiss</span></div>
      </div>`,
    bbWall: () => `
      <div class="bx bx-wall bx-wall--6" style="--k:0;--l:6%;--t:6%;--wd:88%">
        <div class="bx-docs__head">${window.FI.icon('cctv', 18)}<span><b>All cameras</b><small>3 sites · 18 cameras</small></span><span class="ui-chip ui-chip--green">18 online</span></div>
        <div class="bx-wall__grid">${['Front gate', 'Loading dock', 'Car park', 'Reception', 'Store room', 'Side lane'].map((c, i) => `<span class="bx-cam${i === 4 ? ' is-hit' : ''}"><i></i><small>${c}</small></span>`).join('')}</div>
      </div>`,
    bbDetect: () => `
      <div class="bx bx-cam bx-cam--big is-hit" style="--k:0;--l:4%;--t:6%;--wd:70%"><i></i><span class="bx-cam__box"><em>Person · 94%</em></span><small>Store room · Camera 5 · 21:48</small></div>
      <div class="bx bx-auto" style="--k:1;--l:50%;--t:50%;--wd:48%">
        <div class="bx-auto__head"><span class="bx-auto__ico">${window.FI.icon('radar', 16)}</span><b>Store room rules</b></div>
        <div class="bx-chips"><span>People after 9 pm</span><span>Vehicles in lane</span><span>Door left open</span></div>
      </div>`,
    bbAlert: () => `
      <div class="bx bx-decide" style="--k:0;--l:6%;--t:8%;--wd:58%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Door left open</span>
        <b>Side lane · Camera 6</b>
        <small>Open for 12 minutes · 23:02</small>
        <div class="bx-decide__btns"><span class="bx-btn">View clip</span><span class="bx-decide__alt">Assign</span></div>
      </div>
      <div class="bx bx-docs" style="--k:1;--l:36%;--t:47%;--wd:60%">
        <div class="bx-docs__head">${window.FI.icon('users', 18)}<span><b>Sent to</b><small>Night shift rules</small></span></div>
        <ul><li>${window.FI.icon('check', 16)}<span>Guard on site · 23:02</span></li><li>${window.FI.icon('check', 16)}<span>Security manager · 23:05</span></li></ul>
      </div>`,
    bbPrivacy: () => `
      <div class="bx bx-cam bx-cam--big" style="--k:0;--l:4%;--t:6%;--wd:60%"><i></i><span class="bx-cam__blur"></span><small>Reception · Camera 4</small></div>
      <div class="bx bx-auto" style="--k:1;--l:44%;--t:36%;--wd:52%">
        <div class="bx-auto__head"><span class="bx-auto__ico">${window.FI.icon('lock', 16)}</span><b>Privacy settings</b></div>
        <div class="bx-auto__pause"><span>Blur faces</span><i class="bx-toggle is-on"></i></div>
        <div class="bx-auto__pause"><span>Keep footage</span><b class="bx-strong">30 days</b></div>
        <div class="bx-auto__pause"><span>Who can view</span><b class="bx-strong">Security team</b></div>
      </div>`,
    swHero: () => `
      <div class="bx bx-docs bx-docs--table" style="--k:0;--l:5%;--t:6%;--wd:72%">
        <div class="bx-docs__head">${window.FI.icon('shield-check', 18)}<span><b>Security health</b><small>3 sites · checked every 5 minutes</small></span></div>
        <ul>${[['Riverside', '18 of 18 cameras', 'All good', 'green'], ['Northgate', '11 of 12 cameras', '1 offline', 'red'], ['Head office', 'Doors and alarms', 'All good', 'green']].map(([n, d, c, k]) => `
          <li>${window.FI.icon('map-pin', 16)}<span>${n}<small> · ${d}</small></span><span class="ui-chip ui-chip--${k}">${c}</span></li>`).join('')}
        </ul>
      </div>
      <div class="bx bx-say" style="--k:1;--l:42%;--t:78%">${window.FI.icon('shield-alert', 14)}Northgate camera 7 offline · manager told</div>`,
    swHealth: () => `
      <div class="bx bx-docs bx-docs--table" style="--k:0;--l:5%;--t:6%;--wd:76%">
        <div class="bx-docs__head">${window.FI.icon('activity', 18)}<span><b>Northgate site</b><small>Last check 2 minutes ago</small></span></div>
        <ul>${[['cctv', 'Cameras', '11 of 12 online', '1 offline', 'red'], ['lock', 'Doors', '8 of 8 locked', 'All good', 'green'], ['shield-check', 'Alarm', 'Armed', 'All good', 'green'], ['clock', 'Recorder', '29 days stored', 'All good', 'green']].map(([ic, n, d, c, k]) => `
          <li>${window.FI.icon(ic, 16)}<span>${n}<small> · ${d}</small></span><span class="ui-chip ui-chip--${k}">${c}</span></li>`).join('')}
        </ul>
      </div>`,
    swPattern: () => `
      <div class="bx bx-trend" style="--k:0;--l:5%;--t:6%;--wd:78%">
        <div class="bx-docs__head">${window.FI.icon('activity', 18)}<span><b>Door 4 openings</b><small>Last 7 nights · 8 pm to 6 am</small></span></div>
        <div class="bx-trend__bars">${[2, 1, 3, 2, 1, 2, 9].map((v, i) => `<span class="${i === 6 ? 'is-hit' : ''}" style="--v:${v / 9}"><i></i><small>${['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</small></span>`).join('')}</div>
      </div>
      <div class="bx bx-decide" style="--k:1;--l:46%;--t:60%;--wd:50%">
        <span class="bx-decide__tag"><span class="ui-warn">!</span>Unusual activity</span>
        <b>Door 4 opened 9 times</b>
        <small>Usually 1 or 2 a night</small>
      </div>`,
    swEscalate: () => `
      <div class="bx bx-plan" style="--k:0;--l:7%;--t:6%;--wd:80%">
        <div class="bx-plan__head">${window.FI.icon('shield-alert', 22)}<span><b>Alarm at Northgate</b><span class="ui-chip ui-chip--violet">Escalation rule</span></span></div>
        <ol class="bx-plan__steps">${[['Guard on site', 'Told at 02:10 · no reply in 5 minutes'], ['Security manager', 'Told at 02:15 · acknowledged'], ['Owner', 'Only if the manager does not reply']].map(([t, o], i) => `
          <li><span class="bx-plan__num">0${i + 1}</span><span><b>${t}</b><small>${o}</small></span></li>`).join('')}
        </ol>
      </div>`,
    swReport: () => `
      <div class="bx bx-daily" style="--k:0;--l:8%;--t:5%;--wd:84%">
        <div class="bx-daily__head">${window.FI.icon('file-text', 18)}<span><b>Weekly security report</b><small>3 sites · 21 to 27 November</small></span><span class="ui-chip ui-chip--violet">Sent to owner</span></div>
        <div class="bx-daily__kpis"><div><b>14</b><small>alerts</small></div><div><b>4 min</b><small>to respond</small></div><div><b>99.6%</b><small>uptime</small></div></div>
        <ul class="bx-daily__list">
          <li>${window.FI.icon('shield-alert', 14)}<span>Northgate</span><b>Alarm, resolved</b></li>
          <li>${window.FI.icon('cctv', 14)}<span>Riverside</span><b>Door left open, closed</b></li>
          <li>${window.FI.icon('activity', 14)}<span>Head office</span><b>No incidents</b></li>
        </ul>
      </div>`,
    lumina: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:2%;--wd:80%">
        <div class="ui-head"><span class="ui-who">${avatar('Lu', 'amber')}<span><b>Lumina</b><small>Reading time with Ella, 6</small></span></span><span class="ui-chip ui-chip--green">Kid-safe</span></div>
        <div class="ui-bubble ui-bubble--in">Why do leaves change colour?</div>
        <div class="ui-bubble ui-bubble--out">${SPARK}Great question! In autumn, trees stop making green chlorophyll, so yellow and orange show through.</div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:40%;--t:80%;--wd:auto"><span class="ui-dot"></span>3 new words learned today</div>`,
    bigbrother: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:90%">
        <div class="ui-head"><b>Live cameras</b><span class="ui-chip ui-chip--red"><span class="ui-rec"></span>4 live</span></div>
        <div class="ui-cams">${[0, 1, 2, 3].map(k => `<i style="--k:${k}">${k === 1 ? '<span class="ui-detect">Person · 98%</span>' : ''}<small>Cam ${k + 1}</small></i>`).join('')}</div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:36%;--t:84%;--wd:auto"><span class="ui-dot"></span>Loading dock · motion after hours</div>`,
    secwatch: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-head"><b>Security events</b><span class="ui-chip">Tonight</span></div>
        <ol class="ui-list ui-list--tight">
          <li><span class="ui-ok">${CHECK}</span>Main gate locked on schedule<span class="ui-chip ui-chip--green">OK</span></li>
          <li><span class="ui-ok">${CHECK}</span>Patrol check-in, Level 2<span class="ui-chip ui-chip--green">OK</span></li>
          <li><span class="ui-warn">!</span>Badge used at two doors in 1 min<span class="ui-chip ui-chip--red">Flagged</span></li>
        </ol>
      </div>
      <div class="ui-card ui-card--alert" style="--k:1;--l:34%;--t:62%;--wd:62%">
        <div class="ui-ai-label ui-ai-label--red">Needs review</div>
        <p>Badge 0418 opened Door 3 and Door 9 within 40 seconds.</p>
        <div class="ui-actions"><span class="ui-btn ui-btn--dark">Lock badge</span><span class="ui-btn">Dismiss</span></div>
      </div>`,
    robotics: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:2%;--wd:84%">
        <div class="ui-head"><span class="ui-who">${avatar('R2', 'blue')}<span><b>Robo · Room 2</b><small>Story time, 10:00</small></span></span><span class="ui-chip ui-chip--green">Active</span></div>
        <div class="ui-rubric">
          <div><span>Battery</span>${bar(82, 0)}<b>82%</b></div>
          <div><span>Engagement</span>${bar(68, 1)}<b>68%</b></div>
        </div>
      </div>
      <div class="ui-card" style="--k:1;--l:40%;--t:62%;--wd:58%">
        <div class="ui-ai-label">${SPARK}Next up</div>
        <p>11:30 · Counting game with Room 3</p>
      </div>`,
    agedcare: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-head"><span class="ui-who">${avatar('MW', 'mint')}<span><b>Margaret W.</b><small>Room 14 · Care plan</small></span></span><span class="ui-chip">Morning round</span></div>
        <ol class="ui-list ui-list--tight">
          <li><span class="ui-ok">${CHECK}</span>Medication given, 8:05</li>
          <li><span class="ui-ok">${CHECK}</span>Breakfast, ate well</li>
          <li><span class="ui-warn">!</span>Fall risk up after a restless night<span class="ui-chip ui-chip--orange">Watch</span></li>
        </ol>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:40%;--t:82%;--wd:auto"><span class="ui-dot"></span>Family update sent</div>`,
    rights: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:2%;--wd:84%">
        <div class="ui-head"><b>Resident rights check</b><span class="ui-chip ui-chip--violet">In design</span></div>
        <ol class="ui-list ui-list--tight">
          <li><span class="ui-ok">${CHECK}</span>Consent recorded for care plan</li>
          <li><span class="ui-ok">${CHECK}</span>Language and culture needs noted</li>
          <li><span class="ui-warn">!</span>Restrictive practice review due<span class="ui-chip ui-chip--orange">7 days</span></li>
        </ol>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:34%;--t:80%;--wd:auto">Aged care · Hospitals · Dental</div>`,
    primeform: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:2%;--wd:84%">
        <div class="ui-head"><span class="ui-who">${avatar('JK', 'blue')}<span><b>Jordan Kim</b><small>Football · Training</small></span></span><span class="ui-score">142<small> bpm</small></span></div>
        <div class="ui-rubric">
          <div><span>Load</span>${bar(72, 0)}<b>72%</b></div>
          <div><span>Recovery</span>${bar(58, 1)}<b>58%</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--chips" style="--k:1;--l:20%;--t:70%;--wd:auto">${['Football', 'Tennis', 'Swimming', 'Basketball', '+26'].map((t, i) => `<span class="ui-chip${i === 0 ? ' ui-chip--blue' : ''}">${t}</span>`).join('')}</div>`,
    leads: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:90%">
        <div class="ui-head"><b>Lead list · 1,240</b><span class="ui-chip ui-chip--violet">${SPARK}Verifying</span></div>
        <div class="ui-table">
          <div class="ui-tr ui-th"><span>Contact</span><span>Email</span><span>Phone</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('SR', 'mint')}Sara Reid</span><span class="ui-chip ui-chip--green">Valid</span><span>OK</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('TB', 'amber')}Tom Byrne</span><span class="ui-chip ui-chip--red">Bounced</span><span>-</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('AL', 'rose')}Amy Lee</span><span class="ui-chip ui-chip--green">Valid</span><span>OK</span></div>
        </div>
      </div>
      <div class="ui-card" style="--k:1;--l:52%;--t:68%;--wd:46%">
        <div class="ui-stat"><small>Reachable leads</small><b>87%</b></div>
        ${bar(87, 0)}
      </div>`
  };

  return { SCENES, SPARK, CHECK };
})();
