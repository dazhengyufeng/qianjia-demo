<template>
  <div class="container">
    <!-- 头部 -->
    <the-header></the-header>
    <div class="main">
      <div class="contain">
        <!-- 搜索部分 -->
        <div class="search">
          <div class="search-left">
            <div class="search-item">
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
              ></el-date-picker>
            </div>
            <div class="search-item">
              <div class="date">
                <span>姓</span>
                <span>名</span>
              </div>
              <el-input v-model="name" placeholder="请输入内容"></el-input>
            </div>
            <div class="search-item">
              <div class="date">
                <span>内</span>
                <span>容</span>
              </div>
              <el-input v-model="contain" placeholder="请输入内容"></el-input>
            </div>
            <el-button type="success" @click="getdata">查询</el-button>
            <el-button @click="emptySearch">清空</el-button>
          </div>
          <el-button type="success" @click="showDialog">新增</el-button>
        </div>
        <!-- 表格上面部分 -->
        <div class="table-handle">
          <div class="table-handle-left">
            <span style="margin-right:10px">共{{tableData.length}}条</span>
            <span style="margin-right:10px">已选：{{multipleSelection.length}}</span>
            <span style="margin-right:10px">|</span>
            <span>
              <el-button type="danger" plain>批量删除</el-button>
            </span>
          </div>
          <div class="table-handle-right">
            <img src="../assets/loadLogo.png" alt>
            <img src="../assets/documentLogo.png" alt>
            <img src="../assets/downLoadLogo.png" alt>
          </div>
        </div>
        <!-- 表格部分 -->
        <div class="table">
          <el-table
            ref="multipleTable"
            border
            :data="tableData"
            cell-style="padding:0;font-size:12px"
            tooltip-effect="dark"
            :header-cell-style="getRowClass"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column label="序号" width="120">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="birthday" label="时间" width="340"></el-table-column>
            <el-table-column prop="name" label="姓名" width="430" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contain" label="内容" width="750" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <span class="change-btn">
                  <el-button @click="updateRow(scope.row)" type="text" size="small">修改</el-button>
                </span>
                <span class="line-btn">|</span>
                <span class="delect-btn">
                  <el-button type="text" size="small" @click="delectMember(scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页部分 -->
        <div class="footer">
          <el-pagination
            background
            layout="sizes,prev, pager, next,total"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="1000"
            @current-change="getdata"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹窗子组件 -->
    <addMember
      :centerDialogVisible="centerDialogVisible"
      @update="updateVisible"
      @senData="acceptData"
    ></addMember>
  </div>
</template>

<script>
import theHeader from "../components/Header";
import addMember from "../components/AddMember";

export default {
  name: "Enter",
  components: {
    theHeader,
    addMember
  },
  data() {
    return {
      date: "",
      name: "",
      contain: "",
      tableData: [],
      multipleSelection: [],
      centerDialogVisible: false
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //设置表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#eee;height:40px;font-size:12px;color:black；";
      } else {
        return "";
      }
    },
    //修改
    updateRow(row) {
      console.log(row);
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取列表数据
    getdata(val) {
      console.log(val);
      let address = "/data/index?";
      if (this.name !== "") {
        address = address + "name=" + this.name;
      }
      if (this.contain !== "") {
        address = address + "&&contain=" + this.contain;
      }
      this.$axios
        .get(address)
        .then(res => {
          this.tableData = res.data.data.list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //显示弹窗
    showDialog() {
      this.centerDialogVisible = true;
    },
    //更新弹窗状态
    updateVisible(data) {
      this.centerDialogVisible = data;
    },
    //接受弹窗子组件返回的数据
    acceptData(data) {
      console.log(data);
    },
    //删除成员
    delectMember(row) {
      console.log(row);
    },
    //清空筛选条件
    emptySearch() {
      this.date = "";
      this.contain = "";
      this.name = "";
      this.getdata()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: #f8f8f8;
  width: 100%;
}
.main {
  margin-top: 4px;
  background-color: white;
  width: 100%;
}
.contain {
  width: 1840px;
  margin: auto;
}
.search {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-left {
  display: flex;
}
.search-item {
  display: flex;
  margin-right: 40px;
  align-items: center;
}
.date {
  width: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
}
.el-date-editor {
  width: 200px;
  height: 30px;
}
.el-date-editor >>> .el-range__icon {
  line-height: 22px;
}
.el-date-editor >>> .el-range-separator {
  color: #c0c4cc;
  line-height: 22px;
}
.el-input {
  width: 200px;
}
.search-item >>> .el-input__inner {
  width: 200px;
  height: 30px;
}
.search-left .el-button {
  height: 30px;
  line-height: 0px;
}
.search .el-button {
  width: 100px;
  height: 30px;
  line-height: 0px;
}
.line-btn {
  color: #c0c4cc;
}
.change-btn >>> .el-button--text {
  color: orange;
}
.delect-btn >>> .el-button--text {
  color: red;
}
.table {
  cursor: pointer;
}
.table-handle {
  width: 100%;
  height: 50px;
  background-color: #f0f8ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.table-handle-left {
  margin-left: 12px;
}
.table-handle-left .el-button {
  width: 86px;
  height: 32px;
  padding: 0px;
}
.table-handle-right img {
  width: 18px;
  height: 18px;
  margin-right: 20px;
  cursor: pointer;
}
.footer {
  height: 85px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.el-date-editor >>> .el-range__close-icon {
  line-height: 22px;
}
.table >>> .el-table tbody tr:hover > td {
  background-color: #ffffe0;
}
</style>
