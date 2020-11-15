<template lang="pug">
    #app
        Siegel3DPage()
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Siegel3DPage from "./pages/Siegel3DPage.vue";

    @Component({components: {Siegel3DPage}})
    export default class App extends Vue {

        public mounted() {

        }
    }
</script>

<style lang="sass">
    // Global styles
    html
        font-size: 16px

    body
        margin: 0
        padding: 0

        font-size: 62.5%
</style>

<style lang="sass" scoped>
    // Scoped styles
</style>
