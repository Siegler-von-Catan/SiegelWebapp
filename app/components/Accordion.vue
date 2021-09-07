<!--
  - FabSeal Website.
  - Copyright (C) 2021
  - Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->
  
<template lang="pug">
  .question
    .tab__header
      a.tab__link(@click.prevent="toggleActive") {{ title }}
        span.down-Arrow(v-show="!active") &#5121;
        span.up-Arrow(v-show="active") &#5123;
    .tab__content(v-show="active")
      slot
</template>

<script lang="ts">
import "../style/accordion.sass";
import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class Accordion extends Vue {

  active = false;

  toggleActive(){
    this.active = !this.active
  }

  @Prop({default: ""})
  public title: string;

}
</script>
