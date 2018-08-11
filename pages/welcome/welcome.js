Page({

  /**
   * 页面的初始数据
   */
   ontap:function()
   {
      //在加入tabbar 后以下俩种跳转不好用了
      //  wx.navigateTo({
      //    url: "../posts/post"
      //  })
      //  wx.redirectTo({
      //    url: '../posts/post',
      //  })
      //页面跳转到子页面（相当于启动也页面跳到主页）
      //switchtab 只能跳带哟tabbar 的页面 不能跳不带有的 另外以上俩种不能跳转
      wx.switchTab({
        url: '../posts/post',
      })
   },
  
})