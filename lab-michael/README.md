# Single Resource API -- Vanilla and Restful
Learn how to GET/POST/DELETE Resources
## How to get started:

* Fire-up the server with
 * ```node server.js```

 ::USING THE CURL COMMANDS::


To get a list of all files you can just:
* ```curl http://localhost:3000/api/recipe``` - This will return a list of recipes.


To post a new Recipe:
* ```curl -H "Content-Type": "application/json" -d '{"name":"Meatloaf", "content":"meat", "mealType":"dinner"}' http://localhost:3000/api/recipe```

The recipe needs a name, content and mealType! It had generated an ID of db5d8230-d948-11e6-b117-97b676a66b3d for the particular instance above.


Now take that ID to view the recipe:
* ```curl http://localhost:3000/api/recipe?id=db5d8230-d948-11e6-b117-97b676a66b3d```

Finally to delete the recipe from the database  
* ```curl -X DELETE http://localhost:3000/api/recipe?id=db5d8230-d948-11e6-b117-97b676a6```




