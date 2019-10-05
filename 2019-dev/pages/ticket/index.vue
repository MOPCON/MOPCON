<template>
    <div class="ticket">
        <div class="ticket__banner"></div>
        <section class="ticket__desc">
            <h1 class="title ticket__desc__title">
                <span class="span-s icon-brackets">{{$t('pages.ticket.title[1]')}}</span>
                <span class="color-primary">{{$t('pages.ticket.title[2]')}}</span>
                ; }</h1>
            <p class="ticket__desc__text">{{$t('pages.ticket.desc')}}</p>
        </section>

        <section class="ticket__kind">
            <h2 class="title">
                <span>{ </span><span class="color-secondary">{{$t('pages.ticket.ticketType[1]')}}</span><span>{{$t('pages.ticket.ticketType[2]')}} ; }</span>
            </h2>
            <div class="ticket__kind__block ticket__kind__block--left">
                <CardTicket v-for="ticket in ticketSecondary" :key="ticket.id" v-bind="ticket" @onTicketClick="handleTicketClick" />
            </div>
            <div class="ticket__kind__block ticket__kind__block--right">
                <CardTicket v-for="ticket in ticketPrimary" :key="ticket.id" v-bind="ticket" @onTicketClick="handleTicketClick" />
            </div>
        </section>

        <section class="ticket__studentKind">
            <h2 class="title">
                <span>{ {{$t('pages.ticket.areYouStudent[1]')}}</span><span class="color-third">{{$t('pages.ticket.areYouStudent[2]')}}</span><span>{{$t('pages.ticket.areYouStudent[3]')}} ; }</span>
            </h2>
            <p class="text">{{$t('pages.ticket.text')}}</p>
            <div class="ticket__kind__block">
                <CardTicket v-for="ticket in ticketThird" :key="ticket.id" v-bind="ticket" @onTicketClick="handleTicketClick" />
            </div>
            <ul class="ticket__studentKind__remarks">
                <li class="ticket__studentKind__remark">*{{$t('pages.ticket.student.remarks[1]')}}</li>
                <li class="ticket__studentKind__remark">*{{$t('pages.ticket.student.remarks[2]')}}</li>
            </ul>
        </section>

        <!-- 周邊商品 -->
        <section class="ticket__product">
            <h2 class="title">
                <span>{ 想要更多周邊商品嗎？</span><span class="color-primary">紀念品預購開跑囉！</span><span>; }</span>
            </h2>
            <p class="text">我們用最真誠的心，親自設計這份禮物送給最珍貴的 VVIP，這此也提供最佛心的價格，讓每個會眾都能購買作收藏！</p>
            <div class="ticket__kind__block">
                <CardTicket v-for="product in productData" :key="product.id" v-bind="product" />
            </div>
        </section>

        <SectionApp />
    </div>
</template>

<script>
import SectionApp from '~/components/SectionApp';
import CardTicket from '~/components/CardTicket';

export default {
    name: 'ticket',
    components: {
        SectionApp,
        CardTicket,
    },
    data() {
        return {
            ticketData: [
                {
                    title: '老鳥票',
                    id: 0,
                    status: 1, // 0 => 敬請期待, 1 => 顯示價格, 2 => 已完售
                    count: 0, // 限量張數
                    price: 700, // 票價
                    beEngaged: false,
                    type: 'secondary', //三種風格 primary / secondary / third
                    lists: [
                        // 項目說明
                        '兩日議程',
                        '下午茶點心',
                    ],
                    link: 'https://kktix.com/events/2019registernormal/registrations/new',
                },
                {
                    title: '會眾票',
                    id: 1,
                    status: 1,
                    count: 700,
                    price: 800,
                    beEngaged: false,
                    type: 'secondary',
                    lists: ['兩日議程', '下午茶點心'],
                    link: 'https://kktix.com/events/2019registernormal/registrations/new',
                },
                {
                    title: '相揪團購票',
                    id: 2,
                    status: 1,
                    count: 300,
                    price: 700,
                    beEngaged: false,
                    type: 'secondary',
                    lists: ['兩日議程', '下午茶點心'],
                    desc:
                        '適用 5 人企業團購<br>超過 15 人（ 16 人以上）請來信詳談',
                    link: ' https://kktix.com/events/2019registernormal/registrations/new',
                },
                {
                    title: 'Beengaged 醞釀之夜',
                    id: 3,
                    status: 2,
                    count: 30,
                    price: 800,
                    beEngaged: false,
                    type: 'secondary',
                    desc: '會眾票＆老鳥票可在 KKTIX 加購 10/19 晚餐聚會通行證',
                    lists: [],
                    link: 'https://lihi1.com/RZ8LF',
                },
                {
                    title: '豪華獨享票',
                    id: 4,
                    status: 1,
                    count: 20,
                    price: 2600,
                    beEngaged: false,
                    type: 'primary',
                    lists: [
                        '兩日議程',
                        '精緻午餐、下午茶點心',
                        '紀念 T',
                        '快速通關',
                        'Beengaged 醞釀之夜',
                    ],
                    link: 'https://kktix.com/events/2019registervip/registrations/new',
                },
                {
                    title: '尊爵不凡票',
                    id: 5,
                    status: 1,
                    count: 10,
                    price: 3200,
                    beEngaged: false,
                    type: 'primary',
                    lists: [
                        '兩日議程',
                        '精緻午餐、下午茶點心',
                        '紀念 T',
                        '快速通關',
                        'Beengaged 醞釀之夜',
                        'MOPCON 2019 獨家紀念品',
                    ],
                    link: 'https://kktix.com/events/2019registervip/registrations/new',
                },

                {
                    title: '學生票',
                    id: 6,
                    status: 2,
                    count: 130,
                    price: 100,
                    beEngaged: false,
                    type: 'third',
                    lists: ['兩日議程', '下午茶點心'],
                    link: 'https://mopcon.kktix.cc/events/2019registerstudent',
                },
                {
                    title: '菁英學生票',
                    id: 7,
                    status: 2,
                    count: 20,
                    price: 300,
                    beEngaged: false,
                    type: 'third',
                    lists: ['兩日議程', '下午茶點心', '醞釀之夜通行證'],
                    link: 'https://mopcon.kktix.cc/events/2019registerstudent',
                },
            ],
            productData: [
                {
                    title: '肝鐵人紀念 T-shirt',
                    id: 0,
                    status: 3, // 0 => 敬請期待, 1 => 顯示價格, 2 => 已完售, 3 => 開放預購, 4 => 現場販售
                    price: 0,
                    beEngaged: false,
                    image: 't-shirt.jpg',
                    type: 'product', // 四種風格 primary / secondary / third / product
                    link: 'https://lihi1.com/VEVR8',
                    text: '預購時間 9/25 21:00 - 10/6 23:50',
                },
                {
                    title: '帆布手提後背包',
                    id: 1,
                    status: 3,
                    price: 0,
                    beEngaged: false,
                    image: 'back-backpack.jpg',
                    type: 'product',
                    link: 'https://lihi1.com/VEVR8',
                    text: '預購時間 9/25 21:00 - 10/6 23:50',
                },
                {
                    title: '潛水布飲料杯提袋',
                    id: 2,
                    status: 4,
                    price: 0,
                    beEngaged: false,
                    image: 'cup-bag.jpg',
                    type: 'product',
                    link: '#',
                },
                {
                    title: 'MOPCON 刺繡貼紙',
                    id: 3,
                    status: 4,
                    price: 0,
                    beEngaged: false,
                    image: 'sticker.jpg',
                    type: 'product',
                    link: '#',
                },
            ],
        };
    },
    computed: {
        // Secondary 樣式票卡, 老鳥票、會眾票、Beengaged 醞釀之夜
        ticketSecondary() {
            return this.ticketData.filter(
                ticket => ticket.type === 'secondary'
            );
        },
        // Primary 樣式票卡, VIP票、VVIP票
        ticketPrimary() {
            return this.ticketData.filter(ticket => ticket.type === 'primary');
        },
        // Third 樣式票卡, 學生票、菁英學生票
        ticketThird() {
            return this.ticketData.filter(ticket => ticket.type === 'third');
        },
    },
    methods: {
        handleTicketClick(ticketName, ticketPrice) {
            fbq('trackCustom', 'Purchase', {
                ticketName: ticketName,
                value: ticketPrice,
                currency: 'TWD',
            });
        },
    },
    beforeRouteEnter: (to, from, next) => {
        if (!process.env.routeTicket) return next('/');
        next();
    },
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
