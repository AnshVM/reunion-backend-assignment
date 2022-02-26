# reunion-backend-assignment

For requests that require authentication add the token to the Authorization header in the request.
```
{
   "headers":
   {
      "Authorization":"putjwttokenhere"
   }
}
```

```POST api/posts/ ``` 

Post Request Body example:  
```
{  
   title:"Title of the post",  
   body:"Body of the post"  
} 
```

```POST /api/comment/{id}``` 

Post Request body example:

```
{
  body:"This is just a comment"
}
```

```POST api/users/```   - Register new users

Post Request Body example:  
```
{  
   username:"Username",  
   email:"user@gmail.com",
   password:"user"
} 
```

