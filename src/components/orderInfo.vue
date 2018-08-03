<template>
<div>
      <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section" v-if="orderInfo">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- 生成二维码 -->
                                <VueQrcode v-if="codeUrl" :value="codeUrl" :options="{ size: 200 }"></VueQrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  data: function() {
    return {
      orderid: 0,
      orderInfo: undefined,
      coderUrl: undefined
    };
  },
  created() {
    this.orderid = this.$route.params.orderid;
    this.axios
      .get(`site/validate/order/getorder/${this.orderid}`)
      .then(response => {
        //  console.log(response)
        this.orderInfo = response.data.message[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    // 赋值给二维码组件的url
    this.codeUrl = `http://47.106.148.205:8899/site/validate/pay/alipay/${
      this.orderid
    }`;
    // 使用定时器轮询接口判断是否支付成功
    let inerId = setInterval(() => {
      this.axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(response => {
          //  console.log(response)
          if (response.data.message[0].status == 2) {
            // 成功
            this.$Message.success("恭喜你支付成功了");
            // 跳转页面
            this.$router.push("/paySuccess");
            // 清空计时器
            clearInterval(inerId);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }, 200);
  },
  components: {
    VueQrcode
  }
};
</script>
<style scoped>
</style>
