import React, { useState, useRef, useEffect } from 'react'
import { konva, Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'
import Konva from 'konva'
import { BiText } from 'react-icons/bi'
import { MdPhotoLibrary } from 'react-icons/md'
import { FaShapes } from 'react-icons/fa'
import { FaFileUpload } from 'react-icons/fa'
import { Tab, Tabs } from 'react-tabify'

import { Row, Col } from 'react-bootstrap'
import './fabric.css'
import AddFont from './AddFont'

import FontMenu from './FontMenu'

const DesignCanvas = () => {
  const stageEl = useRef()
  const layerEl = useRef()

  const [shapes, setShapes] = useState([])

  const [selectedId, selectShape] = useState(null)

  // const [x, setX] = useState(50)
  // const [y, setY] = useState(50)
  // const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    var stage = new Konva.Stage({
      container: 'stage',
      width: window.innerWidth,
      height: window.innerHeight,
      onMouseDown: (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage()
        if (clickedOnEmpty) {
          selectShape(null)
        }
      },
    })
    stageEl.current = stage
    stage.container().style.border = '1px solid grey'
    var layer = new Konva.Layer()
    layerEl.current = layer
    stage.add(layer)
  }, [])

  return (
    <Row ref={stageEl}>
      <Col md={4} id='tabify'>
        <Tabs stacked>
          <Tab
            label={
              <>
                <BiText class='menu-icon' />
                <br></br> Text
              </>
            }
          >
            <Tabs>
              <Tab label='Text'>
                <FontMenu
                  stage={stageEl}
                  layer={layerEl}
                  shapes={shapes}
                  setShapes={setShapes}
                />
              </Tab>
              <Tab label='Upload Font'>Fonts</Tab>
            </Tabs>
          </Tab>
          <Tab
            label={
              <>
                <MdPhotoLibrary class='menu-icon' />
                <br></br> Photo
              </>
            }
          >
            Photos content
          </Tab>
          <Tab
            label={
              <>
                <FaShapes class='menu-icon' />
                <br></br> Elements
              </>
            }
          >
            Elements shapes
          </Tab>
          <Tab
            label={
              <>
                <FaFileUpload class='menu-icon' />
                <br></br> Upload
              </>
            }
          >
            Upload content
          </Tab>
        </Tabs>
      </Col>
      <Col md={8}>
        <div id='stage'></div>
        {/* <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageEl}
          style={{ border: '1px solid grey' }}
          onMouseDown={(e) => {
            // deselect when clicked on empty area
            const clickedOnEmpty = e.target === e.target.getStage()
            if (clickedOnEmpty) {
              selectShape(null)
            }
          }}
        >
          <Layer ref={layerEl}>
            {/* <Rect
              x={20}
              y={50}
              width={300}
              height={200}
              stroke='black'
              strokewidth={2}
              dash={[10, 10]}
              draggable
              onDragStart={() => {
                setIsDragging(true)
              }}
              onDragEnd={(e) => {
                setIsDragging(false)
                setX(e.target.x())
                setY(e.target.y())
              }}
            /> */}
        {/* </Layer>
        </Stage>  */}
      </Col>
    </Row>
  )
}

export default DesignCanvas
