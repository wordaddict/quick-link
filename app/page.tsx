const givingUrl =
  'https://give.tithe.ly/?formId=9cc2d2c8-2923-48ce-b743-b3b1dbd16ad6&locationId=0cc1e1b0-39c8-45b6-b3e0-70567eb2d7f1&fundId=d7d374b5-1fd6-4979-82de-d97c53234e40';

const quickLinks = [
  {
    label: 'Plan your visit',
    detail: 'Sundays at 10:00 AM',
    href: 'https://maps.app.goo.gl/JQvWkMrPyVEcYZWt6',
    badge: '01',
  },
  {
    label: 'Give to CCI DMV',
    detail: 'Partner with the work',
    href: givingUrl,
    badge: '02',
    featured: true,
  },
  {
    label: 'Join a MAP group',
    detail: 'Find community near you',
    href: 'https://dmv.joincci.org/',
    badge: '03',
  },
  {
    label: 'Get connected',
    detail: 'Membership, service & care',
    href: 'https://usa.joincci.org/en/get-involved',
    badge: '04',
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="CCI DMV home">
          <img src="/cci-america-logo.svg" alt="Celebration Church International America" />
          <span>DMV</span>
        </a>
        <a className="header-link" href="https://dmv.joincci.org/" target="_blank" rel="noreferrer">
          About us <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="page-grid" id="top">
        <section className="intro" aria-labelledby="welcome-heading">
          <p className="eyebrow"><span /> Celebration Church International · DMV</p>
          <h1 id="welcome-heading">Welcome<br /><em>home.</em></h1>
          <p className="intro-copy">
            One place for what&apos;s happening, ways to connect, and everything you need for church this week.
          </p>

          <article className="gather-card">
            <div className="gather-topline">
              <span className="live-dot" aria-hidden="true" />
              <span>This Sunday</span>
              <span className="card-number">DMV / 001</span>
            </div>
            <div className="gather-content">
              <div>
                <p>Worship with us</p>
                <h2>10:00 AM <small>ET</small></h2>
              </div>
              <span className="sun-mark" aria-hidden="true">✦</span>
            </div>
            <a href="https://maps.app.goo.gl/JQvWkMrPyVEcYZWt6" target="_blank" rel="noreferrer" className="location-row">
              <span><strong>Celebr8 Centre</strong><br />3501 Windom Rd, Brentwood, MD</span>
              <span aria-hidden="true">↗</span>
            </a>
          </article>

          <p className="benediction">In Christ. For Christ. <strong>With joy.</strong></p>
        </section>

        <section className="links-panel" aria-labelledby="quick-links-heading">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Quick links</p>
              <h2 id="quick-links-heading">Start here.</h2>
            </div>
            <span className="tap-hint">Tap any card</span>
          </div>

          <div className="link-list">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                className={`quick-link${link.featured ? ' quick-link-featured' : ''}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="link-number">{link.badge}</span>
                <span className="link-copy">
                  <strong>{link.label}</strong>
                  <small>{link.detail}</small>
                </span>
                <span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <article className="announcement">
            <div className="announcement-label">
              <span>Announcement</span>
              <time>Every week</time>
            </div>
            <h3>Midweek Service</h3>
            <p>Go deeper in the Word and prayer with the CCI America family, Wednesdays at 7:00 PM ET.</p>
            <a href="https://usa.joincci.org/en" target="_blank" rel="noreferrer">
              Get the details <span aria-hidden="true">→</span>
            </a>
          </article>

          <div className="more-row">
            <a href="https://usa.joincci.org/en/media" target="_blank" rel="noreferrer">Watch messages ↗</a>
            <a href="https://joincci.org/" target="_blank" rel="noreferrer">CCI Global ↗</a>
          </div>
        </section>
      </div>

      <footer>
        <span>CCI DMV</span>
        <span>Progress and joy in the faith.</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
