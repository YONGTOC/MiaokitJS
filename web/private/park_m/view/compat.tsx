
declare var MiaokitJS: any;

// TODO
class GlobalAction {
  //通知3d，要加载的园区模型  
  public web_call_webgl_initPark(pInfo) {
    MiaokitJS.App.m_pProject.EnterPark({
      m_pView: {
        m_nLng: 110.344301,
        m_nLat: 25.272208,
        m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
        m_nDistance: 300.0,
        m_nPitch: 19.0,
        m_nYaw: 90.0
      }
    });
    console.log("web_call_webgl_initPark", pInfo);
  }

  //切换公司
  public web_call_webgl_switchCompany(pName) {
    console.log("web_call_webgl_switchCompany", pName);
  }

  // 切换房间
  public web_call_webgl_switchRoom(pName) {
    console.log("web_call_webgl_SwitchRoom", pName);
  }

  //切换标识； 0--隐藏标识；1--显示标识
  public web_call_webgl_switchMark(pName, pInfo) {
    console.log("web_call_webgl_switchMark", pName, pInfo);
  }

  //通知3d，返回园区视角
  public web_call_webgl_mapReturnpark() {
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

  //  over
}

export default GlobalAction;