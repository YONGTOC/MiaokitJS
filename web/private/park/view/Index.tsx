import * as React from "react";
import * as ReactDOM from "react-dom";
import TopNav from "TopNav";
import LeftNav from "LeftNav";
import "css!./styles/index.css"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.toggleShare = this.toggleShare.bind(this);

    }

    // 分享
    toggleShare = (e) => {
        this.setState({ isShare: !this.state.isShare })
    }

    // 全屏
    fullScreen = (e) => {
        this.setState({ isFullScreen: !this.state.isFullScreen })
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
                        <TopNav />
                        <LeftNav />
                    </span>
                }
            </div>
        )
    }

    public state = {
        isShare: false, // 分享
        isFullScreen: false, //全屏
    }
}

ReactDOM.render(<Index />, document.getElementById('viewContainer'));

export default Index;
