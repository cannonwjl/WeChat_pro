var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id;
    //this.data=postId;
    this.data.currentPostId = postId;
    // console.log(postId);
    var postData = postsData.postList[postId];
    //this.data.currentPostId = postId;
    this.setData({ postData: postData });



    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId)
    {
     // this.data.isPlayingMusic=true;
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();
  },
 
  setMusicMonitor:function()
  {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData
        ({
          isPlayingMusic: true
        })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId=that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      //id指控
      app.globalData.g_currentMusicPostId=null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData
        ({
          isPlayingMusic: false
        })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },


  onColletionTap: function (event) {
    this.getPostsCollectedAsy();
  },
  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({

      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未被收藏，
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        //更新文章是否的缓存值
        that.showToast(postsCollected, postCollected);
      }
    })
  },


  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未被收藏，
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    this.showToast(postsCollected, postCollected);
  },

  showToast: function (postsCollected, postCollected) {

    wx.setStorageSync("posts_collected", postsCollected);

    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success",
    })
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : "取消收藏该文章?",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);

          // that.showToast();
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  onShareTap: function (event) {
    var itemList =
      [
        "分享给微信好友",
        "分享导朋友圈",
        "分享到QQ",
        "分享到微博"
      ]

    wx.showActionSheet({
      itemList: itemList,
      itemColor: "405F80",
      success: function (res) {
        // res.cancel 用户是不是点击了取消
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消' + res.cancel + "现状不支持，什么时候能支持呢",
        })
      }
    })
  },
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId].music;
    var isPlayingMucsic = this.data.isPlayingMusic;
    if (isPlayingMucsic) {
      wx.pauseBackgroundAudio();
      //this.data.isPlayingMusic=false;
      this.setData({
        isPlayingMusic: false
      })
    } else {


      wx.playBackgroundAudio({
        dataUrl: postData.url,
        title: postData.title,
        coverImgUrl: postData.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      //  this.data.isPlayingMusic=true;
    }

  }

})