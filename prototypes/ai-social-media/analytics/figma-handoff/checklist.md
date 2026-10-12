# Analytics Figma 이관 체크리스트

Figma `N8AXYZVtz82rgHcCRHKzEl` · 화면은 섹션 **new** `12616:521591` · 새 컴포넌트는 섹션 **Component** `12617:521623`
상태: ⬜ 안 함 · 🟦 그림 · ✅ 검증 통과 · 👍 사용자 승인
검증 = ① 문구·숫자 대조(HTML 텍스트와 비교) ② 토큰 검사(변수 미연결 색 0, 텍스트 스타일 없는 글자 0, detach 0) ③ HTML 캡처와 나란히 보기

| 단계 | 상태 |
|---|---|
| 0 준비: 토큰·컴포넌트 대조, 배치 계획, 체크리스트 | ✅ (phase0-audit.md) |
| 1 새 컴포넌트 + Stats summary 5칸 | ⬜ |
| 2 기준 화면 2장 | ⬜ |
| 3a–3e 케이스 | ⬜ |
| 4 핸드오프 정리(라벨·동작 메모·흐름) | ⬜ |

## 1단계 · 컴포넌트
| # | 컴포넌트 | Figma ID | 상태 |
|---|---|---|---|
| S5 | Stats summary — Show 5th item + Value/Label/Icon/Sublabel 5 (기존 `11530:112377` 수정) | | ⬜ |
| TB | Nav / App TopBar — 2단 경로 지원 확인 | | ⬜ |
| C1 | Analytics / Period Row | | ⬜ |
| C2 | Analytics / Chart Legend Item | | ⬜ |
| C3 | Analytics / Bar Segment | | ⬜ |
| C4 | Analytics / HBar Row | | ⬜ |
| C5 | Analytics / Donut Legend Row | | ⬜ |
| C6 | Analytics / Perf Table Head | | ⬜ |
| C7 | Analytics / Perf Row | | ⬜ |
| C8 | Analytics / Insight Banner | | ⬜ |
| C9 | Analytics / Top Post Row | | ⬜ |
| C10 | Analytics / Posts Table Head | | ⬜ |
| C11 | Analytics / Posts Row | | ⬜ |
| C12 | Analytics / Empty Panel | | ⬜ |
| C13 | Analytics / Line Chart Marker | | ⬜ |
| C14 | icon / social / rednote (placeholder) | | ⬜ |

## 2·3단계 · 화면 (★ = 인덱스 케이스)
| # | 프레임 | 진입 URL (analytics/ 기준) | 캡처 | 단계 | Figma ID | 상태 |
|---|---|---|---|---|---|---|
| A1 ★ | Analytics · default (30 days) | `analytics.html` | a01 | 2 | | ⬜ |
| A2 ★ | Analytics · custom period | `?period=custom` | a02 | 3a | | ⬜ |
| A2-1 | Analytics · custom — date picker (days) | 시작일 클릭 | a02b | 3a | | ⬜ |
| A2-2 | Analytics · custom — date picker (month) | 종료일 → 제목 클릭 | a02c | 3a | | ⬜ |
| A2-3 | Analytics · 90 days | `?period=90d` | a05 | 3a | | ⬜ |
| A2-4 | Analytics · All time | `?period=all` | a06 | 3a | | ⬜ |
| A3 ★ | Analytics · empty — new account | `#state=empty` | a03 | 3b | | ⬜ |
| A4 ★ | Analytics · empty — no posts in range | `#state=range-empty` | a04 | 3b | | ⬜ |
| A5 ★ | Analytics · deep link — Top Paid Content | `?period=30d#top-paid` | a01 | 3b | | ⬜ |
| A6 ★ | Analytics · deep link — Top Organic Posts | `?period=30d#top-organic` | a01 | 3b | | ⬜ |
| A7 | Analytics · Published Mix — Type tab | Type 탭 | a07 | 3c | | ⬜ |
| A8 | Analytics · Content Performance — row expanded | Instagram 펼침 | a08 | 3c | | ⬜ |
| A9 | Analytics · Content Performance — by content type, expanded | By content type + Video 펼침 | a09 | 3c | | ⬜ |
| A10 | Analytics · Top Organic — Platform filter open | 필터 열림 | a10 | 3c | | ⬜ |
| A11 | Analytics · Top Organic — filters applied | REDnote + Engagement Rate | a11 | 3c | | ⬜ |
| P1 ★ | Post Performance · organic (drill-down) | `posts.html?view=organic&period=30d` | p01 | 2 | | ⬜ |
| P2 ★ | Post Performance · from a bar (Instagram · Sep 8–14) | `posts.html?period=30d&platform=Instagram&bucket=0` | p02 | 3d | | ⬜ |
| P3 ★ | Post Performance · Paid — Meta Ads not connected | `posts.html?view=paid&period=30d` | p03 | 3d | | ⬜ |
| P4 ★ | Post Performance · Paid — Meta Ads connected | `posts.html?view=paid&period=30d&ads=connected` | p04 | 3d | | ⬜ |
| P4-1 | Post Performance · Paid — CPL tab | P4 + CPL 탭 | p05 | 3d | | ⬜ |
| P5 | Post Performance · empty — new account | `posts.html?period=30d#state=empty` | p06 | 3e | | ⬜ |
| P6 | Post Performance · empty — no posts in range | `posts.html?period=30d#state=range-empty` | p07 | 3e | | ⬜ |
| P7 | Post Performance · Sort open | Sort by 열림 | p08 | 3e | | ⬜ |
| P8 | Post Performance · Paid — non-Meta platform | `…&ads=connected&platform=TikTok` | p09 | 3e | | ⬜ |
| P9 | Post Performance · no results — week filter | `posts.html?period=30d&platform=REDnote&type=Carousel&bucket=1` | p10 | 3e | | ⬜ |
| P10 | Post Performance · no results — filters | `posts.html?period=all&view=organic&platform=REDnote&type=Multi-Image%20Post` | p11 | 3e | | ⬜ |
| P11 | Post Performance · chart hover tooltip (조각) | 선 차트 호버 | — | 3e | | ⬜ |

## 4단계 · 핸드오프 정리
| 항목 | 상태 |
|---|---|
| 줄 제목 4개 (01 Analytics 화면 / 02 상태 조각 / 03 Post Performance 화면 / 04 상태 조각) | ⬜ |
| 프레임마다 라벨: 케이스 이름 · URL · 진입 경로 | ⬜ |
| 동작 메모: 기간 선택, Custom·Apply, 막대·Mix·표 클릭 이동, 표 펼침, 필터, 선 차트 호버·클릭, Show more, 딥링크 링 | ⬜ |
| 화면 간 흐름 화살표 (Analytics → Post Performance 진입 5곳, Home → 딥링크) | ⬜ |
| 공통 규칙 노트 (데이터 원칙, Paid 정의, Meta Ads 범위, 날짜 형식) | ⬜ |
| 최종 전체 검증 리포트 | ⬜ |
