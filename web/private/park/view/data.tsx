import * as React from "react";
import "css!./styles/data.css";
import BaseData from "./baseData";
import MonitorData from "./monitorData";
import { Link } from 'react-router-dom';



class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //  在第一次渲染后调用
    public componentDidMount() {
    }

    render() {
        return (
            <div className="data">
                <div className="data-top">
                    <div className="data-title" style={{ float: "left", marginLeft: "3%", marginTop: "-5px" }}>桂林信息产业园数据分析</div>
                    <Link to="/"><div style={{ float: "right", marginRight: "15px", color: "#FFFFFF" }}><Industry /></div></Link>
                    <div style={{ border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" }}></div>
                    <div style={{ fontSize: "15px", color: "#FFFFFF", float: "right", marginRight: "12px" }}>12:10:20</div>
                    <div style={{ border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" }}></div>
                    <div style={{ color: "#FFFFFF", fontSize: "15px", float: "right", marginRight: "12px" }}>20 °C</div>
                    <div style={{ float: "right", marginRight: "3px" }}><Sun /></div>
                </div>

                <div className="base-data"><BaseData /></div>
                <div className="monitor-data"><MonitorData /></div>

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

export default Data;