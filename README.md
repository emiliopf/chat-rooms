<p align="center">

  <h3 align="center">ROOMS - <a href="https://github.com/emiliopf/chat-app">CHAT APP</a></h3>
  <p align="center">
    Rooms microservice.
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#set-up">Set Up</a></li>
      </ul>
    </li>
    <li><a href="#endponits">Endpoints</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br />


## About The Project


Rooms microservice is responsible for create rooms, login into and send messages to the message broker.


## Gettiing Started

### Prerequisites

* [Node](https://nodejs.org/en/) v15.11 or higher.
* [Users](https://github.com/emiliopf/chat-users) microservice.
* [RabbitMQ](https://www.rabbitmq.com/)
* Mysql Server()


### Set Up

1. Add [database](/src/config/database.ts) environment variables.
2. Add [jwt](/src/config/jwt.ts) environment variables.
3. Add [rabbitmq](/src/config/rabbitmq.ts) environment variables.
4. Add [app](/src/config/app.ts) encironment variables.
3. Launch `npm run start`

## Endpoints

### **Create room**

Make  call to users microservice to create [user](https://github.com/emiliopf/chat-users) and get the access_token. Also send message ("ROOM_CREATED") over amqp.

```http
POST /rooms/create

```

BODY
```
{
  "alias": "emilio",
  "password": "abcdfg"
}
```

RESPONSE:

```
{
  "token": "JWT TOKEN",
}
```


### **Login room**

Verify password and create the user calling [user](https://github.com/emiliopf/chat-users) microservice.

```http
POST /rooms/login
```

BODY
```
{
  "idRoom": 1,
  "password": "abcdfg",,
  "alias": "juan"
}
```

RESPONSE:

```
{
  "token": "JWT TOKEN"
}
```

### **Login success**

Send message ("USER_JOIN") over amqp with the JWT params.

```http
POST /rooms/loginsuccess
```

Headers
```
{
  "Authorization": "Bearer JWT TOKEN",
}
```


### **Send message**

Send message ("NEW_MESSAGE") over amqp with the JWT params and input received from request body.

```http
POST /rooms/message
```

Headers
```
{
  "Authorization": "Bearer JWT TOKEN",
}
```

BODY
```
{
  "input": "Lrem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ipsum metus, feugiat non nibh et, tincidunt facilisis lacus."
}
```


### **Check room**

Verify if :idRoom exists.

```http
GET /rooms/:idRoom

```


RESPONSE:

```
{
  "id": 1,
}
```

### **Logout**

Send message ("USER_LEFT") over amqp with the JWT params.

```http
POST /rooms/logout
```

Headers
```
{
  "Authorization": "Bearer JWT TOKEN",
}
```


## License

  Nest is [MIT licensed](LICENSE).
