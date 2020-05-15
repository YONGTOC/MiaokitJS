import { message } from 'antd'
import * as React from "react";
import "css!./styles/view.css";

interface IProps {

}

interface IState {
    value: string
}

export default class Share extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.copy = this.copy.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    public readonly state: Readonly<IState> = {
        value: "www.baidu.com"
    }

    componentDidMount() {
    }

    copy() {
        var Url2 = document.getElementById("copy").innerText;
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy");
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        message.success('���Ƴɹ�!', 1)
        this.props.toggleShare()
    }

    cancel() {
        this.props.toggleShare()
    }

    render() {
        return (
            <div className="share">
                <div className="share-title">԰������</div>
                <div className="url">
                    <span className="share-span-a">����</span>
                    <span className="share-span-b" id="copy">{this.state.value}</span>
                </div>
                <div className="share-bt">
                    <div className="share-span-c" onClick={this.cancel}>ȡ��</div>
                    <div className="share-span-d" onClick={this.copy}>��������</div>
                </div>
            </div>
        )
    }
}