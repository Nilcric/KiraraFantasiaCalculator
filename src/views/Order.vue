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
            <Chips v-model="order.StatusChange" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Speed Change/%')}}</label>
            </Chips>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <Chips v-model="order.LoadFactorReduce" md-input-type="number" :md-format="isPercent">
              <label>{{$t('Load Factor Reduce/%')}}</label>
            </Chips>
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

    <md-card class="card card-desktop">
      <md-card-header>
        <div class="md-title">{{$t('Timeline')}}</div>
      </md-card-header>

      <WIP/>

      <md-card-content>
        <md-button class="md-primary md-raised" @click="addChara">{{$t('Add Chara')}}</md-button>
        <md-button class="md-primary md-raised" @click="delChara">{{$t('Delete Chara')}}</md-button>
        <md-button class="md-primary md-raised" @click="init">{{$t('Start')}}</md-button>

        <div class="md-layout md-gutter" v-for="chara in charas" :key="chara.id">
          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('ID')}}</label>
              <md-input v-model="chara.id" readonly></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('Name')}}</label>
              <md-input v-model="chara.name"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('Speed')}}</label>
              <md-input v-model="chara.speed" type="number"></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-divider v-if="start"/>

      <md-card-content v-if="start">
        <p class="md-display-1">
          {{$t('Timeline =')}}
          <transition-group name="chip-list" style="float: right">
            <md-menu
              md-direction="bottom-start"
              v-for="chara in timeline"
              :key="chara.id"
              style="position: relative; margin: 2px"
              :style="{right: (chara.orderValue - relativeOrderValue) * 2 + 'px'}"
              md-align-trigger
            >
              <md-chip
                md-menu-trigger
                md-clickable
                class="chip-item"
                :class="{
                  'md-primary': chara.id<0 || chara.id == actionChara.id,
                  'action-chara': chara.id == actionChara.id
                }"
              >{{chara.name}}</md-chip>
              <md-tooltip md-direction="top">{{(chara.orderValue - relativeOrderValue)}}</md-tooltip>
              <md-menu-content>
                <md-menu-item>{{chara.name}}</md-menu-item>
                <md-menu-item>Absolute Order Value: {{chara.orderValue}}</md-menu-item>
              </md-menu-content>
            </md-menu>
          </transition-group>
        </p>
      </md-card-content>

      <md-divider v-if="start"/>

      <md-card-content v-if="start">
        <p class="md-subheading">{{actionChara.name}}'s turn</p>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('Load Factor/%')}}</label>
              <md-input v-model="turn.loadFactor" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('Name')}}</label>
              <md-input v-model="turn.name"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33">
            <md-field>
              <label>{{$t('Buff')}}</label>
              <md-input v-model="turn.buff"></md-input>
            </md-field>
          </div>
        </div>

        <md-button class="md-primary md-raised" @click="action">Action</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { setTimeout } from "timers";
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
      order: {
        speed: null,
        LoadFactor: null,
        StatusChange: [],
        LoadFactorReduce: []
      },
      charas: [
        {
          id: 0,
          name: "Ayaya",
          speed: 150,
          orderValue: 0,
          buff: []
        },
        {
          id: 1,
          name: "CircleLin",
          speed: 140,
          orderValue: 0,
          buff: []
        },
        {
          id: 2,
          name: "Kyoko",
          speed: 130,
          orderValue: 0,
          buff: []
        }
      ],
      turn: {
        name: null,
        loadFactor: null,
        buff: []
      },
      sortedCharas: [],
      start: false,
      acting: false,
      relativeOrderValue: 0,
      actionChara: {
        name: "",
        speed: null
      }
    };
  },
  methods: {
    isPercent(str) {
      let x = Number.parseFloat(str);
      if (isNaN(x)) return false;
      return (x > 0 ? "+" : "") + x + "%";
    },
    addChara() {
      this.charas.push({
        id: this.charas.length,
        name: null,
        speed: null,
        orderValue: 0,
        buff: []
      });
    },
    delChara() {
      if (this.charas.length > 1) {
        this.charas.pop();
      }
    },
    calcOrderValue(speed, loadFactor, speedChange, loadFactorReduce) {
      let orderBase = clamp(124 - Math.floor(speed / 2), 0, 100);
      let orderCoef = Math.fround(clamp(1 - speedChange, 0));
      loadFactor =
        Math.fround(loadFactor / 100) * Math.fround(1 - loadFactorReduce);

      let orderValue = orderBase * loadFactor * orderCoef;
      return clamp(Math.floor(orderValue), 15, 500);
    },
    init() {
      for (var i in this.charas) {
        let chara = this.charas[i];
        chara.orderValue = this.calcOrderValue(chara.speed, 100, 0.0, 0.0);
      }
      let sortedCharas = this.charas
        .slice()
        .sort((x, y) => x.orderValue - y.orderValue);

      this.sortedCharas = sortedCharas.reverse();
      this.nextTurn();
      this.start = true;
    },
    nextTurn() {
      var self = this;
      this.actionChara = this.sortedCharas[this.sortedCharas.length - 1];
      this.relativeOrderValue = this.actionChara.orderValue;
      setTimeout(function() {
        self.acting = false;
      }, 300);

      this.turn.name = null;
      this.turn.loadFactor = 75;
      this.turn.buff = [];
    },
    action() {
      var self = this;
      var orderValue = this.calcOrderValue(
        this.actionChara.speed,
        this.turn.loadFactor,
        0.0,
        0.0
      );

      this.acting = true;
      var actionChara = this.sortedCharas.pop();
      actionChara.orderValue += orderValue;
      this.relativeOrderValue -= 25;
      this.sortedCharas.unshift(actionChara);
      this.sortedCharas.sort((x, y) => y.orderValue - x.orderValue);
      setTimeout(function() {
        self.nextTurn();
      }, 500);
    }
  },
  computed: {
    orderBase() {
      return clamp(124 - Math.floor(this.order.speed / 2), 0, 100);
    },
    orderValue() {
      return this.calcOrderValue(
        this.order.speed,
        this.order.LoadFactor,
        this.order.StatusChange.reduce(sum, 0) / 100,
        this.order.LoadFactorReduce.reduce(sum, 0) / 100
      );
    },
    timeline() {
      if (this.acting) {
        return this.sortedCharas;
      }

      var orderValue = this.calcOrderValue(
        this.actionChara.speed,
        this.turn.loadFactor,
        0.0,
        0.0
      );
      var actionChara = {
        id: -this.actionChara.id - 1,
        name: this.actionChara.name,
        speed: this.actionChara.speed,
        orderValue: this.actionChara.orderValue + orderValue
      };
      return [actionChara]
        .concat(this.sortedCharas)
        .sort((x, y) => y.orderValue - x.orderValue);
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/src/components/MdLayout/mixins";

.card {
  margin: 8px;
}

.card-desktop {
  @include md-layout-small {
    display: none;
  }
}

.chip-list-move {
  transition: transform 0.3s;
}

.chip-item {
  transition: all 0.3s;
}

.chip-list-leave-active {
  position: absolute;
}
</style>
