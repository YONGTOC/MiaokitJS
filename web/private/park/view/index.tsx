import * as React from "react";
import * as ReactDOM from "react-dom";

import TopNav from "topNav";
import LeftNav from "leftNav";
import IconView from "iconView";
import Data from "data";
import Share from "share";
import DataService from "dataService";

import "css!./styles/view.css"
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
<<<<<<< HEAD
 
=======
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029

interface IProps {}

interface IState {
    isFullScreen: boolean,
    isShare: boolean
}

class Index extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.toggleShare = this.toggleShare.bind(this);

        Index.g_pIns = this;
    }

    public componentDidMount() { }

    public readonly state: Readonly<IState> = {
        isFullScreen: false,
        isShare: false
    }

    public static g_pIns: Index = null;

<<<<<<< HEAD
    // ·ÖÏí
=======
    // åˆ†äº«
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    toggleShare = (e) => {
        this.setState({ isShare: !this.state.isShare })
    }

<<<<<<< HEAD
    // È«ÆÁ
=======
    // å…¨å±
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    fullScreen = (e) => {
        this.setState({ isFullScreen: !this.state.isFullScreen })
    }
 
    public render() {
        return (
            <div className={"web"} >
                {this.state.isFullScreen ? null :
                    <span>
                        <TopNav /> 
                        <LeftNav />
                    </span>
                }
                {
                this.state.isShare ?
                    <div className="share"><Share toggleShare={this.toggleShare} /></div>
                    : null
                }
                <div className={"iconView"}>
                    <IconView toggleShare={this.toggleShare} fullScreen={this.fullScreen}  />
                </div>
                <div id="webgl-output"></div>
            </div>
        )
    }


    public iconChild = null;
    public iconSon = ref => { this.iconChild = ref };

  
<<<<<<< HEAD
    //do ´«²Î¾ö¶¨ÏÔÊ¾ÇøÓò £¬ 1 - Ô°Çø½éÉÜ; 2 - ÇøÓòÓÅÊÆ; 3 - ÕÐÉÌÁÐ±í; 4 - Èë×¤ÆóÒµ; 10 - ¶¥²¿Ê÷ÐÎÁÐ±í;
=======
    //do ä¼ å‚å†³å®šæ˜¾ç¤ºåŒºåŸŸ ï¼Œ 1 - å›­åŒºä»‹ç»; 2 - åŒºåŸŸä¼˜åŠ¿; 3 - æ‹›å•†åˆ—è¡¨; 4 - å…¥é©»ä¼ä¸š; 10 - é¡¶éƒ¨æ ‘å½¢åˆ—è¡¨;
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public showLeftview(a) {
        // LeftNav.showList-- ListArea.showList
        LeftNav.showList(a);
    }
<<<<<<< HEAD
    // Òþ²Ø×é¼þ
=======
    // éšè—ç»„ä»¶
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public hideLeftview(a) {
        LeftNav.indexCh(a);
        LeftNav.showList(a);
    }

<<<<<<< HEAD
    //Ë¢ÐÂÊ÷ÐÎÍ¼Êý¾Ý
=======
    //åˆ·æ–°æ ‘å½¢å›¾æ•°æ®
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public updateTree(data) {
        // LeftNav.refreshTree -- TreeArea.setTreedata
        LeftNav.refreshTree(data);
    }

<<<<<<< HEAD
    //¼¤»î·¿¼ä×é¼þ
=======
    //æ¿€æ´»æˆ¿é—´ç»„ä»¶
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public updateBusiness(a) {
        console.log("flushRoom", a);
        // LeftNav.outBusinessdata(a) -- BusinessArea.outRoomdata(a);
        LeftNav.updateBusiness(a)
    }
<<<<<<< HEAD
    // ¼¤»îÆóÒµ×é¼þ
=======
    // æ¿€æ´»ä¼ä¸šç»„ä»¶
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public updateCompany(a) {
        console.log("flushRoom", a);
        // LeftNav.outCompanydata  --  CompanyArea.outRoomdata(a);
        LeftNav.updateCompany(a)
    }

<<<<<<< HEAD
    // ¼¤»î·¿¼äÈ«¾°
=======
    // æ¿€æ´»æˆ¿é—´å…¨æ™¯
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public roomScene(a) {
        console.log("roomScene", a);
    }

<<<<<<< HEAD
    //¼¤»î·¿¼ä½²½â
=======
    //æ¿€æ´»æˆ¿é—´è®²è§£
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public roomAduio(a) {
        IconView.play(a);
    }

    public dataService: DataService = new DataService();

<<<<<<< HEAD
    // µã»÷µØÍ¼µã£¬»ñÈ¡»Øµ÷
=======
    // ç‚¹å‡»åœ°å›¾ç‚¹ï¼ŒèŽ·å–å›žè°ƒ
>>>>>>> d3af9502db6a77299a292aac21a1ff92b692d029
    public callback(a, pBack) {
        this.dataService.callback(a, pBack);
    }


}

ReactDOM.render(
    <HashRouter>
            <Switch>
                <Route path="/data" component={Data} />
                <Route exact path="/" component={Index} />
            </Switch>
    </HashRouter>
    , document.getElementById('viewContainer'));

export default Index;




