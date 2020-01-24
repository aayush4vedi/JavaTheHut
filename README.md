<<<<<<< HEAD
About
=======
## RESTful Blog
A simple blog.
Hopefully my last CRUD app in JS :relieved:

## Uses:
* ExpressJS
* Mongoose
* Semantic UI- because why not! 

### APIs:
The Seven Deadly Routes every CRUD app has to have:

| Name    |   API                 |   Purpose                                    | Mongoose Method          |
| :----   | :-------------------: | :-------------                               |:---------------:         |
| Index   |  GET /blogs           | List all entries                             |      Blog.find()         |                          
| New     |  GET /blogs/new       | Show a new blog form                         |          N/A             |
| Create  |  POST /blogs          |  Create a new blog & redirect somewhere      |      Blog.create()       |
| Show    |  GET /blogs/:id       |  Show details of a specefic blog             |     Blog.findById()      |
| Edit    |  GET /blogs/:id/edit  |  Show edit form for one blog                 |     Blog.findById()      |
| Update  |  PUT /blogs/:id       |  Update a specefic blog & redirect somewhere |  Blog.findByIdAndUpdate()|
| Destroy |  DELETE /blogs/:id    |  Delete a specefic blog & redirect somewhere |  Blog.findByIdAndRemove()|
>>>>>>> restFulBlog/master
