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






---