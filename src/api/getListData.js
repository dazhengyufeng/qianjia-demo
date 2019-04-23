import axios from "@/assets/js/axios.js"

export default {
  getListData: function (data) {
    return axios.get(data)
  },
}
