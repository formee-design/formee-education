# Formee Hub 작업 메모

formeeeducation.com을 Formee 허브로 바꾸는 랜딩 시안. 여러 사업을 한곳에 모으고 각 제품 랜딩(예: Pulse 랜딩)으로 연결한다.
아직 팀 공개 전 개인 작업.

## 어느 컴퓨터, 어느 Claude 계정에서든 이어서 작업하기 (2026-11-26)
- **Git (2026-11-26부터 여기가 원본):** `formee-design/formee-education` 저장소 `main` 브랜치의 `prototypes/formee-hub/` 폴더. 푸시하면 바로 아래 링크에 반영됨(1~2분).
  - 보기 링크: https://formee-design.github.io/formee-education/prototypes/formee-hub/ (v3-store.html로 이동)
  - 사이트 첫 화면(저장소 루트 `index.html`)에는 이 폴더 링크를 **추가하지 않음**. 링크를 아는 사람만 보게.
  - 처음: `git clone git@github.com:formee-design/formee-education.git` 후 `prototypes/formee-hub/`에서 작업. 시작 전 `git pull --rebase`, 끝나면 이 폴더만 커밋 + 푸시
  - 예전 위치(OneDrive `Formee.com Website/Prototypes/Formee hub (Yejin)/`, `formee-hub` 브랜치)는 2026-11-26 기준 사본. 더 이상 수정하지 않음
- **로컬 미리보기:** 이 폴더에서 `python3 -m http.server 8760` 후 http://localhost:8760/v3-store.html (HTML 더블클릭이나 OneDrive 웹 미리보기로는 JS가 안 돌아 깨질 수 있음)
- **작업 규칙 (사용자 선호):**
  - 채팅은 한국어. 코드/카피는 영어
  - em dash(—), en dash(–) 절대 쓰지 않기. `-` `:` `·` 사용
  - 색, 여백, 타이포는 `assets/tokens.css` 토큰만. 중간값은 color-mix
  - 아이콘은 전부 Lucide, `icons.js`에 인라인
  - 바뀐 내용은 이 파일 맨 아래에 날짜와 함께 한 줄씩 추가
  - 메인 시안은 v3-store.html(버전 A). 다른 사람(Jeong, Prajwal 등) 작업물은 수정하지 않기

참고 자료 (OneDrive `03 UIUX/Formee.com Website/`): `Prototypes/` 폴더의 `Formee site (Zubair, final)`은 대표님 최종 사이트(Build 3)의 HTML 복사본. 대표님 원본(기획서 PDF, 로고, 사이트 코드 3벌)은 `Formee.com Website/by Zubair/`에 있음. (마지막 업데이트 2026-11-26)

## 파일
- 두 버전: `v2-hub.html` (11/23 허브, `hub.js`) · `v3-store.html` (11/24 스토어, `store.js` + `store.css`). 둘 다 `hub.css` 공유
- `assets/` 워드마크, 소셜 아이콘, `tokens.css` (FME 디자인 토큰 복사본. 원본은 FME_AI Social Media/tokens/tokens.css, 바뀌면 다시 복사)
- Pulse 링크는 공개 사이트 주소(formee-design.github.io/.../pulse-landing)를 씀
- 사업/제품 카피와 일러스트는 `hub.js` 상단 `BUSINESSES` 배열과 `SCENES`에서 한 번에 수정
- 랜딩용 큰 사이즈 값(토큰에 없는 것)은 `hub.css` 상단 `--hub-*` 변수에 모아둠. `tokens.css`로 옮길지 미정
- 색상은 전부 `tokens/tokens.css` 토큰 사용

## 확정된 구조 (위에서 아래로)
- **헤더:** FORMEE 워드마크(Figma 1063:113465, currentColor로 히어로 위 흰색 / 스크롤 후 진한색) · 메뉴 About Formee · Businesses ▾(메가메뉴) · FAQ · Contact · 스크롤하면 반투명 블러 바
- **히어로:** 채도 낮춘 블루→핑크 그라디언트, 흰색 헤드라인 "Building AI for what comes next." + "One team. Many industries. More possibilities.", 사업 카드 6장 coverflow 자동 회전. CTA 버튼 없음
- **제품 이름 마키:** 그라디언트 끝나는 지점에 배치, 텍스트만 (네모 아이콘 X)
- **About:** 단어가 채워지는 문장 + 숫자 카운트업
- **Businesses:** 왼쪽 01~06 고정 목록(숫자는 DM Sans), 비주얼 안에 세그먼트 칩 + 선택한 제품만 보여줌(왼쪽 설명, 오른쪽 UI 일러스트). 제품 2개 이상인 사업은 스크롤로 제품 전환. 아래는 카테고리 제목/설명 + 링크 있는 제품만 Learn more 버튼
- **FAQ:** "Frequent Questions and Answers" 가운데 정렬 아코디언 (이전 사이트 문구 6개 그대로)
- **Contact:** 가운데 정렬 폼 (Name, Phone, Email, Subject, Enquiry). 시안이라 실제 전송 안 함
- **푸터:** Pulse 스타일, 이메일 + 소셜 아이콘

## 스타일 원칙
- 폰트 DM Sans, 버튼 크기는 Pulse 랜딩과 동일 (38 / 46 / 64)
- 웹(1440) 우선. 모바일은 나중에
- 하지 말 것: 다크 히어로 + 얇은 회전 빛줄기, CSS 3D 아이콘 타일, 원형 라인 배치, mono 폰트 숫자/라벨, 상단 스크롤 프로그레스 바

## 사업 / 제품 (데이터 기반이라 추가 쉬움)
1. Education: Course Design · Marking & Grading Tool · Learning Management System (LMS) · Student Management System (SMS)
2. Real Estate: Plotara
3. Social Media: Pulse (Live, Pulse 랜딩 링크) · Blue Gen
4. Finance: HR Module · CrewOS
5. AI Oversight (가칭): Watchdog
6. Security / Safety: Iceman · Steelman · Sportman

## 남은 일 / 확인 필요
- 카피 대부분 초안. Iceman, Steelman, Sportman은 설명과 일러스트 모두 추측
- 일러스트 속 이름, 숫자는 연출용 가짜 데이터
- FAQ를 허브용 문구로 교체
- 허브용 이메일 확인 (지금은 contact@formeeeducation.com)
- Finance 분류명, AI Oversight 이름 확정
- 앞으로: 모바일, 제품별 상세 페이지, 휴머노이드 로봇 사업 추가 가능성

## 레퍼런스
- Figma `mbVD7hkDkQGb0wU8NsmOKX` (FME_AI-Social-Media_For-Design-Team): 히어로 레퍼런스 1055:89386(Hexa) 등, 이전 Formee Education 사이트 1055:111860
- Pulse 랜딩: `prototypes/ai-social-media/pulse-landing/`

## 미리보기 팁
- 이 OneDrive 폴더는 로컬 미리보기 서버(python http.server)가 직접 못 읽는 경우가 있음. 그럴 땐 이 폴더를 임시 폴더로 복사해서 서빙
- 가장 간단한 방법: `v2-hub.html` 또는 `v3-store.html`을 크롬에 바로 끌어다 놓기
- 수정 후 예전 화면이 보이면 Cmd+Shift+R

## v3 스토어 버전 (2026-11-24): `v3-store.html` + `store.css` + `store.js`
- 어제 허브 디자인(`v2-hub.html`, 그대로 보존)에 대표님 사이트(`by Zubair/formee-ai-site 2`, HTML 복사본은 `Prototypes/Formee site (Zubair, final)`) 내용을 합친 버전. `hub.css`를 같이 쓰고 추가 스타일만 `store.css`에 있음
- 대표님 방향: 툴 판매 스토어. 8개 산업(HR, Education, Security, Childcare, Health, Real Estate, Sports, Sales and Marketing) / 툴 15개 + Pulse(Sales and Marketing, 자체 랜딩으로 링크) = 16개
- 헤더: Industries ▾ · Pricing · About Formee · FAQ + 오른쪽 Log in · Start free. 히어로 "AI tools for every industry." (히어로 CTA 버튼은 없음, 헤더에 Start free)
- 섹션: 히어로(산업 카드 레일) → 툴 마키 → Why Formee → 산업별 툴(칩 + UI 일러스트, View tool / Request a demo) → Safe AI by design + 3단계 → Pricing(월/연 토글, 대표님 사이트 가격 그대로, 미확정) → FAQ(대표님 문구) → Request a demo 폼(산업/툴 선택) → 푸터
- View tool, Explore 산업, Log in, 결제 버튼은 아직 페이지가 없어서 누르면 "coming soon" 토스트
- 금요일 목표: 메인 + Industries > HR 페이지 + HR Module 상세 페이지 (HR Module은 대표님 정리 문서 참고 예정)
- 로고 후보: 대표님 시안 Concept 01, 04, 07 (`Formee.com Website/by Zubair/logos/`), 레이아웃에서 테스트 예정

## v3 멀티 페이지 (2026-11-24 오후)
- 대표님 사이트에 있던 페이지를 v3에 추가: `industries.html`, `industry.html?id=hr`, `products.html`, `tool.html?id=hr-module`, `pricing.html`, `about.html`, `contact.html`
- 파일 구조: `data.js` (산업·툴·가격·FAQ, 대표님 catalogue/pricing.json 기반) · `scenes.js` (툴별 UI 일러스트) · `site.js` (헤더, Industries/Products 메가메뉴, 푸터, 데모 폼, 공통 동작) · `store.js` (홈) · `pages.js` (나머지 페이지)
- 헤더: Industries ▾ · Products ▾ · Pricing · About · Contact + Log in · Start free (Log in과 결제 버튼은 아직 토스트)
- 홈에 대표님 섹션 추가: Too many tools 문제 카드 3개 + Formee brings it together, Start with your industry (산업 카드 8개). Every tool, by industry는 기존 왼쪽 고정 + 오른쪽 스크롤 전환 구조 그대로
- 가격은 대표님 pricing.json 그대로 (미확정, 다듬을 예정)

- 헤더 v3.1: 로고 96px, 메뉴를 로고 옆으로(대표님 사이트 배치), 메뉴 15px, 버튼 38px
- 주의: 대표님 사이트와 문서는 전부 AI로 만든 것이라 문구·기능·가격을 하나씩 확인해야 함. 그대로 따라 그리지 말 것
- Request a demo는 데모 운영 인력이 없어서 Contact us로 교체(11/24). 메뉴 맨 끝 Contact, 폼은 contact.html과 홈 #contact. 대표님께 설명 필요
- Start free 버튼(흰 배경) 글자색 neutral/900
- 열린 질문: 히어로에 CTA 버튼을 다시 넣을지 (추천: Start free + Explore the tools)
- 아이콘은 전부 Lucide (https://lucide.dev/icons). `icons.js`에 필요한 아이콘만 인라인으로 넣어 씀(오프라인/더블클릭에서도 보이게). 새 아이콘이 필요하면 lucide-static 0.469.0의 SVG 안쪽을 ICONS에 추가. 정적 HTML에서는 `data-icon="이름"`으로 넣음
- 문의 폼에 개인정보 동의 체크박스(필수) 추가
- 홈 외 페이지(page-light): 상단 진한 그라디언트 없이 밝은 배경, 헤더 글자 neutral/900, Start free는 진한 버튼. 하단 CTA 박스 그라디언트는 유지
- Industries 메가메뉴: 레퍼런스(Sierra 스타일)처럼 3열 아이콘 행. 아이콘은 neutral/800 한 색, 연회색 사각형(neutral/100). 대표님 알록달록 컬러칩 쓰지 않음. 하단: All eight industries / Not sure where to start? Contact us
- Products 메가메뉴도 산업 이름 앞에 같은 아이콘 타일(36px, neutral/800 on neutral/100)
- 홈 중복 정리(B안): Start with your industry(산업 카드 8개) 섹션 삭제. 홈은 히어로 → 마키 → Why Formee → Every tool, by industry → Safe AI → Pricing → FAQ → Contact
- Pulse 옆 Own site 배지 전부 삭제(태그는 In design만 남음)
- 홈 Safe AI 섹션 배경 neutral/50, 카드는 흰색. 3단계 숫자 원은 그라디언트 없이 neutral/900
- Safe AI 카드: 흰 배경에 아주 약한 블루(우상단)·핑크(좌하단) 그라디언트
- 홈 하단 문의 폼 삭제. 대신 화면 폭 전체 그라디언트 CTA 띠(Find the right tools for your team. + Start free · Contact us). 문의 폼은 contact.html 한 곳에만
- 페이지 상단의 이름 칩(About, Industries, HR 등)과 툴 페이지 약어 칩(LMS 등) 삭제. 상태 표시(In design)만 유지

- Products 메가메뉴 하단: "16 AI tools, grouped by industry" 문구 삭제, "All 16 tools →"를 Industries 메뉴의 "All eight industries →"와 같은 왼쪽 위치·크기로 맞춤.
- About 페이지 숨김: 상단 메뉴·모바일 메뉴·푸터 Company에서 About 링크 제거 (about.html 파일과 R.about는 나중을 위해 남겨둠).
- Security 산업 아이콘 shield → shield-check (Lucide).
- 상단 메가메뉴(Industries/Products): 전체 폭 시트 → 헤더 아래 8px 띄운 박스 카드(최대 1200px 가운데, radius 2xl, 보더+popover 그림자). Decagon 레퍼런스.
- Pricing·Contact는 단일 페이지라 브레드크럼(Home › …) 삭제.
- Contact 페이지: 좌(제목·설명·안내 3개: Not sure which tool fits? / Missing your industry? / Prefer email?) + 우(폼 카드, 상단 "Send a message") 2단 구조. 960px 이하에서 1단. Request a demo 문구는 넣지 않음.
- Contact 제목·설명 위치를 Pricing과 동일하게 맞춤(제목 top 136, 설명 top 223 @1440). 제목을 한 줄이 되도록 "Contact Formee."로 변경.
- privacy.html 추가 (R.privacy): 대표님 사이트 privacy/index.html 본문 그대로 옮김(법률 검토 전 초안 안내·[대괄호] 빈칸 포함). 브레드크럼 없음, 제목 위치 Pricing·Contact와 동일. 푸터 Privacy와 Contact 폼 "privacy notice"(새 탭) 연결.
- terms.html 추가 (R.terms): 대표님 사이트 terms/index.html 본문 그대로(초안 안내 포함). 푸터 Terms of Use 연결.
- Contact 배경: 그라디언트 → neutral-50 단색. 폼은 스크롤 리빌 대신 로드 시 fade-in (상단에 있어서 리빌 불필요).
- Pricing 히어로: 제목·설명 가운데 정렬, 히어로 아래 여백 48px + 다음 섹션 위 여백 0으로 플랜과 간격 축소.
- 홈 섹션 재구성: 툴별 스크롤 패널(목업 화면·sticky 목차) 삭제 → ① Start with your industry (산업 타일 4×2, neutral-50 배경, 카드 전체 클릭 + 우상단 화살표, Explore 문구 없음) ② Every tool, by industry (흰 배경, 산업별 그룹: 좌 산업명 / 우 툴 줄 2열, 이름+한 줄 설명+화살표, See all tools 버튼 없음). 이미지 없음. 히어로 카드에서 산업은 빠질 예정(히어로 리디자인 때).
- 홈 다듬기: Why Formee 아이브로 삭제·문장 가운데 정렬 / Industries·Safe AI 아이브로 삭제 / Products 설명 "16 AI tools, grouped the way you work. Every tool has a demo on request." (숫자는 TOOLS 기준) / 산업 타일 호버 시 아이콘 타일 neutral-900 + 흰 아이콘 / Safe AI 카드 흰 배경, 아이콘 타일·그림자 없이 brand-primary 아이콘만 / Get started in three steps를 Pricing 다음·FAQ 앞으로 이동(#steps) / 마지막 CTA 전체 폭 → 컨테이너 안 넓은 카드.
- 헤더: 스크롤 시 글래스 바가 위아래 8px·좌우 컨테이너보다 24px 바깥으로 떠 있는 둥근(2xl) 플로팅 바. 로고·메뉴·버튼 위치는 그대로(::before 모양만 변경).
- Why Formee 아이브로 다시 추가(가운데 정렬). 산업 타일 아이콘: Pulse 배지 토큰 bg/text 쌍 (HR purple, Education blue, Security teal, Childcare yellow, Health green, Real Estate orange, Sports red, Sales pink). 호버는 neutral-900 + 흰 아이콘 유지.
- 푸터 배경 neutral-100 (전 페이지 공통), 상단 보더 제거.
- Get started in three steps 섹션 숨김(HTML 주석으로 보존). 홈 흐름: Pricing → FAQ → CTA.
- 산업/툴 섹션 레이아웃 시안(프로토타입 전용, 좌하단 Layout 스위처): ?layout=1 현재(텍스트) / ?layout=2 산업 타일 상단 사진 4:3 + 툴 목록 산업 라벨에 같은 사진 썸네일 / ?layout=3 두 섹션 합침, 산업별 카드(사진 16:7 + 이름 + 툴 목록) 2열 masonry, neutral-50 배경. 사진은 촬영 브리프가 적힌 placeholder(.photo-ph). 결정 후 스위처·안 쓰는 안 제거할 것.
- 레이아웃 Option 2 확정: 스위처·Option 3·산업 아이콘 색(배지 톤) 코드 제거. 남은 할 일: 산업 사진 8장(톤 통일 규칙 먼저) 선정 후 .photo-ph 교체.
- 산업 타일 화살표: 평소 숨김, 호버(또는 키보드 포커스) 시 왼쪽에서 밀려 나타남. 터치 기기는 항상 표시.
- 산업 타일 화살표: neutral-50 원형(32px) 배경 위에 얹음 (호버 시 나타나는 동작은 그대로).
- 배경 톤(Firmable 레퍼런스): 히어로 상단 더 진하게 + 하단 페이드 32%로 길게 / Why·Products 흰색 / Industries 연파랑→연보라 사선 그라디언트 / Safe AI 연분홍→연보라 / Pricing 왼쪽, FAQ 오른쪽 가장자리에 은은한 빛 번짐.
- 배경 밝게 재조정: Industries·Safe AI는 neutral-50 바탕에 색은 모서리/끝에만 살짝. Pricing·FAQ 빛 번짐 opacity 0.22/0.14.
- 히어로: 산업 카드 레일 삭제 → 궤도 그래픽(#heroOrbit). 로고 없이 가운데 빛나는 코어 + 퍼지는 링, 점선 타원 궤도 3개, 궤도를 도는 빛 점(SMIL), 툴 칩 10개(글래스, 클릭 시 툴 페이지). 동작 줄이기 설정 시 정지.
- 히어로 궤도 v2: 칩을 산업명 8개로(산업 페이지 링크), 칩 앞 점 삭제, 퍼지는 링 삭제 + 코어 반지름 120→260·opacity 0.45, 궤도선 opacity 42%→60%.
- Figma: 홈 1920 시안 "Formee home · 1920" (FME_AI-Social-Media_For-Design-Team, 페이지 "Formee hub website", node 1080:37). html_to_figma는 1280으로만 렌더 → Figma에서 배경 1920·콘텐츠 1280 가운데로 재배치. 색 325개 변수 연결(미연결 10: 히어로 빛 번짐 색·LinkedIn 등), 텍스트 207/229 텍스트 스타일 연결(히어로·statement 등 큰 디스플레이 크기는 대응 스타일 없음).
- 히어로 v3: 제목·설명·체크 항목을 궤도 가운데로 이동(.hero__content를 #heroOrbit 안으로 옮김). 궤도 viewBox 1200x720, 타원 키움, 코어 r330, 제목 크기 d3. 900px 이하에서는 궤도 숨기고 텍스트만.
- 히어로 v3(텍스트를 궤도 가운데) 시도 후 되돌림: 임팩트 약하고 정신없음. 히어로는 v2(텍스트 위, 궤도+산업 칩 아래) 유지.
- 히어로 v4 = Figma(1080:40) 반영: 체크 항목 숨김, 궤도 3개를 Figma 벡터에서 타원으로 피팅(중심·반지름·기울기 각각 다름), 가운데 빛 2개(r347 그라디언트 + r216 흰색), 칩: 글래스 알약(Education·Real Estate는 아이콘 포함, Real Estate는 연파랑) + 원형 아이콘 칩(HR 파랑 48, Security 진남색 64, Sports 진남색 56, Sales 청록 50). 칩 아이콘은 Figma 디자인시스템 아이콘 SVG를 그대로 사용(원색 hex 포함, Lucide 아님). 하단 흰 페이드 26%.
- 히어로 v4.1: Figma 업데이트 반영(칩 배경 더 투명, 테두리 50%, 그림자 0 4 8 8% + 0 2 4 5%, Education·HR 위치 조정). 하단 흰 페이드를 둥근 그릇 모양(radial ellipse, 위쪽 중심)으로 변경.
- 칩 배경 흐림이 히어로 배경까지 적용되도록 .hero-orbit fade-in을 backwards로(끝난 뒤 애니메이션 효과 해제). 알약 칩 글자 Medium.
- 히어로: 가운데 원 Figma 값(큰 원 r360.5 blur50, 작은 원 r231 흰색 방사형 blur18). 둥근 흰 페이드를 .hero::after(z1)로 옮겨 궤도·빛 위, 칩(z2) 아래에 오게 함(Figma 레이어 순서).
- 궤도 빛 점 속도 약 1.6배 느리게(한 바퀴 74/62/48초).
- 히어로 제목 위 여백 Figma처럼 넓힘(헤더 72 + 88 = 제목 top 160, Figma 158).
- 히어로 가운데 카드 시안: "Not sure which tool fits your team?" + 이메일 입력 + Contact us(→ contact.html, 이메일은 sessionStorage로 넘겨 폼 자동 입력, URL에 안 넣음) + "Or start a 14-day free trial →". 글래스 카드 z2, 궤도 중앙(50%, 54%), 폭 35%.
- 히어로 가운데: 카드 배경·제목 제거, 입력창 + Contact us + "Or start a 14-day free trial →"만 남김(Firmable 스타일).
- 궤도 그래픽 1200→1380px로 확대(칩 크기는 그대로, 선 굵기 고정), 가운데 입력창 top 54%→48%.
- 궤도 1380px 확대는 되돌림(1440 화면에서 너무 큼). 궤도 1200 유지, 입력창 top 48%는 유지.
- 가운데 입력창 top 48%→39%(약 50px 위로).
- Figma 히어로에 "Hero CTA" 추가(node 1092:9, 섹션 맨 위 레이어=흰 페이드 위): 입력창 + Contact us + 무료 체험 링크, 색·간격·radius 변수와 Text/md Regular·Medium 스타일 연결. 그림자 2개는 맞는 effect 스타일이 없어 값으로 넣음.
- 히어로 B안: v3-store-b.html (body data-hero="b"). 칩 없이 자이로스코프형 궤도(넓은 타원 2·세로 링 실선/점선·안쪽 타원 2·아래 흐린 타원) + 가운데 4각 스파클(천천히 반짝) + 빛 점 천천히 이동. 이메일+Contact us는 설명 아래로. 기본 v3-store.html(A안)은 그대로.
- 히어로 B 단순화: 궤도 3개만(넓은 타원 -6°, 기울어진 타원 28°, 점선 타원 -22°), 세로로 선 링·흐린 타원 삭제, 빛 점 5개, 스파클 고정(반짝임 없음).
- 히어로 C안: v3-store-c.html (data-hero="c"). 그래픽 없이 그라디언트 배경만, 제목·설명·이메일 입력(설명 아래), 둥근 흰 페이드 유지. 높이 clamp(720px, 88vh, 880px).
- Figma: 산업 카드 컴포넌트 "Industry card"(1096:28, 원본 컴포넌트 섹션) 생성, 텍스트 속성 Industry·Description·Tool count·Photo brief. 홈 그리드(1080:250)의 8개 카드를 인스턴스로 교체(4x2, 순서 유지).
- 히어로 C v2: 텍스트를 히어로 세로 가운데로 내림. 배경에 캔버스 도트 격자(14px) + 텍스트 뒤 가상의 원에서 바깥으로 퍼지는 물결(점 크기·밝기 변화). 원 안은 작고 어두운 점. 동작 줄이기면 정지 화면, 화면 밖/탭 숨김 시 일시정지.
- 히어로 C 도트 물결 v2: 점 더 작게(0.35~1.5), 격자 10px·완전한 원(세로 압축 제거)로 각진 느낌 줄임, 물결 간격이 바깥으로 갈수록 넓어짐(sqrt), 멀수록 옅어짐(420px 감쇠), 가운데 근처 고리 촘촘·밝게. 투명도 버킷별 한 번에 그려 성능 유지.
- 도트 물결 v3: 더 느리게(FREQ .14), 고리 수 줄임(K .22), 안쪽 고리 두껍고 부드럽게 → 바깥으로 갈수록 얇고 옅게(밴드 날카로움이 거리에 따라 증가).
- 도트 물결 전체 투명도 50%(.hero-dots opacity .5).
- Why Formee를 Figma(1080:178)에 맞춤: 섹션 상하 128px(산업 섹션도), 문장 40/48, 아이브로 16 Medium, 문제 카드 neutral-50 배경·테두리 없음, 아이콘 40px Lucide shield-alert·link-2-off·chart-scatter에 아이콘 전체 하나의 그라디언트(토큰 혼합), 제목 24 SemiBold, 카드 아래 세로선(1.6px 120px 그라디언트), "Formee brings it together." 40px Medium 그라디언트 + 아래 설명(배경 박스 제거). A·B·C 마크업 동일 반영.
- Why Formee 스토리 인터랙션: 섹션 위 여백 192px, 세로선 앞 여백 96px·선 길이 160px. 스크롤에 따라 선이 위에서 아래로 그어지고(끝에 빛나는 점), 다 그어지면 "Formee brings it together."가 블러 풀리며 떠오르고 그라디언트가 한 번 쓸고 지나감, 설명은 0.18초 뒤. 동작 줄이기면 바로 표시.
- "Formee brings it together." 위 여백 48→64px, Why 섹션 아래 여백 128→224px.
- 세로선 160→200px.
- 히어로 A 칩 8개: 로드 시 무작위 순서로 하나씩 톡톡 등장(0.7초부터 약 0.22초 간격+랜덤, 살짝 커지며 블러 풀림), 이후 둥실 움직임 이어짐. 새로고침마다 순서 바뀜.
- 칩 등장 시작을 0.7초→0.05초(첫 칩 즉시), 이후 약 0.2초 간격.
- 산업 카드 오버레이 시안: v3-store-cards.html (body data-cards="overlay"). 사진 꽉 찬 카드(5:6), 아래 45%만 파랑→보라 그라디언트, 평소엔 산업명+툴 개수만, 호버 시 설명·흰 화살표 원 등장 + 사진 살짝 확대. 아이콘 타일 없음.
- 오버레이 카드 그라디언트 채도 낮춤: neutral-800/500에 보라 약간 섞은 네이비 그레이, 투명도 72%→38%→0.
- Every tool, by industry 목록: 산업 라벨 앞 사진 썸네일 → 산업 아이콘(Lucide, 36px neutral-100 타일)으로 변경(위 산업 카드 사진과 중복 피함).
- 히어로 아래 툴 이름 마퀴 삭제(HTML 주석으로 보존, 나중에 고객사 로고 띠로 재사용 가능). 칩 등장 후 칩마다 다른 방향·거리(가로 4~9px, 위 6~11px)·속도(9~14초)로 아주 천천히 둥둥 떠다님.
- WHY FORMEE 라벨: 스크롤로 들어올 때 아래에서 24px 떠오르며 블러 풀리는 등장.
- 산업 카드 사진: Figma(1080:250) 카드 사진 8장을 크롭 그대로 2배(612x423) JPG로 assets/industries/<id>.jpg에 저장, 카드 사진 영역에 적용(비율 306:212, 호버 시 살짝 확대). 오버레이 시안 페이지도 같은 사진 사용.
- 산업 카드 순서 Figma대로: HR, Sales and Marketing, Security, Education / Health, Childcare, Real Estate, Sports (카드 그리드만, 메뉴·툴 목록 순서는 그대로). 사진 8장 재추출(Education 크롭 변경 반영).
- Every tool 목록 순서도 카드와 같게. A안에 비교용으로 "Start with your industry" 섹션 복사본(#industriesOverlay, 사진+그라디언트 오버레이 카드)을 기존 섹션 바로 아래 추가(점선 구분). 하나 고르면 나머지 삭제.
- 히어로 궤도 점선 깊이감: orbit0 100%, orbit1 55%, orbit2 30%(기존 85% 흰색 기준). 오버레이 카드 비율 5:6→1:1.
- 히어로 칩 v5(Figma 반영): Education·Real Estate 아이콘 제거(텍스트만), 칩 6개 위치 조정, 청록 칩 더 짙게, 모든 칩 테두리 그라디언트를 Figma 변환값대로(135°, 24%→76% 구간에서 진함→투명).
- 텍스트 칩 테두리: 전체 inset 링 제거(아래쪽 투명하게). 이메일 입력 줄 420px(Figma). 궤도 진하기 1 / .7 / .5.
- 산업 카드: 흰 카드 버전 확정(비교용 오버레이 섹션 삭제, v3-store-cards.html 파일은 보존). 호버 시 Figma(1093:13221)처럼 글자 영역 차분한 블루, 사진 아래 43% 블루→투명, 산업명 흰색·설명/개수 neutral-300, 화살표 원 neutral-100.
- 카드 호버 블루 v2: 더 밝은 블루(brand-primary 55% + neutral-500), 글자 영역도 opacity 레이어로 바꿔 사진 그라디언트와 같은 속도로 전환(경계 매끄럽게).
- Figma 동기화(히어로 제외): 마키 섹션 삭제, Why 간격(위 192·아래 224, 카드→선 96, 선 200, 선→together 64), 툴 리스트 사진 썸네일 → 36px neutral-100 아이콘 타일(Lucide 18px, neutral-800) + HTML 순서로 재정렬. Industry card 컴포넌트를 State=Default/Hover 세트로 만들고 Education Hover 인스턴스를 1093:13221 오른쪽에 배치(블루 #6a7eca는 토큰 없음).
- Figma 산업 카드 그리드(1080:250): 열 308 고정 ×4 + 간격 20이 컨테이너 1280을 12px 넘쳐서 열을 1fr(305)로, 행은 374 고정으로 변경.
- 히어로 C: 하단 둥근 흰색 그라디언트 페이드 제거(C만, A는 유지).
- 히어로 C: 배경 그라디언트가 흰색으로 끝나지 않고 연한 블루에서 끝나게 변경(히어로 하단이 딱 끊어지게).
- 히어로 A (2026-11-26): 배경 블러 원 위치/색을 Figma 1080:41에 맞춤(블루 왼쪽, 핑크 오른쪽 아래 10도 회전, 바이올렛 가운데), 둥근 흰색 페이드 제거. 궤도 칩은 링크가 아닌 장식 요소(클릭/선택 불가). 바깥 두 궤도 실선 + 빛이 선을 따라 지나가는 효과(7s, 9s), 안쪽은 점선 유지.
- 히어로 A 되돌림: 궤도 빛 효과 제거, 둥근 흰색 페이드 복구, 궤도 3개 모두 점선으로 복구. (배경 블러 위치/칩 장식화는 유지)
- 텍스트 칩을 Figma와 동일하게: 흰 10→6% 채움, 흰 50%→0 그라디언트 선 + 흰 90% 1px 이너 섀도, 드롭 섀도 2개, 배경 블러 10px, 글자 흰색 Text/md Medium + #293b5a 30% 글자 그림자. Real Estate 틴트 제거(Figma는 4개 동일).
- 텍스트 칩 버그 수정: 테두리용 그라디언트(border-box)가 칩 안쪽 전체에 깔려 채움이 거의 불투명해 보였음. 채움은 Figma대로 145deg 흰 10→6%만, 테두리는 ::before 마스크로 1px 링에만(흰 50%→0 그라디언트 + 흰 90% 이너 섀도 링).
- 텍스트 칩: Figma 렌더와 1:1 비교 결과 흰 90% 이너 섀도 링은 Figma에서도 보이지 않아 제거. 테두리는 왼쪽 위 흰 50% → 오른쪽 아래 투명 그라디언트만, 채움은 145deg 흰 10→6% 그라디언트.
- 산업 카드: 화살표 버튼을 산업명 옆 → 하단 툴 개수 줄 오른쪽 끝으로 이동(Figma 1108:171). 호버 때만 보이는 동작은 유지.
- 툴 섹션 비교 페이지 v3-store-tools.html (2026-11-26): Option 1 = 앱 아이콘 그리드 + 산업 필터 칩(FLIP 재배치, 호버 시 카드 떠오름·산업색 워시·View tool), Option 2 = 왼쪽 산업 목록 + 오른쪽 산업색 패널에 툴 카드(6초 자동 전환, 호버 시 정지, 진행 바). 제품 미리보기 이미지가 없어서 툴마다 Lucide 아이콘을 산업 그라디언트(c1→c2) 위에 올림. icons.js에 16개 아이콘 추가.
- 옵션 2를 스크롤형으로: 섹션이 화면에 고정(sticky)되고 스크롤 반 화면마다 다음 산업으로 전환, 진행 바가 스크롤 진행을 따라감. 산업 클릭 시 그 위치로 스크롤. 자동 전환 타이머 제거. 화면이 작으면(폭 1100 이하 또는 높이 760 이하) 고정 없이 클릭 전환.
- 비교 페이지: 옵션 1 섹션 hidden(속성만 지우면 복구), 옵션 2 eyebrow 'Option 2 ·' 제거, 옵션 2 배경 흰색, 활성 산업 아래 그라디언트 진행 바 제거.
- 옵션 2: 패널과 툴 카드에 neutral-200 1px 테두리, 툴 카드 화살표는 원 없이 neutral-500(호버 시 neutral-900).
- Figma: 새 Products 섹션(1139:9, 레이어명 Products)을 기존 Products 섹션(1080:426) 바로 아래에 추가. Education 선택 상태, 텍스트 스타일/색 변수 사용. 기존 섹션은 그대로 둠. Section 2 그래픽 레이어 정리 + 1121:13460 카드 3개 이미지 자리에 그래픽 복사본 배치.
- Safe AI 섹션을 Figma 1121:13450대로: 아이콘 카드 대신 그래픽 패널(411:320, primary-light, 24 radius) + 제목/설명. 그래픽은 Figma에서 SVG로 내보내 assets/safe-ai/(security, global, cloud).svg. 홈 페이지들만 적용(내부 페이지 trustHTML은 그대로).
- 메인 v3-store.html에도 새 Products(스크롤 탐색형) 적용, 이전 툴 목록은 hidden. Figma 기존 Products 섹션(1080:426) maxWidth 1376 제거 + 1920 FILL, 목록/행 FILL로 정리.
- Figma CTA 섹션(1080:1004): maxWidth 1376 제거, 1920 FILL, 제목/설명/버튼을 박스 가운데로(48px 왼쪽 치우침 수정, 제약 CENTER).
- Products 탐색형을 Figma 1139:9 수정본대로: 선택 산업 neutral-75 배경, 아이콘 박스 primary-light + primary-dark 아이콘(산업 공통), 기본 아이콘 neutral-500, 패널 제목 Medium -0.3px, 툴 카드 흰 단색(블러 제거), 장식 아이콘 위치 조정.
- 산업 목록 선택 상태: 행 배경 neutral-100, 아이콘 박스는 산업별 파스텔(100과 200 반반 섞음) + 진한 아이콘(HR 보라400, 세일즈 시안600, 보안 레드500, 교육 primary-light/dark, 헬스 틸600, 차일드케어 옐로600, 부동산 오렌지500, 스포츠 로즈500). 기본은 회색 유지.
- Safe AI 패널: 단색 대신 같은 블루 톤 메시 그라디언트(흰빛, blue-200, 카드별 primary-pale/purple-100/blue-100 위치만 다르게).
- 산업 목록 선택 행 그림자 제거(HTML + Figma 1139:9). Figma Safe AI 카드 3개(1121:13490/13493/13509) 배경에 HTML과 같은 블루 메시 그라디언트 반영.
- Safe AI 패널 그라디언트를 Figma 수정값대로: 1번 흰빛 없음·블루 50% 왼쪽 아래 넓게, 2번 흰빛 30%, 3번 흰빛 40%.
- Industries 페이지(industries.html) 리디자인: breadcrumb 제거(1단계 페이지), 2열 카드 = 홈 AI 사진 + 산업 파스텔 아이콘·이름·개수 + 설명 + 툴 목록(앱 아이콘, 툴별 링크) + Explore 링크. UI 목업 그림 제거. TOOL_ICON/appIcon/IND_ORDER를 site.js로 옮겨 홈과 공유.
- Industries 페이지 상단 Start free / Contact us 버튼 제거.
- Industries 페이지 상단을 Pricing과 통일: 같은 시작 높이, 가운데 정렬, 아래 여백 48 후 바로 카드.
- Industries/Pricing 상단 그라디언트 제거, 흰 배경.
- Industries/Pricing 상단 타이틀을 Figma Landing/Section Header와 동일(64/68 -2.5%, 설명 18/28, 간격 24), 위 여백 nav+96, 아래 64.
- Contact 페이지에 국가별 전화번호(Call us) 추가. UK, Malaysia는 'Number coming soon' 자리표시. Japan 번호가 +1(미국 국가번호)이라 확인 필요.
- 헤더에 Request a demo 버튼 복구(Log in · Request a demo · Start free, 대표님 사이트와 동일). demo.html 신설(대표님 데모 페이지 문구: 3단계 + 데모 폼, Job title/Country/What would you like to see 추가). Contact 왼쪽 Q&A(Prefer email? 등) 제거 → Email/Phone 정보 블록 + 'Request a demo' 링크.
- Industries 페이지: 툴 이름 앞 앱 아이콘 제거(전 산업), 'Explore <산업> →' 우측 정렬.
- Industries 툴 줄 화살표: 평소 숨김, 호버 시 표시. 외부 링크(Pulse ↗)만 항상 표시.
- Industries 카드 사진 비율 2:1 → 5:2.
- Industries 카드의 'N tools' 개수 표시 제거(툴 목록이 바로 아래 있어 중복). 홈 카드의 개수는 유지.
- Industries 페이지 전체 배경 neutral-50(흰 카드가 잘 보이게).
- Industries 카드 테두리 제거(배경 neutral-50으로 구분).
- Industries 카드 그림자: 평소 없음, 호버 시에만 popover 그림자.
- 산업 상세(industry.html) 리디자인: neutral-50 배경, Industries와 같은 가운데 정렬 헤더(64/68, 18/28), 상단 Start free/Contact us·'2 AI tools' 제거, breadcrumb는 'Industries > HR'로 짧게 가운데, 산업 사진 16:5 배너, 툴 행을 흰 카드로(버튼은 View tool만), Safe AI를 그래픽 카드(trustArtHTML, site.js로 이동)로 교체.
- 산업 상세: Safe AI 섹션 제거(홈과 중복), Explore other industries는 단독 섹션, 칩의 색 점 제거, 배경 흰색 + 툴 카드 neutral-50.
- 산업 상세 툴 행: 카드 배경 제거, 흰 바탕 + 툴마다 위쪽 1px neutral-200 구분선(Decagon 참고).
- 산업 상세: 'TOOLS' eyebrow 제거, 헤더 좌측 정렬, breadcrumb를 대문자 eyebrow 스타일(INDUSTRIES › HR)로(Decagon 참고).
- Crew OS 정보를 대표님 제안서(CrewOS_Proposal, 2026-11) 기준으로 수정: 요약/설명/하이라이트 3개(한 줄 설명으로 AI 팀 구성, 우리 규칙으로 훈련, 사람이 통제), 아이콘 network, 장면 일러스트를 교대표 → 오늘의 AI 팀 업무 피드 + 'Needs you' 예외로 교체. HR 산업 태그라인/설명도 'AI workforce' 반영. 카테고리는 HR 유지(결정 필요).
- HR 페이지 문구를 실제 문서 기준으로: HR 설명/태그라인, HR Module(HR Build README: AI 채용 스크리닝·휴가 승인·직원 기록/교대·HR 문서) 요약·설명·하이라이트 3개. LinkedIn(승인 대기)·근태(범위 미확정)는 제외.
- HR Module 일러스트를 실제 HR Staffing Portal(Prajwal 디자인) 구성 기반으로 다시 그림: 'Needs you today' 할 일 목록(아이콘·상태 칩) + 'Candidates by stage'. 산업 상세 툴 행 그림 영역 7/12 → 1/2로 축소, 모든 툴 동일.
- 산업 상세 툴 행: 'View tool' 텍스트 링크 → 'View HR Module →' 형태의 채워진 버튼.
- 산업 상세 툴 행: 하이라이트마다 아이콘(산업 파스텔 타일, data.js 하이라이트 3번째 값), View 버튼 우측 정렬.
- 툴 행 하이라이트 아이콘: neutral-100 회색 타일 + neutral-600 아이콘(산업색 없음).
- 툴 상세(tool.html) 리디자인: 흰 배경, 좌측 정렬 헤더 + 대문자 breadcrumb(INDUSTRIES › HR › HR MODULE), 제목 64/68·설명 18/28(산업 상세와 같은 시작 높이), Start free + Request a demo 유지, 'FEATURES' 라벨 제거, 특징을 회색 아이콘 타일 4열 리스트로.
- 툴 행: 설명과 하이라이트 사이 구분선 제거.
- 툴 상세 템플릿 재구성(모든 툴 공통 틀, 내용은 data.js p.page): Hero → 한 흐름(5단계) → 기능 행(글+회색 자리표시 그림, 체크 포인트) → AI → 특화(extra) → 관리·보안(control) → 가격 요약 → 툴 전용 FAQ → More for <산업> 목록 → CTA. 'How it works' 일반 단계·일반 FAQ·'One secure platform' 카드·'See X in action' 라벨 등 채우기용 삭제. HR Module 내용은 HR Tool Feature Documentation(스테이징 2026-07-10) 기반.
- 가격 구조: 툴별 prices(data.js, 없으면 공통 tiers) → 번들은 툴 가격 합의 25% 할인으로 계산. 산업 상세 'HR pricing' 표: 플랜별로 HR Module / Crew OS / HR bundle(원가 취소선) 나란히, 월·연 토글. 툴 상세 가격 요약도 툴 가격 기준.
- 툴 상세 가격: 한 줄 요약 → 산업 가격 표 재사용('HR Module pricing', 현재 툴 열 강조 + 다른 툴 + 번들 열, 월·연 토글). 번들 없는 산업은 해당 툴 단독 표.
- 툴 상세 섹션 차별화: AI = 벤토(넓은 카드 2 + 좁은 카드 2, 카드마다 UI 조각 자리), 특화(extra) = 사진 카드 3장 + 흰 아이콘 배지(사진은 툴당 3장만), 관리(control) = 좌측 제목·설명 / 우측 구분선 목록(아이콘 없음). data.js 항목 4번째 값 = 그림/사진 자리 이름, control.text 추가.
- 툴 상세: 상단 넓은 그림 띠 제거 → 좌우 2열 히어로(왼쪽 텍스트·버튼, 오른쪽 제품 프레임). 제품 그래픽 근거 있는 툴만(heroVisual: true, 지금 HR Module) 그림, 나머지 'Product preview coming soon'. AI 벤토: 산업색(c1)+회색 그라디언트 배경, HR Module은 포털 기반 UI 그래픽 4개(scenes.js hrAiScore/Email/Sessions/Assist, data 4번째 값 'scene:이름').
- 벤토: 상단 작은 아이콘 제거, HR 그래픽 4개를 형태 다양화(원형 점수+결과 알약 / 이메일 작성 창+요청 말풍선 / 배경 위 세션 타임라인 / 기울어진 이력서 문서+채팅).
- 툴 상세 v3: 그래픽은 기능 행에만(HR: 점수·승인/근태(new hrApprovals)·이메일·세션), AI 벤토는 그림 없는 아이콘 벤토(흰 아이콘 타일 + 제목·한 줄, 넓은·좁은 카드, 산업색 그라디언트), 그래픽 없는 툴은 기능을 2x2 카드로. data: features[].visual='scene:이름', ai.items=[icon, title, text].
- AI 벤토 배경: 산업색 그라디언트 제거 → neutral-50 단색.
- 툴 상세: More for <산업>을 neutral-50 카드(호버 neutral-100) + 항상 보이는 흰 원형 화살표로, FAQ는 좌측 제목 / 우측 질문 2열.
- 툴 상세 섹션 간격 확대: 섹션 위아래 96 → 그 이상(약 96px 패딩씩, 섹션 사이 ~192), 기능 행 사이 128.
- 'Hire with AI screening' 그래픽을 한 장의 AI candidate review 카드로(라벨, 지원자+Strong match, 점수 링+판단 한 줄, 확인 목록·경고 줄 강조). AI 섹션을 neutral-50 띠로, 벤토 카드는 흰색.
- 툴 상세 'In control, across your organisation' 섹션 제거(공통 틀과 HR 데이터 모두).
- 툴 상세 'More for <산업>' 위 컨테이너 폭 가로선(neutral-200).
- 툴 상세 첫 섹션(journey)을 두 형태로: type 'flow' = 번호 점을 잇는 가로선(스크롤 시 왼→오 채움) + 단계별 제품 메뉴 칩, type 'modules' = What's inside 아이콘 3열. 둘 다 없으면 섹션 숨김. HR Module은 flow(Departments / Jobs·Talent pool / Move to Staff / Approvals·Work shifts·Documents / Events).
- 툴 상세 flow: 연결선 제거(번호 점·칩만).
- 툴 상세 journey: 진한 원 제거 → 연회색 카드(neutral-50)에 작은 회색 번호(01~)·제목·설명·흰 칩. modules형도 같은 카드([title, text]).
- Crew OS 그래픽 교체(사용자 스케치 기반): 'Your AI team at work' 카드(Sunny Days, 7 agents, Reception/Accounts/HR 역할 타일 + 완료, HR에 Agent handoff, 하단 Daily summary) + 겹치는 결정 카드(Needs your decision, Fee waiver 80, Review request / Reassign). icons.js에 headset, calculator, layers 추가.
- 가격 영역 리디자인(산업·툴 공통): neutral-50 띠, 플랜(Basic/Standard/Premium) + 월/연 토글, 툴별 카드(큰 가격 + Start free trial 테두리 버튼) + 번들 카드(2px 테두리, Save 25%, 원가 취소선, 메인 버튼), 하단 Compare all plans 테두리 버튼. 툴 페이지는 해당 툴 카드 먼저·테두리 강조. 가격은 data-pm(플랜별) → data-m/a.
- 가격 띠 수정: 산업 페이지 투명 섹션 규칙보다 우선하도록 neutral-50 고정, 플랜/기간 토글 한 줄 정렬, 띠 위아래 96px.
- 산업 상세: 툴 목록(coming soon 카드)과 가격 띠 사이 96px 여백.
- 산업 상세 'Explore other industries': 칩 → 사진 캐러셀(산업 AI 사진 4:5 카드 + 반투명 블러 패널: 산업명·태그라인·Explore →, 제목 오른쪽 좌/우 화살표, scroll-snap, 끝에서 버튼 흐리게). icons.js에 arrow-left.
- HR 산업 상세 상단 배너를 사용자 제공 이미지(assets/industries/hr-banner.jpg, 1774x887)로 교체. 산업 데이터 'banner' 값이 있으면 배너 전용 이미지, 없으면 기존 산업 사진.
- 2026-11-26: HR/툴 페이지 프라이싱을 플랜 카드 3장(Basic/Standard/Premium)으로 변경. 플랜 세그먼트 삭제, 월간/연간 토글만 남김. 산업 페이지는 툴별 가격 줄 + 번들 가격 헤드라인, 툴 페이지는 그 툴 가격 헤드라인 + 번들 한 줄. Standard 추천.
- 2026-11-26: 추천 플랜 카드 테두리를 Pulse처럼 brand-primary 1px로 변경.
- 2026-11-26: Explore other industries 캐러셀 카드 축소 (한 줄 4장, 3:4, 패널 텍스트 작게).
- 2026-11-26: 프라이싱 하단: 안내 문장 왼쪽, Compare all plans 버튼 오른쪽 끝으로 이동 (산업/툴 페이지 공통).
- 2026-11-26: HR Module 기능 그래픽 v2: hrApprovals(Approvals inbox 카드 + 근무시간 대비 출근 기록 카드), hrAiEmail(Your request → Email draft, sparkle은 Write with AI 버튼에만).
- 2026-11-26: HR 산업 페이지 'More tools coming soon' 카드 삭제. Training and events 그래픽 v2 (AI-suggested plan 카드 + 진한 Summary document 카드).
- 2026-11-26: Safe AI 1번 그래픽(assets/safe-ai/security.svg) 무한 루프 애니메이션 (SVG 안 <style>, 6.5초 반복, <img>로 넣어도 동작, 동작 줄이기 설정 시 정지 화면). 등장: 앞 흰 카드가 아래에서 올라옴(완전히 사라지지 않음, 최저 opacity .6) + 목록 줄은 카드와 한 그룹이라 등장 약 1프레임 뒤부터 채워짐 → 뒤 카드(처음엔 안 보임)가 앞 카드가 다 올라온 뒤 밑에서 올라옴(1.0s) → 방패(체크 붙은 채)가 떠오름(1.6s). 유지 후 퇴장은 등장의 정확한 역순 + 반대 이징(방패 4.0s → 뒤 카드 → 줄은 나중에 나온 것부터 접힘 → 앞 카드 내려감). viewBox를 위아래 40씩 넓히고 아래쪽 그라디언트 마스크로 카드 하단이 잘리지 않고 흐려지게.
- 2026-11-26: Safe AI 2번 그래픽(assets/safe-ai/global.svg) 무한 루프: Figma 점선(짧은 선 조각들)을 같은 모양의 타원 점선(중심 161.28,87.8 / 반지름 158.11·33.05 / -15도)으로 바꿔 점선이 천천히 궤도를 따라 흐름(한 바퀴 40초). 파란 점 2개는 궤도를 따라 지구본 앞뒤로 돎(한 바퀴 10초, 속도에 완급: 앞쪽은 빠르게 휙, 뒤쪽은 느리게, 약 5배 차이. 아래 반쪽은 지구본 앞, 위 반쪽은 뒤에 가려짐, 앞에서 살짝 크고 뒤에서 작게). 궤도 전체(점선+점)가 -19~-11도 사이를 좌우로 살짝 기울어짐(7초). 궤도·점을 뒤 반쪽/앞 반쪽 클립으로 두 번 그리는 방식. 기울어질 때 점이 잘리지 않게 캔버스를 좌우 10씩 넓힘(viewBox -10 0 343 176), 대신 site.js TRUST_ART 폭 78.6 → 83.5%로 지구본 크기 유지. 시작 위치는 Figma와 동일.
- 2026-11-26: Safe AI 3번 그래픽(assets/safe-ai/cloud.svg) 무한 루프(6.5초): 맨 위 줄 카드가 먼저 밑에서 떠오르고(완전히 사라지지 않음, 최저 opacity .6) 0.35초 간격으로 아래 줄들이 이어서 떠오름. 줄마다 내용(네모 팝 → 라인 채움 → 초록 체크 팝)은 카드와 한 그룹이라 등장과 거의 동시에 시작해 빈 카드가 거의 안 보임. 유지 후 등장의 정확한 역순 + 반대 이징으로 퇴장. viewBox 위아래 30씩 확장 + 아래쪽 그라디언트 마스크.
- 2026-11-26: 홈 히어로 배경 빛(좌 파랑·우 핑크·가운데 보라 glow)에 미묘한 무한 움직임 추가(Firmable 레퍼런스: 큰 그라디언트가 천천히 돌았다 돌아옴). 각자 다른 주기(13s/16s/11s, alternate)로 이동 + 중심에서 벗어난 점 기준 회전(-24도/+26도) + 크기·투명도 살짝 변화. store.css 맨 아래 heroGlow* 키프레임, 동작 줄이기 설정 시 정지.
- 2026-11-26 (Figma): Industries 페이지를 Figma Section 1(1074:147857)에 `Formee industries · 1920`(1165:228)으로 그림. 홈 헤더/CTA/푸터 복제, 히어로 + 2열 산업 카드 8개(사진은 홈 Industry card 이미지), 전부 오토레이아웃·변수·텍스트 스타일. 새 컴포넌트: `Industry tool row`(State Default/Hover × Link Internal/External), `Tag / Status`, `icon / arrow-up-right`. 호버 예시: `Industries page · hover states`. 산업 아이콘 파스텔은 Figma에 scale 색 토큰이 없어 badge/* bg·text 쌍으로 대체(Education만 brand light/dark). 새 텍스트 스타일 Display/md Medium(28/36).
- 2026-11-26 (Figma): 홈 1080:37 정리. 오토레이아웃 15개 추가(바꾼 뒤 위치 비교, 어긋나면 되돌리는 방식, 아이콘/일러스트·겹친 배경은 제외), 텍스트 스타일 26개 적용(값이 같은 스타일만, 반복되는 크기는 새 스타일: Landing/72 Medium, Landing/56 Medium, Landing/40 Medium LH48, Landing/36 Medium, Landing/24 SemiBold, Landing/20 Regular LH28, Landing/11 SemiBold), 색 41개·여백/간격 415곳·모서리 79곳을 같은 값의 변수에 연결, HTML에서 넘어온 레이어 이름을 역할 이름으로(Section / Hero 등, Card/Item/Button/Link/Title/Description/Caption/Label/Row/Stack). 남은 것: 일러스트 색(#dae2fc 등)·소셜 브랜드 색은 토큰 없음, 푸터 설명 1개(16/자동 행간)는 스타일 적용 시 높이가 바뀌어 그대로 둠.
- 2026-11-26: 히어로 움직임 보강: glow만으로는 파란 배경과 색이 비슷해 움직임이 안 보여서 .hero__swirl(v3-store.html) 추가. 시행착오(한 바퀴 도는 핑크 덩어리 → 제자리 꿀렁임 → 진한 색 → 띠 회전) 끝에 확정: Firmable 오른쪽 보라 영역 = 우리 오른쪽 핑크, 좌우 반전한 왼쪽 하늘색. 각자 히어로 폭 1.6배 원에 한쪽만 색이 있는 띠 그라디언트(오른쪽 105deg, 왼쪽 255deg, transparent 56% → 색 84%)를 조금씩 돌려 영역 가장자리의 기울기와 위치가 바뀜. 오른쪽 14 → -24도 10s, 왼쪽 -14 → 22도 13s(-5s 시작), alternate ease-in-out이라 대칭으로 안 보임. 위쪽은 마스크로 남색 유지. 색은 처음 연한 파랑/핑크. 하단 큰 흰색 원은 더 납작한 타원(ellipse 98% 104%). 동작 줄이기 시 정지.
- 2026-11-26: Industries 페이지를 Figma 수정본(1168:236)대로: 사진 세로 크롭 위치(pages.js IND_PHOTO_Y, Figma CROP 오프셋을 object-position으로 변환: HR 0, Sales 10.7, Security 32.5, Education 27.8, Health 12.1, Childcare·Sports 50, Real Estate 38.2%), Explore 링크를 테두리 텍스트 버튼(Actions / Text Button, 36px, Text/sm SemiBold neutral-700, 테두리 neutral-400, 화살표 neutral-500, 호버 neutral-50)으로.
- 2026-11-26: 상단 Industries·Products 메가메뉴 호버 시 아이콘 타일 neutral-900 + 아이콘 neutral-0(흰색), 그림자 없음. Industries 페이지 Explore 버튼 화살표 제거(툴 줄 화살표와 겹쳐서), Figma도 Actions / Text Button 10개 Icon_right 끔.
- 2026-11-26: 산업 상세 Explore other industries 카드 A안으로 교체: 어두운 블러 패널 삭제 → 사진(4:3) 위 + 아래 neutral-50 본문(산업 파스텔 아이콘 40px + 이름 Text/xl SemiBold + 태그라인 Text/md neutral-600). 산업 색은 아이콘 타일에만. 호버: 본문 흰색 + popover 그림자 + 사진 확대. 화살표 없음. 캐러셀 구조(좌우 버튼, 4장)는 그대로.
- 2026-11-26: 툴 상세 One flow 카드: 단계 번호 01~05를 Display/xl Medium(40/48, -2.5%) neutral-400으로 크게, 제품 메뉴 칩 삭제(data.js 값은 남겨둠, 화면에만 안 보임). Explore other industries 카드: 흰 본문 + 1px neutral-200 아웃라인(outline-offset -1이라 사진 위로도 선이 보임), 호버 시 아웃라인 사라지고 popover 그림자.
- 2026-11-26: Explore other industries 호버 그림자가 캐러셀 스크롤 영역(overflow-x auto)에 잘리던 문제 수정: 트랙에 패딩(위 8 · 좌우 24 · 아래 32)을 주고 같은 만큼 음수 마진으로 당겨 카드 정렬은 그대로, scroll-padding-inline 24.
- 2026-11-26: 홈 히어로 시안 D(Ripple) 추가, 같은 링크에서 우하단 버전 스위처(Hero A · Orbit / D · Ripple)로 전환(?hero=a|d, localStorage 기억, <body> 맨 앞 인라인 스크립트가 store.js 전에 적용). D: 문구 한가운데로(100svh, 세로 가운데), 오비트 칩 숨김, 하단 흰 페이드 없이 딱 끊김, 남색→파랑→라벤더 배경(좌하 하늘색·우하 핑크). hero-ripple.js 캔버스: 11px 격자 작은 사각 점(디지털 느낌), 가운데서 3.1초마다 물방울 링(속도 125px/s, 거리 따라 옅어져 화면에 최대 3개 정도), 링이 지나가면 점이 커지고 밝아지며 바깥으로 밀림 + 뒤따르는 두 번째 물결 + 우상단 빛 하이라이트/반대편 그늘로 물 덩어리감, 문구 뒤는 조용한 영역. 색은 토큰(왼쪽 cyan-200, 가운데 흰색, 오른쪽 rose-200). 히어로 클릭 시 그 자리에 링. 동작 줄이기 시 정지 화면.
- 2026-11-26: 히어로 D 물결 수정: 원이 글자 블록(제목+설명+입력창) 바깥 원(반지름 = 블록 긴 변/2 + 32)에서 시작, 속도 125 → 58px/s로 느리게, 7.5초마다 물방울 하나가 링 3개 묶음(0 / 1.25 / 2.5초, 세기 1 / .72 / .5)을 보내 바깥 큰 원 뒤로 안쪽 원이 이어지는 물결. 링은 시작 원에서 1.2초 동안 부드럽게 나타남, 글자 블록 안쪽은 조용한 영역. 클릭 시 그 자리에서 작은 링 묶음.
- 2026-11-26: 히어로 D 물결 간격·반짝임: 링마다 붙어 있던 두 번째 물결 제거(한 링 = 한 줄), 묶음 안 링 간격 1.25s → 3.3s(약 190px), 12초마다 묶음. 링 사이가 밋밋하지 않게 격자 점 중 랜덤 10%가 각자 다른 박자로 짧게 흰색 반짝(sin^8 펄스, 글자 뒤는 약하게).
- 2026-11-26: 히어로 D: 점이 가장 커질 때 크기 축소(GROW 3.4 → 2.0, 하이라이트·반짝임 크기 보너스 절반), 링 3개 세기를 같게 하고 두께를 시작 원에서 30 → 멀어질수록 9로 얇아지게 해서 가장 안쪽 링이 항상 제일 두꺼움. 반짝임 속도 절반, 밝기 60%(TW_GAIN .42)로 은은하게.
- 2026-11-26: 히어로 D: 링 시작 원 80%로 축소, 퍼질수록 더 빨리 옅어지게(DECAY 520 → 340), 상단 헤더 높이 아래로 점·링·반짝임이 서서히 사라져 메뉴 글자에 안 걸림.
- 2026-11-26: 히어로 D: 네모 크기 75%로(기본 1.4 → 1.05px, 커지는 폭 2.0 → 1.5px), 링 두께 굵게(시작 반폭 30 → 44px, 최소 9 → 12px, 얇아지는 속도 완만하게).
- 2026-11-26: 히어로 D: 링이 좌우 화면 끝에 가까워지면(중심에서 가장자리까지 거리의 55%~95% 구간) 부드럽게 거의 0까지 사라짐.
- 2026-11-26: 히어로 D: 가장자리 페이드가 너무 일찍 시작돼 원이 한 겹만 보여서 조정. 페이드 구간 55~95% → 78~102%(화면 끝 바로 앞에서만 사라짐), 거리 감쇠 DECAY 340 → 560. 원 두 겹이 함께 보임.
- 2026-11-26: 히어로 버전 이름 정리: A · Orbit / B · Ripple(이전 D) / C · Orbit+(신규), ?hero=a|b|c (예전 ?hero=d도 B로). 내부값: B = body[data-hero="d"], C = body[data-hv="e"](data-hero b/c는 옛 v3-store-b/c 파일이 쓰고 있어서, C는 A 스타일을 그대로 쓰도록 data-hero 없이). C(hero-orbit-plus.js): 궤도를 점선 대신 가운데 밝고 양끝 흐린 그라디언트 실선, 점 대신 꼬리 달린 빛 펄스(궤도당 2개, A보다 빠르게), 2.4초마다 랜덤 칩이 빛나며 곡선을 따라 가운데로 데이터 핑, 도착 시 코어에서 파란 링 퍼짐, 입력창 주변 HUD 링(기본 링 + 천천히 도는 눈금 링 + 반대로 도는 호, 밝은 코어 위라 파란 계열), 텍스트 칩은 진한 반투명 노드 스타일(#heroOrbit 선택자로 A 규칙보다 우선). 동작 줄이기 시 펄스·핑·회전 없음.
- 2026-11-26: 히어로 C 덜어냄(너무 정신없어서): HUD 링·데이터 핑 선·코어 파동·꼬리 펄스·진한 칩 삭제. 남은 것: 그라디언트 실선 궤도, 궤도당 작은 빛 1개(느리게), 7.5초마다 칩 하나가 은은하게 빛남. 칩은 A의 밝은 유리 그대로.
- 2026-11-27: 히어로 B(Ripple) 높이 90%로: min-height max(100svh, 760px) → max(90svh, 684px).
- 2026-11-27: 히어로 B 'Or start a 14-day free trial' 링크 흰색(호버 80%). Figma HR 산업(1177:472)·HR Module(1178:472) 프레임 1440 → 1920 (래퍼 FILL, 헤더 1920 + 좌우 320, 콘텐츠 1280 가운데 유지, HR Module 프레임 오른쪽으로 이동).
- 2026-11-27: 히어로 B: trial 링크 호버 = 흰색 유지 + 밑줄. 클릭 물결 삭제, 대신 호버 스포트라이트(커서 주변 점이 커지고 밝아지며 바깥으로 살짝 밀림 + 은은한 일렁임, 반경 90px, 커서를 살짝 늦게 따라감, 벗어나면 서서히 사라짐, 새 링 없음). 터치·동작 줄이기 시 없음.
- 2026-11-27: 히어로 B 호버 스포트라이트 약하게(밝기·크기 .75 → .4, 밀림 .8 → .45, 하이라이트 .35 → .18).
- 2026-11-27: 히어로 B 스포트라이트 더 약하게(밝기·크기 .4 → .2, 하이라이트 .18 → .08).
- 2026-11-27: 히어로 A·C 배경 위쪽을 B처럼 선명한 파랑으로(blue-400에 회색 섞지 않음, 남색 → blue-500 → blue-400 52%), 아래 흰색으로 녹는 페이드는 유지. 가운데를 파스텔로 만들던 빛 줄임: 왼쪽 파랑 glow .55 → .3, 가운데 보라 glow .45 → .2, 왼쪽 하늘색 띠 .75 → .45.
- 2026-11-27: 히어로 C: 궤도 선 진하게(그라디언트 끝 .06 → .14, 가운데 .6 → .85). 전체 위로: 제목 24px(상단 패딩 160 → 136), 궤도·입력창 88px(궤도 margin-top 40 → -24, -56은 Education 칩이 설명 문장에 닿아서), 히어로가 그만큼 짧아져 아래 흰 페이드도 같이 올라감.
- 2026-11-27: 히어로 C 궤도 다시 16px 내림(margin-top -24 → -8): 설명 문장과 맨 위 궤도 선 사이 간격 약 2.5배. 결과: 제목 24px, 궤도·입력창 72px 원래보다 위.
- 2026-11-27: 히어로 C 설명 문장 ~ Education 칩 간격 48px(궤도 margin-top -8 → -2). 원래보다 궤도·입력창 66px 위.
- 2026-11-27: 산업 페이지를 Figma 'Formee industry · HR · 1920'(1177:472)에 맞춤: 섹션 상하 80, HR tools 헤더 위 여백 제거·설명 720폭·간격 24, View 버튼 왼쪽 정렬. 프라이싱(툴 페이지 공용): 가운데 정렬 헤더(64/68 + 18/28), 헤더·토글·카드·안내문 간격 56, 토글 neutral-100 사각 세그먼트, 카드 패딩 28·r16·neutral-200 테두리(추천 brand-primary 1.5), 순서 제목(24/32 Medium + Recommended 칩 옆) → 설명 → 툴 가격 박스(neutral-50) → 구분선(neutral-300) → HR bundle 24/32 + Save → 가격 40/48 Medium '$'(취소선은 US$) → 버튼 48(추천은 진한 그라디언트) → 체크 16/24. 안내문 가운데 + 그 아래 Compare all plans 56 버튼(화살표 없음). Explore 카드 약 292 폭(4장 + 다음 카드 살짝), 화살표 버튼 테두리 neutral-300. CTA 상하 80. hub.css에 --hub-btn-h-lg/xl, --hub-font-size-title(24/32), --hub-card-pad(28) 추가.
- 2026-11-27: Figma 수정 반영: 산업 페이지 섹션 상하 80 → 96(툴·프라이싱·Explore), CTA 128. Figma HR Module 가격 섹션(1178:1196)을 산업 페이지 가격 섹션 구조로 교체(카드 통일: 툴 가격 헤드라인 + HR bundle 박스).
- 2026-11-27: 헤더를 Figma 네비게이션(밝은 1190:17844 / 히어로 위 1190:17961)에 맞춤: 메뉴·Log in 19/28 Regular(밝은 곳 neutral-700, 히어로 위 neutral-300, 호버·현재 페이지는 진하게/흰색), 버튼 46 높이·좌우 22·18/27 Medium, 오른쪽 간격 8. 히어로 위: Request a demo 투명 + neutral-400 테두리 + 흰 글자, Start free 흰 배경 + neutral-400 테두리 + neutral-700 글자. 밝은 곳: Request a demo 흰 배경 + neutral-400 테두리, Start free neutral-900.
- 2026-11-27: 헤더 높이 72 → 86(모든 페이지, store.css --hub-nav-h). 히어로·페이지 상단 여백이 nav-h 기준이라 콘텐츠도 14px 같이 내려감(헤더 아래 간격 유지), 메가메뉴 위치도 따라감.
- 2026-11-27 (Figma): 홈 Products 섹션(1139:9, Education 선택 상태) 아래에 나머지 7개 산업 선택 상태 추가: 'Products · <산업> selected' 프레임 7개(1200:44 HR, 1200:215 Sales and Marketing, 1200:383 Security, 1200:555 Health, 1200:725 Childcare, 1200:879 Real Estate, 1200:1032 Sports), Formee home 프레임 바로 아래 세로로. 선택 줄 neutral/75 + 산업 파스텔 아이콘(badge/* bg·text, Industries 페이지와 같은 짝), 패널 그라디언트·앱 아이콘·장식 아이콘은 HTML 산업 색(c1/c2), 툴 이름·설명·아이콘은 HTML 그대로(Pulse 바깥 화살표, AI Human Rights Stack 'In design' 태그).
- 2026-11-27: HR Module 툴 페이지를 Figma 'Formee tool · HR Module · 1920'(1178:472)에 맞춤: One flow 제목 48/56·단계 제목 18/26, 기능 행 제목 40/45·설명 18/28·체크 16/24, AI 섹션 흰 배경 + 제목 64/68 + 카드 neutral-100/연보라(2·3번) + 아이콘 타일 없이 40px 보라(badge purple text) + 제목 24/32 Medium·설명 16/24, Built for education providers 실제 사진 3장(assets/tools/hr-edu-*.jpg, Figma에서 2배로 추출, data.js extra 항목 5번째 값) 411x308 r24 + 아이콘 타일 왼쪽 위 + 제목 18/26·설명 16/24, More for HR·CTA는 neutral-50 띠(구분선 삭제, 카드 neutral-150, 이름 20/28, 흰 원 40 화살표 항상 보임), CTA 상하 128.
- 2026-11-27: 툴 페이지 인터랙션: 기능 행 그래픽은 스크롤로 보일 때 등장(이전엔 로드 시 이미 끝나 있었음, IntersectionObserver), 점수 링·근무 바가 차오름, 워크숍 세션 순서대로 등장. 호버: 그래픽 카드 위아래로 살짝 벌어짐, One flow 카드·AI 카드 살짝 떠오름(AI 아이콘 회전), 사진 확대, 가격 카드 떠오름 + 그림자. One flow 카드 순서대로 등장. 동작 줄이기 시 모두 꺼짐.
- 2026-11-27: 버그 수정: 가격 페이지 Industry bundles 탭이 제품별 가격 변경(11/26) 이후 bundlePrice 인자 오류로 페이지 렌더가 멈추던 문제(tools 배열로 계산하도록).
- 2026-11-27: HR 산업 페이지 배너를 Figma(1177:493)에서 바꾼 사진으로 교체: Figma 크롭 그대로 2배(2560x800, 16:5)로 추출해 assets/industries/hr-banner.jpg 덮어씀.
- 2026-11-27: Staff, approvals and shifts / Training and events 그래픽 배치를 Figma(1178:777, 1178:985)대로: 카드가 겹치게(Figma 좌표를 scene 박스 기준으로 환산: 인박스 4%/6.2% 폭 74%, 근무 카드 24%/53.8% 폭 72%로 약 25px 겹침; 워크숍 7%/6.8% 폭 85.9%, 요약 문서 51.9%/77% 폭 48%). 워크숍 단계 번호는 원 테두리 없이 작은 숫자(10) + 짧은 보라 세로선, 단계 제목 13/20.
- 2026-11-27: Built for education 사진 카드 아이콘을 Figma(1178:1137)와 동일하게: 사진 오른쪽 아래(20px 안쪽), 56 유리 타일(흰색 70% + 1px 흰 안쪽 선) r12 + popover 그림자 + 배경 블러 20, 아이콘 28px neutral-700, 선 굵기 1.6px(24 viewBox 기준 1.37).
- 2026-11-27: Crew OS 툴 페이지를 HR Module과 같은 템플릿으로 채움(data.js crew-os.page + heroVisual): 흐름 5단계(설명 → 팀 설계 → 학습 → 연습 주간 → 단계별 가동), 기능 4개 + 새 그래픽(scenes.js crewDesign 조직도 제안, crewTrain 절차 학습 + 역할 점검 94, crewControl 자율 단계 + 한도 초과 환불 결정, crewSummary 일일 요약), AI 섹션 'Work your AI team takes on.'(Reception, Accounts, HR, CEO agent), 업종 섹션 'Ready for your industry.'(Childcare, Aged care, Colleges, 산업 사진 재사용), FAQ 4개. 내용은 CrewOS 제안서·README 기준(모두 목업, 마케팅 문구는 대표님 확인 필요).
- 2026-11-27: Sales and Marketing: BlueGen 툴 페이지를 같은 템플릿으로 채움(BlueGen README 기준, '데이터 점검만, 스크래핑 없음' 정책 지킴): 히어로 그래픽 bgHero(오늘의 배치, 품질 점수, LinkedIn 확인), 흐름 5단계(Import, Check, Enrich, Target, Reach out), 기능 4개 + 그래픽(bgImport, bgCheck, bgTarget, bgOutreach), AI 섹션, 'Built for five industries.'(산업 사진 재사용), FAQ 4개. 툴 줄 하이라이트 3개(아이콘 포함) 교체, Pulse 하이라이트 아이콘 추가, 산업 설명 문구 수정. Pulse는 외부 랜딩으로 연결이라 툴 페이지 없음.
- 2026-11-27: 홈 Products 탐색 섹션을 Figma 'Products'(1209:72258, 산업 8개 상태)에 맞춤: 패널 오른쪽 위 큰 아이콘을 더 옅게(색 9%, Health·Childcare·Real Estate는 12.5%, 선 굵기 220 기준 10), HR 아이콘 circle-user-round, Real Estate building-complex(data.js artIcon, icons.js 추가). 나머지(패딩 48, 간격 40, 제목 32/40, 카드)는 이미 같았음.
- 2026-11-27: Security 산업: BigBrother·Security Watchdog 툴 페이지를 같은 템플릿으로 채움. 주의: 대표님 자료에는 한 줄 설명뿐이라 기능·문구·그래픽은 전부 초안(확인 필요). BigBrother = 카메라 한 화면, 구역·시간 규칙 감지, 클립 첨부 알림, 개인정보(얼굴 흐림·보관 기간·열람 권한). Security Watchdog = 장비 상태 점검, 평소와 다른 활동, 단계별 알림 전달, 사건 기록·주간 리포트. 그래픽 scenes.js bbHero/bbWall/bbDetect/bbAlert/bbPrivacy, swHero/swHealth/swPattern/swEscalate/swReport(카메라 화면은 그린 타일, 실제 영상 아님). 산업 설명 문구 수정.
- 2026-11-27: 임시 로고 적용(사용자 제공 이미지, 다듬기 전): 흰 배경 제거해 투명 PNG로(assets/logo-formee.png 네이비 글자, logo-formee-white.png 흰 글자, 3배 해상도 329x84). 헤더 28px, 홈 히어로 위(스크롤 전)에서만 흰 글자 버전, 푸터는 네이비. 기존 SVG 워드마크(WORDMARK)는 코드에 남겨둠.
- 2026-11-27: 히어로 B 물결 링을 더 면처럼: 시작 반폭 44 → 64px, 최소 12 → 18px, 얇아지는 속도 완만하게(460 → 620).
- 2026-11-27 (Figma): 홈 히어로(1080:40) 궤도 3개를 C(Orbit+)처럼 실선 그라디언트로: 점선 해제, 선 1.1, 흰색 가운데 85% → 양 끝 14%. 칩·점 위치는 그대로.
- 2026-11-27: 히어로 B 링: 시작은 두꺼운 띠(반폭 64) 그대로, 퍼지면서 확실히 얇아지게(최소 18 → 8px, 감소 거리 620 → 300). 임시 로고 심볼 색을 페이지 팔레트로 재조합: 위 막대 blue-400 → blue-300, 가운데 brand-primary → purple-300, 아래 rose-300 → rose-200(왼쪽 아래 진하게 → 오른쪽 위 연하게).
- 2026-11-27: 홈 Products Sales and Marketing 패널 장식 화살표를 Figma(1200:258)처럼 84%로 줄이고 안쪽으로 옮겨 화살표 끝이 덜 잘리게. Figma 헤더 4곳(1190:17962 히어로 위 흰 글자, 1190:17884·1190:17845·1178:1520 네이비)에 임시 로고 PNG 적용(기존 워드마크는 숨김, 'Logo (temporary)' 110x28).
- 2026-11-27 (Figma): 홈 히어로 배경(1080:41)이 예전 탁한 색(blue-400에 회색 섞음)으로 남아 있어 HTML A·C와 같게 갱신: 그라디언트 #12203e 0 → #1a4599 24% → #3c6fdd(blue-400) 52% → #9cb4f1 70% → #e2e7ff 86% → 흰색, 파랑 glow .55 → .3, 보라 glow .45 → .2.
- 2026-11-27: 홈 Products Sports 패널 장식 아이콘을 Figma(1200:1032) 'icon / sport-shoe'로 교체(icons.js 추가, data.js artIcon), 투명도 Health 등과 같은 12.5%.
- 2026-11-27: 대표 공유용으로 히어로 시안 정리: 스위처는 A · Orbit(이전 C · Orbit+, 기본값) / B · Ripple 두 개만. 이전 A(점선 궤도)는 아카이브: 버튼 없음, ?hero=old로만 열림(localStorage에 저장 안 함). 예전 ?hero=c는 A, ?hero=d는 B로 연결. 내부값은 그대로(A = body[data-hv="e"], B = body[data-hero="d"], 아카이브 = 둘 다 없음).
- 2026-11-27: pricing 페이지 글자 크기를 Pulse 가격 페이지(ai.formeeholdings.com/pricing)에 맞춤(배경·레이아웃은 그대로, body[data-page="pricing"]만): 섹션 제목 64/68 -1.6, FAQ 제목 48/56 -1.2, 토글 16/24 + Save 배지 13, 플랜명 24/32 Medium -0.3, 플랜 설명·체크 16/24(간격 12), 가격 40/48 -0.3, Recommended 11, 카드 패딩 32, 버튼 글자 Semibold, 비교표 헤더 14 Bold · 행 이름 Regular 회색 · 값 Semibold 진하게, Payment 카드 제목 16/24. 홈 가격 카드는 안 바뀜.
- 2026-11-27 (Figma): FME_AI-Social-Media_For-Design-Team > Formee hub website > Formee.com 섹션에 'Formee pricing · 1920'(1222:1096) 추가(HR Module 프레임 오른쪽). HR 산업 페이지 껍데기(헤더·푸터·CTA)와 홈 가격·FAQ 블록을 복제해 HTML pricing 페이지 구조로: 히어로+토글 2개+플랜 카드 4장(Pulse 기준 글자 크기), Compare plans 표, Payment, tax and trust 카드 6장(Lucide 아이콘), Pricing questions 9개, CTA 'Start your free trial.'. 오토레이아웃·색 변수·텍스트 스타일만 사용(CTA 장식 그라디언트는 HR 원본 그대로).
- 2026-11-27 (Figma): 같은 섹션 pricing 오른쪽에 'Formee contact · 1920'(1229:227) 추가: HTML contact.html 구조(왼쪽 제목·설명·이메일·국가별 전화·데모 링크, 오른쪽 Send a message 폼 카드), 배경 neutral/50, 헤더 Contact 현재 페이지 표시. 체크박스 = Controls / Checkbox, 그림자 = shadow/lg, 셀렉트 화살표·데모 화살표 = 기존 아이콘 컴포넌트, 입력칸은 인풋 컴포넌트가 없어 토큰으로 구성(높이 46·140만 고정값).
