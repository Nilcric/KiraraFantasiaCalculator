<template>
  <div id="app" :style="{'font-family': font}">
    <md-content class="navi-desktop">
      <md-list>
        <md-list-item to="/">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">{{$t('Home')}}</span>
        </md-list-item>

        <md-list-item md-expand :md-expanded="true">
          <md-icon>colorize</md-icon>
          <span class="md-list-item-text">{{$t('Damage')}}</span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" to="/damage#damage">{{$t('Damage Value')}}</md-list-item>
            <md-list-item class="md-inset" to="/damage#stun">{{$t('Stun Gauge')}}</md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item to="/order">
          <md-icon>timer</md-icon>
          <span class="md-list-item-text">{{$t('Order')}}</span>
        </md-list-item>

        <md-list-item md-expand :md-expanded="true">
          <md-icon>star</md-icon>
          <span class="md-list-item-text">{{$t('Probability')}}</span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" to="/probability#critical">{{$t('Critical Rate')}}</md-list-item>
            <md-list-item class="md-inset" to="/probability#hate">{{$t('Hate & AI')}}</md-list-item>
            <md-list-item class="md-inset" to="/probability#gacha">{{$t('Gacha')}}</md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item to="/status">
          <md-icon>face</md-icon>
          <span class="md-list-item-text">{{$t('Status')}}</span>
        </md-list-item>
      </md-list>
    </md-content>

    <md-toolbar class="toolbar-desktop md-primary" style="position: fixed;">
      <h3 class="md-title" style="flex: 1">{{$t('KiraFanCalc')}}</h3>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>translate</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="setLocale('ja')">日本語</md-menu-item>
          <md-menu-item @click="setLocale('zh')">中文</md-menu-item>
          <md-menu-item @click="setLocale('en')">English</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>

    <div class="view">
      <md-toolbar class="toolbar-phone md-primary">
        <h3 class="md-title" style="flex: 1">{{$t('KiraFanCalc')}}</h3>
        <md-menu md-direction="bottom-start">
          <md-button md-menu-trigger class="md-icon-button">
            <md-icon>translate</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click="setLocale('ja')">日本語</md-menu-item>
            <md-menu-item @click="setLocale('zh')">中文</md-menu-item>
            <md-menu-item @click="setLocale('en')">English</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar>

      <keep-alive>
        <router-view class="router-view"/>
      </keep-alive>
    </div>
    <md-bottom-bar class="navi-phone" md-type="shift" md-sync-route>
      <md-bottom-bar-item to="/damage" md-icon="colorize" :md-label="$t('Damage')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/order" md-icon="timer" :md-label="$t('Order')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/probability" md-icon="star" :md-label="$t('Probability')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/status" md-icon="face" :md-label="$t('Status')"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {
    font() {
      return {
        ja:
          "'Avenir', Verdana, 'Helvetica', Verdana, 'ヒラギノ角ゴシック', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif",
        zh:
          "'Avenir', Verdana, 'Helvetica', Verdana, 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif",
        en: "'Avenir', Verdana, 'Helvetica', Verdana, Arial, sans-serif"
      }[this.$i18n.locale];
    }
  },
  methods: {
    setLocale(lang) {
      this.$i18n.locale = lang;
    }
  },
  mounted() {
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.substr(0, 2);
    this.setLocale(lang);
  }
};
</script>

<style type="scss">
@import url("https://fonts.lug.ustc.edu.cn/icon?family=Material+Icons");
</style>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(purple, 700),
    accent: md-get-palette-color(purple, A200)
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>

<style lang="scss">
@import "~vue-material/src/components/MdLayout/mixins";

.view {
  padding: 64px 0 0 256px;
  @include md-layout-small {
    padding: 48px 0 0 256px;
  }
  @include md-layout-xsmall {
    padding: 0 0 64px 0;
  }
}

.navi-phone {
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 9;
  @include md-layout-xsmall {
    display: block;
  }
}

.navi-desktop {
  @include md-layout-xsmall {
    display: none;
  }
  width: 256px;
  padding: 0px 0px 0px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 64px 0px 0px 0px;
  @include md-layout-small {
    padding: 48px 0px 0px 0px;
  }
  .md-list-item {
    width: 256px;
  }
}

.toolbar-phone {
  display: none !important;
  @include md-layout-xsmall {
    display: flex !important;
  }
}

.toolbar-desktop {
  @include md-layout-xsmall {
    display: none !important;
  }
  position: fixed;
  top: 0;
}
</style>
