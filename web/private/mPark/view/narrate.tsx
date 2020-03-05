import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css"




class Narrate extends React.Component {
  public constructor(props) {
    super(props);

  }

  
  public componentDidMount() {
    let audio = document.getElementById("audioTool");
    audio.onended = function () {
      console.log("音频播放完成");
    };
  }

  public audioClick(index, name , url) {
    console.log("handleSiblingsClick",index, name , url);
    //自动播放相应  play();
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
      } else {
        audio.pause();// 这个就是暂停
      }
    } 
  }

  public render() {
    return (
      <div>
       
        <audio controls id={"audioTool"}  >
          <source src="" />
        </audio>

        <RouterDOM.Link to="/" >
          <div className={"narrareClose"}>
            <span className="iconfont" style={{ "fontSize": "5rem", "color": "#fff" }}>&#xe7fa;</span>
          </div>
        </RouterDOM.Link>
        <div className={"narrareTitle"}>自动讲解</div>
        <div className={"audioBox"}>
          <ul className={"flex-layout category-head"}>
            {this.state.parkAudio.map((i, index) => {
              return (
                <li className={this.state.activeType == index ? "flex-active" : "flex"} onClick={this.audioClick.bind(this, index, i.name, i.url)} data-index={index}>{i.name}</li>
                )
            })}
          </ul>
          <div className={"playBtn"} onClick={this.togglePlay.bind(this)}>
            <span className="iconfont" style={{ "fontSize": "5rem", "color": "#fff" }}>&#xe7fa;</span>
          </div>
        </div>
      </div>
      
    )
  }

  public state = {
    activeType: 0,
    parkAudio: [
      { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
      { name: "园区配套", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
      { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
      { name: "园区建筑", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
    ]
  }
  //over
}

export default Narrate;