<script setup lang="ts">
import type { City, WeatherInfoData } from "@/interface";

const cityList = useState<Map<number, City>>("cityList");
const selectedCityId = ref(1853909);

const asyncData = useAsyncData(
  (): Promise<any> => {
    const config = useRuntimeConfig();
    const selectedCity = cityList.value.get(selectedCityId.value) as City;
    const params: {
      lang: string;
      q: string;
      appid: string;
    } =
    {
      lang: "ja",
      q: selectedCity.q,
      appid: config.public.weathermapAppid
    }
    const queryParams = new URLSearchParams(params);
    const urlFull = `${config.public.weatherInfoUrl}?${queryParams}`;
    const response = $fetch(urlFull);
    return response;
  },
  {
    transform: (data: any): WeatherInfoData => {
      const weatherArray = data.weather;
      const weather = weatherArray[0];
      return {
        cityName: data.name,
        description: weather.description
      }
    },
    watch: [selectedCityId]
  }
);
const pending = asyncData.pending;
const data = asyncData.data;
</script>

<template>
  <section>
    <label>
      表示するお天気ポイント:
      <select v-model="selectedCityId">
        <option v-for="[id, city] in cityList" :key="id" :value="id">
          {{ city.name }}
        </option>
      </select>
    </label>
  </section>
  <p v-if="pending">データ取得中</p>
  <section v-else>
    <h2>{{ data?.cityName }}の天気</h2>
    <p>{{ data?.description }}</p>
  </section>
</template>
