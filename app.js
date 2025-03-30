const modebtn = document.getElementById('mode-btn')
const colorOptions = Array.from(document.getElementsByClassName('color-option'))
const color = document.getElementById('color')
const linewidth = document.getElementById('line-width')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') // 그림을 그릴 때 사용
canvas.width = 800
canvas.height = 800
ctx.linewidth = linewidth.value
let isPainting = false
let isFilling = false

function onMove(evnet) {
  if (isPainting) {
    ctx.lineTo(evnet.offsetX, evnet.offsetY)
    ctx.stroke()
    return
  }
  ctx.beginPath()
  ctx.moveTo(evnet.offsetX, evnet.offsetY)
}
function startPainting(event) {
  // 마우스 누르고 있을 때 그림 그리기
  isPainting = true
}
function cancelPainting(event) {
  isPainting = false
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value
  ctx.fillStyle = event.target.value
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color
  ctx.strokeStyle = colorValue
  ctx.fillStyle = colorValue
  color.value = colorValue //선택한 색깔 알려줌
}
function onModeClick() {
  if (isFilling) {
    isFilling = false
    modebtn.innerText = 'Fill'
  } else {
    isFilling = true
    modebtn.innerText = 'Draw'
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800)
  }
}

canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('mouseup', cancelPainting)
canvas.addEventListener('mouseleave', cancelPainting)
canvas.addEventListener('click', onCanvasClick)

linewidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)
colorOptions.forEach((color) => color.addEventListener('click', onColorClick))
modebtn.addEventListener('click', onModeClick)
