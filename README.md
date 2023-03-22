💻 Handout 4.2 Node REST Server with token validation

## ✈ Enhacements from N3 mysql-jwt delivery
This Final app uses some hexagonal architecture principles.

## 🌔 Project description
This Express API implements several endpoints that query towards a mysql database, using Sequelize as ORM. The purpose is to store users that play a simple dice game, the rules of which are as follows: player can only win if the two dices add up to 7, period.
Routes are grouped into 3 groups:
* playerRoutes: for those endpoints aiming at creating, obtaining and updating the players.
* gameRoutes: used for executing dice games. This is the main endpoint that will be used by the players.
* rankingRoutes: for endpoints that fire up controllers that will query the DB to get rankings and player performance.

## 🌔 Execution steps
Before executing please follow these steps below:

✔ DO NOT cd into /app, keep in the project root (node initial demo).

✔ npm i --> install sequelize, mysql, express, jsonwebtoken, mongodb and nodemon as dev dependency.

✔ For local testing of the mysql database, please do the following:
1. install mysql server (https://dev.mysql.com/downloads/mysql/)
2. create a database schema for the purpose of this demo, and remember the name
3. go to config.json inside the confid directory and make sure you put the correct credentials for your local mysql server (i.e. username, password, database name). If you put this info in the development section you'll be set to go.

✔ npm start --> will fire up the server to communicate with mysql.

🌔 Endpoint testing 🚀
Please click on the link below to view and test the endpoints via Postman web.
Once you're set, just click on the different endpoints and see what happens. Have fun!!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25968116-da6bab97-56e5-492b-9ba6-0c4b699d1f23?action=collection%2Ffork&collection-url=entityId%3D25968116-da6bab97-56e5-492b-9ba6-0c4b699d1f23%26entityType%3Dcollection%26workspaceId%3D57d04225-0c95-4842-86b9-1798df87390b)