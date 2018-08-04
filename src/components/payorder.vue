<template>

    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- 表单验证 -->
                        <el-form status-icon :model="orderInfo" ref="orderInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 收货人姓名 -->
                                <el-form-item label="收货人姓名:" prop="accept_name">
                                    <el-input style="width: 600px;" v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <!-- 所属地区 -->
                                <el-form-item label="所属地区:" prop="area">
                                    <VDistpicker @selected="selected($event)" :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></VDistpicker>
                                </el-form-item>
                                <!-- 收货地址 -->
                                <el-form-item label="收货地址:" prop="address">
                                    <el-input style="width: 600px;" v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <!-- 手机号 -->
                                <el-form-item label="手机号:" prop="mobile">
                                    <el-input style="width: 600px;" v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <!-- 邮箱 -->
                                <el-form-item label="电子邮箱:" prop="email">
                                    <el-input style="width: 600px;" v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <!-- 邮政编码 -->
                                <el-form-item label="邮政编码:" prop="post_code">
                                    <el-input style="width:300px" v-model="orderInfo.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--在线支付-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio> 手续费：0.00元
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--3、配送方式-->
                                    <li>
                                        <label>
                                            <el-radio-group v-model="orderInfo.express_id" v-on:change="expressChange($event)">
                                                <el-radio label="1">顺丰快递(20元)</el-radio>
                                                <el-radio label="2">圆通快递(10元)</el-radio>
                                                <el-radio label="3">韵达快递(8元)</el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodInfo" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount*item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="orderInfo.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderInfo.goodsAmount+orderInfo.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="submitForm('orderInfo')" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  data: function() {
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 手机号的正则表达式
        let mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (mobile.test(value)) {
          // 正确
          callback();
        } else {
          // 错误
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        // 邮箱的正则表达式
        let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email.test(value)) {
          // 正确
          callback();
        } else {
          // 错误
          callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮编不能为空"));
      } else {
        // 邮编的正则表达式
        let post_code = /^[1-9]\d{5}(?!\d)$/;
        if (post_code.test(value)) {
          // 正确
          callback();
        } else {
          // 错误
          callback(new Error("请输入正确的邮编"));
        }
      }
    };

    return {
      goodInfo: [],

      orderInfo: {
        goodsAmount: 0,
        expressMoment: 20,
        accept_name: "何杰",
        area: {
          province: {
            code: "360000",
            value: "江西省"
          },
          city: {
            code: "360700",
            value: "赣州市"
          },
          area: {
            code: "360703",
            value: "南康区"
          }
        },
        address: "中粮商务公园3栋1301",
        mobile: 18888888888,
        email: "862@qq.com",
        post_code: "518000",
        payment_id: "6",
        express_id: "1",

        message: "快点发货",
        goodsids: "",
        cargoodsobj: ""
      },
      rules: {
        // 姓名
        accept_name: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
          { min: 2, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        // 地址
        address: [
          { required: true, message: "请输入收货地址", trigger: "change" },
          { min: 2, message: "请输入的详细一些哦", trigger: "change" }
        ],
        // 手机
        mobile: [
          { required: true, validator: validateMobile, trigger: "change" }
        ],
        // 邮箱
        email: [{ validator: validateEmail, trigger: "change" }],
        // 邮编
        post_code: [{ validator: validateCode, trigger: "change" }],
        area: [{ required: true }]
      }
    };
  },
  methods: {
    selected(value) {
      //   console.log(value);
      this.orderInfo.area = value;
    },
    expressChange(value) {
      // console.log(value);
      switch (value) {
        case "1":
          this.orderInfo.expressMoment = 20;
          break;
        case "2":
          this.orderInfo.expressMoment = 10;
          break;
        case "3":
          this.orderInfo.expressMoment = 8;
          break;
      }
      //   this.orderInfo.goodsAmount =
      //     this.totalPrice + this.orderInfo.expressMoment;
    },
    // 提交订单 还要进行表单验证
    submitForm(formName) {
      // console.log(formName);
      this.$refs[formName].validate(valid => {
        //validate和上面的ref有关
        if (valid) {
          // 表单验证正确
          this.axios
            .post("/site/validate/order/setorder", this.orderInfo)
            .then(response => {
              // console.log(response);
              // 订单创建成功要删除购物车的数据
              let goodid = this.orderInfo.goodsids.split(",");
              // console.log(goodid);
              goodid.forEach((v, i) => {
                this.$store.commit("deleteCount", v);
              });
              // 跳转到付款页
              this.$router.push("/orderInfo/" + response.data.message.orderid);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          //   console.log("error submit!!");
          this.$Message.error("哥们,还有数据没填呢,检查一下呗!!");
          return false;
        }
      });
    }
  },
  //   一进来就渲染页面
  created() {
    this.axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        // console.log(response);
        let buyList = this.$store.state.buyList;
        //  console.log(buyList);
        response.data.message.forEach((v, i) => {
          // 把vuex里的buylist购买的数量赋值给buycount
          v.buycount = buyList[v.id];
        });
        // 渲染的数据
        this.goodInfo = response.data.message;
        // console.log(this.goodInfo);
        // 总计价格 加上邮费
        // this.orderInfo.goodsAmount =
        //   this.totalPrice + this.orderInfo.expressMoment;
        this.orderInfo.goodsAmount = this.totalPrice;

        // console.log(this.orderInfo.goodsAmount);
        // 购买物品的ids
        this.orderInfo.goodsids = this.$route.params.ids;
        // console.log(this.orderInfo.goodsids);
        // 购买物品的数量和商品
        let cargoods = {};
        this.goodInfo.forEach((v, i) => {
          cargoods[v.id] = v.buycount;
          // console.log(cargoods[v.id]);
        });
        // console.log(cargoods);
        this.orderInfo.cargoodsobj = cargoods;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //   计算属性
  computed: {
    // 总计几件物品
    totalNum() {
      let totalNum = 0;
      this.goodInfo.forEach((v, i) => {
        totalNum += v.buycount;
      });
      return totalNum;
    },
    // 商品总计价格
    totalPrice() {
      let totalPrice = 0;
      this.goodInfo.forEach((v, i) => {
        totalPrice += v.buycount * v.sell_price;
      });
      return totalPrice;
    }
  },
  // 注册组件
  components: { VDistpicker }
};
</script>
<style>
/* .distpicker-address-wrapper select{
    height: 48px;
} */
</style>