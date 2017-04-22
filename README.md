#Node express 项目
一:在git.oschina.net上建立一个git项目,项目名称自拟:
二:数据库使用mongdb,数据库名称:happy,数据表:user,movie,comment等
三:UI框架bootstrap
四:功能实现:<1>头部菜单,底部版权,还需要不同的内容,主要包括首页(home),广告轮播循环,最新推荐电影,最新评论等内容.
           <2>电影频道电影列表,电影页面数量必须是有限制的另外要附带其分页 (自己决定:可以存在最新的弹窗推送)
           <3>电影详情页大图展示,电影相关内容,需要有一个电影评论员,评论的是要有编辑器的功能,并且附带文件上传
           <4>comment关于评论是登录的可以评论,未登录的用户只能查看

1./                                    -->首页

2./login                               -->登录

3./register                            -->注册

4./movieList?PageNo=1&title=title       -->电影分页,上面有搜索框,可以根据电影名称进行搜索,中将有电影列表,显示基本电影,缩略图,下面有分页

5./moviedaetail?id=123&PageNo=1        -->电影详情及评论(编辑框,上传)


6./musicList?PageNo=1&title=title       -->音乐分页,上面有搜索框,可以根据音乐名称进行搜索,中奖有音乐列表,显示基本音乐,缩略图,下面有分页

6./musicdaetail?id=123&PageNo=1        -->音乐详情及评论(编辑框,上传)



a.先处理路由
movie.js
book.js
music.js



步骤：1. 先安装插件 cnpm i 
步骤：2. 安装 supervisor 监听服务器；不用重新执行文件;
步骤：3. 创建路由;