var width = window.innerWidth
var height = window.innerHeight

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
})

var layer = new Konva.Layer()
stage.add(layer)

let currentShape
// setup menu
document.getElementById('Rect').addEventListener('click', function () {
  let item = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true,
  })
  var tr = new Konva.Transformer()
  layer.add(tr)
  layer.add(item)
  tr.nodes([item])
  layer.draw()
})
document.getElementById('Button').addEventListener('click', function () {
  console.log('hello')
  let layer = new Konva.Layer()

  let item = new Konva.Circle({
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 10,
    draggable: true,
  })
  var tr = new Konva.Transformer()
  layer.add(tr)
  layer.add(item)
  tr.nodes([item])
  stage.add(layer)
  stage.draw()
})

var menuNode = document.getElementById('menu')
document.getElementById('delete-button').addEventListener('click', () => {
  const tr = layer
    .find('Transformer')
    .toArray()
    .find((tr) => tr.nodes()[0] === currentShape)
  tr.destroy()
  currentShape.destroy()
  layer.draw()
})

window.addEventListener('click', () => {
  // hide menu
  menuNode.style.display = 'none'
})

stage.on('contextmenu', function (e) {
  // prevent default behavior
  e.evt.preventDefault()
  if (e.target === stage) {
    // if we are on empty place of the stage we will do nothing
    return
  }
  currentShape = e.target
  console.log(currentShape)
  // show menu
  menuNode.style.display = 'initial'
  var containerRect = stage.container().getBoundingClientRect()
  menuNode.style.top =
    containerRect.top + stage.getPointerPosition().y + 4 + 'px'
  menuNode.style.left =
    containerRect.left + stage.getPointerPosition().x + 4 + 'px'
})
