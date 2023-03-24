💻 Handout 4.2 Node REST Server with token validation

## 🌔 Project description

This Express API implements several endpoints that query towards either a mysql(using Sequelize as ORM) or a mongoDB database (no ODM, ORM whatsoever).
The purpose is to store users that play a simple dice game, the rules of which are as follows: player can only win if the two dices add up to 7, period.

Routes are grouped into 3 groups:
✈ playerRoutes: for those endpoints aiming at creating, obtaining and updating the players.
✈ gameRoutes: used for executing dice games. This is the main endpoint that will be used by the players.
✈ rankingRoutes: for endpoints that fire up controllers that will query the DB to get rankings and player performance.

## 🌔 Execution steps

Before executing please follow these steps below:

✔ DO NOT cd into /app, keep in the project root (node initial demo).

✔ npm i --> install sequelize, mysql, express, dotenv, jsonwebtoken, mongodb and finally nodemon as a dev dependency.

✔ please modify the .env-file extension to .env and make sure you put the correct credentials for your local mysql server (i.e. username, password, database name).

### MongoDB persistance
✔ install mongodb Compass or any other GUI for mongoDB (https://www.mongodb.com/try/download/compass)
✔ execute in terminal: npm run mongo OR npm run mongodb

### MySQL persistance
✔ install mysql server (https://dev.mysql.com/downloads/mysql/) and mysql workbench (https://dev.mysql.com/downloads/workbench/)
✔ go to the file -env and make sure you put the correct credentials for your local mysql server (i.e. username, password, database name). If you put this info in the development section you'll be set to go.
✔ execute in terminal: npm run mysql --> this will automatically create a database with the name you specified in the .env file, so no need to create it manually on the workbench (convenient huh? ;)

🌔 Endpoint testing 🚀
Please click on the link below to view and test the endpoints via Postman web.
Once you're set, just click on the different endpoints and see what happens. Have fun!!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25968116-a9919201-a75b-410b-84f3-dc68481519ed?action=collection%2Ffork&collection-url=entityId%3D25968116-a9919201-a75b-410b-84f3-dc68481519ed%26entityType%3Dcollection%26workspaceId%3D57d04225-0c95-4842-86b9-1798df87390b)
