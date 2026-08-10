"use client";

import React, { useState, useEffect, useCallback } from "react";

// ============================================================
// MENTAL EDGE ACADEMY — Command Center Dashboard
// ESPN-broadcast energy. Black canvas, electric tiles,
// in-page breakout panels, fast 15-mindset ticker.
// Condensed to fit a 13" MacBook Air in one snapshot.
// ============================================================


// ---- 15 Mindsets + one stat each (ticker) ----
// Stats from Build Brief §5 (Athletic Mental Edge Mindset Training).
// Accent color is hardcoded #b8860b in the ticker/stats CSS, so no per-item color.
// Challenge Mastery (#9) and Mental Fortitude (#13) have no honestly-sourced
// stat in the source doc — rendered as mindset name only (brief §5 flag).
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

// ---- Audience tiles (4) ----
const AUDIENCES = [
  {
    id: "ad",
    label: "Athletic Departments",
    sub: "College or High School",
    color: "#b8860b",
    title: "Mental Edge Academy for Athletic Departments",
    body: [
      "A department-wide mental performance system that puts every team — and every coach — on the same proven methodology. One operating standard for mental fitness across your entire program.",
      "Coaches get a weekly optimization layer, athletes get daily reps, and administrators get a reporting dashboard that rolls program-wide mindset data into a single view.",
    ],
    bullets: [
      "Program-wide rollout across all sports",
      "AD reporting layer with team-by-team mindset tracking",
      "Coach optimization tools + weekly reports",
      "One methodology, one language, every locker room",
    ],
  },
  {
    id: "teams",
    label: "Teams",
    sub: "College or High School",
    color: "#5a6b4a",
    title: "Mental Edge Academy for Teams",
    body: [
      "Turn your roster into a mentally tougher, more connected unit. Every athlete trains the same 15 Performance Mindsets daily, anchored to your season and your sport.",
      "The coach layer gives you visibility into who's locked in and who needs a conversation — before it shows up on game day.",
    ],
    bullets: [
      "Daily ABM reps for the whole roster",
      "In-season and off-season tracks",
      "Coach dashboard with radar-chart mindset tracking",
      "Built around your competition calendar",
    ],
  },
  {
    id: "individuals",
    label: "Individuals",
    sub: "Athletes & Families",
    color: "#1b2a4a",
    title: "Mental Edge Academy for Individuals",
    body: [
      "For the athlete who wants the edge nobody can see. A self-paced mental training system that builds discipline, resilience, and focus the same way the weight room builds the body.",
      "Includes The Daily Reset — an on-demand coaching companion available 24/7 — plus the full belt progression and personal mindset tracking.",
    ],
    bullets: [
      "Self-paced daily mental reps",
      "The Daily Reset: coach, debrief & mirror on demand",
      "Belt progression from Red to Black",
      "Private mindset tracking and growth over time",
    ],
  },
  {
    id: "orgs",
    label: "Organizations",
    sub: "Travel Teams, Pro Teams & More",
    color: "#8a7c58",
    title: "Mental Edge Academy for Organizations",
    body: [
      "Built for clubs, travel organizations, and professional outfits that compete across many teams and age groups. Deploy one mental performance standard across your whole organization.",
      "White-label options, multi-team reporting, and a flexible rollout that scales from a single travel club to a full professional system.",
    ],
    bullets: [
      "Multi-team and multi-age-group deployment",
      "White-label and co-branded options",
      "Organization-wide reporting & analytics",
      "Scales from travel clubs to pro teams",
    ],
  },
];

// ---- Methodology & Science (2 big tiles) ----
const METHODOLOGY = [
  {
    id: "abm",
    label: "Active Brain Management",
    tag: "The Methodology",
    color: "#b8860b",
    custom: "abm",
    blurb: "The proprietary daily training loop behind everything we do — the science of how the mind is trained.",
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

// ---- Products & Services tiles (12) — Shepherd Mental Edge v1 ----
// Roster + naming per Matt meeting (7/20/26). Single grid; each tile
// carries a category chip (cat) — Preseason / In-Season / All Year /
// Add-Ons / Future Build — instead of separate sections.
//
// Notes: Goliath stays count-free (13 protocols, one may spin off).
// The Shepherd Mirror is no longer a standalone tile — it's wrapped into
// the Shepherd Interactive Coach (still referenced in that panel). Office
// Hours and the Athlete Locker Room are Add-Ons (Office Hours is not
// Shepherd-branded). Activate Seven is the lone Future Build stub. The
// Parent/Guardian Toolkit is a new Add-On. SEWN Journal + Bulletin Board
// are new (launch Oct 1).

// Category chip colors (additive — tiles keep their own accent color)
const CAT = {
  "PRESEASON":    { bg: "#b8860b", fg: "#14161b" },
  "IN-SEASON":    { bg: "#5a6b4a", fg: "#f4f1ea" },
  "ALL YEAR":     { bg: "#1b2a4a", fg: "#f4f1ea" },
  "ADD-ONS":      { bg: "#6e5f38", fg: "#f4f1ea" },
  "FUTURE BUILD": { bg: "#8a7c58", fg: "#14161b" },
};

const PRODUCTS = [
  // Grid order: the four Required tiles lead (positions 1–4), then the SEWN
  // Journal Bulletin Board (kept next to the SEWN Journal tiles), then the
  // remaining tiles. Category chips (cat) still label each tile; ordering is
  // no longer grouped by category.

  // ---- REQUIRED (front of grid) ----
  {
    id: "gainingedge",
    label: "Gaining the Edge",
    tag: "The 90-Day Mental Edge Program",
    cat: "ALL YEAR",
    required: true,
    color: "#1b2a4a",
    title: "Gaining the Edge",
    body: [
      "A 90-day mental performance program built on 15 elite mindsets — with AM and PM workouts that train the mental game the way the weight room trains the body. Christian-grounded and made for Shepherd.",
      "Progress is measured, not guessed: a baseline assessment up front, then check-ins at 30, 60, and 90 days that show exactly how far the athlete has come.",
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
    id: "sewnjournal",
    label: "SEWN Journal",
    tag: "Weekly Bible Journaling",
    cat: "ALL YEAR",
    required: true,
    color: "#6e5f38",
    title: "SEWN Journal — Shepherd Eternally SEWN",
    body: [
      "A weekly interactive Bible journaling rhythm — 10 + 15 + 5 = 30 minutes a week: ten minutes reading two to three chapters, fifteen minutes journaling the SEWN method, five minutes in reflection.",
      "S.E.W.N. — Scripture: write down what stands out · Explain: rewrite it in your own words with focus on the 15 Elite Performance Mindsets · Where to apply: bring it to the heart · Now pray. Athletes, coaches, and the AD all read the same chapters and record their own entries.",
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
    id: "goliaths",
    label: "Overcoming Your Goliath",
    tag: "Shepherd Mental Edge Protocols",
    cat: "PRESEASON",
    required: true,
    color: "#a08a52",
    title: "Shepherd Mental Edge Protocols — Overcoming Your Goliath",
    body: [
      "Mental performance protocols that help the athlete face the giant standing between them and their potential — framing and priming techniques that set the standard for self and team, so they compete from identity, not pressure.",
    ],
  },
  {
    id: "assess",
    label: "Coach & Athlete Assessments",
    tag: "Tracking & Scoring",
    cat: "ALL YEAR",
    required: true,
    color: "#b8860b",
    title: "Coach & Athlete Assessments",
    body: [
      "Measure the mental game like you measure everything else. A scoring and tracking system that benchmarks mindset, charts growth over a season, and turns the invisible into a number you can coach.",
      "The same baseline and 30 / 60 / 90-day assessments that power Gaining the Edge — available on their own to see where every athlete and coach stands.",
    ],
    bullets: [
      "Benchmarks across the 15 Performance Mindsets",
      "Baseline + 30 / 60 / 90-day check-ins",
      "Season-long growth tracking",
      "Turns mental fitness into measurable data",
    ],
  },
  {
    id: "sewnboard",
    label: "SEWN Journal Bulletin Board",
    tag: "Team Board",
    cat: "ALL YEAR",
    color: "#5a6b4a",
    stub: true,
  },

  // ---- REMAINING ----
  {
    id: "captains",
    label: "Preparing to Be a Shepherd Captain",
    tag: "Leadership Program",
    cat: "PRESEASON",
    color: "#5a6b4a",
    title: "Preparing to Be a Shepherd Captain",
    body: [
      "A 10-week, 10-module leadership program re-anchored in the Shepherd philosophy — leading like Jesus, the Chief Shepherd. Modules map onto the six Shepherd traits and the logic that leadership develops culture, culture drives behaviors, and behaviors equal outcomes.",
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
    id: "coaching",
    label: "Shepherd Interactive Coach",
    tag: "The Three Coaches",
    cat: "ALL YEAR",
    color: "#8a7c58",
    custom: "reset",
  },
  {
    id: "debrief",
    label: "Shepherd Post-Game | Practice Debrief Report",
    tag: "Coach Report",
    cat: "IN-SEASON",
    color: "#8a7c58",
    title: "Shepherd Post-Game | Practice Debrief Report",
    body: [
      "A weekly in-season report delivered to the head coach — who trained, how the team's mindset trended after games and practices, and where to focus the conversation this week.",
      "Turns a week of competition and training into a single clear read, so the head coach always knows where the team stands and what to address next.",
    ],
    bullets: [
      "Weekly in-season report to the head coach",
      "Post-game and post-practice mindset trends",
      "Highlights where to focus next",
      "Delivered automatically each week",
    ],
  },
  {
    id: "activate7",
    label: "Activate Seven | Building a Shepherd Legacy",
    tag: "Coach Equipping",
    cat: "FUTURE BUILD",
    color: "#6e5f38",
    stub: true,
  },
  {
    id: "locker",
    label: "Athlete Locker Room",
    tag: "On-Demand Resources",
    cat: "ADD-ONS",
    color: "#1b2a4a",
    title: "Athlete Locker Room",
    body: [
      "24/7 access to the tools athletes can reach for when they need them most. The moment nerves spike, motivation dips, or focus slips — the right resource is one tap away.",
      "An on-demand library that turns mental performance from a once-a-day exercise into something the athlete can reach for anytime.",
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
  {
    id: "parentguardian",
    label: "Parent/Guardian Toolkit",
    tag: "Mental Edge for Families",
    cat: "ADD-ONS",
    color: "#a08a52",
    title: "Parent/Guardian Toolkit — Mental Edge for Families",
    body: [
      "The mental game doesn't end when practice does — it rides home in the car. This toolkit gives parents and guardians their own set of resources so the support at home reinforces what the athlete is building, instead of adding pressure.",
      "Families are guided across four areas — understanding your athlete, building the relationship, supporting their growth, and the all-important car ride home — with quizzes, conversation guides, and workbooks to work through together.",
    ],
    bullets: [
      "Roadblock Evaluation — spot what's holding your athlete back",
      "Parent Style Quiz — see how your sideline support is landing",
      "Identity, character & legacy guides beyond the scoreboard",
      "Conversation guides for competition, roles & commitment",
      "Preseason planning + Stop · Keep · Start seasonal reviews",
      "The Car Ride — guided post-game debrief questions",
    ],
  },
];

// ============================================================
// PANEL CONTENT RENDERERS
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
            Inside the program
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
      desc: "An always-open channel for the moments that matter — pre-game nerves, a tough day, a win to lock in. The athlete talks it through and walks away with a clear, mindset-based plan.",
      color: "#b8860b",
    },
    {
      name: "Reflection Coach",
      desc: "A fast, structured post-game reflection that turns every competition into a learning rep. Four focused questions, about five minutes, one personalized takeaway.",
      color: "#5a6b4a",
    },
    {
      name: "Optimization Coach",
      desc: "A private, identity-building experience. The athlete trains toward the best version of themselves — explored in depth in The Shepherd Mirror, the 30-day identity tool built on the Fruit of the Spirit.",
      color: "#1b2a4a",
    },
  ];
  return (
    <div>
      <p className="panel-p panel-lead">
        Three interactive mental-training reps, available to the athlete 24/7 —
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
        Active Brain Management is the proprietary methodology behind everything we do —
        a structured daily loop that trains the mind the way elite programs train the body.
        Here is the daily flow.
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
        The mental game isn't a hunch — it's measurable. Every mindset we train is backed
        by peer-reviewed research. A sample of what the data says:
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

export default function ShepherdCommandDashboard() {
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
          <span className="live-dot" /> 15 PERFORMANCE MINDSETS · TRAINED DAILY
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Shepherd Mental Edge</h1>
        <div className="hero-subtitle">The Command Center</div>
        <p className="hero-lead">
          Mental performance training for athletic departments, teams, individuals, and organizations — powered by the AEA Institute.
        </p>
      </section>

      {/* AUDIENCE ROW */}
      <section className="zone zone-aud">
        <div className="zone-label"><span className="zone-bar" />Built For</div>
        <div className="aud-grid">
          {AUDIENCES.map((a) => (
            <button key={a.id} className="aud-tile" style={{ "--c": a.color }}
                    onClick={() => open("aud", a)}>
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
        <div className="zone-title">Products &amp; Services Inside Shepherd Mental Edge</div>
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
                  {p.required && <span className="prog-required">Required</span>}
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
                {active.kind === "aud" ? "Built For" : (active.item.tag || "Program")}
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
// STYLES
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
.aud-label { font-size: 16px; font-weight: 800; letter-spacing: 0.3px; z-index: 1; }
.aud-sub { font-size: 10.5px; color: #6e5f38; letter-spacing: 0.4px; z-index: 1; }
.aud-arrow { position: absolute; top: 14px; right: 15px; color: var(--c); font-size: 15px; font-weight: 800; z-index: 1; }

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
  color: #fff; background: #a4243b; border-radius: 3px; padding: 1.5px 5px; line-height: 1.35;
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
