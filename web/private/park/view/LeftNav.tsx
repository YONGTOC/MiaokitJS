import * as React from "react";
import "css!./styles/listArea.css";
import "css!./styles/iconfont.css";
import "css!./styles/leftNav.css";
import "css!./styles/listArea.css";

import { Tree, Icon } from 'antd';
const { TreeNode } = Tree;

class IntroduceArea extends React.Component {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className={"introduceContent"} >
                <p className={"intrTit"}>桂林市信息产业园</p>

                <div className={"contentOne"}>
                    <p className={"rowOne"}>
                        <span className={"rowOnetit"}>
                            <span className="iconfont" style={{ "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" }} >&#xe80d;</span>
                            园区概况
            </span>
                    </p>
                    <div className={"pContent"}>
                        <p>
                            桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
                        <p>
                            桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
                    </div>
                </div>

                <div className={"contentTwo"}>
                    <p className={"rowOne"}>
                        <span className={"rowOnetit"}>
                            <span className="iconfont" style={{ "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" }} >&#xe80d;</span>
                            园区风采
            </span>
                    </p>
                    <p className={"imgBox"}>
                        <img src={"./park/image/imgone1.png"} style={{ "padding": "0px 13px 0px 0px" }} />
                        <img src={"./park/image/imgone2.png"} style={{ "padding": "0px 13px 0px 13px" }} />
                        <img src={"./park/image/imgone3.png"} style={{ "padding": "0px 13px 0px 13px" }} />
                        <img src={"./park/image/imgone4.png"} style={{ "padding": "0px 0px 0px 13px" }} />
                    </p>
                </div>
            </div>
        );
    }
}

class SuperiorityArea extends React.Component {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className={"introduceContent"} >
                <p className={"intrTit"}>桂林市信息产业园</p>

                <div className={"contentOne"}>
                    <p className={"rowOne"}>
                        <span className={"rowOnetit"}>
                            <span className="iconfont" style={{ "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" }} >&#xe80d;</span>
                            区位优势
            </span>
                    </p>
                    <div className={"pContent"}>
                        <p>
                            桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
                        <p>
                            桂林国家高新区创意产业园是桂林市建设文化创意产业、软件、动漫、设计的重要支撑项目，总投资2.5亿元，用地117亩，建设12.5万平方米的软件产业功能区，包括软件外包、软件研发和生产、软件测试、软件产品展示和营销、软件人才培训以及动漫策划、制作、建筑设计、工业设计、环境设计等软件、动漫、设计三大功能区。桂林国家高新区创意产业园整体建成后，预计年产值20亿元，利税1.5亿元，新增就业岗位6000个，将成为在广西区内具有较大影响力的含软件、动漫、设计的创意产业基地，全面推动本地电子信息产业和创意产业的联动发展，促进桂林市工业结构升级。对符合条件的入驻企业，除享受国家和《桂林国家高新区关于加快推进创意产业发展的若干措施》中的政策外，还可享受税收和场租等优惠政策。
              </p>
                    </div>
                    <p>
                        <img src={"./park/image/imgmap1.png"} style={{ "paddingTop": "13px" }} />
                    </p>
                </div>

            </div>
        );
    }
}

class ListArea extends React.Component<{ index: any, onRef: any, indexC, getValuefromChild:any }> {
    public constructor(props) {
        super(props)

        this.getRoom = this.getRoom.bind(this);
        this.getCompany = this.getCompany.bind(this);
    }


    // 组件更新结束之后执行，在初始化render时不执行
    public componentDidupdate() {
        //console.log("xxxxx", this.state);
    }

    //  在第一次渲染后调用
    public componentDidMount() {
        //console.log("xxsssxxx", this.state);
        this.props.onRef(this);     //将child传递给this.props.onRef()方法
    }

  

    // Tree控件，选中
    public onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys[0]);
        // console.log('selected', selectedKeys, info);
    };

    // Tree控件，折叠展开
    public onExpand() {
        console.log('Trigger Expand');
    };

    // 通过点击左侧按钮，控制右侧详情区域显示
    public myindex(index) {
        console.log('child', index);
        // let index = index;
        // 1-园区介绍
        if (index == 1) {
            this.setState({
                show: "one",
                introduce: true,
                superiority: false,
                listArea: false,
                showBusiness: true,
                showCompany: false,
                treeList: false,
            })
            // 2-园区优势
        } else if (index == 2) {
            this.setState({
                show: "two",
                introduce: false,
                superiority: true,
                listArea: false,
                showBusiness: true,
                showCompany: false,
                treeList: false,
            })
        }
        // 3-招商列表
        else if (index == 3) {
            this.setState({
                show: "three",
                introduce: false,
                superiority: false,
                listArea: true,
                showBusiness: true,
                showCompany: false,
                treeList: false,
            })
            // 4-入驻企业
        } else if (index == 4) {
            this.setState({
                show: "four",
                introduce: false,
                superiority: false,
                listArea: true,
                showBusiness: false,
                showCompany: true,
                treeList: false,
            })
            // 10-显示顶端树形图
        } else if (index == 10) {
            this.setState({
                show: "ten",
                introduce: false,
                superiority: false,
                listArea: false,
                showBusiness: false,
                showCompany: false,
                treeList: true,
            })
        } else {
            this.setState({
                show: "no ",
                introduce: false,
                superiority: false,
                listArea: false,
                treeList: false,
            })
        }
    }

    // 点击列表/详情页 关闭，隐藏页面，并取消父组件高亮
    public clickFun(a) {
        this.props.indexC(a)//这个地方把值传递给了props的事件当中，调用父组件方法，修改父组件state;
        // console.log(this.state.index);
        this.setState({
            index: 99,
            introduce: false,    // 
            superiority: false,
            listArea: false,
            treeList: false,
        })
    }

    // 点击房间列表，获取房间id
    public getRoom(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getRoom', id)
    }

    // 点击公司列表，获取公司id
    public getCompany(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getCompany', id)
    }

  
    render() {

        return (
            <div>
                <div className={this.state.introduce == true ? "introduce" : "hide"}>
                    <div className={"topTit"} >
                        <img src={"./park/image/banner1.png"} className={"banner1"} />
                        <div className={"topSpan"}>
                            <p className={"introduceBG"}></p>
                            <span className={"topTTW"}>园区介绍</span>
                            <span className={"introduceClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>
                    </div>
                    <IntroduceArea />
                </div>

                <div className={this.state.superiority == true ? "introduce" : "hide"}>
                    <div className={"topTit"} >
                        <img src={"./park/image/banner1.png"} className={"banner1"} />
                        <div className={"topSpan"}>
                            <p className={"introduceBG"}></p>
                            <span className={"topTTW"}>区位优势</span>
                            <span className={"introduceClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>
                    </div>
                    <SuperiorityArea />
                </div>

                <div className={this.state.listArea == true ? "listArea" : "hide"}>
                    {/* <p>{this.props.index}</p>
                <p>{this.state.show}</p> */}
                    {/* 招商列表 */}
                    <div className={this.state.showBusiness == true ? "show" : "hide"}>
                        <div className={"topTit"}>
                            <span className={"topTT"}>招商列表</span>
                            <span className={"listAreaClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>
                        {/* 招商列表--右侧信息页 */}
                        <div className={"areaScope"}>
                            <p className={"areaScopeP"} >筛选（面积）</p>
                            <ul>
                                <li>全部</li>
                                <li>100m以下</li>
                                <li>100-200m</li>
                                <li>200-300m</li>
                                <li>300-500m</li>
                                <li>500-1000m</li>
                                <li>1000-2000m</li>
                                <li>2000m以下</li>
                            </ul>
                        </div>
                        <div className={"roomList"} >
                            <ul>
                                {this.state.roomList.map((i, index) => {
                                    return (
                                        <li className={"roomP"}>
                                            <p onClick={this.getRoom} data-id={i.roomID}>{i.roomName}</p>
                                            <p onClick={this.getRoom} data-id={i.roomID}>
                                                <span className={"icontop3"}>
                                                    <span className="iconfont">&#xe805;</span>
                                                </span>
                                                &nbsp; 房间面积：<span onClick={this.getRoom} data-id={i.roomID}>{i.roomArea} m²</span></p>
                                            <p onClick={this.getRoom} data-id={i.roomID}>
                                                <span className={"icontop3"}>
                                                    <span className="iconfont">&#xe806;</span>
                                                </span>
                                                &nbsp; 发布时间：<span>{i.addTime} </span></p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* 入驻企业 */}
                    <div className={this.state.showCompany == true ? "show" : "hide"} >
                        <div className={"topTit"} >
                            <span className={"topTT"} >入驻企业</span>
                            <span className={"listAreaClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>

                            </span>
                        </div>
                        {/* 入驻企业--右侧信息页 */}
                        <div className={"areaScopeqy"}>
                            <p className={"areaScopeP"}>企业分类</p>
                            <ul>
                                <li>全部</li>
                                {this.state.industryTypes.map((i, index) => {
                                    return (
                                        <li >{i.typeName}</li>
                                    )
                                })}

                            </ul>
                        </div>
                        <div className={"roomList"}>
                            <ul>
                                {this.state.companyList.map((i, index) => {
                                    return (
                                        <li className={"roomP"}  >
                                            <p onClick={this.getCompany} data-id={i.companyID} >{i.companyName}</p>
                                            <p onClick={this.getCompany} data-id={i.companyID} >
                                                <span className={"icontop3"}>
                                                    <span className="iconfont">&#xe807;</span>
                                                </span>
                                                &nbsp;公司位置：<span onClick={this.getCompany} data-id={i.companyID}>{i.address}</span></p>
                                            <p onClick={this.getCompany} data-id={i.companyID} >
                                                <span className={"icontop3"}>
                                                    <span className="iconfont">&#xe808;</span>
                                                </span>
                                                &nbsp;所属行业：<span>{i.type}</span></p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 顶部树形折叠部分 */}
                <div className={this.state.treeList == true ? "treeList" : "hide"}>
                    {/* <p>{this.props.index}</p> */}
                    <div className={"topTittree"} >
                        <span className={"topTT"}>桂林信息产业园</span>
                        <span className={"treeClose"} onClick={this.clickFun.bind(this, this.state.index)} >
                            <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                        </span>
                    </div>
                    <div className={"treenode"} >
                        <Tree
                            showLine
                            switcherIcon={<Icon type="down" />}
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={this.onSelect}
                        >
                            {this.state.equipmentList.map((i, index) => {
                                return (
                                    <TreeNode title={i.equipmentType} key={i.equipmentType} >
                                        {i.buildList.map((it, index) => {
                                            return (
                                                <TreeNode title={it.buildname} key={it.buildname}>
                                                    {it.areaList.map((ite, index) => {
                                                        return (
                                                            <TreeNode title={ite.areaName} key={ite.areaName} >
                                                                {ite.floorList.map((ites, index) => {
                                                                    return (
                                                                        <TreeNode title={ites.floorName} key={ites.floorName} >
                                                                            {ites.equipments.map((iteg, index) => {
                                                                                return (
                                                                                    <TreeNode title={iteg.equipmentName} key={iteg.equipmentName} />
                                                                                )
                                                                            })}
                                                                        </TreeNode>
                                                                    )
                                                                })}
                                                            </TreeNode>
                                                        )
                                                    })}
                                                </TreeNode>
                                            )
                                        })}
                                    </TreeNode>
                                )
                            })}
                        </Tree>
                    </div>

                </div>

            </div>

        )
    }

    public state = {
        index: 99,                      // 左侧栏高亮状态；1-园区介绍，2-园区优势；3-招商列表；4-入驻企业；99-未选中
        show: null,
        introduce: false,              // 园区介绍
        superiority: false,           // 园区优势
        listArea: false,              // 列表区域
        showBusiness: false,          // 招商列表
        showCompany: false,           // 入驻企业
        treeList: false,              //树形图
        // 设备列表-树形图
        equipmentList: [
            {
                "equipmentType": "IDC可视化监控系统",
                "equipmentID": "1",
                "buildList": [
                    {
                        "buildname": "A座",
                        "areaList": [
                            {
                                "areaName": "A区",
                                "floorList": [
                                    {
                                        "floorName": "A-1F",
                                        "equipments": [
                                            { "equipmentName": "机房1-A组列头柜" },
                                            { "equipmentName": "机房1-B组列头柜" },
                                        ]
                                    }
                                ]
                            },
                            {
                                "areaName": "B区",
                                "floorList": [
                                    {
                                        "floorName": "B-1F",
                                        "equipments": [
                                            { "equipmentName": "机房1-A组列头柜" },
                                            { "equipmentName": "机房1-B组列头柜" },
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }
        ],
        // 企业分类，行业类型
        industryTypes: [
            {
                "typeName": "文化创意",
                "typeID": "1",
            },
            {
                "typeName": "金融保险",
                "typeID": "2",
            },
            {
                "typeName": "科技服务",
                "typeID": "3",
            },
            {
                "typeName": "高新技术",
                "typeID": "4",
            },
            {
                "typeName": "电子产业",
                "typeID": "5",
            },
            {
                "typeName": "电子商务",
                "typeID": "6",
            }
        ],
        // roomList: 招商列表（房间信息）,
        roomList: [
            {
                "roomID": "id-A座-4F-B411",
                "roomName": "A座-4F-B411",
                "roomArea": "51",
                "addTime": "2019-7-11",
            },
            {
                "roomID": "id-A座-4F-B412",
                "roomName": "A座-4F-B412",
                "roomArea": "52",
                "addTime": "2019-7-15",
            },
        ],
        //  companyList: 入驻企业信息,
        companyList: [
            {
                "companyID": "id-浙江永拓信息科技有限公司",
                "companyName": "浙江永拓信息科技有限公司",
                "address": "E座B区-3F-301",
                "type": "科技服务"

            },
            {
                "companyID": "id-桂林银行",
                "companyName": "桂林银行",
                "address": "A座A区-1F-101",
                "type": "金融保险"
            },
        ],
    }
}

class LeftNav extends React.Component {
    public constructor(props) {
        super(props)

        this.indexC = this.indexC.bind(this);
    }

    //  在第一次渲染后调用
    public componentDidMount() {
        // Index父组件调用子组件的方法；
        this.props.leftNavFather(this);
        
    }

    //这是子组件的方法
    public getValuefromChild(a) {
        console.log("leftnav", a);
    };

    // 点击左侧图标，切换高亮
    public showList(index) {

        console.log('father2', index);
         
        if (index == 1) {
            this.setState({
                index: index,
                iconone: true,
                icontwo: false,
                iconthree: false,
                iconfour: false,
            });
            // 调用子组件显示相应区域
            this.child.myindex(index);
        } else if (index == 2) {
            this.setState({
                index: index,
                iconone: false,
                icontwo: true,
                iconthree: false,
                iconfour: false,
            });
            this.child.myindex(index);
        } else if (index == 3) {
            this.setState({
                index: index,
                iconone: false,
                icontwo: false,
                iconthree: true,
                iconfour: false,
            });
            this.child.myindex(index);
        } else if (index == 4) {
            this.setState({
                index: index,
                iconone: false,
                icontwo: false,
                iconthree: false,
                iconfour: true,
            });
            this.child.myindex(index);
        } else if (index == 10) {
            this.setState({
                index: index,
                iconone: false,
                icontwo: false,
                iconthree: false,
                iconfour: false,
            });
            this.child.myindex(index);
        }

    }

    // 提供方法，供子组件调用；
    public indexC(index) {
        console.log("indexC", index);
        this.setState({
            index: index
        });
    }

    // 点击详情页X关闭按钮，还原icon初始状态
    public indexCh(a) {
        console.log("indexCh", a);
        if (a == 99) {
            this.setState({
                index: a,
                iconone: false,
                icontwo: false,
                iconthree: false,
                iconfour: false,
            })
        } else {
            this.setState({
                index: a,
            })
        }
    }

    // 获取子组件全部信息，包括状态和方法;并且可以调用子组件函数
    public onRef = (ref) => {
        console.log("onRefref", ref)
        this.child = ref
    }

    //public treeRef = (ref) => {
    //    console.log("treeRef", ref)
    //    console.log(ref)
    //    this.child = ref
    //}

    render() {
        console.log(this.state);
        return (
            <div>
                <div className={"tree"} onClick={this.showList.bind(this, 10)}>
                    <div className={"stree"} >
                        <span className="iconfont" style={{ "fontSize": "14px" }}>&#xe809;</span>
                        &nbsp; 桂林信息产业园
                    </div>
                </div>
                <div className={"leftNav"}>
                    <div className={"leftBG"}></div>
                    <ul className={"leftul"}>
                        <li onClick={this.showList.bind(this, 1)} className={this.state.iconone == true ? "iconit" : "iconun"}>
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fa;</span>
                            <p>园区介绍</p>
                        </li>
                        <li onClick={this.showList.bind(this, 2)} className={this.state.icontwo == true ? "iconit" : "iconun"}>
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fb;</span>
                            <p>区域优势</p>
                        </li>
                        <li onClick={this.showList.bind(this, 3)} className={this.state.iconthree == true ? "iconit" : "iconun"}>
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fc;</span>
                            <p>招商列表</p>
                        </li>
                        <li onClick={this.showList.bind(this, 4)} className={this.state.iconfour == true ? "iconit" : "iconun"}>
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fd;</span>
                            <p>入驻企业</p>
                        </li>
                    </ul>
                </div>

                <ListArea index={this.state.index} indexC={this.indexCh.bind(this)} onRef={this.onRef} />
            </div >
        )
    }


    public child = null;

    public state = {
        index: 99,
        iconone: false,
        icontwo: false,
        iconthree: false,
        iconfour: false,
        aIcon: [
            { "iconone": false },
            { "icontwo": false },
            { "iconthree": false },
            { "iconfour": false },
        ]
    }

}

export default LeftNav;


