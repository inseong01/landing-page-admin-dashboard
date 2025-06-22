# 관리자 대시보드

[랜딩 페이지 프로젝트](https://github.com/inseong01/landing-page)의 관리자 페이지입니다. 랜딩 페이지를 관리하기 위해 개발되었습니다.

본 문서는 사용한 스택, 프로젝트 구조에 대해 설명합니다.

## 기술 스택

- React
- Typescript
- Tailwindcss
- Jotai
- Supabase

## 디렉터리 구조

### 개요

```
project-root/
├── src/
│   ├── assets/         # 전역으로 사용하는 이미지
│   ├── components/     # 전역으로 사용되는 공통 컴포넌트
│   ├── feature/        # 기능 별로 구분한 컴포넌트
│   ├── util/           # 전역으로 사용하는 공통 유틸
│   ├── App.tsx
│   ├── main.tsx
│   ├── not-found.tsx
│   └── styles.css
...
```

### /components

```
components/
└── <컴포넌트>/
    ├── assets    # <컴포넌트> 내에서 사용하는 이미지
    └── *.tsx     # <컴포넌트> 내에서 사용하는 공통 UI
```

- `/tab`
  - 카테고리 항목, 제목 및 탭 여닫는 컴포넌트

### /feature

```
feature/
└── <기능>/
    ├── assets/         # <기능> 디렉터리 내에서 사용하는 이미지
    ├── components/     # <기능> 디렉터리 내에서 사용하는 공통 컴포넌트
    ├── feature/        # <기능> 디렉터리 내에서 기능 별로 구분한 컴포넌트
    ├── util/           # <기능> 디렉터리 내에서 사용하는 공통 유틸
    └── *-index.tsx     # <기능> 디렉터리 메인 컴포넌트 파일
```

- `/chat`

  - `Supabase Realtime` 기반 방문자 채팅 관리 기능

- `/login`

  - `Supabase Auth` 기반 로그인 및 비밀번호 관리 기능

- `/sidebar`

  - 메인 페이지 관리자 기능 목록

### /util

```
util/
├── context/      # 전역에서 사용하는 컨텍스트
├── hook/         # 전역에서 사용하는 훅
├── store/        # 전역에서 사용하는 상태
└── supabase/     # Supabase client 생성
```

## 라우팅 구조

### main.tsx

```
<BrowserRouter>
  <Routes>
    {/* 메인 */}
    <Route path="/" element={<App />} />

    {/* 비밀번호 재설정 */}
    <Route path="reset/password" element={<ResetPasswordDisplay />} />

    {/* 예외처리 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## 메인 페이지 구조

### App.tsx

```
<ThemeContext.Provider value={theme}>
  <main>
    {/* 좌측 */}
    <SidebarDisplay />

    {/* 우측 */}
    <div>
      <SupbaseChannelSubscribe>
          <SupabaseChannelSubscribe>
            {CategoryUI ? <CategoryUI /> : <ErrorUI />}
          </SupabaseChannelSubscribe>
      </SupbaseChannelSubscribe>
    </div>
  </main>
</ThemeContext.Provider>
```
