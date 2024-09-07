文件内容 
manifest.json： 配置文件;
content.js: 核心方法
background.js：背景颜色
icons：图标

实现细节

方案一
通过 insertCryptoPairIntoTweets 实现获取推文信息的插入币对信息到推文中 
在通过 observeScroll 观察动态内容加载

方案2
通过 document.addEventListener 观察文案中的推文信息，从而插入信息

做了两种尝试，分别放在master分支，还有方案一