import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  // resolve: {
  //   alias: {
  //     // 将包名 toy-elementhh 指向 core 源码
  //     "toy-elementhh": resolve(__dirname, "../core/index.ts"),
  //   },
  // },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
