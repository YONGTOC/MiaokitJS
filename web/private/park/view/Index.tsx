import * as React from "react";
import * as ReactDOM from "react-dom";

//import * as ReactRouter  from 'react-router';
import * as RouterDOM from 'react-router-dom';

import TopNav from "topNav";
import LeftNav from "leftNav";
import IconView from "iconView";
import Data from "data";


import "css!./styles/index.css"




class Index extends React.Component {
    constructor(props) {
        super(props);
        this.toggleShare = this.toggleShare.bind(this);

        Index.g_pIns = this;
    }

    // 
    public static g_pIns: Index = null;

    // 分享
    toggleShare = (e) => {
        this.setState({ isShare: !this.state.isShare })
    }

    // 全屏
    fullScreen = (e) => {
        this.setState({ isFullScreen: !this.state.isFullScreen })
    }

 

    public sw(a) {
        console.log(this);
        // 调用公共方法
        this.deo.sdeo(a);
        // 调用TopNav子组件的方法（外部js，通过UI.调用子组件的方法）
        this.btnClick(a);
    }

    public render() {
        return (
            //<TopNav />

            //{
            //    this.state.isShare ?
            //        <div className={"share"}><Share toggleShare={this.toggleShare} /></div>
            //        : null
            //}
            //<div className={"iconView"}><IconView toggleShare={this.toggleShare} fullScreen={this.fullScreen} /></div>

            <div className={"web"} >
                {this.state.isFullScreen ? null :
                    <span>
                        <TopNav topNavFather={this.topNavSon} /> 
                        <LeftNav leftNavFather={this.leftNavSon} />
                    </span>
                }

                <div className={"iconView"}>
                    <IconView />
                </div>
               
                <RouterDOM.Switch>
                    <RouterDOM.Route exact path="/data" component={Data} />
                </RouterDOM.Switch>
               
            </div>
        )
    }

    public state = {
        isShare: false, // 分享
        isFullScreen: false, //全屏
    }

    public deo: Deo = new Deo();

    // TopNav ,子组件指向
    public topNavSon = ref => { this.topNavChild = ref };
    public leftNavSon = ref => { this.leftNavChild = ref };

    // 父组件调用 index的子组件的方法；
    public btnClick = (a) => {
        this.topNavChild.getValuefromChild(a)
       // this.leftNavChild.getValuefromChild(a)
    }

 
}

// 
class Deo {
    public sdeo(e) {
        console.log("Deo", e);
       // console.log(TopNav);
       // TopNav.sho();
    };


}


ReactDOM.render(
    <RouterDOM.HashRouter>
        <Index />
    </RouterDOM.HashRouter>
    , document.getElementById('viewContainer'));

export default Index;




