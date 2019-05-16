<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{$t('Damage Calculation')}}</div>
        <md-card-expand-trigger class="expand-trigger">
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-header>

      <md-card-expand>
        <md-card-expand-content>
          <md-card-content>
            <div class="md-layout md-gutter content-desktop">
              <div class="md-layout-item">
                <p class="md-subheading">{{$t('Basic')}}</p>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>{{$t('Attack')}}</label>
                      <md-input v-model="basic.attack" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>{{$t('Defence')}}</label>
                      <md-input v-model="basic.defence" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Skill/%')}}</label>
                      <md-input v-model="basic.skill" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Critical')}}</label>
                      <md-select v-model="basic.criticalCoef">
                        <md-option value="1.5">{{$t('Critical')}}</md-option>
                        <md-option value="1.0">{{$t('Not Critical')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Element')}}</label>
                      <md-select v-model="basic.elementCoef">
                        <md-option value="0.5">{{$t('Regist')}}</md-option>
                        <md-option value="1.0">{{$t('Default')}}</md-option>
                        <md-option value="2.0">{{$t('Weak')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Kirara Jump')}}</label>
                      <md-select v-model="basic.kiraraJumpCoef">
                        <md-option value="1.0">{{$t('1st')}}</md-option>
                        <md-option value="1.5">{{$t('2nd')}}</md-option>
                        <md-option value="2.0">{{$t('3rd')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
              </div>
              <div class="md-layout-item">
                <p class="md-subheading">{{$t('Chara')}}</p>
                <md-chips
                  v-model="chara.StatusChange "
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Attack Change/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.WeakElementBonus"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Weak Element Bonus/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.NextAttackUp"
                  md-input-type="number"
                  :md-format="isNumber"
                  :md-limit="1"
                >
                  <label>{{$t('Next Attack Up/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.CriticalDamageChange"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Critical Damage Change/%')}}</label>
                </md-chips>
              </div>
              <div class="md-layout-item">
                <p class="md-subheading">{{$t('Enemy')}}</p>
                <md-chips
                  v-model="enemy.StatusChange "
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Defence Change/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="enemy.ElementResist"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Element Resist/%')}}</label>
                </md-chips>
              </div>
            </div>

            <md-tabs class="content-phone">
              <md-tab :md-label="$t('Basic')">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>{{$t('Attack')}}</label>
                      <md-input v-model="basic.attack" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>{{$t('Defence')}}</label>
                      <md-input v-model="basic.defence" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Skill/%')}}</label>
                      <md-input v-model="basic.skill" type="number"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Critical')}}</label>
                      <md-select v-model="basic.criticalCoef">
                        <md-option value="1.5">{{$t('Critical')}}</md-option>
                        <md-option value="1.0">{{$t('Not Critical')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Element')}}</label>
                      <md-select v-model="basic.elementCoef">
                        <md-option value="0.5">{{$t('Regist')}}</md-option>
                        <md-option value="1.0">{{$t('Default')}}</md-option>
                        <md-option value="2.0">{{$t('Weak')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>{{$t('Kirara Jump')}}</label>
                      <md-select v-model="basic.kiraraJumpCoef">
                        <md-option value="1.0">{{$t('1st')}}</md-option>
                        <md-option value="1.5">{{$t('2nd')}}</md-option>
                        <md-option value="2.0">{{$t('3rd')}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
              </md-tab>

              <md-tab :md-label="$t('Chara')">
                <md-chips
                  v-model="chara.StatusChange "
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Attack Change/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.WeakElementBonus"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Weak Element Bonus/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.NextAttackUp"
                  md-input-type="number"
                  :md-format="isNumber"
                  :md-limit="1"
                >
                  <label>{{$t('Next Attack Up/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="chara.CriticalDamageChange"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Critical Damage Change/%')}}</label>
                </md-chips>
              </md-tab>

              <md-tab :md-label="$t('Enemy')">
                <md-chips
                  v-model="enemy.StatusChange "
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Defence Change/%')}}</label>
                </md-chips>

                <md-chips
                  v-model="enemy.ElementResist"
                  md-input-type="number"
                  :md-format="isNumber"
                >
                  <label>{{$t('Element Resist/%')}}</label>
                </md-chips>
              </md-tab>
            </md-tabs>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>

      <md-divider/>

      <md-card-content>
        <p class="md-display-1">
          {{$t('Damage =')}}
          <span style="float: right">
            {{damageAverage.toFixed(0)}}
            ±
            {{damageVariance.toFixed(0)}}
          </span>
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
  name: "Damage",
  data() {
    return {
      spaceRepeat: 0,
      basic: {
        attack: null,
        defence: null,
        skill: null,
        criticalCoef: 1.0,
        elementCoef: 1.0,
        kiraraJumpCoef: 1.0
      },
      chara: {
        StatusChange: [],
        WeakElementBonus: [],
        NextAttackUp: [],
        CriticalDamageChange: []
      },
      enemy: {
        StatusChange: [],
        ElementResist: []
      }
    };
  },
  computed: {
    damageMax() {
      return clamp(this.damage, 0, 357913952);
    },
    damageMin() {
      return clamp(this.damage * 0.85, 0, 357913952);
    },
    damageAverage() {
      return (this.damageMax + this.damageMin) / 2;
    },
    damageVariance() {
      return (this.damageMax - this.damageMin) / 2;
    },
    damage() {
      let damage = ((this.attack / this.defence) * this.basic.skill) / 6;
      damage *= this.elementCoef;
      damage *= this.basic.kiraraJumpCoef;
      damage *= this.criticalCoef;
      damage *= 1 + this.nextAttackUp;
      return damage;
    },
    attack() {
      let attack = this.basic.attack;
      let statusChange = this.chara.StatusChange.reduce(sum, 0) / 100;
      attack = Math.floor(attack * clamp(1 + statusChange, 0.5, 2.5));
      return clamp(attack, 1);
    },
    defence() {
      let defence = this.basic.defence;
      let statusChange = this.enemy.StatusChange.reduce(sum, 0) / 100;
      defence = Math.floor(defence * clamp(1 + statusChange, 0.33, 5.0));
      return clamp(defence, 1);
    },
    elementCoef() {
      let elementResist = this.enemy.ElementResist.reduce(sum, 0) / 100;
      let elementCoef = this.basic.elementCoef * (1 - elementResist);
      if (this.basic.elementCoef == 0.5) {
        elementCoef = clamp(elementCoef, 0.1, 0.9);
      }
      if (this.basic.elementCoef == 1.0) {
        elementCoef = clamp(elementCoef, 0.6, 1.4);
      }
      if (this.basic.elementCoef == 2.0) {
        elementCoef = clamp(elementCoef, 1.6, 2.4);
      }

      let weakElementBonus = this.chara.WeakElementBonus.reduce(sum, 0) / 100;
      if (this.basic.elementCoef == 2.0) {
        elementCoef += weakElementBonus;
      }
      return elementCoef;
    },
    criticalCoef() {
      let criticalCoef = this.basic.criticalCoef;
      if (criticalCoef == 1.0) return 1.0;
      let criticalDamageChange =
        this.chara.CriticalDamageChange.reduce(sum, 0) / 100;
      criticalCoef *= 1 + criticalDamageChange;
      return clamp(criticalCoef, 1.0, 3.0);
    },
    nextAttackUp() {
      return this.chara.NextAttackUp.reduce(sum, 0) / 100;
    }
  },
  methods: {
    isNumber(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%" + " ".repeat(this.spaceRepeat++);
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/src/components/MdLayout/mixins";

.expand-trigger {
  position: absolute;
  right: 8px;
  top: 8px;
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
