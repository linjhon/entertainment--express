#Node express 项目
1./                                    -->首页
2./login                               -->登录
3./register                            -->注册
4./movieList?PageNo=1&title=title       -->电影分页,上面有搜索框,可以根据电影名称进行搜索,中奖有电影列表,显示基本电影,缩略图,下面有分页
5./moviedaetail?id=123&PageNo=1        -->电影详情及评论(编辑框,上传)

6./musicList?PageNo=1&title=title       -->音乐分页,上面有搜索框,可以根据音乐名称进行搜索,中奖有音乐列表,显示基本音乐,缩略图,下面有分页
6./musicdaetail?id=123&PageNo=1        -->音乐详情及评论(编辑框,上传)


a.先处理路由
movie.js
book.js
music.js
