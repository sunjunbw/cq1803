function fun(callback){
	setTimeout(()=>{   //3秒后的返回值如何拿到?  用回调函数callback
		callback(5)
	},3000)
}

fun((data)=>{
	console.log(data)
})



 var arr=[1,2,3,4,5];

// arr.forEach((n)=>{  //遍历
// 	console.log(n)
// })

// var newArr = arr.map((n)=>{   //映射
// 	return n*n;
// })

// console.log(newArr)

var result = arr.filter((n)=>{ //过滤
	return n>3;
})

console.log(result)