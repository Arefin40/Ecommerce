import { defineConfig } from "cypress";

export default defineConfig({
   viewportWidth: 1000,
   viewportHeight: 800,

   e2e: {
      watchForFileChanges: false,
      baseUrl: "http://localhost:3000",
      setupNodeEvents() {}
   }
});
