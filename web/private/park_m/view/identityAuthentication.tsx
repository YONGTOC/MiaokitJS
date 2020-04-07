import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";

class IdentityAuthentication extends React.Component<{ history: any }> {
  public constructor(props) {
    super(props);

    this.setRoleTypeUL = this.setRoleTypeUL.bind(this);
  }

  public componentDidMount() {
    this.dataService.getRoleType(this.setRoleTypeUL);
  }

  public dataService: DataService = new DataService();

  // 返回
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

  sumbit() {
    console.log(this.state)
  }

  public render() {
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
              <i className="iconfont identityBottonIcon" >&#xe821;</i>
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


  public state = {
    applicant: "",
    phone: "",
    company: "",
    roleType: "",
    // 公司选择
    roleTypeBox: "hide",
    roleTypeUL: [],
    roleTypeIndexof: 0,
    role_id: "",
    role_id_in: "",
    role_name: "",
    role_name_in: "",
  }

}

export default IdentityAuthentication;