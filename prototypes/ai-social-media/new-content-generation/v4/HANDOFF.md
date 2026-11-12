# New Content v4 — 작업 인수인계 (HANDOFF)

대상 파일: `new-content-to-generate.html` (같은 폴더)
Figma: `N8AXYZVtz82rgHcCRHKzEl` (FME_AI-Social-Media)
관련 커밋: `340205a`, `641904c` (main)

> 다른 PC에서 이어서 작업할 때 이 문서를 먼저 읽는다. 아래 "확인 필요" 항목은 디자이너 확인 전까지 임시 판단으로 구현된 부분이다.

---

## 1. 작업 내역

### 사이드바 (`340205a`)
- 좌측 전체 사이드바를 `.nav.nav--brand-switch`(로고 + 브랜드 드롭다운)로 교체. 컴포넌트: `components/ai-social-media/nav-brand-switch.{css,js}`, `nav.css`, `brand-logo-tile.css`, `brand-mark.css`.
- 스크립트 태그에 `data-test-panel="off"` → 전환 테스트 패널/localStorage 비활성, `data-variant="logo"` 고정.
- 단계 전환 시 `setNavCollapsed(idx !== 0)`.

### Video · Brief & Style / Generate Script (`340205a`, `641904c`)
- 모델 칩(Seedance 2.5) → 드롭다운 메뉴(Figma 14148:298300). `#videoModelChipWrap`, `#modelPopover`, `selectVideoModel()`. 컴포넌트: `controls-menu.css` / `controls-menu.html`의 `Menu / Item Type=Model`.
- Script 탭: 설정 칩 줄(모델·9:16·길이·화질·Character·Voiceover + Est. credits), 단어 리밋(`getMaxScriptWords()` = round(길이/8*15) → 8s 15 · 16s 30 · 24s 45), Brand Kit 요약 한 줄, 오류 상태(빨간 보더).

### Video · Timeline & Video (`641904c`)
- 영상 **1개** 기준으로 재설계 (클립/Combine 없음). 타일 배지 "Video · 0:00-0:16".
- 상태머신 `window.__videoStage`: idle → draft-generating → draft-ready → final-generating → final-ready.
- 썸네일 생성 후 설정 칩 잠금(`.setting-chip--locked` + `data-tip` 툴팁), 탭 ✓.
- Draft 480p → "Generate final" 모달(HD 720p ⚡40 / Full HD 1080p ⚡90, 560×466) → 최종 렌더링 → "Your Video is ready"(720p는 "Upgrade to 1080p ⚡90").
- 화질 크레딧(8초당): 480p 10 / 720p 20 / 1080p 45.
- 컴포넌트: `modal-generate-final.{css,html}` 신규, `shared/button.css`에 `.btn-credits`, 아이콘 `cpu`, `zap-white`, `circle-check-neutral`, `user-round`.
- 모든 컴포넌트 페이지 사이드바에 "Modal / Generate final" 추가.

### Image post · Step 2 Generate (`641904c`)
- 칩 줄: Nano Banana · HD · 비율 · 버전 수 · Character · Est. credits.
- 탭 ✓/칩 잠금, "Text · Graphics placement" 라벨, Regenerate ⚡1, 하단 "Confirm & Generate N Versions", 메타 "Image post · 4:5".

### Carousel · Step 2 Generate (`641904c`)
- 칩 줄: Nano Banana · HD · 비율 · "N Cards" · Character · Est. credits.
- Script 이후엔 비율·카드 수만 잠금, "Continue to Storyboard", 카드 textarea 46px.
- 프리뷰 그리드는 2~6장 모두 3열(16171:447791 QA 노트), 소제목/카드 탭/하단 바는 실제 카드 수 기준.

---

## 2. 확인 필요 (디자이너 확인 전 임시 판단)

1. **Timeline default 칩 줄 중복** — 12480:221852 프레임 본문에 칩 줄이 한 번 더 있음(실수로 추정). 한 줄만 구현.
2. **Image Preview 요약 카드** — Figma에 Quality "Seedance 2.5", Duration "16s" 등 영상용 값이 들어 있음. 이미지용 기존 구성 유지.
3. **Brand Kit 컬러 라벨** — Image Figma "Primary" vs 영상 "3 selected". 영상 기준으로 통일.
4. **잠기는 칩 범위** — Image는 5개 전부, Carousel은 Storyboard부터 비율·카드 수만. Figma 그대로인데 의도가 맞는지.
5. **Duration 팝오버** — 레이어명 "32"/텍스트 "30 seconds". 30초로 구현했고 단어 한도는 56(Figma 노트는 32초 60). 어느 쪽이 맞는지.
6. **Character 칩 값** — 캐릭터 미선택 시 "Character · None"(Figma 예시는 "Elena").
7. **하단 버튼 문구** — Timeline/Video 단계 Figma는 "Continue", 구현은 "Continue to timeline" 유지.
8. **Image/Carousel 비율 변형 예시**(9:16, 1:1 등) — 화면별 1:1 대조 안 함. 별도 확인 필요.
9. **Voice Section 상태 7종**(Collapsed·Playing·Over limit 등) — 기존 구현 유지, Figma와 상태별 대조 안 함.
10. **Video 하단 메타 오타** — Figma 일부 "Video · 9:16 · 16s"가 남아 있음(복붙 오류 추정). Image는 "Image post · 4:5"로 구현.

### 그 외 인지해 둘 사항 (코드 쪽)
- AI 대화 카피를 Figma의 "영상 1개" 문구로 교체함(예: "Your 16s script is ready — up to 30 narration words…"). 기존 채팅창은 그대로 유지하라는 요청과 부딪힐 수 있음.
- 잠금 칩 툴팁 문구는 직접 작성("Locked once the thumbnail is generated — go back to Script to change it.").
- `Draft·480p` 생성 중 문구("Rendering your draft · 480p…")와 720p/1080p 직행(초안 없음) 흐름은 Figma 노트 기반 추정. Upgrade to 1080p는 새 최종 렌더로 처리.
- 모델 드롭다운은 라벨만 바뀜(모델별 길이/해상도 제약 없음).
- 구 멀티클립 DOM을 참조하는 `regenerateAllScenesFromChat`, `addSceneFromChat`는 죽은 코드일 수 있음.
- 파란 선 + 노트는 구현 대상 아님(합의됨).
- Image/Carousel 모델·화질 칩(Nano Banana, HD)은 표시 전용(Brief에 선택 UI 없음).

---

## 3. 로컬 이어서 작업

```bash
git pull --rebase origin main
python3 -m http.server 8743   # repo 루트에서
# http://localhost:8743/prototypes/ai-social-media/new-content-generation/v4/new-content-to-generate.html
```

- 커밋 제외: `.claude/`, `.codex/`, `AGENTS.md`, `*.bundled.html`, `*.zip`. `git add -A` 금지.
- 하드코딩 금지 — `tokens/tokens.css` 변수 사용(Figma 스케일 밖 px는 주석과 함께 리터럴).
