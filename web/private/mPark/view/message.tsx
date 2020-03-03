import * as React from "react";

import BottomBtn from "bottomBtn";

class Message extends React.Component {
    public constructor(props) {
        super(props);
    }

    public componentDidMount() {
        BottomBtn.toggleIcon(3);
    }

    public render() {
        return (
            <div>
                <div className={"messageBox"}>
                    message
                </div>
                <BottomBtn />
            </div>
        )
    }


    public state = {

    }

    //over
}

export default Message;