import {friendDB} from "../../db/friend";
import {userDB} from "../../db/user";

const router = require('koa-router')()
//获取所有好友
router.get('/', async (ctx: any) => {
  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 402,
      msg: '用户未登录'
    }
  }
  let u_id = ctx.session.userInfo._id
  let data = await friendDB
    .findOne({u_id}, {f_id: 1})
    .populate('f_id', {tx: 1, username: 1, online: 1})
  if (data !== null) {
    return ctx.body = {
      code: 200,
      data: data.f_id
    }
  }
})

//搜索框好友
router.get('/search', async (ctx: any) => {
  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 601,
      msg: '未登录!'
    }
  }
  try {
    let {keyword} = ctx.query
    let reg = new RegExp(keyword, 'i')
    let result = await userDB.find({
      $or: [{
        username: {$regex: reg}
      }]
    }, {
      username: 1,
      _id: 0
    }, {
      limit: 3
    })
    let res = []
    for (const item of result) {
      res.push({value: item.username})
    }

    ctx.body = {
      code: 200,
      data: res
    }
  } catch (err) {
    console.error(err)
    ctx.body = {
      code: 404,
      msg: '服务器出错了'
    }
  }
})

//添加好友
router.post('/add', async (ctx: any) => {
  let {username} = ctx.request.body
  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 601,
      msg: '未登录!'
    }
  }


  try {
    let doc = await userDB.findOne({username})
    let _id = ctx.session.userInfo
    let f_id = doc ? doc._id : null;//好友id
    if (username === ctx.session.userInfo.username) {
      return ctx.body = {
        code: 207,
        msg: '不能添加自己为好友哦~'
      }
    }
    //用户不为空,且不为自己
    if (username && ctx.session.userInfo.username && f_id) {

      await friendDB.find({
        f_id: {
          $elemMatch: {$eq: f_id}
        }
      }).then(async (r) => {
        //如果列表没找到这个人,添加好友
        if (r.length === 0) {
          //添加好友
          await friendDB.updateOne({u_id: _id}, {
            $push: {f_id}
          }).then((r) => {
            //修改成功
            if (r.modifiedCount === 1) {
              return ctx.body = {
                code: 200,
                msg: '添加成功'
              }
            } else {
              return ctx.body = {
                code: 401,
                msg: '添加失败'
              }
            }
          })
        } else {
          return ctx.body = {
            code: 208,
            msg: '对不起,他已经是你好友咯~'
          }
        }
      })

    }
  } catch (err) {
    console.error(err)
  }
})

//搜索
router.get('/findOne', async (ctx: any) => {
  try {
    let {_id} = ctx.query
    let doc = await userDB
      .findById(_id, {password: 0})

    if (doc) {
      ctx.body = {
        code: 200,
        data: doc
      }
    }
  } catch (err) {
    console.error(err)
  }

})


module.exports = router.routes()
export {}
