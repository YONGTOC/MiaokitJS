
class DataService{

  public getProvince(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getProvince',
      type: "get",
      data: {
        
      },
      success: function () {

      }
    })
  }

    // 101.(园区信息-3D显示-兴趣点列表) 获取园区兴趣点列表信息
  public getParkPointList(pBack,type,name) {
        $.ajax({
      url: this.state.rooturl + '/api/getParkPointList?token=' + sessionStorage.getItem("token"),
      dataType: "json",
      data: {
        park_id: sessionStorage.getItem("park_id"),
        point_type:type,
      },
      type: "get",
      success: function (data) {
        pBack(data,name)
      }
    })
  }



  public state = {
    rooturl:"http://192.168.1.15:86/",
  }

}


export default DataService;