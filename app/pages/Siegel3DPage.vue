<template lang="pug">
    .page
      Siegel3DCanvas
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import Siegel3DCanvas from '../components/Siegel3DCanvas.vue';

    @Component({components: {Siegel3DCanvas}})
    export default class Siegel3DPage extends Vue {
    }
</script>

<style lang="sass" scoped>

</style>
