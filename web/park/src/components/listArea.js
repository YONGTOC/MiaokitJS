import React, { Component } from 'react'
import listcss from '../style/listArea.css'
import '../style/iconfont.css'

import IntroduceArea from '../components/introduce'
import banner1 from '../../src/image/banner1.png';


import SuperiorityArea from '../components/superiority'

import { Tree, Icon } from 'antd';
const { TreeNode } = Tree;


export default class ListArea extends Component {


    constructor(props) {
        super(props)
        this.state = {
            index: "99",
            show: null,
            introduce: null,
            listArea: null,
            showBusiness: null,
            showCompany: null,
            treeList: null,
            roomList:"A座-4F-B412",
            companyList:"浙江永拓信息科技有限公司",
        }

        this.getRoom = this.getRoom.bind(this);
        this.getCompany = this.getCompany.bind(this);
    }

    componentDidupdate() {
        // console.log(this.state);
    }

    componentDidMount() {
        this.props.onRef(this)
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
            index: "99",
            introduce: null,
            superiority: null,
            listArea: null,
            treeList: null,
        })
    }
    getRoom(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getRoom', id )
    }

    getCompany(event) {
        const id = event.target.getAttribute("data-id");
        console.log('getCompany', id )
    }
    render() {
        return (
            <div>
                <div className={this.state.introduce == 1 ? listcss.introduce : listcss.hide}>
                    <div className={listcss.topTit} >
                        <img src={banner1} className={listcss.banner1} />
                        <div className={listcss.topSpan}>
                            <p className={listcss.introduceBG}></p>
                            <span className={listcss.topTTW}>园区介绍</span>
                            <span className={listcss.introduceClose} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>
                    </div>
                    <IntroduceArea />
                </div>

                <div className={this.state.superiority == 1 ? listcss.introduce : listcss.hide}>
                <div className={listcss.topTit} >
                        <img src={banner1} className={listcss.banner1} />
                        <div className={listcss.topSpan}>
                            <p className={listcss.introduceBG}></p>
                            <span className={listcss.topTTW}>区位优势</span>
                            <span className={listcss.introduceClose} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>
                    </div>
                    <SuperiorityArea />
                </div>


                <div className={this.state.listArea == 1 ? listcss.listArea : listcss.hide}>
                    {/* <p>{this.props.index}</p>
                <p>{this.state.show}</p> */}

                    <div className={this.state.showBusiness == 1 ? listcss.show : listcss.hide}>
                        <div className={listcss.topTit}>
                            <span className={listcss.topTT}>招商列表</span>
                            <span className={listcss.listAreaClose} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                            </span>
                        </div>

                        <div className={listcss.areaScope}>
                            <p className={listcss.areaScopeP} >筛选（面积）</p>
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
                        <div className={listcss.roomList} >
                            <ul>
                                <li className={listcss.roomP} onClick={this.getRoom}  data-id={this.state.roomList} >
                                    <p className={listcss.roomTit}   onClick={this.getRoom}  data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                                <li className={listcss.roomP} onClick={this.getRoom}  data-id={this.state.roomList} >
                                    <p className={listcss.roomTit}   onClick={this.getRoom}  data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                                <li className={listcss.roomP} onClick={this.getRoom}  data-id={this.state.roomList} >
                                    <p className={listcss.roomTit}   onClick={this.getRoom}  data-id={this.state.roomList}> A座-4F-B412</p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe805;</span>
                                        </span>
                                        &nbsp; 房间面积：<span>45m²</span></p>
                                    <p  onClick={this.getRoom}  data-id={this.state.roomList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe806;</span>
                                        </span>
                                        &nbsp; 发布时间：<span>2019-7-15</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={this.state.showCompany == 1 ? listcss.show : listcss.hide} >
                        <div className={listcss.topTit} >
                            <span className={listcss.topTT} >入驻企业</span>
                            <span className={listcss.listAreaClose} onClick={this.clickFun.bind(this, this.state.index)}>
                                <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>

                            </span>
                        </div>
                        <div className={listcss.areaScopeqy}>
                            <p className={listcss.areaScopeP}>企业分类</p>
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
                        <div className={listcss.roomList}>
                            <ul>
                                <li className={listcss.roomP} onClick={this.getCompany}  data-id={this.state.companyList} >
                                    <p className={listcss.roomTit} onClick={this.getCompany}  data-id={this.state.companyList}>浙江永拓信息科技有限公司</p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe807;</span>
                                        </span>
                                        &nbsp;公司位置：<span>E座B区-3F-301</span></p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe808;</span>
                                        </span>
                                        &nbsp;所属行业：<span>科技服务</span></p>
                                </li>
                                <li className={listcss.roomP} onClick={this.getCompany}  data-id={this.state.companyList} >
                                    <p className={listcss.roomTit} onClick={this.getCompany}  data-id={this.state.companyList}>浙江永拓信息科技有限公司</p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe807;</span>
                                        </span>
                                        &nbsp;公司位置：<span>E座B区-3F-301</span></p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe808;</span>
                                        </span>
                                        &nbsp;所属行业：<span>科技服务</span></p>
                                </li>
                                <li className={listcss.roomP} onClick={this.getCompany}  data-id={this.state.companyList} >
                                    <p className={listcss.roomTit} onClick={this.getCompany}  data-id={this.state.companyList}>浙江永拓信息科技有限公司</p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe807;</span>
                                        </span>
                                        &nbsp;公司位置：<span>E座B区-3F-301</span></p>
                                    <p onClick={this.getCompany}  data-id={this.state.companyList}>
                                        <span className={listcss.icontop3}>
                                            <span className="iconfont">&#xe808;</span>
                                        </span>
                                        &nbsp;所属行业：<span>科技服务</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={this.state.treeList == 1 ? listcss.treeList : listcss.hide}>
                    {/* <p>{this.props.index}</p> */}
                    <div className={listcss.topTittree} >
                        <span className={listcss.topTT}>桂林信息产业园</span>
                        <span className={listcss.treeClose} onClick={this.clickFun.bind(this, this.state.index)} >
                            <span className="iconfont" style={{ "fontSize": "12px" }}>&#xe803;</span>
                        </span>
                    </div>
                    <div className={listcss.treenode} >
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
}



