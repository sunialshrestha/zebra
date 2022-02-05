import React from 'react'
import { Rnd } from 'react-rnd'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
}

class Box extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: 320, height: 200, x: 0, y: 0 }
  }
  render() {
    return (
      <Rnd
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y })
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          })
        }}
      >
        <div
          className='box'
          style={{ margin: 0, height: '100%', paddingBottom: '40px' }}
        >
          <img src='https://i.ibb.co/0QwbKnw/design.jpg' alt='design tshirt' />
        </div>
      </Rnd>
    )
  }
}

export default Box
