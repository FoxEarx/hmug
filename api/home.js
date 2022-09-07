import fly from '@/utils/request.js'
//轮播图请求
export const getBanners = () => fly.get('/home/swiperdata')
//导航栏请求
export const getNavs = () => fly.get('/home/catitems')
//获取楼层数据
export const getFloors = () => fly.get('home/floordata')
