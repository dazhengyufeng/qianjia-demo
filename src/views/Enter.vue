<template>
  <div class="container">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 主体部分 -->
    <div class="main">
      <div class="contain">
        <!-- 搜索组件 -->
        <Search @searchData="searchData"
                @showDialog='showDialog'></Search>
        <!-- 表格组件 -->
        <Table :tableData="tableData"
               :tableHeader="tableHeader"
               @batchDelect="batchDelect"
               @updateRow="updateRow"
               @delectMember="delectMember"></Table>
        <!-- 分页部分 -->
        <div class="footer">
          <el-pagination
            background
            layout="sizes,prev, pager, next,total"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="1000"
            :page-count="10"
            @current-change="setPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="centerDialogVisible" width="30%">
      <addMember :ruleForm="rowData"
                @sendData="acceptData"
                @cancel="cancel"></addMember>
    </el-dialog>
    <!-- 新建弹窗 -->
    <el-dialog title="新建" :visible.sync="newDialogVisible" width="30%">
      <addMember @sendData="acceptData"
                @cancel="cancel"></addMember>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Enter",
  computed: {
    ...mapState("enter", [
      //  表格数据
      "tableData",
      //  表头数据
      "tableHeader"
    ])
  },
  data() {
    return {
      //  控制弹窗显示和隐藏的属性
      centerDialogVisible: false,
      //  控制新建弹窗的控制和隐藏
      newDialogVisible: false,
      // 传给弹窗组件的表格的某行的数据
      rowData: {},
      //  要删除的成员
      theDelectMember: {},
      // 查询条件
      queryCondition: {
        //  时间
        date: "",
        //  姓名
        name: "",
        //  内容
        contain: "",
        //  一页的条数
        pageSize: 25,
        //  页码
        page: 0
      }
    };
  },
  mounted() {
    // 获取表格数据
    this.getListData();
    //  获取表头数据
    this.getListHeader();
  },
  methods: {
    ...mapActions("enter", [
      //  获取表格数据的函数
      "getListData",
      //  表头数据
      "getListHeader"
    ]),
    //  修改事件
    updateRow(row) {
      this.rowData = row;
      this.centerDialogVisible = true;
    },
    //  跳页
    setPage(val) {
      this.queryCondition.page = val;
      this.getListData(this.queryCondition);
    },
    //  显示弹窗
    showDialog() {
       //  置空传给子组件的，表格的行的数据
      this.rowData = {};
      this.centerDialogVisible = true;
    },
    // 取消
    cancel() {
      this.centerDialogVisible = false;
      this.newDialogVisible = false;
    },
    //  接受弹窗子组件返回的数据
    acceptData(data) {
      //  为查询数据赋值
      this.queryCondition = Object.assign(this.queryCondition, data);
      //  获取列表数据
      this.getListData(this.queryCondition);
      this.centerDialogVisible = false;
      this.newDialogVisible = false;
    },
    //  删除成员
    delectMember(row) {
      this.theDelectMember = row;
      this.$confirm(`是否要将成员：${row.name} 删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let rowId = this.theDelectMember.id
          this.getListData(rowId);
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
    //  搜索按钮的子组件触发的父组件的事件
    searchData(searchData) {
      //  子组件的值赋给父组件
      this.queryCondition = Object.assign(this.queryCondition, searchData);
      this.getListData(this.queryCondition);
    },
    //  批量删除
    batchDelect(data) {
      this.getListData(data);
    }
  }
};
</script>

