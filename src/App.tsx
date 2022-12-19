import React, { useState } from 'react'
import './css/App.css'
import { Image } from './Image'
import { Settings } from './Settings'
import { About } from './About'
import { Sidebar } from './Sidebar'
import { Text } from './Text'
import { Album } from './Album'

function App() {
  const [mode, setMode] = useState('Image')
  let mainPage = <Image />
  function modeChange(text:string){
    setMode(text)
  }
  switch(mode) {
    case '文件上传':
      mainPage = <Image />
      break
    case '文本（实时聊天）':
      mainPage = <Text />
      break
    case '文件预览':
      mainPage = <Album />
      break
    case '关于':
      mainPage = <About />
      break
    case '设置':
      mainPage = <Settings />
      break
  }

  return (
    <div className="App">
      <div className="App-main">
        <div className='side'>
          <Sidebar change={modeChange} mode={mode}/>
        </div>
        <div className='main'>
          {mainPage}
        </div>
        
      </div>
    </div>
  )
}

export default App
