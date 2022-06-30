import axios from "axios";
const coronaMixin = {
  methods: {
    async fetchData(method, url, params) {
      const res = await axios[method](url, { params });
      return res.data;
      // params: { page: 1, size: 20, postId: 3 }
      // 오브젝트 형태로 파라미터 표기 & 그대로 대입. 동일값이기 때문에 prams : prams를 prams로 표기
    },
  },
};

export default coronaMixin;
