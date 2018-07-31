<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <router-link to="/buycar">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车为空的时候 -->
                                <tr v-if="buyMessage&&buyMessage.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有数据的时候 -->
                                <tr v-for="(item, index) in buyMessage" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number v-model="item.buycount" @change="change($event,index)" size="mini" :min="1" :max="1000" label="描述文字"></el-input-number>
                                    </td>
                                    <!-- 金额 -->
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="showModel=true;isindex=index" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <router-link to="/payorder">
                                <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <!-- 删除提示框 -->

        <Modal v-model="showModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>警告</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除该物品吗?</p>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                    <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
                    </Col>
                    <Col span="12">
                    <Button type="success" size="large" long  @click="showModel=false">取消</Button>
                    </Col>
                </Row>

            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  name: "buycar",
  data: function() {
    return {
    //   buyMessage: [],
      // 加载中会看到没有物品的数据
      buyMessage: undefined,
      // 删除按钮的值
      showModel: false,
      modal_loading: false,
      // 索引值
      isindex: 0
    };
  },
  //   获取数据
  created() {
    // 一进来显示加载框
    this.$Spin.show();
    let buyList = this.$store.state.buyList;
    // console.log(buyList);
    // 保存id
    let ids = "";
    for (const key in buyList) {
      ids += key;
      ids += ",";
    }

    ids = ids.slice(0, -1);
    if ((ids == "")) {
      setTimeout(() => {
        this.buyMessage = [];
        this.$Spin.hide();
      }, 500);
      return
    }
    // 多了一个逗号
    console.log(ids);
    this.axios
      .get(`site/comment/getshopcargoods/${ids}`)
      .then(response => {
        //  console.log(response)
        // this.buyMessage = response.data.message;
        // 自己把购买的数量匹配到 返回的数据中
        response.data.message.forEach((v, i) => {
          // console.log(v);
          v.buycount = buyList[v.id];
          // console.log(buyList[v.id]);
          //   是否选中
          v.isSelected = true;
        });
        // vue 开始跟踪 {id,价格,图片,buycount}
        this.buyMessage = response.data.message;
        // console.log(this.buyMessage);
        // 渲染数据后隐藏加载框
        setTimeout(() => {
          this.$Spin.hide();
        }, 500);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //   计算属性
  computed: {
    //   选中的总个数
    selectCount() {
      let totalCount = 0;
      // 非空判断
      if (this.buyMessage == undefined) return totalCount;
      this.buyMessage.forEach((v, i) => {
        if (v.isSelected == true) {
          totalCount += v.buycount;
        }
      });
      return totalCount;
    },
    // 总金额
    totalPrice() {
      let totalPrice = 0;
      // 非空判断
      if (this.buyMessage == undefined) return totalPrice;
      this.buyMessage.forEach((v, i) => {
        if (v.isSelected == true) {
          totalPrice += v.buycount * v.sell_price;
        }
      });
      return totalPrice;
    }
  },
  //   方法
  methods: {
    //   改变数量
    change(value, index) {
      // console.log(value,index);
      this.$store.commit("updateCount", {
        id: this.buyMessage[index].id,
        num: value
      });
    },
    // 删除 购物车 点击删除弹出提示信息 提示信息点击删除才是删除 提示信息用iview
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        // 根据索引删除对应的id
        this.$store.commit("deleteCount", this.buyMessage[this.isindex].id);
        // 获取当前这条数据的 index 删除当前这个组件中的 这一条数据
        this.buyMessage.splice(this.isindex, 1);
        this.showModel = false;
        this.$Message.success("删除成功");
      }, 1000);
    }
  }
};
</script>
<style scoped>
</style>