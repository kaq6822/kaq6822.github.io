# AGENTS.md

이 저장소에서 작업하는 모든 AI 에이전트와 개발자를 위한 공통 가이드입니다.

## 프로젝트 개요

개인 프로필 및 포트폴리오를 위한 GitHub Pages 사이트입니다. `main` 브랜치에 푸시하면 `https://kaq6822.github.io`로 자동 배포됩니다.

- 빌드 도구, 프레임워크, 패키지 매니저 없음 — 순수 HTML / CSS / JavaScript로만 구성합니다.
- 로컬 확인은 브라우저로 HTML 파일을 직접 열거나 `python3 -m http.server` 같은 정적 서버로 수행합니다.

## 디렉터리 구조

```
index.html          # 단일 페이지 포트폴리오 (히어로 / 소개 / 기술 / 프로젝트 / 연락처)
style.css           # 전역 스타일 (다크 네이비 테마, CSS 변수 기반)
script.js           # 공용 스크립트 (모바일 내비, 스크롤 스파이, 등장 애니메이션)
images/             # 자체 호스팅 이미지 (프로필 사진 등)
app-ads.txt         # Google AdSense 설정 파일 — 임의로 수정/삭제 금지
blog/index.html     # 기술 블로그 글 목록
blog/posts/         # 발행 글 (<slug>.html, 영문 케밥케이스)
_templates/         # 새 글·목록 항목 템플릿 — 배포 제외 (아래 '기술 블로그' 참조)
robots.txt          # 크롤링 규칙 (_templates/ 차단)
```

- 프로젝트 카드는 별도 상세 페이지 없이 GitHub 저장소로 직접 링크합니다.
- 디자인 토큰(색상, 폰트, 간격)은 `style.css` 상단의 `:root` CSS 변수로 관리합니다. 색상을 직접 하드코딩하지 말고 변수를 사용합니다.

## 핵심 규칙

### 정적 페이지 원칙
- GitHub Pages로 배포되므로 **모든 페이지는 정적 파일**이어야 합니다. 서버 사이드 코드(Node.js, PHP 등), 빌드 단계가 필요한 프레임워크(React, Vue 등)를 도입하지 않습니다.
- 외부 리소스(CDN 스크립트, 웹폰트 등)는 꼭 필요한 경우에만 사용하고, 가능하면 저장소 내 파일로 자체 포함합니다.
- 섹션 이동은 페이지 내 앵커(예: `href="#projects"`)로, 리소스 경로는 **상대 경로**(예: `href="style.css"`)를 사용합니다. 외부 프로젝트는 GitHub 저장소로 직접 링크합니다.

### 언어
- 사용자에게 보이는 **모든 문서와 페이지 콘텐츠는 한국어**로 작성합니다.
- 코드 식별자(클래스명, 변수명, id)와 기술 용어(예: Frontend, GitHub)는 영문 원형을 유지합니다.
- `<html lang="ko">` 속성을 모든 페이지에 유지합니다.

### 메타데이터 및 SEO
새 HTML 페이지를 만들거나 기존 페이지를 수정할 때 `<head>`에 다음을 포함합니다.

- 기본 메타: `charset="UTF-8"`, `viewport`, `<title>`, `<meta name="description">`
- **Open Graph 메타데이터**: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`(`ko_KR`)
- Twitter Card 메타데이터: `twitter:card`, `twitter:title`, `twitter:description`
- 검색 엔진을 위한 `<link rel="canonical">`

### 스타일 및 스크립트
- 모든 스타일은 `style.css`에 작성하고 디자인 토큰은 `:root` CSS 변수로 관리합니다. 인라인 스타일은 지양합니다(단, JS 비활성 대응용 `<noscript>` 스타일은 예외).
- 헤더(내비게이션)와 푸터 구조는 일관되게 유지합니다.
- 반응형 디자인을 유지합니다. 스타일 변경 시 모바일 뷰포트(최소 320px)에서도 확인합니다.
- JavaScript는 꾸밈(모바일 드로어, 스크롤 스파이, 등장 애니메이션) 용도로만 사용하고, JS가 비활성화되어도 콘텐츠 열람과 내비게이션에 문제가 없어야 합니다(`<noscript>` 폴백 유지).

### 콘텐츠
- `[Your Name]`, `your-email@example.com` 같은 플레이스홀더는 실제 값이 확정되기 전까지 임의의 실제처럼 보이는 값으로 채우지 않습니다.
- 개인정보(전화번호, 상세 주소 등)는 공개 저장소에 커밋하지 않습니다.

## 기술 블로그

### 구조
- `blog/index.html` — 글 목록 페이지. 새 글은 목록(`.blog-list`) 최상단에 추가합니다.
- `blog/posts/<slug>.html` — 발행 글. slug는 영문 케밥케이스(예: `go-oom-debugging`)를 사용합니다.
- `_templates/blog-post.html`(새 글 페이지 템플릿), `_templates/blog-list-item.html`(목록 항목 스니펫)
- `images/blog/` — 글에 사용하는 이미지

### 배포 가드 (중요)
- GitHub Pages는 `.nojekyll` 파일이 없으면 Jekyll 기본 빌드를 거치며, 이때 `_`로 시작하는 파일·디렉터리는 배포에서 제외됩니다. `_templates/`가 공개되지 않는 것은 이 동작에 의존하므로 **`.nojekyll` 파일을 절대 추가하지 않습니다.**
- 이중 방어로 `robots.txt`가 `/_templates/`를 차단합니다. 이 규칙을 삭제하지 않습니다.
- 템플릿의 `{{TOKEN}}` 플레이스홀더는 실제처럼 보이는 값으로 채워두지 않습니다. 템플릿은 사이트 어느 페이지에서도 링크하지 않습니다.
- **Liquid 파싱 주의:** Jekyll은 배포 대상인 `.md`/`.html`을 Liquid로 렌더링하며, 리터럴 `{{`는 변수 태그로 해석되어 빌드를 깨뜨릴 수 있습니다. 따라서 (1) 발행 대상 파일(`blog/**`, `index.html` 등) 본문에는 `{{`를 두지 않고, (2) `{{TOKEN}}` 예시를 담은 저장소 문서(AGENTS.md 등)는 `_config.yml`의 `exclude`로 빌드에서 제외합니다. `_templates/`의 토큰은 언더스코어 규칙으로 애초에 빌드되지 않으므로 안전합니다.
- 저장소 문서를 새로 추가할 때 본문에 `{{`가 들어간다면 `_config.yml`의 `exclude` 목록에 파일명을 추가합니다.

### 새 글 발행 절차
1. `_templates/blog-post.html`을 `blog/posts/<slug>.html`로 복사합니다.
2. `{{TITLE}}`, `{{DESCRIPTION}}`, `{{SLUG}}`, `{{PUBLISHED_DATE}}`(YYYY-MM-DD), `{{LABEL}}` 토큰을 전부 실제 값으로 치환하고 본문을 작성합니다.
3. 메타데이터를 확인합니다: title, description, canonical, `og:type="article"` + `article:published_time`, Twitter Card.
4. `_templates/blog-list-item.html` 스니펫으로 `blog/index.html` 목록 최상단에 항목을 추가합니다(`.blog-empty` 안내 문구가 남아 있으면 제거).
5. `feed.xml`이 존재하면 RSS 항목을 추가합니다.
6. 발행 전 검증
   - `grep -rn "{{" blog/` 결과가 비어 있어야 합니다(토큰 잔존 = 발행 금지).
   - 브라우저에서 데스크톱·모바일(320px) 렌더링을 확인합니다.
   - 글 ↔ 목록 ↔ 메인 페이지 간 링크 동작을 확인합니다.

### 글 작성 원칙
- 기본 포맷: 문제 → 선택지 → 결정 근거 → 결과(+아쉬운 점). 글 성격에 따라 조정할 수 있습니다.
- 글마다 실측 수치를 1개 이상 포함하고, 근사치는 "약"으로 표기합니다.
- 발행 후 관련 포트폴리오 프로젝트 서술에 글 링크를 상호 연결합니다.
- 블로그 하위 페이지의 헤더 내비게이션은 `../index.html#about` 형태의 경로 포함 링크를 사용합니다(메인 페이지의 앵커 전용 링크와 다릅니다).

## 작업 확인

변경 후 다음을 확인합니다.

1. 수정한 페이지를 브라우저에서 열어 데스크톱·모바일 모두 레이아웃이 깨지지 않는지 확인
2. 내비게이션 앵커 이동과 프로젝트 GitHub 외부 링크가 정상 동작하는지 확인
3. 새로 추가한 페이지에 메타데이터(Open Graph 포함)가 빠짐없이 들어갔는지 확인

## 커밋

- 커밋 메시지는 한국어 명령문으로 작성합니다 (예: `연락처 섹션 추가`, `모바일 내비게이션 수정`).
- `main` 브랜치 푸시는 곧 실제 배포이므로, 푸시 전 반드시 로컬에서 확인을 마칩니다.
