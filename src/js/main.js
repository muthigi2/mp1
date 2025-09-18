/* Your JS here. */
/* ========= Navbar shrink on scroll.. handled in SCSS usin .shrink ========= */
const nav = document.querySelector('.site-nav');
const shrinkOnScroll = () => nav.classList.toggle('shrink', window.scrollY > 0);
document.addEventListener('scroll', shrinkOnScroll, { passive: true });
shrinkOnScroll();

/* ========= Scrollspy (position indicator for navbar) ========= */
const links = Array.from(document.querySelectorAll('.site-nav .nav-links a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const setActive = (id) => {
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
};
const navH = () => nav.getBoundingClientRect().height;
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: `-${navH() + 1}px 0px -70% 0px`, threshold: 0 });

sections.forEach(s => s && io.observe(s));

// ensure last link highlights at absolute bottom
window.addEventListener('scroll', () => {
  const atBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
  if (atBottom && sections.at(-1)) setActive(sections.at(-1).id);
}, { passive: true });

/* ========= Carousel ========= */
const track = document.querySelector('.carousel .track');
const slides = track ? Array.from(track.children) : [];
let idx = 0;
const show = (n) => {
  if (!track) return;
  const len = slides.length;
  idx = (n + len) % len;
  track.style.transform = `translateX(-${idx * 100}%)`;
};
const prevBtn = document.querySelector('.carousel .prev');
const nextBtn = document.querySelector('.carousel .next');
prevBtn && (prevBtn.onclick = () => show(idx - 1));
nextBtn && (nextBtn.onclick = () => show(idx + 1));

/* ========= Modal ========= */
const modal = document.querySelector('#experience .modal');
const closeBtn = modal ? modal.querySelector('.close') : null;
const modalBody = modal ? modal.querySelector('.modal-body') : null;
const modalTitle = modal ? modal.querySelector('#modalTitle') : null;

const openModal = () => { modal && (modal.classList.add('open'), document.body.style.overflow = 'hidden'); };
const closeModal = () => { modal && (modal.classList.remove('open'), document.body.style.overflow = ''); };

closeBtn && closeBtn.addEventListener('click', closeModal);
modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal(); });

// Company content.. I have a lot of work experience.
const expContent = {
  'salesforce-intern-2025': {
    title: 'Salesforce — Software Engineering Intern (Jun 2025 – Aug 2025)',
    bullets: [
      'Designed production-grade Elasticsearch cluster on Kubernetes using StatefulSets and Helm; replaced AWS OpenSearch as Temporal visibility backend.',
      'Built modular CI/CD pipeline using Falcon and Strata to orchestrate master, data, and coordinator nodes across environments.',
      'Integrated secure config via Vault; implemented service discovery using headless services and LoadBalancer endpoints.'
    ]
  },
  'salesforce-se-2023': {
    title: 'Salesforce — Software Engineer (Oct 2023 – Jan 2025)',
    bullets: [
      'Built real-time Kafka publishers to process user insights and push events downstream with retry and dead-letter queues.',
      'Delivered "Find Past Collaborators" Copilot features end-to-end to surface coworker interactions with contacts.',
      'Developed AI Agents powered by an Invocable Action Framework to enable Sales reps within Sales Cloud.'
    ]
  },
  'goldman-2022': {
    title: 'Goldman Sachs — Summer Analyst (May 2022 – Jul 2022)',
    bullets: [
      'Profiled and optimized Java Aggregator pipelines ingesting logs into BigQuery; reduced latency by ~15–20%.',
      'Bottleneck analysis and Kubernetes resource optimizations for cost/performance balance.'
    ]
  },
  'instadapp-2022': {
    title: 'Instadapp — Blockchain Developer Intern (Feb 2022 – Mar 2022)',
    bullets: [
      'Created middleware to interact with Uniswap and fetch DeFi data for dashboards.',
      'Built subgraphs with The Graph to query Instadapp Smart Accounts across networks using JavaScript and GraphQL.'
    ]
  }
};

const renderExp = (key) => {
  const data = expContent[key];
  modalTitle.textContent = 'Experience';
  const items = data.bullets.map(b => `<li>${b}</li>`).join('');
  modalBody.innerHTML = `<h4>${data.title}</h4><ul>${items}</ul>`;
};

// Modal should be opened when an experience card is clicked.. also.. add the experience content to the modal first.  
document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('click', () => {
    renderExp(card.dataset.company);
    openModal();
  });
});

