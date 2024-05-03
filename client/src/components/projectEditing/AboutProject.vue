<template>
    <div>
        <Editor
            v-model="value"
            :modules="{
                toolbar: {
                    container: '.p-editor-toolbar',
                    handlers: { image: imageHandler },
                },
            }"
        />
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { Delta } from 'quill/core';
import Emitter from 'quill/core/emitter';
import type Toolbar from 'quill/modules/toolbar';
import { ref } from 'vue';

function imageHandler(this: Toolbar) {
    console.log(this);

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

        // this.quill.insertEmbed(range.index, 'image', fileUrl);
        // this.quill.emitter.emit(Emitter.sources.USER);
        this.quill.updateContents(
            new Delta().retain(range.index).delete(range.length).insert({ image: fileUrl }),
            Emitter.sources.USER
        );
    };
    input.click();
}

const value = ref();
</script>
