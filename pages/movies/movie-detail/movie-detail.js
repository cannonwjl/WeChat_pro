//es6语法引入movie类
import { Movie } from 'class/Movie.js';
// pages/movies/movie-detail/movie-detail.js
//引入全局http方法
var util=require('../../../utils/util.js');
//引入全局变量
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  movie:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var movieId=options.id;
      //调试
      //console.log(movieId);

      var url = app.globalData.doubanBase+"/v2/movie/subject/"+movieId;
      var movie = new Movie(url);
      movie.getMovieData((movie)=>{
        //z这里的this就是指的是 本调用方的环境page 不是调用方的this
        this.setData({
          movie:movie
        })
      })
     // util.http(url,this.processDoubanData);
  
  },
  //数据绑定函数
//  processDoubanData:function(data) {
//     if (!data) {
//       return;
//     }
//     var director = {
//       avatar: "",
//       name: "",
//       id: ""
//     }
//     if (data.directors[0] != null) {
//       if (data.directors[0].avatars != null) {
//         director.avatar = data.directors[0].avatars.large

//       }
//       director.name = data.directors[0].name;
//       director.id = data.directors[0].id;
//     }
//     var movie = {
//       movieImg: data.images ? data.images.large : "",
//       country: data.countries[0],
//       title: data.title,
//       originalTitle: data.original_title,
//       wishCount: data.wish_count,
//       commentCount: data.comments_count,
//       year: data.year,
//       generes: data.genres.join("、"),
//       stars: util.convertToStarsArray(data.rating.stars),
//       score: data.rating.average,
//       director: director,
//       casts: util.convertToCastString(data.casts),
//       castsInfo: util.convertToCastInfos(data.casts),
//       summary: data.summary
//     }
//     this.setData({movie:movie})
//   },
//查看图片函数
  viewMoviePostImg:function(e)
  {
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],//需要预览的图片HTTP连接列表
      current:src,//当前显示图片的hTTP连接
    })
  }
})