#Song Single Resource API
###Code Fellows Lab 08/09


##About:
This is a simple REST API which stores and tracks song entries. Each song added will generate a unique ID, and will require the song's title and artist. The user can create new entries, as well as retrieve and delete old entries.


##User Instructions:
* To start the server type into the terminal
```
node server.js
```


* To add a new song type the following into the terminal
```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"title": "input song title here", "artist": "artist name goes here"}' localhost:3000/api/song
```
This will generate a unique ID for this song entry.


* To retrieve information associated with a unique ID type the following into the terminal
```
curl localhost:3000/api/song?id=<unique ID>
```


* To delete a song entry type the following into the terminal
```
curl -X DELETE localhost:3000/api/song?id=<unique ID>
```


##Author:
Carolina Ceja
