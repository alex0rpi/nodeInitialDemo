# 💻DevTeams Sergi - David - Alex

Benvingut/da a la nostra aplicació de gestió de tasques.
En aquesta app podreu crear tasques, marcarles com a començades o finalitzades, eliminar-les o modificar-les.

Aquest app pot funcionar en dues modalitats:
* Base de dades en format .json.
* Base de dades mitjançant mysql

## Instruccions per a executar.

✅ Situeu-vos a l'arrel del projecte.

✅ Executeu la comanda npm i

✅ Per executar la app amb persistència de tasques en json, executeu la comanda:
    npm run json

✅ Per executar la app amb persistència de tasques en mysql, feu les passes següents:

Primera vegada executant amb mysql:
* Desde mysql workbench, crear un schema amb el nom desistjat per la base de dades.
* Dins del directori config, en el fitxer config.json, assegurar-se de què hi figuren els valors correctes de username, password, database (nom del schema creat) i host (host del server de mysql a on es trobi la base de dades creada).
* Executeu les comandes en terminals paral·lels:

    npm run mysql-server --> això executarà el servidor local de mysql
    npm run mysql --> això executarà la app
    
ENJOY 😉