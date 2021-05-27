// 防抖函数
export function debounce(func, delay) {
    let timer = null

    return function(...args) {
        if(timer)
            timer = clearTimeout()
        timer = setTimeout(() => {
            func.apply(this)
        }, delay)
    }
}
