declare var MiaokitJS: any;


class GlobalAction {

  // 切换房间
  public web_call_webgl_switchRoom(pName) {
    console.log("web_call_webgl_switchRoom", pName);

  }

  //切换标识； 0 false--隐藏标识；1 true--显示标识
  public web_call_webgl_switchMark(pName, pInfo, pData) {
    //  MiaokitJS.App.m_pProject.ShowOutdoorPOI(pName, pInfo ? pData : null);
    console.log("web_call_webgl_switchMark(切换标识)", pName, pInfo, pData);
  }

  //3D推近视角
  public web_call_webgl_nearGap() {
    //   let nDistance = MiaokitJS.App.m_pCameraCtrl.distance;
    //   MiaokitJS.App.m_pCameraCtrl.distance = nDistance * 0.8;

    console.log("3D推近视角");
  }

  //3D拉远视角
  public web_call_webgl_farGap() {
    // let nDistance = MiaokitJS.App.m_pCameraCtrl.distance;
    // MiaokitJS.App.m_pCameraCtrl.distance = nDistance * 1.2;

    console.log("3D拉远视角");
  }

    //回复当前最佳视角
  public web_call_webgl_reset() {
    // MiaokitJS.App.m_pProject.ResetCamera();
       console.log("3D回复当前最佳视角");
  }

    // 2/3D 按钮切换
  public web_call_webgl_switchCameraMode(n) {
   // MiaokitJS.App.m_pProject.SwitchCameraMode(n);
      console.log("2/3D 按钮切换");
  }

  //跳转floor
  public web_call_webgl_active_floor(index) {
      console.log("跳转floor", index);
  }

  // over GlobalAction
}

export default GlobalAction;