import React from 'react'
import Sidebar from './Sidebar'
import './Designer.css'
import StockImage from './StockImage'
import AddImage from './AddImage'
import SelectShirt from './SelectShirt'
import OrderProduct from './OrderProduct'

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations'

const Dash = () => {
  const headerText = [
    { text: 'Stock Image' },
    { text: 'Add Text' },
    { text: 'Order' },
    { text: 'Change Item' },
  ]

  const stockImage = () => {
    return <StockImage />
  }

  const addText = () => {
    return <AddImage />
  }

  const orderItem = () => {
    return <OrderProduct />
  }
  const selectItem = () => {
    return <SelectShirt />
  }
  return (
    <>
      <TabComponent
        id='default'
        heightAdjustMode='None'
        height={150}
        width='700'
        headerPlacement='Left'
      >
        <TabItemsDirective>
          <TabItemDirective header={headerText[0]} content={stockImage} />
          <TabItemDirective header={headerText[1]} content={addText} />
          <TabItemDirective header={headerText[2]} content={orderItem} />
          <TabItemDirective header={headerText[3]} content={selectItem} />
        </TabItemsDirective>
      </TabComponent>
    </>
  )
}

export default Dash
