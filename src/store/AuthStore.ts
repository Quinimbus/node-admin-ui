import { defineStore } from "pinia";
import { computed, ref, unref, watch } from "vue";
import { useAuth, useOidcStore, User } from 'vue3-oidc'

export const useAuthStore = defineStore('auth', () => {
    const {
        signinRedirect,
        signoutRedirect,
        refreshToken
    } = useAuth();

    const { state } = useOidcStore();

    let lastUsermanager: any | null = null;

    const user = ref(unref(state).user);
    const setUser = (newUser: User | null) => {
        user.value = newUser;
    };

    watch(state, state => {
        if (state.userManager != lastUsermanager) {
            state.userManager?.getUser().then(setUser);
            state.userManager?.events.addUserLoaded(setUser);
            lastUsermanager = state.userManager;
        }
    }, { deep: true, immediate: true });

    const token = computed(() => unref(user)?.access_token ?? '');

    const givenName = computed(() => unref(user)?.profile?.given_name ?? '');
    const familyName = computed(() => unref(user)?.profile?.family_name ?? '');
    const completeName = computed(() => {
        const given = givenName.value;
        const family = familyName.value;
        return given && family ? `${given} ${family}` : (given || family);
    });
    const roles = computed(() => unref(user)?.profile.roles as string[] ?? []);
    const tokenExpiry = computed(() => unref(user)?.expires_at ?? 0);

    async function login() { await signinRedirect() }
    async function logout() { await signoutRedirect() }
    async function refresh() { refreshToken() }

    const isAuthenticated = computed(() => !!unref(user));

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
        refresh
    }
});