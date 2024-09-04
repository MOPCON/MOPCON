import React, { Fragment } from "react";
import Hero from "./_ui/Hero";
import TicketIntroduction from "./_ui/TicketIntroduction";
import StudentTicket from "./_ui/StudentTicket";
import PeripheralGoods from "./_ui/PeripheralGoods";
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
