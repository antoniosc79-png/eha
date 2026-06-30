const events = [
  { month: 'JUL', day: '12', title: 'Men’s Breakfast', meta: '8:00 AM · Fellowship Hall' },
  { month: 'JUL', day: '26', title: 'Serve Saturday', meta: '9:00 AM · East Hill Campus' },
  { month: 'AUG', day: '08', title: 'Trail & Table', meta: '6:30 PM · Mount Rainier' }
];
const members = [
  ['MJ', 'Marcus Johnson', 'North Tacoma · Table Leader'],
  ['DR', 'Daniel Reed', 'Puyallup · Mentorship'],
  ['CA', 'Chris Allen', 'Tacoma · Service Team'],
  ['JT', 'James Thompson', 'Lakewood · Prayer Team']
];
const app = document.querySelector('#app');

function eventCards(limit = events.length) {
  return events.slice(0, limit).map((e, i) => `<article class="card event-card" role="button" tabindex="0" data-rsvp="${i}">
    <div class="date"><span>${e.month}</span><strong>${e.day}</strong></div>
    <div><h3>${e.title}</h3><p class="meta">${e.meta}</p></div><span class="arrow">›</span>
  </article>`).join('');
}
const views = {
  home: () => `<section class="hero"><div class="hero-logo"><img src="assets/ministry-logo.png" alt="Alliance Men"></div><p class="eyebrow">Alliance Men · East Hill</p><h1>Stronger.<br>Together.</h1><p class="hero-copy">A brotherhood pursuing Jesus, building each other up, and serving our community.</p><div class="actions"><button class="btn" data-tab="events">Find an event</button><button class="btn secondary" data-tab="members">Connect</button></div></section>
    <section class="section"><div class="section-title"><h2>Coming Up</h2><button class="text-link" data-tab="events">View all</button></div>${eventCards(2)}</section>
    <section class="section"><div class="card verse"><blockquote>“As iron sharpens iron, so one person sharpens another.”</blockquote><cite>Proverbs 27:17</cite></div></section>`,
  events: () => `<header class="page-head"><p class="eyebrow">Get involved</p><h2>Events</h2><p>Show up. Be known. Build something that lasts.</p></header><section class="page"><div class="list">${eventCards()}</div></section>`,
  members: () => `<header class="page-head"><p class="eyebrow">The brotherhood</p><h2>Members</h2><p>Find and connect with men in the Alliance community.</p></header><section class="page"><input class="search" id="member-search" type="search" placeholder="Search members" aria-label="Search members"><div class="list" id="member-list">${memberCards(members)}</div></section>`,
  give: () => `<header class="page-head"><p class="eyebrow">Fuel the mission</p><h2>Give</h2><p>Your generosity equips men, families, and service projects across our community.</p></header><section class="page"><div class="card verse"><p class="eyebrow">One-time gift</p><h2 id="gift-total">$50</h2><p>Secure giving prototype</p></div><div class="amounts">${[25,50,100,250,500,'Other'].map(v => `<button class="amount ${v===50?'selected':''}" data-amount="${v}">${typeof v === 'number' ? '$'+v : v}</button>`).join('')}</div><button class="btn full" id="give-button">Continue to give</button></section>`,
  about: () => `<header class="page-head"><p class="eyebrow">Who we are</p><h2>About</h2></header><section class="page"><img class="about-mark" src="assets/ministry-mark.png" alt="Alliance Men"><p class="copy">Alliance Men exists to help men follow Jesus with courage, honesty, and purpose. We gather around tables, serve our neighbors, and build relationships that go beyond Sunday.</p><div class="stat-grid"><div class="card stat"><strong>120+</strong><span class="meta">Men connected</span></div><div class="card stat"><strong>24</strong><span class="meta">Service projects</span></div></div><button class="btn secondary full" id="contact-button">Contact the team</button></section>`
};
function memberCards(list) { return list.map(m => `<article class="card member"><div class="initials">${m[0]}</div><div><h3>${m[1]}</h3><p class="meta">${m[2]}</p></div></article>`).join(''); }
function go(tab) {
  app.innerHTML = views[tab]();
  document.querySelectorAll('.tab').forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
  window.scrollTo({ top: 0 });
}
function toast(message) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; document.body.append(el); setTimeout(() => el.remove(), 2200); }
document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]'); if (tab) return go(tab.dataset.tab);
  const event = e.target.closest('[data-rsvp]'); if (event) return toast(`Details opened for ${events[event.dataset.rsvp].title}`);
  const amount = e.target.closest('[data-amount]'); if (amount) { document.querySelectorAll('.amount').forEach(x => x.classList.remove('selected')); amount.classList.add('selected'); document.querySelector('#gift-total').textContent = amount.dataset.amount === 'Other' ? 'Custom gift' : `$${amount.dataset.amount}`; }
  if (e.target.id === 'give-button') toast('Giving flow ready to connect');
  if (e.target.id === 'contact-button') toast('Contact form coming next');
});
document.addEventListener('input', e => { if (e.target.id === 'member-search') { const q = e.target.value.toLowerCase(); document.querySelector('#member-list').innerHTML = memberCards(members.filter(m => m.join(' ').toLowerCase().includes(q))); } });
go('home');
