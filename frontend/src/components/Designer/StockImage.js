import {
  DetailsView,
  FileManagerComponent,
  Inject,
} from '@syncfusion/ej2-react-filemanager'

import React, { useEffect } from 'react'

import '../../../node_modules/@syncfusion/ej2-base/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-icons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-layouts/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-grids/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-react-filemanager/styles/material.css'

import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../Helpers'

const StockImage = ({ history }) => {
  var drag, file
  const hostUrl =
    process.env.REACT_APP_SERVER_URL +
    ':' +
    process.env.REACT_APP_FILE_SERVER_PORT

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const onFileSelect = (args) => {
    console.log(args.fileDetails.name + ' has been ' + args.action + 'ed')
  }
  const onCreated = () => {
    file = document.getElementsByClassName('e-filemanager')[0].ej2_instances[0]
    drag = file.uploadObj.dropArea //to store the drop area element
  }
  const onSuccess = (args) => {
    if (args.action === 'read' && args.result.files.length === 0) {
      file.uploadObj.dropArea = null
    } else {
      file.uploadObj.dropArea = drag
    }
  }
  const onFailure = (args) => {
    console.log('Ajax request has failed')
  }
  console.log(userLogin)

  useEffect(() => {
    if (isEmpty(userInfo)) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <div className='control-section'>
        <FileManagerComponent
          id='file'
          view='LargeIcons'
          showThumbnail={true}
          enablePersistence={true}
          ajaxSettings={{
            async: true,
            url: hostUrl,
            downloadUrl: hostUrl + '/Download',
            getImageUrl: hostUrl + '/GetImage',
          }}
          detailsViewSettings={{
            columns: [
              {
                field: 'name',
                headerText: 'File Name',
                minWidth: 120,
                width: 'auto',
                customAttributes: { class: 'e-fe-grid-name' },
                template: '${name}',
              },
            ],
          }}
          contextMenuSettings={{
            visible: false,
          }}
          fileSelect={onFileSelect}
          created={onCreated}
          success={onSuccess}
          failure={onFailure}
        >
          <Inject services={[DetailsView]} />
        </FileManagerComponent>
      </div>
    </>
  )
}

export default StockImage
