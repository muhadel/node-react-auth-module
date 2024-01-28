# Node + React Auth Module

This repository contains a full-stack authentication module with the following technologies:

**Frontend** - _React with Vite and Typescript_

**Backend** - _Nestjs with Typescript_

**Database** - _MongoDB_

## Quick Demo


https://github.com/muhadel/node-react-auth-module/assets/32979588/c30d50fc-d6dd-49ba-a01e-47f9843319b5




## Getting Started

To run this application locally, ensure that you have Node.js and Docker installed on your machine.

### Backend

Position yourself in **/backend** folder.

1. Install packages

```
npm install
```

2. Starting MongoDB

```
docker run -d \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo
```

3. Copy the environment file

```
cp .env.example .env
```

4. Run backend

```
npm run start:dev 
```


### Frontend

Position yourself in **/frontend** folder.

1. Install packages

```
npm install
```

2. Copy the environment file

```
cp .env.example .env
```

3. Run frontend

```
npm run dev
```
