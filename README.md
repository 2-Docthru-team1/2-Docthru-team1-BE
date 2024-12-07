# 1팀- HanCook

## 프로젝트 소개

외국인들을 대상으로 하는 한국 요리 도전 웹 사이트<br>
외국인을 위한 한국 요리 도전 웹사이트는 한국 요리를 배우고 만들어 보는 과정을 통해 외국인들이 한국 문화를 더 깊이 경험하고 이해할 수 있도록 돕는 플랫폼입니다.<br><br>
<b>[HanCook 사이트 바로가기](<https://www.figma.com/design/CdALCm6ocpye0ldqTfVAvf/%5BTEAM-1%5D-HanCook-(Copy)?node-id=0-1&node-type=canvas&t=DWSDbH9clBOT8QhG-0>)</b><br>
<b>[HanCook API 명세서](https://app.swaggerhub.com/apis-docs/CHESHIREBIZZ/HanCook/1.0.3#/)</b> <br>
<b>[HanCook 팀 협업 문서 Notion](https://www.notion.so/ca92bf8470a145829f4dd4e966f78c4c)</b> <br>

## 목차

1. [팀원 구성](#팀원-구성)
2. [기술 스택](#기술-스택)
3. [R&R](#rr)
4. [팀원별 구현 기능 상세](#팀원별-구현-기능-상세)

## 팀원 구성

<table>
  <tr>
    <td align="center" width="200">
      <a href="https://github.com/csbizz">
        <img src="https://avatars.githubusercontent.com/u/95736373?v=4" alt="김태영" width="100" />
        <br />
        <b>김태영</b>  
      </a>
      <br />
      Backend
    </td>
    <td align="center" width="200">
      <a href="https://github.com/taeyeonkim94">
        <img src="https://avatars.githubusercontent.com/u/176233043?v=4" alt="김태연" width="100" />
        <br />
        <b>김태연</b>
      </a>
      <br />
      Backend
    </td>
    <td align="center" width="200">
      <a href="https://github.com/alscksdlek">
        <img src="https://avatars.githubusercontent.com/u/164968618?v=4" alt="김민선" width="100" />
        <br />
        <b>김민선</b>
      </a>
      <br />
      Backend
    </td>
        <td align="center" width="200">
      <a href="https://github.com/galaxy-78">
        <img src="https://avatars.githubusercontent.com/u/81586230?v=4" alt="김재원" width="100" />
        <br />
        <b>김재원</b>
      </a>
      <br />
      Backend
    </td>
  </tr>
</table>

## 기술 스택

**BackEnd** <br>
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![Superstruct](https://img.shields.io/badge/Superstruct-F0DB4F?style=flat&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat&logo=pm2&logoColor=white)

**Database** <br>
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)

**Cloud & Deployment** <br>
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat&logo=amazonaws&logoColor=white)
![S3](https://img.shields.io/badge/S3-569A31?style=flat&logo=amazon-s3&logoColor=white)
![EC2](https://img.shields.io/badge/EC2-FF9900?style=flat&logo=amazon-ec2&logoColor=white)
![Render](https://img.shields.io/badge/Render-0466C8?style=flat&logo=render&logoColor=white)

**Tools** <br>
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white)
![Gather](https://img.shields.io/badge/Gather-3A2EDE?style=flat&logo=gather&logoColor=white)

**Etc** <br>
![3-Tier Architecture](https://img.shields.io/badge/3--Tier%20Architecture-0052CC?style=flat&logo=architect&logoColor=white)
![Singleton Pattern](https://img.shields.io/badge/Singleton%20Pattern-0052CC?style=flat&logo=patterns&logoColor=white)
![Dependency Injection (DI)](https://img.shields.io/badge/Dependency%20Injection-0052CC?style=flat&logo=injection&logoColor=white)

## R&R

**김태영**

- 노션 백엔드 페이지 정리
- 백엔드 일정 관리
- 백엔드 API 명세서(스웨거) 관리
- 프로젝트 폴더 아키텍처 및 린트 세팅
- aws 서비스 관련 작업
- 서버 배포

**김태연**

- 백엔드 발표자료 정리
- 회의록 정리

**김민선**

- 백엔드 깃허브 README.md
- 시연영상 녹화 + 편집

**김재원**

- 발표자료 제작

## 팀원별 구현 기능 상세

**김태영**

- 회원가입 구현
- 리프레시 토큰을 이용해 액세스 토큰 재발급 및 슬라이딩 세션 구현
- 액세스 토큰을 통해 로그인 유저 정보 조회
- 레시피 관련 CRUD
- 피드백 관련 CRUD
- 레시피 좋아요 구현
- DeepL을 이용한 번역 메소드 구현(미사용)
- Nodemailer를 통해 회원가입 인증 메일 구현
- 레코드 논리 삭제을 구현 및 prismaClient 확장을 통해 전체에 후처리 적용
- 레시피 및 피드백 mock데이터 생성 및 수정
- async local storage를 통한 비동기적 전역 상태 관리 구현
- s3에서 download 및 upload presigned Url을 받아오는 메소드 구현
- express Request 객체를 제네릭 타입을 통해 확장

**김태연**

- 작업물 CRUD
- 작업물 생성/수정시 이미지 처리
- 작업물 좋아요 구현
- 챌린지 목록 조회시 일반리스트와 관리자리스트 분리
- 관리자의 작업물 관리 권한 설정
- 작업물 관련 목데이터 생성/수정
- winston을 통한 로그 관리
- 이달의 유저 랭킹 구현
- 도커 파일 작성
- nginx를 이용한 컴포즈 로드 밸런싱 배포
- 데이터베이스 서버 배포

**김민선**

- 챌린지 CRUD
- 챌린지 반려시 AbortReason 생성/조회
- 챌린지 관련 인가
- 챌린지 생성시 s3 활용 이미지 처리
- 이달의 챌린지 관련 구현
- 알림 생성 조회 수정
- 챌린지 관련 목데이터 생성/수정
- deadline 도달시 챌린지 finish 자동 처리 스케쥴링 (node-cron 활용)
- 자동 변경 스케줄링으로 인한 상태 변경시 (finished) 실시간 알림 (socket.io 활용)
- 내 작업물에 피드백 달리면 실시간 알림 (socket.io 활용)

**김재원**

- 로그인 구현
