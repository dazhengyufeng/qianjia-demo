export class verifyForm {
  constructor() {
    this.rules = {
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      contdate: [{ required: true, message: "请选择日期", trigger: "blur" }]
    }
  }
}
