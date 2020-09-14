# Chat application
### Used development stack:
* Server:
  * Node.js
  * socket.io
* Client:
  * React
    * styled-components
    * material-ui
  * socket.io
* Tools:
  * WebStorm
  * eslint
  * prettier

### Install

1. Run **npm-install.sh** script to install 
all npm packages (or run **#> npm install** in ./, 
./chat-client and ./chat-server directories);
2. Run **server.sh** script to start the server 
with application (**client.sh** will start create-react-app server)

### Advanced
  If you open project in WebStorm, you can setup **eslint** and **prettier**:
  * Configs are .prettierrc.js and .eslintrc.js in the root folder
  * Tools inside ./node-modules
  
### Usage flow
1. Enter your the name => Join new chat room
2. Enter message => Message sends to all users in room
3. List of room users displayed on the right
4. To join into your room, another user needs your current 
URL (room ID is the number after url address of the server root). 
They need to copy the URL into their address bar.
5. Refreshing page resets client
6. Video chat available only for 2 users in the room. 
After pressing button on the left, your webcam and micro will translate
to another user in the same room.
