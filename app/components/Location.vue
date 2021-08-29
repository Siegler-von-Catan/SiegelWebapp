<template lang="pug">
  .location
    template(v-for="(entry, i) in entries")
      router-link.entry(:to="buildLink(i)") {{ entry.title }}
      .right.right-icon(:key="i*2+1")
</template>

<script lang="ts">
import "../style/location.sass";
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

export interface LocationEntry {
  title: string;

  /**
   * If it starts with a / it will be used as the absolute router-link.
   * If it does not it will be concatenated with all previous entries until the next absolute-router link
   *
   * See {@link Location#buildLink}
   */
  href: string;
}

@Component
export default class Location extends Vue {
  @Prop({default: []}) entries: LocationEntry[];

  /**
   * Builds a link from multiple parts.
   * Example: For entries = ["/home", "/data", "seals", "42"] and index 2 it will return "/data/seals"
   */
  private buildLink(index: number): string {
    const linkEntries: string[] = [];
    for (let i = index; i >= 0; i--) {
      const currentEntry = this.entries[i];
      linkEntries.push(currentEntry.href);
      if (currentEntry.href.startsWith("/")) {
        break;
      }
    }
    linkEntries.reverse();
    return linkEntries.join("/");
  }
}
</script>
