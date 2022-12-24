# WastelandMarket 项目报告



[TOC]

## Introduction

在github共同开发的过程当中，我们往往需要与团队共同合作，在开发的仓库中访问内容，从而实现文件的共享与伪实时传输。除公共仓库外，我们新加入的开发者需要personal token才能畅通无阻的访问仓库，下载仓库内容，上传仓库内容等。对于资深的开发者而言，github的文件传输功能无疑是一个高效，简洁的工具。然而，对于初学者而言们往往因信息的缺失等原因无法快速上手这一开发工具。与此同时，由于网页访问的天生限制，github的访问便捷程度显然无法与桌面应用相比(尽管有github desktop的存在，其使用便利程度却一言难尽)。因此，我们希望着手这个问题，开发一款桌面应用。

![image-20221222214937772](/Users/chrislu/Library/Application Support/typora-user-images/image-20221222214937772.png)





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





## result

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
