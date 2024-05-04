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
    />
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
<style>
.ql-editor {
    flex-grow: 1;
}
.ql-container {
    display: flex;
    flex-direction: column;
}
</style>
