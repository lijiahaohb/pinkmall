import { ADD_COUNT, ADD_TO_CART } from "./mutation-types"

export default {
    // 如果函数具有判断逻辑或者函数是异步函数最好放在actions中
    addCart(context, payload) {
        return new Promise((reslove, reject) => {
            // 1. 查找之前数组中是否含有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2. 判断oldProduct是否存在
            if (oldProduct) {
                context.commit(ADD_COUNT, oldProduct)
                reslove("商品数量增加")
            } else {
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                reslove("添加了新的商品")
            }

        })
    }
}
