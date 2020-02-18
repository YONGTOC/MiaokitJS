import * as React from "react";
import * as ReactDOM from "react-dom";

import * as RouterDOM from 'react-router-dom';
//import * as ReactPlayer from 'reactPlayer';

import Data from "Data";
import Index from "Index";
import "css!./styles/iconView.css";
//declare var ReactPlayer: any;
//declare var React2: any;

//ReactPlayer.React2 = React
class IconView extends React.Component {
    public constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.endedAudio = this.endedAudio.bind(this);
    }


    // ÒôÆµ½áÊø
    endedAudio() {
        let currentAudio = this.state.currentAudio
        if (currentAudio !== 2) {
            currentAudio = currentAudio + 1
        } else {
            currentAudio = 0
        }
        this.setState({
            currentAudio: currentAudio,
            isPlaying: false
        }, () => {
            this.setState({ isPlaying: true })
        })
    }

    // ²¥·Å
    play() {
        console.log("play");
         this.setState({ isPlaying: !this.state.isPlaying })
    }

    public render() {

        return (
            <div className={"icon-view "}>
                <div style={{ position: "fixed", top: "300px", left: "500px" }}>
                    {/*<ReactPlayer url={this.state.audioArray[this.state.currentAudio]}
                        playing={this.state.isPlaying} controls={this.state.isControls}
                        onEnded={this.endedAudio} />*/}
                </div>
                <RouterDOM.Link to="/data"><Analyze /></RouterDOM.Link>
              
                <span onClick={this.play}><Play /></span>
                <span ><Share /></span>
                <span ><Amplification /></span>
             
            </div>
        )
    }

    public state = {
        isPlaying: false, // ²¥·Å×´Ì¬
        isControls: true, // ¿ØÖÆÆ÷ÏÔÊ¾
        audioArray: [
            'https://eb-sycdn.kuwo.cn/ad367daf58355b6e9006e8b44a61057d/5e1d18eb/resource/n1/96/98/1578806792.mp3',
            'https://win-web-ri01-sycdn.kuwo.cn/5b05672e4e9f39f61178ba25a8b913b0/5e1d1918/resource/n1/73/40/4073043717.mp3',
            'https://win-web-re01-sycdn.kuwo.cn/f9cea19f40dc54473bd09c916aa9e312/5e1d1936/resource/n2/69/33/1625071345.mp3'
        ], // ÒôÆµ
        currentAudio: 0 // µ±Ç°ÒôÆµ
    }


}

const Analyze = () =>
    <svg className="icon" aria-hidden="true" style={{ height: "17px", width: "17px", cursor: "pointer", color: "#FFFFFF" }}>
        <use xlinkHref="#iconfenxi"></use>
    </svg>

const Play = () =>
    <svg className="icon" aria-hidden="true" style={{ height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" }}>
        <use xlinkHref="#iconbofang"></use>
    </svg>

const Share = () =>
    <svg className="icon" aria-hidden="true" style={{ height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" }}>
        <use xlinkHref="#iconfenxiang"></use>
    </svg>

const Switch = () =>
    <svg className="icon" aria-hidden="true" style={{ height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" }}>
        <use xlinkHref="#iconD"></use>
    </svg>

const Amplification = () =>
    <svg className="icon" aria-hidden="true" style={{ height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" }}>
        <use xlinkHref="#iconmengbanzu"></use>
    </svg>

export default IconView;


