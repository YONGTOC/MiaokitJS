import * as React from "react";
import "css!./styles/listArea.css"
import "css!./styles/iconfont.css"
import "css!./styles/leftNav.css"

import { Tree, Icon } from 'antd';
const { TreeNode } = Tree;

class IntroduceArea extends React.Component {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (<div />);
    }
}

class SuperiorityArea extends React.Component {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (<div />);
    }
}

class ListArea extends React.Component<{ index: any, onRef: any, indexC }> {
    public constructor(props) {
        super(props)

        this.getRoom = this.getRoom.bind(this);
        this.getCompany = this.getCompany.bind(this);
    }

    public componentDidupdate() {
        //console.log("xxxxx", this.state);
    }

    public componentDidMount() {
        //console.log("xxsssxxx", this.state);
        this.props.onRef(this);
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys[0]);
        // console.log('selected', selectedKeys, info);
    };


    onExpand = () => {
        console.log('Trigger Expand');
    };
    myindex = (index) => {
        //  console.log('child',index);
        // let index = index;
        if (index == 1) {
            this.setState({
                show: "three ",
                introduce: 1,
                superiority: null,
                listArea: null,
                showBusiness: 1,
                showCompany: null,
                treeList: null,
            })
        } else if (index == 2) {
            this.setState({
                show: "two ",
                introduce: null,
                superiority: 1,
                listArea: null,
                showBusiness: 1,
                showCompany: null,
                treeList: null,
            })
        }
        else if (index == 3) {
            this.setState({
                show: "three ",
                introduce: null,
                superiority: null,
                listArea: 1,
                showBusiness: 1,
                showCompany: null,
                treeList: null,
            })
        } else if (index == 4) {
            console.log(44444)
            this.setState({
                show: "four ",
                introduce: null,
                superiority: null,
                listArea: 1,
                showBusiness: null,
                showCompany: 1,
                treeList: null,
            })
        } else if (index == 10) {
            this.setState({
                show: "four ",
                introduce: null,
                superiority: null,
                listArea: null,
                showBusiness: null,
                showCompany: null,
                treeList: 1,
            })
        } else {
            this.setState({
                show: "no ",
                introduce: null,
                superiority: null,
                listArea: null,
                treeList: null,
            })
        }
    }

    clickFun(a) {
        this.props.indexC(a)//这个地方把值传递给了props的事件当中
        // console.log(this.state.index);
        this.setState({
            index: 99,
            introduce: null,
            superiority: null,
            listArea: null,
            treeList: null,
        })
    }
    getRoom(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getRoom', id)
    }

    getCompany(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getCompany', id)
    }
    render() {
        return (
            <div>
                <div className={this.state.introduce == 1 ? "introduce" : "hide"}>
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

                <div className={this.state.superiority == 1 ? "introduce" : "hide"}>
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


                <div className={this.state.listArea == 1 ? "listArea" : "hide"}>
                    {/* <p>{this.props.index}</p>
                <p>{this.state.show}</p> */}

                    <div className={this.state.showBusiness == 1 ? "show" : "hide"}>
                        <div className={"topTit"}>
                            <span className={"topTT"}>招商列表</span>
                            <span className={"listAreaClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>

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
                                <li className={"roomP"} onClick={this.getRoom} data-id={this.state.roomList} >
                                    <p className={"roomTit"} onClick={this.getRoom} data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                                <li className={"roomP"} onClick={this.getRoom} data-id={this.state.roomList} >
                                    <p className={"roomTit"} onClick={this.getRoom} data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                                <li className={"roomP"} onClick={this.getRoom} data-id={this.state.roomList} >
                                    <p className={"roomTit"} onClick={this.getRoom} data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p onClick={this.getRoom} data-id={this.state.roomList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={this.state.showCompany == 1 ? "show" : "hide"} >
                        <div className={"topTit"} >
                            <span className={"topTT"} >入驻企业</span>
                            <span className={"listAreaClose"} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>

                            </span>
                        </div>
                        <div className={"areaScopeqy"}>
                            <p className={"areaScopeP"}>企业分类</p>
                            <ul>
                                <li>全部</li>
                                <li>文化创意</li>
                                <li>金融保险</li>
                                <li>科技服务</li>
                                <li>高新技术</li>
                                <li>电子产业</li>
                                <li>电子商务</li>
                            </ul>
                        </div>
                        <div className={"roomList"}>
                            <ul>
                                <li className={"roomP"} onClick={this.getCompany} data-id={this.state.companyList} >
                                    <p className={"roomTit"} onClick={this.getCompany} data-id={this.state.companyList}>浙江永拓信息科技有限公司</p>
                                    <p onClick={this.getCompany} data-id={this.state.companyList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe807;</span>
                                        </span>
                                        &nbsp;公司位置：<span>E座B区-3F-301</span></p>
                                    <p onClick={this.getCompany} data-id={this.state.companyList}>
                                        <span className={"icontop3"}>
                                            <span className="iconfont">&#xe808;</span>
                                        </span>
                                        &nbsp;所属行业：<span>科技服务</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={this.state.treeList == 1 ? "treeList" : "hide"}>
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
                            <TreeNode title="IDC可视化监控系统" key="IDC可视化监控系统">
                                <TreeNode title="1F" key="1F">
                                    <TreeNode title="机房1" key="机房1" >
                                        <TreeNode title="机房1-A组列头柜" key="机房1-A组列头柜" />
                                        <TreeNode title="机房1-B组列头柜" key="机房1-B组列头柜" />
                                    </TreeNode>
                                    <TreeNode title="机房2" key="机房2" />
                                    <TreeNode title="机房3" key="机房3" />
                                    <TreeNode title="监控室" key="监控室" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </div>

                </div>


            </div>



        )
    }
    
    public state = {
        index: 99,
        show: null,
        introduce: null,
        superiority: null,
        listArea: null,
        showBusiness: null,
        showCompany: null,
        treeList: null,
        roomList: "A座-4F-B412",
        companyList: "浙江永拓信息科技有限公司",
    }
}

class LeftNav extends React.Component {
    public constructor(props) {
        super(props)

        this.indexC = this.indexC.bind(this);
    }

    public showList(index) {
        console.log('father', index)

        if (index == 1) {
            this.setState({
                index: index,
                iconone: 1,
                icontwo: null,
                iconthree: null,
                iconfour: null,
            });
            this.child.myindex(index);
        } else if (index == 2) {
            this.setState({
                index: index,
                iconone: null,
                icontwo: 1,
                iconthree: null,
                iconfour: null,
            });
            this.child.myindex(index);
        } else if (index == 3) {
            this.setState({
                index: index,
                iconone: null,
                icontwo: null,
                iconthree: 1,
                iconfour: null,
            });
            this.child.myindex(index);
        } else if (index == 4) {
            this.setState({
                index: index,
                iconone: null,
                icontwo: null,
                iconthree: null,
                iconfour: 1,
            });
            this.child.myindex(index);
        } else if (index == 10) {
            this.setState({
                index: index,
                iconone: null,
                icontwo: null,
                iconthree: null,
                iconfour: null,
            });
            this.child.myindex(index);
        }

    }

    indexC(index) {
        this.setState({
            index: index
        });
    }

    indexCh(a) {
        console.log(a);
        if (a == 99) {
            this.setState({
                index: a,
                iconone: null,
                icontwo: null,
                iconthree: null,
                iconfour: null,
            })
        } else {
            this.setState({
                index: a,
            })
        }
    }

    onRef = (ref) => {
        console.log(ref)
        this.child = ref
    }

    treeRef = (ref) => {
        console.log(ref)
        this.child = ref
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className={"tree"} onClick={this.showList.bind(this, 10)}>
                    <div className={"stree"} >
                        {/* <span className='icon iconfont iconshuzhuangtu ' style={{ "fontSize": "14px", "position": "relative", "top": "-2px" }}></span> */}
                        <span className="iconfont" style={{ "fontSize": "14px" }}>&#xe809;</span>
                        &nbsp; 桂林信息产业园
                    </div>
                </div>
                <div className={"leftNav"}>
                    <div className={"leftBG"}></div>
                    <ul className={"leftul"}>
                        {/* <li>{this.state.index}</li> */}
                        <li onClick={this.showList.bind(this, 1)} className={this.state.iconone == 1 ? "iconit" : "iconun"}>
                            {/* <span className='icon iconfont iconyuanqujieshao'  style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fa;</span>
                            <p>园区介绍</p>
                        </li>
                        <li onClick={this.showList.bind(this, 2)} className={this.state.icontwo == 1 ? "iconit" : "iconun"}>
                            {/* <span className="icon iconfont iconquweiyoushi" style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fb;</span>
                            <p>区域优势</p>
                        </li>
                        <li onClick={this.showList.bind(this, 3)} className={this.state.iconthree == 1 ? "iconit" : "iconun"}>
                            {/* <span className="icon iconfont iconzhaoshangliebiao" style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fc;</span>
                            <p>招商列表</p>
                        </li>
                        <li onClick={this.showList.bind(this, 4)} className={this.state.iconfour == 1 ? "iconit" : "iconun"}>
                            {/* <span className="icon iconfont iconruzhuqiye" style={{"fontSize": "25px"}}></span> */}
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
        iconone: null,
        icontwo: null,
        iconthree: null,
        iconfour: null,
    }
}

export default LeftNav;
