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
  .fileUpload
    form(enctype="multipart/form-data" novalidate v-if="isInitial() || isSaving()")
      input(type="file" id="createFileInput" :name="uploadFieldName" :disabled="isSaving()"
        @change="filesChange($event.target.name, $event.target.files)" accept="image/*" class="input-file")
      .dropbox
        .text
          h1 Bild hochladen
          p(v-if="isInitial()") Ziehe deine Datei hier oder klicke
          p(v-else="isSaving()") Hochladen...

    <!--SUCCESS-->
    #success(v-if="isSuccess()")
        img(:src="uploadedFiles[0].url" class="img-responsive img-thumbnail" :alt="uploadedFiles[0].originalName")
    <!--FAILED-->
    #error(v-if="isFailed()")
      h2 Hochladen fehlgeschlagen
      p
        a(href="javascript:void(0)" @click="reset()") Erneut versuchen
      pre {{ uploadError }}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Watch} from 'vue-property-decorator';
import "../style/fileUpload.sass";
import {CreateSettings, startCreateSession, startProcessing, uploadCreatedImage} from "../util/createAPI";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
@Component
export default class FileUpload extends Vue {
  @Prop({default: false})
  public stickyTooltip: boolean;

  @Prop({default: ""})
  public tooltip: string;

  @Prop({default: STATUS_INITIAL})
  public currentStatus: number;

  @Prop({default: 'photo'})
  public uploadFieldName: string;

  @Prop({default: []})
  public uploadedFiles: any;

  @Prop({default: undefined})
  public uploadError: any;

  public reset() {
    this.currentStatus = STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
    this.uploadFieldName = "photo";
  }

  private async save(formData: FormData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      console.log("uploading...");
      //getCreateHeightmap(1);
      uploadCreatedImage(formData)
          .then((response: any) => {
              this.uploadedFiles = [].concat(response);
              this.currentStatus = STATUS_SUCCESS;
              this.$emit("successfulUpload");
          })
          .catch(err => {
              this.uploadError = err.response;
              this.currentStatus = STATUS_FAILED;
          });
  }

  private filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    const formData = new FormData();

    if (!fileList.length) return;

    // append the files to FormData
    Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

    // save it
    this.save(formData);
  }

  public async processResults(shouldBeInversed: boolean, shouldBeLowQuality: boolean) {
      const settings: CreateSettings = {
          startX: 0,
          endX: 1000000,
          startY: 0,
          endY: 1000000,
          isInversed: shouldBeInversed,
          isLowQuality: shouldBeLowQuality};
      return await startProcessing(settings)
  }

  public isInitial() {
    return this.currentStatus === STATUS_INITIAL;
  }

  public isSaving() {
    return this.currentStatus === STATUS_SAVING;
  }

  public isSuccess() {
    return this.currentStatus === STATUS_SUCCESS;
  }

  public isFailed() {
    return this.currentStatus === STATUS_FAILED;
  }

}
</script>
