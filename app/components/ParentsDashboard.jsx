"use client";

import React, { useState, useEffect, useCallback } from "react";

// ============================================================
// SHEPHERD MENTAL EDGE — Parent / Guardian view
// A faithful copy of the Command Center (app/components/
// ShepherdCommandDashboard.jsx), re-pointed to families:
// "here's what your athlete gets, and how you support them
// at home." Same look, same tile/panel machinery, same CSS.
//
// Additive by design — this is a SELF-CONTAINED copy so the
// original Command Center at "/" is left completely intact.
// Only the config arrays + hero + the audience row change.
// If Matt re-skins the brand palette on the Command Center,
// mirror the edit into the CSS string at the bottom of this
// file so the two pages don't drift.
// ============================================================


// ---- 15 Mindsets + one stat each (ticker) ----
// Identical to the Command Center — the mindsets and the research
// build trust and carry over unchanged.
const MINDSETS = [
  ["Discipline", "Athletes with high self-control improved performance by 20%"],
  ["Resilience", "Mental toughness and resilience explain 45% of the variance in trail runners' performance"],
  ["Teamwork", "Team cohesion accounts for approximately 18% of the variance in team performance"],
  ["Focus", "High-pressure situations impair performance by approximately 15% due to increased self-focus and anxiety"],
  ["Ambition", "Athletes with high ambition are 21% more likely to reach elite levels"],
  ["Adaptability", "Athletes trained in adaptive techniques showed a 23% increase in successful mid-game strategy shifts"],
  ["Curiosity", "Athletes with high curiosity learned new skills 30% faster"],
  ["Reflection", "Athletes engaging in regular reflection improved performance by 25%"],
  ["Challenge Mastery", ""],
  ["Self Development", "Athletes engaging in deliberate practice outside structured sessions showed a 25% improvement in skill acquisition"],
  ["Grit", "Athletes with higher grit were 25% more likely to complete a demanding training program"],
  ["Perseverance", "Perseverance contributed to a 20% improvement in marathon completion times"],
  ["Mental Fortitude", ""],
  ["Emotional Stamina", "Athletes using relaxation techniques before competition showed a 25% reduction in mental fatigue symptoms"],
  ["Tenacity", "High tenacity correlated with a 35% increase in successful comeback performances after setbacks"],
];

// ---- "How You Support at Home" tiles (4) ----
// Replaces the Command Center's dept/team/individual/org audience
// row. These map onto the real Parent/Guardian Toolkit structure
// (three themes + the featured Car Ride), so the parent lands on
// their own path first.
const SUPPORT = [
  {
    id: "understand",
    label: "Understanding Your Athlete",
    sub: "Roadblocks · Identity · Legacy",
    color: "#b8860b",
    title: "Understanding Your Athlete",
    body: [
      "Start by seeing the game through your athlete's eyes. These guided tools help you spot what's quietly holding them back, separate who they are from how they perform, and focus on what they'll actually be remembered for.",
      "You work through each one yourself first, then bring your athlete in to compare notes — because where your answers differ is where the best conversations start.",
    ],
    bullets: [
      "Roadblock Evaluation — spot what's in the way",
      "Identity beyond the sport: 'a person who plays' vs. 'a player'",
      "Character & legacy — what lasts after the scoreboard",
      "Do it yourself first, then together",
    ],
  },
  {
    id: "relationship",
    label: "Building the Relationship",
    sub: "Your Style · Competition · Buy-In",
    color: "#5a6b4a",
    title: "Building the Relationship",
    body: [
      "Great support starts with knowing how your own sideline presence is landing. These tools show you your parenting style, give the family a shared language for competition, and help your athlete move from 'have to' to 'want to.'",
    ],
    bullets: [
      "Parent Style Quiz — Listener, Partner, Analyst or Driver",
      "Competition, reframed: 'to strive together'",
      "Have To → Get To → Want To",
      "Conversation starters that lower the pressure",
    ],
  },
  {
    id: "growth",
    label: "Supporting Their Growth",
    sub: "Roles · Preseason · Reviews",
    color: "#1b2a4a",
    title: "Supporting Their Growth",
    body: [
      "Seasons bring hard moments — a role they didn't want, a slump, a tough stretch. These guides help you plan the season together, handle setbacks with grace, and close each season with an honest Stop · Keep · Start.",
    ],
    bullets: [
      "Preseason planning, done with your athlete",
      "Role acceptance when it's not the role they wanted",
      "Stop · Keep · Start seasonal review",
      "A shared definition of a successful season",
    ],
  },
  {
    id: "carride",
    label: "The Car Ride Home",
    sub: "The Post-Game Debrief",
    color: "#a08a52",
    title: "The Car Ride Home",
    body: [
      "The most important coaching moment of the week happens in the car. This featured companion gives you guided questions for the drive home — so \"how'd it go?\" becomes a conversation that builds them up instead of re-playing the game.",
      "Every game. Every lesson. Every ride home.",
    ],
    bullets: [
      "Guided post-game debrief questions",
      "Made for the drive home",
      "Keeps your love separate from the scoreboard",
      "A featured companion to the toolkit",
    ],
  },
];

// ---- Methodology & Science (2 big tiles) — carried over unchanged ----
const METHODOLOGY = [
  {
    id: "abm",
    label: "Active Brain Management",
    tag: "The Methodology",
    color: "#b8860b",
    custom: "abm",
    blurb: "The proprietary daily training loop behind everything your athlete does — the science of how the mind is trained.",
  },
  {
    id: "stats",
    label: "Key Mindset Statistics",
    tag: "The Research",
    color: "#1b2a4a",
    custom: "stats",
    blurb: "The peer-reviewed data behind the 15 Performance Mindsets. The mental game, proven.",
  },
];

// Category chip colors (shared with the Command Center)
const CAT = {
  "PRESEASON":    { bg: "#b8860b", fg: "#14161b" },
  "IN-SEASON":    { bg: "#5a6b4a", fg: "#f4f1ea" },
  "ALL YEAR":     { bg: "#1b2a4a", fg: "#f4f1ea" },
  "ADD-ONS":      { bg: "#6e5f38", fg: "#f4f1ea" },
  "FUTURE BUILD": { bg: "#8a7c58", fg: "#14161b" },
};

// ---- Products & Services — Parent / Guardian ordering ----
// Family-relevant pieces lead: the Individual Family Subscription,
// the Parent/Guardian Toolkit, the SEWN Journal, and the three
// interactive Coaches — then the athlete-facing pieces that a
// parent likes to see. Coach/department-facing tiles from the
// Command Center (AD reporting, the Post-Game/Practice Debrief
// Report, Activate Seven coach equipping, the SEWN Bulletin Board)
// are trimmed — they aren't relevant to a parent.
const PRODUCTS = [
  // ---- FAMILY-FIRST ----
  {
    id: "familysub",
    label: "Individual Family Subscription",
    tag: "The Full Program for One Athlete",
    cat: "ALL YEAR",
    required: true,
    color: "#1b2a4a",
    title: "Individual Family Subscription",
    body: [
      "Everything Shepherd Mental Edge builds for a single athlete — the full 90-day program, daily AM and PM mental workouts, the three interactive Coaches, and progress assessments — bundled for one athlete and their family.",
      "It includes the Parent/Guardian Toolkit, so the support at home is built into the same subscription. Your athlete trains their mental game; you get the resources to reinforce it — one plan, the whole family rowing in the same direction.",
    ],
    bullets: [
      "The full 90-day \"Gaining the Edge\" program",
      "Daily AM + PM mental workouts",
      "The three interactive Coaches, on demand",
      "Baseline + 30 / 60 / 90-day progress assessments",
      "Parent/Guardian Toolkit included",
      "Christian-grounded, made for Shepherd",
    ],
  },
  {
    id: "parentguardian",
    label: "Parent/Guardian Toolkit",
    tag: "Mental Edge for Families",
    cat: "ALL YEAR",
    required: true,
    color: "#a08a52",
    title: "Parent/Guardian Toolkit — Mental Edge for Families",
    body: [
      "Your own set of guided, fill-in-as-you-go resources — quizzes, conversation guides, and workbooks — so the support at home reinforces what your athlete is building instead of adding pressure. It's mobile-friendly, so several tools are made to pull up in the moment (yes, even in the car).",
      "Ten resources across three themes — understanding your athlete, building the relationship, and supporting their growth — plus the featured Car Ride post-game debrief. The signature move throughout: do it yourself first, then with your athlete, and talk about where your answers differ.",
    ],
    bullets: [
      "Roadblock Evaluation — spot what's holding your athlete back",
      "Parent Style Quiz — see how your support is landing",
      "Identity, character & legacy beyond the scoreboard",
      "Conversation guides for competition, roles & commitment",
      "Preseason planning + Stop · Keep · Start reviews",
      "The Car Ride — guided post-game debrief",
      "Progress saves automatically · works on your phone",
    ],
  },
  {
    id: "sewnjournal",
    label: "SEWN Journal",
    tag: "Weekly Bible Journaling",
    cat: "ALL YEAR",
    required: true,
    color: "#6e5f38",
    title: "SEWN Journal — Shepherd Eternally SEWN",
    body: [
      "A weekly interactive Bible journaling rhythm — 10 + 15 + 5 = 30 minutes a week: ten minutes reading two to three chapters, fifteen minutes journaling the SEWN method, five minutes in reflection.",
      "S.E.W.N. — Scripture: write down what stands out · Explain: rewrite it in your own words with focus on the 15 Elite Performance Mindsets · Where to apply: bring it to the heart · Now pray. Athletes, coaches, and families can read the same chapters and record their own entries.",
    ],
    bullets: [
      "10 + 15 + 5 = 30 minutes a week",
      "Scripture · Explain · Where to apply · Now pray",
      "Coach version + athlete version",
      "Everyone reads the same 2–3 chapters weekly",
      "Launching October 1",
    ],
  },
  {
    id: "coaching",
    label: "Shepherd Interactive Coach",
    tag: "The Three Coaches",
    cat: "ALL YEAR",
    color: "#8a7c58",
    custom: "reset",
  },

  // ---- WHAT YOUR ATHLETE TRAINS ----
  {
    id: "gainingedge",
    label: "Gaining the Edge",
    tag: "The 90-Day Mental Edge Program",
    cat: "ALL YEAR",
    required: true,
    color: "#1b2a4a",
    title: "Gaining the Edge",
    body: [
      "The 90-day mental performance program at the heart of your athlete's subscription — built on 15 elite mindsets, with AM and PM workouts that train the mental game the way the weight room trains the body. Christian-grounded and made for Shepherd.",
      "Progress is measured, not guessed: a baseline assessment up front, then check-ins at 30, 60, and 90 days that show exactly how far your athlete has come.",
    ],
    bullets: [
      "90-day program built on 15 elite mindsets",
      "Daily AM + PM mental workouts",
      "Baseline assessment to start",
      "30 / 60 / 90-day progress assessments",
      "Christian-grounded mental training",
    ],
  },
  {
    id: "goliaths",
    label: "Overcoming Your Goliath",
    tag: "Shepherd Mental Edge Protocols",
    cat: "PRESEASON",
    color: "#a08a52",
    title: "Shepherd Mental Edge Protocols — Overcoming Your Goliath",
    body: [
      "Mental performance protocols that help your athlete face the giant standing between them and their potential — framing and priming techniques that set the standard for self and team, so they compete from identity, not pressure.",
    ],
  },
  {
    id: "assess",
    label: "Measuring Your Athlete's Growth",
    tag: "Progress & Assessments",
    cat: "ALL YEAR",
    color: "#b8860b",
    title: "Measuring Your Athlete's Growth",
    body: [
      "The mental game gets measured like everything else — a baseline up front, then 30 / 60 / 90-day check-ins that chart how far your athlete has come across the 15 Performance Mindsets.",
      "As a parent you'll see that your athlete is training, and a general read on their growth over the season — never their private answers. Their reflections stay theirs; the progress is what you get to celebrate together.",
    ],
    bullets: [
      "Baseline + 30 / 60 / 90-day check-ins",
      "Growth across the 15 Performance Mindsets",
      "A general read on progress — never private answers",
      "Turns the mental game into something you can encourage",
    ],
  },
  {
    id: "locker",
    label: "Athlete Locker Room",
    tag: "On-Demand Resources",
    cat: "ADD-ONS",
    color: "#1b2a4a",
    title: "Athlete Locker Room",
    body: [
      "24/7 access to the tools your athlete can reach for when they need them most. The moment nerves spike, motivation dips, or focus slips — the right resource is one tap away.",
      "An on-demand library that turns mental performance from a once-a-day exercise into something your athlete can reach for anytime.",
    ],
    bullets: [
      "Emotion Change Tools",
      "Motivation Vault",
      "Post-Game Review System",
      "Breath Work Library",
      "Focus Under Pressure",
    ],
  },
  {
    id: "captains",
    label: "Preparing to Be a Shepherd Captain",
    tag: "Leadership Program",
    cat: "PRESEASON",
    color: "#5a6b4a",
    title: "Preparing to Be a Shepherd Captain",
    body: [
      "A 10-week, 10-module leadership program anchored in the Shepherd philosophy — leading like Jesus, the Chief Shepherd. Modules map onto the six Shepherd traits and the logic that leadership develops culture, culture drives behaviors, and behaviors equal outcomes.",
      "Athlete-leaders build real leadership artifacts along the way — a personal and team mission, the standards and behaviors of a captain, and a signature module where they write their own leadership prayer.",
    ],
    bullets: [
      "10 weeks, 10 self-paced modules",
      "Anchored to the 6 Shepherd traits and servant leadership",
      "Build UR Legacy: personal mission, team mission, captain standards",
      "Signature module — the captain writes their own prayer",
      "Lead like Jesus: serve, don't be served",
    ],
  },
  {
    id: "office",
    label: "Mental Edge Office Hours",
    tag: "Group Coaching · Tue/Thu",
    cat: "ADD-ONS",
    color: "#6e5f38",
    title: "Mental Edge Office Hours",
    body: [
      "Live, 30-minute mental performance sessions for athletes, coaches, athletic directors, and families. Short. Focused. Powerful. High impact, no fluff.",
      "Every session tackles a real sports moment — pressure, slumps, confidence, leadership — with game-ready tools athletes can apply the same day.",
    ],
    bullets: [
      "Mission Driven Athletes Win More",
      "Separating Identity from Performance",
      "Slump Busting & Reframing",
      "Discipline When Motivation Fades",
      "Mistakes as Your Athletic Teacher",
      "Fall Seven, Rise Eight",
    ],
  },
];

// ============================================================
// PANEL CONTENT RENDERERS  (identical to the Command Center)
// ============================================================

function StandardPanel({ item }) {
  return (
    <div className="panel-grid">
      <div className="panel-copy">
        {item.body.map((p, i) => (
          <p key={i} className="panel-p">{p}</p>
        ))}
      </div>
      {item.bullets && (
        <div className="panel-side" style={{ borderColor: item.color }}>
          <div className="panel-side-label" style={{ color: item.color }}>
            What's inside
          </div>
          <ul className="panel-bullets">
            {item.bullets.map((b, i) => (
              <li key={i}>
                <span className="bullet-dot" style={{ background: item.color }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ResetPanel({ item }) {
  const coaches = [
    {
      name: "Confidence Coach",
      desc: "An always-open channel for the moments that matter — pre-game nerves, a tough day, a win to lock in. Your athlete talks it through and walks away with a clear, mindset-based plan.",
      color: "#b8860b",
    },
    {
      name: "Reflection Coach",
      desc: "A fast, structured post-game reflection that turns every competition into a learning rep. Four focused questions, about five minutes, one personalized takeaway.",
      color: "#5a6b4a",
    },
    {
      name: "Optimization Coach",
      desc: "A private, identity-building experience. Your athlete trains toward the best version of themselves — explored in depth in The Shepherd Mirror, the 30-day identity tool built on the Fruit of the Spirit.",
      color: "#1b2a4a",
    },
  ];
  return (
    <div>
      <p className="panel-p panel-lead">
        Three interactive mental-training reps, available to your athlete 24/7 —
        with immediate, sport-specific feedback the moment they need it. Together
        they form one complete daily loop: <strong>the weight room for the brain.</strong>
      </p>
      <div className="reset-row">
        {coaches.map((c, i) => (
          <div key={i} className="reset-card" style={{ "--c": c.color }}>
            <div className="reset-name">{c.name}</div>
            <p className="reset-desc">{c.desc}</p>
          </div>
        ))}
      </div>
      <p className="panel-p" style={{ marginTop: 4 }}>
        A parent's-eye view: you'll know your athlete is doing the reps and see a
        general read on their growth — their private reflections stay theirs.
      </p>
    </div>
  );
}

function AbmPanel() {
  const am = [
    ["ABM Mindset Video", "A short, dramatic standalone video that sets the mindset of the day."],
    ["On-Screen Education", "Quick, vivid teaching — read it, then continue."],
    ["Scenario of the Day", "A written, dramatic moment that colors the mindset in real competition."],
    ["Neuro-Tagging", "Three interactive visualization reps — the mental rehearsal, typed out."],
    ["RAS Activation", "Two gratitude exercises that prime the brain to notice the mindset."],
    ["Verbal Encoding", "One spoken answer, voiced aloud, tied to the scenario."],
  ];
  const pm = [
    ["Mindset Video Replay", "The same mindset video, revisited to lock it in."],
    ["Neuro-Journaling", "Nine scenario-anchored questions: true/false, guided choice, and open reflection."],
    ["Mindset Bursting", "45-second quick thoughts that fire the mindset on demand."],
  ];
  const Block = ({ title, steps, accent }) => (
    <div className="abm-col">
      <div className="abm-col-head" style={{ color: accent }}>{title}</div>
      <ol className="abm-steps">
        {steps.map((s, i) => (
          <li key={i} className="abm-step">
            <span className="abm-num" style={{ borderColor: accent, color: accent }}>{i + 1}</span>
            <div>
              <div className="abm-step-name">{s[0]}</div>
              <div className="abm-step-desc">{s[1]}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <div>
      <p className="panel-p panel-lead">
        Active Brain Management is the proprietary methodology behind everything your
        athlete does — a structured daily loop that trains the mind the way elite programs
        train the body. Here is the daily flow.
      </p>
      <div className="abm-grid">
        <Block title="Morning Flow" steps={am} accent="#FFD60A" />
        <Block title="Evening Flow" steps={pm} accent="#5AC8FA" />
      </div>
    </div>
  );
}

function StatsPanel() {
  return (
    <div>
      <p className="panel-p panel-lead">
        The mental game isn't a hunch — it's measurable. Every mindset your athlete trains is
        backed by peer-reviewed research. A sample of what the data says:
      </p>
      <div className="stats-grid">
        {MINDSETS.map(([name, stat], i) => {
          const num = stat ? stat.match(/\d+%?/) : null;
          return (
            <div key={i} className="stat-cell">
              {stat && <div className="stat-num">{num ? num[0] : "↑"}</div>}
              <div className="stat-name">{name}</div>
              {stat && <div className="stat-desc">{stat}</div>}
            </div>
          );
        })}
      </div>
      <p className="stats-foot">
        Research compiled across 40+ peer-reviewed studies in sport and performance psychology.
      </p>
    </div>
  );
}


// ============================================================
// MAIN
// ============================================================

export default function ParentsDashboard() {
  const [active, setActive] = useState(null); // {kind, item}

  const open = useCallback((kind, item) => setActive({ kind, item }), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const renderPanelBody = () => {
    if (!active) return null;
    const { item } = active;
    if (item.custom === "reset") return <ResetPanel item={item} />;
    if (item.custom === "abm") return <AbmPanel />;
    if (item.custom === "stats") return <StatsPanel />;
    return <StandardPanel item={item} />;
  };

  const panelTitle = active
    ? (active.item.title || active.item.label)
    : "";
  const panelColor = active ? active.item.color : "#fff";

  return (
    <div className="mea-root">
      <style>{CSS}</style>

      {/* HEADER */}
      <header className="mea-header">
        <div className="brand">
          <span className="brand-mark">
            <img src="/shepherd-logo.svg" alt="Shepherd Coach Network" className="brand-logo" />
          </span>
        </div>
        <div className="brand-right">
          <span className="live-dot" /> FOR PARENTS &amp; GUARDIANS
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Shepherd Mental Edge</h1>
        <div className="hero-subtitle">For Families</div>
        <p className="hero-lead">
          Here's what your athlete is building — and how you support them at home. The same
          faith-grounded mental training your athlete trains daily, plus a toolkit made just
          for parents and guardians.
        </p>
      </section>

      {/* HOW YOU SUPPORT AT HOME (replaces the "Built For" audience row) */}
      <section className="zone zone-aud">
        <div className="zone-label"><span className="zone-bar" />How You Support at Home</div>
        <div className="aud-grid">
          {SUPPORT.map((a) => (
            <button key={a.id} className="aud-tile" style={{ "--c": a.color }}
                    onClick={() => open("support", a)}>
              <span className="aud-glow" />
              <span className="aud-label">{a.label}</span>
              <span className="aud-sub">{a.sub}</span>
              <span className="aud-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* breathing space */}
      <div className="space-break" />

      {/* METHODOLOGY & SCIENCE */}
      <section className="zone zone-method">
        <div className="zone-title">The Methodology &amp; The Science</div>
        <div className="method-grid">
          {METHODOLOGY.map((m) => (
            <button key={m.id} className="method-tile" style={{ "--c": m.color }}
                    onClick={() => open("prog", m)}>
              <span className="method-glow" />
              <span className="method-tag" style={{ color: m.color }}>{m.tag}</span>
              <span className="method-label">{m.label}</span>
              <span className="method-blurb">{m.blurb}</span>
              <span className="method-line" style={{ background: m.color }} />
            </button>
          ))}
        </div>
      </section>

      {/* breathing space */}
      <div className="space-break" />

      {/* PRODUCTS & SERVICES */}
      <section className="zone zone-products">
        <div className="zone-title">What Your Athlete Gets — and What's Yours</div>
        <div className="prog-grid">
          {PRODUCTS.map((p) => {
            const chip = p.cat && (
              <span className="prog-cat" style={{ background: CAT[p.cat].bg, color: CAT[p.cat].fg }}>{p.cat}</span>
            );
            return p.stub ? (
              <div key={p.id} className="prog-tile prog-tile--stub" style={{ "--c": p.color }}>
                {chip}
                <span className="prog-tag" style={{ color: p.color }}>{p.tag}</span>
                <span className="prog-label">{p.label}</span>
                <span className="prog-line" style={{ background: p.color }} />
              </div>
            ) : (
              <button key={p.id} className="prog-tile" style={{ "--c": p.color }}
                      onClick={() => open("prog", p)}>
                {chip}
                <span className="prog-tag-row">
                  <span className="prog-tag" style={{ color: p.color }}>{p.tag}</span>
                  {p.required && <span className="prog-required">Included</span>}
                </span>
                <span className="prog-label">{p.label}</span>
                <span className="prog-line" style={{ background: p.color }} />
              </button>
            );
          })}
        </div>
      </section>

      {/* TICKER */}
      <footer className="ticker">
        <div className="ticker-tag">THE 15 MINDSETS</div>
        <div className="ticker-window">
          <div className="ticker-track">
            {[...MINDSETS, ...MINDSETS].map(([name, stat], i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-name">{name}</span>
                {stat && (
                  <>
                    <span className="ticker-sep">—</span>
                    <span className="ticker-stat">{stat}</span>
                  </>
                )}
                <span className="ticker-dot">◆</span>
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* BREAKOUT PANEL */}
      {active && (
        <div className="overlay" onClick={close}>
          <div className="panel" style={{ "--c": panelColor }}
               onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <div className="panel-eyebrow" style={{ color: panelColor }}>
                {active.kind === "support" ? "How You Support at Home" : (active.item.tag || "Program")}
              </div>
              <h2 className="panel-title">{panelTitle}</h2>
              <button className="panel-close" onClick={close} aria-label="Close">×</button>
            </div>
            <div className="panel-accent" style={{ background: panelColor }} />
            <div className="panel-body">{renderPanelBody()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// STYLES  (copied verbatim from the Command Center so the two
// pages look identical — keep in sync if the palette changes)
// ============================================================
const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
.mea-root {
  --bg: #f4f1ea;
  --panel-bg: #f4f1ea;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(184,134,11,0.10), transparent 60%),
    radial-gradient(800px 500px at 100% 110%, rgba(160,138,82,0.10), transparent 60%),
    #f4f1ea;
  color: #14161b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 18px 28px 0;
  letter-spacing: 0.2px;
}

/* breathing space between zones */
.space-break { height: 30px; flex: 0 0 auto; }

/* HEADER */
.mea-header {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 12px; flex: 0 0 auto;
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-mark {
  position: relative; width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
}
.brand-logo {
  width: 52px; height: 52px; object-fit: contain; display: block;
}
.brand-name { font-size: 17px; font-weight: 800; letter-spacing: 2.5px; }
.brand-tag { font-size: 10px; letter-spacing: 1.4px; color: #6e5f38; text-transform: uppercase; margin-top: 2px; }
.brand-right {
  font-size: 10.5px; letter-spacing: 1.8px; color: #6e5f38; font-weight: 700;
  display: flex; align-items: center; gap: 8px; text-transform: uppercase;
}
.live-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #b8860b;
  box-shadow: 0 0 10px #b8860b; animation: pulse 1.4s infinite;
}
@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

/* HERO */
.hero { flex: 0 0 auto; padding: 4px 0 20px; }
.hero-title { font-size: 40px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.04; color: #14161b; }
.hero-subtitle { font-size: 18px; font-weight: 800; letter-spacing: 0.5px; color: #b8860b; margin-top: 4px; }
.hero-lead { font-size: 15px; color: #6e5f38; line-height: 1.5; margin-top: 12px; max-width: 680px; }

/* ZONES */
.zone { flex: 0 0 auto; }
.zone-label {
  display: flex; align-items: center; gap: 9px;
  font-size: 10.5px; letter-spacing: 2.4px; text-transform: uppercase;
  color: #6e5f38; font-weight: 700; margin-bottom: 11px;
}
.zone-bar { width: 22px; height: 2px; background: linear-gradient(90deg,#b8860b,#a08a52); }
.zone-title {
  font-size: 19px; font-weight: 800; letter-spacing: 0.4px; margin-bottom: 13px;
  background: linear-gradient(90deg, #14161b, #6e5f38);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}

/* AUDIENCE TILES */
.aud-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.aud-tile {
  position: relative; overflow: hidden; cursor: pointer; text-align: left;
  background: linear-gradient(180deg, #eaddbd, #e7d9b8);
  border: 1px solid rgba(20,22,27,0.10);
  border-left: 3px solid var(--c);
  border-radius: 12px; padding: 15px 16px 14px;
  display: flex; flex-direction: column; gap: 3px;
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.aud-glow {
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(180px 120px at 0% 0%, var(--c), transparent 70%);
  transition: opacity .2s ease; pointer-events: none;
}
.aud-tile:hover { transform: translateY(-3px); box-shadow: 0 12px 34px -12px var(--c); border-color: var(--c); }
.aud-tile:hover .aud-glow { opacity: 0.18; }
.aud-tile:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.aud-label { font-size: 16px; font-weight: 800; letter-spacing: 0.3px; z-index: 1; padding-right: 22px; }
.aud-sub { font-size: 10.5px; color: #6e5f38; letter-spacing: 0.4px; z-index: 1; padding-right: 24px; }
.aud-arrow { position: absolute; bottom: 14px; right: 15px; color: var(--c); font-size: 15px; font-weight: 800; z-index: 1; }

/* METHODOLOGY — bigger tiles */
.method-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.method-tile {
  position: relative; overflow: hidden; cursor: pointer; text-align: left;
  background: linear-gradient(160deg, #eaddbd, #e7d9b8);
  border: 1px solid rgba(20,22,27,0.10);
  border-radius: 16px; padding: 26px 26px 24px; min-height: 132px;
  display: flex; flex-direction: column; gap: 7px;
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.method-glow {
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(320px 200px at 100% 0%, var(--c), transparent 70%);
  transition: opacity .25s ease; pointer-events: none;
}
.method-tile:hover { transform: translateY(-4px); border-color: var(--c); box-shadow: 0 20px 50px -16px var(--c); }
.method-tile:hover .method-glow { opacity: 0.22; }
.method-tile:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.method-tag { font-size: 11px; font-weight: 800; letter-spacing: 1.8px; text-transform: uppercase; z-index: 1; }
.method-label { font-size: 25px; font-weight: 800; letter-spacing: 0.2px; z-index: 1; line-height: 1.08; }
.method-blurb { font-size: 13px; color: #6e5f38; line-height: 1.45; z-index: 1; max-width: 90%; }
.method-line { height: 3px; width: 34px; border-radius: 2px; z-index: 1; margin-top: 4px; transition: width .2s ease; }
.method-tile:hover .method-line { width: 64px; }

/* PRODUCT TILES — 3 across, 4 rows */
.prog-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px;
}
.prog-tile {
  position: relative; overflow: hidden; cursor: pointer; text-align: left;
  background: linear-gradient(165deg, #eaddbd, #e7d9b8);
  border: 1px solid rgba(20,22,27,0.09);
  border-radius: 12px; padding: 24px 15px 14px; min-height: 96px;
  display: flex; flex-direction: column; justify-content: space-between; gap: 7px;
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease, background .16s ease;
}
.prog-cat {
  position: absolute; top: 0; left: 0; right: 0; z-index: 2;
  height: 17px; display: flex; align-items: center; padding: 0 12px;
  font-size: 8px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase;
}
.prog-tile::before {
  content: ""; position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(160px 110px at 100% 0%, var(--c), transparent 72%);
  transition: opacity .2s ease; pointer-events: none;
}
.prog-tile:hover { transform: translateY(-3px); border-color: var(--c); box-shadow: 0 14px 36px -14px var(--c); }
.prog-tile:hover::before { opacity: 0.20; }
.prog-tile:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.prog-tag { font-size: 9px; letter-spacing: 1.4px; text-transform: uppercase; font-weight: 800; z-index: 1; }
.prog-tag-row { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; z-index: 1; }
.prog-required {
  font-size: 8px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
  color: #fff; background: #5a6b4a; border-radius: 3px; padding: 1.5px 5px; line-height: 1.35;
}
.prog-label { font-size: 14.5px; font-weight: 800; line-height: 1.14; letter-spacing: 0.2px; z-index: 1; }
.prog-line { height: 2.5px; width: 26px; border-radius: 2px; z-index: 1; transition: width .2s ease; }
.prog-tile:hover .prog-line { width: 46px; }
/* Stub tiles: real-looking but non-interactive (content pending) */
.prog-tile--stub { cursor: default; }
.prog-tile--stub:hover { transform: none; border-color: rgba(20,22,27,0.09); box-shadow: none; }
.prog-tile--stub::before { display: none; }

/* TICKER */
.ticker {
  flex: 0 0 auto; display: flex; align-items: stretch; gap: 0;
  border-top: 1px solid rgba(20,22,27,0.12);
  margin: 30px -28px 0; background: #eaddbd;
  height: 42px;
}
.ticker-tag {
  display: flex; align-items: center; padding: 0 16px;
  font-size: 10px; font-weight: 800; letter-spacing: 1.6px;
  background: linear-gradient(90deg, #b8860b, #a08a52); color: #14161b;
  white-space: nowrap; flex: 0 0 auto;
}
.ticker-window { overflow: hidden; flex: 1 1 auto; display: flex; align-items: center; }
.ticker-track { display: inline-flex; white-space: nowrap; animation: scroll 120s linear infinite; }
.ticker-item { display: inline-flex; align-items: center; gap: 9px; padding: 0 4px; font-size: 12.5px; }
.ticker-name { font-weight: 800; color: #14161b; letter-spacing: 0.5px; }
.ticker-sep { color: #a08a52; }
.ticker-stat { color: #6e5f38; }
.ticker-dot { color: #b8860b; margin: 0 16px; font-size: 8px; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* OVERLAY + PANEL */
.overlay {
  position: fixed; inset: 0; z-index: 50;
  background: rgba(20,22,27,0.55); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 26px;
  animation: fade .18s ease;
}
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
.panel {
  background: var(--panel-bg);
  border: 1px solid rgba(20,22,27,0.12);
  border-radius: 16px; width: min(960px, 96vw); max-height: 88vh; overflow: hidden;
  display: flex; flex-direction: column;
  box-shadow: 0 30px 90px -20px rgba(20,22,27,0.35), 0 0 60px -30px var(--c);
  animation: rise .22s cubic-bezier(.2,.8,.2,1);
}
@keyframes rise { from { transform: translateY(14px) scale(.985); opacity: 0; } to { transform: none; opacity: 1; } }
.panel-head { position: relative; padding: 22px 26px 14px; }
.panel-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
.panel-title { font-size: 26px; font-weight: 800; line-height: 1.1; margin-top: 6px; letter-spacing: 0.2px; max-width: 90%; }
.panel-close {
  position: absolute; top: 16px; right: 18px; width: 34px; height: 34px;
  border-radius: 9px; border: 1px solid rgba(20,22,27,0.15); background: rgba(20,22,27,0.04);
  color: #14161b; font-size: 22px; line-height: 1; cursor: pointer; transition: background .15s ease;
}
.panel-close:hover { background: rgba(20,22,27,0.10); }
.panel-accent { height: 3px; width: 100%; }
.panel-body { padding: 20px 26px 26px; overflow-y: auto; }
.panel-p { font-size: 14.5px; line-height: 1.6; color: #6e5f38; margin-bottom: 12px; }
.panel-lead { font-size: 15.5px; color: #14161b; }
.panel-p strong { color: #14161b; }

.panel-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
.panel-side { border-left: 2px solid; padding-left: 18px; }
.panel-side-label { font-size: 11px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; margin-bottom: 12px; }
.panel-bullets { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.panel-bullets li { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: #6e5f38; line-height: 1.4; }
.bullet-dot { width: 7px; height: 7px; border-radius: 50%; margin-top: 5px; flex: 0 0 auto; }

.panel-cta {
  display: inline-block; margin-top: 8px; padding: 12px 22px; border-radius: 10px;
  color: #000; font-weight: 800; font-size: 14px; text-decoration: none; letter-spacing: 0.3px;
  transition: transform .15s ease, filter .15s ease;
}
.panel-cta:hover { transform: translateY(-2px); filter: brightness(1.1); }

/* RESET PANEL */
.reset-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 6px 0 18px; }
.reset-card {
  border: 1px solid rgba(20,22,27,0.10); border-top: 3px solid var(--c);
  border-radius: 12px; padding: 15px; background: #eaddbd;
}
.reset-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; }
.reset-name { font-size: 17px; font-weight: 800; margin: 6px 0 8px; }
.reset-desc { font-size: 13px; line-height: 1.5; color: #6e5f38; }

/* ABM PANEL */
.abm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 6px; }
.abm-col-head { font-size: 13px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; margin-bottom: 12px; }
.abm-steps { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.abm-step { display: flex; gap: 12px; align-items: flex-start; }
.abm-num {
  flex: 0 0 auto; width: 26px; height: 26px; border-radius: 7px; border: 1.5px solid;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800;
}
.abm-step-name { font-size: 14px; font-weight: 700; color: #14161b; }
.abm-step-desc { font-size: 12.5px; color: #6e5f38; line-height: 1.45; margin-top: 1px; }

/* STATS PANEL */
.stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 8px 0 14px; }
.stat-cell {
  border: 1px solid rgba(20,22,27,0.08); border-radius: 10px; padding: 11px 11px 12px;
  background: #eaddbd;
}
.stat-num { font-size: 22px; font-weight: 900; color: #14161b; line-height: 1; }
.stat-name { font-size: 11.5px; font-weight: 800; letter-spacing: 0.4px; margin: 6px 0 4px; color: #b8860b; }
.stat-desc { font-size: 10.5px; color: #6e5f38; line-height: 1.35; }
.stats-foot { font-size: 11px; color: #6e5f38; font-style: italic; }

@media (max-width: 760px) {
  .prog-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .aud-grid { grid-template-columns: repeat(2, 1fr); }
  .method-grid { grid-template-columns: 1fr; }
  .prog-grid { grid-template-columns: 1fr; }
  .panel-grid, .reset-row, .abm-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
  .live-dot { animation: none; }
}
`;
