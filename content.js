// 加密货币关键词  
const cryptoKeywords = ['#SOL', '$SOL', '#PACMAN', 'sol', 'SOL'];  
// 要插入的币对  
const cryptoPairToInsert = '$test';  
  
// 插入币对信息到推文中  
function insertCryptoPairIntoTweets() {  
  const tweets = document.querySelectorAll('article div[data-testid="tweet"]');  
  
  tweets.forEach(tweet => {  
    // 跳过已处理的推文  
    if (tweet.hasAttribute('data-processed')) return;  
  
    let tweetText = tweet.innerText;  
  
    // 检查推文是否包含关键词  
    if (cryptoKeywords.some(keyword => tweetText.includes(keyword))) {  
      // 使用正则表达式替换所有关键词  
      const insertionPattern = new RegExp(`(${cryptoKeywords.join('|')})`, 'gi');  
      let newHtml = tweet.innerHTML.replace(insertionPattern, (match) => {  
        return `${match} <span class="crypto-insert">${cryptoPairToInsert}</span>`;  
      });  
  
      // 更新推文内容  
      tweet.innerHTML = newHtml;  
  
      // 为新插入的币对信息绑定点击事件  
      tweet.querySelectorAll('.crypto-insert').forEach(element => {  
        element.addEventListener('click', () => {  
          console.log('点击了币对:', element.innerText);  
          // 添加更多交互逻辑  
        });  
      });  
  
      // 标记推文已处理  
      tweet.setAttribute('data-processed', 'true');  
    }  
  });  
}  
  
// 使用 MutationObserver 观察动态内容加载  
function observeScroll() {  
  const observer = new MutationObserver(mutations => {  
    for (let mutation of mutations) {  
      if (mutation.type === 'childList') {  
        // 只处理新增的子节点  
        mutation.addedNodes.forEach(node => {  
          if (node.nodeType === Node.ELEMENT_NODE) {  
            // 递归检查新节点及其子节点  
            insertCryptoPairIntoTweets();  
          }  
        });  
      }  
    }  
  });  
  
  // 观察整个文档的body元素，但注意性能影响  
  observer.observe(document.body, { childList: true, subtree: true, characterData: false, attributes: false });  
}  
  
// 初始化函数  
function init() {  
  // 初始插入  
  insertCryptoPairIntoTweets();  
  
  // 观察动态内容  
  observeScroll();  
}  
  
// 执行初始化  
init();  
  
// 动态注入样式  
const style = document.createElement('style');  
style.textContent = `  
  .crypto-insert {  
    color: #1DA1F2;  
    font-weight: bold;  
    cursor: pointer;  
    user-select: none; /* 防止选中文本 */  
  }  
`;  
document.head.append(style);