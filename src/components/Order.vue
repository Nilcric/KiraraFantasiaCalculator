<template>
  <div>
    <md-card class="card" id="value">
      <md-card-header>
        <div class="md-title">{{$t('Order Value')}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50">
            <md-field>
              <label>{{$t('Speed')}}</label>
              <md-input v-model="order.speed" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50">
            <md-field>
              <label>{{$t('Load Factor/%')}}</label>
              <md-input v-model="order.LoadFactor" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-chips v-model="order.StatusChange" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Speed Change/%')}}</label>
            </md-chips>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-chips
              v-model="order.LoadFactorReduce"
              md-input-type="number"
              :md-format="isPercent"
            >
              <label>{{$t('Load Factor Reduce/%')}}</label>
            </md-chips>
          </div>
        </div>
      </md-card-content>

      <md-divider/>

      <md-card-content>
        <p class="md-display-1">
          {{$t('Order Value =')}}
          <span style="float: right">{{orderValue}}</span>
        </p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
const clamp = function(x, a, b) {
  if ((a === undefined || x >= a) && (b === undefined || x <= b)) return x;
  if (x < a) return a;
  if (x > b) return b;
  return a;
};
const sum = function(x, y) {
  y = Number.parseFloat(y);
  return isNaN(y) ? x : x + y;
};
export default {
  name: "Order",
  data() {
    return {
      spaceRepeat: 0,
      order: {
        speed: null,
        LoadFactor: null,
        StatusChange: [],
        LoadFactorReduce: []
      }
    };
  },
  methods: {
    isPercent(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%" + " ".repeat(this.spaceRepeat++);
    }
  },
  computed: {
    orderBase() {
      return clamp(124 - Math.floor(this.order.speed / 2), 0, 100);
    },
    orderValue() {
      let orderValue = (this.orderBase * this.order.LoadFactor) / 100;
      orderValue *= clamp(1 - this.order.StatusChange.reduce(sum, 0) / 100, 0);
      orderValue *= clamp(
        1 - this.order.LoadFactorReduce.reduce(sum, 0) / 100,
        0
      );
      return clamp(Math.floor(orderValue), 15, 500);
    }
  }
};
</script>

<style>
.card {
  margin: 8px;
}
</style>
