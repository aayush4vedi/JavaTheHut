## Yelp Hotel
A yelp like service for hotels near you.
<hr>

### APIs
|  User  |             API          |     Service      |    Comment                       |
| -----  |  :---------------------: | :--------------: | :------------------------------: |
|        |     == GET / ==>         |                  |    Home Page: Request            |
|        |     <==                  |                  |    Home Page: renders 'home'     |
|        |     == GET /hotels ==>   |                  |    Index Page: Display all hotels|
|        |     <==                  |                  |    Index Page: renders 'index'   |
|        |  == GET /hotels/new =>   |                  |  Display form to create new hotel|
|        |     == POST /hotels ==>  |                  |         Create new hotel         |
|        |     <== Redirect: /hotels|                  |    Redirects to Index Page       |
|        |  == GET /hotels/:id ==>  |                  |    Show: Info about a hotel      |
|        |     <==                  |                  |    Show: renders 'show'     |