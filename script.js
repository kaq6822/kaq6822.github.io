// ==========================================================
// 강범준 포트폴리오 — 공용 스크립트
// (JS 없이도 콘텐츠 열람과 내비게이션에 지장 없음)
// ==========================================================

// ---------- 푸터 연도 자동 갱신 ----------
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ---------- 좌측 목차: 현재 보고 있는 섹션 강조 (JS 없으면 일반 앵커 링크로 동작) ----------
const tocLinks = [...document.querySelectorAll('.toc a')];
const tocTargets = tocLinks
    .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter(item => item.section);

if (tocTargets.length) {
    // 목차 클릭으로 이동한 경우, 더 스크롤할 수 없는 하단 섹션이어도 고른 섹션을 강조
    let clicked = null;

    const updateToc = () => {
        const doc = document.documentElement;
        const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
        const threshold = window.innerHeight * 0.35;

        // 화면 상단 35% 지점을 지난 마지막 섹션이 현재 섹션. 페이지 끝이면 마지막 섹션.
        let current = null;
        if (atBottom) {
            // 페이지 끝에서는 목차로 직접 고른 섹션을 우선하고, 없으면 마지막 섹션
            current = clicked || tocTargets[tocTargets.length - 1];
        } else {
            tocTargets.forEach(item => {
                if (item.section.getBoundingClientRect().top <= threshold) current = item;
            });
        }

        tocTargets.forEach(({ link }) => {
            if (current && link === current.link) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    };

    tocTargets.forEach(item => {
        item.link.addEventListener('click', () => { clicked = item; });
    });
    ['wheel', 'touchstart', 'keydown'].forEach(type => {
        window.addEventListener(type, () => { clicked = null; }, { passive: true });
    });

    // 섹션이 8개뿐이라 스크롤마다 직접 계산해도 부담이 없다
    window.addEventListener('scroll', updateToc, { passive: true });
    window.addEventListener('resize', updateToc);
    updateToc();
}
