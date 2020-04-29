# Co-Make API
https://co-make-bw.herokuapp.com/

# User Routes

### Register a User (Unrestricted Route)
HTTP Request: POST

URL: /api/auth/register

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | No        | User ID, generated by DB                                |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | User password                                           |
| First Name  | String  | Yes       | User first name                                         |
| Last Name   | String  | Yes       | User last name                                          |
| Zip Code    | String  | Yes       | User zip code                                           |

##### Example
```javascript
{
    "id": 3,
    "username": "cyborg",
    "first_name": "Victor",
    "last_name": "Stone",
    "zip_code": "53540"
}
```

#### Response
##### 201 (Created)
> Will receive a 201 response with the newly created user if registration is successful
```javascript
{
{
    "id": 3,
    "username": "cyborg",
    "first_name": "Victor",
    "last_name": "Stone",
    "zip_code": "53540"
}
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided",
  "message": "Username and password fields are required"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user registration, please try again later",
  "error": "Server error information"
}
```

*** ***
### LOGIN (Unrestricted Route)
HTTP Request: POST

URL: /api/auth/login

##### Body
| Name        | Type    | Required  | Description                 |
| ----------- | ------- | --------- | ----------------------------|
| Username    | String  | Yes       | Username, must be unique    |
| Password    | String  | Yes       | User password               |

##### Example
```javascript
{
  "username": "joker",
  "password": "hahahahhaha"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a welcome message and the user token if the request is successful
```javascript
{
  "message": "Welcome joker!",
  "token": "Extremely secret token from JWT"
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": 'No credentials provided'
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user login, please try again later",
  "error": "Server error information"
}
```

### GET ALL USERS
HTTP Request: GET

URL: /api/users

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of users in the database if the request is successful
```javascript
[
    {
        "id": 1,
        "username": "dark_knight",
        "first_name": "Bruce",
        "last_name": "Wayne",
    },
    {
        "id": 1,
        "username": "cl0wNprIncE",
        "first_name": "Knock",
        "last_name": "Knock",
    }
]
```
##### 400 (Bad Request) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```
*** ***
### GET USER BY ID
HTTP Request: GET

URL: /api/users/:id

#### Response
##### 200 (OK)
> Will receive a 200 response with a user object
```javascript
{
    "id": 1,
    "username": "fastestmanalive",
    "first_name": "Barry",
    "last_name": "Allen",
    "zip_code": "73645"
}
```
##### 400 (Bad Request) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```

### GET A SINGLE USER'S ISSUES
HTTP Request: GET

URL: /api/users/:id/issues

#### Response
##### 200 (OK)
> Will receive a 200 response with a user object
```javascript
{
    "id": 1,
    "username": "dark_knight",
    "first_name": "Bruce",
    "last_name": "Wayne",
    "zip_code": "53540",
    "issues": [
        {
            "id": 1,
            "zip_code": "53540",
            "title": "ACE Chemicals",
            "post": "Can we please just level this place?"
        }
    ]
}
```
##### 400 (Bad Request) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized) // PENDING WHETHER THIS IS DECIDED TO BE RESTRICTED OR NOT
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```

### POST AN ISSUE (Restricted Route)
HTTP Request: POST

URL: /api/issues

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | No        | Issue ID, generated by DB                               |
| Title       | String  | Yes       | Issue title,                                            |
| Post        | String  | Yes       | Issue body                                              |
| Zip Code    | String  | No        | Issue zip code, assigned by DB                          |


##### Example
```javascript
{
    "id": 1,
    "Title": "Arkham Asylum Exterior",
    "Post": "I think gotham needs to repaint this drab and dreary building, purple and green perhaps? 🤡",
    "zip_code": "53540"
}
```

#### Response
##### 201 (Created)
> Will receive a 201 response with the newly created user if registration is successful
```javascript

{
    "id": 1,
    "Title": "Arkham Asylum Exterior",
    "Post": "I think gotham needs to repaint this drab and dreary building, purple and green perhaps? 🤡",
    "zip_code": "53540"
}

```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server could not add issue due to location error",
  "error": "Server error information"
}
```
or
```javascript
{
  "message": "Server could not add issue when assigning location",
  "error": "Server error information"
}
```

### UPDATE USER ISSUE
HTTP Request: PUT

URL: /api/issues/:id

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | Yes       | User ID, generated by DB must be provided by client     |
| Title       | String  | Yes       | Changes, if any                                         |
| Password    | String  | Yes       | Changes, if any                                         |

##### Example
```javascript
    {
        "id": 1,
        "title": "Pothole",
        "post": "!@#$#%%!@# FIX IT",
    }
```

#### Response
##### 200 (OK)
> Will receive a 200 response with the updated user object if the request is successful
```javascript
    {
        "id": 1,
        "title": "Pothole downtown",
        "post": "Are squad cars can't operate like this!",
    }
```
##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server could not update issue",
  "error": "Server error information"
}
```

*** ***
### DELETE AN ISSUE
HTTP Request: DELETE

URL: /api/issues/:id

#### Response
##### 200 (OK)

* ADD RESPONSE

```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server failed to remove the issue"
  "error": "Server error information"
}
```
*** ***
### UPDATE USER INFORMATION
HTTP Request: PUT

URL: /api/users/:id

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | Yes       | User ID, generated by DB                                |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | User password                                           |
| First Name  | String  | Yes       | User first name                                         |
| Last Name   | String  | Yes       | User last name                                          |
| Zip Code    | String  | Yes       | User zip code                                           |
##### Example
```javascript
    {
        "id": 3,
        "username": "robin",
        "first_name": "Dick",
        "last_name": "Grayson",
    }
```

#### Response
##### 200 (OK)
> Will receive a 200 response with the updated user object if the request is successful
```javascript
    {
        "id": 1,
        "username": "Nightwing",
        "first_name": "Dick",
        "last_name": "Grayson",
    }
```
##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server could not update user",
  "error": "Server error information"
}
```

*** ***
### DELETE A USER
HTTP Request: DELETE

URL: /api/users/:id

#### Response
##### 200 (OK)

* ADD RESPONSE

```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server failed to remove the user"
  "error": "Server error information"
}
```

*** ***
# ~~~ Locations ~~~

## GET Requests (GET)

### Get all Locations
####  /api/locations

  - Example Response -
    ##### Success
    ``` javascript
      {
        "id": 1,
        "zip_code": "53540"
      },
      {
        "id": 2,
        "zip_code": "62960"
      },
      {
        "id": 3,
        "zip_code": "80537"
      }
    ```
    ##### Error
    ``` javascript
      {
        "error": "Server could not get Locations"
      }
    ```

### Get Specific Location
#### /api/locations/:id

  - Example Response -

  ##### Success
  ``` javascript
    {
      "id": 3,
      "zip_code": "80537"
    }
  ```

  ## Error
  ``` javascript
    {
      "error": "Server could not get Location"
    }
  ```

### Get Location issues
####  /api/locations/issues/:id

  - Example Response -

    ##### Success
    ``` javascript
      {
        "id": 2,
        "zip_code": "80537",
        "title": "Pothole",
        "post": "Its ruining all the cars!",
        "upvote": 0,
        "userId": 4,
        "locationsId": 3
      },
      {
        "id": 3,
        "zip_code": "80537",
        "title": "Dogs barking",
        "post": "Neighbors dogs never stop barking!",
        "upvote": 0,
        "userId": 4,
        "locationsId": 3
      },
      {
        "id": 4,
        "zip_code": "80537",
        "title": "Loud Music",
        "post": "Good music just too loud",
        "upvote": 0,
        "userId": 1,
        "locationsId": 3
      }
    ``` 

    ##### Error
    ``` javascript
      {
        "error": "Server could not get location issues"
      }
    ```

## Update Requests (PUT)

### Update Zipcode
####  /api/locations/:id


## Delete Request (DELETE)

### Delete
#### /api/locations/:id
  - Example Response -

  ##### Success
  ```javascript
    {
        "message": "The locations was successfully deleted"
    }
  ```

  ##### Error
  ```javascript
    {
        "error": "Server failed to remove the location"
    }
  ```