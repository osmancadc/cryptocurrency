# Metric logging

Cryptocurrency is a simple API that simulates a wallet of cryptocurrency.

It has several characteristics like 

* Login/ Registration
* JWT authentication
* USD,EUR and ARG currency converter
* Get the top N of cryptocurrency for each user
* Connection with coingecko's API

## Installation

Use the package manager NPM to install the dependencies.

```bash
    npm install
```

## Initialization

You can start the server either using the default initializer or running unit testing.

```bash
    npm start 
    or
    npm test
```

## Usage
### Access
##### To create a new user in the database you need to use
```curl
[POST] localhost:4200/access/register
```
###### Request
```javascript
{
    "name" = <String>,
    "last_name"= <String>,
    "username"= <String>,
    "password"= <String>,
    "preferred_currency"= <Integer>
    /*
        Preferred currency may be one of these options:
            * 1 = usd
            * 2 = eur
            * 3 = ars
    */
}
```
###### Response

```javascript
{
    "message":"User created successfully"    
}
```

##### To login and get the access token
```curl
[POST] localhost:4200/access/login
```
###### Request
```javascript
{
    "username"= <String>,
    "password"= <String>,
}
```
###### Response

```javascript
{
    "message": "Successfully authenticated user",
    "token": <String>
}
```
### Get crypto data
##### To list all the data of the cryptocurrencies available
###### Be sure to add the access token in the authorization header 
```curl
[GET] localhost:4200/crypto/list
```
###### Response

```javascript
[
    {
        "symbol": <String>,
        "price": <Integer>,
        "name": <String>,
        "image": <String>,
        "last_updated": <String>
    }
]
```
##### To list the top N of cryptocurrencies owned by a user
###### Be sure to add the access token in the authorization header 
```curl
[GET] localhost:4200/crypto/top/:n
```
###### Response

```javascript
[
    {
        "symbol": <String>,
        "ars": <Integer>,
        "usd": <Integer>,
        "eur": <Integer>,
        "name": <String>,
        "image": <String>,
        "last_updated": <String>
    }
]
```

### Set crypto data
##### To add a cryptocurrency to a user
```curl
[POST] localhost:4200/crypto/add
```
###### Request
```javascript
{
  "symbol":<String>,
  "amount":<Integer>
}
```
###### Response

```javascript
Data inserted successfully
```

## License
[MIT](https://choosealicense.com/licenses/mit/)