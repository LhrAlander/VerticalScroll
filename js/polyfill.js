export const $ = selector => document.querySelector(selector)
export const applyStyle = (el, styleMedia) => {
  for (let i in styleMedia) {
    el.style[i] = styleMedia[i]
  }
}
export const ensureNumber = n => {
  return (typeof n === 'number' && !isNaN(n));
}
// 确保存在 requestAnimationFrame 和 cancelAnimationFrame 存在
let lastTime = 0
let vendors = ['webkit', 'moz', 'ms', 'o']
for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']
}
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    let currTime = new Date().getTime()
    let timeToCall = Math.max(0, 16 - (currTime - lastTime))
    let id = window.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id)
  }
}
