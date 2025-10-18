
# PC与移动端的触摸事件兼容处理
## 为什么pointermove 在鼠标未按下时也会触发？
这是一个很常见的误解——**pointermove 是否在未按下时触发，取决于浏览器实现和设备类型**，不是永远只在“按下后才触发”！


##  pointermove 实际行为

| 设备         | pointermove 未按下时是否触发？       |
| ---------- | --------------------------- |
| 触摸屏（touch） | ✅ 只在按下后移动才触发（符合预期）          |
| 鼠标（mouse）  | ❌ 只要鼠标在元素上移动就会触发（不符合“滑动”行为） |



##  为什么会这样？

Pointer Events 设计的目标是统一“输入设备”（鼠标、触摸笔、手指），
**但是鼠标的 pointermove = mousemove 行为本身就是不需要按下就触发的。**

所以浏览器遵循了鼠标原本的行为。


## 正确判断“是否在滑动”的方式

无论你用 mousemove、pointermove，正确的做法都是：
- 在 pointerdown / mousedown 时开启移动
- 在 pointerup / mouseup 时关闭移动
- 用一个标记位 isDown 判断是否正在滑动


##  兼容写法（鼠标 + 触摸 + pointer）


```vue
<template>
  <div
    @pointerdown="pointerDown"
    @pointerup="pointerUp"
    @pointercancel="pointerUp"
    @touchstart.prevent="start"   <!-- 兜底，防止某些安卓不触发 pointer -->
    @touchend="end"
  >
    <!-- 内容 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDown: false
    }
  },
  methods: {
    pointerDown(e) {
      this.isDown = true
      this.start(e)
      window.addEventListener('pointermove', this.pointerMove)
      window.addEventListener('pointerup', this.pointerUp)
      window.addEventListener('pointercancel', this.pointerUp)
    },
    pointerMove(e) {
      if (!this.isDown) return
      this.move(e)
    },
    pointerUp(e) {
      if (!this.isDown) return
      this.isDown = false
      this.end(e)
      window.removeEventListener('pointermove', this.pointerMove)
      window.removeEventListener('pointerup', this.pointerUp)
      window.removeEventListener('pointercancel', this.pointerUp)
    },
    start(e) {
      // 记录起点
    },
    move(e) {
      // 计算滑动
    },
    end(e) {
      // 结束处理
    }
  }
}
</script>
```

---

##  结论

💡 **pointermove 在鼠标设备上仍然等于 mousemove，会在未按下时触发，这是正常的。**

👉 要实现“滑动”，不要依赖事件本身行为，而要自己控制“按下后才处理移动”。
