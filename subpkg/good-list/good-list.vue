<template>
  <view>
    <van-card v-for="item in goods" :key="item.goods_id" :num='1' :price="item.goods_price | toFixed" desc="描述信息"
      :title="item.goods_name" :thumb="item.goods_big_logo||defaultPic"
      :thumb-link="`/subpkg/goods-detail/goods-detail?id=${item.goods_id}`" />
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: '',
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          total,
          goods
        } = await getGoodsList(this.queryData)
        this.isLoading = false
        this.goods = [...this.goods, ...goods]
        this.total = total
        cb && cb()
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goods = []
      this.total = ''
      this.getGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast("别TM滑了，没了")
      if (this.isLoading) return
      this.queryData.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style>

</style>
