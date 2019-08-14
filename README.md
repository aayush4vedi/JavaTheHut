## RESTful Blog
A simple blog.

### APIs:

| Name    |   API                 |   Purpose                                    |
| :----   | :-------------------: | :-------------                               |
| Index   |  GET /blogs           | List all entries                             |
| New     |  GET /blogs/new       | Show a new blog form                         |
| Create  |  POST /blogs          |  Create a new blog & redirect somewhere      |
| Show    |  GET /blogs/:id       |  Show details of a specefic blog             |
| Edit    |  GET /blogs/:id/edit  |  Show edit form for one blog                 |
| Update  |  PUT /blogs/:id       |  Update a specefic blog & redirect somewhere |
| Destroy |  DELETE /blogs/:id    |  Delete a specefic blog & redirect somewhere |