/**
 * @description 统一接口返回格式
 * @param {*} option
 */
export const reponseBody = (option: any = {}) => { // 先any
  return (ctx: any, next: any) => {
    ctx.success = (data: any, type: string) => {
      ctx.type = type || option.type || 'json'
      ctx.body = {
        code: option.successCode || '0',
        msg: option.successMsg || '请求成功',
        data
      }
    }
    ctx.fail = (msg: string, code: string) => {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.failCode || code || '-1',
        msg: msg || option.failMsg || '请求失败'
      }
    }
    next()
  }
}
