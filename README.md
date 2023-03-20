# car_workshop

This is client-server app, that allows to perform simple actions on the data.  

### Used technologies: 
Node.js, Express, React.js

### Database structure:
Tables:
- Mechanic 
- Car
- Repair 

Only one mechanic and one car can be assigned to one repair.

### Functionality:
- display all records
- display details of one record
- edit record
- add record
- delete record
- validate data (on the server side as well as on the client side)
- change language between polish and english
- log in into app and perform actions available only to logged users


## How to run:

__Required installation: Node.js, Docker__

### 1. Docker:
Go to the folder: '..\car_workshop-server\docker' and execute command:
```
docker-compose up
```
then run database in docker. 

### 2. Database
Open console "phpmyadmin" in your browser (localhost:8183) and log in with this data:

- Server: mysql
- User: root
- Password: root

then paste and execute SQL script (..\config\sequelize\schema.sql) in the SQL section.

### 3. Server
In your 1st terminal go to the folder '..\car_workshop-server' and download libraries with this command:
```
npm i
```

and start server:
```
npm start
```

### 4. Client
In your 2nd terminal go to the folder '..\car_workshop-client' and download libraries with this command:
```
npm i
```

and start client:
```
npm start
```

App should be available in your browser (localhost:8000).

Test data in app:
- Login: maciej.zielinski@ryc.com
- Password: 123
