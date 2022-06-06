# Conway's Game of life
A web application derived from Conway's game of life 🧱
----

Conway's game of life is a web application that lets you explore and share different simple
starting states for the cellular automation known as conway's game of life. Project is
devised as a demo-project for author. For details on the automation checkout
<a href=https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life>wikipedia</a>. Note the
original automation operates on an infinitely large board. For the sake of simplicity
the board implemented in this app is of finite size.


## Development installation
To run the application in a development context -- you'll need 
<a href=https://docs.docker.com/compose/>docker compose</a> installed.

After that -- things are pretty easy.

```bash
$ git clone https://github.com/bwhitesell/Conways-Game-of-Life
$ cd Conways-Game-of-Life
$ docker-compose up
```
Two web servers should be spun up:
  - A next.js server that hosts the client code on port 3000
  - An express.js server on port 4000

Pop open a broswer and go to http://localhost:3000. I'd suggest sticking with chrome
for now since the app tries to auto-play audio on page loads which most browsers
do not like.

For the sake of development the dev db is auto-populated with mock data. You can sign in
with the user "m4ster_g4mer" and password "password" your you can register your own user
of course.

----


## Deployment
No deployments yet. Maybe one day.
