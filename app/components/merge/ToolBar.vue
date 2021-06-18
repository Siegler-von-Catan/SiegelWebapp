<template lang="pug">
#tool-bar
  a(@click="doExport") Export
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class ToolBar extends Vue {

  private doExport() {
    this.$emit("doExport");
  }
}
</script>

<style scoped>

</style>
