const Hero = () => {
  return (
    <section className="w-[min(90%,860px)] mx-auto min-h-[calc(100dvh-102px)] tablet:min-h-[calc(100dvh-132px)] flex flex-col gap-5 justify-center items-center py-24">
      <h1 className="font-bold text-5xl text-darkest-green text-center">
        MOPCON x INSPIRATION
      </h1>
      <h2 className="font-medium text-2xl text-black underline decoration-1 underline-offset-4 text-center block">
        Oct.26-27 高雄展覽館 Kaohsiung Exhibition Center
      </h2>
      <div className="mob:w-full tablet:w-10/12 mx-auto">
        <p className="text-N800/80 leading-6 mb-5">
          晶片與算力成為現代科技工業的原物料，資料成為新世代科技的石油，推動 LLM
          與各種 Generative AI 算力發展到現在，證明了 Software-Defined
          將成為各種核心技術的關鍵字。而行動聯網技術搭配了日漸強大的邊緣運算，也讓二十世紀科幻電影場景逐漸在我們眼前實現，在這個萬般皆運算，所有物品都聯網的世代，所有未來的想像越來越寬廣。
        </p>
        <p className="text-N800/80 leading-6">
          無論受到既有人類技術引發的靈感、科幻電影的啟發又或是 Generative AI
          鼓舞的點子，MOPCON 2024 選擇以 Inspiration
          為年度議題，讓我們一起尋找未來行動科技的敲門磚。
        </p>
      </div>
      <div className="flex flex-col mob:flex-row w-full mob:w-fit items-center gap-3 mt-10">
        <a
          href="https://mopcon.kktix.cc/events/mopcon-2024-cfp"
          className="btn btn-primary w-full"
          rel="noopener noreferrer"
          target="_blank"
        >
          前往投稿
        </a>
        <a
          href="https://mopcon.kktix.cc/events/mopcon-2024-cfr"
          className="btn btn-secondary w-full"
          rel="noopener noreferrer"
          target="_blank"
        >
          推薦講者
        </a>
      </div>
    </section>
  );
};

export default Hero;
