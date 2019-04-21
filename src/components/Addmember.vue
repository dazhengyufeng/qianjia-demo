<template>
  <div class="Dialog">
    <el-dialog title="新增" :visible.sync="centerDialogVisible" width="30%">
      <div class="main">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="人员" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="内容一" value="shanghai"></el-option>
              <el-option label="内容二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" required prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              type="daterange"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addMember",
  props: {
    centerDialogVisible: false
  },
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur" }],
        region: [{ required: true, trigger: "change" }],
        date: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.centerDialogVisible = false;
          this.$emit("senData", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    centerDialogVisible() {
      this.$emit("update", this.centerDialogVisible);
    }
  }
};
</script>

<style scoped>
.main {
  width: 250px;
  height: 125px;
  margin: auto;
}
.main >>> .el-form-item__label {
  text-align: left;
}
.main >>> .el-input__inner {
  height: 26px;
  width: 200px;
}
.main >>> .el-form-item {
  margin: 0;
}
.el-date-editor >>> .el-range__icon {
  line-height: 0px;
}
.el-date-editor >>> .el-range-separator {
  line-height: 20px;
  color: #c0c4cc;
}
.Dialog >>> .el-dialog__footer {
  text-align: center;
}
</style>
