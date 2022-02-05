import React from 'react'
import './decorate.css'

const DesignsScreen = () => {
  React.useEffect(() => {
    const LoadExternalScript = () => {
      const externalScript = document.createElement('script')
      // externalScript.onerror = loadError;
      externalScript.id = 'external'
      externalScript.type = 'text/javascript'
      document.body.appendChild(externalScript)
      externalScript.src = '/js/draggable.js'
    }
    LoadExternalScript()
  }, [])
  return (
    <>
      <div
        id='draggable'
        draggable='true'
        style={{ backgroundPosition: '0px 0px' }}
      ></div>
    </>
  )
}

export default DesignsScreen
