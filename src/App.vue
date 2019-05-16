<template>
  <div id="app">
    <md-content class="navi-desktop">
      <md-list>
        <md-list-item to="/damage">
          <md-icon>colorize</md-icon>
          <span class="md-list-item-text">{{$t('Damage')}}</span>
        </md-list-item>

        <md-list-item to="/random">
          <md-icon>star</md-icon>
          <span class="md-list-item-text">{{$t('Random')}}</span>
        </md-list-item>

        <md-list-item to="/order">
          <md-icon>timer</md-icon>
          <span class="md-list-item-text">{{$t('Order')}}</span>
        </md-list-item>

        <md-list-item to="/status">
          <md-icon>face</md-icon>
          <span class="md-list-item-text">{{$t('Status')}}</span>
        </md-list-item>
      </md-list>
    </md-content>

    <md-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">{{$t('KiraFanCalc')}}</h3>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>translate</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="setLocale('jp')">日本語</md-menu-item>
          <md-menu-item @click="setLocale('zh')">中文</md-menu-item>
          <md-menu-item @click="setLocale('en')">English</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <div class="view">
      <router-view/>
    </div>
    <md-bottom-bar class="navi-phone" md-type="shift" md-sync-route>
      <md-bottom-bar-item to="/damage" md-icon="colorize" :md-label="$t('Damage')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/random" md-icon="star" :md-label="$t('Random')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/order" md-icon="timer" :md-label="$t('Order')"></md-bottom-bar-item>
      <md-bottom-bar-item to="/status" md-icon="face" :md-label="$t('Status')"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
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
  padding: 8px 8px 8px 264px;
  @include md-layout-xsmall {
    padding: 8px 8px 64px 8px;
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
  top: 64px;
  @include md-layout-small {
    top: 48px;
  }
  bottom: 0;
  left: 0;
  .md-list-item {
    width: 256px;
  }
}
</style>
