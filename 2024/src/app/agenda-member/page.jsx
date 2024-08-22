import { Fragment } from "react";

const Page = () => {
  return (
    <Fragment>
      <section className="py-16 min-h-96 h-auto flex justify-center items-center">
        <div className="mx-auto w-[min(90%,860px)]">
          <h1 className="font-bold text-5xl text-darkest-green text-center mb-5">
            世界樹的守護者
          </h1>
          <h2 className="font-medium text-2xl text-black underline decoration-1 underline-offset-4 text-center mb-5">
            為您精心打磨 MOPCON 2024 的技術盛宴！
          </h2>
          <p className="text-N800/80 leading-6">
            「世界樹」象徵技術在時間的養分中不斷壯大，並且蓬勃發展。我們的議程委員來自各個技術領域，他們如同世界樹的守護者，精心策劃與安排每一場議程，確保參與者能夠汲取到最豐富的知識與靈感！
          </p>
        </div>
      </section>
      <section className="py-16 w-[min(90%,1204px)] mx-auto">
        <h3 className="block-title mb-[60px]">
          一探 <span className="text-light-green">議程智囊團隊</span>
        </h3>
      </section>
    </Fragment>
  );
};

export default Page;
