export default function Button({ children, state }) {
  return (
    <button
      className={` text-button   rounded  px-4 py-3 font-semibold uppercase  ${
        state === "basic"
          ? "bg-while border-2 border-red-500 text-black shadow"
          : "bg-[#E60023] text-white  shadow-2xl"
      } `}
    >
      {children}
    </button>
  );
}
