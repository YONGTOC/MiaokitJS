import * as React from "react";

import BottomBtn from "bottomBtn";
class InfoArea extends React.Component {
    public constructor(props) {
        super(props);
    }

    public componentDidMount() {
        BottomBtn.toggleIcon(2);
    }

    public render() {
        return (
            <div>
                <div className={"infoAreabox"}>
                    InfoArea
                </div>
                <BottomBtn />
            </div>
        )
    }


    public state = {

    }

    //over
}

export default InfoArea;