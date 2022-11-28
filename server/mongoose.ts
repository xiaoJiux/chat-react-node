import {connect} from "mongoose";
import {userDB} from './db/user'
import {friendDB} from "./db/friend";
import {articleDB} from "./db/article";
import {msgDB} from "./db/message";


run()
  .then(() => console.log("数据库已启动"))
  .catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/MyProject');
  await userDB
  // await sessionDB
  await friendDB
  await articleDB
  await msgDB
}


export {}
