#:dog: Dan's Dog(e) API :dog:

This is a basic API with non-persistent data.

Objects are stored in the storage object and the stored objects have the following properties:
```
storage.data = {
  '1234-test-obj': {
    id: '1234-test-obj',
    creationDate: Date(12/11/2016),
    name: 'Test',
    breed: 'Shiba',
  },
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
```delete completed``` and a ```200``` status code if successful.
