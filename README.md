# 💻 Handout 4.1 Node REST Server

## 🌔 Project description

This Express API implements several endpoints with the purpose of practicing different http requests with and without added headers and body content. To this end, it implements several routes, each one using a specific controller.
Some of the endpoints are passed through a middleware that may either checks for the presence of a certain header, or add a new one.

## 🌔 Execution steps

Before executing please follow these steps below:

* DO NOT cd into /app, keep in the project root (node initial demo)

* npm i

* make sure the .env-use file is renamed to .env, and that it contains a valid PORT (5000 for the purpose of this exercice).

* npm start

* To test the api, please click on the link below

## 🌔 Endpoint testing

* Please click on the link below to view and test the endpoints via Postman web.

* Once you're set, just click on the different endpoints and see what happens. Please notice that the second endpoint, a post request, intends to upload an image which can be of .png, .jpg or .gif. So please make sure you include it in your request.

![Run in Postman](https://run.pstmn.io/button.svg)
https://app.getpostman.com/run-collection/25968116-73fc1b22-258c-4373-9111-9a2711a9a6a8?action=collection%2Ffork&collection-url=entityId%3D25968116-73fc1b22-258c-4373-9111-9a2711a9a6a8%26entityType%3Dcollection%26workspaceId%3D57d04225-0c95-4842-86b9-1798df87390b
