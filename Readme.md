# Project Omicron - Backend

## What is it about?

Have you ever worked in a laboratory, chemistry, biology, or medicine stuff, 
you know. Well, if you have, you might as well have felt that the documentation
regarding techniques seems to be intended fore some one else, rather than the 
end user.

Many times a sea of words is displayed in a too fragile piece of paper. 
An overflow of useless stuff that pairs poorly with a very unconfortable 
lab notebook. In the worst of cases this is an archaic book with numbered 
pages that requires a ceremony, like an occult rite every time it has an input. 
Signing pages multiple times, every time there is a correction, or an input or
anything at all.

Well this app, both the backend and its frontend counterpart, try to return 
documentation to the service of analysts. Making managing day to day work a 
breeze.

## How it's made
Well it's a Node.js project using Typescript and express. This is my first 
project using CLEAN Architecture, so it might be sub par in that field. 
Some curious stuff will be present. I'll give some detail on stuff I believe 
to be interesting ahead. I'll also add technologies and descriptions while 
I add them to the project.

### Self documenting routers
On the first commits you will find a slightly ackward router. The idea is that
routes are generated automatically following an array. So every Express Router
no can be just an array that tells a main class the method, the path, the 
middleware and the handler involved. The Class takes care of the rest. 
It creates the Router and ataches it to the application when the server is 
created.

The main idea behind this is that the routes are self documenting. 
So whithin every main route of the app there is an array with all the routes 
that live inside of it. Now the code explains itself and all the routes, 
handlers and middlewares are available in the same way  


