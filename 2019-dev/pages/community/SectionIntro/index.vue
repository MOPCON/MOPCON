<template>
  <section class="section-intro">
    <div class="banner"></div>
    <section class="section">
      <h2 class="title"><span>{ 我們在打造</span><span class="color-primary">高速資訊交流圈</span><span>; }</span></h2>
      <div class="section-intro__content">
        <div class="section-intro__info">
          <p>MOPCON 為締造人、知識與產業的連結，指在實現三項目標：</p>
          <ul>
            <li><span class="color-secondary">一、帶動南台灣高經濟產業循環</span></li>
            <li><span class="color-secondary">二、培養高知識產值人才</span></li>
            <li><span class="color-secondary">三、匯聚知識、人流、投資，促進創新創業機會。</span></li>
          </ul>
          <p>為使目標達成，MOPCON 志在打造出一座「高速資訊交流圈」！</p>
          <p class="join">
            <span class="color-third">有興趣加入我們嗎？請追蹤我們的 FaceBook！</span>
            <a href="https://www.facebook.com/mopcon/" target="_blank">
              <img src="./images/Icon_event.png" width="13px" height="12.5px">
            </a>
          </p>
        </div>
        <div class="section-intro__img">
          <no-ssr>
            <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" />
          </no-ssr>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import * as animationData from "./images/lottie/animate.json";

  export default {
    name: "sectionIntro",
    data() {
      return {
        defaultOptions: {animationData: animationData.default},
        animationSpeed: 1
      };
    },
    methods: {
      handleAnimation(anim) {
        this.anim = anim;
      },
    },
    created() {
    }
  };
</script>

<style lang="scss" src="./style.scss" scoped></style>