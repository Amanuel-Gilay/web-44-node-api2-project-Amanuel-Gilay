// require your server and launch it here
 const server = require('./api/server');

 const PORT = 4000

 server.listen(PORT, () => {
    console.log('listen on ', PORT);
   });