A shop rest api created using NodeJs, ExpressJs, Mongoose, MongoDB.  
Contains user auth for new users with password encryption on the server.  
Contains token auth for Post, Patch, and Delete requests.   

Creating a user profile  
Make a post request to http://localhost:4000/api/user/signup  
Your username and password should be provided as body parameters  
eg  
```
body: {
	email: 'this_is_your_email_address@provider.com',
	password: 'strongEnoughPassword##'
}
```

Use prior login details to make a post request to receive your token. This will grant your read/write access to the DB. If a correct username/password for you account was provided, a response with this token will be returned.  
Make a post request to http://localhost:4000/api/user/login  
```
body: {
	email: 'this_is_your_email_address@provider.com',
	password: 'strongEnoughPassword##'
}
```

By default this token will expire in 1 Hour. In order to re-gain read/write access, User will have to re-authenticate and retrieve a new key.  