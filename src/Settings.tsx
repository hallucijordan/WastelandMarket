import React, { useState } from "react"
import { store } from "./utils"
import "./css/Settings.css"

export function Settings() {
  const [token, setToken] = useState(()=>store("token",""))
  const [repo, setRepo] = useState(()=>store("repo",""))
	const [tokenText, setTokenText] = useState('')
  const [repoText, setRepoText] = useState('')

	const onTokenChange = function(event:React.ChangeEvent<HTMLInputElement>) {
		setTokenText(event.target.value)
	}
  const onRepoChange = function(event:React.ChangeEvent<HTMLInputElement>) {
		setRepoText(event.target.value)
	}
	const onTokenKeydown = function(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == 'Enter') {
			event.preventDefault() 
			const val = tokenText.trim() //去除前后空白字符
			if (val) {
        store("token", val)
        setToken(val)
        setTokenText('')
			}
		}
	}
  const onRepoKeydown = function(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == 'Enter') {
			event.preventDefault() 
			const val = repoText.trim() //去除前后空白字符
			if (val) {
        store("repo", val)
        setRepo(val)
        setRepoText('')
			}
		}
	}
	return (
		<div className="settings">
      {/* <div className="item">
        <div className="key">Your current token:</div>
        <div className="value">{token}</div>
      </div> */}
      <div className="item">
        <div className="key">输入您的token:</div>
        <input
          className="input"
          placeholder="Enter your github token here"
          value={tokenText}
          onKeyDown={onTokenKeydown}
          onChange={onTokenChange}
        />
      </div>
      <div className="item">
        <div className="key">您目前所在项目（GitHub库）:</div>
        <div className="value">{repo}</div>
      </div>
      <div className="item">
        <div className="key">在这更换您的项目源:</div>
        <input
          className="input"
          placeholder="Example: xxx/xxx"
          value={repoText}
          onKeyDown={onRepoKeydown}
          onChange={onRepoChange}
        />
      </div>
    </div>
		
	)
}