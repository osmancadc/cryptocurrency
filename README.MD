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
### Registration
##### To create a new user in the database you need to use
```curl
[POST] localhost:4200/access/login
```
###### Request
```javascript
{
    "name" = <String>,
    "last_name"= <String>,
    "username"= <String>,
    "password"= <String>,
    "preferred_currency"= <Integer>
}
```
###### Response

```javascript
{
    "message":"User created successfully"    
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)