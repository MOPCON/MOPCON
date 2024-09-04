const DaySwitchButton = () => {
  return (
    <div className="flex text-xl font-medium w-fit mx-auto items-center justify-center over rounded-full bg-[#E8EFFA] text-N800 h-[70px]">
      <button
        className={`flex p-5 h-full items-center justify-center border-2 border-r border-[#90A4B9] rounded-l-full bg-[#90A4B9] text-white`}
      >
        10/26（六）
      </button>
      <button className="flex p-5 h-full items-center justify-center border-2 border-l border-[#90A4B9] rounded-r-full">
        10/26（日）
      </button>
    </div>
  );
};

export default DaySwitchButton;
