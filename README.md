# WastelandMarket 项目报告



[TOC]

## Introduction

在github共同开发的过程当中，我们往往需要与团队共同合作，在开发的仓库中访问内容，从而实现文件的共享与伪实时传输。除公共仓库外，我们新加入的开发者需要personal token才能畅通无阻的访问仓库，下载仓库内容，上传仓库内容等。对于资深的开发者而言，github的文件传输功能无疑是一个高效，简洁的工具。然而，对于初学者而言们往往因信息的缺失等原因无法快速上手这一开发工具。与此同时，由于网页访问的天生限制，github的访问便捷程度显然无法与桌面应用相比(尽管有github desktop的存在，其使用便利程度却一言难尽)。因此，我们希望着手这个问题，开发一款桌面应用，

![image-20221222214937772](/Users/chrislu/Library/Application Support/typora-user-images/image-20221222214937772.png)



又或者说，有些不了解的初学者，他们对于帮助文档等等教程的检索能力有限，也不会命令行，这就可能上升学习成本，那么如果有一个比较清晰的桌面应用，还是可以解决很多问题。当然我们也不得不提到实际情况中网页访问存在一些限制，使得在GitHub这样一个可以作为文件传输平台使用的工具（虽然只用来当这个有点杀鸡牛刀，对吧）变得使用起来不那么方便。在Github上痛苦地研读项目代码之时，我们萌生了将github的文件传输（主要是上传）与共享功能以桌面应用的形式呈现，继而本项目利用Github repository实现文件+文本传输的桌面应用

框架：Vite+React+Electron

## Goal
## Realization
### frontend
### backend

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
