<script setup lang="ts">
import { useAppConfigStore } from '@/store';

const appConfigStore = useAppConfigStore();
const appName = appConfigStore.name;
const appVersion = appConfigStore.version;
</script>

<template>
    <div class="layout-footer">
        {{ appName }} {{ appVersion }}
    </div>
</template>
