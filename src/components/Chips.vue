<template>
  <md-field class="md-chips md-theme-default" :class="[chipsClasses]">
    <slot/>

    <md-chip
      v-for="(chip, key) in value"
      :key="chip"
      :md-deletable="!mdStatic"
      :md-clickable="!mdStatic"
      :md-duplicated="duplicatedChip === chip"
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
      @input="handleInput"
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
    mdCheckDuplicated: {
      type: Boolean,
      default: false
    },
    mdFormat: {
      type: Function
    }
  },
  data: () => ({
    inputValue: "",
    duplicatedChip: null
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

      if (this.value.includes(inputValue)) {
        this.duplicatedChip = null;
        // to trigger animate
        this.$nextTick(() => {
          this.duplicatedChip = inputValue;
        });
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
    },
    handleInput() {
      if (this.mdCheckDuplicated) {
        this.checkDuplicated();
      } else {
        this.duplicatedChip = null;
      }
    },
    checkDuplicated() {
      if (!this.value.includes(this.formattedInputValue)) {
        this.duplicatedChip = null;
        return false;
      }

      if (!this.mdCheckDuplicated) {
        return false;
      }

      this.duplicatedChip = this.formattedInputValue;
    }
  },
  watch: {
    value() {
      this.checkDuplicated();
    }
  }
};
</script>
