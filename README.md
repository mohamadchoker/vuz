# Coding Task - Vehicle management system


# Installation / setup

* clone repository git clone https://github.com/mohamadchoker/vuz.git
* npm install
* cp .env.development.local.example  .env.development.local (Add your own config)
* install npx (npm i -g npx)
* npx sequelize-cli db:create  (based on DB_DATABASE value in env)  
* npm run dev (this will create tables ) 
* npx sequelize-cli db:seed:all  (create 2 user and some categories and tags)

# Usage

* npm run dev

* admin email : admin@mail.com  / pass: 12345678
* user email : user@mail.com  / pass: 12345678


# postman collection 

import vuz.postman_collection.json to postman