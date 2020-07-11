# Part 3

As recommended by the course, I'm putting the submissions for this part in a different repository, since it will need to be deployed later.

Like in part 1 and 2, the convention for any commit meant as a submission for a particular exercise will be the same:

> feat: SUBMISSION - <exercise number\> - <description of exercise solution\>


## Exercise 3.1

Making the actual endpoint that returns the array of persons record, hardcoded in the project, is trivial. Instead of focusing on that, I'd like to describe an alternative modelling on the hardcoded data that I've implemented.

### Alternative Data Modelling:
In the course itself, in this part and in part 2, the hardcoded data was presented as an array of objects. However, I've chosen to model it as an **object with the unique id as key and value as the object itself**.

```
{
  "persons": {
    "1": {
      "name": "Arto Hellas",
      "phoneNumber": "040-123456"
    },
    "2": {
      "name": "Ada Lovelace",
      "phoneNumber": "39-44-5323523"
    },
    "3": {
      "name": "Dan Abramov",
      "phoneNumber": "12-43-234345"
    },
    "4": {
      "name": "Mary Poppendieck",
      "phoneNumber": "39-23-6423122"  
    },
    "5": {
      "name": "Khadak Singh",
      "phoneNumber": "99969696"
    } 
  }
}

```

The major reason I chose to do this is because I would eventually be asked to make an endpoint to return just one result of a given `id`, and that would need me to search the array, making it O(n).
If you're fetching a data record via a unique `id` then ideally it shouldn't be O(n) and the data should be indexed in a way where an object is accessible quickly via its `id`. With this approach, I can certainly return individual records in O(1), although returning the whole list would now be O(n), since the object would need to be converted into an array.

Insert and delete operations will also be O(1) thanks to this approach. Also, when we create a new record, an approach to generating a new `id` for the record could be simply using `index+1`, but that may have its problems with some delete operations followed by inserts, which would mean that a new record could have the same `id` as a deleted record - and that is far from ideal.

**Note**: I have also used the `body-parser` middleware, so parse request payload into json, for when I eventually have to handle POST/PUT requests. This does not play any role in this exercise, but I added it because I usually add this while making any new API with express, so, force of habit.

## Exercise 3.2

This required me to implement a page, and although I could have just returned a string, or some html as a string with the appropriate `Content-Type` header, but I chose to go the extra distance and use **server-side templating** and use the **express-handlebars** package to achieve this.

I'm not a front-end dev and I wasn't familiar with server-side templating, so I used [this article](https://medium.com/@waelyasmina/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65) to set up handlebars as my default templating engine in express and achieved the result that the exercise asked for.

## Exercise 3.3

Implemented a simple endpoint that takes the `id` as a URL param, and if it isn't found in the data object, returns an http status code of **404** which corresponds to "not found".

## Exercise 3.4

I was a bit confused regarding what the exercise wanted exactly - did I only have to delete the entry from the in-memory object, or did I *also* have to persist the changes in the hardcoded data file, so that when the server is restarted, the changes would reflect?

One look at the first code snippet in the subsection titled "Deleting resources" suggested that we need not persist the changes wherever we had hardcoded them, so merely deleting the record from the in-memory object would suffice, which is what I did.

As for testing the API on postman, I am including screenshots:

![DELETE request successful](supporting_screenshots/DELETE_REQUEST.png)
![DELETE not found](supporting_screenshots/DELETE_FAILURE.png)


## Exercise 3.5

Added a simple POST endpoint to add a new persons entry. I've also included a check for a missing `name` or `phoneNumber` parameter, which is actually part of the next exercise, but I chose to do it from the get go. If any of these mandatory parameters is missing, http status code 404 is returned.







---