<template>
    <Editor
        v-model="model"
        :modules="{
            toolbar: {
                container: '.p-editor-toolbar',
                handlers: { image: imageHandler },
            },
        }"
        editor-style="min-height: 320px; height: 1px"
        @load="quillInit"
    >
        <template #toolbar>
            <span class="ql-formats">
                <select
                    class="ql-header"
                    defaultValue="0"
                >
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="0">Normal</option>
                </select>
                <select class="ql-font">
                    <option></option>
                    <option value="serif"></option>
                    <option value="monospace"></option>
                </select>
            </span>
            <span class="ql-formats">
                <button
                    class="ql-bold"
                    type="button"
                ></button>
                <button
                    class="ql-italic"
                    type="button"
                ></button>
                <button
                    class="ql-underline"
                    type="button"
                ></button>
            </span>
            <span class="ql-formats">
                <select class="ql-color ql-picker ql-color-picker"></select>
                <select class="ql-background ql-picker ql-color-picker"></select>
            </span>
            <span class="ql-formats">
                <button
                    class="ql-list"
                    value="ordered"
                    type="button"
                ></button>
                <button
                    class="ql-list"
                    value="bullet"
                    type="button"
                ></button>
                <select class="ql-align">
                    <option defaultValue></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>
            </span>
            <span class="ql-formats">
                <button
                    class="ql-link"
                    type="button"
                ></button>
                <button
                    class="ql-image"
                    type="button"
                ></button>
                <button
                    class="ql-video"
                    type="button"
                ></button>
            </span>
            <span class="ql-formats">
                <button
                    class="ql-clean"
                    type="button"
                ></button>
            </span>
        </template>
    </Editor>
</template>

<script setup lang="ts">
import api from '@/api/api';
import Quill, { Delta } from 'quill/core';
import Emitter from 'quill/core/emitter';
import type Toolbar from 'quill/modules/toolbar';
interface EditorLoadEvent {
    instance: InstanceType<typeof Quill>;
}

const model = defineModel<string>();

function quillInit(e: EditorLoadEvent) {
    const delta = e.instance.clipboard.convert({ html: model.value });
    e.instance.setContents(delta);
}
function imageHandler(this: Toolbar) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.jpg,.png');
    input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const { fileUrl } = await api.files.upload(formData);
        const range = this.quill.getSelection();
        if (!range) return; // TODO show error

        this.quill.updateContents(
            new Delta().retain(range.index).delete(range.length).insert({ image: fileUrl }),
            Emitter.sources.USER
        );
    };
    input.click();
}
</script>
