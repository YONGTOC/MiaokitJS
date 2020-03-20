// TODO
class GlobalAction {

  //通知3d，要加载的园区模型  
  public web_call_webgl_initPark(park_id) {
    console.log("web_call_webgl_initPark", park_id);
  }

  //切换公司
  public web_call_webgl_switchCompany(pName) {
    console.log("web_call_webgl_switchCompany", pName);
  }

  // 切换房间
  public web_call_webgl_switchRoom(pName) {
    console.log("web_call_webgl_SwitchRoom", pName);
  }

  //切换标识； 0--隐藏标识； 1--显示标识
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

  //  over
}

export default GlobalAction;