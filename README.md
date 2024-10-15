# Edu Africa Task

## Setup and Running Instruction

1. if you don't have mongoDb and install MongoDB database:
   
    * Link:  https://mongodb.com


2. Clone this repository: https://github.com/rexali/edu_africa_task.git

   ```shell
    git clone https://github.com/rexali/edu_africa_task.git
   ``` 

3. Run in your command terminal: run
    
   ```shell
    cd edu-africa-task
   ```

4. Download and install nodejs into your machine: https://nodejs.org/en 
   
   and then open your command line and run:
   
   ```shell
   npm install
   ``` 
  
5. Then open command line and run: 

   ```shell
   npm start
   ```

## CURL for Client-Server Requests and Responses

6. Curl Commands:

    ### Authentication $ Authorization

    1. To rgister a user as the first user, 
       
       Terminal: run
       
       ```shell
       curl -d '{"email":"talk2bb@yahoo.com","password":"ab1234567&^$"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/register
       ```

    2. Register another user as the second user and so on , 
       
       Terminal: run
       
       ```shell
          curl -d '{"email":"baba@yahoo.com","password":"768?1ghtp"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/register
       ```

    3. Log in a user (e.g., the first user) to get user authentication token with user role; 
        
        Terminal: run
        
        ```shell
        curl -d '{"email":"talk2bb@yahoo.com", "password":"ab1234567&^$"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/login
        ```

    4. Then verify the user authentication token taken from step 3 above add to the rquest header as shown below to prevent CSRF attack & before giving access to the user dashboard;
        
        Terminal: run
        
        ```shell
        curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MjYxNzYxOTN9.i2wjNxnvNxu7YEC9wNZIbDhZbUAqZ5GAC6oMsR84CQQ" -X POST localhost:3001/auth/verify
        ```
 
    ### Profile

    8. Get a profile. Before you run this command, copy and use the user authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer":
      
        Terminal: run
        
        ```shell
        curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA2YTZlYzQ2NDJlMmQzMGZhNzg0ZjEiLCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3Mjg1NzkwMTB9.xo9Xa6p0CxaqgbRKkxVo5ehi6yhFr4jFOjbmZaxVfLw" -X GET localhost:3001/profiles/6706a6ec4642e2d30fa784f3 
        ````

    9. Get all profile as admin. Before you run this command, copy and use the user authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer":
      
        Terminal: run
        
        ```shell
        curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA2YTZlYzQ2NDJlMmQzMGZhNzg0ZjEiLCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3Mjg1NzkwMTB9.xo9Xa6p0CxaqgbRKkxVo5ehi6yhFr4jFOjbmZaxVfLw" -X GET localhost:3001/profiles
        ````

    10. Update user profile. Before you run this command, copy and use the user authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer"
      
        Terminal: run
        
        ```shell
        curl -d '{ "_id":"6706a6ec4642e2d30fa784f3", "firstName":"Aliyu", "lastName":"Bello", "photo":"tal.jpg"}' -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA2YTZlYzQ2NDJlMmQzMGZhNzg0ZjEiLCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3Mjg1NzkwMTB9.xo9Xa6p0CxaqgbRKkxVo5ehi6yhFr4jFOjbmZaxVfLw" -H "Content-Type:application/json" -X PATCH localhost:3001/profiles
        ```

    11. Delete or remove a user profile or details. Before you run this command, copy and use the user authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer"
       
        Terminal: run
        
        ```shell
         curl -d '{ "_id":"6706c368a64f949f49cfafb1"}' -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA2YTZlYzQ2NDJlMmQzMGZhNzg0ZjEiLCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3Mjg1NzkwMTB9.xo9Xa6p0CxaqgbRKkxVo5ehi6yhFr4jFOjbmZaxVfLw" -H "Content-Type:application/json" -X DELETE localhost:3001/profiles
        ```


## Postman for Client-Server Requests and Responses
    
7. Use Postman and use the headers and body data from the above curls commands below:
   
   1. POST http://localhost:3001/auth/register 

      - Header:

        ```h
          { 
            "Content-Type: application/json"
          }
        ```

      - Body:

        ```json 
        {
            "email": "string",
            "password": "string",
            "role":"string"  /// e.g., "user", "user"
        }
        ```
   
   2. POST http://localhost:3001/auth/login

      - Header:
   
        ```h
        {   
            "Content-Type: application/json"
        }
        ```

      - Body:

      ```json 
        {
            "email": "string",  //which is an email,
            "password": "string" // which is a password
        }
      ```

    3. POST http://localhost:3001/auth/verify

      - Header:
   
        ```h
        {   
            "Authorization: Bearer <TOKEN>",
        }
        ```

      - Body: None


   4. GET http://localhost:3001/profiles/<:id>

      - Headers:

          ```h
            {

              "Authorization: Bearer <TOKEN>",    
              "Content-Type: application/json"

            }
          ```

      - Request Body: None
   
   5. PATCH http://localhost:3001/profiles

      - Headers:

        ```h
        {

          "Authorization: Bearer <TOKEN>",    
          "Content-Type: application/json"
        }
        ```

      - Request Body: 

        ```json
        {
            "_id": "string", // number which is the user id 
            "firstName": "String",
            "lastName": "String",
            "photo": "String",
            "user": "object",
            "courses":["object"]
        }
        ```
  
   6. DELETE http://localhost:3001/profiles

      - Request Headers:

        ```h
        {
          "Authorization: Bearer <TOKEN>",    
          "Content-Type: application/json"
        }
        ```

      - Request Body: 

        ```json
        {
            "_id": "string",  // which is the client’s userId
        }
        ```


# Test: Unit Test

  1. Note: Before you run the test make sure you stop the server

  2. Then in your command terminal, run:
     
     ```shell
     npm test
     ```


# Endpoints Documentation:


POST '/auth/register'

- Sends a post request to register a user or an user

- Request Headers:

```h
 { 
    "Content-Type: application/json"
 }
 ```

- Request Body:

```json 
{ 
    "email": "string",
    "password": "string",
    "role":"string"  /// e.g., "user" or "user"
 }
 ```

- Returns: an object of multiple keys e.g.,

```json 
{
    "status": "string", // e.g, "success", 
    "message": "string", //e.g, "registration successful", 
    "data": "object" // e.g, registraton data
}
```

POST '/auth/login'

- Sends a post request in order to login a user which is an user

- Request Headers:

```h
 {   
    "Content-Type: application/json"
 }
```

- Request Body:

```json 
{
    "email": "string",  //which is an email,
    "password": "string" // which is a password
 }
 ```

- Returns: a single an object of success e.g.,

```json
{
    "status": "string", 
    "message": "string", 
    "data": {
      "token": "string"
    }
}
```


POST '/auth/verify'

- Sends a post request in order to verify a user authentication token

- Request Headers:

```h
 {   
    "Authorization: Bearer <TOKEN>",  
 }
```

- Request Body: None


- Returns: a single an object of success e.g.,

```json
{
    "status": "string", 
    "message": "string", 
    "data": {
      "token": "string",
      "userId": "string",
      "email": "string",
      "role": "string"
    }
}
```


GET '/profiles/<:id>'

- Fetches a user profile

- Request Arguments: None

- Request Paramater: replace <:id> in url with the profile "id"

- Request Headers:

```h
 {

  "Authorization: Bearer <TOKEN>",    
  "Content-Type: application/json"

}
```

- Request Body: None

- Returns: An array of user data object e.g.,

```json
{

    "status": "string", 
    "message": "string", 
    "data": { 
       "profile":{
        "_id": "string",
        "firstName":"string",
        "lastName":"string",
        "photo":"string",
        "user": {
          "_id": "string",
          "email": "string",
          "role": "string"
        },
        "courses": ["object"]
      }
    }
}
```


GET '/profiles'

- Fetches all profile

- Request Arguments: None

- Request Paramater: None

- Request Headers:

```h
 {

  "Authorization: Bearer <TOKEN>",    
  "Content-Type: application/json"

}
```

- Request Body: None

- Returns: An array of user data object e.g.,

```json
{

    "status": "string", 
    "message": "string", 
    "data": { 
       "profile":[{
        "_id": "string",
        "firstName":"string",
        "lastName":"string",
        "user": {
          "_id": "string",
          "email": "string",
          "role": "string"
        },
        "courses": ["object"]
      }]
    }
}
```


PATCH '/profiles'

- Update or modify a user profile data

- Request Arguments: None

- Request Headers: e.g.,

```h
{

   "Authorization: Bearer <TOKEN>",    
   "Content-Type: application/json"
}
```

- Request Body: 

```json
{
     "_id": "string", // number which is the user id 
     "firstName": "String",
     "lastName": "String",
     "photo": "String",
     "user":  "object",
     "courses": "[object]"
}
```

- Returns: An object with with a multiple key e.g.,

```json
{

    "status": "string", 
    "message": "string",
    "data": {
      "profile": {
      "acknowledged": "boolean",
      "modifiedCount": "integer",
      "upsertedId": null,
      "upsertedCount": "integer",
      "matchedCount": "integer"
    }
  }
}
```


DELETE '/profiles'

- Delete a user profile data

- Request Arguments: None

- Request Headers:

```h
 {
   "Authorization: Bearer <TOKEN>",    
   "Content-Type: application/json"
}
```

- Request Body: 
```json
{
    "_id": "String"  // which is the client’s userId
}
```

- Returns: An object with with a multiple key e.g.,

```json
{

    "status": "string", 
    "message": "string", // user deleted 
    "data": {
      "profile":
        {
          "acknowledged":"boolean",
          "deletedCount":"integer"
        }
      }
}
``` 




      

                  
