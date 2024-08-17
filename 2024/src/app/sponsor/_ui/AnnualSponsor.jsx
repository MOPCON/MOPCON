const AnnualSponsor = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h3 className="font-bold tablet:text-[31px] text-lg text-black mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8">
        {children}
      </div>
    </div>
  );
};

export default AnnualSponsor;
