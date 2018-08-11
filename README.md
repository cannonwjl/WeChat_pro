2018-7-11 继续学习小程序之旅 从电影页面开始 用tabBar 作选项卡 另外 发现欢迎welcome 和tabBar冲突，因此删除了 app。json  中 pages下的这行// "pages/welcome/welcome",   改post为启动界面
===============================================================
2018-7-13  
 最后解决2018-7-11问题  具体参照 welcome.js  和app.json 
 
 新的问题 豆瓣电影网API地址403拒绝访问的问题   预测是没有授权

2018-7-18完成第8章

///////////重要/////////
  用本程序的时候一定要 去小程序 API  想要获取开源的 网路网络数据  必须在 https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=482797427&lang=zh_CN   设置》开发设置》加入符合要求的API网址  如mp.weixin.qq.com
  

  2018-7-19  // tabbar的图片路径不要使用绝对路径

  //2018-7-20 课程基本完成了