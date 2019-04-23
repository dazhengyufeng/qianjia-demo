<template>
  <div class="container">
    <!-- 头部 -->
    <Header></Header>
    <div class="main">
      <div class="contain">
        <div class="search">
          <Search @searchData="searchData" @emptySearch="emptySearch"></Search>
          <el-button type="success" @click="showDialog">新增</el-button>
        </div>
        <!-- 表格上面部分 -->
        <div class="table-handle">
          <div class="table-handle-left">
            <!-- <span style="margin-right:10px">共{{tableData.length}}条</span> -->
            <span style="margin-right:10px">已选：{{multipleSelection.length}}</span>
            <span style="margin-right:10px">|</span>
            <span>
              <el-button type="danger" plain @click="batchDelect" :disabled="canDelect">批量删除</el-button>
            </span>
          </div>
          <div class="table-handle-right">
            <img src="../assets/img/loadLogo.png" alt>
            <img src="../assets/img/documentLogo.png" alt>
            <img src="../assets/img/downLoadLogo.png" alt>
          </div>
        </div>
        <!-- 表格部分 -->
        <div class="table">
          <el-table
            ref="multipleTable"
            border
            highlight-current-row
            :data="tableData"
            tooltip-effect="dark"
            :cell-style="cellStyle"
            :header-cell-style="getRowClass"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @row-click="clickRow"
          >
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column label="序号" width="120">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="birthday[0]" label="时间" width="340"></el-table-column>
            <el-table-column prop="name" label="姓名" width="430" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contain" label="内容" width="750" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="139">
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
            :page-count="10"
            @current-change="getdata"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹窗子组件 -->
    <addMember
      :centerDialogVisible="centerDialogVisible"
      :ruleForm="rowData"
      @update="updateVisible"
      @senData="acceptData"
    ></addMember>
  </div>
</template>

<script>
import { mapState , mapActions} from 'vuex'

export default {
  name: "Enter",
  computed: {
    ...mapState('store',[
    //  表格数据
    "tableData"
    ])
  },
  data() {
    return {
      //  时间
      date: "",
      //  姓名
      name: "",
      //  内容
      contain: "",
      //  选中的行的数据
      multipleSelection: [],
      //  控制弹窗显示和隐藏的属性
      centerDialogVisible: false,
      // 传给弹窗组件的表格的某行的数据
      rowData: {},
      //  控制批量删除按钮能不能操作的属性
      canDelect: true
    };
  },
  mounted() {
    // 获取表格数据
    this.getdata();
  },
  methods: {
      ...mapActions('store', [
    //  获取表格数据的函数
    "getListData"
    ]),
    //  修改某一列的样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 5) {
        //指定列号
        return "padding-left:10px!important";
      } else if (columnIndex === 5) {
        return "text-align: center!important";
      }
    },
    //  设置表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return "text-align: center!important;background:#eee;";
      }
      if (rowIndex === 0) {
        return "padding-left:10px!important;background:#eee;height:40px;font-size:12px;color:black；";
      } else {
        return "";
      }
    },
    //  修改按钮
    updateRow(row) {
      this.rowData = row;
      this.centerDialogVisible = true;
    },
    //  全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.canDelect = false;
      } else {
        this.canDelect = true;
      }
    },
    //  获取列表数据
    getdata(val) {
      let address = "/data/index?";
      if (this.name !== "") {
        address = address + "name=" + this.name;
      }
      if (this.contain !== "") {
        address = address + "&&contain=" + this.contain;
      }
      this.getListData(address)
    },
    //  显示弹窗
    showDialog() {
      this.rowData = {};
      this.centerDialogVisible = true;
    },
    //  更新弹窗状态
    updateVisible(data) {
      this.centerDialogVisible = data;
    },
    //  接受弹窗子组件返回的数据
    acceptData(data) {
      console.log(data);
      this.getdata();
    },
    //  删除成员
    delectMember(row) {
      console.log(row);
      this.$confirm(`是否要将成员：${row.name} 删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getdata();
          this.$message({
            type: "success",
            message: "删除成员成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除成员"
          });
        });
    },
    //  批量删除
    batchDelect() {
      this.$confirm("是否确认进行批量删除操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getdata();
          this.canDelect = true;
          this.$message({
            type: "success",
            message: "批量删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量删除"
          });
        });
    },
    //  清空筛选条件
    emptySearch() {
      this.date = "";
      this.contain = "";
      this.name = "";
      this.getdata();
    },
    //  搜索按钮的，子组件触发的父组件的事件
    searchData(searchData) {
      console.log(searchData);
      this.date = searchData.date;
      this.name = searchData.name;
      this.contain = searchData.contain;
      this.getdata();
    },
    //  点击某行时，复选按钮被选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain {
  width: 1840px;
  margin: auto;
}
.container {
  background-color: #f8f8f8;
  width: 100%;
}
.search {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search .el-button {
  width: 100px;
  height: 30px;
  line-height: 0px;
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
.line-btn {
  color: #c0c4cc;
  margin: 0 5px 0 5px;
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
.main >>> .el-table__body tr:hover > td {
  background-color: #ffffe0 !important;
}

.main >>> .el-table__body tr.current-row > td {
  background-color: #ffffe0 !important;
}
.table >>> .el-table__body tr.current-row > td {
  background-color: #afeeee !important;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
.table >>> .el-table td,
.el-table th {
  padding: 0px;
  font-size: 12px;
}
.table >>> .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0px;
}

</style>

