<div align="center">
  <h1>Petshop api serverless</h1>
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/janapc/petshop-api-serverless"/>
  <img alt="Language top" src="https://img.shields.io/github/languages/top/janapc/petshop-api-serverless"/>
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/janapc/petshop-api-serverless"/>

<a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#requirement">Requirement</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#request-api">Request API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#technologies">Technologies</a>

</div>

## Project

Manager petshop.
Backend contains the apis user and pet.You can manager your registed of users and pets.
Petshop contains the front-end application.

## Requirement

To this project your need to have:

- Nodejs v18 [Nodejs](https://nodejs.org/en/)

Put your jwtSecret inside **user-api/serverless.yml** and **pet-api/serverless.yml**
Create .env.local file inside _petshop_ and put two envs **NEXT_PUBLIC_BASE_URL_USER**(user url), **NEXT_PUBLIC_BASE_URL_PET**(pet url)

## Install

```sh
## install dependences inside each folders
❯ npm i

## run project user-api offline http://localhost:4000
❯ cd backend/user-api && npm run offline:user

## run project pet-api offline http://localhost:5000
❯ cd backend/pet-api && npm run offline:pet

## run project petshop offline http://localhost:3000
❯ cd petshop && npm run dev

```

## Request API

[pet-api](pet-api.sh)
[user-api](user-api.sh)

## Technologies

- nodejs
- serverless
- jsonwebtoken
- sqlite3
- s3-bucket

<div align="center">

Made by Janapc 🤘 [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

</div>
