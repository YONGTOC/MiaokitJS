
declare var MiaokitJS: any;


class GlobalAction {
    //通知3d，要加载的园区模型    
    public web_call_webgl_initPark(pInfo) {
        MiaokitJS.App.m_pProject.EnterPark("民华科技园");

        console.log("web_call_webgl_initP58484848ark", pInfo);
    }

    //切换公司
    public web_call_webgl_switchCompany(pName) {
        if (pName) {
            MiaokitJS.App.m_pProject.EnterRoom(pName);
        }

        console.log("web_call_webglffdfdsfdsfds_switchCompany", pName);
    }

    // 切换房间
    public web_call_webgl_switchRoom(pName) {
        if (pName) {
            MiaokitJS.App.m_pProject.EnterRoom(pName);
        }

        console.log("web_call_webgl_switchRoom", pName);
    }

    //切换标识； 0 false--隐藏标识；1 true--显示标识
    public web_call_webgl_switchMark(pName, pInfo, pData) {
        MiaokitJS.App.m_pProject.ShowOutdoorPOI(pName, pInfo ? pData : null);

        console.log("web_call_webgl_switchMark(切换标识)", pName, pInfo, pData);
    }

    //通知3d，返回园区视角
    public web_call_webgl_mapReturnpark() {
        MiaokitJS.App.m_pProject.CloseRoom();

        console.log("web_call_webgl_mapReturnpark");
    }

    //通知3d，暂停加载模型
    public web_call_webgl_pauseloadModuler() {
        console.log("web_call_webgl_pauseloadModuler");
    }

    //通知3d，继续加载模型  
    public web_call_webgl_continueloadModuler() {
        console.log("web_call_webgl_continueloadModuler");
    }

    //通知3d，显示停车场标识
    public web_call_webgl_showParkingList(data) {
        console.log("web_call_webgl_showParkingList", data);
    }

    //通知3d，点亮对应停车场标识
    public web_call_webgl_onParking(data) {
        console.log("web_call_webgl_onParking", data);
    }

    //通知3d，取消对应摆点标识
    public web_call_webgl_cancelApplyPut(data) {
        console.log("web_call_webgl_cancelApplyPut", data)
    }

    //通知3d，通过园区的id，获取园区大楼，及大楼下楼层，及楼层下房间列表  
    public web_call_webgl_parkRoomList(data) {
        MiaokitJS.App.m_pProject.SetParkInfo(data);

        console.log("94# web_call_webgl_parkRoomList", data)
    }
    //  over
}

export default GlobalAction;