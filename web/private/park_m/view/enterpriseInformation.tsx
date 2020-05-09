import * as React from "react";
import "css!./styles/enterpriseInformation.css"
import DataService from "dataService";
import { string } from "prop-types";
import "css!./styles/resetAntdMobile.css"
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

interface IProps {
}

interface IState {
  imgList: Array<any>,
  elegantImgList: Array<any>,
  productImgList: Array<any>,
  panoramaImgList: Array<any>,
  modifyState: boolean,
  inputEnterpriseIDValue: string,
  inputEnterpriseNameValue: string,
  inputEnterprisePositionValue: string,
  contactsValue: string,
  phoneValue: string,
  officialWebsiteValue: string,
  descriptionValue: string,
  ID: string,
  name: string,
  headimageurl: string,
  address: string,
  contacts: string,
  phone: string,
  company_type: string,
  company_type_id: string,
  website: string,
  //descript: string,
  descriptArr: Array<any>,
  inputCompanyType: string,
  companyTypeBox: string,
  companyTypeUL: Array<any>,
  companyTypeIndexof: number,
  companyType_id_in: string,
  companyType_name_in: string,
  company_id_in: string,
  files: Array<any>,
  filesLogo: Array<any>,
  multiple: boolean,
  update_headimgurl: string,
  filesElegant: Array<any>,
  filesProduct: Array<any>,
  filesPanorama: Array<any>,
  elegant: Array<any>,
  product: Array<any>,
  panorama: Array<any>,
  pic: Array<any>,
  picPro:  Array<any>,
  picPan: Array<any>,
}



class EnterpriseInformation extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    imgList: ["./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg"],
    elegantImgList: ["./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg",],
    productImgList: ["./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg"],
    panoramaImgList: ["./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg"],
    modifyState: false, // 修改状态
    inputEnterpriseIDValue: "",
    inputEnterpriseNameValue: "请输入企业名称",
    inputEnterprisePositionValue: "请输入详细地址",
    contactsValue: "请输入联系人姓名",
    phoneValue: "请输入联系电话",
    officialWebsiteValue: "请输入企业官方网址",
    descriptionValue: "400字内",
    inputCompanyType: "请选择企业分类",
    // 读取企业详细信息
    ID: "123456",
    name: "",
    headimageurl: "",
    address: "",
    contacts: "",
    phone: "",
    company_type: "",
    company_type_id: "",
    website: "",
    //descript: "",
    descriptArr: [],
    companyTypeBox: "hide",
    companyTypeUL: [],
    companyTypeIndexof: 0,
    companyType_id_in: "",
    companyType_name_in: "",
    company_id_in:"",

    multiple: false,
    files: [],
    filesLogo: [],
    update_headimgurl: "",
    filesElegant: [],
    filesProduct: [],
    filesPanorama: [],
    elegant: [],
    product: [],
    panorama: [],
    pic: [],
    picPro: [],
    picPan: [],
    

  }

  public constructor(props) {
    super(props);

    this.setCompanyinfo = this.setCompanyinfo.bind(this);
    this.setCompanyType = this.setCompanyType.bind(this);
    this.setLogoImg = this.setLogoImg.bind(this);
    this.setElegantImg = this.setElegantImg.bind(this);
    this.setProductImg = this.setProductImg.bind(this);
    this.setPanoramaImg = this.setPanoramaImg.bind(this);
    this.closePic = this.closePic.bind(this);

  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    let userid = localStorage.getItem("userId");
    //this.dataService.getCompanyInfo(this.setCompanyinfo, userId); 
    let enterpriseId = sessionStorage.getItem("enterpriseId");
    this.dataService.getCompanyInfo(this.setCompanyinfo, enterpriseId);
    // this.dataService.getCompanyInfoByUser(this.setCompanyinfo, 2);
    let park_id = sessionStorage.getItem("park_id");
    this.dataService.getCompanyType(this.setCompanyType, park_id);


    //if (this.props.location.state) {
    //   sessionStorage.setItem("roomInfo", JSON.stringify(this.props.location.state.roomInfo))
    //}
    console.log(JSON.parse(sessionStorage.getItem("roomInfo")))
    console.log("pic", this.state.pic)
  }

  public setCompanyinfo(data) {
    console.log("rrrrrrrrrrrrr", data);
    //企业 logo  filesLogo
    var filesLogos = []
    filesLogos.push({ "id": "", "name": "logoimg", "url": data.response.headimageurl });

    var elegantImgs = []
    $.each(data.response.elegant, function (index, item) {
      elegantImgs.push({ "id": item.id, "name": item.name, "url": item.pic_url });
    });


      var pic = []
       $.each(data.response.elegant, function (index, item) {
      pic.push({ "id": item.id, "name": item.name, "url": item.pic_url });
    });

    var picPro = []
       $.each(data.response.product, function (index, item) {
      picPro.push({ "id": item.id, "name": item.name, "url": item.pic_url });
    });

    var picPan = []
       $.each(data.response.panorama, function (index, item) {
      picPan.push({ "id": item.id, "name": item.name, "url": item.pic_url });
    });

    this.setState({
      pic: pic,
     picPro: picPro,
     picPan:picPan,
    })

    let descriptArr;
    if (data.response.descript) {
      let descriptN = data.response.descript;
      descriptN.replace(/&#10;/, "<br />&nbsp;");
      descriptArr = descriptN.split("    ");
    } else {
      descriptArr = [];
    }

    this.setState({
      ID: data.response.id,
      inputEnterpriseIDValue: data.response.id,
      name: data.response.name,
      inputEnterpriseNameValue: data.response.name,
      headimageurl: data.response.headimageurl,
      filesLogo: filesLogos,
      address: data.response.address,
      inputEnterprisePositionValue: data.response.address,
      contacts: data.response.contact,
      contactsValue: data.response.contact,
      phone: data.response.phone,
      phoneValue: data.response.phone,
      company_type: data.response.company_type,
      company_type_id: data.response.company_type_id,
      inputCompanyType: data.response.company_type,
      website: data.response.website,
      // descript: descriptN,
      descriptArr: descriptArr,
      descriptionValue: data.response.descript,
      elegantImgList: data.response.elegant,
      productImgList: data.response.product,
      panoramaImgList: data.response.panorama,
      //filesElegant: elegantImgs,
      //filesProduct: productImgs,
      //filesPanorama: panoramaImgs,

    })
    console.log("hhhhhhhhhhhhhhhhhhhh", this.state);
  }

  public setCompanyType(data) {
    console.log("ttttttttttt", data);
    this.setState({
      companyTypeUL: data.response,
    })
  }

  // 显示公司列表
  public showCompanyTypeBox() {
    this.setState({
      companyTypeBox: "show companyTypeEnter",
      companyBox: "rollSelectCauseBox",
      company_id_in: this.state.companyTypeUL[this.state.companyTypeIndexof].id,
      company_name_in: this.state.companyTypeUL[this.state.companyTypeIndexof].name,
    }, () => {
      console.log("show",this.state)
      })
     

  }

  // 选中企业类型
  inCompanyeTypeList(i, id, name) {
    console.log("选中企业类型", id, name)
    this.setState({
      companyTypeIndexof: i,
      companyType_id_in: id,
      companyType_name_in: name,
    }, () => {
      console.log(this.state.companyType_id_in, this.state.companyType_name_in, this.state.companyTypeIndexof)
    }
    )
  }

  // 隐藏公司列表框
  hideCompanyTypeBox() {
    console.log(this.state)
    this.setState({
      companyTypeBox: "hide",
      company_type: this.state.company_type,
      companyType_id_in: this.state.company_type_id,
    })
  }

  //确认公司列表选择
  getCompanyTypeBox() {
    if (this.state.companyType_name_in == "") {
      this.setState({
        companyTypeBox: "hide",
        company_type: this.state.company_type_id,
        inputCompanyType: this.state.company_type,
      })
    } else {
      this.setState({
        companyTypeBox: "hide",
        company_type: this.state.company_id_in,
        inputCompanyType: this.state.companyType_name_in,
      })
    }

  }

  onErrorHeadimageurl() {
    this.setState({
      headimageurl: "./park_m/image/tx.jpg"
    })
  }
  onErrorElegant() {
    this.setState({
      elegantImgList: [{ pic_url: "./park_m/image/tx.jpg" }]
    })
  }
  onErrorProduct() {
    this.setState({
      productImgList: [{ pic_url: "./park_m/image/tx.jpg" }]
    })
  }
  onErrorPanorama() {
    this.setState({
      panoramaImgList: [{ pic_url: "./park_m/image/tx.jpg" }]
    })
  }

  // 返回
  goBack() {
    this.props.history.goBack();
  }
  // 修改
  modify() {
    this.setState({ modifyState: !this.state.modifyState })
  }

  // 提交
  submit() {
    console.log("objobjobj", this.state);
    var reg01 = /^1[3456789]\d{9}$/;
    var reg02 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;

    if (reg01.test(this.state.phoneValue) || reg02.test(this.state.phoneValue) || this.state.phoneValue == "") {
      console.log("手机号或座机号填写正确")
    } else {
      alert("手机号码不正确，固话请添加区号")
      return;
    }

    let userid = sessionStorage.getItem("userid");
    let park_id = sessionStorage.getItem("park_id");
    let enterpriseId = sessionStorage.getItem("enterpriseId");
    // let token= sessionStorage.getItem("token");
    let sum = 1;

    console.log("bobo", this.state.elegant.length);

    //if (this.state.pic.length == 1) {
    //  alert("请为企业风采，至少添加两张图片");
    //  sum = 0;
    //} else {
    //      let elegant = this.state.elegant;
    // $.each(this.state.pic, function (index, item) {
    //  elegant.push({ "id": item.id, "name": item.name, "url": item.pic_url });
    //  });
    //      sum = 1;
    //}

      //pic.push({ pic_url: data.response, name: "" });
      //elegant.push({url: elegant.url, name: ""})


    //let elegants = [];
    let obj = {
      //用户id
      "user_id": userid,
      //园区id
      "park_id": park_id,
      //企业id（当为添加新企业时，参数为""）
      "id": enterpriseId,
      //公司名字
      "name": this.state.inputEnterpriseNameValue,
      //地址
      "address": this.state.inputEnterprisePositionValue,
      //联系人
      "contact": this.state.contactsValue,
      //电话
      "phone": this.state.phoneValue,
      //企业官网
      "website": this.state.officialWebsiteValue == "请输入企业官方网址" ? "" : this.state.officialWebsiteValue,
      //企业详情详情文字
      "descript": this.state.descriptionValue == "400字内" ? "" : this.state.descriptionValue,
      //企业类型id
      "company_type": this.state.companyType_id_in == "" ? this.state.company_type_id : this.state.companyType_id_in,
     // "company_type": this.state.companyType_id_in == "" ? this.state.company_type : this.state.companyType_id_in,
      "elegant": this.state.pic,
      //"elegant": this.state.pic,
      "product": this.state.picPro,
      "panorama": this.state.picPan,
      "headimageurl": this.state.headimageurl,

    }

     if (this.state.pic.length == 1) {
      alert("请为企业风采，至少添加两张图片");
      sum = 0;
    }

    if (this.state.picPro.length == 0) {
      obj.product = this.state.filesProduct;
    }
    if (obj.product.length == 1) {
      alert("请为公司产品，至少添加两张图片");
      sum = 0;
    };

    console.log("objobjobj2222222", obj);
    if (sum == 1) {
      this.dataService.saveCompanyInfo(this.callBackSaveCompanyInfo.bind(this), obj);
    }

    //sumbit over;
  }

  callBackSaveCompanyInfo(data) {
    console.log(data);
    if (data.err_msg == "更新成功") {
      alert("提交成功");
      this.props.history.goBack()
    }
  }


  // 聚焦企业id
  focusEnterpriseID() {
    if (this.state.inputEnterpriseIDValue === "123456") {
      this.setState({ inputEnterpriseIDValue: "" })
    }
  }

  // 失焦企业id
  blurEnterpriseID() {
    if (this.state.inputEnterpriseIDValue === "") {
      this.setState({ inputEnterpriseIDValue: "123456" })
    }
  }

  // 输入企业id
  changeEnterpriseID(event) {
    this.setState({ inputEnterpriseIDValue: event.target.value })
  }

  // 聚焦企业名字
  focusEnterpriseName() {
    if (this.state.inputEnterpriseNameValue === "请输入企业名称") {
      this.setState({ inputEnterpriseNameValue: "" })
    }
  }

  // 失焦企业名字
  blurEnterpriseName() {
    if (this.state.inputEnterpriseNameValue === "") {
      this.setState({ inputEnterpriseNameValue: "请输入企业名称" })
    }
  }

  // 输入企业名字
  changeEnterpriseName(event) {
    this.setState({ inputEnterpriseNameValue: event.target.value })
  }

  // 聚焦企业位置
  focusEnterprisePosition() {
    if (this.state.inputEnterprisePositionValue === "请输入详细地址") {
      this.setState({ inputEnterprisePositionValue: "" })
    }
  }

  // 失焦企业位置
  blurEnterprisePosition() {
    if (this.state.inputEnterprisePositionValue === "") {
      this.setState({ inputEnterprisePositionValue: "请输入详细地址" })
    }
  }

  // 输入企业位置
  changeEnterprisePosition(event) {
    this.setState({ inputEnterprisePositionValue: event.target.value })
  }

  // 聚焦联系人
  focusContacts() {
    if (this.state.contactsValue === "请输入联系人姓名") {
      this.setState({ contactsValue: "" })
    }
  }

  // 失焦联系人
  blurContacts() {
    if (this.state.contactsValue === "") {
      this.setState({ contactsValue: "请输入联系人姓名" })
    }
  }

  // 输入联系人
  changeContacts(event) {
    this.setState({ contactsValue: event.target.value })
  }

  // 聚焦联系人电话
  focusPhone() {
    if (this.state.phoneValue === "请输入联系人电话") {
      this.setState({ phoneValue: "" })
    }
  }

  // 失焦联系人电话
  blurPhone() {
    if (this.state.phoneValue === "") {
      this.setState({ phoneValue: "请输入联系人电话" })
    }
  }

  // 输入联系人电话
  changePhone(event) {
    this.setState({ phoneValue: event.target.value })
  }

  // 聚焦企业官网
  focusOfficialWebsite() {
    if (this.state.officialWebsiteValue === "请输入企业官方网址") {
      this.setState({ officialWebsiteValue: "" })
    }
  }

  // 失焦企业官网
  blurOfficialWebsite() {
    if (this.state.officialWebsiteValue === "") {
      this.setState({ officialWebsiteValue: "请输入企业官方网址" })
    }
  }

  // 输入企业官网
  changeOfficialWebsite(event) {
    this.setState({ officialWebsiteValue: event.target.value })
  }

  // 聚焦企业描述
  focusDescription() {
    if (this.state.descriptionValue === "400字内") {
      this.setState({ descriptionValue: "" })
    }
  }

  // 失焦企业描述
  blurDescription() {
    if (this.state.descriptionValue === "") {
      this.setState({ descriptionValue: "400字内" })
    }
  }

  // 输入企业描述
  changeDescription(event) {
    this.setState({ descriptionValue: event.target.value })
  }

  // 修改logoimg
  onChangeLogo = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      filesLogo: files,
      files,
    });

    if (files.length == 0) {
      //不更新logoimg
      this.setState({
        // update_headimgurl:"",
        headimageurl: "",
      });
    } else {
      //oss logoimg
      let obj = [{
        "imgname": "headimg",
        "imgbase64": this.state.filesLogo[0].url,
      }]
      this.dataService.uploadImgOss(this.setLogoImg, obj);
    }

  }

  // 修改提交logoimg数据
  setLogoImg(data) {
    console.log("AAAA", data);
    console.log("BBB", data[0]);
    this.setState({
      headimageurl: data[0],
    })
    console.log("headimg", this.state)
  }


  //企业风采
  public onChangeElegant = (files, type, index) => {
    this.setState({
      filesElegant: files,
      files,
    }, () => {
      let elegantArr = [];
      if (this.state.filesElegant.length > 0) {
        $.each(this.state.filesElegant, function (index, item) {
          if (item.url.indexOf) {
            if (item.url.indexOf("base64") != -1) {
              elegantArr.push({ "imgname": "", "imgbase64": item.url });
            }
          }

        });
      }
      //oss url
      this.dataService.uploadImgOss(this.setElegantImg, elegantArr);
    });
  }

  // 获取ossurl，写入state
  setElegantImg(data) {
    let filesElegants = this.state.filesElegant;
    let filesElegantsN = filesElegants.filter((item) => { return item.orientation != "1" })
    $.each(data, function (index, item) {
      filesElegantsN.push({ "url": item, "id": "", "name": "XXimg" })
    });
    this.setState({
      elegant: filesElegantsN
    })
    console.log("setElegantImg55555", this.state.elegant);
  }

  //企业产品
  public onChangeProduct = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      filesProduct: files,
      files,
    }, () => {
      let productArr = [];
      if (this.state.filesProduct.length > 0) {
        $.each(this.state.filesProduct, function (index, item) {
          if (item.url.indexOf) {
            if (item.url.indexOf("base64") != -1) {
              productArr.push({ "imgname": "", "imgbase64": item.url });
            }
          }
        });
      }
      //oss url
      this.dataService.uploadImgOss(this.setProductImg, productArr);
    });
  }

  // 获取ossurl，写入state
  setProductImg(data) {
    let filesProducts = this.state.filesProduct;
    let filesProductsN = filesProducts.filter((item) => { return item.orientation != "1" })
    $.each(data, function (index, item) {
      filesProductsN.push({ "url": item, "id": "", "name": "XXimg" })
    });
    this.setState({
      product: filesProductsN
    })
    // console.log("setElegantImg55555", this.state.elegant); 
  }

  //全景
  public onChangePanorama = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      filesPanorama: files,
      files,
    }, () => {
      let panoramaArr = [];
      if (this.state.filesPanorama.length > 0) {
        $.each(this.state.filesPanorama, function (index, item) {
          if (item.url.indexOf) {
            if (item.url.indexOf("base64") != -1) {
              panoramaArr.push({ "imgname": "", "imgbase64": item.url });
            }
          }

        });
      }
      //oss url
      this.dataService.uploadImgOss(this.setPanoramaImg, panoramaArr);
    });
  }

  // 获取ossurl，写入state
  setPanoramaImg(data) {
    console.log("panorama", this.state.panorama);
    let filesPanoramas = this.state.filesPanorama;
    let filesPanoramasN = filesPanoramas.filter((item) => { return item.orientation != "1" })
    $.each(data, function (index, item) {
      filesPanoramasN.push({ "url": item, "id": "", "name": "XXimg" })
    });
    this.setState({
      panorama: filesPanoramasN
    })
    console.log("panorama", this.state.panorama);
  }


  //新提交图片 1
  clupPic() {
    $('#a-input').click();
  }

  updatePic(event) {
    console.log(99999)
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
    this.uploadPic(formData)
  }

    uploadPic(file) {
    this.dataService.upload(this.callBackUploadPic.bind(this), file)
      // this.dataService.uploadImgOss(this.callBackUploadPic.bind(this), file);

  }
  
  callBackUploadPic(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let pic = this.state.pic;
      let elegant = this.state.elegant;
      pic.push({ url: data.response, name: "" });
     // elegant.push({url: data.response, name: ""})
      this.setState({
        pic: pic,
       // elegant:elegant,
      })
    } else {
      alert("上传失败")
    }
    console.log("rrrrrrrrrrrrrP",this.state)
  }

    // 清除图片
  closePic(index) {
    let pic = this.state.pic;
     // let elegant = this.state.elegant;
    pic.splice(index, 1)
   // elegant.splice(index, 1)

    this.setState({
      pic: pic,
     // elegant:elegant,
    })


  }

    //新提交图片 2
  clupPicPro() {
    console.log(7777)
     $('#b-input').click();
  }

  updatePicPro(event) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      this.uploadPicPro(formData)
  }

    uploadPicPro(file) {
    this.dataService.upload(this.callBackUploadPicPro.bind(this), file)
  }
  
  callBackUploadPicPro(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let picPro = this.state.picPro;
      picPro.push({ url: data.response, name: "" });
      this.setState({
        picPro: picPro,
      })
    } else {
      alert("上传失败")
    }
    console.log("rrrrrrrrrrrrrP",this.state)
  }

    // 清除图片
  closePicPro(index) {
    let picPro = this.state.picPro;
    picPro.splice(index, 1)
    this.setState({
      picPro: picPro,
    })
    console.log("MMMMMMMM",this.state)
  }

      //新提交图片 3
  clupPicPan() {
    console.log(7777)
     $('#h-input').click();
  }

  updatePicPan(event) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      this.uploadPicPan(formData)
  }

    uploadPicPan(file) {
    this.dataService.upload(this.callBackUploadPicPan.bind(this), file)
  }
  
  callBackUploadPicPan(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let picPan = this.state.picPan;
      picPan.push({ url: data.response, name: "" });
      this.setState({
        picPan: picPan,
      })
    } else {
      alert("上传失败")
    }
    console.log("rrrrrrrrrrrrrP",this.state)
  }

    // 清除图片
  closePicPan(index) {
    let picPan = this.state.picPan;
    picPan.splice(index, 1)
    this.setState({
      picPan: picPan,
    })
    console.log("MMMMMMMM",this.state)
  }

  render() {
    //  <img src="./park_m/image/photograph.png" width="110px" height="110px" />
    //<div style={{ backgroundColor: "#F2F2F2", height: "120px", width: "120px", float: "left", lineHeight: "120px", textAlign: "center", marginTop: "20px" }}>
    //</div>
    const { files } = this.state;
    return (
      <div className="enterprise-information">
        <div className="enterprise-information-back">
          <div style={{ float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>企业信息管理</span>
          </div>
          {this.state.modifyState ? null :
            <span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }} onClick={this.modify.bind(this)}>修改</span>
          }
        </div>
        {this.state.modifyState ?
          <div className="enterprise-information-box">
            <div className="enterprise-information-id">
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", marginLeft: "30px", float: "left", width: "25%" }}>企业ID</div>
              <input className="enterprise-information-id-input" value={this.state.inputEnterpriseIDValue} readOnly />
            </div>
            <div className="enterprise-information-modify-tag">
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>企业名称</div>
              <input className="enterprise-information-name-input" value={this.state.inputEnterpriseNameValue}
                onFocus={this.focusEnterpriseName.bind(this)} onBlur={this.blurEnterpriseName.bind(this)} onChange={this.changeEnterpriseName.bind(this)} />
            </div>
            <div className="" style={{ height: "180px", width: "90%", margin: "auto", "marginTop": "1rem", borderBottom: "3px solid #F2F2F2" }}>
              <span className="enterprise-information-photograph-star"></span>
              <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left" }}>企业 logo</span>
              <div className="" style={{ "marginLeft": "14rem" }}>
                <WingBlank>
                  <ImagePicker
                    files={this.state.filesLogo}
                    onChange={this.onChangeLogo}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 1}
                    accept="image/jpg,image/jpge,image/png"
                    multiple={this.state.multiple}
                  />
                </WingBlank>
              </div>
            </div>

            <div className="enterprise-information-modify-tag">
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>企业位置</div>
              <input className="enterprise-information-name-input" value={this.state.inputEnterprisePositionValue}
                onFocus={this.focusEnterprisePosition.bind(this)} onBlur={this.blurEnterprisePosition.bind(this)} onChange={this.changeEnterprisePosition.bind(this)} />
            </div>
            <div className="enterprise-information-modify-tag">
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>联系人</div>
              <input className="enterprise-information-name-input" value={this.state.contactsValue}
                onFocus={this.focusContacts.bind(this)} onBlur={this.blurContacts.bind(this)} onChange={this.changeContacts.bind(this)} />
            </div>
            <div className="enterprise-information-modify-tag">
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>联系电话</div>
              <input className="enterprise-information-name-input" value={this.state.phoneValue} type="text"
                onFocus={this.focusPhone.bind(this)} onBlur={this.blurPhone.bind(this)} onChange={this.changePhone.bind(this)} />
            </div>
            <div className="enterprise-information-modify-tag" onClick={this.showCompanyTypeBox.bind(this)} >
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>企业分类</div>
              <div style={{ color: "#6C6C6C", fontSize: "40px", lineHeight: "120px", width: "50%", float: "left" }}>{this.state.inputCompanyType}</div>
              <div style={{ float: "right", lineHeight: "120px", textAlign: "center", width: "60px" }}>
                <img src="./park_m/image/right.png" />
              </div>
            </div>
            <div className="enterprise-information-modify-tag">
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%", marginLeft: "30px" }}>企业官网</div>
              <input className="enterprise-information-name-input" value={this.state.officialWebsiteValue}
                onFocus={this.focusOfficialWebsite.bind(this)} onBlur={this.blurOfficialWebsite.bind(this)} onChange={this.changeOfficialWebsite.bind(this)} />
            </div>
            <div style={{ width: "90%", height: "120px", margin: "auto", marginTop: "10px" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "35%" }}>企业详情描述:</div>
            </div>
            <textarea style={{ width: "84%", height: "400px", backgroundColor: "#F2F2F2", fontSize: "40px", color: "#949494", border: "none", outline: "none", "padding": "2rem" }} value={this.state.descriptionValue}
              onFocus={this.focusDescription.bind(this)} onBlur={this.blurDescription.bind(this)} onChange={this.changeDescription.bind(this)}></textarea>

            <div className="imgBox elegantImgBox" style={{  }}>
              <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left","margin-right": "1rem" }}>企业风采</span>
                <div className="service-tel-B" >
          {this.state.pic.map((item, index) => {
            return (
              <div style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }} key={index}>
                <img className="closeIcon" src="./park_m/image/close.png" onClick={e => this.closePic(index)} />
                <img className="elegantImg" src={item.url}  />
                </div>
              )
            })
          }
                <input type="file" onChange={this.updatePic.bind(this)} id="a-input" style={{"display":"none"}} />
                <div onClick={this.clupPic.bind(this)} style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} >
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
            </div>


   

            <div className="imgBox elegantImgBox" style={{  }}>
              <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left","margin-right": "1rem" }}>产品展示</span>
                <div className="service-tel-B" >
          {this.state.picPro.map((item, index) => {
            return (
              <div style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }} key={index}>
                <img className="closeIcon" src="./park_m/image/close.png" onClick={e => this.closePicPro(index)} />
                <img className="elegantImg" src={item.url}  />
                </div>
              )
            })
          }
                <input type="file" onChange={this.updatePicPro.bind(this)} id="b-input" style={{"display":"none"}}/>
                <div onClick={this.clupPicPro.bind(this)} style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} >
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
            </div>


            
            <div className="imgBox elegantImgBox" style={{  }}>
              <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left","margin-right": "1rem" }}>全景展示</span>
                <div className="service-tel-B" >
          {this.state.picPan.map((item, index) => {
            return (
              <div style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }} key={index}>
                <img className="closeIcon" src="./park_m/image/close.png" onClick={e => this.closePicPan(index)} />
                <img className="elegantImg" src={item.url}  />
                </div>
              )
            })
          }
                <input type="file" onChange={this.updatePicPan.bind(this)} id="h-input" style={{"display":"none"}}/>
                <div onClick={this.clupPicPan.bind(this)} style={{ width: "12rem", height: "12rem", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} >
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
            </div>


            <div className="enterprise-information-submit" onClick={this.submit.bind(this)}>
              提交
            </div>
          </div> :
          <div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业ID</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.ID}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业名称</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.name}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业logo</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left" }}>
                <img src={this.state.headimageurl} style={{ width: "11rem" }} onError={this.onErrorHeadimageurl.bind(this)} />
              </div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业位置</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%", display: "-webkit-box", webkitBoxOrient: "vertical", WebkitLineClamp: 1, overflow: "hidden" }}>{this.state.address}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>联系人</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.contacts}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>联系电话</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.phone}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业分类</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.company_type}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业官网</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>{this.state.website}</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业介绍</div>
              <div className={"enterpriseDetails"}>
                {this.state.descriptArr.map((i, index) => {
                  return (
                    <p style={{ "white-space": "pre-line", "text-indent": "5rem" }}>{i}</p>
                  )
                })}
              </div>
            </div>
            <div style={{ margin: "0px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业风采</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}>
                {
                  this.state.elegantImgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "12rem", height: "12rem", margin: "0 20px 20px 0" }}>
                        <img src={item.pic_url} width="100%" height="100%" onError={this.onErrorElegant.bind(this)} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>产品展示</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}> 
                {
                  this.state.productImgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "12rem", height: "12rem", margin: "0 20px 20px 0" }}>
                        <img src={item.pic_url} width="100%" height="100%" onError={this.onErrorProduct.bind(this)} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>全景展示</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}>
                {
                  this.state.panoramaImgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "12rem", height: "12rem", margin: "0 20px 20px 0" }}>
                        <img src={item.pic_url} width="100%" height="100%" onError={this.onErrorPanorama.bind(this)} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }

        <div className={this.state.companyTypeBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.companyTypeUL.map((i, index) => {
              return (
                <li className={this.state.companyTypeIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inCompanyeTypeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideCompanyTypeBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getCompanyTypeBox.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )
     //<div style={{ marginLeft: "11rem" }}> 
     //           <WingBlank>
     //             <ImagePicker
     //               files={this.state.filesElegant}
     //               onChange={this.onChangeElegant}
     //               onImageClick={(index, fs) => console.log(index, fs)}
     //               selectable={files.length < 8}
     //               accept="image/jpg,image/jpge,image/png"
     //               multiple={this.state.multiple}
     //             />
     //           </WingBlank>
     //         </div>
    //  <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%","white-space": "pre-line" }}>{this.state.descript}</div>
            // <div className="imgBox">
            //  <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left" }}>产品展示</span>
            //  <div style={{ marginLeft: "11rem" }}>
            //    <WingBlank>
            //      <ImagePicker
            //        files={this.state.filesProduct}
            //        onChange={this.onChangeProduct}
            //        onImageClick={(index, fs) => console.log(index, fs)}
            //        selectable={files.length < 8}
            //        accept="image/jpg,image/jpge,image/png"
            //        multiple={this.state.multiple}
            //      />
            //    </WingBlank>
            //  </div>
            //</div>
    
            //<div className="imgBox">
            //  <span style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left" }}>全景展示</span>
            //  <div style={{ marginLeft: "11rem" }}>
            //    <WingBlank>
            //      <ImagePicker
            //        files={this.state.filesPanorama}
            //        onChange={this.onChangePanorama}
            //        onImageClick={(index, fs) => console.log(index, fs)}
            //        selectable={files.length < 8}
            //        accept="image/jpg,image/jpge,image/png"
            //        multiple={this.state.multiple}
            //      />
            //    </WingBlank>
            //  </div>
            //</div>
  }
}

export default EnterpriseInformation;




