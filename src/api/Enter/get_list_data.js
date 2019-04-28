import axios from "@/assets/js/axios.js"

export default {
  //  获取列表数据
  getListData: function (page,size,data) {
    return axios.post(`/api/list/tabel/get/list/${page}/${size}`,data)
  },
  //  获取表格头部
  getListHeader: function () {
    return axios.get(`/api/list/tabel/head`)
  },
  //  修改表格数据
  updataTableData:function(data) {
    return axios.post(`/api/list/tabel/change/item`,data)
  },
  //  添加表格数据
  addTableData:function(data){
    return axios.post(`/api/list/tabel/save/content`,data)
  },
  //  删除表格数据
  delectTableData:function(data){
    return axios.post(`/api/list/tabel/delete/items`,data)
  }
}
