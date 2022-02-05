import {
  DetailsView,
  FileManagerComponent,
  NavigationPane,
  Toolbar,
  Inject,
} from '@syncfusion/ej2-react-filemanager'

import React, { useState, useEffect } from 'react'

import '../../node_modules/@syncfusion/ej2-base/styles/material.css'
import '../../node_modules/@syncfusion/ej2-icons/styles/material.css'
import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '../../node_modules/@syncfusion/ej2-popups/styles/material.css'
import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css'
import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css'
import '../../node_modules/@syncfusion/ej2-grids/styles/material.css'
import '../../node_modules/@syncfusion/ej2-react-filemanager/styles/material.css'

import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../Helpers'

const FileManagerScreen = ({ history }) => {
  const hostUrl =
    process.env.REACT_APP_SERVER_URL +
    ':' +
    process.env.REACT_APP_FILE_SERVER_PORT

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const onFileSelect = (args) => {
    console.log(args.fileDetails.name + ' has been ' + args.action + 'ed')
  }
  const onSuccess = (args) => {
    console.log('Ajax request successful')
  }
  const onFailure = (args) => {
    console.log('Ajax request has failed')
  }

  useEffect(() => {
    if (isEmpty(userInfo)) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      {!isEmpty(userInfo) ? (
        !userInfo.isAdmin ? (
          <h3> Please Login as Admin</h3>
        ) : (
          <>
            <div className='control-section'>
              <FileManagerComponent
                id='file'
                view='LargeIcons'
                enablePersistence={true}
                ajaxSettings={{
                  async: true,
                  url: hostUrl,
                  downloadUrl: hostUrl + '/Download',
                  uploadUrl: hostUrl + '/Upload',
                  getImageUrl: hostUrl + '/GetImage',
                }}
                uploadSettings={{
                  maxFileSize: 2333320,
                  minFileSize: 120,
                  autoUpload: true,
                  allowedExtensions: '.jpg,.png,.jpeg,.svg,.eps,.gif',
                }}
                navigationPaneSettings={{
                  maxWidth: '850px',
                  minWidth: '140px',
                  visible: true,
                }}
                fileSelect={onFileSelect}
                success={onSuccess}
                failure={onFailure}
              >
                <Inject services={[NavigationPane, DetailsView, Toolbar]} />
              </FileManagerComponent>
            </div>
          </>
        )
      ) : (
        'Only Admin is allowed'
      )}
    </>
  )
}

export default FileManagerScreen
