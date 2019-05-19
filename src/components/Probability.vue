<template>
  <div>
    <md-card class="card" id="critical">
      <md-card-header>
        <div class="md-title">{{$t('Critical Rate')}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50">
            <md-field>
              <label>{{$t('Chara Luck')}}</label>
              <md-input v-model="critical.luck1" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50">
            <md-field>
              <label>{{$t('Enemy Luck')}}</label>
              <md-input v-model="critical.luck2" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-chips v-model="critical.StatusChange" md-input-type="number" :md-format="isNumber">
              <label>{{$t('Luck Change/%')}}</label>
            </md-chips>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label>{{$t('Element')}}</label>
              <md-select v-model="critical.elementCoef">
                <md-option value="2.0">{{$t('Weak')}}</md-option>
                <md-option value="1.0">{{$t('Default')}}</md-option>
                <md-option value="0.5">{{$t('Resist')}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-divider/>

      <md-card-content>
        <p class="md-display-1">
          {{$t('Critical Rate =')}}
          <span style="float: right">{{criticalRate.toFixed(1)}}%</span>
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
  name: "Probability",
  data() {
    return {
      spaceRepeat: 0,
      critical: {
        luck1: null,
        luck2: null,
        StatusChange: [],
        elementCoef: 1.0
      }
    };
  },
  methods: {
    isNumber(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%" + " ".repeat(this.spaceRepeat++);
    }
  },
  computed: {
    criticalRate() {
      let statusChange = this.critical.StatusChange.reduce(sum, 0) / 100;
      let luck1 = Math.floor(
        this.critical.luck1 * clamp(1 + statusChange, 0.5, 4.0)
      );
      let luck2 = Math.floor(this.critical.luck2);

      let criticalRate = 0.0;
      if (this.critical.elementCoef == 1.0) {
        criticalRate = luck1 * 1.2 - luck2;
      }
      if (this.critical.elementCoef == 2.0) {
        criticalRate = luck1 * 1.32 - luck2;
      }

      return clamp(criticalRate, 0, 100);
    }
  }
};
</script>

<style>
.card {
  margin: 8px;
}
</style>
