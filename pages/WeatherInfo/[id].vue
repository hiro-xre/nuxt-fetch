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
const weatherDescription = ref("");
</script>

<template>
  <section>
    <h2>{{ selectedCity.name }}の天気</h2>
    <p>{{ weatherDescription }}</p>
  </section>
  <p>リストに<NuxtLink v-bind:to="{name: 'index'}">戻る</NuxtLink></p>
</template>
