# 谷歌浏览器书签同步工具

本谷歌浏览器扩展程序借助于gitlab实现了不同PC之间的谷歌浏览器<strong>书签数据的同步功能</strong>,json格式的书签经过base64编码，
不必担心隐私的泄露
## 操作演示
### gitlab生成token
![](./images/generate-token.png)<br>
### gitlab新建Project[testbookmarks]，并添加保存书签的文件[test.json]<br>
![](./images/create-project.png)<br>
### 输入gitlab用户名，token，以及用以保存书签的文件的路径
![](./images/popup.png)<br>