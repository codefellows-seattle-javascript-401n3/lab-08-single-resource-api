# Jessica's RESTful Book API!

In this project you are able to use HTTP methods to perform CRUD operations on my simple resource, books. Well, you are only able to POST books, GET books and DELETE books from the filesystem. A PUT option will become available in future updates.

## Server Endpoints

### `/api/books`

* `POST` request
  * Pass data as stringifed json in the body of a post request to create a book
  * Data passed in must be an object with a title and author property
  * Example curl request:

  `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"title": "Harry Potter", "author": "J.K. Rowling"}' localhost:3000/api/books`

* `GET` request
  * Pass an `?id=<uuid>` in the query string to retrieve a specific book as json
  * Example curl request:

  `curl localhost:3000/api/books?id=1d5bf500-4c37-4185-8533-53dbbe200596`

* `DELETE` request
  * Pass an `?id=<uuid>` in the query string to delete a specific book
  * Should return 204 status with no content in the body
  * Example curl request:

   `curl -X DELETE localhost:3000/api/books?id=1d5bf500-4c37-4185-8533-53dbbe200596`

## Errors Codes

### `/api/books`

* `GET` request made for a non-existing id will return a 404 error status
* `GET` request made without an id passed into the querystring will return a 400 error status.
* `POST` request with no body provided or an invalid body will return a 400 error status
* Unregistered routes will return a 404 error status
