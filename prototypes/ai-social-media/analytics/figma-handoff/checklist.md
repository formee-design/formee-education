# Analytics Figma 이관 체크리스트

Figma `N8AXYZVtz82rgHcCRHKzEl` · 화면은 섹션 **new** `12616:521591` · 새 컴포넌트는 섹션 **Component** `12617:521623`
상태: ⬜ 안 함 · 🟦 그림 · ✅ 검증 통과 · 👍 사용자 승인
검증 = ① 문구·숫자 대조(HTML 텍스트와 비교) ② 토큰 검사(변수 미연결 색 0, 텍스트 스타일 없는 글자 0, detach 0) ③ HTML 캡처와 나란히 보기

| 단계 | 상태 |
|---|---|
| 0 준비: 토큰·컴포넌트 대조, 배치 계획, 체크리스트 | ✅ (phase0-audit.md) |
| 1 새 컴포넌트 + Stats summary 5칸 | ✅ (토큰 검사 0건) |
| 2 기준 화면 2장 | ✅ (A1·P1 문구 대조 일치, 토큰 검사 0건) |
| 3a–3e 케이스 | ✅ (HTML에서 뽑은 데이터로 생성, 화면 대조, 토큰 검사 0건) |
| 4 핸드오프 정리(라벨·동작 메모·흐름) | ✅ |

## 1단계 · 컴포넌트
| # | 컴포넌트 | Figma ID | 상태 |
|---|---|---|---|
| S5 | Stats summary — Show 5th item + Value/Label/Icon/Sublabel 5 (기존 `11530:112377` 수정) | 11530:112377 (Show 5th item 추가, 모든 칸 FILL) | ✅ |
| TB | Nav / App TopBar — 2단 경로 지원 확인 | 수정 불필요 — Breadcrumb 속성 Parent › Current 사용 | ✅ |
| C1 | Analytics / Period Row | 삭제 — 기간 행는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C2 | Analytics / Chart Legend Item | 삭제 — 범례는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C3 | Analytics / Bar Segment | 삭제 — 막대 조각는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C4 | Analytics / HBar Row | 삭제 — 가로 막대 채움는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C5 | Analytics / Donut Legend Row | 삭제 — 도넛 범례 행는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C6 | Analytics / Perf Table Head | 12684:252150 | ✅ |
| C7 | Analytics / Perf Row | 12684:252323 (+ Analytics / Series Dot 12684:252149) | ✅ |
| C8 | Analytics / Insight Banner | 삭제 — insight 배너는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C9 | Analytics / Top Post Row | 12683:252228 | ✅ |
| C10 | Analytics / Posts Table Head | 12687:252209 | ✅ |
| C11 | Analytics / Posts Row | 12687:252294 | ✅ |
| C12 | Analytics / Empty Panel | 삭제 — 섹션 빈 상태 패널는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C13 | Analytics / Line Chart Marker | 삭제 — 차트 호버 표시는 기존 인스턴스 + 프레임으로 구성 | ➖ |
| C14 | icon / social / rednote (placeholder) | 12681:252130 | ✅ |

## 2·3단계 · 화면 (★ = 인덱스 케이스)
| # | 프레임 | 진입 URL (analytics/ 기준) | 캡처 | 단계 | Figma ID | 상태 |
|---|---|---|---|---|---|---|
| A1 ★ | Analytics · default (30 days) | `analytics.html` | a01 | 2 | 12693:252234 | ✅ |
| A2 ★ | Analytics · custom period | `?period=custom` | a02 | 3a | 12701:253347 | ✅ |
| A2-1 | Analytics · custom — date picker (days) | 시작일 클릭 | a02b | 3a | 12704:586486 | ✅ |
| A2-2 | Analytics · custom — date picker (month) | 종료일 → 제목 클릭 | a02c | 3a | 12704:586653 | ✅ |
| A2-3 | Analytics · 90 days | `?period=90d` | a05 | 3a | 12704:253851 | ✅ |
| A2-4 | Analytics · All time | `?period=all` | a06 | 3a | 12704:254601 | ✅ |
| A3 ★ | Analytics · empty — new account | `#state=empty` | a03 | 3b | 12705:255040 | ✅ |
| A4 ★ | Analytics · empty — no posts in range | `#state=range-empty` | a04 | 3b | 12705:255415 | ✅ |
| A5 ★ | Analytics · deep link — Top Paid Content | `?period=30d#top-paid` | a01 | 3b | 12706:255579 | ✅ |
| A6 ★ | Analytics · deep link — Top Organic Posts | `?period=30d#top-organic` | a01 | 3b | 12706:256111 | ✅ |
| A7 | Analytics · Published Mix — Type tab | Type 탭 | a07 | 3c | 12708:256545 | ✅ |
| A8 | Analytics · Content Performance — row expanded | Instagram 펼침 | a08 | 3c | 12708:256648 | ✅ |
| A9 | Analytics · Content Performance — by content type, expanded | By content type + Video 펼침 | a09 | 3c | 12708:256907 | ✅ |
| A10 | Analytics · Top Organic — Platform filter open | 필터 열림 | a10 | 3c | 12708:257311 | ✅ |
| A11 | Analytics · Top Organic — filters applied | REDnote + Engagement Rate | a11 | 3c | 12708:257388 | ✅ |
| P1 ★ | Post Performance · organic (drill-down) | `posts.html?view=organic&period=30d` | p01 | 2 | 12698:252717 | ✅ |
| P2 ★ | Post Performance · from a bar (Instagram · Sep 8–14) | `posts.html?period=30d&platform=Instagram&bucket=0` | p02 | 3d | 12713:257162 | ✅ |
| P3 ★ | Post Performance · Paid — Meta Ads not connected | `posts.html?view=paid&period=30d` | p03 | 3d | 12713:257984 | ✅ |
| P4 ★ | Post Performance · Paid — Meta Ads connected | `posts.html?view=paid&period=30d&ads=connected` | p04 | 3d | 12713:258317 | ✅ |
| P4-1 | Post Performance · Paid — CPL tab | P4 + CPL 탭 | p05 | 3d | 12714:258201 | ✅ |
| P5 | Post Performance · empty — new account | `posts.html?period=30d#state=empty` | p06 | 3e | 12714:259179 | ✅ |
| P6 | Post Performance · empty — no posts in range | `posts.html?period=30d#state=range-empty` | p07 | 3e | 12714:259534 | ✅ |
| P7 | Post Performance · Sort open | Sort by 열림 | p08 | 3e | 12716:259965 | ✅ |
| P8 | Post Performance · Paid — non-Meta platform | `…&ads=connected&platform=TikTok` | p09 | 3e | 12714:259889 | ✅ |
| P9 | Post Performance · no results — week filter | `posts.html?period=30d&platform=REDnote&type=Carousel&bucket=1` | p10 | 3e | 12714:260228 | ✅ |
| P10 | Post Performance · no results — filters | `posts.html?period=all&view=organic&platform=REDnote&type=Multi-Image%20Post` | p11 | 3e | 12714:260604 | ✅ |
| P11 | Post Performance · chart hover tooltip (조각) | 선 차트 호버 | — | 3e | 12716:260423 | ✅ |

## 4단계 · 핸드오프 정리
| 항목 | 상태 |
|---|---|
| 줄 제목 4개 (01 Analytics 화면 / 02 상태 조각 / 03 Post Performance 화면 / 04 상태 조각) | ✅ |
| 프레임마다 라벨: 케이스 이름 · URL · 진입 경로 | ✅ |
| 동작 메모: 기간 선택, Custom·Apply, 막대·Mix·표 클릭 이동, 표 펼침, 필터, 선 차트 호버·클릭, Show more, 딥링크 링 | ✅ (각 프레임 라벨 + 핸드오프 노트 카드 12718:260124) |
| 화면 간 흐름 (Analytics → Post Performance 진입 5곳, Home → 딥링크) | ✅ 디자인 파일에는 연결선 도구가 없어 라벨·노트에 진입 경로로 기록 |
| 공통 규칙 노트 (데이터 원칙, Paid 정의, Meta Ads 범위, 날짜 형식) | ✅ |
| 최종 전체 검증 리포트 | ✅ |

## 작업 메모 (2026-10-12)
- 화면 27개 + 상태 조각 + 라벨 27개 + 핸드오프 노트 카드가 new 섹션에 4줄로 배치됨. 짧은 화면은 최소 높이 1162
- 썸네일 이미지 7장을 업로드해 Component 섹션의 `Analytics / Thumbnail assets` 프레임에 보관
- new 섹션이 길어져 Component 섹션을 그 아래로 옮겼고, 상위 섹션 Analytics_to be도 늘림
- 넣어주신 Date Picker 원본 3개는 90 days 프레임과 겹쳐서 04줄 오른쪽(x 8400, y 7600)으로 옮김. A2-1·A2-2는 복제본 사용
- 사용자 확인 대기(👍): 전체 화면 검토
- 2026-10-12 사용자 피드백 반영: 꼭 필요한 컴포넌트만 남김. Period Row · Chart Legend Item · Bar Segment · HBar Fill · Donut Legend Row · Insight Banner · Empty Panel · Line Chart Marker 8개 삭제(화면의 인스턴스 340개는 일반 프레임으로 바꿈, 안쪽의 Segmented Control · Input(Date) · Button · empty-state · 툴팁은 기존 컴포넌트 인스턴스 그대로). 남은 신규 컴포넌트: Perf Table Head · Perf Row · Series Dot · Top Post Row · Posts Table Head · Posts Row · rednote placeholder. 토큰 검사 0건 유지
