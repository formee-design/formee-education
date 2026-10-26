# HR Tool — 화면 시안 (prototypes/hr-tool)

HR Tool 제품의 HTML 화면을 두는 폴더입니다. 여기 올린 파일은 GitHub Pages에서 바로 볼 수 있습니다.

- 사이트: https://yjkim9627-gif.github.io/formee-education/
- 이 폴더 주소: https://yjkim9627-gif.github.io/formee-education/prototypes/hr-tool/파일이름.html

## 폴더 규칙

| 무엇 | 어디에 |
|---|---|
| HR Tool 화면 시안 (페이지) | `prototypes/hr-tool/` ← 이 폴더 |
| HR Tool 전용 컴포넌트 | `components/hr-tool/` (이미 컴포넌트 14개가 있어요) |
| 여러 제품 공통 컴포넌트 | `components/shared/` |
| 디자인 토큰 (색 · 간격 · 글자) | `tokens/tokens.css` |

- 화면이 많으면 하위 폴더로 나눠도 됩니다. 예: `prototypes/hr-tool/recruiting/`, `prototypes/hr-tool/onboarding/`
- 다른 제품 폴더(`ai-social-media` 등)는 수정하지 말아 주세요.

## 경로 (링크가 깨지지 않게)

HTML 안의 CSS · 이미지 · 다른 페이지 링크는 **상대 경로**로 씁니다. 이 폴더 기준으로는:

```html
<link rel="stylesheet" href="../../tokens/tokens.css">
<link rel="stylesheet" href="../../components/hr-tool/form-field.css">
<img src="assets/sample.png" alt="">  <!-- prototypes/hr-tool/assets/ 에 둔 이미지 -->
```

하위 폴더에 넣으면 `../`가 하나 더 붙습니다 (예: `../../../tokens/tokens.css`).
내 컴퓨터 전용 경로(`C:\...`, `/Users/...`)나 `file://`은 사이트에서 열리지 않습니다.

## 올리는 순서

1. 작업 전에 항상 최신 버전 받기: `git pull`
2. 파일을 이 폴더에 넣기
3. 커밋 · 푸시: `git add prototypes/hr-tool` → `git commit -m "HR Tool: ..."` → `git push`
4. 1~2분 뒤 사이트에서 확인
5. 첫 페이지(인덱스) 목록에 추가하고 싶으면 예진님께 파일 이름을 알려 주세요 (`index.html`은 여럿이 같이 고치는 파일이라 충돌 방지)

## 주의

- 이 사이트는 **링크만 있으면 누구나 볼 수 있습니다.** 실제 직원 이름 · 연락처 · 급여 같은 정보는 넣지 말고 샘플 데이터로 만들어 주세요.
