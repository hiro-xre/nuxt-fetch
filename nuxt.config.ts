// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      weatherInfoUrl: "https://api.openweathermap.org/data/2.5/weather",
      weathermapAppid: ""
    }
  }
})
