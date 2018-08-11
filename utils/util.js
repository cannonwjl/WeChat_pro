function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var num1 = stars.toString().substring(1, 2);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  //2018-7-15 0:10  改写显示半星成功  思路：先统一按照没有半星处理
  //如果有5这是数字说明有有半星那么用前面数num定位 
  //例如  25 评分  那么num=3  num1=5   按照没有半星为[1,1,1,0,0]
  // 之后再对于位置添加半星  就是array[3]=2位置 即[1,1,1,2,0]
  if (num1 == 5) {
    array[num] = 2;
  }
  return array;
}

//这个函数从 movies.js  //getMovieListData 来的  因为多个界面调用
function http(url,callBack) {
 // var that = this;
  wx.request({
    url: url,//API接口地址
   
    method: 'GET',//请求网络的方法
    header: {
  
      "Content-type": "json"  //设置请求的 header
    },
    success: function(res) {
      //收到开发者服务成功返回的回调函数
        callBack(res.data);
    },
    fail:function(error)
    {
        console.log(error)
    }
  })
}
//演员名字相连函数
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
//字符串相连函数
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
//指定
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString
}