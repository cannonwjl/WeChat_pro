===================================================================
2018-7-13  
.movie-list-container
{
  background-color: #fff; //设置整个框为 白色  可以产生间隔框
  display: flex;   //横着展示
  flex-direction: column;  //
}

.movie-head{   //整个边框相对于内边框的设定
  padding: 30rpx 20rpx 22rpx;
}
.slogan{    //正在热播 字体设置
  font-size: 24rpx;
}
.more{    //让文字和图片箭头右移动
  float: right;
}

.more-text{ //文字设置
  vertical-align: middle;  //对齐和图片
  margin-right: 10rpx;
  color: #1f4ba5;
}
.more-img{  //图片设置
  width: 9rpx;
  height: 16rpx;
  vertical-align: middle;//对齐和文字
}