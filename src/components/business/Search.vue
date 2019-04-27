<template>
  <div class="contain">
    <!-- 搜索部分 -->
    <div class="search">
      <div class="search-left">
        <div class="search-item" id="datePicker">
          <div class="date">
            <span>日</span>
            <span>期</span>
          </div>
          <el-date-picker
            v-model="date"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            type="daterange"
            size="mini"
          ></el-date-picker>
        </div>
        <div class="search-item">
          <div class="date">
            <span>姓</span>
            <span>名</span>
          </div>
          <el-input v-model="name" placeholder="请输入内容" size="mini"></el-input>
        </div>
        <div class="search-item">
          <div class="date">
            <span>内</span>
            <span>容</span>
          </div>
          <el-input v-model="contain" placeholder="请输入内容" size="mini"></el-input>
        </div>
        <el-button type="success" @click="searchData">查询</el-button>
        <el-button @click="emptyData">清空</el-button>
      </div>
      <el-button type="success" @click="showDialog">新增</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      //  时间
      date: "",
      //  姓名
      name: "",
      //  内容
      contain: ""
    };
  },
  methods: {
    //  搜索按钮事件
    searchData() {
      let secrchData = {
        date: this.date,
        name: this.name,
        contain: this.contain
      };
      this.$emit("searchData", secrchData);
    },
    //  清空按钮事件
    emptyData() {
      this.date = "";
      this.name = "";
      this.contain = "";
      let secrchData = {
        date: this.date,
        name: this.name,
        contain: this.contain
      };
      this.$emit("searchData", secrchData);
    },
    //  新增按钮事件
    showDialog() {
      this.$emit("showDialog");
    }
  }
};
</script>
