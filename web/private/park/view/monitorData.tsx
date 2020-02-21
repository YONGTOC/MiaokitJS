import * as React from "react";
import "css!./styles/monitorData.css";
import { Ring, Area } from "g2plot";


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
        value: 10,
    },
];


const brokenLineData = [
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

const htmlcontent = { name: "总量", value: "100 %" };

interface IProps {

}

interface IState {
    monitorData: Array<any>,
    infoData: Array<any>
}

export default class MonitorData extends React.Component<IProps, IState> {
   
    public readonly state: Readonly<IState> = {
        monitorData: [
            { name: "房间面积", allTag: "总面积", allNumber: "20,000", usingTag: "已使用", usingNumber: "5,000", remainTag: "剩余", remainNumber: "15,000", unit: "(㎡)" },
            { name: "功耗统计", allTag: "总功耗", allNumber: "2,600", usingTag: "已使用", usingNumber: "2,000", remainTag: "剩余", remainNumber: "600", unit: "(kw)" },
            { name: "车位", allTag: "总车位", allNumber: "600", usingTag: "已使用", usingNumber: "300", remainTag: "剩余", remainNumber: "300", unit: "(个)" }
        ],
        infoData: [
            { name: "今日用水量", number: "200", unit: "吨", img: "./park/image/monitorData/water.png" },
            { name: "今日用电量", number: "1200", unit: "度", img: "./park/image/monitorData/electricity.png" }]
    }
            
        


    componentDidMount() {
        const areaPlot = new Area(document.getElementById('brokenLine'), {
            forcefit: true,
            padding: [0, 0, 0, 0],
            data: brokenLineData,
            xField: 'month',
            yField: 'value',
            xaxis: {
                type: 'datetime',
                tickcount: 5,
            },
        });

        const ringPlot0 = new Ring(document.getElementById('loop0'), {
            forceFit: true,
            padding: [0, 0, 0, 0],
            data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: false
            },
            legend: {
                visible: false
            },
            statistic: {
                visible: true,
                htmlcontent: htmlcontent,
                triggeron: '',
                triggeroff: ''
            }
        });

        const ringPlot1 = new Ring(document.getElementById('loop0'), {
            forceFit: true,
            padding: [0, 0, 0, 0],
            data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: false
            },
            legend: {
                visible: false
            },
            statistic: {
                visible: true,
                htmlcontent: htmlcontent,
                triggeron: '',
                triggeroff: ''
            }
        });

        const ringPlot2 = new Ring(document.getElementById('loop0'), {
            forceFit: true,
            padding: [0, 0, 0, 0],
            data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: false
            },
            legend: {
                visible: false
            },
            statistic: {
                visible: true,
                htmlcontent: htmlcontent,
                triggeron: '',
                triggeroff: ''
            }
        });

        areaPlot.render();

        ringPlot0.render();
        ringPlot1.render();
        ringPlot2.render();
       
    }

    render() {
        return (
            <div className="monitor-data">
                <div style={{ marginTop: "20px", marginLeft: "25px" }}>
                    <div style={{
                        borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                        float: "left", marginTop: "4px", marginRight: "5px"
                    }}>
                    </div>
                    <span style={{ color: "#FFFFFF", fontSize: "16px" }}>智能数据监控</span>
                </div>
                {
                    this.state.monitorData.map((item, index) => {
                        return <div style={{ width: "80%", height: "120px", marginLeft: "35px", marginTop: "15px" }} key={index}>
                            <div style={{ width: "53%", height: "100%", float: "left" }}>
                                <span className="span-a">{item.name + item.unit}</span>
                                <br />
                                <div style={{ width: "70px", height: "50px", float: "left" }}>
                                    <span className="span-b">{item.allTag + item.unit}</span>
                                    <br />
                                    <span className="span-c">{item.allNumber}</span>
                                </div>
                                <div style={{ width: "70px", height: "50px", float: "right" }}>
                                    <span className="span-b">{item.usingTag + item.unit}</span>
                                    <br />
                                    <span className="span-c">{item.usingNumber}</span>
                                </div>
                                <div style={{ overflow: "hidden", width: "100%" }}>
                                    <span className="span-b">{item.remainTag + item.unit}</span>
                                    <br />
                                    <span className="span-c">{item.remainNumber}</span>
                                </div>
                            </div>
                            <div style={{ float: "right", width: "47%", height: "100%", top: "10px" }} id={"loop" + index}>
                            </div>
                        </div>
                    })
                }
                <div style={{ marginTop: "20px", marginLeft: "25px" }}>
                    <div style={{
                        borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                        float: "left", marginTop: "4px", marginRight: "5px"
                    }}>
                    </div>
                    <span style={{ color: "#FFFFFF", fontSize: "16px" }}>水电信息统计</span>
                </div>
                {
                    this.state.infoData.map((item, index) => {
                        return <div className={index === 0 ? "add-option" : "option"} key={index}>
                            <img src={item.img} width="45px" height="45px" style={{ float: "left", marginTop: "3px" }} />
                            <div style={{ float: "left", marginLeft: "18px" }}>
                                <span className="span-d">{item.name}</span>
                                <br />
                                <span className="span-e">{item.number}</span>
                                <span className="span-f">{item.unit}</span>
                            </div>
                        </div>
                    })
                }
                <div id="container"></div>

                <div id="brokenLine" style={{ width: "300px", height: "120px", overflow: "hidden", marginLeft: "35px" }}></div>
                <div className="electricity-view">
                    <div className="span-g">企业今日平均用水量</div>
                    <div className="span-h">6</div>
                </div>
                <div className="water-view">
                    <div className="span-g">企业今日平均用电量</div>
                    <div className="span-h">2</div>
                </div>
            </div>
        )
    }
}