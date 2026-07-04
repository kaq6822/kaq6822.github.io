// ==========================================================
// 강범준 포트폴리오 — 공용 스크립트
// (모든 동작은 꾸밈 용도이며, JS 없이도 콘텐츠 열람에 지장 없음)
// ==========================================================

// ---------- 모바일 내비게이션 ----------
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.getElementById('nav-menu');
// 드로어가 열렸을 때 키보드 포커스가 배경으로 새어 들어가지 않도록 inert 처리할 영역
const backgroundRegions = document.querySelectorAll('main, footer');

function setNavOpen(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    navPanel.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    // 모바일 드로어일 때만 배경을 비활성화 (데스크톱은 드로어가 아니므로 제외)
    const isDrawer = window.matchMedia('(max-width: 768px)').matches;
    backgroundRegions.forEach(region => {
        region.inert = open && isDrawer;
    });
}

if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
        setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // 메뉴 항목 선택 시 닫기
    navPanel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setNavOpen(false));
    });

    // Escape 키로 닫기
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navPanel.classList.contains('open')) {
            setNavOpen(false);
            navToggle.focus();
        }
    });
}

// ---------- 헤더: 스크롤 방향에 따라 숨김/표시 ----------
const header = document.getElementById('site-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    header.classList.toggle('header-scrolled', currentY > 10);

    // 모바일 메뉴가 열려 있으면 헤더 상태 변경 안 함
    if (!document.body.classList.contains('nav-open')) {
        const scrollingDown = currentY > lastScrollY && currentY > 120;
        header.classList.toggle('header-hidden', scrollingDown);
    }
    lastScrollY = currentY;
}, { passive: true });

// ---------- 내비게이션 스크롤 스파이 ----------
const spySections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });

spySections.forEach(section => spyObserver.observe(section));

// ---------- 스크롤 등장 애니메이션 ----------
// JS로 .reveal을 부여하므로 JS 비활성 환경에서는 모든 콘텐츠가 그대로 보인다.
const revealTargets = document.querySelectorAll(
    '.section-heading, .about-grid, .skill-card, .featured-project, .other-card, ' +
    '.contact-label, .contact-title, .contact-description, .contact-section .btn'
);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
        revealObserver.observe(el);
    });
}

// ---------- 푸터 연도 자동 갱신 ----------
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
