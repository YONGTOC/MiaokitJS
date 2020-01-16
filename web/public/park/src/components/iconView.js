import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from'../style/iconView.css'
import ReactPlayer from 'react-player'



export default class IconView extends Component {
  constructor(props) {
    super(props)
    this.play = this.play.bind(this)
    this.endedAudio = this.endedAudio.bind(this)
    this.state = {
      isPlaying: false, // 播放状态
      isControls: true, // 控制器显示
      audioArray: [
        'https://eb-sycdn.kuwo.cn/ad367daf58355b6e9006e8b44a61057d/5e1d18eb/resource/n1/96/98/1578806792.mp3', 
        'https://win-web-ri01-sycdn.kuwo.cn/5b05672e4e9f39f61178ba25a8b913b0/5e1d1918/resource/n1/73/40/4073043717.mp3', 
        'https://win-web-re01-sycdn.kuwo.cn/f9cea19f40dc54473bd09c916aa9e312/5e1d1936/resource/n2/69/33/1625071345.mp3'
      ], // 音频
      currentAudio: 0 // 当前音频
    }
  }

  // 音频结束
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
      this.setState({isPlaying: true})
    })
  }
  
  // 播放
  play() {
    this.setState({isPlaying: !this.state.isPlaying})
  }

  render() {
    return (
      <div className={styles.iconView}>
        <div style={{position: "fixed", top: "300px", left: "500px"}}>
          <ReactPlayer url={this.state.audioArray[this.state.currentAudio]}
          playing={this.state.isPlaying} controls={this.state.isControls} onEnded={this.endedAudio}/>
        </div>
        <Link to="/data"><Analyze /></Link>
        <span onClick={this.play}><Play /></span>
        <span onClick={()=>{this.props.toggleShare()}}><Share /></span>
        <Switch />
        <span onClick={()=>{this.props.fullScreen()}}><Amplification /></span>
      </div>
    )
  }
}

const Analyze = () => 
<svg className="icon" aria-hidden="true" style={{height: "17px", width: "17px", cursor: "pointer", color: "#FFFFFF"}}>
<use xlinkHref="#iconfenxi"></use>
</svg>

const Play = () => 
<svg className="icon" aria-hidden="true" style={{height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF"}}>
<use xlinkHref="#iconbofang"></use>
</svg>

const Share = () => 
<svg className="icon" aria-hidden="true" style={{height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF"}}>
<use xlinkHref="#iconfenxiang"></use>
</svg>

const Switch = () => 
<svg className="icon" aria-hidden="true" style={{height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF"}}>
<use xlinkHref="#iconD"></use>
</svg>

const Amplification = () => 
<svg className="icon" aria-hidden="true" style={{height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF"}}>
<use xlinkHref="#iconmengbanzu"></use>
</svg>
