var postsData = require('../../data/posts-data.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 
 
  onLoad: function (options) {
  //  console.log("onload");
    this.setData({ postList:postsData.postList});
  },
  onPostTap:function(event)
  {
    var postId=event.currentTarget.dataset.postid;
    //console.log("onPostTap id is top:"+ postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  // onSwiperItemTap:function(event)
  // {
  //   var postId=event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id='+postId,
  //   })
  // },
  onSwiperItemTap:function(event)
  {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })

    //target 和 currentTareget
    //target指的是当前点击的组件 和 currentTarget指的是事件捕获的组件
    //target这里是images    
    //var postId=event.currentTarget.dataset.postid;
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})