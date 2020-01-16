
ExampleRun(function (MiaokitJS) {
    // 初始化样例
    this.Start = function () {
        MiaokitJS.LoadPrefab("./data/prefab.assetbundle.bin", function (pPrefab) {
            let pObject = pPrefab.Instantiate();

            for (let pChild of pObject.children) {
                console.log("Child:", pChild.GetTransform().GetPosition());
            }
        });
    };

    // 帧更新样例
    this.Update = function () {
    };

    // 销毁样例
    this.Destory = function () {
        console.log("未实现销毁");
    };
});
