import React, { useState } from 'react'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import { MyProvider } from '../context/context';
import { SidebarProvider } from '../context/SidebarContext';
function Search() {

  const [changeContent, setchangeContent] = useState(0)

  return (
    <div className="flex  w-full h-[100vh] relative overflow-x-clip overflow-y-auto  ">

      <SidebarProvider>
        <SideBar setchangeContent={setchangeContent} changeContent={changeContent} />
        <MyProvider>
          <Content setchangeContent={setchangeContent} changeContent={changeContent} />
        </MyProvider>
      </SidebarProvider>
    </div>
  )
}

export default Search