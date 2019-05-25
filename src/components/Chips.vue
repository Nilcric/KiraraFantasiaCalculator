<template>
  <md-field class="md-chips md-theme-default" :class="[chipsClasses]">
    <slot/>

    <md-chip
      v-for="(chip, key) in value"
      :key="chip"
      :md-deletable="!mdStatic"
      :md-clickable="!mdStatic"
      @keydown.enter="$emit('md-click', chip, key)"
      @click.native="$emit('md-click', chip, key)"
      @md-delete.stop="removeChip(chip)"
    >
      <slot name="md-chip" :chip="chip" v-if="$scopedSlots['md-chip']">{{ chip }}</slot>
      <template v-else>{{ chip }}</template>
    </md-chip>

    <md-input
      ref="input"
      v-model.trim="inputValue"
      v-if="!mdStatic && modelRespectLimit"
      :type="mdInputType"
      :placeholder="mdPlaceholder"
      @keydown.enter="insertChip"
      @keydown.8="handleBackRemove"
      @blur="insertChip"
    ></md-input>
  </md-field>
</template>

<script>
export default {
  name: "Chips",
  props: {
    value: Array,
    mdInputType: {
      type: [String, Number]
    },
    mdPlaceholder: [String, Number],
    mdStatic: Boolean,
    mdLimit: Number,
    mdFormat: {
      type: Function
    }
  },
  data: () => ({
    inputValue: ""
  }),
  computed: {
    chipsClasses() {
      return {
        "md-has-value": this.value && this.value.length
      };
    },

    modelRespectLimit() {
      return !this.mdLimit || this.value.length < this.mdLimit;
    },

    formattedInputValue() {
      if (!this.mdFormat) {
        return this.inputValue;
      }
      return this.mdFormat(this.inputValue);
    }
  },
  methods: {
    insertChip() {
      let inputValue = this.formattedInputValue;

      if (!inputValue || !this.modelRespectLimit) {
        return;
      }

      this.value.push(inputValue);
      this.$emit("input", this.value);
      this.$emit("md-insert", inputValue);
      this.inputValue = "";
    },
    removeChip(chip) {
      const index = this.value.indexOf(chip);

      this.value.splice(index, 1);
      this.$emit("input", this.value);
      this.$emit("md-delete", chip, index);
      this.$nextTick(() => this.$refs.input.$el.focus());
    },
    handleBackRemove() {
      if (!this.inputValue) {
        this.removeChip(this.value[this.value.length - 1]);
      }
    }
  }
};
</script>
