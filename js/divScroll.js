import { $, applyStyle, ensureNumber } from './polyfill'
function CountScroll (options) {
  this.targetVal = null
  // 初始化需要的参数
  this.options = {
    el: null,
    currentVal: 1,
    size: 10,
    duration: 500
  }
  // 显示区域的大小存储
  this.itemSize = {
    width: 0,
    height: 0
  }
  // 涉及到的 HTML Element
  this.el = {
    wrapperEl: null,
    firstWrapper: null,
    secondWrapper: null
  }
  // 滚动所需的一系列参数
  this.scrollOp = {
    startTime: null,
    targetST: null,
    currentST: null
  }
  // 报错信息提示
  Object.defineProperty(this, 'error', {
    set: function (error) {
      console.error(error)
    }
  })
  this._init_(options)
}

/**
 * 画出两个竖直排列的 div，同时将位置移至当前数值位置
 * @param{配置项} options
 */
CountScroll.prototype._init_ = function (options) {
  if (typeof options.el !== 'string') {
    this.error = 'typeError: \'el\' is not a string'
    return
  }
  let parentEl = $(options.el)
  if (!parentEl) {
    this.error = `el not founded: can not find a element by selector '${options.el}'`
    return
  }
  parentEl.childNodes.forEach(node => {
    console.log(node)
    parentEl.removeChild(node)
  })
  let styleItems = {
    display: 'flex',
    'flex-direction': 'column',
    'overflow': 'auto'
  }
  applyStyle(parentEl, styleItems)
  this.options.el = parentEl
  this.options.currentVal = options.currentVal >= 0 ? options.currentVal : this.options.currentVal
  this.options.currentVal = options.size >= 0 ? options.currentVal : this.options.currentVal
  this.options.duration = options.size >= 0 ? options.duration : this.options.duration
  let wrapperEl = document.createElement('div')
  let firstWrapper = document.createElement('div')
  styleItems = {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  }
  applyStyle(wrapperEl, styleItems)
  // 单个框的宽高
  this.itemSize = {
    width: parentEl.getBoundingClientRect().width,
    height: parentEl.getBoundingClientRect().height
  }
  styleItems = {
    display: 'block',
    width: '100%',
    height: '100px',
    'flex-shrink': '0'
  }
  for (let i = 0, length = this.options.size; i < length; i++) {
    let item = document.createElement('div')
    applyStyle(item, styleItems)
    item.innerHTML = i
    firstWrapper.appendChild(item)
  }
  let secondWrapper = firstWrapper.cloneNode(true)
  wrapperEl.appendChild(firstWrapper)
  wrapperEl.appendChild(secondWrapper)
  parentEl.appendChild(wrapperEl)
  this.el.wrapperEl = wrapperEl
  this.el.firstWrapper = firstWrapper
  this.el.secondWrapper = secondWrapper
  wrapperEl.scrollTop = this.options.currentVal * this.itemSize.height
}

/**
 * 设置滚动结束点
 */
CountScroll.prototype.setTargetVal = function (val) {
  if (!ensureNumber(val)) {
    this.error = 'typeError: target value is not a number'
    return
  }
  this.targetVal = val
  this.scrollOp.lastTime = null
  this.scrollOp.startTime = null
  this.scrollOp.targetST = (this.options.size + val) * this.itemSize.height
  this.scrollOp.currentST = this.el.wrapperEl.scrollTop
  return this
}

/**
 * 开始滚动
 */
CountScroll.prototype.startScroll = function (cb) {
  console.log(this)
  if (!this.options.el) return
  const animationFn = timeStamp => {
    if (!this.scrollOp.startTime) this.scrollOp.startTime = timeStamp
    if (this.el.wrapperEl.scrollTop >= this.scrollOp.targetST) {
      this.el.wrapperEl.scrollTop = this.scrollOp.targetST - (this.options.size * this.itemSize.height)
      cancelAnimationFrame(this.rAF)
      if (cb && typeof cb === 'function') cb()
    } else {
      let progress = timeStamp - this.scrollOp.startTime
      let delta = (this.scrollOp.targetST - this.scrollOp.currentST) * progress / this.options.duration
      this.el.wrapperEl.scrollTop = delta + this.scrollOp.currentST
      requestAnimationFrame(animationFn)
    }
  }
  this.rAF = requestAnimationFrame(animationFn)
}
