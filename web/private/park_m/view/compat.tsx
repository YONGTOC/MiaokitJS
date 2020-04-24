
declare var MiaokitJS: any;


class GlobalAction {
    //通知3d，要加载的园区模型  
    public web_call_webgl_initPark(pInfo) {
        MiaokitJS.App.m_pProject.EnterPark({
            m_pView: {
                m_nLng: 110.344301,
                m_nLat: 25.272208,
                m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
                m_nDistance: 300.0,
                m_nPitch: 20.0,
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
    console.log("web_call_webgl_onParking",data);
  }

  //通知3d，取消对应摆点标识
  public web_call_webgl_cancelApplyPut(data) {
    console.log("web_call_webgl_cancelApplyPut",data)
  }
  //  over
}

//http://base.oss.yongtoc.com/park/data/projects/minghuakechuangyuan/diors/%E6%A1%82%E6%9E%97%E4%BF%A1%E6%81%AF%E4%BA%A7%E4%B8%9A%E5%9B%AD/Production_1.3mx
//http://base.oss.yongtoc.com/park/data/projects/minghuakechuangyuan/diors/%E6%A1%82%E6%9E%97%E4%BF%A1%E6%81%AF%E4%BA%A7%E4%B8%9A%E5%9B%AD/Data/Production_1.3mxb



export default GlobalAction;