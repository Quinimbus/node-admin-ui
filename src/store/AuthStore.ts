import { defineStore } from "pinia";
import { computed } from "vue";
import { useAuth, useOidcStore } from 'vue3-oidc'

export const useAuthStore = defineStore('auth', () => {
    const {
        signinRedirect,
        signoutRedirect,
        refreshToken
    } = useAuth();

    const { state } = useOidcStore();

    const user = computed(() => state.value?.user ?? null);
    const token = computed(() => state.value?.token ?? null);

    const givenName = computed(() => user?.value?.profile?.given_name ?? '');
    const familyName = computed(() => user?.value?.profile?.family_name ?? '');
    const completeName = computed(() => {
        const given = givenName.value;
        const family = familyName.value;
        return given && family ? `${given} ${family}` : (given || family);
    });
    const roles = computed(() => user.value?.profile.roles as string[] ?? []);
    const tokenExpiry = computed(() => user.value?.expires_at ?? 0);

    async function login() { await signinRedirect() }
    async function logout() { await signoutRedirect() }
    async function refresh() { refreshToken() }

    const isAuthenticated = computed(() => !!user.value);

    const fulfillsRequirement = (requirement: { anonymous: boolean, roles: string[] }) => {
        if (requirement.anonymous) {
            return true;
        } else if (!isAuthenticated.value) {
            return false;
        } else if (requirement.roles.length === 0) {
            return true;
        } else {
            return requirement.roles.some(role => roles.value.includes(role));
        }
    }

    return {
        isAuthenticated,
        user,
        token,
        givenName,
        familyName,
        completeName,
        roles,
        tokenExpiry,
        fulfillsRequirement,
        login,
        logout,
        refresh,
    }
});