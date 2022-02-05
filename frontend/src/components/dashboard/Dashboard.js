import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Setting from '../design/Setting'
import Display from '../design/Display'
import axios from 'axios'

class Dashboard extends React.Component {
  state = {
    tshirtColor: 'black',
    upperText: 'This is upper text',
    lowerText: 'This is lower text',
    memeImg: '',
    url: '',
    textSize: 38,
    message: '',
    percentage: 0,
  }
  /*
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)
*/
  handleTshirtColor = (e) => {
    this.setState({ tshirtColor: e.target.id })
  }

  handleUpperText = (e) => {
    this.setState({ upperText: e.target.value })
  }

  handleLowerText = (e) => {
    this.setState({ lowerText: e.target.value })
  }

  handleTextSize = (e) => {
    this.setState({ textSize: e.target.value })
  }

  formatText() {
    const size = this.state.textSize
    return parseInt(size)
  }

  handleUploadImg = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('upload', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgess: (ProgressEvent) => {
          this.setState({
            percentage: () => {
              parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total),
              )
            },
          })
          // Clear Percentage
          setTimeout(() => this.setState({ percentage: 0 }), 10000)
        },
      }

      const { data } = await axios.post(`/api/postimage`, formData, config)

      this.setState({ url: data.url })
      this.setState({ message: 'File Uploaded' })
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({ message: 'There was a problem with the server' })
      } else {
        this.setState({ message: error.response.data.msg })
      }
    }
  }
  render() {
    return (
      <>
        <Container style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Row>
            <Col lg={8}>
              <Display display={this.state} textFormat={this.formatText()} />
            </Col>
            <Col lg={4}>
              <Setting
                color={this.handleTshirtColor}
                upperText={this.handleUpperText}
                lowerText={this.handleLowerText}
                handleUploadImg={this.handleUploadImg}
                uploadPercentage={this.uploadPercentage}
                textSize={this.handleTextSize}
              />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Dashboard
