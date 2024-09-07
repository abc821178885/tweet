document.addEventListener('DOMNodeRemoved', function() {  
    // 初始化MutationObserver  
    console.log('333');
    
    const observer = new MutationObserver(mutations => {  
        mutations.forEach(mutation => {  
            if (mutation.type === 'childList') {  
                // 查找并处理新添加的.search-result元素  
                const addedNodes = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);  
                addedNodes.forEach(node => {  
                    if (node.matches('.search-result')) {  
                        injectCryptoPair(node);  
                    }  
                });  
            }  
        });  
    });  

    console.log(observer,'444');
    
  
    // 配置观察器选项  
    const config = { childList: true, subtree: true };  
  
    // 观察整个文档体  
    observer.observe(document.body, config);  
  
    // 初始时也检查一次  
    const initialSearchResults = document.querySelectorAll('.search-result');  
    console.log(initialSearchResults, 'initialSearchResults');
    
    initialSearchResults.forEach(result => {  
        injectCryptoPair(result);  
    });  
  
    // 绑定事件交互  
    document.addEventListener('click', function(event) {  
        if (event.target.textContent.trim() === '$test') {  
            // 对点击的$test进行操作，例如显示警告  
            alert('You clicked on the inserted $test!');  
        }  
    });  
});  


const observer = new MutationObserver(mutations => {  
    mutations.forEach(mutation => {  
        console.log(mutation, 'mutation');
        if (mutation.type === 'childList') {  
            // 查找并处理新添加的.search-result元素  
            const addedNodes = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);  
            addedNodes.forEach(node => {  
                if (node.matches('.search-result')) {  
                    injectCryptoPair(node);  
                }  
            });  
        }  
    });  
});  
