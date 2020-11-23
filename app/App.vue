<template lang="pug">
    #app
        Home
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Home from "./pages/Home.vue";

    @Component({components: {Home}})
    export default class App extends Vue {

        public mounted() {

        }
    }
</script>

<style lang="sass">
    // Global styles
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap')

    html
        font-size: 16px

    body
        margin: 0
        padding: 0

        font-size: 62.5%
        font-family: "Open Sans", sans-serif
</style>

<style lang="sass" scoped>
  #app
    font-size: 1.5em
</style>
