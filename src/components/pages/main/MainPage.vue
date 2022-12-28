<template>
<h1>Главная страница</h1>
</template>

<script>
import { signInAsync } from "@/api/account";
import { mapActions, mapGetters } from "vuex";
import UICard from '@/components/ui/UICard.vue';
import UITextInput from '@/components/ui/UITextInput.vue';
import UIButton from '@/components/ui/UIButton.vue';
export default {
	components: { UICard, UITextInput, UIButton },
    name: "MainPage",
    methods: {
        ...mapActions(["setAccessToken", "setRefreshToken", "setLocale"]),
        async onTestButtonClicked() {
            const result = await signInAsync("admin", "admin");
            this.setAccessToken(result?.accessToken);
            this.setRefreshToken(result?.refreshToken);
        },
        onChangeLocaleButtonClicked() {
            this.setLocale(this.locale === "en" ? "ru" : "en");
        }
    },
    computed: {
        ...mapGetters(["accessToken", "refreshToken", "locale"])
    }
}
</script>

<style scoped>

</style>