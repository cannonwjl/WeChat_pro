// pages/movies/more-movie/more-movie.js
var app=getApp()
var util=require("../../../utils/util.js")
Page({
  data: {
    movie:{},
    navigateTitle: "", //this.data.navigateTitle设置变量
    requestUrl:"",
    totalCount:0,
    isEmpty: true,//坑  这里注意isEmpty 一定要是true  不能写出isEmpty:"",否则会报个  concat 没定义错误 2018-7-17
    
  },
  onLoad: function(options) {
    var category = options.category;
    this.data.navigateTitle = category; //this.data.navigateTitle页面内变量赋值

    //动态设置标题 但是一般放到onReady里 教学视频无法成功显示
    //但经过实验一下代码在onLoad还是可以运行的 
    //为了和教学一样 放到了onReady内
    //  wx.setNavigationBarTitle({

    //    title: category,
    //  }),
    //打印到调试界面  测试代码
    console.log(category);


    var dataUrl = "";
      // var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + app.globalData.doubanStartCount;
      // var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + app.globalData.doubanStartCount;
      // var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + app.globalData.doubanStartCount;

    switch (category) {
      case "正在上映":  //这里注意要匹配 从category传过来的值 否则会出现 VM705:1 request:fail invalid url "" 错误
      //数据默认给20组
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" ;
        break;
      case "即将上映":   //数据默认给20组
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "TOP250"://数据默认给20组
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250" ;
        break;
    }
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.callBack)
  },
//跳转电影详情界面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;//获取 movieid 值 来自movie-template
    //调试 console.log(movieId);
    wx.navigateTo({
      //注意路径正确性
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },


//回调函数 是上边util.http(dataUrl,this.callBack)中的 callBack
//这里方法是改自movies.js下的 processDoubanData: function (movieDouban, settedKey, categoryTitle)
//因为要加入上划刷新 就没有提成公共方法
  callBack: function (movieDouban){
  //调试输出情况 
    console.log(movieDouban)

   var movies = [];
   for (var idx in movieDouban.subjects) {
     var subject = movieDouban.subjects[idx];
     var title = subject.title;
     if (title.length >= 6) {
       title = title.substring(0, 6) + "...";
     }
     //[1,1,1,1,1] [1,1,1,0,0]
     var temp = {
       stars: util.convertToStarsArray(subject.rating.stars),
       title: title,
       average: subject.rating.average,
       coverageUrl: subject.images.large,
       movieId: subject.id
     }
     movies.push(temp)
   }
   var totalMovies={}
   //设置变量记录以前数据  并且把现在和以前叠加显示
   //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
   if (!this.data.isEmpty) {
     totalMovies = this.data.movies.concat(movies);
   }
   else {
     totalMovies = movies;
     this.data.isEmpty = false;
   }
   this.setData(
     
     {
       movies: totalMovies
     }
   );
   this.data.totalCount += 20;
   //增加界面友好度  在加载时显示加载
   wx.hideNavigationBarLoading();
   //增加界面友好度  在加载完停止  注意 上下要一起使用
    wx.stopPullDownRefresh()
},
   
   onPullDownRefresh:function(event)
   {
    var refreshUrl=this.data.requestUrl+"?star=0&count=20";
    util.http(refreshUrl,this.processDoubanData);
    //因为是上拉刷新需要将数据初始化
    this.data.movies={};
    this.data.esEmpty=true;
    this.data.totalCount=0;
    wx.showNavigationBarLoading();
   },

  onReady: function(event) {
    //动态设置标题
    // var category = event.category;
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle, //this.data.navigateTitle页面内 使用变量
    })
  },
 
    onScrollLower:function(event)
    {
      var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
      util.http(nextUrl, this.callBack);
      //调试
      console.log("加载更多");
       //增加界面友好度  在加载时显示加载
      wx.showNavigationBarLoading()
    },
})