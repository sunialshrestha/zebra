import {
  DetailsView,
  FileManagerComponent,
  NavigationPane,
  Toolbar,
  Inject,
} from '@syncfusion/ej2-react-filemanager'
import * as React from 'react'

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

export default class FileManagerScreen extends React.Component {
  constructor() {
    super(...arguments)
    this.hostUrl =
      process.env.REACT_APP_SERVER_URL +
      ':' +
      process.env.REACT_APP_FILE_SERVER_PORT
  }

  userLogin = useSelector((state) => state.userLogin)
  userInfo = userLogin.userInfo

  onFileSelect(args) {
    console.log(args.fileDetails.name + ' has been ' + args.action + 'ed')
  }
  onSuccess(args) {
    console.log('Ajax request successful')
  }
  onFailure(args) {
    console.log('Ajax request has failed')
  }
  render() {
    return (
      <div className='control-section'>
        <FileManagerComponent
          id='file'
          view='LargeIcons'
          enablePersistence={true}
          ajaxSettings={{
            async: true,
            url: this.hostUrl,
            downloadUrl: this.hostUrl + '/Download',
            uploadUrl: this.hostUrl + '/Upload',
            getImageUrl: this.hostUrl + '/GetImage',
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
          fileSelect={this.onFileSelect.bind(this)}
          success={this.onSuccess.bind(this)}
          failure={this.onFailure.bind(this)}
        >
          <Inject services={[NavigationPane, DetailsView, Toolbar]} />
        </FileManagerComponent>
      </div>
    )
  }
}
