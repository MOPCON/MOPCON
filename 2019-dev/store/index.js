export const state = () => ({
  pageIsLoading: true,
  locale: 'zh',
  locales: ['zh', 'en'],
  localeApiPrefix: [
    {
      lang: 'zh',
      prefix: '',
    },
    {
      lang: 'en',
      prefix: '_e',
    },
  ],
  seoLangTag: [
    {
      id: 'zh',
      val: 'zh-Hant',
      fb: 'zh_tw',
    },
    {
      id: 'en',
      val: 'en',
      fb: 'en_us',
    },
  ],
  homePageReady: false,
  eventResults: [
    {
      id: 'captain-america',
      title: '歹丸隊長',
      subtitle: '即使變老人，仍然持續',
      desc:
        '隨著時間的累積，能力持續提升。如果你同時運用一己之力幫助身旁的人，世界會因你更美好！',
      image: 'captain-america.png',
    },
    {
      id: 'iron-man',
      title: '肝鐵人',
      subtitle: '加班加過頭',
      desc:
        '你無法忍受失敗，讓你最近身心疲乏，放鬆心情看待一切，接下來你的表現會很棒的！',
      image: 'iron-man.png',
    },
    {
      id: 'hulk',
      title: '綠句人耗克',
      subtitle: '事業順利，感情不順',
      desc:
        '你的事業逐漸步入軌道！但你和曖昧對象的感情似乎沒有結果了，看來「英雄的路上是孤獨的」.....',
      image: 'hulk.png',
    },
    {
      id: 'black-widow',
      title: '黑寡腹',
      subtitle: '為愛犧牲一切',
      desc:
        '你願意犧牲自己換取身旁的一切順心。即使現在你的處境看似不如意，但馬上就有好事發生囉！',
      image: 'black-widow.png',
    },
  ],
  sessionData: [],
  sessionDetail: null,
  sessionDetailLoading: false,
  sessionUnconfData: [],
  tags: [],
  buyTicketUrl: '',
  utm: '',
});

export const mutations = {
  updateHomePageReady(state, payload) {
    state.homePageReady = payload;
  },
  setSessionData(state, payload) {
    if (Array.isArray(payload)) {
      state.sessionData = payload;
    }
  },
  setSessionUnconfData(state, payload) {
    if (Array.isArray(payload)) {
      state.sessionUnconfData = payload;
    }
  },
  setSessionDetail(state, payload) {
    state.sessionDetail = payload;
  },
  clearSessionDetail(state) {
    state.sessionDetail = null;
  },
  toggleSessionDetailLoading(state, payload) {
    state.sessionDetailLoading = payload;
  },
  setLocale(state, payload) {
    if (state.locales.indexOf(payload) !== -1) {
      state.locale = payload;
    }
  },
  setPageIsLoading(state, payload) {
    state.pageIsLoading = payload;
  },
  setTags(state, payload) {
    state.tags = payload;
  },
  setBuyTicketUrl(state, payload) {
    state.buyTicketUrl = payload;
  },
  setUtm(state, payload) {
    state.utm = payload;
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    commit('setBuyTicketUrl', process.env.buyTicketUrl);
  },
  async getSessionData({ commit }) {
    try {
      const { status, data } = await this.$axios.get('/api/2019/session');
      if (status === 200 && data && data.data && data.data.length > 0) {
        commit('setSessionData', data.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  },
  getSessionDetail({ commit }, id) {
    commit('clearSessionDetail');
    commit('toggleSessionDetailLoading', true);
    return new Promise(async (resolve, reject) => {
      const { status, data } = await this.$axios.get(`/api/2019/session/${id}`);
      if (status === 200 && data && data.data) {
        commit('setSessionDetail', data.data);
        commit('toggleSessionDetailLoading', false);
        resolve(data.data);
      } else {
        commit('toggleSessionDetailLoading', false);
        reject(status);
      }
    });
  },
  async getSessionUnconfData({ commit }) {
    try {
      const { status, data } = await this.$axios.get('/api/2019/unconf');
      if (status === 200 && data && data.data && data.data.length > 0) {
        commit('setSessionUnconfData', data.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  },
  async getTags({ commit }) {
    try {
      const { status, data } = await this.$axios.get('/api/2019/speaker/tags');
      if (status === 200 && data && data.data) {
        commit('setTags', data.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  },
  handleTicketClick() {
    fbq('trackCustom', 'Purchase', {
      ticketName: '會眾票',
      value: 800,
      currency: 'TWD',
    });
  },
  setUtmData({ commit }, utm) {
    commit('setUtm', utm);
    const nowDate = new Date();
    nowDate.setTime(nowDate.getTime() + (60*60*1000));
    const expires = "expires="+ nowDate.toUTCString();
    document.cookie = `mopcon_utm=${utm};${expires}; path=/;`
  },
};

export const getters = {
  homePageReady: state => state.homePageReady,
  eventResults: state => state.eventResults,
  sessionData: state => state.sessionData,
  sessionUnconfData: state => state.sessionUnconfData,
  sessionDetail: state => state.sessionDetail,
  sessionDetailLoading: state => state.sessionDetailLoading,
  seoLangTag: state => state.seoLangTag,
  localeApiPrefix: state => state.localeApiPrefix,
  pageIsLoading: state => state.pageIsLoading,
  buyTicketUrl: state => state.buyTicketUrl,
  locales: state => state.locales,
  locale: state => state.locale,
  tags: state => state.tags,
  utm: state => state.utm,
};
