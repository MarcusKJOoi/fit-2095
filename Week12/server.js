const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const textToSpeech = require("@google-cloud/text-to-speech");

const port = 8080;

const client = new textToSpeech.TextToSpeechClient();

app.use("/", express.static(path.join(__dirname, "dist/Week12")));
app.use(express.static('mp3'));

io.on("connection", socket => {
  socket.on("newMsg", data => {
    io.sockets.emit("msg", { data, timeStamp: getCurrentDate() });
  });
  socket.on("transcribeAudio", data => {
    const request = {
      input: { text: data.msg },
      // Select the language and SSML Voice Gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // Select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };
    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error("ERROR:", err);
        return;
      }
      // Write the binary audio content to a local file
      fs.writeFile(`./mp3/${socket.id}.mp3`, response.audioContent, "binary", err => {
        if (err) {
          console.error("ERROR:", err);
          return;
        }
        socket.emit("transcribeAudio", { fileName: `${socket.id}.mp3`});
      });
    });
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

function getCurrentDate() {
  let d = new Date();
  return d.toLocaleString();
}