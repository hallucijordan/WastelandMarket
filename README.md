# WastelandMarket 项目报告



[TOC]

## Introduction

在github共同开发的过程当中，我们往往需要与团队共同合作，在开发的仓库中访问内容，从而实现文件的共享与伪实时传输。除公共仓库外，我们新加入的开发者需要personal token才能畅通无阻的访问仓库，下载仓库内容，上传仓库内容等。对于资深的开发者而言，github的文件传输功能无疑是一个高效，简洁的工具。然而，对于初学者而言们往往因信息的缺失等原因无法快速上手这一开发工具。与此同时，由于网页访问的天生限制，github的访问便捷程度显然无法与桌面应用相比(尽管有github desktop的存在，其使用便利程度却一言难尽)。因此，我们希望着手这个问题，开发一款桌面应用。

![image-20221222214937772](/WastelandMarket/img_source/)





框架：Vite+React+Electron

## Goal

在这款桌面应用中，我们希望尽可能让github上传的流程变得便捷，比如仅仅输入personal token 和项目repository来实现上传，预览，下载等功能。因此，我们的重点将聚焦于如何设计一个简介的ui界面。而在后端功能实现上，我们希望主要聚焦于以下几个功能的实现：

1. 文件上传
2. 文字实时聊天（通过txt文件的上传与访问）
3. 文件上传情况预览

## Realization

为实现上述目标，我们使用了如下框架来完成我们的开发：Vite+React+Electron

Vite作为前端构建工具为我们的主程序，外部模块，素材等搭建基本框架，这一点可以从我们的打包文件中窥见。

React则为我们构建所用的主力框架，利用其自带的一些功能包和js编程，我们实现了从前端的设计到后端的功能实现。

而Electron，则为我们提供了方便的执行结果展示，生成了我们所需的桌面应用。

接下来，我们就分别从前端和后端两方面来简要陈述我们的实现流程。

### Frontend
### Backend

后端的实现主要有以下几个方面

首先是工具包的定义，为了实现与github服务器交互的功能，工具包中详细定义了如何使用HTTP超文本协议实现上传，下载，删除等操作的具体实现，而为了使上传命令能够与token等信息有机结合，首先定义store

```javascript
export function store(namespace:string, data:string) {
	if (data) { 
	  return localStorage.setItem(namespace, JSON.stringify(data));
	}
	const store = localStorage.getItem(namespace);
	return (store && JSON.parse(store)) || [];
}
```

在此基础上，我们分别定义upload, download,del函数，分别实现上传，下载，删除操作

```javascript
export async function upload(url: RequestInfo, value: string, sha: string) {
  const response = await fetch(url,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + store("token", "")
    },
    body: JSON.stringify({
      message: "my commit",
      content: value,
      sha: sha
    }),
    mode: 'cors'
  })
  return (async res => {
    if (res.status >= 200 && res.status < 400) {
      return {
        status: res.status,
        data: await res.json()
      }
    } else {
      return {
        status: res.status,
        data: null
      }
    }
  })(response).catch(e => e)
}
export async function del (url: RequestInfo, sha: string){

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + store("token", "")
    },
    body: JSON.stringify({
      message: "my commit",
      sha: sha
    }),
    mode:"cors"
  })


  return (async res => {
    if (res.status >= 200 && res.status < 400) {
      return {
        status: res.status,
        data: await res.json()
      }
    } else {
      return {
        status: res.status,
        data: null
      }
    }
  })(response).catch(e => e)
}
export async function del (url: RequestInfo, sha: string){

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + store("token", "")
    },
    body: JSON.stringify({
      message: "my commit",
      sha: sha
    }),
    mode:"cors"
  })


  return (async res => {
    if (res.status >= 200 && res.status < 400) {
      return {
        status: res.status,
        data: await res.json()
      }
    } else {
      return {
        status: res.status,
        data: null
      }
    }
  })(response).catch(e => e)
}
```

定义完工具箱后，我们紧接便以此为基础构建每个页面的后端实现。

1.文件上传

核心是利用upload结合github仓库的url进行实现，（其余细节略）

```javascript
async function uploadImage(url: RequestInfo, value: string) {
    const currentTime = new Date().valueOf()
    url = `${url}${currentTime}`
    const result = await upload(url, value, "")
    if (result.status === 422) {
      alert("File already exists!")
      return
    }
    if (result.data) {
      // console.log(result.data)
      const sha = result.data.content.sha as string
      const img_url = result.data.content.download_url as string
      // console.log(img_url)
      album.addImage(img_url, sha)
      clipboard.writeText(img_url)
      new Notification("Upload Success", {body: img_url})
      return
    }
  }
  function imageUpload(file:File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      const resString = this.result as string //类型转换
      if(this.result)
        uploadImage(url, resString.split(',')[1])
    }
    reader.onerror = function () {
      new Notification("Fail to read the file")
    }
  }
```

2.文本（实时聊天）

在合作项目过程中，有一个类似于便签条的txt文档模块也无疑可以使项目的更新中让下一个开发者对更新内容有更快速的认识，在此模块，我们实现了一个上传文字至目录下txt文件，即时下载文本内容显示在页面上的功能，进而使得我们的工具还可以成为一个实时聊天的工具（虽然没有解决并发问题）。

```javascript
export function Text() {
  const repo = store("repo", "")
  const [text, setText] = useState("None")
  const [newText, setNewText] = useState("")
  const url = `https://api.github.com/repos/${repo}/contents/text.txt`
  const getText = async function (url: RequestInfo) {
    const result = await download(url)
    let res = "None"
    if (result.data) {
      res = (Buffer.from(result.data.content, "base64").toString())
      console.log(result.data)
    }
    setText(res)
  }
  const getSha = async function (url: RequestInfo) {
    const result = await download(url)
    let sha = ""
    if (result.data) {
      sha = result.data.sha
    }
    return sha
  }
  const refreshText = function () {
    getText(url)
  }
const uploadText = async function (url: RequestInfo, value: string) {
    const sha = await getSha(url)
    const result = await upload(url, value, sha)
    if (result.data) {
      console.log(result.data)
      refreshText()
    }
  }
  const textUpload = function (event:React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key == 'Enter'){
      event.preventDefault()
      let val = newText.trim()
      if (val) {
        let valBuf = Buffer.from(val, "utf-8")
        val = valBuf.toString("base64")
        console.log(val)
        uploadText(url, val)
      }
      setNewText('')
    }
  }
```

3.文件预览

本工具还尝试对图片文件进行优化，因此在文件预览这一模块内，我们通过Album和cpurl来展示文件预览的图片内容和对应的url地址

```javascript
export function Album(){
  const model = new albumModel("images");
  const {clipboard} = require("electron")
  const [ status, setStatus ] = useState(true);
  const {shell} = require('electron')
  const repo = store("repo", "")
  const url = `https://api.github.com/repos/${repo}/contents/`
  function destroy(image:any){
    model.destroy(image)
    deleteImage(url+image.url.split("/").slice(-1), image.sha)
    setStatus(!status)
  }
  const { images } = model;
  async function deleteImage(url: RequestInfo, sha: string) {
    const result = await del(url, sha)
    console.log(11)
    if(result.data){
        new Notification("Delete Success")
    } else {
        new Notification("Delete Failed")
    }
    return
  }
    // const shownImage = 
  function cpUrl(image:any){
    clipboard.writeText(image.url)
    new Notification("Url Copied", {body: image.url})
  }
  const todoItems = images.map((image:any) => (
    <div className="image_item">
      <img src={image.url} className="image_img"/>
      <div className="image_detail">
      <div>
      <a href={image.url}
      onClick={(event)=>{
          event.preventDefault()
          shell.openExternal(image.url)
      }}>
          {image.url.split("/").slice(-1)}
```

完成代码结果可以参照文件内容，这里同时附上程序使用教程

### Tutorial

#### release

创建Github token：https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

在Github中新建一个repository（或利用既有repository）

打开Transmitter，在settings中分别将token和repository填入

repository格式：{username}/{repository name}

#### dev

```shell
cd WastelandMarket
npm install
npm run dev
```



### Features

### 文件

目前支持拖拽上传与文件选择，上传完成后发送通知并将url写入剪贴板

v0.1.0：支持应用内的图片浏览与删除（菜单栏新增Album选项）



#### 文本传输

支持在同一个Github账号下，不同客户端之间的文本快速互传


在输入框中输入文本并敲击回车以上传

## Discussion
