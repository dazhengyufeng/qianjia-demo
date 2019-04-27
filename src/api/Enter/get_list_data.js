import axios from "@/assets/js/axios.js"

export default {
  getListData: function (data) {
    return axios.post(`/data/index`, data)
  },
  getListHeader: function () {
    return axios.get(`/header`)
  },
}
