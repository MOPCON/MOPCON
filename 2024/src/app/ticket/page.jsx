import React, { Fragment } from "react";
import Hero from "./_ui/Hero";
import TicketIntroduction from "./_ui/TicketIntroduction";
import StudentTicket from "./_ui/StudentTicket";
import PeripheralGoods from "./_ui/PeripheralGoods";

export const metadata = {
  title: "票種介紹",
  description:
    "不管你是新手入村，還是專家級高手，都歡迎共同參與每天精彩的議程。我們針對不同族群需求，開出各種票種，就是希望每個人都可以找到最適合自己的方案，年輕學生可以選擇以划算價格來現場見到心中的大神，或你是超級VIP，就可以享有更多好康。",
};

const Page = () => {
  return (
    <Fragment>
      <Hero />
      <TicketIntroduction />
      <StudentTicket />
      <PeripheralGoods />
    </Fragment>
  );
};

export default Page;
