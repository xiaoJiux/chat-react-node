import {chartDB} from "../../db/chart";

const router = require('koa-router')()

router.post('/findChart', async (ctx: any) => {
  let {from, to} = ctx.request.body
  let data = await chartDB.findOne({to, from})
    .populate('chartList.user', {tx: 1, username: 1})

  if (data) {
    ctx.body = {
      code: 200,
      data: data.chartList
    }
  } else {
    ctx.body = {
      code: 201,
      msg: '暂时没有聊天记录~',
      data: []
    }
  }
})
module.exports = router.routes()
export {}
