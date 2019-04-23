import * as type from '../mutation/mutation-types'
import api from '../../api/getListData'

const state = {
  //  消息数量
  information:30,
  //  文档数量
  document:40,
  //  列表数据
  tableData:[]
}

const mutations = {
  [type.GET_LIST_DATA](state, data) {
    state.tableData = data
  },
}

const actions = {
  getListData:function ({ commit, state }, data) {
     api.getListData(data).then(res => {
       console.log(res.data.data.list)
       commit(type.GET_LIST_DATA, res.data.data.list)
     })
  }
}


export default({
  namespaced:true,
  state,
  mutations,
  actions,
})
