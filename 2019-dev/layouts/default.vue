<template>
    <div class="layout">
        <div class="full-loading" ref="fullLoading"></div>
        <!-- <SectionModal id="SectionModal"/> -->
        <Header />
        <nuxt />
        <!-- <BtnBuy /> -->
        <Footer />
    </div>
</template>

<script>
// import SectionModal from "~/components/SectionModal";
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import BtnBuy from '~/components/BtnBuy';

export default {
    name: 'layout',
    components: {
        // SectionModal,
        Footer,
        Header,
        BtnBuy,
    },
    methods: {
        // client side 初始語系, 先從 localStorage 抓取之前已選定語系, 若無將預設為 zh
        localInit() {
            this.$store.commit('setLocale', 'zh');
            this.$i18n.locale = 'zh';
        },
        handlePageLoading() {
            this.$refs.fullLoading.classList.remove('hide');
            this.$refs.fullLoading.classList.add('animation');
            setTimeout(() => {
                this.$refs.fullLoading.classList.add('hide');
                this.$refs.fullLoading.classList.remove('animation');
            }, 700);
        },
    },
    mounted() {
        this.localInit();
        this.handlePageLoading();
    },
};
</script>

<style lang="scss">
.layout {
    overflow-x: hidden;
    background-color: $colorBg;
    padding-top: 67px;
    @include rwd(pad) {
        padding-top: 47px;
    }
}

.section {
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 25px;
    .title {
        @include rwd(pad) {
            font-size: 32px;
            letter-spacing: 1.6px;
        }
    }
}

// 頁面切換轉場效果
.page-enter-active,
.page-leave-active {
    transition: all 0.6s;
}

.page-enter,
.page-leave-active {
    opacity: 0;
    filter: blur(3px);
    @include rwd(pad) {
        filter: none;
    }
}

.fb-share__btn {
    display: inline-block;
    min-width: 211px;
    min-height: 65px;
    padding: 0 30px;
    backface-visibility: hidden;
    transition: all 0.15s;
    line-height: 65px;
    text-align: center;
    user-select: none;
    outline: none;
    -webkit-user-drag: none;
    cursor: pointer;
    z-index: 1;
    @include rwd(pad) {
        min-width: 146px;
        min-height: 45px;
        line-height: 45px;
    }
    &:hover {
        transform: translate(3px, 3px);
        @include rwd(pad) {
            transform: translate(2px, 2px);
        }
        &:after {
            transform: translate(0, 0);
        }
    }
    &:hover:active {
        &:before {
            background-color: #17273e;
        }
    }
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 14px;
        @include rwd(pad) {
            border-radius: 8px;
        }
    }
    &:after {
        transform: translate(10px, 13px);
        transition: all 0.15s;
        background-color: $colorPrimary;
        opacity: 0.19;
        z-index: -2;
        @include rwd(pad) {
            transform: translate(6px, 8px);
        }
    }
    &:before {
        border: solid 1px $colorPrimary;
        background-color: $colorBg;
        z-index: -1;
    }
}

.full-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: darken($colorWhite, 20);
    transition: all 0s;
    z-index: 3000;
}

.full-loading.animation {
    opacity: 0;
    transition: all 0.6s;
}

.full-loading.hide {
    z-index: -1;
}
</style>
