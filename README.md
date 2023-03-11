# Node Initial Demo

AIXÔ ES La branca dev temas del David, Sergi i Alex.

INSTRUCCIONES para ejecutar el programa:

1- cd a la root del proyecto, usando un comando en la consola

2- usar comando por consola: npm i

dependencies:
UUID, colors, inquirer

dependencies sequelize:
mysql2 sequelize express

3- arxiu .env-template, treure-li el -template. (Ya no hace falta especificar manualmente que base de datos se quiere usar)

4- si es el primer cop que s'executa en mysql, en el workbench crear un schema amb el nom de la database

5- En config.json, assegurar-se de què hi figuren els valors correctes de username, password, database (nom del schema creat) y host (host del server de mysql donde esté la base de datos creada anteriormente).

6- usar comando por consola:
    -En cas d'escollir la base de dades json, en una terminal usar comando --> npm run json

    -En cas de escollir la basde de dades mysql, obrir dos terminals paralels
     En un terminal --> npm run mysql-server -- per executar el servidor local que comunica amb mysql.
     En l'altre     --> npm run mysql -- Per executar la app

De moment només permet triar l'opció 1, crear tasca, i si .env DATABASE = mysql anirà a omplir la taula de tasques.