<<<<<<< HEAD
About
=======
# Adventures in Big City
<p align= "center">
<img src = './media/cast.png' height = "500px"/>
<br>
<img src="https://img.shields.io/badge/React-C3190B" alt="React">
<img src="https://img.shields.io/badge/React-634272" alt="React">
<img src="https://img.shields.io/badge/Firebase-E27D06" alt="Firebase">
<br>
Welcome to the Big City!<br>
-the happy home of Oswald the octoups, his loyal friend Weenie(who only communicates in "bark-speak" ), Daisy the sunflower, Henry the penguin, Johnny Snowman and many others.
<br>
This app shows the activites happening in the town.If you too are planning to do something here, don't just wait; sign up with the character of your choice & have fun.We don't restrict on age :)
<br>
PS: Don't forget to eat at the Big Diner where Madame Butterfly serves food with her own hands.
</p>

<hr>

# Project Architecture
```
                                    |-----------[Signed in links]
                                    |            
            [App(root)]------------[Nav]
                |                   |
                |                   |-----------[Signed up links]
                |
    ------------.--------------------------------------------------------
    |           |                       |                  |            |
[Dashboard]  [Adventure Details]   [Create Adventure]   [SignIn]    [SignUp]
  /dashboard   /adv/:id                /create           /signin       /signup
    |
    ---------------[Notifications]
    |
    ---------------[Adventure List]
                        |
                        |
                  [Adventure Summary]s

```
# Tools
* Client/Browser:
    * React
    * Redux
    * Materialize css
* Server/Firebase:
    * Firestore DB
    * Firebase Auth
    * Cloud Functions

    
<hr>

## To Run
In the project directory: `$ npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

>>>>>>> advInBigCity/master
