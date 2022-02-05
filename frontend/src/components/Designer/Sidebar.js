import React from 'react'
import { SidebarData } from './SidebarData'

const Sidebar = () => {
  return (
    <>
      <a
        className='nav-link active'
        id='v-tabs-home-tab'
        data-mdb-toggle='tab'
        href='#v-tabs-home'
        role='tab'
        aria-controls='v-tabs-home'
        aria-selected='true'
      >
        Home
      </a>
      <a
        className='nav-link'
        id='v-tabs-profile-tab'
        data-mdb-toggle='tab'
        href='#v-tabs-profile'
        role='tab'
        aria-controls='v-tabs-profile'
        aria-selected='false'
      >
        Profile
      </a>
      <a
        className='nav-link'
        id='v-tabs-messages-tab'
        data-mdb-toggle='tab'
        href='#v-tabs-messages'
        role='tab'
        aria-controls='v-tabs-messages'
        aria-selected='false'
      >
        Messages
      </a>
    </>
  )
}

export default Sidebar
