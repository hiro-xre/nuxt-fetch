<script setup lang="ts">
import type { City } from "@/interface";

const route = useRoute();
const cityList = useState<Map<number, City>>("cityList");

const selectedCity = computed(
  (): City => {
    const idNo = Number(route.params.id);
    return cityList.value.get(idNo) as City;
  }
);

const asyncData = useLazyAsyncData(
  `/WeatherInfo/${route.params.id}`,
  (): Promise<any> => {
    const config = useRuntimeConfig();
    const params: {
      lang: string;
      q: string;
      appid: string;
    } =
    {
      lang: "ja",
      q: selectedCity.value.q,
      appid: config.public.weathermapAppid
    }
    const queryParams = new URLSearchParams(params);
    const urlFull = `${config.public.weatherInfoUrl}?${queryParams}`;
    const response = $fetch(urlFull);
    return response;
  },
  {
    transform: (data: any): string => {
      const weatherArray = data.weather;
      const weather = weatherArray[0];
      return weather.description;
    }
  }
);
const weatherDescription = asyncData.data;
const pending = asyncData.pending;
</script>

<template>
  <p v-if="pending">データ取得中</p>
  <section>
    <h2>{{ selectedCity.name }}の天気</h2>
    <p>{{ weatherDescription }}</p>
  </section>
  <p>リストに<NuxtLink v-bind:to="{name: 'index'}">戻る</NuxtLink></p>
</template>
