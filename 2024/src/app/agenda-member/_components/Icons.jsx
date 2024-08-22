const FaceBook = ({ className }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28 14C28 6.272 21.728 0 14 0C6.272 0 0 6.272 0 14C0 20.776 4.816 26.418 11.2 27.72V18.2H8.4V14H11.2V10.5C11.2 7.798 13.398 5.6 16.1 5.6H19.6V9.8H16.8C16.03 9.8 15.4 10.43 15.4 11.2V14H19.6V18.2H15.4V27.93C22.47 27.23 28 21.266 28 14Z"
        fill="#4C766D"
      />
    </svg>
  );
};

const Github = ({ className }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2383_3980)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9989 0.344727C6.26893 0.344727 0 6.61281 0 14.3454C0 20.5301 4.01112 25.7779 9.5744 27.63C10.2749 27.7582 10.5301 27.3258 10.5301 26.9545C10.5301 26.6219 10.5179 25.7418 10.5106 24.5738C6.61641 25.4195 5.79478 22.6968 5.79478 22.6968C5.15792 21.0793 4.24 20.6487 4.24 20.6487C2.96886 19.7806 4.33624 19.7978 4.33624 19.7978C5.74145 19.8967 6.48059 21.2408 6.48059 21.2408C7.72939 23.38 9.75771 22.7621 10.5553 22.4037C10.6825 21.4995 11.0443 20.8824 11.444 20.5326C8.33532 20.1785 5.06677 18.9779 5.06677 13.6131C5.06677 12.0841 5.61255 10.8353 6.50809 9.85641C6.36362 9.5023 5.88326 8.079 6.64574 6.15123C6.64574 6.15123 7.82061 5.77482 10.4953 7.58572C11.6117 7.27544 12.8098 7.12074 14.0001 7.11472C15.1896 7.11959 16.3869 7.27551 17.505 7.58572C20.1779 5.77482 21.3511 6.15123 21.3511 6.15123C22.1152 8.079 21.6347 9.5023 21.4912 9.85641C22.3885 10.8353 22.9299 12.0841 22.9299 13.6131C22.9299 18.9916 19.6562 20.1751 16.5381 20.5214C17.04 20.9537 17.4878 21.8081 17.4878 23.1145C17.4878 24.9855 17.4708 26.4955 17.4708 26.9545C17.4708 27.3292 17.7234 27.765 18.4333 27.6283C23.9923 25.7728 28 20.5292 28 14.3454C28 6.61281 21.7315 0.344727 13.9989 0.344727Z"
          fill="#4C766D"
        />
      </g>
      <defs>
        <clipPath id="clip0_2383_3980">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { FaceBook, Github };
