const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-corona-app" : "/",
  outputDir: "docs",
};

// 배포 모드
// publicPath : process.env.NODE_ENV === "production" ? "/vue-corona-app"
// 개발 모드
//publicPath : process.env.NODE_ENV === "production" ? "/vue-corona-app" "/" << /로 지정
