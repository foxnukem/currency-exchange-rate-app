## Опис
Це сервіс з АРІ, який дозволить:
- дізнатись поточний курс долара (USD) у гривні (UAH)
- підписати емейл на отримання інформації по зміні курсу.

## Запуск
Можливий запуск з допомогою Docker, для цього присутній окремо Dockerfile для самого застосунку та конфігурація docker-compose, яка також містить конфігурацію для підняття PostgreSQL

## Стек
- Node.js
- Nest.js - основа застосунку, яка у багато чому схожа на Spring Framework та Angular 2+ :)
- PostgreSQL - СКБД
- nodemailer - бібліотека для надсилання листів
- TypeORM - ORM 
- Cron - для запланованих дій (розсилка у цьому випадку)

## Базова структура
### Застосунок поділено на три основні частини: 
- *Currency* - взаємодія з API сервісу, який надає інформацію про курс валют. У цьому випадку використано Coinbase, може бути використаний будь-який доступний без зміни інтерфейсу сервісу, який надає інфо про курс валют.
- *EmailListManagement* - частина, яка відповідає за керування та збереження е-мейлів юзерів, тут було використано елементи TypeORM, що зробити можливим збереження адрес у БД. 
- *EmailCommunication* - частина, яка інкапсулює в собі логіку надсилання е-мейлів. Було реалізовано власний інтерфейс взаємодії із nodemailer, який уже використано у сервісі, який збирає повідомлення та робить росилку. 
Інфраструктурною є частина, що знаходиться у директорії database. Вона відповідає за підключення до БД.

## Змінні оточення
Конфігурація задається через файл .env, який має лежати у корені проєкту. 

### Змінні, що стосуються серверу
- *PORT* - порт сервера node.js.
- *BASE_URL*=/api - базова частина URL API самого застосунку.
- *LOCAL_PORT* - порт, за яким доступний застосунок, коли він запущений через Docker.

### Змінні, які стосуються БД
- *POSTGRES_HOST*=localhost - шлях для доступу до БД 
- *POSTGRES_DATABASE*=currency-service - назва БД у СКБД
- *POSTGRES_LOCAL_PORT* - порт, за яким СКБД доступна для підключення ззовні Docker контейнера
- *POSTGRES_DOCKER_PORT* - порт СКБД, до якого підключається сам застосунок для доступу в БД
- *POSTGRES_USER* - назва користувача СКБД, яка використовується застосунком для доступу до БД
- *POSTGRES_PASSWORD* - пароль користувача СКБД, який використовується застосунком для доступу до БД

### Змінні, які стосуються API отримання інформації про курс валют
- *COINBASE_API_URL*=https://api.coinbase.com/v2/prices - основна частина URL для доступу до API Coinbase
- *COINBASE_API_KEY* - ключ доступу до API Coinbase 
- *CURRENCY_FROM_TO*=USD-UAH - частина URL, яка відповідає за пару валют обміну
- *CURRENCY_RATE_ACTION*=buy - частина URL, яка відповідає за дію обміну між валютами (buy, sell, spot)

### Змінні, які стосуються частини, яка відповідає за надсилання листів
- *SEND_EMAIL_FROM* - е-мейл, з якого надсилається лист
- *SEND_EMAIL_HOST* - хост-адреса сервісу для надсилання пошти
- *SEND_EMAIL_PORT* - порт поштового серверу для надсилання пошти
- *SEND_EMAIL_AUTH_USER* - назва користувача на сервісі для надсилання пошти (тут був використаний mailtrap.io)
- *SEND_EMAIL_AUTH_PASSWORD* - пароль користувача на сервісі для надсилання пошти

