# 错误集合

## 目录
[标记](#标记)
[收获](#收获)
[错误一](#错误一)
[错误二](#错误二)
[错误三](#错误三)

#### 标记

1. `!!!` 代表重大警告,会导致代码错误

#### 收获

> eslint配合git

可以在git commit代码的时候，使用git hook调用eslint进行代码规范校验，不规范的代码无法提交到仓库

> 



#### 错误一

webpack Dev Server Invalid Options
options should NOT have additional properties

代表了devServer配置项目中是否拼错了单词,有些属性在dev-server配置中不存在


#### 错误二

[HMR] Hot Module Replacement is disabled.

如果在dev-server中设置hot为true，而在项目中没有设置热更换模块


#### 错误三

打开chrome浏览器-》network-》勾选preserve log(刷新不清空之前的日志)-》可以看到之前的请求


