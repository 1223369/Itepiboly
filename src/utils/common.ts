// 事件防抖
export const directive = (app: any) => {
  app.directive('debounce', {
    mounted(el:any,binding: Function) {
      if (typeof binding.value !== 'function') return
      el.timer = null
      el.hander = function() {
        if (el.timer) clearTimeout(el.timer)

        el.timer = setTimeout(() => {
          binding.value.apply(el, arguments)
        },600)
      }

      el.addEventListener('click', el.hander)
    },

    onBeforeMount(el:any, binding: Function) {
      if (el.timer) {
        el.time = null
        clearTimeout(el.timer)
      }
      el.removeEventListener('click', el.hander)
    }
  })
}

// 格式化性别
export const formatGender =  {
  sex: function (type: number) {
    if (type === 1) return '男'
    else if (type === 2) return '女'
    else return '未知'
  }
}