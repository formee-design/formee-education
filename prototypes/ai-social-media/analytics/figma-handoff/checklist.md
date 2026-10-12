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

## 재구성 — 실제 핸드오프 파일 형식 (2026-10-12)
레퍼런스: Trends_to be_261008 (`12427:415571`), Dashboard_to_be_1008 (`12427:416857`)

new 섹션 구성
| 하위 섹션 | 그룹(흰 섹션) | 프레임 |
|---|---|---|
| 00_Overview | — | 핸드오프 노트 카드(보는 순서 · 진입 경로 · 데이터 원칙 · 기간 · 동작 · 빈 상태 · 컴포넌트 · 토큰 예외) |
| 01_Analytics | analytics · states | A1, H1 hover, A7, A8, A9, A10, A11 |
| | period · states | A2, A2-1, A2-2, 90 days, All time |
| | empty states | A3, A4 |
| | deep links (from Home) | A5, A6 |
| 02_Post Performance | post performance · states | P1, P2, D1, D2, D3, P7, P11 |
| | paid · Meta Ads | P3, P4, P4-1, P8 |
| | empty states · no results | P5, P6, P9, P10 |
| 03_Edge cases | data edges | E1, E2, E3 |
| 04_Drill-down → Post Performance | drill-down | Analytics 복제본(클릭 지점 빨간 테두리) → 도착 화면 복제본, 화살표 6개 |

- 하위 섹션마다 검은 Notes(화면 규칙), 프레임마다 검은 Notes(케이스 · URL · 동작), 빨간 테두리 = 상호작용 지점 — 레퍼런스와 같은 방식
- Component 섹션은 new 섹션 아래로 옮김. 넣어주신 Date Picker 원본 3개는 Component 섹션(썸네일 아래)으로 옮김

이번에 새로 찾아 추가한 케이스
| # | 프레임 | Figma ID | 진입 |
|---|---|---|---|
| H1 | Analytics · hover states | 12729:262221 | 막대 조각 · Mix 행 · 성과 표 행 호버 |
| D1 | Post Performance · drill-down — platform | 12726:260435 | `posts.html?period=30d&platform=TikTok` |
| D2 | Post Performance · drill-down — content type | 12726:261543 | `posts.html?period=30d&type=Video` |
| D3 | Post Performance · drill-down — platform + type | 12726:262651 | `posts.html?period=30d&platform=Instagram&type=Video` |
| E1 | Analytics · custom 7 days | 12724:259949 | `analytics.html?period=custom&from=2026-10-06&to=2026-10-12` (일 단위 막대, 0건 플랫폼, Best —) |
| E2 | Top Organic — platform with no posts | 12729:262134 | E1 + Platform = REDnote |
| E3 | Published Mix — Type with a 0% type | 12729:262177 | `analytics.html?period=custom&from=2026-10-10&to=2026-10-12` → Type |
- Perf Row 컴포넌트에 'Show best chip' / 'Show no-best dash' 옵션 추가 (Best가 없는 그룹용)

HTML에 정의가 없어 그리지 못한 것 (디자인 결정 필요)
1. Loading 상태 (Analytics · Post Performance) — Trends/Home 핸드오프에는 loading 프레임이 있음
2. Error / 데이터 불러오기 실패 상태
3. 플랫폼 계정 미연결 상태 (지금 HTML은 모든 플랫폼이 연결된 것으로 가정)
4. Analytics의 Top Paid Content · Meta Ads Performance 연결 후 화면 (Post Performance만 `ads=connected` 미리보기가 있음)

## 다음 작업 (TODO) — Figma `00_Overview` 맨 위 'Notes · 다음 작업'과 같은 내용
[디자인 결정 필요 · HTML에 정의 없음]
1. 로딩 상태 (Analytics · Post Performance) — Trends / Home 핸드오프의 loading 프레임 참고
2. 에러 / 데이터 불러오기 실패 상태
3. 플랫폼 계정 미연결 상태 (지금은 모든 플랫폼 연결 가정)
4. Meta Ads 연결 후 Analytics 화면 — Top Paid Content · Meta Ads Performance
5. CPL 선 그래프에서 리드가 없는 날: 이어서 그릴지 / 끊어서 그릴지

[그릴 화면]
6. E4 Analytics · 글이 0인 날·주가 있는 기간 (빈 막대 칸, 합계 '0')
7. E5 Post Performance · 데이터가 드문 기간 (0 구간이 있는 선 그래프 + CPL 빈 날, 툴팁 '0 views')

[확인 · 교체]
8. REDnote 로고 아이콘 교체 (icon / social / rednote placeholder)
9. Likes 아이콘 — 라이브러리에 외곽선 하트가 없어 채워진 하트 사용 중

→ 결정되면 HTML(analytics.html · posts.html)에 먼저 반영 → Figma 케이스 추가 → 이 체크리스트 업데이트

참고 — 업로드가 없는 날의 현재 HTML 동작 (03_Edge cases 'Notes · 업로드가 없는 날')
- Published Posts Over Time(막대): 0인 날·주는 막대 없이 합계 '0'과 날짜만, 클릭할 조각 없음
- Performance Over Time(선 · Views/Likes/Comments): 0 기준선까지 내려감, 툴팁 'Oct 3 · 0 views'
- Performance Over Time(CPL): 리드가 없는 날은 점 없음, 앞뒤 점이 이어짐, 툴팁 안 뜸
