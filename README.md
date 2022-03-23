# IOS native app (다함께 작심삼일)

같은 목표(공부, 운동, 독서)를 가진 사람들끼리 커뮤니티에서 목표 공유와 진행율을 공유하는 애플리케이션

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=GitHub Actions&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>&nbsp
</p>

## Installation

```bash
$ npm install
$ npm install -g @nestjs/cli
```

## Running the app

- dev mode
  ```bash
  $ npm run start:dev
  ```
- 컴파일된 js 파일 실행
  ```bash
  $ npm run start:prod
  ```

## ENV Sample

.env.dev & .env.prod

```
# App
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=00000000
DATABASE_NAME=jaksim-app

# JWT
JWT_ACCESS_TOKEN_SECRET=jaksim#
JWT_ACCESS_TOKEN_EXPIRESIN=30m
JWT_REFRESH_TOKEN_SECRET=jaksim@
JWT_REFRESH_TOKEN_EXPIRESIN=7d
```

## 프로젝트 데모

구현중

## 데이터베이스 ERD

구현중
