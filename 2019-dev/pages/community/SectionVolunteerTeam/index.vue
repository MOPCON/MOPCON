<template>
  <section class="section section-volunteer-team">
    <h2 class="title"><span>{ MOPCON </span><span class="color-primary">志工團隊</span><span>; }</span></h2>
    <h2 class="title_mobile">{ 志工團隊; }</h2>
    <div class="section-volunteer-team__intro">
      <div class="volunteer" v-for="volunteer in volunteerList">
        <a href="#" class="volunteer__content" @click.prevent="openModal(volunteer.id)">
          <img class="photo" :src="volunteer.photo" alt="">
          <p>{{ volunteer.name }}</p>
        </a>
      </div>
    </div>
    <div class="section-volunteer-team__message">
      <div class="section-volunteer-team__join">
        <img src="./images/join.png" alt="" width="97px" height="92px">
        <p class="message-title color-third">「我想加入志工行列！」</p>
        <a href="https://www.facebook.com/mopcon/" class="btn-third" target="_blank">追蹤 Facebook</a>
        <p>想要和我們一起改變南部資訊生態圈嗎？歡迎追蹤我們的 Facebook，我們會在下一屆準備開始前 PO 出徵才資訊！加入我們不僅有機會參與改變的過程，還可以得到寶貴的辦展經驗、認識大神們哦！</p>
      </div>
      <div class="section-volunteer-team__sponsor">
        <img src="./images/sponsor.png" alt="" width="115px" height="92px">
        <p class="message-title color-primary">「我有興趣贊助你們。」</p>
        <a href="/2019/sponsor" class="btn-primary">了解詳情</a>
        <p>謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一！</p>
      </div>
    </div>
    <Modal :modal-open="modalOpen" @modal-close="closeModal">
      <div class="modal-body" v-if="volunteerData.photo">
        <div class="info">
          <div class="content">
            <img :src="volunteerData.photo">
            <p class="volunteer_title">{{ volunteerData.name }}</p>
            <p class="volunteer_intro">{{ volunteerData.introduction }}</p>
          </div>
        </div>
        <div class="member">
          <p class="member_title">來看看成員有誰</p>
          <p class="member_name" v-for="member in volunteerData.members">{{ member }}</p>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script>
  import Modal from "~/components/Modal";

  export default {
    name: "sectionVolunteerTeam",
    components: {
      Modal,
    },
    data() {
      return {
        volunteerList: [],
        volunteerData: [],
        modalOpen: false,
      };
    },
    methods: {
      getVolunteerData() {
        const vm = this;
        vm.$axios
          .$get(`/api/2019/volunteer`)
          .then(({ success, data, message }) => {
            if (success) {
              vm.volunteerList = data.volunteer
            } else {
              console.log("error", message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      openModal(id) {
        const vm = this;
        vm.volunteerData = [];
        vm.$axios
          .$get(`/api/2019/volunteer/${id}`)
          .then(({ success, data, message }) => {
            if (success) {
              vm.volunteerData = data;
            } else {
              console.log("error", message);
            }
          })
          .catch(error => {
            console.log(error);
          });
        vm.modalOpen = true;
      },
      closeModal(show) {
        this.modalOpen = show;
      },
    },
    created() {
      this.getVolunteerData();
    }
  };
</script>

<style lang="scss" src="./style.scss" scoped></style>