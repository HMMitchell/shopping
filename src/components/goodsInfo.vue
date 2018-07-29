<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜 -->
                            <div class="pic-box" v-if="this.imglist.length!=0">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>

                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <!-- 购买数量 -->
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i v-on:click="buyNum==1?1:buyNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}">
                                                        <i v-on:click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="isShowDesc = true" href="javascript:;" :class="{selected:isShowDesc}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="isShowDesc = false" href="javascript:;" :class="{selected:!isShowDesc}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowDesc?'block':'none'}">
                                内容
                            </div>
                            <!-- 评论 -->
                            <div class="tab-content" :style="{display: !isShowDesc?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="contentMessage" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitContent" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                       <Page :total="totalCount" :page-size="pageSize" placement="top" :page-size-opts="[5,10,15,20]" @on-change="pageChange($event)" @on-page-size-change="pageSizeChange($event)" show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 推荐商品 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div  class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
// 导入放大镜组件
import ProductZoomer from "vue-product-zoomer";

export default {
  name: "goodsInfo",
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      // 购买数量
      buyNum: 1,
      isShowDesc: true,
      //   评论相关数据---------
      pageIndex: 1,
      pageSize: 5,
      //   评论数据
      messageList: [],
      totalCount: 0,
      // /输入评论的值
      contentMessage: "",
      // 放大镜数据图片-------
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "pane",
        hoverDelay: 400,
        namespace: "zoomer",
        move_by_click: true,
        scroll_items: 1,
        choosed_thumb_border_color: "#dd2c00"
      }
    };
  },
  //   注册组件
  components: {
    ProductZoomer
  },
  methods: {
    //   用axios渲染商品详情
    getdoodsInfo() {
      // 强制初始化
      this.imglist = [];
      // 清空预览图片的数组
      this.images.normal_size = [];
      this.axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          // 赋值到images中
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 用axios渲染评论信息
    getcomments() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          console.log(response);
          this.messageList = response.data.message;
          this.totalCount = response.data.totalcount;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pageChange(page) {
      // console.log(page);
      this.pageIndex = page;
      this.getcomments();
    },
    pageSizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      this.getcomments();
    },
    // 点击提交评论
    submitContent() {
      if (this.contentMessage == "") {
        this.$Message.error("对方不想和你说话,并且向你抛了一堆bug");
        return;
      }
    //   发表评论
    const params = new URLSearchParams();
    // 需要传入的参数
    params.append('commenttxt', this.contentMessage);
    
    this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`, params)
        .then((response) => {
            // console.log(response);
            if(response.data.status==0){
                this.$Message.success("发表评论成功");
                this.pageIndex=1;
                this.getcomments();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        // 重新 清空输入的数据
        this.contentMessage="";        
    },

    cartAdd() {
      // console.log(this.$store);
      this.$store.commit("increment", this.buyNum);
    }
  },
  // 生命周期------------------
  beforeCreate() {},
  created() {
    this.getdoodsInfo();
    // 评论
    this.getcomments();
  },

  //   监听-------------
  watch: {
    $route(to, from) {
      // console.log(to);
      // console.log(from);
      this.getdoodsInfo();
      // 评论
      this.getcomments();
    }
  }
};
</script>
<style>
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.zoomer-zoomer-box {
  width: 368px;
}

.pic-box #zoomer-pane-container.pane-container {
  left: 400px !important;
  top: 0 !important;
  width: 400px !important;
  height: 400px !important;
}

.pic-box .control-box .thumb-list {
  display: flex;
}

.pic-box .thumb-list .responsive-image {
  height: 78px;
  width: 78px;
  margin: 5px;
  display: block !important;
}

.control i {
  text-align: center;
}
</style>