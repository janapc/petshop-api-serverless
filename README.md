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

Register new pets in your petshop using a access token.

## Requirement

To this project your need to have:

- Nodejs v18 [Nodejs](https://nodejs.org/en/)

Put your jwtSecret inside **user-api/serverless.yml** and **pet-api/serverless.yml**

## Install

```sh
## install dependences inside each folders
❯ npm i

## run project user-api offline
❯ cd user-api && npm run offline:user

## run project pet-api offline
❯ cd pet-api && npm run offline:pet

```

## Request API

```sh
## create a new user
curl --location 'http://localhost:4000/api/user' \
--header 'Content-Type: application/json' \
--data '{
	"username": "admin",
	"password":"admin123!"
}'

## get your token to access pet-api
curl --location 'http://localhost:4000/api/user/login' \
--header 'Content-Type: application/json' \
--data '{
	"username": "admin",
	"password":"admin123!"
}'

## register a new pet
curl --location 'http://localhost:3000/api/pet' \
--header 'Content-Type: application/json' \
--header 'Authorization: youTokenHere' \
--data '{
	"breed": "husky",
	"name": "gamora",
	"birthDay": "11/10/2010",
	"identifyNumberCustomer": "912839450"
}'

## list all pets
curl --location 'http://localhost:3000/api/pet' \
--header 'Authorization: yourTokenHere'

```

## Technologies

- nodejs
- serverless
- jsonwebtoken
- sqlite3

<div align="center">

Made by Janapc 🤘 [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

</div>
