let fun = {
    name: '',
    fun: function () { },
    mStackUp: true,
}
var SceneGUI;
var SelectInstance;

function InitGUI(selObj,text) {
    SelectInstance = selObj;
    if (!SelectInstance)
        return;
    if (SceneGUI) {
        SceneGUI.destroy();
    }
    SceneGUI = new dat.GUI();

    fun.name = text;
    SceneGUI.add(fun, "name");
    let tranFolder = SceneGUI.addFolder("Transform");
    let ltx = tranFolder.add(SelectInstance.m_pObject3D.transform.localPosition, 'x').name('ltx');
    let lty = tranFolder.add(SelectInstance.m_pObject3D.transform.localPosition, 'y').name('lty');
    let ltz = tranFolder.add(SelectInstance.m_pObject3D.transform.localPosition, 'z').name('ltz');
    let lrx = tranFolder.add(SelectInstance.m_pObject3D.transform.localEuler, 'x').name('lrx');
    let lry = tranFolder.add(SelectInstance.m_pObject3D.transform.localEuler, 'y').name('lry');
    let lrz = tranFolder.add(SelectInstance.m_pObject3D.transform.localEuler, 'z').name('lrz');

    ltx.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localPosition = { x: value, y: SelectInstance.m_pObject3D.transform.localPosition.y, z: SelectInstance.m_pObject3D.transform.localPosition.z};
    });
    lty.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localPosition = { x: SelectInstance.m_pObject3D.transform.localPosition.x, y: value, z: SelectInstance.m_pObject3D.transform.localPosition.z };
    });
    ltz.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localPosition = { x: SelectInstance.m_pObject3D.transform.localPosition.x, y: SelectInstance.m_pObject3D.transform.localPosition.y, z: value };
    });
    lrx.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localEuler = { x: value, y: SelectInstance.m_pObject3D.transform.localEuler.y, z: SelectInstance.m_pObject3D.transform.localEuler.z };
    });
    lry.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localEuler = { x: SelectInstance.m_pObject3D.transform.localEuler.x, y: value, z: SelectInstance.m_pObject3D.transform.localEuler.z };
    });
    lrz.onFinishChange(function (value) {
        SelectInstance.m_pObject3D.transform.localEuler = { x: SelectInstance.m_pObject3D.transform.localEuler.x, y: SelectInstance.m_pObject3D.transform.localEuler.y, z: value };
    });
    //if (GLOBAL.pCurBuilding) {
    //    var fallBack = SceneGUI.add(fun, "fun").name("返回外景");
    //    fallBack.onFinishChange(function (value) {
    //        GLOBAL.Do.SwitchScene();
    //    });
    //    //#region 楼层选择
    //    //var layerFloder = SceneGUI.addFolder("楼层选择");
    //    let layers = new Array();
    //    for (let j = 0; j < GLOBAL.pCurBuilding.layerList.length; j++) {
    //        layers.push(SceneGUI.add(fun, "fun").name(GLOBAL.pCurBuilding.layerList[j].floor_name));
    //    }
    //    for (let j = 0; j < layers.length; j++) {
    //        layers[j].onFinishChange(function (value) {
    //            //console.log("点击楼层：" + j + GLOBAL.pCurBuilding.layerList[j].floor_name + " -- " + value);
    //            GLOBAL.Do.SwitchLayer(GLOBAL.pCurBuilding.layerList[j].floor_name);
    //        });
    //    }
    //    //#endregion
    //}
    //else {
    //    var fallBack = SceneGUI.add(fun, "fun").name("进入体育场内景");
    //    fallBack.onFinishChange(function (value) {
    //        GLOBAL.Do.SwitchScene("体育场");
    //    });
    //}


    ////#region 楼层叠加
    //var mStackUp = SceneGUI.add(fun, "mStackUp").name("叠加楼层：");
    //mStackUp.onFinishChange(function (value) {
    //    GLOBAL.Do.StackUp(value);
    //});
    ////#endregion


}