import {chartDB} from "../../db/chart";

const cookie = require('cookie')
const ws = require('ws')

let socket = (server: any) => {
  const wss = new ws.Server({server})
  console.log('ws服务启动')
  wss.on('connection', async (client: any, req: any) => {
    //sid获取
    if (req.headers.cookie) {
      client.sid = cookie.parse(req.headers.cookie)['koa.sess']
    }

    client.on('message', async (msg: any) => {
      const data = JSON.parse(msg)

      try {
        //更新聊天数据
        let resultData = await chartDB.findOneAndUpdate({
          to: data.to,
          from: data.from
        }, {
          $push: {
            chartList: {
              user: data.from,
              msg: data.msg
            }
          }
        }, {
          new: true,
          upsert: true
        })
          .populate('chartList.user', {tx: 1, username: 1})
        await chartDB.findOneAndUpdate({
          to: data.from,
          from: data.to
        }, {
          $push: {
            chartList: {
              user: data.from,
              msg: data.msg
            }
          }
        }, {
          upsert: true
        })

        //传输聊天数据
        wss.clients.forEach((client: any) => {
          client.send(JSON.stringify(resultData))
        })

      } catch (err) {
        console.error(err);
      }
    })
    client.on('close', async () => {
      // await userDB.updateOne({_id: _id}, {
      //   online: false
      // })
    })
  })
}

module.exports = socket


