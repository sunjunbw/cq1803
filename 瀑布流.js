//瀑布流

    
    // 1. 显示区域;
    //  json =字符串拼接> 页面;
    //  json 来自于哪里 ? 后端;  ajax 请求获取json;
    
    // 1.1 加载数据;
    // 1.2 渲染页面(拼接字符串);
    
    // 2. 分页按钮区域;
    // 2.1 根据条件渲染数据;
    // 2.2 添加事件; => 重新渲染页面;
 
    var aSear = document.getElementById("search1");
    onscroll = function(){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop >= 700){
            aSear.style.top = 0 + "px";
             pagination.handleEvent();
        }else{
            aSear.style.top = -700 + "px";
        } 
    }

     //整合在一起

    function Pagination(){
    }
    Pagination.prototype.init = function(){
        // 选择;
        this.wrap = document.querySelector("#wrap100 ul");
        this.clientHeight = document.documentElement.clientHeight;
        // 一个开关避免高频词进行数据请求;
        this.loading = false;
        this.now_page = 0;
        this.loadJson()
        .then(function(json){
            this.data = json;
            this.total = Math.ceil(json.count / 5);
            this.renderPage();
        }.bind(this))

        this.handleEvent() 
    }
    // 因为加载数据是异步;
    // 又因为整个功能没有数据就没正常执行，所以把其余代码要放在数据加载成功的回调函数里; => promise;
    Pagination.prototype.loadJson = function(){
        return new Promise(function(success,error){
            var xhr = new XMLHttpRequest();
            xhr.open("GET","data.json");
            xhr.send(null);
            xhr.onload = function(){
                if(xhr.status == 200){
                    // 如果返回值是字符串那么将字符串转换为json;
                    var json = typeof xhr.response == "string" ?JSON.parse(xhr.response) : xhr.response;
                    success(json)
                }else{
                    error("请求出错");
                }
            }
        })
    }
    Pagination.prototype.renderPage = function(){
        // 渲染页面;
        var list =  this.data.subjects;
        var html = "";
        // 起始点和终止点;
        // 第几页   	范围 	for循环起始点	for循环终止点
        // 0	        0~3	            0	        3
        // 1	        4~7	            4	        7
        // 2	        8~11	        8	        11
        // 3	        12~15	        12	        15
        // 4	        16~19	        16	        19
        // 5	        20~23	        20	        23
        // 6	        24~27	        24	        27
        // n	                     4 * n       	4 * n  + 3
        for(var i = 5 * this.now_page ; i <= 5* this.now_page + 4; i ++){
            html += `
                    <li>
                        <img src="${list[i].images.small}" alt="">
                        <p>${list[i].title}</p>
                        <div class="similar1">找相似</div>
                  </li>`
        }
        this.wrap.innerHTML += html;
        this.loading = false;   
    }
    Pagination.prototype.handleEvent = function(){
        onscroll = this.load.bind(this)
    }
    Pagination.prototype.load = function(event){
        if(this.loading) return 0 ;

        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var showHeight = scrollTop + this.clientHeight;
        
       //最后一个元素的高度;
        var eleChildren = this.wrap.getElementsByTagName("li");
        var lastChildren = eleChildren[eleChildren.length - 1];
        var lastTop = lastChildren.offsetTop;
        // console.log(showHeight,lastTop);
        // 判断是否该加载数据;
        if(lastTop <= showHeight){
            // 加载数据;
            // 加载过程之中 不重复加载;
            // console.log("加载数据");
            this.loading = true;
            this.now_page ++;  

            if(this.now_page > this.total){
                return 0;
            }

            this.renderPage();
            // document.documentElement.scrollTop = 0;
            // console.log(1);
        }


       // 获取 几个值;
       // 显示的高度;
       // 最后一张图片的高度;

    }   
    var pagination = new Pagination();
    pagination.init();

