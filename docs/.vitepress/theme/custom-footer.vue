<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #layout-bottom>
            <div style="margin: 0 auto; font-size: 10px; color: #999">
                粤ICP备XXX-XXX-XXX
            </div>
        </template>
    </Layout>
</template>
