import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import GlobalAction from "compat";
import DataService from "dataService";

import "css!./styles/view.css"

class Narrate extends React.Component {
  public constructor(props) {
    super(props);

    Narrate.selfPlay = this.selfPlay.bind(this);
    this.playerOver = this.playerOver.bind(this);
    this.setAudio = this.setAudio.bind(this);
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();



  public componentDidMount() {
    var _this = this;
    console.log("自动讲解")
    console.log("当前音频111", _this.state);
    let audio = document.getElementById("audioTool");
    let audioIndex = _this.state.audioIndex

    // 播放结束
    audio.onended = function () {
      console.log("当前播放结束", _this.state.audioIndex);

      console.log("当前音频2222", _this.state);
      // Narrate.selfPlay(_this.state.audioIndex);

      //判断length 和audioN； 如果相等就不再++
      // 播放完毕 audioIndex++
      //if (_this.state.audioIndex  < _this.state.parkAudio.length) {
      //  console.log("++", _this.state)
      //     //这里进入下一段播放
      //  // _this.setState({
      //  //  audioIndex: audioIndex+1,
      //  //}, () => {   //使用setState第二个参数来处理set后的数据
      //  //  _this.selfPlay(_this.state.audioIndex);
      //  //  }) 
      //  Narrate.selfPlay(_this.state.audioIndex);
      //  console.log("++2", _this.state);

      //} else {
      //     console.log("00", _this.state)
      //}
      _this.state.audioIndex = _this.state.audioIndex + 1;
      Narrate.selfPlay(_this.state.audioIndex);
    };

    //4.(园区信息-3D显示)获取园区详细信息
    this.dataService.getParkInfo(this.setAudio, 1009);

    console.log("当前音频", _this.state);
  }

  public setAudio(data) {
    console.log("setaudio", data.response[0].audio);
    this.setState({
      parkAudio: data.response[0].audio,
    }, () => {   //使用setState第二个参数来处理set后的数据
      this.selfPlay(0);
    })
  }

  static selfPlay(audioIndex) { };
  public selfPlay(audioIndex) {
    console.log("state2", this.state)
    console.log("state3", audioIndex)
    console.log(this.state.parkAudio.length);

    let audio = document.getElementById("audioTool");



    if (audioIndex + 1 !== this.state.parkAudio.length) {
      console.log("!over", this.state)
      let url = this.state.parkAudio[audioIndex].url;
      audio.src = url;
      audio.play();

      return;
    } else {
      console.log("over", this.state);
       let url = this.state.parkAudio[audioIndex].url;
      audio.src = url;
      audio.play();

      this.setState({
        audioIndex: 0
      })

      //  this.setState({
      //  audioIndex: audioIndex+1,
      //}, () => {   //使用setState第二个参数来处理set后的数据
      //  this.selfPlay(this.state.audioIndex);
      //  }) 
      console.log("over2", this.state)

    }

    //if (audioN+1 == this.state.parkAudio.length) {
    //if (audioN !==  this.state.parkAudio.length) {
    //   // 列表播放结束

    //  console.log("audioOver", audioN, audio.paused);

    //    this.setState({
    //      audioN: 0,
    //      paused:false,
    //  })
    //} else {
    //    let url = this.state.parkAudio[audioN].url;
    //  audio.src = url;
    //  audio.play();
    //  this.setState({
    //    activeType: audioN

    //  })

    //};


  }

  public playerOver(a) {
    this.setState({
      paused: a,
    })
  }

  public audioClick(index, name, url) {
    console.log("handleSiblingsClick", index, name, url);
    this.setState({
      activeType: index,
      paused: true,
      audioN: index
    })
    console.log("activeType", this.state);
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
                <li className={this.state.audioIndex == index ? "flex-active" : "flex"} onClick={this.audioClick.bind(this, index, i.name, i.url)} data-index={index}>{i.name}</li>
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
    // 当前播放状态，true：播放；false：暂停
    paused: true,
    //当前播放的列表序列
    //activeType: 0,
    // 讲解音频列表
    parkAudio: [],
    // 当前音频 
    currentAudio: 0,
    // audioN: 0,
    audioIndex: 0
  }
  //over
}

export default Narrate;