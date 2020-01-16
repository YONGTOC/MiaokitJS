import React, { Component } from 'react'
import index from '../style/index.css'
import TopNav from '../components/topNav'
import LeftNav from '../components/leftNav'
import IconView from '../components/iconView'
import Share from '../components/share'
import { Link } from "react-router-dom";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.toggleShare = this.toggleShare.bind(this);
    this.state = {
      isShare: false, // 分享
      isFullScreen: false, //全屏
    }
  }

  // 分享
  toggleShare = (e) => {
    this.setState({isShare: !this.state.isShare})
  }

  // 全屏
  fullScreen = (e) => {
    this.setState({isFullScreen: !this.state.isFullScreen})
  }

  render() {
    return (
      <div className={index.web} >
        { this.state.isFullScreen? null:
          <span>
            <TopNav />
            <LeftNav />
          </span>
        }
        { 
          this.state.isShare?
          <div className={index.share}><Share toggleShare={this.toggleShare}/></div>
          : null
        }
        <div className={index.iconView}><IconView toggleShare={this.toggleShare} fullScreen={this.fullScreen}/></div>
      </div>
    )
  }
}
