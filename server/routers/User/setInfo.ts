const router = require('koa-router')()
import {userDB} from "../../db/user";

router.post('/', async (ctx: any) => {
  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 401,
      msg: '未登录!'
    }
  }
  let data = ctx.request.body
  await userDB.findByIdAndUpdate(ctx.session.userInfo._id, data)
  ctx.session.userInfo = {...ctx.session.userInfo, ...data}
  ctx.body = {
    code: 200,
    msg: '修改成功!'
  }
})
export {}
module.exports = router.routes()
