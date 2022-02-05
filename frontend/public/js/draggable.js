var xStart
var yStart
var imgOriginTop = 0
var imgOriginLeft = 0
var draggableElem = document.querySelector('#draggable')

console.log(draggableElem)

function moveDraggable(event) {
  var offsetX = event.clientX - parseInt(xStart)
  var offsetY = event.clientY - parseInt(yStart)
  console.log(parseInt(imgOriginLeft) + offsetX + 'px')
  draggableElem.style.backgroundPositionX =
    parseInt(imgOriginLeft) + offsetX + 'px'
  draggableElem.style.backgroundPositionY =
    parseInt(imgOriginTop) + offsetY + 'px'
}

document.addEventListener(
  'dragstart',
  function (event) {
    xStart = event.clientX
    yStart = event.clientY

    var img = document.createElement('img')
    img.src = ''
    img.width = 0
    img.height = 0
    event.dataTransfer.setDragImage(img, 0, 0)

    imgOriginLeft = draggableElem.style.backgroundPositionX
    imgOriginTop = draggableElem.style.backgroundPositionY
  },
  false,
)

document.addEventListener(
  'drag',
  function (event) {
    moveDraggable(event)
  },
  false,
)

document.addEventListener(
  'dragend',
  function (event) {
    moveDraggable(event)
    imgOriginLeft = parseInt(draggableElem.style.backgroundPositionX)
    imgOriginTop = parseInt(draggableElem.style.backgroundPositionY)
  },
  false,
)
