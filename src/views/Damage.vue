<template>
  <div>
    <md-card class="card" id="damage">
      <md-card-header>
        <div class="md-title">{{$t('Damage Value')}}</div>
      </md-card-header>

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

              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>{{$t('Element')}}</label>
                  <md-select v-model="basic.elementCoef">
                    <md-option value="2.0">{{$t('Weak')}}</md-option>
                    <md-option value="1.0">{{$t('Default')}}</md-option>
                    <md-option value="0.5">{{$t('Resist')}}</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-50">
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
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <Chips v-model="chara.StatusChange " md-input-type="number" :md-format="isPercent">
                  <label>{{$t('Attack Change/%')}}</label>
                </Chips>
              </div>

              <div class="md-layout-item md-size-100">
                <Chips
                  v-model="chara.WeakElementBonus"
                  md-input-type="number"
                  :md-format="isPercent"
                >
                  <label>{{$t('Weak Element Bonus/%')}}</label>
                </Chips>
              </div>

              <div class="md-layout-item md-size-100">
                <Chips
                  v-model="chara.NextAttackUp"
                  md-input-type="number"
                  :md-format="isPercent"
                  :md-limit="1"
                >
                  <label>{{$t('Next Attack Up/%')}}</label>
                </Chips>
              </div>

              <div class="md-layout-item md-size-100">
                <Chips
                  v-model="chara.CriticalDamageChange"
                  md-input-type="number"
                  :md-format="isPercent"
                >
                  <label>{{$t('Critical Damage Change/%')}}</label>
                </Chips>
              </div>
            </div>
          </div>

          <div class="md-layout-item">
            <p class="md-subheading">{{$t('Enemy')}}</p>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <Chips v-model="enemy.StatusChange " md-input-type="number" :md-format="isPercent">
                  <label>{{$t('Defence Change/%')}}</label>
                </Chips>
              </div>

              <div class="md-layout-item md-size-100">
                <Chips v-model="enemy.ElementResist" md-input-type="number" :md-format="isPercent">
                  <label>{{$t('Element Resist/%')}}</label>
                </Chips>
              </div>
            </div>
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
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>{{$t('Element')}}</label>
                  <md-select v-model="basic.elementCoef">
                    <md-option value="2.0">{{$t('Weak')}}</md-option>
                    <md-option value="1.0">{{$t('Default')}}</md-option>
                    <md-option value="0.5">{{$t('Resist')}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
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
            <Chips v-model="chara.StatusChange " md-input-type="number" :md-format="isPercent">
              <label>{{$t('Attack Change/%')}}</label>
            </Chips>

            <Chips v-model="chara.WeakElementBonus" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Weak Element Bonus/%')}}</label>
            </Chips>

            <Chips
              v-model="chara.NextAttackUp"
              md-input-type="number"
              :md-format="isPercent"
              :md-limit="1"
            >
              <label>{{$t('Next Attack Up/%')}}</label>
            </Chips>

            <Chips
              v-model="chara.CriticalDamageChange"
              md-input-type="number"
              :md-format="isPercent"
            >
              <label>{{$t('Critical Damage Change/%')}}</label>
            </Chips>
          </md-tab>

          <md-tab :md-label="$t('Enemy')">
            <Chips v-model="enemy.StatusChange " md-input-type="number" :md-format="isPercent">
              <label>{{$t('Defence Change/%')}}</label>
            </Chips>

            <Chips v-model="enemy.ElementResist" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Element Resist/%')}}</label>
            </Chips>
          </md-tab>
        </md-tabs>
      </md-card-content>

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

    <md-card class="card" id="stun">
      <md-card-header>
        <div class="md-title" id="Stun">{{$t('Stun Gauge')}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33 md-small-size-50">
            <md-field>
              <label>{{$t('Damage')}}</label>
              <md-input v-model="stun.damage" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-50">
            <md-field>
              <label>{{$t('Max HP')}}</label>
              <md-input v-model="stun.MaxHP" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-50">
            <md-field>
              <label>{{$t('Stun Coefficient')}}</label>
              <md-input v-model="stun.StunCoef" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-50">
            <md-field>
              <label>{{$t('Element')}}</label>
              <md-select v-model="basic.elementCoef">
                <md-option value="2.0">{{$t('Weak')}}</md-option>
                <md-option value="1.0">{{$t('Default')}}</md-option>
                <md-option value="0.5">{{$t('Resist')}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-100">
            <Chips v-model="chara.WeakElementBonus" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Weak Element Bonus/%')}}</label>
            </Chips>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-100">
            <Chips v-model="enemy.ElementResist" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Element Resist/%')}}</label>
            </Chips>
          </div>
        </div>
      </md-card-content>

      <md-divider/>

      <md-card-content>
        <p class="md-display-1">
          {{$t('Stun =')}}
          <span style="float: right">{{(stunGauge*100).toFixed(1)}}%</span>
        </p>
        <p class="md-display-1">
          <span style="font-size: 85%">
            {{$t('Damage Needed =')}}
            <span style="float: right">{{damageNeeded.toFixed(0)}}</span>
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
      },
      stun: {
        damage: 0,
        MaxHP: 0,
        StunCoef: 0.8
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
    },
    stunGauge() {
      let stun = this.stun.damage / this.stun.MaxHP;
      stun *= this.stun.StunCoef;
      stun *= this.elementCoef;
      return clamp(stun, 0, 1);
    },
    damageNeeded() {
      let damage = this.stun.MaxHP;
      damage /= this.stun.StunCoef;
      damage /= this.elementCoef;
      return clamp(damage, 0, 357913952);
    }
  },
  methods: {
    isPercent(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%";
    }
  },
  watch: {
    damageAverage: function() {
      this.stun.damage = this.damageAverage.toFixed(0);
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

.card {
  margin: 8px;
}
</style>
