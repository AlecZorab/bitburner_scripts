const https = require("https")
const path = require("path");
const fs = require("fs");
const watch = require("node-watch");

const watchPath = path.resolve(__dirname, "../scripts");

var options = {
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('server.crt', 'utf8')
  };

const server = https.createServer(options)

const io = require("socket.io").listen(server);

io.origins("*:*");
io.on("connection", socket => {
  console.log("a user connected");
  const watcher = watch(watchPath, { recursive: true }, (evt, name) => {
    console.log(name);
    fs.readFile(name, (err, contents) => {
      if (err) throw err;
      socket.send({
        name: path.relative(watchPath, name),
        contents: contents.toString()
      });
    });
  });

  socket.on("disconnect", () => watcher.close());
  socket.on("*", e => console.log(e));
});

server.listen(3000);