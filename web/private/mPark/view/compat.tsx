// TODO
class GlobalAction {

  // 切换房间
  public switchRoom(pName) {
    console.log("SwitchRoom", pName);
  }

  //切换标识； 0--隐藏标识； 1--显示标识
  public switchMark(pName, pInfo) {
    console.log("switchMark", pName, pInfo);
  }

  //  over
}

export default GlobalAction;