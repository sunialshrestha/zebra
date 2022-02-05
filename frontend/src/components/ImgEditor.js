import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

const myTheme = {
  // Theme object to extends default dark theme.
}

const imageEditorOptions = {
  // sort of option properties.
}

class ImgEditor extends React.Component {
  editorRef = React.createRef()

  handleClickButton = () => {
    const editorInstance = this.editorRef.current.getInstance()

    editorInstance.flipX()
  }

  render() {
    return (
      <>
        <ImageEditor
          ref={this.editorRef}
          {...imageEditorOptions}
          includeUI={{
            loadImage: {
              path: 'http://127.0.0.1:5000/uploads/blogs/image-1631799658590.jpg',
              name: 'SampleImage',
            },
            theme: myTheme,
            menu: ['shape', 'filter'],
            initMenu: 'filter',
            uiSize: {
              width: '1000px',
              height: '700px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        />
        <button onClick={this.handleClickButton}>Flip image by X Axis!</button>
      </>
    )
  }
}
export default ImgEditor
