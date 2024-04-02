module.exports.config = {
  hasPermssion: 1, 
  credits: "Vtuan", // pls đừng thay cre edit tội mình b ơi:(
  name: "antispam", 
  commandCategory: "Quản Lí Box",
  usages: "antispam setspam/on/off [count] [time]",
  version: "1.0.0", 
  cooldowns: 0,
  description: 'Tự động kick người dùng khi spam trong nhóm',
};

const fs = require("fs-extra");
let antiSpamStatus = {};
let usersSpam = {};
const path = "./modules/commands/cache/data/antispamStatus.json";

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, senderID } = event;
  if (!fs.existsSync(path)) {
      antiSpamStatus = {};
      fs.writeFileSync(path, JSON.stringify(antiSpamStatus));
  } else {
      antiSpamStatus = JSON.parse(fs.readFileSync(path));
