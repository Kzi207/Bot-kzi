  module.exports.config = {
    name: "chuctet",
    version: "2.0.0",
    hasPermssion: 0,
    Rent: 2,
    credits: "Vtuan",
    description: "Xem video về anime chill",
    commandCategory: "Random-img",
    usages: "",
    cooldowns: 2
  };

  module.exports.run = async ({ api, event ,Users}) => {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const video = require('./../../Data_Vtuan/datajson/mp4anime.json');
    const randomVideo = video[Math.floor(Math.random() * video.length)].trim();
    const fileName = '1.mp4';
    const filePath = __dirname + `/${fileName}`;

    function downloadAndSendImage(image, fileName, callback) {
      request(image).pipe(fs.createWriteStream(fileName)).on("close", function () {
        api.sendMessage({
          body: "Chúc mừng năm mới! 🎉",
          attachment: [
            fs.createReadStream(fileName)
          ]
        }, event.threadID, () => {
          fs.unlinkSync(fileName);
        }, event.messageID);
      });
    }

    var dataFriend = await api.getFriendsList();
    let listFriend = []; 

    for (var friend of dataFriend) {
      var friendData = {
        uid: friend.userID
      };
      listFriend.push(friendData);
    }

    for (friendDatas of listFriend) {
      downloadAndSendImage(randomVideo, filePath);
    }
  }
