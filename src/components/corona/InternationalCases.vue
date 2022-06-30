<template>
  <div>
    <h2>국제현황 22</h2>
    <div class="buttons">
      <el-radio-group v-model="displayType" size="small">
        <el-radio-button
          v-for="(item, index) in displayTypes"
          :key="index"
          :label="index"
          >{{ item.alias }}
        </el-radio-button>
      </el-radio-group>
      <input type="text" v-model="keyword" />
    </div>
    <ul class="list">
      <li
        class="country"
        v-for="country in sortedCountries"
        :key="country.CountryCode"
      >
        <img
          :src="require(`@/assets/flags/${country.CountryCode}.svg`)"
          :alt="country.Country"
        />
        <!-- http:://github.com/purecatamphetamine/country-flag-icons -->
        <span class="name">{{ country.Country }}</span>
        <span class="cases"
          >{{ country.NewConfirmed }}/{{ country.TotalConfirmed }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import coronaMixin from "@/mixins/coronaMixin";
export default {
  name: "InternationalCases",
  mixins: [coronaMixin],
  data() {
    return {
      keyword: "",
      countries: [],
      displayType: 0,
      displayTypes: [
        { alias: "Daily Worst", key: "NewConfirmed", compare: -1 },
        { alias: "Daily Best", key: "NewConfirmed", compare: 1 },
        { alias: "Total Worst", key: "TotalConfirmed", compare: -1 },
        { alias: "Total Best", key: "TotalConfirmed", compare: -1 },
      ],
    };
  },
  computed: {
    // eslint-disable-next-line
    sortedCountries() {
      // sort
      // 문자열일 땐 데소문자 순서, 숫자일 땐 더 큰 순서 를 비교할 수 있음
      //   array.sort((a, b) => {
      //     a > b ? 1 : -1;
      //   });
      // 오브젝트라면 프로퍼티를 비교해주면 됌
      //   array.sort((a, b) => {
      //     a.key > b.key ? 1 : -1;
      //   });

      const { compare, key } = this.displayTypes[this.displayType];
      let list = [...this.countries]; // 원본 데이터를 오염시키지 않기 위하여 사용

      // filter
      list = list.filter((li) =>
        li.Country.toUpperCase().includes(this.keyword.toUpperCase())
      );

      //sort
      return list.sort((a, b) => (a[key] > b[key] ? compare : -compare));
    },
  },
  mounted() {
    this.fetchCases();
  },
  methods: {
    async fetchCases() {
      const url = "https://api.covid19api.com/summary";
      const summary = await this.fetchData("get", url); // 데이터를 동일하게 송출
      //   const url = "https://api.covid19api.com/summary";
      //   const res = await axios.get(url);
      // params : 데이터를 보낼 때 추가적으로 함께 보낼 수 있는 부가적인 쿼리, 데이터들을 설정할 수 있는 세번째 옵션
      console.log(summary, "res");
      this.countries = summary.Countries;
    },
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
}
.list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5em;
  margin-top: 1em;
}
.country {
  border: 1px solid #efefef;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em;
  font-size: 12px;
}
.country img {
  max-width: 1em;
  margin-right: 1em;
}
.country .name {
  margin-right: 1em;
  font-weight: bold;
}
</style>
