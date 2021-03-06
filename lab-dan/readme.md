#:dog: Dan's Dog(e) API :dog:

This is a basic API with _persistent_ data.

Objects are stored as JSON objects in the data folder and the stored objects have the following properties:
```
{
  "id": "1234-test-obj",
  "creationDate": "2016-12-11T06:06:33.156Z",
  "name": "Test",
  "breed": "Shiba"
}
```

You can call ```/dogs``` or ```/dogs/all``` to get all existing objects. It will return a JSON object.

GET ```/dogs?id=[existing-uuid]``` -- grab a specific object by its id. It will return a JSON object.

POST ```/dogs``` (```{name: [NAME], breed: [BREED]}```) -- create a new object with a specified
  name and breed. If no name or breed is given, the object will still be created with
  default values. It will return the new JSON object.

PUT ```/dog``` (```{id: [ID], name: [NAME], breed: [BREED]}```) -- update an existing object. To
  update you must give the id, otherwise a new object will be created. It will return
  the updated or new JSON object.

DELETE /dogs?id="existing-uuid" -- delete an existing record. It will return the text
```delete completed``` and a ```204``` status code if successful.
