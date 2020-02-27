class DataServices  {

    // 点击地图点，获取回调
    public callback(a, pBack) {
          console.log("callback1", a);
        //$.ajax({
        //    url: '',
        //    data: { "a": a },
        //    success: function (data) {
        //        if (!data) {
        //            pBackajax(data);
        //        };
        //    }
        //})
        pBack("callback")
    }

    // 获取面积分类
    public areaType(pBackajax) {
        console.log("init-AllareaType");
        pBackajax(3333);
    }

    // 获取企业分类
    public companyType(pBackajax) {
        console.log("init-companyType");
        pBackajax(4444);
    }

    // 获取招商房间列表
    public getRoomdata(pBackajax) {
        console.log("initRoomdata");
        pBackajax(111);
    }

    // 获取入驻企业列表
    public getCompanydata(pBackajax) {
        console.log("initCompanydata");
        pBackajax(2222);
    }

    //  over
}

export default DataServices;