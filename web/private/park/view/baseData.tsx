import * as React from "react";
import "css!./styles/view.css";


import { StackArea } from 'g2plot';



const data = [
    {
        country: '国王',
        month: '1月',
        value: 30,
    },
    {
        country: '国王',
        month: '2月',
        value: 50,
    },
    {
        country: '国王',
        month: '3月',
        value: 80,
    },
    {
        country: '国王',
        month: '4月',
        value: 100,
    },
    {
        country: '国王',
        month: '5月',
        value: 80,
    },
    {
        country: '国王',
        month: '6月',
        value: 50,
    },
    {
        country: '国王',
        month: '7月',
        value: 30,
    },
    {
        country: '皇后',
        month: '1月',
        value: 20,
    },
    {
        country: '皇后',
        month: '2月',
        value: 60,
    },
    {
        country: '皇后',
        month: '3月',
        value: 120,
    },
    {
        country: '皇后',
        month: '4月',
        value: 70,
    },
    {
        country: '皇后',
        month: '5月',
        value: 50,
    },
    {
        country: '皇后',
        month: '6月',
        value: 30,
    },
    {
        country: '皇后',
        month: '7月',
        value: 20,
    },
];

interface IProps {
 
}

interface IState {
    baseData: Array<any>
}






class BaseData extends React.Component<IProps, IState> {
    public readonly state: Readonly<IState> = {
        baseData: [{ name: "建筑总面积", number: "95,000", unit: "平方米", img: "./park/image/baseData/architecture.png" }, { name: "入驻企业", number: "150", unit: "家", img: "./park/image/baseData/enterprise.png" },
            { name: "园内人员", number: "6,000", unit: "人", img: "./park/image/baseData/personnel.png" }, { name: "摄像监控", number: "900", unit: "台", img: "./park/image/baseData/monitoring.png" },
            { name: "智能设备", number: "2,600", unit: "台", img: "./park/image/baseData/equipment.png" }, { name: "停车位", number: "600", unit: "个", img: "./park/image/baseData/car.png" }], // 基础数据
    }
    


    componentDidMount() {
        const areaPlot = new StackArea(document.getElementById('curve'), {
            data,
            xField: 'month',
            yField: 'value',
            stackField: 'country',
            xAxis: {
                grid: {
                    visible: true
                }
            },
            label: {
                visible: true
            },
            smooth: true,
            legend: {
                visible: false,
                position: 'right-top'
            }
        });
        areaPlot.render();
    }


    render() {
        return (
            <div className="base-data">
                <div style={{ marginTop: "20px", marginLeft: "25px" }}>
                    <div style={{
                        borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                        float: "left", marginTop: "4px", marginRight: "5px"
                    }}>
                    </div>
                    <span style={{ color: "#FFFFFF", fontSize: "16px" }}>基本数据统计</span>
                </div>
                {
                    this.state.baseData.map((item, index) => {
                        return <div className="base-option" key={index}>
                            <img src={item.img} width="45px" height="45px" style={{ float: "left", marginTop: "3px" }} />
                            <div style={{ float: "left", marginLeft: "18px" }}>
                                <span className="base-span-a">{item.name}</span>
                                <br />
                                <span className="base-span-b">{item.number}</span>
                                <span className="base-span-c">{item.unit}</span>
                            </div>
                        </div>
                    })
                }
                <div style={{ color: "#FFFFFF", marginLeft: "35px" }}>
                    <div style={{ fontSize: "12px", float: "left" }}>园区月创造GDP</div>
                    <div style={{ fontSize: "12px", marginLeft: "10px", float: "left" }}>(百万)</div>
                    <div style={{
                        borderTop: "2px solid #07D1D3", width: "10px", height: "3px", float: "left", opacity: 1,
                        marginLeft: "50px", marginTop: "8px"
                    }}></div>
                    <div style={{ float: "left", fontSize: "6px", marginLeft: "5px" }}>当前值</div>
                    <div style={{
                        borderTop: "2px solid #229FCE", width: "10px", height: "3px", float: "left", opacity: 1,
                        marginLeft: "10px", marginTop: "8px"
                    }}></div>
                    <div style={{ float: "left", fontSize: "6px", marginLeft: "5px" }}>标准值</div>
                </div>
                <div id="curve" style={{ width: "350px", height: "260px", marginLeft: "12px" }}>

                </div>
            </div>
        )
    }
}


export default BaseData;