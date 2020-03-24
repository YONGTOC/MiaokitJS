import * as React from "react";
import "css!./styles/enterpriseInformation.css"

interface IProps {
}

interface IState {
  imgList: Array<any>,
  modifyState: boolean,
  inputEnterpriseIDValue: string,
  inputEnterpriseNameValue: string,
  inputEnterprisePositionValue: string,
  contactsValue: string,
  officialWebsiteValue: string,
  descriptionValue: string
}

class EnterpriseInformation extends React.Component {
  public readonly state: Readonly<IState> = {
    imgList: ["./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg", "./park_m/image/tx.jpg"],
    modifyState: false, // 修改状态
    inputEnterpriseIDValue: "123456",
    inputEnterpriseNameValue: "请输入企业名称",
    inputEnterprisePositionValue: "请输入详细地址",
    contactsValue: "请输入联系人姓名",
    officialWebsiteValue: "请输入企业官方网址",
    descriptionValue: "400字内"
  }


  // 返回
  goBack() {
    this.props.history.goBack()
  }
  // 修改
  modify() {
    this.setState({ modifyState: !this.state.modifyState })
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


  render() {
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
          <div>
            <div className="enterprise-information-id">
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", marginLeft: "30px", float: "left", width: "25%" }}>企业ID</div>
              <input className="enterprise-information-id-input" value={this.state.inputEnterpriseIDValue}
                onFocus={this.focusEnterpriseID.bind(this)} onBlur={this.blurEnterpriseID.bind(this)} onChange={this.changeEnterpriseID.bind(this)} />
            </div>
            <div className="enterprise-information-modify-tag">
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>企业名称</div>
              <input className="enterprise-information-name-input" value={this.state.inputEnterpriseNameValue}
                onFocus={this.focusEnterpriseName.bind(this)} onBlur={this.blurEnterpriseName.bind(this)} onChange={this.changeEnterpriseName.bind(this)} />
            </div>
            <div className="enterprise-information-modify-photograph-tag">
              <div className="enterprise-information-photograph-star"></div>
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "160px", float: "left", width: "25%" }}>企业logo</div>
              <div style={{ backgroundColor: "#F2F2F2", height: "120px", width: "120px", float: "left", lineHeight: "120px", textAlign: "center", marginTop: "20px" }}>
                <img src="./park_m/image/photograph.png" width="110px" height="110px" />
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
              <div style={{ color: "#949494", fontSize: "40px", lineHeight: "120px", float: "left", width: "25%" }}>企业分类</div>
              <div style={{ color: "#6C6C6C", fontSize: "40px", lineHeight: "120px", width: "50%", float: "left" }}>请选择企业分类</div>
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
            <textarea style={{ width: "84%", height: "400px", backgroundColor: "#F2F2F2", fontSize: "40px", color: "#949494", border: "none", outline: "none" }} value={this.state.descriptionValue}
              onFocus={this.focusDescription.bind(this)} onBlur={this.blurDescription.bind(this)} onChange={this.changeDescription.bind(this)}></textarea>
            <div className="enterprise-information-upload-a">
              <div>企业风采</div>
              <div style={{ width: "200px", height: "200px", backgroundColor: "#F2F2F2", textAlign: "center", marginTop: "30px" }}>
                <img src="./park_m/image/addPicture.png" width="70px" height="70px" style={{ marginTop: "35px" }} />
                <div style={{ marginTop: "10px" }}>添加</div>
              </div>
            </div>
            <div className="enterprise-information-upload-a">
              <div>产品展示</div>
              <div style={{ width: "200px", height: "200px", backgroundColor: "#F2F2F2", textAlign: "center", marginTop: "30px" }}>
                <img src="./park_m/image/addPicture.png" width="70px" height="70px" style={{ marginTop: "35px" }} />
                <div style={{ marginTop: "10px" }}>添加</div>
              </div>
            </div>
            <div className="enterprise-information-upload-b">
              <div>全景展示</div>
              <div style={{ width: "200px", height: "200px", backgroundColor: "#F2F2F2", textAlign: "center", marginTop: "30px" }}>
                <img src="./park_m/image/addPicture.png" width="70px" height="70px" style={{ marginTop: "35px" }} />
                <div style={{ marginTop: "10px" }}>添加</div>
              </div>
            </div>
            <div className="enterprise-information-submit" onClick={this.modify.bind(this)}>
              提交
            </div>
          </div> :
          <div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业ID</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>123456</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业名称</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>浙江永拓信息科技有限公司</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业logo</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left" }}>
                <img src="./park_m/image/logo.png" />
              </div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业位置</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>桂林市信息产业园E座B区3楼</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>联系人</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>XXX</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>联系电话</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>12345678910</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业分类</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>科技服务</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业官网</div><div style={{ color: "#333333", fontSize: "40px", float: "left" }}>www.yongtoc.com</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业介绍</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}>      浙江永拓信息科技有限公司是浙江永拓实业有限公司旗下的控股子公司。
        公司由计算机图形学、计算机应用学、物联网技术等三方面专家组成，是一家专注于以3D为展现方式，解决物理空间关系的技术提供商，致力于成为全球领先3D可视化企业，为客户和合作伙伴全面提供3D可视化技术的服务，实现其业务的差异化竞争优势。</div>
            </div>
            <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>企业风采</div>
              <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}>
                {
                  this.state.imgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "30%", height: "30%", margin: "0 20px 20px 0" }}>
                        <img src={item} width="100%" height="100%" />
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
                  this.state.imgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "30%", height: "30%", margin: "0 20px 20px 0" }}>
                        <img src={item} width="100%" height="100%" />
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
                  this.state.imgList.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", width: "30%", height: "30%", margin: "0 20px 20px 0" }}>
                        <img src={item} width="100%" height="100%" />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default EnterpriseInformation;