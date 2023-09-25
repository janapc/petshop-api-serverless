<div align="center">
  <h1>Petshop api serverless</h1>
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/janapc/petshop-api-serverless"/>
  <img alt="Language top" src="https://img.shields.io/github/languages/top/janapc/petshop-api-serverless"/>
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/janapc/petshop-api-serverless"/>

<a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#requirement">Requirement</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#run-project">Run Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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
- docker [Docker](https://www.docker.com/)

Inside each backend service you have **env-dev.yml** put your config in theses files.

Create .env.local file inside _petshop_ and put two envs **NEXT_PUBLIC_BASE_URL_USER**(user url), **NEXT_PUBLIC_BASE_URL_PET**(pet url)

## Run Project

Start Docker in your machine and:

```sh
## up containers
❯ docker compose up -d
```

URL-apis:
[front-end](http://localhost:3000)
[user-api](http://localhost:4000)
[pet-api](http://localhost:8000)

## Request API

[pet-api](./scripts/pet-api.sh)
[user-api](./scripts/user-api.sh)

## Technologies

- nodejs
- serverless
- jsonwebtoken
- sqlite3
- s3-bucket-aws
- sqs-aws

<div align="center">

Made by Janapc 🤘 [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

</div>
