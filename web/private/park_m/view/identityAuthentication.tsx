import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import { ImagePicker, WingBlank, Toast } from 'antd-mobile';


class IdentityAuthentication extends React.Component<{ history: any }> {
  public state = {
    id:"",
    applicant: "",
    phone: "",
    company: "",
    roleType: "",
    park_id:"",
    // 公司选择
          // 公司选择
    companyBox: "hide",
    inputValueRelate: "",
     company_id_in:"",
    company_name_in: "",
       companyNull: "hide",
    companyUL: [],
    company_id: "",
    company_name: "",
    companyIndexof: -1,
      // 身份选择，废弃
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
    pic: "",
    name:"",

  }

  public constructor(props) {
    super(props);

   // this.setRoleTypeUL = this.setRoleTypeUL.bind(this);
    this.setImg = this.setImg.bind(this);
  }

  public componentDidMount() {
  //  this.dataService.getRoleType(this.setRoleTypeUL);
    let data = sessionStorage.getItem("userInfos");
    let dataObj = JSON.parse(data)
    let role_name = JSON.parse(sessionStorage.getItem("userInfos")).roles.role_name;
    let role_id = JSON.parse(sessionStorage.getItem("userInfos")).roles.role_id;
    let name = JSON.parse(sessionStorage.getItem("userInfos")).name;

    //this.state.applicant = sessionStorage.getItem("userName");
    //this.state.phone = sessionStorage.getItem("phone");
    //this.state.company = sessionStorage.getItem("enterprise");;
    //this.state.park_id = sessionStorage.getItem("park_id");
    this.setState({
      applicant:dataObj.name,
      phone:dataObj.phone,
      company: sessionStorage.getItem("enterprise") == "undefined" ? "暂无绑定企业" : sessionStorage.getItem("enterprise"),
      company_id: sessionStorage.getItem("enterpriseId"),
      park_id: dataObj.park_id,
      role_name:role_name,
      role_id: role_id,
      name: dataObj.name,
    })
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

  // 显示所有企业列表
  public companyChange(event) {
    console.log(555555555555555)
    //this.setState({
    //  company: event.target.value
    //})
  this.setState({
      companyBox: "rollSelectCauseBox2",
    })
   //ajax 获取使用企业列表
    this.dataService.findCompany(this.setCompanyList.bind(this),"", this.state.inputValueRelate);

  }
  
  //获取到的 企业列表
  public setCompanyList(data) {
    console.log("mmmmmmmmmmmmm", data.response);
    if (data.response.length == 0) {
      this.setState({
        companyNull: "show",
         companyUL:data.response
    })
    } else {
      this.setState({
        companyNull: "hide",
      companyUL:data.response
    })
    }
 
  }

      // 隐藏公司列表框
  public hideCompanyBox() {
    this.setState({
      companyBox: "hide",
    }, () => {
        console.log("hide",this.state.company_id, this.state.company_name);
      })
  }

      //确认公司列表选择
  public getCompanyBox() {
    this.setState({
      companyBox: "hide",
      company_id: this.state.company_id_in,
      company_name: this.state.company_name_in,
      company:this.state.company_name_in,
    })
  }

    // 选中公司
  public inCompanyeList(i, id, name) {
     //console.log("选中的公司", i, id, name);
    this.setState({
      companyIndexof: i,
      company_id_in: id,
      company_name_in: name,
    }, () => {
       console.log("选中的公司",this.state.company_id_in, this.state.company_name_in);
      })
  }
  
    // 聚焦
  public foucusRelate() {
    if (this.state.inputValueRelate == " ") {
      this.setState({ inputValueRelate: "" })
    }
  }

  // 失焦
  public blurRelate(event) {
    if (this.state.inputValueRelate == "") {
      this.setState({ inputValueRelate: " " })
    }
  }

  // 输入
  public changeRelate(event) {
    this.setState({ inputValueRelate: event.target.value });
  }

    // 软键盘 搜索
  public queryKeyDownHandlerRelate(e) {
    switch (e.keyCode) {
      case 13://回车事件
        this.searchCompany();
        break
    }
  }

      //软键盘搜索 
  public searchCompany() {
    if (this.state.inputValueRelate == "请输入企业名称"  ) {
      this.setState({ inputValueRelate: "" })
    };
    console.log("searchBtn", this.state.inputValueRelate);
    this.dataService.findCompany(this.setCompanyList.bind(this),"", this.state.inputValueRelate);
  }

  //角色类型选择
  public showRoleTypeBox() {
    console.log(111111)
    this.setState({
      roleTypeBox:"show rollSelectCauseBox",
    })
  }

  //// 写入角色类型
  //public setRoleTypeUL(data) {
  //  this.setState({
  //    roleTypeUL: data.response,
  //    role_id: data.response[0].id,
  //    role_name: data.response[0].name,
  //  })
  //}

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
  onChangeImg = (files, type, index) => {
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

    if (type == "remove") {
      this.setState({
        pic: ""
      })
    } else {
        this.dataService.uploadImgOss(this.setImg, obj);
    }

  }

  // 修改提交img数据
  setImg(data) {
    this.setState({
      pic: data[0],
    })
  }

  sumbit() {
    console.log(this.state);
    let  userId = JSON.parse(sessionStorage.getItem("userInfos")).userId;
    let obj = {
      //"id": 用户id
      "id":  userId,
      "name": this.state.applicant,
      "company_name": this.state.company,
      "phone": this.state.phone,
      "park_id": this.state.park_id,
      //"role_id": this.state.role_id,
      "role_id": JSON.parse(sessionStorage.getItem("userInfos")).roles.role_id ,
      "pic_amount": "1",
      "pic": this.state.pic,
        "bind_company":
    [
        {
            //企业id
            "company_id":this.state.company_id,
            //企业名称
            "company_name": this.state.company,
        }
        ],
        "add_company":
    [
        {
            //企业名称 companyg_name_in
            "company_name":""
        }
    ]
    }
    if (this.state.applicant == "") {
       Toast.info('请填写姓名', 2);
    } else if (this.state.phone == "") {
      Toast.info('请填写联系电话', 2);
    } else if (this.state.company == "" || this.state.company == "请先关联企业") {
      Toast.info('请选择企业', 2);
    } else if (this.state.role_id == "") {
      Toast.info('请选择角色类型', 2);
    }
    //else if (this.state.pic == "") {
    //  Toast.info('请上传认证材料照片', 2);
    //}
    else {
      this.dataService.userAuthentication(this.sumbitSucceed, obj);
    }
    

  }

  sumbitSucceed(data) {
    Toast.info(data);
    window.history.back();
  }


  public render() {
    console.log("33333333333",this.state.role_name)
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
                onChange={this.applicantChange.bind(this)}  readOnly/>
            </p>
            <p>
              <span className="redStar">*</span>  联系号码
                 <input type="number" value={this.state.phone} placeholder="请输入您的联系号码" style={{ "border": "none", "margin-left": "5rem" }}
                onChange={this.phoneChange.bind(this)}  readOnly/>
            </p>
            <p >
              <span className="redStar">*</span>  企业名称
                <input type="text" value={this.state.company} placeholder="" style={{"border": "none", "margin-left": "5rem" }}  />
                  <span onClick={this.companyChange.bind(this)}  className="iconfont" style={{ "fontSize": "3rem", "float": "right" }} >&#xe827;</span>
            </p>
            <p onClick={this.showRoleTypeBox.bind(this)}>
              <span className="redStar">*</span>  角色类型  
                 <input type="text" value={"企业管理员"} placeholder="企业管理员" style={{ "border": "none", "margin-left": "5rem" }}
                />
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
                    onChange={this.onChangeImg}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                    multiple={this.state.multiple}
                  />
                </WingBlank>
              </div>
              <p>认证企业管理员请上传租房合同或营业执照</p>
              <p>认证园区管理员请上传工牌</p>
            </div>
            <p style={{"display":"none"}}>或者电话联系管理员进行授权(<span style={{ "color": "#333" }}>0773-1234567</span>)</p>
          </div>
        </form>

       <div className={this.state.companyBox}>
               <div className="searchBox">
              <span className="searchBox-text">
                <i className="iconfont" style={{ "fontSize": "2.3rem" }}>&#xe810;</i>
                <input className="companySearch" type="search" placeholder="请输入企业名称"
                  value={this.state.inputValueRelate} onFocus={this.foucusRelate.bind(this)}
                  onBlur={this.blurRelate.bind(this)} onChange={this.changeRelate.bind(this)} onKeyDown={this.queryKeyDownHandlerRelate.bind(this)} />
            </span>
            </div>
          <ul className="rollSelectCauseULcss2">
             <p className={this.state.companyNull} style={{ "text-align": "center" }} >没有符合搜索条件的结果···</p>
            {this.state.companyUL.map((i, index) => {
              return (
                <li className={this.state.companyIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inCompanyeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideCompanyBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getCompanyBox.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )

    //<span className="iconfont" style={{ "fontSize": "3rem", "float": "right" }} >&#xe827;</span>
       //<div className={this.state.roleTypeBox}>
       //   <ul className="rollSelectCauseULcss">
       //     {this.state.roleTypeUL.map((i, index) => {
       //       return (
       //         <li className={this.state.roleTypeIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
       //           onClick={this.inRoleTypeList.bind(this, index, i.id, i.name)}
       //         >{i.name}</li>
       //       )
       //     })}
       //   </ul>
       //   <div className="rollSelectCuasedBtn">
       //     <span className="rollSelectCancel" onClick={this.hideRoleTypeBox.bind(this)} >取消</span>
       //     <span className="rollSelectConfirm" onClick={this.getRoleTypeBox.bind(this)}>确认</span>
       //   </div>
       // </div>

  }




}

export default IdentityAuthentication;