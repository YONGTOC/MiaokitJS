import * as React from "react";
import "css!./styles/data.css";
import { Link } from 'react-router-dom';

import { Line } from 'g2plot';

class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //  在第一次渲染后调用
    public componentDidMount() {
        console.log("ddddddddddd");

        const data = [
            { year: '1991', value: 3 },
            { year: '1992', value: 4 },
            { year: '1993', value: 3.5 },
            { year: '1994', value: 5 },
            { year: '1995', value: 4.9 },
            { year: '1996', value: 6 },
            { year: '1997', value: 7 },
            { year: '1998', value: 9 },
            { year: '1999', value: 13 },
        ];

        const linePlot = new Line('canvas', {
            data,
            xField: 'year',
            yField: 'value',
        });

        linePlot.render();
    }

    render() {

        //<div className={"baseData"}><BaseData /></div>
        //    <div className={"monitorData"}><MonitorData /></div>
        return (
            <div className={"data"}>
                <div className={"dataTop"}>
                    <div className={"dataTitle"} style={{ float: "left", marginLeft: "3%", marginTop: "-5`px", color: "#FFFFFF"}}>桂林信息产业园数据分析</div>
                    <Link to="/"><div style={{ float: "right", marginRight: "15px", color: "#FFFFFF" }}><Industry /></div></Link>
                    <div style={{ border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" }}></div>
                    <div style={{ fontSize: "15px", color: "#FFFFFF", float: "right", marginRight: "12px" }}>12:10:20</div>
                    <div style={{ border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" }}></div>
                    <div style={{ color: "#FFFFFF", fontSize: "15px", float: "right", marginRight: "12px" }}>20 °C</div>
                    <div style={{ float: "right", marginRight: "3px" }}><Sun /></div>
                </div>

             
                <div id="canvas">

                </div>

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


