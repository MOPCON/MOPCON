<template>
    <a class="cardTicket" :class="[type, statusClass, {beEngaged: beEngaged}]" :href="link + utm" target="_blank">
        <div class="cardTicket__head">
            <div class="cardTicket__head__title">{{title}}</div>
            <div class="cardTicket__head__count" v-if="count">限量：{{count}}名</div>
        </div>
        <div class="cardTicket__content">
            <div class="cardTicket__content__list"
                v-for="(list, index) in lists"
                :key="index">
                {{list}}
            </div>
            <div v-if="desc" v-html="desc" class="cardTicket__content__desc"></div>
        </div>
        <div v-if="type === 'product'" class="cardTicket__img"
            :style="`background-image: url(${require(`./images/${image}`)})`"></div>
        <div class="cardTicket__btn"
            @click="handleTicketClick(title, price)"
            :class="{secondary: status === 4}"
            v-if="!beEngaged">{{btnText}}</div>

        <div class="cardTicket__text" v-if="type === 'product' && status === 3">{{text}}</div>
    </a>
</template>

<script>
export default {
    name: 'cardTicket',
    props: {
        status: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            default: 'primary', // 三種風格 primary / secondary / third
        },
        beEngaged: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '老鳥票',
        },
        count: {
            type: Number,
            default: 20,
        },
        count: {
            type: Number,
            default: 20,
        },
        image: {
            type: String,
            default: '',
        },
        lists: {
            type: Array,
            default: () => {
                return [
                    '兩日議程',
                    '下午茶點心',
                    '紀念T',
                    '快速通關',
                    'Beengaged 醞釀之夜',
                ];
            },
        },
        desc: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 2600,
        },
        link: {
            type: String,
            defualt: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            utm: '',
        }
    },
    computed: {
        btnText() {
            // status 狀態對應文字
            // 0 => 敬請期待
            // 1 => 顯示價格
            // 2 => 已完售
            // 3 => 開放預購
            // 4 => 現場販售
            if (this.status === 0) return '敬請期待';
            if (this.status === 1) return `NT$${this.price}`;
            if (this.status === 2) return '已完售';
            if (this.status === 3) return '開放預購';
            if (this.status === 4) return '現場販售';
        },
        statusClass() {
            // status 狀態對應 class 名稱
            // 0 => disabled
            // 1 => 預設樣式，不用加
            // 2 => soldout
            if (this.status === 0 || this.status == 4) return 'disabled';
            if (this.status === 2) return 'soldout';
            return '';
        },
    },
    methods: {
        handleTicketClick(ticket, price) {
            this.$emit('onTicketClick', ticket, price);
        },
    },
    mounted() {
        this.utm = this.$store.getters.utm;
    }
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
