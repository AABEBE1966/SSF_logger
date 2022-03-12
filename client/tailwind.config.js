module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      headingOne: ["96px", { letterSpacing: "-1.5px" }],
      headingTwo: ["70px", { letterSpacing: "-0.5px" }],
      headingThree: ["48px", { letterSpacing: "0" }],
      headingFour: ["34px", { letterSpacing: "0.25px" }],
      headingFive: ["24px", { letterSpacing: "0" }],
      headingSix: ["20px", { letterSpacing: "0.15px" }],
      subtitleOne: ["16px", { letterSpacing: "0.15px" }],
      subtitleTwo: ["14px", { letterSpacing: "0.1px" }],
      bodyOne: ["16px", { letterSpacing: "0.5px" }],
      bodyTwo: ["14px", { letterSpacing: "0.25px" }],
      button: ["16px", { letterSpacing: "1.25px" }],
      caption: ["12px", { letterSpacing: "0.4px" }],
      overline: ["12px", { letterSpacing: "0.4px" }],
    },

    extend: {
      backgroundSize: {
        16: "20rem",
        full: "70%",
      },
      screens: {
        larger: "1600px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
