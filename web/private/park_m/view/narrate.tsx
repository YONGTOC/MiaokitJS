import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css"




class Narrate extends React.Component {
  public constructor(props) {
    super(props);


    Narrate.selfPlay = this.selfPlay.bind(this);
    this.playerOver = this.playerOver.bind(this);
  }


  public componentDidMount() { 
    let audio = document.getElementById("audioTool");
    let audioN = 0
    audio.onended = function () {
      console.log("当前音频，播放结束", audio.paused);
      audioN = audioN + 1;
      Narrate.selfPlay(audioN);
    };

    this.selfPlay(0);
  }

  static selfPlay(audioN) { };
  public selfPlay(audioN) {
    console.log("selfPlay", audioN);
    let audio = document.getElementById("audioTool");
    if (audioN !== this.state.parkAudio.length) {
      let url = this.state.parkAudio[audioN].url;
      audio.src = url;
      audio.play();
    } else {
      // 列表播放结束
      audioN = 0;
      console.log("audioOver", audioN, audio.paused);
      this.playerOver(false);
    };
  }

  public playerOver(a) {
    this.setState({
      paused: a,
    })
  }

  public audioClick(index, name, url) {
    console.log("handleSiblingsClick", index, name, url);
    this.setState({
      activeType: index
    })
    console.log("activeType", this.state.activeType);
    let audio = document.getElementById("audioTool");
    audio.src = url;
    audio.play();
  }

  // 播放和暂停切换
  public togglePlay(a) {
    var audio = document.getElementById('audioTool');
    if (audio !== null) {
      //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
      console.log(audio.paused);
      if (audio.paused) {
        audio.play();//audio.play();// 这个就是播放  
        this.setState({
          paused: true,
        })
      } else {
        audio.pause();// 这个就是暂停
        this.setState({
          paused: false,
        })
      }
    }
  }

  public render() {
    return (
      <div>
        <audio controls id={"audioTool"}  >
          <source src="" />
        </audio>
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" >
            <i className="iconfont companyInfoicon">&#xe83b;</i>
          </RouterDOM.Link>
          <span>自动讲解</span>
        </p>
        <div className={"audioBox"}>
          <ul className={"flex-layout category-head"}>
            {this.state.parkAudio.map((i, index) => {
              return (
                <li className={this.state.activeType == index ? "flex-active" : "flex"} onClick={this.audioClick.bind(this, index, i.name, i.url)} data-index={index}>{i.name}</li>
              )
            })}
          </ul>
          <div className={"playBtn"} onClick={this.togglePlay.bind(this)}>
            {this.state.paused ?
              <span className="iconfont" style={{ "fontSize": "5rem", "color": "#fff" }}>&#xe84a;</span>
              :
            <span className="iconfont" style={{ "fontSize": "5rem", "color": "#fff" }}>&#xe84b;</span>

              }
          </div>
        </div>
      </div>

    )
  }

  public state = {
    paused:true,
    activeType: 0,
    parkAudio: [
      { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
      { name: "园区配套", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
      { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
      { name: "园区建筑", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
    ],
    currentAudio: 0 // 当前音频 
  }
  //over
}

export default Narrate;