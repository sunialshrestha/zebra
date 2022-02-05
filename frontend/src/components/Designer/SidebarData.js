import React from 'react'
import {
  AiOutlineHome,
  AiOutlineFileSearch,
  AiOutlineFontColors,
} from 'react-icons/ai'
import { RiProductHuntLine } from 'react-icons/ri'
import { FaBuyNLarge } from 'react-icons/fa'

export const SidebarData = [
  {
    title: 'Home',
    icon: <AiOutlineHome />,
    link: '/home',
  },
  {
    title: 'Image Browser',
    icon: <AiOutlineFileSearch />,
    link: '/imagebrowser',
  },
  {
    title: 'Font',
    icon: <AiOutlineFontColors />,
    link: '/home',
  },
  {
    title: 'Product Base',
    icon: <RiProductHuntLine />,
    link: '/productbase',
  },
  {
    title: 'Order',
    icon: <FaBuyNLarge />,
    link: '/orderdesign',
  },
]
