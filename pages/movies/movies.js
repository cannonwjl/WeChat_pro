

// pages/movies/movies.js
//引用../../utils/util.js下的函数
var util=require("../../utils/util.js");
//引用app.js下的全局变量
var app = getApp();

Page({
  //RESTFUL API JSON
  //SOAP XML
  //粒度 不是 力度 
  //做数据绑定的时候一定要声明一下变量
 data:{
   inTheaters:{},
   comingSoon:{},
   top250:{},
   searchResult:{},
   //以下俩个变量用来显示或隐藏搜索界面
   containerShow:true,   
   searchPanelShow:false,
   xxImgShow:false
 },
//设置三个数组 存放不同的 电影数据

  onLoad: function(event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + app.globalData.doubanStartCount;
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + app.globalData.doubanStartCount;
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + app.globalData.doubanStartCount;
    //异步调用 顺序不一定
    this.getMovieListData(inTheatersUrl,"inTheaters",'正在上映'); //
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","TOP250");
  },
//跳转等多界面
  onMoreTap:function(event)
  {
    var categroy=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + categroy,
    })
  },
  
  onMovieTap:function(event)
  { 
    var movieId = event.currentTarget.dataset.movieid;//获取 movieid 值 来自movie-template
   //调试 console.log(movieId);
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },

//自我测试
  // moves0:function()
  // {
  //   this.getMovieListData(inTheatersUrl); 
  // },

  // moves1: function () {
  //   this.getMovieListData(comingSoonUrl);
  // },
  // moves2: function () {
  //   this.getMovieListData(top250Url);
  // },
//这里为了能够区分不共同行电影 添加settedKey
//这这个函数对网络上的数据进行处理
//2018-7-15 因为其它界面也用到读取请求数据这个函数说要将其放到util下面
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-type": "application/xml"
      },
      success: function(res) {
        console.log(res.data)
       
        that.processDoubanData(res.data, settedKey, categoryTitle);

      }
    })
  },
  processDoubanData: function (movieDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject=movieDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6)
      {
        title=title.substring(0,6)+"...";
      }
      //[1,1,1,1,1] [1,1,1,0,0]
      var temp={
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId: subject.id
      };
    // console.log(temp.movieId);
      movies.push(temp)
    }
    //下面数据绑定 绑定每个数据页面
    //用settedKey来区分 是哪一行
    var readyData={};
    readyData[settedKey]=
    {
     
      categoryTitle: categoryTitle,
      movies:movies
    };
    this.setData(readyData)
  },
  //不能写成  否则没有数据 this.setData(readyData)
  
 //搜索页面的触发函数 当获取焦点则隐藏 当前界面  
  onBindFocus:function(event){
    //通过绑定的方式调用界面
    this.setData({
      containerShow: false,
      searchPanelShow: true,
      xxImgShow:true,
    })
    //调试
    console.log("show srearch-onBindFocus")

  },
   //搜索页面的触发函数 当失去焦点触发函数 
  onBindChange:function(event)
  {
    var text=event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","搜索结果");
    console.log(text);
   

    //调试
    console.log("show srearch-onBindChange")
  },
//xx   显示 当前界面  
  onCancelImgTap:function(event)
  {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{},
      xxImgShow:false,
    })
  },
  

   
})