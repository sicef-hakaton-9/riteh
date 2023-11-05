const percentageColor = (percentage: number) => {
  let hex = "#fdc52b";
  if (percentage >= 90) hex = "#FB4F52";
  if (percentage <= 30) hex = "#2BAF66";
  return hex;
};

export default function WasteMarker({ percentage }: { percentage: number }) {
  return (
    <div>
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="-122.66 -122.66 735.97 735.97"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0">
          <rect
            x="-122.66"
            y="-122.66"
            width="735.97"
            height="735.97"
            rx="367.985"
            fill={percentageColor(percentage)}
            strokeWidth="0"
          ></rect>
        </g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"></path>{" "}
              <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
}
