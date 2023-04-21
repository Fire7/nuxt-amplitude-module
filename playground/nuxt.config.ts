export default defineNuxtConfig({
  modules: ['../src/module'],
  amplitude: {
    client: true,
    server: true,
  },
})
