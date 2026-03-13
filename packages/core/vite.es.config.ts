import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { filter, map, delay } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugin";
import terser from "@rollup/plugin-terser";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name,
  );
}
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyles() {
  try {
    readdirSync("./dist/es/theme");
    shell.mv("./dist/es/theme", "./dist");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@TEST": JSON.stringify(isTest),
          "@PROD": JSON.stringify(isProd),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  // resolve: {
  //   alias: {
  //     "toy-elementhh": resolve(__dirname, "./index.ts"),
  //   },
  // },
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "ToyElementhh",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          console.log("names", assetInfo.names);
          if (assetInfo.name === "style.css") {
            console.log("name", assetInfo.name);
            return "index.css";
          }
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks/")) {
            return "hooks";
          }
          if (id.includes("/packages/utils/")) {
            return "utils";
          }
          if (id.includes("vue:export-helper")) {
            return "utils";
          }

          for (const item of getDirectoriesSync("../components")) {
            const path = `/packages/components/${item}`;
            if (id.includes(path)) {
              console.log(`Chunking ${path} component...`);
              return item;
            }
          }

          console.log("not match id:" + id);
        },
      },
    },
  },
});
