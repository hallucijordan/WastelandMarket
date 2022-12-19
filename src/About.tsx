import React, { useRef, useState } from "react";
import "./css/About.css"
export function About(){
  const githubRef = useRef<HTMLAnchorElement>(null)
  const docRef = useRef<HTMLAnchorElement>(null)
  // const {shell} = require('@electron/remote')
  const {shell} = require('electron')
  const onClick = function(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>, ref:React.RefObject<HTMLAnchorElement>) {
    event.preventDefault()
    shell.openExternal(ref.current?.href)
  }
  return (<div className="about">
      <div className="title">WastelandMarket</div>
      <div className="version">v0.1</div>
      <div className="author">TaL</div>
      <a 
        ref={githubRef}
        onClick={(event)=>onClick(event, githubRef)}>
          Github
      </a>
      <a>&nbsp;&nbsp;&nbsp;</a>
      <a  
        ref={docRef}
        onClick={(event)=>onClick(event, docRef)}>
          Documents
      </a>
    </div>)
}