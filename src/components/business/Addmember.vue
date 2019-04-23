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
          <el-form-item label="内容" prop="contain">
            <el-select v-model="ruleForm.contain" placeholder="请选择活动区域">
              <el-option label="内容一" value="内容一"></el-option>
              <el-option label="内容二" value="内容二"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
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
import {verifyForm} from '../../assets/js/require.js'
let ruleObj = new verifyForm

export default {
  name: "addMember",
  props: {
    centerDialogVisible: false,
    ruleForm: {
      name: "",
      contain: "",
      birthday: ""
    }
  },
  data() {
    return {
      //表单验证规则
      rules: ruleObj.rules
    };
  },
  methods: {
    //提交表单,把数据传给父组件
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.centerDialogVisible = false;
          this.$emit("senData", this.ruleForm);
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  //监听显示和隐藏
  watch: {
    centerDialogVisible() {
      this.$emit("update", this.centerDialogVisible);
    }
  }
};
</script>

<style scoped>
.main {
  width: 275px;
  height: 125px;
  margin: auto;
}
.main >>> .el-form-item__label {
  text-align: left;
}
.main >>> .el-input__inner {
  height: 26px;
  width: 225px;
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
.main >>> .el-form-item__content {
  margin-left: 0px !important;
}
.main >>> .el-form-item {
  display: flex;
  align-items: center;
}
.main >>> .el-form-item {
  line-height: 0px;
}
.main >>> .el-form-item__label {
  padding: 0;
  line-height: 22px;
}
.main >>> .el-date-editor .el-range__close-icon {
  line-height: 20px;
}
.main >>> .el-form-item__error {
  top: 73%;
}

</style>
