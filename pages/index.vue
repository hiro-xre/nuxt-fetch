<script setup lang="ts">
import type { City, WeatherInfoData } from "@/interface";

const cityList = useState<Map<number, City>>("cityList");
const selectedCityId = ref(1853909);

const asyncData = useAsyncData(
  (): Promise<any> => {
    const selectedCity = cityList.value.get(selectedCityId.value) as City;
    const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
    const params: {
      lang: string;
      q: string;
      appid: string;
    } =
    {
      lang: "ja",
      q: selectedCity.q,
      appid: "23ae64132fd00154b103230dc3ccd13b"
    }
    const queryParams = new URLSearchParams(params);
    const urlFull = `${weatherInfoUrl}?${queryParams}`;
    const response = $fetch(urlFull);
    return response;
  },
  {
    transform: (data: any): WeatherInfoData => {
      const weatherArray = data.weather;
      const weather = weatherArray[0];
      return {
        cityName: `${data.name}の天気`,
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
