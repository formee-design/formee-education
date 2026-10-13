# Analytics → Figma 이관 핸드오프

기준: formee-education `main` c3d4506 (2026-10-12). 배포본은 https://yjkim9627-gif.github.io/formee-education/prototypes/ai-social-media/analytics/analytics.html
대상 Figma: FME_AI-Social-Media `N8AXYZVtz82rgHcCRHKzEl`, 섹션 **Analytics_to be_261012** `12576:448644` (이관 작업 영역: 하위 섹션 **new** `12616:521591`)
캡처: `shots/` (1920 폭 전체 높이. 오른쪽 회색 띠는 캡처 과정에서 생긴 것으로 디자인과 무관)

---

## 0. 먼저 알아둘 것

### 0-1. 파일
| 파일 | 역할 |
|---|---|
| `analytics/analytics.html` | Analytics 메인 화면 |
| `analytics/posts.html` | Post Performance (Analytics 아래 유일한 하위 화면) |
| `analytics/analytics-shared.js` | 두 화면이 함께 쓰는 placeholder 데이터, 날짜 계산, Filter/Select, Date Picker 로직 |

- 두 화면은 **같은 데이터셋**에서 숫자를 뽑는다. Analytics의 합계와 Post Performance 목록의 합은 항상 같다.
- 모든 숫자는 placeholder. "오늘" = **2026-10-12**로 고정돼 있다.
- 지표는 모든 플랫폼 API가 주는 것만 쓴다: posts, views, likes, comments. Engagement = (likes + comments) ÷ views.
- 유료 지표(spend, leads, CPL)는 Meta Ads에서만 오므로 **Instagram·Facebook만**, 그리고 **Meta Ads 연결 후에만** 존재한다.

### 0-2. Figma 현황과 HTML의 차이 (중요)
- HTML 주석이 말하는 Figma 프레임 `12586:485574`는 **파일에 더 이상 없다.** 섹션에 있는 "Analytics · default" 3개(`12579:248761`, `12586:486085`, `12586:521156`)는 모두 **예전 구성**이다(Posts ready, Meta Ads spend / Published Posts by Platform, Content mix · by count, Paid performance, Top forecast performers).
- 현재 HTML은 섹션 구성이 완전히 바뀌었다. **Figma는 기존 프레임을 고치기보다 새로 조립하는 게 맞다.**
- Figma에 이미 있는 HTML 관련 조각:
  - `12595:252769` "Analytics · period selector — Custom state": HTML의 Custom 날짜 행이 이 프레임을 따랐다.
  - `new` 섹션의 Date Picker 인스턴스 3개 (`12631:523304`, `12631:523464`, `12631:523305`)
  - `12621:251714` "Home · Top content — Paid tab (Meta Ads not connected)": Home에서 넘어오는 딥링크 출처

### 0-3. 프레임 공통 규칙
- 1920 폭, 다른 화면과 같은 셸: Nav / Navigation(262) + right-col(1658). right-col = Nav / App TopBar(56) + Main Content.
- HTML은 1162 높이 안에서 Main이 세로 스크롤된다. **Figma 프레임은 내용 전체 높이로 늘려서** 그린다(Analytics 기본 약 1793, Post Performance 기본 약 2316).
- Main Content: padding 28 / 28 / 60 / 28, 배경 neutral/75, 헤더↔본문 간격 spacing/xl(20)
- 헤더: 제목 블록 → (16) 기간 선택 행 → (24) Stats summary
- 본문 섹션 사이 spacing/4xl(40), 섹션 안 헤더↔카드 spacing/lg(16), 2열일 때 열 사이 spacing/2xl(24), 두 카드는 행 높이에 맞춰 늘어남(stretch)
- 카드 셸: neutral/0 배경, neutral/400 1px 테두리, radius/xl. **그림자 없음**(예전 Figma 시안의 shadow/md는 HTML에서 빠짐)
- 사이드바: Analytics 선택 상태. Post Performance에서도 Analytics가 선택 상태(클릭하면 analytics.html로 이동)

---

## 1. Analytics (`analytics.html`)

### 1-1. 위에서 아래 순서
| # | 영역 | 내용 | 사용 컴포넌트 |
|---|---|---|---|
| H1 | TopBar | 경로 "Analytics" | Nav / App TopBar |
| H2 | 제목 | "Analytics" (Display/sm 22/30 Bold, -0.1) / 설명 "How your published posts performed across every connected platform — views, likes and comments." (Text/sm, neutral/500) | 텍스트 |
| H3 | 기간 선택 | 트랙(neutral/100, padding 4, radius/xl) 안에 **Segment Chip** ×4: 30 days(선택) / 90 days / All time / Custom | Segment Chip `2131:1321` |
| H3' | Custom 날짜 행 | Custom 선택 시 트랙 **오른쪽**에 나타남(gap 12): Input(date, sm, 240 폭, 달력 아이콘) "11/09/2026" · "to" · Input "11/10/2026" · Primary 버튼 "Apply" | Input `1956:51741`, Actions / Button Primary |
| H4 | Stats summary | 4칸: **Published Posts** 66 / "Sep 8 – Oct 12"(기간 라벨) · **Total views** 2.1M / "32.5K per post" · **Total likes** 156.5K / "2.4K per post" · **Avg engagement** 7.5% / "(likes + comments) ÷ views". 아이콘: library · eye · heart · trending-up. 첫 구분선만 진한 선(strong) | Stats summary |
| B1 | 2열 · Publishing | 왼쪽 **Published Posts Over Time** / 오른쪽 **Published Mix** | 아래 1-2 |
| B2 | **Content Performance** | 표 + Pulse insight 배너 | 아래 1-3 |
| B3 | 2열 · Top posts | 왼쪽 **Top Paid Content** / 오른쪽 **Top Organic Posts** | 아래 1-4 |
| B4 | **Meta Ads Performance** | 배지 "Integration Pending" + 섹션 빈 상태 "Meta Ads Analytics is Coming Soon" / "We're working on bringing Meta Ads performance data to Pulse. Analytics will be available once the integration is complete." | Trends / Section Header, empty-state(section) |

### 1-2. Publishing 행
**Published Posts Over Time** (왼쪽)
- 섹션 헤더: 제목 + 설명 "When and where your posts were published. Click a bar to see those posts."
- 카드(padding 24, gap 16): **누적 세로 막대**. 기간 구간당 막대 1개, 플랫폼별 조각을 아래부터 쌓음. 막대 위 합계(Text/xs SemiBold, neutral/700), 아래 날짜 라벨(Text/xs, neutral/500), 차트 높이 200, 하단 neutral/150 기준선, 막대 최대 폭 56, 위쪽 모서리 radius/sm
- 30 days 값: Sep 14 = 15 · Sep 21 = 14 · Sep 28 = 13 · Oct 5 = 12 · Oct 12 = 12
- 범례: 점 8px + 플랫폼 이름 ×5
- 플랫폼 색 (진한 → 연한, 아래부터 쌓임): Instagram brand/primary-dark · TikTok brand/primary · Facebook brand/link · REDnote brand/primary-mid · LinkedIn brand/primary-pale
- 기간별 구간: 30 days = 주 5개 · 90 days = 주 13개 · All time = 월 12개(Nov–Oct) · Custom = 14일 이하는 일, 120일 이하는 주, 그 이상은 월
- 동작: 막대 조각에 호버하면 흰색 2px 안쪽 테두리가 생기고, 툴팁(브라우저 기본) "Instagram · Sep 8 – Sep 14: n posts — view posts"가 뜸. 클릭하면 Post Performance로 이동(그 플랫폼 + 그 구간)

**Published Mix** (오른쪽)
- 섹션 헤더 + 설명 "Share of published posts by platform or content type. Click one to see its posts." + 오른쪽 탭 **Platform / Type** (Segmented Control)
- Platform 탭: 가로 막대 목록(이름 80 폭 · 트랙 neutral/100 높이 16 radius/sm · 채움 brand/primary · 값 32 폭 오른쪽 정렬). 값: Instagram 18 · TikTok 24 · Facebook 8 · REDnote 4 · LinkedIn 12. 하단 구분선 + "Total Published Posts: **66**"
- Type 탭: 도넛(180, 두께 0.68) + 가운데 "66" / "Published Posts" + 범례(280 폭): Video 36 · 55% · Image 15 · 23% · Carousel 10 · 15% · Multi-Image Post 5 · 8%
  - 유형 색: Video brand/primary · Image brand/primary-mid · Carousel brand/primary-pale · Multi-Image Post brand/primary-light
  - 0건인 유형은 점 neutral/200, 글자 neutral/500 Regular, 클릭 불가
- 두 탭은 같은 카드 높이를 유지한다(더 큰 쪽 기준)
- 동작: 막대 행, 도넛 조각, 범례 행 클릭 → Post Performance(그 플랫폼 또는 유형). 호버하면 라벨이 brand/primary, 막대가 primary-dark로 바뀜

### 1-3. Content Performance
- 섹션 헤더 + 설명 "Average results per post. Expand a row to see what worked best inside it." + 오른쪽 탭 **By platform / By content type**
- 표: Schedule / List Row 구조(카드형 목록), 좌우 padding 20
  - 열: 이름(나머지 폭) · Posts · Avg views · Avg likes · Avg comments · Engagement (각 120, 오른쪽 정렬) · Best format(220, 탭에 따라 "Best platform") · 링크(110)
  - 그룹 행: chevron(펼치면 90° 회전) + 플랫폼 아이콘 20px(icon / social / *, REDnote는 아이콘이 없어 점) + 이름(SemiBold) · Posts는 SemiBold · Best 칸에 **Status Chip Green**(최고 하위 항목) · "View posts →"
  - 하위 행(펼침): 배경 neutral/50, 이름 들여쓰기 32, 글자 neutral/700 Regular · Best 칸에 "+4% vs Instagram avg"(양수는 badge/green/text, 음수는 neutral/500, Text/xs SemiBold)
  - 행 호버: neutral/50
- By platform 기본값:

| Platform | Posts | Avg views | Avg likes | Avg comments | Engagement | Best format |
|---|---|---|---|---|---|---|
| Instagram | 18 | 30.8K | 2.9K | 115 | 9.7% | Video |
| TikTok | 24 | 60K | 4.1K | 108 | 7.0% | Video |
| Facebook | 8 | 10.2K | 330 | 22 | 3.4% | Multi-Image Post |
| REDnote | 4 | 6.1K | 571 | 37 | 10.0% | Image |
| LinkedIn | 12 | 3.4K | 167 | 16 | 5.4% | Multi-Image Post |

  - Instagram 펼침: Video 9 · 40.3K · 3.9K · 157 · 10.1% · +4% / Image 4 · 17.1K · 1.2K · 49 · 7.4% · -24% / Carousel 5 · 24.8K · 2.3K · 93 · 9.8% · +0%
- 플랫폼별 콘텐츠 유형: Instagram·TikTok·REDnote = Video · Image · Carousel / Facebook·LinkedIn = Video · Image · Multi-Image Post
- **Pulse insight 배너**: brand/primary-light 배경, radius/lg, padding 12/16, sparkle 아이콘 16. 문구는 데이터로 생성됨. 기본값 "Pulse insight: multi-image posts on Facebook earned 14% more engagement than Facebook's average this period." / By content type일 때 "Pulse insight: images on REDnote earned 61% more engagement than the image average this period."
- 동작: 행 클릭 = 펼침/접힘(탭을 바꾸면 모두 접힘). "View posts →" = Post Performance(그 그룹, 하위 행이면 두 조건 모두)

### 1-4. Top posts 행
**Top Paid Content** (왼쪽)
- 섹션 헤더: 제목 + 배지 **"Integration Pending"** + 설명 "Your best-performing posts with ad spend in this date range." + 오른쪽 Text Button "View all →" (**빈 상태에서는 숨김** → 지금은 항상 숨김, Meta Ads 연결 후 목록이 있을 때만 표시)
- 지금은 항상 섹션 빈 상태: "Paid results will appear once Meta Ads is connected." / "Boosted posts and ads will be ranked here by spend, leads and CPL."
- 기준: 기간 안에 광고비가 조금이라도 있으면 Paid, 아니면 Organic

**Top Organic Posts** (오른쪽)
- 섹션 헤더 + 설명 "Your best-performing posts with no ad spend in this date range." + 오른쪽: Filter/Select "Platform" · Filter/Select "Rank by: Views" · Text Button "View all →"
- 카드: 행 3개(예전 Top forecast performers 행 구조). 순위(Text/md SemiBold, 12 폭) · 썸네일 56(radius 8) · 제목(Text/sm SemiBold) / "TikTok · Video"(Text/xs, neutral/500) · 지표 **4개**(각 64 폭: 값 Text/xl SemiBold / 라벨 Text/xs: Views, Likes, Comments, Engagement). 어떤 기준으로 순위를 매겨도 그 값이 화면에 보인다. 행 padding 16/16/16/20, 행 사이 neutral/150 선
- 기본값:
  1. A Day on Campus in the UK · TikTok · Video · 194.4K / 12K / 428 / 6.4%
  2. Study in the UK — Applications Open · TikTok · Video · 171.2K / 9K / 184 / 5.4%
  3. UK Applications — January Intake · TikTok · Video · 170.6K / 10.9K / 345 / 6.6%
- Platform 옵션: All Platforms / Instagram / TikTok / Facebook / REDnote / LinkedIn
- Rank by 옵션: Views / Likes / Comments / Engagement Rate
- 필터를 고르면 선택 상태 pill로 바뀜: 진한 배경 + "×" + "Platform | REDnote". × 누르면 기본값으로 돌아감
- 선택한 플랫폼에 글이 없으면 빈 상태 "No organic posts on {Platform} in this date range."(필터는 그대로 보임). 기간 전체에 organic이 없으면 "No organic posts in this date range." / "Your best posts without ad spend will be ranked here."(필터와 View all 숨김)

### 1-5. 페이지 수준 동작
- 기간 선택을 바꾸면 모든 섹션과 KPI 기간 라벨이 다시 계산됨. URL에 `?period=` 유지
- Custom: 날짜 칸 클릭 → 그 칸 아래(8 아래, 왼쪽 정렬, 376 폭)에 **Date Picker**(Time=Without time). 형식 DD/MM/YYYY
  - 날짜 보기: "September 2026" 제목 버튼 · 이전/다음 달 · 월요일 시작 · 선택일 brand 채움 · 오늘 테두리 · 다른 달·범위 밖 날짜 흐리게 · Cancel / Save
  - 제목 클릭 → 월 보기(View=Month): "2026" + 4×3 월 칸, 화살표는 1년 단위
  - 제한: 시작일은 종료일 이후 불가, 종료일은 시작일 이전·미래 불가. 열린 칸은 focused 테두리
  - Save = 칸에 반영, **Apply** = 페이지 전체 재계산
  - Custom 기본 범위 11/09/2026 – 11/10/2026: KPI 67, "Sep 11 – Oct 11", 막대 라벨 Sep 13 / 20 / 27 / Oct 4 / Oct 11
- 딥링크: `?period=30d#top-paid` / `#top-organic` → 해당 섹션으로 스크롤하고 카드에 brand/primary-mid 3px 링이 1.8초 동안 나타났다 사라짐 (Home의 "View analytics →"에서 진입)

---

## 2. Post Performance (`posts.html`)

### 2-1. 구조
| # | 영역 | 내용 |
|---|---|---|
| H1 | TopBar 경로 | "Analytics"(링크, neutral/500 Medium) › chevron › "Post Performance" |
| H2 | 제목 | "Post Performance" / "Every published post, and how its views, likes and comments moved over time." |
| H3 | 기간 선택 | Analytics와 동일(Custom 날짜 행 포함) |
| H4 | 필터 바 | Segmented Control **All posts / Organic / Paid** · Filter/Select **Platform**(All Platforms…) · **Content type**(All Types / Video / Image / Carousel / Multi-Image Post) · **Published**("Published: All" + 기간의 주/월/일 목록) |
| H5 | Stats summary | 5칸, 목록에 보이는 글의 합계: Posts · Views · Likes · Comments · Engagement (아이콘: library, eye, heart, chat, trending-up). Paid + 연결됨: Posts · Views · Spend · Leads · CPL (아이콘: library, eye, billing, circle-user-round, target) |
| B1 | **Performance Over Time** | 헤더(설명 문구는 동적) + 오른쪽 탭 Views / Likes / Comments (+ Paid일 때 **CPL**). 카드: 큰 합계(Display/sm) / "Total views · Sep 8 – Oct 12" + 선 차트 |
| B2 | **Posts** | 헤더 "Posts" / "66 posts published Sep 8 – Oct 12" + 오른쪽 Filter/Select "Sort by: Views". 카드 안 표 + "Show 20 more" |

### 2-2. 선 차트
- 높이 260, 여백 왼쪽 56 · 오른쪽 16 · 위 24 · 아래 28. 가로 격자 5줄(neutral/150), y축 라벨(Text/xs neutral/500, 값은 4등분한 깔끔한 숫자)
- 선 brand/primary 2px, 아래 영역 brand/primary-light 60%
- x축: 30 days는 일 단위 점, 라벨은 막대 구간 끝 날짜(Sep 14 · 21 · 28 · Oct 5 · 12)만. 90 days = 주, All time = 월
- 선택된 구간(Published 필터): brand/primary-light 띠 + 위에 "Sep 8 – Sep 14"(Text/xs SemiBold brand/primary)
- 호버: 점선 세로 가이드(neutral/400) + 흰 점(테두리 brand 2px, r=4) + **Editor 툴팁**(neutral/900, radius/md) "Sep 20 · 43.1K views"
- 클릭: 그 점이 속한 구간으로 목록 필터(Published 필터에 반영). 같은 구간을 다시 누르면 해제
- 차트 합계는 **기간 전체** 기준이다(구간 필터와 무관). Stats와 목록은 구간 필터를 따른다

### 2-3. Posts 표
- 열: Post(썸네일 40 radius/md + 제목 / "TikTok · Video") · Published(140, "Oct 10, 2026") · Paid / Organic(110, Status Chip: Paid = Blue, Organic = Secondary) · Views · Likes · Comments · Engagement (각 110 오른쪽 정렬). Paid 열이 보일 때(연결됨 + Organic 탭이 아님)는 **Spend · CPL** 열 추가, organic 글은 "—"(neutral/500)
- 20개씩 보여주고 "Show {n} more"(Text Button)로 더 불러옴
- Sort by: Views / Likes / Comments / Engagement Rate / Newest (+ 연결됨: Lowest CPL / Spend)

### 2-4. 상태
| 상태 | 화면 |
|---|---|
| Paid + Meta Ads 미연결 | Performance Over Time 제목 옆 배지 "Integration Pending", 설명은 "Paid posts · Sep 8 – Oct 12"(차트 안내 문구 없음), Stats·탭·차트·Posts 숨김. 빈 상태 "Paid results will appear once Meta Ads is connected." / "Boosted posts and ads will be listed here with spend, leads and CPL over time." |
| Paid + 연결됨 + Meta가 아닌 플랫폼(TikTok 등) | Stats·지표 탭·차트·Posts 숨김, 설명에 차트 안내 문구 없음. 빈 상태 "No paid data for TikTok." / "Paid results come from Meta Ads, which covers Instagram and Facebook." |
| 새 계정(`#state=empty`) | Stats 전부 0 / Engagement "—". 차트 빈 상태 "Nothing to chart yet." / "Publish your first post and its views, likes and comments will be tracked here." 목록 빈 상태 "No published posts yet." / "Posts you publish will be listed here with their views, likes and comments." |
| 기간에 글 없음(`#state=range-empty`) | 차트·목록 빈 상태 모두 "No posts in this date range." / "Try a longer date range." |
| 필터 결과 없음 (기간 전체) | 차트·목록 빈 상태 "No {organic/paid} {Type} posts on {Platform} in this date range." / "Try another date range or clear a filter." 예: "No organic Multi-Image posts on REDnote in this date range." Sort 숨김 |
| 필터 결과 없음 (Published 주/월 선택) | 목록 빈 상태 "No Carousel posts on REDnote published Sep 15 – Sep 21." / "Try another week or clear a filter."(월이면 month) |

---

## 3. Figma로 만들 프레임 목록

> 진행 상황과 최종 프레임 목록은 [checklist.md](checklist.md)가 기준이다(필터 결과 없음 케이스가 2개로 나뉘어 P9·P10, 차트 호버가 P11). 토큰·컴포넌트 대조는 [phase0-audit.md](phase0-audit.md).

인덱스의 10개 케이스 + 케이스 안에서 생기는 상태. ★ = 인덱스에 있는 케이스. 이름은 기존 Figma 규칙("화면 · 상태")을 따른다.

### Analytics
| # | 프레임 이름 | 출처 | 캡처 |
|---|---|---|---|
| A1 ★ | Analytics · default (30 days) | `analytics.html` | a01 |
| A2 ★ | Analytics · custom period | `?period=custom` | a02 |
| A2-1 | Analytics · custom — date picker (days) | 시작일 칸 클릭 | a02b |
| A2-2 | Analytics · custom — date picker (month) | 종료일 칸 → 제목 클릭 | a02c |
| A3 ★ | Analytics · empty — new account | `#state=empty` | a03 |
| A4 ★ | Analytics · empty — no posts in range | `#state=range-empty` | a04 |
| A5 ★ | Analytics · deep link — Top Paid Content | `?period=30d#top-paid` (스크롤 위치 + 링) | a01 참고 |
| A6 ★ | Analytics · deep link — Top Organic Posts | `?period=30d#top-organic` | a01 참고 |
| A7 | Analytics · Published Mix — Type tab | Type 탭 | a07 |
| A8 | Analytics · Content Performance — row expanded | Instagram 펼침 | a08 |
| A9 | Analytics · Content Performance — by content type, expanded | By content type + Video 펼침 | a09 |
| A10 | Analytics · Top Organic — Platform filter open | 필터 열림 | a10 |
| A11 | Analytics · Top Organic — filters applied | REDnote + Engagement Rate | a11 |
| (선택) | Analytics · 90 days / All time | 막대 13개 / 12개 | a05, a06 |

- A5·A6는 화면 전체를 다시 그리지 않아도 된다. 1920×1162 뷰포트에서 해당 섹션이 위에 오도록 스크롤한 모습 + 카드 링만 표시하는 프레임으로 충분하다.
- A2-1·A2-2·A10·A11은 전체 화면 대신 해당 영역만 잘라 그린 조각 프레임으로 해도 된다(기존 "Filters · Platform open" 프레임 방식).

### Post Performance
| # | 프레임 이름 | 출처 | 캡처 |
|---|---|---|---|
| P1 ★ | Post Performance · organic (drill-down) | `posts.html?view=organic&period=30d` | p01 |
| P2 ★ | Post Performance · from a bar (Instagram · Sep 8–14) | `?platform=Instagram&bucket=0` | p02 |
| P3 ★ | Post Performance · Paid — Meta Ads not connected | `?view=paid` | p03 |
| P4 ★ | Post Performance · Paid — Meta Ads connected | `?view=paid&ads=connected` | p04 |
| P4-1 | Post Performance · Paid — CPL tab | P4 + CPL 탭 | p05 |
| P5 | Post Performance · empty — new account | `#state=empty` | p06 |
| P6 | Post Performance · empty — no posts in range | `#state=range-empty` | p07 |
| P7 | Post Performance · Sort open | Sort by 열림 | p08 |
| P8 | Post Performance · Paid — non-Meta platform | `&platform=TikTok` | p09 |
| P9 | Post Performance · no results for filters | REDnote + Carousel + 주 | p10 |
| P10 | Post Performance · chart hover tooltip | 선 차트 호버 (조각 프레임) | — |

### 케이스별 주요 값
| 케이스 | 값 |
|---|---|
| A1 | KPI 66 / Sep 8 – Oct 12 · 2.1M / 32.5K per post · 156.5K / 2.4K per post · 7.5% |
| A2 | KPI 67 / Sep 11 – Oct 11, 날짜 11/09/2026 – 11/10/2026, Mix: Instagram 18 · TikTok 25 · Facebook 8 · REDnote 4 · LinkedIn 12 |
| A3 | KPI 0 · 0 / "—" · 0 / "—" · "—", 페이지 빈 상태(Default 크기, 차트 아이콘) "No published posts yet" / "Publish your first post to see how your content performs." + Primary "+ New Content", 아래 Meta Ads Performance만 남음 |
| A4 | KPI 0 · 0 / "—" · 0 / "—" · "—", 섹션 빈 상태: Over Time "No posts published in this date range." · Mix "Nothing to break down in this date range." (둘 다 "Try a longer date range.") · Performance "No performance data for this date range." / "Views, likes and comments show up once posts in this range are live." · Organic "No organic posts in this date range." 탭과 insight 숨김 |
| All time (선택) | 막대 Nov–Oct 12개, Mix 합계 423 |
| P1 | Stats 66 · 2.1M · 156.5K · 5.2K · 7.5%, 차트 2.1M |
| P2 | Stats 4 · 93.1K · 7.4K · 282 · 8.3%, 차트 합계 554.9K + Sep 8 – Sep 14 띠, 필터 pill 2개(Platform Instagram, Published Sep 8 – Sep 14) |
| P4 | Stats 10 · 289.7K · $2.3K · 166 · $14.01, 목록 10개 + Spend·CPL 열 |
| P4-1 | 차트 "$14.01" / "Average CPL · Sep 8 – Oct 12", y축 $0–$40 |

---

## 4. 컴포넌트 매핑

### 4-1. 이미 있는 컴포넌트 (인스턴스로 사용)
| HTML | Figma |
|---|---|
| `.sidebar` | Nav / Navigation (State=expanded), Nav / Item Active=Analytics |
| `.app-topbar` | Nav / App TopBar (Post Performance는 경로 2단) |
| `.stats-summary` | Stats summary (5칸은 아래 4-3 참고) |
| `.trends-section-header` (+ `__badge`) | Trends / Section Header (Show badge, Show description) |
| `.segment-chip` (기간) | Segment Chip `2131:1321` |
| `.controls-segmented-control` / `.controls-segment-chip` (탭) | Segmented Control (controls-misc). Figma 이름 확인 필요 |
| `.filter-select` / `--active` | Controls / Filter / Select `3544:1796` (Inactive / Active) |
| `.context-menu--option-list` / `.menu-option` | Controls / Context Menu `5478:111500` + Menu / Option detail `5478:3046` |
| `.input-field--date` | Input `1956:51741` (date, sm, calendar icon) |
| `.date-picker` | Date Picker `12624:11616` (Time=Without time, View=Days / Month) |
| `.feedback-status-chip--green / --blue / --secondary` | Feedback / Status Chip `5004:126953` |
| `.text-btn` | Actions / Text Button |
| `.actions-btn--primary` | Actions / Button Style=Primary |
| `.empty-state` (페이지) / `.empty-state--section` + `.empty-state-panel` | empty-state `8479:135684` (Default / Compact) |
| `.sc-list` / `.sc-list-row` / `.sc-list-colhead` | Schedule / List Row `9137:132233`, Column Head `9137:132243` |
| `.editor-tooltip` | Editor 툴팁 ("08 Editor" `1124:10672`) |
| icon / social / * | Instagram, TikTok, Facebook, LinkedIn (REDnote 아이콘 없음) |

### 4-2. 새로 그려야 하는 것 (Figma에 컴포넌트 없음)
| 조각 | 메모 |
|---|---|
| Period row (트랙 + Custom 날짜 행) | `12595:252769`를 재사용하거나 컴포넌트로 승격 |
| Stacked column chart | 열 = 합계 / 막대(조각 5개) / 날짜. 열 개수 5·12·13 대응 |
| Platform legend | 점 8 + 이름 |
| Horizontal bar list (Mix · Platform) | 행 = 라벨 / 트랙 / 값 + 하단 합계 |
| Donut + legend (Mix · Type) | 예전 Content mix 카드 재사용, 범례 값 "36 · 55%" 형식, 0건 행 스타일 |
| Content Performance 행 | 그룹 행 / 하위 행 / 열 머리 (Schedule List Row 기반 변형) |
| Pulse insight 배너 | sparkle + 한 줄 문구 |
| Top post row | 예전 Top forecast performers 행 + 지표 3칸(Views / Likes / Comments) |
| Line chart card | 합계 / 라벨 + 격자 · 선 · 영역 · 선택 띠 · 호버 가이드 |
| Posts 표 행 | 썸네일 40 + 제목 / 날짜 / 칩 / 숫자 열 (+ Spend · CPL) |

### 4-3. 기존 컴포넌트에서 맞춰야 할 것
- **Stats summary**: Figma는 최대 4칸(Show 4th item)이다. Post Performance는 **5칸**이 필요하다 → 5th item 속성을 추가하거나, 화면에서만 분리해 그려야 함
- **Stats summary 캡션**: Analytics 1번째 칸 캡션이 기간 라벨("Sep 8 – Oct 12")이다. Post Performance는 캡션이 없다(Show sublabel off)
- **Trends / Section Header 배지**: "Integration Pending"(brand-primary-light / brand-primary)

---

## 5. 확인 항목 처리 결과 (2026-10-12)
1. 헤더 설명과 렌더 KPI → **게시물 성과로 교체** (설명 + Published Posts · Total views · Total likes · Avg engagement)
2. Top Paid의 "View all →" → **빈 상태에서 숨김**
3. Rank by Engagement Rate 값이 안 보임 → **Top Organic 행 지표를 4칸으로**(Engagement 추가)
4. Paid 미연결 화면의 차트 안내 문구 → **차트가 없으면 안내 문구 제거**
5. Paid + TikTok에서 지표 탭이 보임 → **차트가 없으면 탭 숨김**
6. 필터 결과 없음 문구 → **"No Carousel posts on REDnote published Sep 15 – Sep 21." 형식**, 차트 빈 상태도 필터 반영
7. Paid Stats 아이콘 중복 → **Leads = circle-user-round, CPL = target**
8. REDnote 아이콘 → **점 유지**. Figma에서는 다른 소셜 아이콘과 같은 20×20 프레임 안에 점을 넣어 두고, 나중에 사용자가 직접 아이콘으로 교체
9. 제목 "· Part n" → **제거**. placeholder 제목을 40개로 늘림(나중에 실제 콘텐츠 제목으로 바뀜)
10. 선 차트 합계(기간 전체)와 Stats(구간 필터 적용)가 다름 → 의도된 설계. Figma 동작 메모에 적는다

---

## v2

Analytics v2(analytics/v2/) 핸드오프는 [v2.md](v2.md) 참고 — Figma 섹션 `12778:491203`.
