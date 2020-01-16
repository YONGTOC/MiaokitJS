import React, { Component } from 'react'
import styles from '../style/data.css'
import BaseData from '../components/baseData.js'
import MonitorData from '../components/monitorData.js'
import { Link } from 'react-router-dom'


export default class Data extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  

  render() {
    return (
      <div className={styles.data}>
        <div className={styles.dataTop}>
          <div className={styles.dataTitle} style={{float: "left", marginLeft: "3%", marginTop: "-5`px"}}>桂林信息产业园数据分析</div>
          <Link to="/"><div style={{float: "right", marginRight: "15px", color: "#FFFFFF"}}><Industry /></div></Link>
          <div style={{border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px"}}></div>
          <div style={{fontSize: "15px", color: "#FFFFFF", float: "right", marginRight: "12px"}}>12:10:20</div>
          <div style={{border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px"}}></div>
          <div style={{color: "#FFFFFF", fontSize: "15px", float: "right", marginRight: "12px"}}>20 °C</div>
          <div style={{float: "right", marginRight: "3px"}}><Sun /></div>
        </div>
        <div className={styles.baseData}><BaseData /></div>
        <div className={styles.monitorData}><MonitorData /></div>
      </div>
    )
  }
}

const Sun = () => 
<svg className="icon" aria-hidden="true">
<use xlinkHref="#iconyinzhuanqing"></use>
</svg>

const Industry = () => 
<svg className="icon" aria-hidden="true">
<use xlinkHref="#iconhangye"></use>
</svg>