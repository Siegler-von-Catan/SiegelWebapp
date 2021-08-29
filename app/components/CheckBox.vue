<!--
  - ShapeFromShading - Creating heightmaps out of 2D seal images.
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
  .checkbox
    label(:for="_uid" v-if="!left") {{ title }}
    input(type="checkbox" :value="checked" :id="_uid" @change="$emit('change', $event.target.checked)")
    label(:for="_uid" v-if="left") {{ title }}
</template>

<script lang="ts">
import "../style/checkbox.sass";
import Component from 'vue-class-component';
import Vue from 'vue';
import {Model, Prop} from 'vue-property-decorator';

@Component
export default class CheckBox extends Vue {
  @Prop({default: false}) left: boolean;
  @Prop() title: string;
  @Model("change", {type: Boolean}) readonly checked: boolean;
}
</script>
