<template>
  <md-empty-state :md-icon="require('../assets/calc.svg')" :md-label="$t('KiraFanCalc')">
    <p v-html="$t('Introduction')"></p>
    <p v-html="$t('Circle Lin')"></p>
    <p v-html="$t('Old Version')"></p>
  </md-empty-state>
</template>

<script>
export default {
  name: "Home"
};
</script>
