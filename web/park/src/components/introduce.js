import React, { Component } from 'react'
import listcss from '../style/listArea.css'
import imgone from '../../src/image/imgone1.png';
import imgtwo from '../../src/image/imgone2.png';
import imgthree from '../../src/image/imgone3.png';
import imgfour from '../../src/image/imgone4.png';

export default class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className={listcss.introduceContent} >
        <p className={listcss.intrTit}>桂林市信息产业园</p>

        <div className={listcss.contentOne}>
          <p className={listcss.rowOne}>
            <span className={listcss.rowOnetit}>
              <span className="iconfont" style={{ "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" }} >&#xe80d;</span>
              园区概况
            </span>
          </p>
          <div className={listcss.pContent}>
            <p>
              桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
            <p>
              桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
          </div>
        </div>

        <div className={listcss.contentTwo}>
          <p className={listcss.rowOne}>
            <span className={listcss.rowOnetit}>
              <span className="iconfont" style={{ "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" }} >&#xe80d;</span>
              园区风采
            </span>
          </p>
          <p className={listcss.imgBox}>
            <img src={imgone} style={{ "padding": "0px 13px 0px 0px" }} />
            <img src={imgtwo} style={{ "padding": "0px 13px 0px 13px" }} />
            <img src={imgthree} style={{ "padding": "0px 13px 0px 13px" }} />
            <img src={imgfour} style={{ "padding": "0px 0px 0px 13px" }} />
          </p>
        </div>
      </div>
    )
  }
}
