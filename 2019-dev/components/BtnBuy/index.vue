<template>
    <a class="btnBuy"
        v-if="!isHide"
        :href="buyTicketUrl"
        target="_blank"
        @click="$store.dispatch('handleTicketClick')">
        <div class="btnBuy__text">
            我要<br>購票
        </div>
    </a>
</template>

<script>
export default {
    name: 'btnBuy',
    computed: {
        isHide() {
            return this.$route.name === 'ticket' ? true : false;
        },
        buyTicketUrl() {
            return this.$store.getters.buyTicketUrl + this.$store.getters.utm;
        },
    },
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
