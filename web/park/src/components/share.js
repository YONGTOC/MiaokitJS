import React, { Component } from 'react'
import styles from '../style/share.css'
import { message } from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class Share extends Component {
  constructor(props) {
    super(props)
    this.copy = this.copy.bind(this)
    this.cancel = this.cancel.bind(this)
    this.state = {
     value: "www.baidu.com",
     copied: false
    }
  }

  componentDidMount() {
  }
  
  copy() {
    message.success('复制成功!', 1)
    this.props.toggleShare()
  }

  cancel () {
    this.props.toggleShare()
  }
  
  render() {
    return (
      <div className={styles.share}>
        <div className={styles.title}>园区分享</div>
        <div className={styles.url}>
          <span className={styles.spanA}>链接</span>
          <span className={styles.spanB}>{this.state.value}</span>
        </div>
        <div className={styles.bt}>
          <div className={styles.spanC} onClick={this.cancel}>取消</div>
          <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({copied: true})}>
            <div className={styles.spanD} onClick={this.copy}>复制链接</div>
          </CopyToClipboard>
        </div>
      </div>
    )
  }
}
