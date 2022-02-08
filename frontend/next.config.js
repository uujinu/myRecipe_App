/* eslint-disable consistent-return */
module.exports = {
  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: "/accounts/kakao",
          destination: "http://localhost:8000/accounts/kakao/",
        },
        {
          source: "/accounts/naver",
          destination: "http://localhost:8000/accounts/naver/",
        },
        {
          source: "/accounts/naver/reauthenticate",
          destination: "http://localhost:8000/accounts/naver/reauthenticate/",
        },
      ];
    }
  },
  images: {
    domains: ["recipeaws.s3.amazonaws.com", "file.okdab.com"],
  },
};
