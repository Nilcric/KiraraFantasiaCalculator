<template>
  <div>
    <md-card class="card">
      <md-card-header>
        <div class="md-title">{{$t('Status')}}</div>
      </md-card-header>

      <WIP/>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "Status"
};
</script>

<style>
.card {
  margin: 8px;
}
</style>
