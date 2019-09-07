<template>
  <section class="section section-community">
    <h2 class="title"><span>{ MOPCON </span><span class="color-primary">主辦社群</span><span>; }</span></h2>
    <h2 class="title_mobile"><span>{ 主辦社群 ; }</span></h2>
    <div class="community">
      <div class="community__card" v-for="community in communityList" :key="'community' + community.id"
        :id="'community' + community.id" :class="{'active': show == community.id}">
        <div class="community__content">
          <div class="card-header">
            <img class="logo" src="https://t.kfs.io/upload_images/31686/KSDG-logo-new_268px_promote.png" alt="">
            <p>{{ community.name }}</p>
          </div>
          <div class="card-body">
            <p class="intro">{{ tempCommunityData.introduction }}</p>
          </div>
        </div>
        <div class="community__aside">
          <div class="card-header">
            <a href="#" class="toggle_icon" @click.prevent="openCard(community.id)">
              <img v-if="show == community.id" src="./images/Icon_times.png" width="25px">
              <img v-else src="./images/Icon_open.png" width="25px" height="25px">
            </a>
          </div>
          <div class="social_media">
            <a v-if="tempCommunityData.facebook" :href="tempCommunityData.facebook" target="_blank">
              <img src="./images/Icon_facebook.png" alt="facebookIcon" width="24px" height="24px">
            </a>
            <a v-if="tempCommunityData.twitter" :href="tempCommunityData.twitter" target="_blank">
              <img src="./images/Icon_twitter.png" alt="twitterIcon" width="24px" height="24px">
            </a>
            <a v-if="tempCommunityData.instagram" :href="tempCommunityData.instagram" target="_blank">
              <img src="./images/Icon_instagram.png" alt="instagramIcon" width="24px" height="24px">
            </a>
            <a v-if="tempCommunityData.telegram" :href="tempCommunityData.telegram" target="_blank">
              <img src="./images/Icon_telegram.png" alt="telegramIcon" width="24px" height="24px">
            </a>
            <a v-if="tempCommunityData.event" :href="tempCommunityData.event" target="_blank">
              <img src="./images/event.png" alt="eventIcon" width="24px" height="24px">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name: "SectionCommunity",
    data() {
      return {
        communityList: [],
        tempCommunityData: [],
        show: -1,
      };
    },
    methods: {
      getCommunityData() {
        const vm = this;
        vm.$axios
          .$get(`/api/2019/community`)
          .then(({ success, data, message }) => {
            if (success) {
              vm.communityList = data.community
            } else {
              console.log("error", message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      openCard(id) {
        const vm = this;
        const card = document.querySelectorAll('.community__card');
        vm.$axios.$get(`/api/2019/community/organizer/${id}`)
          .then(({ success, data, message }) => {
            if (success) {
              vm.tempCommunityData = data;
              if (vm.show === id) {
                vm.show = -1;
              } else {
                vm.show = id;
              }
            }
          })
      },
    },
    created() {
      this.getCommunityData();
    }
  };
</script>

<style lang="scss" src="./style.scss" scoped></style>