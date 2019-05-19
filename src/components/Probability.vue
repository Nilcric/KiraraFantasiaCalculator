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
            <md-chips v-model="critical.StatusChange" md-input-type="number" :md-format="isPercent">
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

    <md-card class="card" id="hate">
      <md-card-header>
        <div class="md-title">{{$t('Hate & AI')}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter content-desktop">
          <div class="md-layout-item md-size-33" v-for="i in [0, 1, 2]" :key="i">
            <md-checkbox v-model="hate.exist[i]" class="md-primary">
              <p class="md-subheading">{{$t('Chara ' + (i+1))}}</p>
            </md-checkbox>
            <md-chips v-model="hate.hateChange[i] " md-input-type="number" :md-format="isPercent">
              <label>{{$t('Hate Change/%')}}</label>
            </md-chips>
            <md-chips v-model="hate.AICondition[i] " md-input-type="number" :md-format="isNumber">
              <label>{{$t('AI Condition')}}</label>
            </md-chips>
          </div>
        </div>

        <md-tabs class="content-phone">
          <md-tab v-for="i in [0, 1, 2]" :key="i" :md-label="$t('Chara ' + (i+1))">
            <md-checkbox v-model="hate.exist[i]" class="md-primary">{{$t('Exist')}}</md-checkbox>
            <md-chips v-model="hate.hateChange[i] " md-input-type="number" :md-format="isPercent">
              <label>{{$t('Hate Change/%')}}</label>
            </md-chips>
            <md-chips v-model="hate.AICondition[i] " md-input-type="number" :md-format="isNumber">
              <label>{{$t('AI Condition')}}</label>
            </md-chips>
          </md-tab>
        </md-tabs>
      </md-card-content>

      <md-divider/>

      <md-card-content>
        <p class="md-display-1 content-phone">
          {{$t('Target =')}}
          <span style="float: right">
            <span v-for="(item, i) in target" :key="i">{{(item*100).toFixed(1)}}%&nbsp;&nbsp;</span>
          </span>
        </p>
        <p class="md-display-1 content-desktop">{{$t('Target =')}}</p>
        <div class="md-layout md-gutter content-desktop">
          <div class="md-layout-item md-size-33" v-for="(item, i) in target" :key="i">
            <span class="md-display-1" style="float: right">{{(item*100).toFixed(1)}}%</span>
          </div>
        </div>
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
      },
      hate: {
        exist: [true, true, true],
        hateChange: [[], [], []],
        AICondition: [[], [], []]
      }
    };
  },
  methods: {
    isPercent(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%" + " ".repeat(this.spaceRepeat++);
    },
    isNumber(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + " ".repeat(this.spaceRepeat++);
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
    },
    target() {
      if (this.hate.exist.reduce((x, y) => x + y) == 0) {
        return [0, 0, 0];
      }

      let vote = [0, 0, 0];
      let random = [0, 0, 0];
      let hate = [0, 0, 0];
      for (random[0] = 6; random[0] <= 9; random[0]++) {
        for (random[1] = 6; random[1] <= 9; random[1]++) {
          for (random[2] = 6; random[2] <= 9; random[2]++) {
            var target = 0;
            for (var i = 0; i < 3; i++) {
              hate[i] = this.hate.exist[i]
                ? random[i] *
                    (1 + this.hate.hateChange[i].reduce(sum, 0) / 100) +
                  this.hate.AICondition[i].reduce(sum, 0)
                : 0;
              if (hate[i] > hate[target]) target = i;
            }
            vote[target] += 1;
          }
        }
      }

      return vote.map(x => x / 64);
    }
  }
};
</script>


<style lang="scss">
@import "~vue-material/src/components/MdLayout/mixins";

.card {
  margin: 8px;
}

.content-desktop {
  @include md-layout-small {
    display: none;
  }
}

.content-phone {
  display: none;
  @include md-layout-small {
    display: block;
  }
}
</style>
