# 🚀 Добро пожаловать в simple CRUD API!

**Для запуска сервера в режиме разработки введите:**
npm run start:dev

**Для запуска сервера в режиме продакшн введите:**
npm run start:prod

**Получить список всех пользователей:**
GET api/users 

**Получить пользователя по Id:**
GET api/users/${userId}

**Создать пользователя :**
POST api/users

body : {
    username: 'string',
    age: number,
    hobbies: Array<string> | []
}

**Обновить пользователя :**
PUT api/users/{userId}


**Удалить пользователя :**
DELETE api/users/${userId}