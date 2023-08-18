// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import mdx from '@mdx-js/rollup'
// import path from "path"; // use path devDependecy from `@types/node`

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       ...mdx(),
//       enforce: "pre",
//     },
//   ],
//   resolve: {
//     alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
//   },
//   build: {
//     target: "esnext",
//     cssCodeSplit: true, // Extract CSS into separate files
//     base: "./src/*", // Adjust to your actual base path
//     outDir: "./dist/*", // Adjust to your desired output directory

//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"; // use path devDependecy from `@types/node`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  }
  // build: {
  //   target: 'esnext', // Set the build target to esnext
  //   outDir: './dist', // Adjust the output directory as needed
  //   minify: 'esbuild', // Use esbuild for minification
  // },
})
