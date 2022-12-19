import React from "react";
import "./css/Sidebar.css"
interface sidebarProps{
  change: (text:string) => void
  mode: string
}
export function Sidebar(props:sidebarProps){
  const menu = ["文件上传","文本（实时聊天）","文件预览", "设置", "关于"]
  const menuItems = menu.map(item => (
    <div className={`menuitem${item==props.mode}`} onClick={()=>props.change(item)}>
      {item}
    </div>
  ))
  return (<div className="menu">
    {menuItems}
  </div>)
}