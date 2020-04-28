import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';


class IdentityAuthentication extends React.Component<{ history: any }> {
  public state = {
    id:"",
    applicant: "",
    phone: "",
    company: "",
    roleType: "",
    park_id:"",
    // 公司选择
    roleTypeBox: "hide",
    roleTypeUL: [],
    roleTypeIndexof: 0,
    role_id: "",
    role_id_in: "",
    role_name: "",
    role_name_in: "",
    //照片
    files: [],
    multiple: false,
    filesImg: [],
    pic_amount: "",
    pic1: "",
  }

  public constructor(props) {
    super(props);

    this.setRoleTypeUL = this.setRoleTypeUL.bind(this);
    this.setImg = this.setImg.bind(this);
  }

  public componentDidMount() {
    this.dataService.getRoleType(this.setRoleTypeUL);
    this.state.applicant = localStorage.getItem("userName");
    this.state.phone = localStorage.getItem("phone");
    //this.state.company = localStorage.getItem("applicant");
    this.state.company = "永拓科技公司";
    this.state.park_id = localStorage.getItem("park_id");

  }

  public dataService: DataService = new DataService();

  //  返回
  public goBack() {
    this.props.history.goBack()
  }

  public applicantChange(event) {
    this.setState({
      applicant: event.target.value
    })
  }

  public phoneChange(event) {
    this.setState({
      phone: event.target.value
    })
  }

  public companyChange(event) {
    this.setState({
      company: event.target.value
    })
  }

  //角色类型选择
  public showRoleTypeBox() {
    console.log(111111)
    this.setState({
      roleTypeBox:"show rollSelectCauseBox",
    })
  }

  // 写入角色类型
  public setRoleTypeUL(data) {
    this.setState({
      roleTypeUL: data.response,
      role_id: data.response[0].id,
      role_name: data.response[0].name,
    })
  }

  //选中角色类型
  inRoleTypeList(i, id, name) {
    this.setState({
      role_id_in: id,
      role_name_in: name,
      roleTypeIndexof: i,
    })
  }

  // 取消角色类型
  hideRoleTypeBox() {
    this.setState({
      roleTypeBox: "hide",
    })
  }

  // 确认角色类型
  getRoleTypeBox() {
    this.setState({
      roleTypeBox: "hide",
      role_id: this.state.role_id_in,
      role_name: this.state.role_name_in,
    })
  }

  // 修改img
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      filesImg: files,
      files,
    });
    console.log("11111", this.state.files)
    console.log("22222", this.state.filesImg)
      let obj = [{
        "imgname": "headimg",
        "imgbase64": this.state.filesImg[0].url,
      }]
    this.dataService.uploadImgOss(this.setImg, obj);
  }

  // 修改提交img数据
  setImg(data) {
    //console.log("AAAA", data);
   // console.log("BBB", data[0]);
    this.setState({
      pic1: data[0],
    })
   // console.log("headimg", this.state)
  }

  sumbit() {
    console.log(this.state);

    let obj = {
      //"id": this.state.id,
      "id": 1,
      "name": this.state.applicant,
      "company_name": this.state.company,
      "phone": this.state.phone,
      "park_id": this.state.park_id,
      "role_id": this.state.role_id,
      "pic_amount": "1",
      "pic1": this.state.pic1,
    }
    if (this.state.applicant == "") {
      alert("请填写姓名")
    } else if (this.state.phone == "") {
      alert("请填写联系电话")
    } else if (this.state.company == "") {
      alert("请填写企业名称")
    } else if (this.state.role_id == "") {
      alert("请选择角色类型")
    } else {
      this.dataService.userAuthentication(this.sumbitSucceed, obj);
    }
    

    
  }

  sumbitSucceed(data) {
    alert(data);
  }


  public render() {
    //<i className="iconfont identityBottonIcon" >&#xe821;</i>
    return (
      <div className="modification-authentication">
        <div className="personal-center-tag" style={{ "border-bottom": "0rem" }}>
          <div style={{ paddingLeft: "30px", float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/right.png" style={{ transform: "rotate(180deg)", marginBottom: "10px" }} />
            <span style={{ color: "#6C6C6C" }}>身份认证</span>
          </div>
        </div>
        <form >
          <div className="identityTop">
            <p>
              <span className="redStar">*</span>  申请人
                 <input type="text" value={this.state.applicant} placeholder="请输入您的姓名" style={{ "border": "none", "margin-left": "8rem" }}
                onChange={this.applicantChange.bind(this)} />
            </p>
            <p>
              <span className="redStar">*</span>  联系号码
                 <input type="number" value={this.state.phone} placeholder="请输入您的联系号码" style={{ "border": "none", "margin-left": "5rem" }}
                onChange={this.phoneChange.bind(this)} />
            </p>
            <p >
              <span className="redStar">*</span>  企业名称
                 <input type="text" value={this.state.company} placeholder="请输入您的企业名称" style={{ "border": "none", "margin-left": "5rem" }}
                onChange={this.companyChange.bind(this)} />
            </p>
            <p onClick={this.showRoleTypeBox.bind(this)}>
              <span className="redStar">*</span>  角色类型  
                 <input type="text" value={this.state.role_name} placeholder="选择认证的角色类型" style={{ "border": "none", "margin-left": "5rem" }}
                />
              <span className="iconfont" style={{ "fontSize": "3rem", "float": "right" }} >&#xe827;</span>
            </p>
          </div>
          <div className="applyPutSumbit" onClick={this.sumbit.bind(this)}>提交</div>
          <div className="identityBotton">
            <p style={{ "color": "#333" }}>认证材料</p>
            <div className="identityBottonBox">
              
              <div className="" style={{ position: "relative", left: "13rem", width: "106rem" }}>
                <WingBlank>
                  <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                    multiple={this.state.multiple}
                  />
                </WingBlank>
              </div>
              <p>认证企业管理员请上传租房合同或营业执照</p>
              <p>认证园区管理员请上传工牌</p>
            </div>
            <p>或者电话联系管理员进行授权(<span style={{"color":"#333"}}>0773-1234567</span>)</p>
          </div>
        </form>
        <div className={this.state.roleTypeBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.roleTypeUL.map((i, index) => {
              return (
                <li className={this.state.roleTypeIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inRoleTypeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideRoleTypeBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getRoleTypeBox.bind(this)}>确认</span>
          </div>
        </div>
      </div>
    )
  }




}

export default IdentityAuthentication;