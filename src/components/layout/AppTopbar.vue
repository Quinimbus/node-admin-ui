<script setup lang="ts">
import { useAppConfigStore, useAuthStore } from '@/store';
import { useLayout } from './composables/layout';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const appConfigStore = useAppConfigStore();
const authStore = useAuthStore();
const appName = appConfigStore.name;
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="mdi mdi-menu"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <span class="text-4xl text-primary mdi mdi-table-edit" />

                <span>{{ appName }}</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['mdi', { 'mdi-weather-night': isDarkTheme, 'mdi-weather-sunny': !isDarkTheme }]"></i>
                </button>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="mdi mdi-dots-vertical"></i>
            </button>

            <div
                class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button
                        v-if="authStore.isAuthenticated"
                        type="button" 
                        class="layout-topbar-action"
                        @click="authStore.logout">
                        <i class="mdi mdi-logout"></i>
                        <span v-text="authStore.completeName"></span>
                    </button>
                    <button
                        v-else-if="appConfigStore.oidcActive"
                        type="button" 
                        class="layout-topbar-action"
                        @click="authStore.login">
                        <i class="mdi mdi-login"></i>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
