import React, { Component } from 'react'
import leftcss from '../style/leftNav.css'

import '../style/iconfont.css'

import ListArea from '../components/listArea'


export default class LeftNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: '',
            iconone: null,
            icontwo: null,
            iconthree: null,
            iconfour: null,
        }

        this.indexC = this.indexC.bind();

    }

    showList = (index) => {
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
        return (
            <div>
                <div className={leftcss.tree} onClick={this.showList.bind(this, 10)}>
                    <div className={leftcss.stree} >
                        {/* <span className='icon iconfont iconshuzhuangtu ' style={{ "fontSize": "14px", "position": "relative", "top": "-2px" }}></span> */}
                        <span className="iconfont" style={{ "fontSize": "14px" }}>&#xe809;</span>
                        &nbsp; 桂林信息产业园
                    </div>
                </div>
                <div className={leftcss.leftNav}>
                    <div className={leftcss.leftBG}></div>
                    <ul className={leftcss.leftul}>
                        {/* <li>{this.state.index}</li> */}
                        <li onClick={this.showList.bind(this, 1)} className={this.state.iconone == 1 ? leftcss.iconit : leftcss.iconun}>
                            {/* <span className='icon iconfont iconyuanqujieshao'  style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fa;</span>
                            <p>园区介绍</p>
                        </li>
                        <li onClick={this.showList.bind(this, 2)} className={this.state.icontwo == 1 ? leftcss.iconit : leftcss.iconun}>
                            {/* <span className="icon iconfont iconquweiyoushi" style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fb;</span>
                            <p>区域优势</p>
                        </li>
                        <li onClick={this.showList.bind(this, 3)} className={this.state.iconthree == 1 ? leftcss.iconit : leftcss.iconun}>
                            {/* <span className="icon iconfont iconzhaoshangliebiao" style={{"fontSize": "25px"}}></span> */}
                            <span className="iconfont" style={{ "fontSize": "25px" }}>&#xe7fc;</span>
                            <p>招商列表</p>
                        </li>
                        <li onClick={this.showList.bind(this, 4)} className={this.state.iconfour == 1 ? leftcss.iconit : leftcss.iconun}>
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
}



