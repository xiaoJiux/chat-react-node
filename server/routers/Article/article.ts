import {articleDB} from "../../db/article";
import {friendDB} from "../../db/friend";
import {Types} from "mongoose";

const router = require('koa-router')()
//发布动态
router.post('/write', async (ctx: any): Promise<void> => {
  let {content, user} = ctx.request.body
  try {
    await articleDB.create({content: content, user: user})
    // let msgRes = await msgDB.create({
    //   article: res._id
    // })
    // await articleDB.findByIdAndUpdate(res._id, {msg: msgRes._id})
    ctx.body = {
      code: 200,
      msg: '动态发布成功!'
    }
  } catch (err) {
    console.log(err)
  }

})

//获取所有好友动态
router.get('/all', async (ctx: any) => {
  if (ctx.session.userInfo) {
    let artList: Array<any> = []
    let list: { type?: Types.ObjectId | undefined, ref?: unknown }[]

    let r = await friendDB.findOne({u_id: ctx.session.userInfo._id})
    if (r) {
      list = [...r.f_id, ctx.session.userInfo._id]
      for (const listElement of list) {

        let article = await articleDB.find({user: listElement})
          .populate('user', {tx: 1, username: 1})
          .populate('likes', {username: 1})
        artList[0] ? artList = [...article] : artList = [...artList, ...article]
        if (ctx.session.userInfo._id === listElement && article) {
          artList.sort((x: any, y: any) => {
            return y.time - x.time;
          })

          ctx.body = {
            code: 200,
            data: artList
          }
        }
      }
    }
  }

})

//浏览监听
router.get('/monitor', async (ctx: any) => {

  let {_id} = ctx.query
  try {
    let res = await articleDB.updateOne({_id}, {
      $inc: {pageView: 1}
    })
    if (res.acknowledged === true) {
      ctx.body = {
        code: 200
      }
    }
  } catch (err) {
    console.log(err)
  }
})

//点赞
router.get('/like', async (ctx: any) => {
  if (ctx.session.userInfo) {
    //获取动态id
    let {_id} = ctx.query
    let res = await articleDB.updateOne({_id}, {
      $addToSet: {
        likes: ctx.session.userInfo._id
      }
    })

    if (res.acknowledged) {
      ctx.body = {
        code: 200
      }
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '请先登录!'
    }
  }
})
//取消点赞
router.get('/dislike', async (ctx: any) => {
  //获取动态id
  let {_id} = ctx.query
  let res = await articleDB.updateOne({_id}, {
    $pull: {
      likes: ctx.session.userInfo._id
    }
  })
  if (res.modifiedCount === 1 && res.acknowledged) {
    ctx.body = {
      code: 200,
      msg: 'success'
    }
  } else {
    ctx.body = {
      code: 403
    }
  }
})

module.exports = router.routes()
export {}
