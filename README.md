# PUBG Stats Dashboard

PUBG (PlayerUnknown's Battlegrounds) 경기 통계를 시각화하는 대시보드 애플리케이션입니다.

## 🎯 프로젝트 개요

이 프로젝트는 PUBG 매치 데이터를 분석하고 다양한 통계 정보를 직관적으로 시각화하는 웹 애플리케이션입니다. 플레이어 검색, 매치 분석, 팀 성과 분석 등 다양한 기능을 제공합니다.

## ✨ 주요 기능

### 🔍 플레이어 검색

- 플레이어 이름으로 검색
- 최근 매치 기록 조회
- 매치 분석

### 📊 매치 분석

- **매치 요약 정보**: 게임 모드, 맵, 플레이 시간, 참가자 수
- **팀 순위**: 팀별 순위와 기본 통계
- **플레이어 통계**: 모든 플레이어의 상세 통계
- **킬 리더보드**: 킬 상위 플레이어
- **데미지 리더보드**: 데미지 상위 플레이어
- **생존 시간 리더보드**: 생존 시간 상위 플레이어
- **팀 분석**: 팀별 상세 분석
- **플레이어 성과 분석**: 플레이어별 성과 분석
- **매치 통계**: 매치 전체 통계 요약

### 📈 데이터 시각화

- 직관적인 카드 기반 UI
- 색상 코딩을 통한 데이터 구분
- 반응형 디자인
- 실시간 로딩 상태 표시

## 🛠 개발 환경

- Macbook Pro 16 (M1Max)
  - Node v22.14.0
  - Yarn 1.22.22

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Package Manager**: Yarn

## 📁 프로젝트 구조

```
pubg-stats-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── player/            # 플레이어 관련 페이지
│   │   └── match/             # 매치 분석 페이지
│   ├── components/            # React 컴포넌트
│   │   ├── PlayerSearch.tsx   # 플레이어 검색
│   │   ├── stats/             # 통계 관련 컴포넌트
│   │   └── match-analysis/    # 매치 분석 컴포넌트
│   ├── hooks/                 # 커스텀 훅
│   ├── models/                # TypeScript 타입 정의
│   ├── store/                 # 상태 관리
│   └── utils/                 # 유틸리티 함수
├── public/                    # 정적 파일
└── package.json
```

## 🚀 시작하기

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-username/pubg-stats-dashboard.git
   cd pubg-stats-dashboard
   ```

2. **의존성 설치**

   ```bash
   yarn install
   ```

3. **개발 서버 실행**

   ```bash
   yarn dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

**Note**: 이 프로젝트는 PUBG API를 사용하여 실제 게임 데이터를 표시합니다. API 키 설정이 필요합니다.
