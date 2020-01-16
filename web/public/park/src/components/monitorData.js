import React, { Component } from 'react'
import styles from '../style/monitorData.css'
import { Ring, Area } from '@antv/g2plot';

const requireContext = require.context("../image/monitorData", true, /^\.\/.*\.png$/);
const images = requireContext.keys().map(requireContext);

const data = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其它',
    value: 50,
  },
];


const brokenLineData  = [
  {
    month: '1月',
    value: 30,
  },
  {
    month: '2月',
    value: 50,
  },
  {
    month: '3月',
    value: 80,
  },
  {
    month: '4月',
    value: 100,
  },
  {
    month: '5月',
    value: 80,
  },
  {
    month: '6月',
    value: 50,
  },
  {
    month: '7月',
    value: 30,
  },
  {
    month: '1月',
    value: 20,
  },
  {
    month: '2月',
    value: 60,
  },
  {
    month: '3月',
    value: 120,
  },
  {
    month: '4月',
    value: 70,
  },
  {
    month: '5月',
    value: 50,
  },
  {
    month: '6月',
    value: 30,
  },
  {
    month: '7月',
    value: 20,
  },
];


export default class MonitorData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monitorData: [
        {name: "房间面积", allTag: "总面积", allNumber: "20,000", usingTag: "已使用", usingNumber: "5,000", remainTag: "剩余", remainNumber: "15,000", unit: "(㎡)"}, 
        {name: "功耗统计", allTag: "总功耗", allNumber: "2,600", usingTag: "已使用", usingNumber: "2,000", remainTag: "剩余", remainNumber: "600", unit: "(kw)"}, 
        {name: "车位", allTag: "总车位", allNumber: "600", usingTag: "已使用", usingNumber: "300", remainTag: "剩余", remainNumber: "300", unit: "(个)"}
      ],
      infoData: [
        {name: "今日用水量", number: "200", unit: "吨", img: 'water'}, 
        {name: "今日用电量", number: "1200", unit: "度", img: 'electricity'}]
    }
  }

  componentDidMount() {
    let infoData = this.state.infoData
    infoData.forEach((item, index) => {
      requireContext.keys().forEach((it, ind) => {
        if (it.substring(2, it.length - 4) === item.img) {
          item.img = images[ind].default
        }
      })
    })
    this.setState({infoData: infoData})

    const htmlContent = function() {
      return '<div style="color: #FFFFFF">100%</div>'
    }
    const ringPlot0 = new Ring(document.getElementById('loop0'), {
      forceFit: true,
      data,
      angleField: 'value',
      colorField: 'type',
      padding: [0, 0, 0, 0],
      label: {
        visible: false
      },
      legend: {
        visible: false
      },
      statistic: {
        visible: true,
        htmlContent: htmlContent,
        triggerOn: '',
        triggerOff: ''
      },
    });

    const ringPlot1 = new Ring(document.getElementById('loop1'), {
      forceFit: true,
      data,
      angleField: 'value',
      colorField: 'type',
      padding: [0, 0, 0, 0],
      label: {
        visible: false
      },
      legend: {
        visible: false
      },
      statistic: {
        visible: true,
        htmlContent: htmlContent,
        triggerOn: '',
        triggerOff: ''
      },
    });

    const ringPlot2 = new Ring(document.getElementById('loop2'), {
      forceFit: true,
      data,
      angleField: 'value',
      colorField: 'type',
      padding: [0, 0, 0, 0],
      label: {
        visible: false
      },
      legend: {
        visible: false
      },
      statistic: {
        visible: true,
        htmlContent: htmlContent,
        triggerOn: '',
        triggerOff: ''
      },
    });

    const areaPlot = new Area(document.getElementById('brokenLine'), {
      forceFit: true,
      padding: [0, 0, 0, 0],
      data: brokenLineData,
      xField: 'month',
      yField: 'value',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
    });

    areaPlot.render();

    ringPlot0.render();
    ringPlot1.render();
    ringPlot2.render();
  }
  
  render() {
    return (
      <div className={styles.monitorData}>
        <div style={{marginTop: "20px", marginLeft: "25px"}}>
          <div style={{borderLeft: "2px solid #07D1D3", height: "16px", width: "2px", 
          float: "left", marginTop: "4px", marginRight: "5px"}}>
          </div>
          <span style={{color: "#FFFFFF", fontSize: "16px"}}>智能数据监控</span>
        </div>
        {
          this.state.monitorData.map((item, index) => {
          return  <div style={{width: "80%", height: "120px", marginLeft: "35px", marginTop: "15px"}} key={index}>
                    <div style={{width: "53%", height: "100%",  float: "left"}}>
                      <span className={styles.spanA}>{item.name + item.unit}</span>
                      <br />
                      <div style={{width: "70px", height: "50px", float: "left"}}>
                        <span className={styles.spanB}>{item.allTag + item.unit}</span>
                        <br />
                        <span className={styles.spanC}>{item.allNumber}</span>
                      </div>
                      <div style={{width: "70px", height: "50px", float: "right"}}>
                        <span className={styles.spanB}>{item.usingTag + item.unit}</span>
                        <br />
                        <span className={styles.spanC}>{item.usingNumber}</span>
                      </div>
                      <div style={{overflow: "hidden", width: "100%"}}>
                        <span className={styles.spanB}>{item.remainTag + item.unit}</span>
                        <br />
                        <span className={styles.spanC}>{item.remainNumber}</span>
                      </div>
                    </div>
                    <div style={{float: "right", width: "47%", height: "100%", top: "10px"}} id={"loop" + index}>
                    </div>
                  </div>
          })
        }
        <div style={{marginTop: "20px", marginLeft: "25px"}}>
          <div style={{borderLeft: "2px solid #07D1D3", height: "16px", width: "2px", 
          float: "left", marginTop: "4px", marginRight: "5px"}}>
          </div>
          <span style={{color: "#FFFFFF", fontSize: "16px"}}>水电信息统计</span>
        </div>
        {
          this.state.infoData.map((item, index) => {
          return <div className={index === 0? styles.addOption: styles.option} key={index}>
                    <img src={item.img} width="45px" height= "45px" style={{float: "left", marginTop: "3px"}} />
                    <div style={{float: "left", marginLeft: "18px"}}>
                      <span className={styles.spanD}>{item.name}</span>
                      <br />
                      <span className={styles.spanE}>{item.number}</span>
                      <span className={styles.spanF}>{item.unit}</span>
                    </div>
                  </div>
          })
        }
        <div id="brokenLine" style={{width: "300px", height: "120px", overflow: "hidden", marginLeft: "35px"}}></div>
        <div className={styles.electricityView}>
          <div className={styles.spanG}>企业今日平均用水量</div>
          <div className={styles.spanH}>6</div>
        </div>
        <div className={styles.waterView}>
          <div className={styles.spanG}>企业今日平均用电量</div>
          <div className={styles.spanH}>2</div>
        </div>
      </div>
    )
  }
}
