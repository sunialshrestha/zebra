import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AddFont from './AddFont'

const FontMenu = ({ stage, layer, shapes, setShapes }) => {
  const onSelectFontStyle = (e) => {
    const id = AddFont(
      stage.current.getStage(),
      layer.current,
      e.currentTarget.id,
    )
    const shs = shapes.concat([id])
    setShapes(shs)
  }
  return (
    <>
      <Row id='text-style'>
        <Col id='header' sm={12} onClick={onSelectFontStyle}>
          <h1> Header</h1>
        </Col>
        <Col id='subHeader' sm={12} onClick={onSelectFontStyle}>
          <h2> Sub Header</h2>
        </Col>
        <Col id='normal' sm={12} onClick={onSelectFontStyle}>
          <p> normal Text</p>
        </Col>
      </Row>
    </>
  )
}

export default FontMenu
