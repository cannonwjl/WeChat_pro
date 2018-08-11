2018-7-14  
 注 不能对tamplate 进行class 修饰 在编译的时候 会吧tamplate转换成下次文件 可以以包裹的方式修饰
 <!--pages/movies/movies.wxml-->
<import src="movies-list/movies-list-template.wxml"/>

<view class="container"> 
  <view class="movies-template">
  
  <template  is="movieListTemplate"/>
  <template is="movieListTemplate"/>
  <template  is="movieListTemplate"/>
  </view>
</view>
=======================================================================


小程序 API  想要获取开源的 网路网络数据  必须在 https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=482797427&lang=zh_CN   设置》开发设置》加入符合要求的API网址  如mp.weixin.qq.com 这样可以解决400问题




对与403问题是拒绝访问  是资源无法正常解析 
解决方式  
+++++++++++++++++++++++++++++++++++++++++++++++++++
使用https://douban.uieee.com


https://douban.uieee.com是某大佬搭建的代理，

https://api.douban.com/v2/book/1220562=》https://douban.uieee.com/v2/book/1220562

参考资料：

http://xinwenke.top/2018/01/18/douban403/
+++++++++++++++++++++++++++++++++++++++++++++++++++


     getMovieListData:function(url){
      wx.request({
        url: url,
        data:{},
        method:'GET',
        header:{
          "Content-type":"application/xml"
        },
        success: function (res) {
          console.log(res.data)
        }
      })
  }

  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    movies.push(temp)  //将得到数据放到movies数组里 
    }
    this.setData({  设置绑定数据 将movies绑定为movies
      movies:movies
    })
  

  +======================================================================================================
  2018-7-15   
  在movies-list-template.wxml  写触发事件  用 data-category获取值
     <view catchtap='onMoreTap' class='more' data-category="{{categoryTitle}}">

 onMoreTap:function(event)
  {
    var category=event.currentTarget.dateset.category;  //获取页面值 来区分每行  
    wx.navigateTo({
      url: 'more-movie/more-movie?category' + category,   //传出
    })
  },
    页面跳转  如果要进行传参 那么写成以上那种


       onLoad:function(options)
    {
     var  category=options.category; 
     console.log(category);
    }
  获取方的写法


  //////////
  2018-7-19 豆瓣API大约每分钟只能调用40是 就是说每分钟访问40次 不是程序运行40次