# PUBG Stats Dashboard

PUBG (PlayerUnknown's Battlegrounds) 경기 통계를 시각화하는 대시보드 애플리케이션입니다.

## 🎯 프로젝트 개요

이 프로젝트는 PUBG 매치 데이터를 분석하고 다양한 통계 정보를 직관적으로 시각화하는 웹 애플리케이션입니다. 플레이어 검색, 매치 분석, 팀 성과 분석 등 다양한 기능을 제공합니다.

## 배포 주소

https://pubg-stats-dashboard.vercel.app/  
<s>현재 무료 PUBG API 키를 사용하고 있어서 1분에 10회 요청 제한이 있습니다.</s>  
현재 펍지로부터 API 요청 수 제한을 풀어줘서 여유롭게 사용 가능합니다.

## ✨ 주요 기능

### 🔍 플레이어 검색

- 플레이어 이름으로 검색  
   **!** 현재 일반 스탯정보가 모두 0으로 넘어오고 있어서 랭크 스탯만 제공됩니다.
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

# 구현 화면

## 메인화면

플랫폼 스팀, 카카오 중 선택 후 플레이어 닉네임을 입력할 수 있다.
<img src="img/1.png"/>

## 검색 결과 화면

해당 플레이어의 스탯 정보와 최근 매치들에 대한 정보가 나온다.
<img src="img/2.png"/>
<img src="img/3.png"/>

## 매치 분석 화면

매치 분석을 클릭하면 볼 수 있는 화면으로 각각의 카드를 클릭하면 "카드를 클릭하면 결과가 여기에 표시됩니다." 부분에 각 결과가 노출된다.
<img src="img/4.png"/>

### 매치 요약 정보

해당 매치에 대한 요약 정보를 볼 수 있다.

<img src="img/5.png"/>

### 팀 순위

해당 매치에 대한 팀 순위 정보를 볼 수 있다.  
팀 순위별로 노출되며 간략한 정보를 표기한다.

<img src="img/6.png"/>

### 플레이어 통계

해당 매치에서 우승 팀에 대한 팀원 정보와 전체 플레이어의 순위별 정보를 보여준다.

<img src="img/7.png"/>

### 킬 리더보드

해당 매치의 킬 순위 정보를 보여준다.
<img src="img/8.png"/>

### 데미지 리더보드

해당 매치의 데미지 순위 정보를 보여준다.
<img src="img/9.png"/>

### 생존 시간 리더보드

해당 매치의 생존 시간 순위 정보를 보여준다.
<img src="img/10.png"/>

### 팀 분석

해당 매치에서 팀별로 팀 합 정보를 보여준다.
<img src="img/11.png"/>

### 플레이어 성과 분석

해당 매치에서 플레이어들의 성과 정보를 보여준다.  
또한 성과 통계에 대한 요약 정보를 제공한다.
<img src="img/12.png"/>
<img src="img/13.png"/>

### 매치 통계

해당 매치에 대한 전체적인 데이터를 보여준다.
<img src="img/14.png"/>
