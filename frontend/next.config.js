module.exports = {
  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: "/accounts/kakao", destination: "http://localhost:8000/accounts/kakao/",
        },
        {
          source: "/accounts/naver", destination: "http://localhost:8000/accounts/naver/",
        },
      ];
    }
  },
  images: {
    domains: ["recipeaws.s3.amazonaws.com"],
  },
};