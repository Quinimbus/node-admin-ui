<script setup lang="ts">
import { useLayout } from './composables/layout';
import { computed, PropType, ref, watch } from 'vue';
import { AppFooter, AppSidebar, AppTopbar } from '.';
import { TypeDefinition } from '@/types';

const props = defineProps({
    entityTypeDefinitions: {
        type: Array as PropType<TypeDefinition[]>,
        required: true
    }
});

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                resetMenu();
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    if (sidebarEl && topbarEl) {
        const target = event.target as Node;
        return !(sidebarEl.isSameNode(target) || sidebarEl.contains(target) || topbarEl.isSameNode(target) || topbarEl.contains(target));
    }
}
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <AppTopbar />
        <AppSidebar :entity-type-definitions="props.entityTypeDefinitions" />
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
