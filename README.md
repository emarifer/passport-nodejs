# passport-nodejs

## Example application for backend of using Passport with NodeJS.

### On an nginx server it will be necessary to configure an .env file with the following environment variables:
```
PORT=xxxx
USER_NAME=xxxx
PASSWORD=xxxx
DBNAME=xxxx
SECRET_SESSION=xxxx
PREFIX_APP=/subroute-prefix
```
### The first item is the port. The next three are the MongoDB database credentials. The fifth refers to the key to configure sessions with ExpressJS. The last item serves to provide a subroute on the server.

### In a server like Heroku, it is not necessary to configure this file, since the port is assigned to us by the server. The database credentials are configured in Heroku. Finally, the subroutes in heroku are not used.
