# Prueba de código

Prueba de códico hecha con Node.js.

## Se ha usado

- Docker compose
- Express
- Slonik
- Nodemailer
- dotenv

## Setup

Levantar postgres y adminer. Desde la raíz del proyecto,ejecutar en consola el siguiente comando: 
> docker-compose up

Para crear las tablas, ejecutar en consola desde la raíz del proyecto: 
> node scripts/creation.js

Para comprobar que las tablas se han creado correctamente, acceder a `adminer` desde: 
> http://localhost:8080

  Abrir una conexión con la DB con esta configuración: 
  - system: postgres
  - server: db
  - usuario: user1
  - password: 1234
  - db: trial

Variables de entorno necesarios: 
  - DB_URL=postgres://user1:1234@localhost:5432/trial
  - PORT
  - MAIL_USER
  - MAIL_PASS

En la terminal ejecutar :
> npm run start

## Suposiciones

+ No se gestiona si hay un error en el envío de los emails. 
  Asumo que aunque falle, se manda un 200 igual igual ya que en la db se ha metido bien. 
+ Entiendo que un nominado sólo puede ser nominado una vez, aunque el miembro que le nomine sea diferente.

## Mejoras

+ Gestionar las request que se hagan con un path incorrecto, es decir, los 404.
+ Añadir tests. 
+ Configurar despliegue automático. 
+ Gestionar el problema de los emails no enviados. 
+ Veo que el controlador del createNominations está algo cargado, es decir tiene que comprobar muchas cosas antes de hacer su función de crear una nominación y también manda el email. Estaría bien darle menos responsabilidades. 
+ Añadir paginación al endpoint /nominations.