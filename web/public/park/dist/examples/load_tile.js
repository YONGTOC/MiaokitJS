
ExampleRun(function (MiaokitJS) {
    // 初始化样例
    this.Start = function () {
        // 临时楼层列表，正式版接口不允许缓存楼层对象，因为楼层对象是动态创建销毁的

        let pThis = this;

        MiaokitJS["SVE"].OnGUI = function (pCanvas, pCanvasCtx) {
            if (!pThis.m_pTile) {
                let pMsg = "正在加载工程文件: " + (pThis.m_nTick ? pThis.m_nTick : 0.0).toFixed(2);
                pCanvasCtx.font = "20px Microsoft YaHei";
                pCanvasCtx.strokeStyle = "black";
                pCanvasCtx.lineWidth = 2;
                pCanvasCtx.fillStyle = "#FFFFFF";
                pCanvasCtx.strokeText(pMsg, pCanvas.clientWidth / 2 - 20.0, pCanvas.clientHeight / 2);
                pCanvasCtx.fillText(pMsg, pCanvas.clientWidth / 2 - 20.0, pCanvas.clientHeight / 2);
            }
        };

        // 输入账号、密码、工程名打开工程
        MiaokitJS["SVE"].GetTileInfo("18593230989", "18593230989", "贴图尺寸异常", function (pTileInfo) {
            if (pTileInfo) {
                pTileInfo["m_pPath"] = "http://sve.yongtoc.com/data/upload/admin/project/20190918/5d819800e7a8f.txt"; //"./data/5d819800e7a8f.bin";//
                MiaokitJS["Request"]("GET", "arraybuffer", pTileInfo["m_pPath"], null,
                    function (nRate) {
                        pThis.m_nTick = nRate;
                    },
                    function (aData) {
                        pTileInfo["m_pData"] = aData;
                        pTileInfo["m_pTile"] = MiaokitJS["Miaokit"]["LoadTile"](aData);

                        pThis.Browse(pTileInfo["m_pTile"]);
                    });
            }
        });
    };

    // 遍历场景了楼层
    this.Browse = function (pTile) {
        this.m_pTile = pTile;
        this.m_aLayer = [];
        this.m_nCurLayer = 0;
        this.m_nTick = 0;

        /// 遍历当前瓦片所有场景，打印场景ID
        for (let pScene of this.m_pTile.scenes) {
            let nHeight = 0.0;
            console.log("场景：", pScene.id);

            /// 遍历当前场景所有楼层，打印楼层ID
            for (let pLayer of pScene.layers) {
                let pObject = pLayer.object3D;
                pObject.GetTransform().SetLocalPosition({ x: 0.0, y: nHeight, z: 0.0 }); nHeight += 9.0;
                console.log("楼层：", pLayer, pObject, nHeight);

                this.m_aLayer.push(pLayer);

                // 打印住院部7F所有位置点，打印位置点ID
                if ("住院部" === pScene.id && "7F" === pLayer.id) {
                    console.log("打印住院部7F所有位置点：");

                    for (let pSite of pLayer.sites) {
                        console.log("位置点：", pSite.id, pSite.type, pSite.number, pSite.scene.id, pSite.layer.id, pSite.position);
                    }
                }
            }
            break;
        }
    };

    // 帧更新样例
    this.Update = function () {
        if (!this.m_pTile) {
            return;
        }

        this.m_aLayer[this.m_nCurLayer]._Draw();

        if (0 === ++this.m_nTick % 120) {
            if (this.m_aLayer.length === ++this.m_nCurLayer) {
                this.m_nCurLayer = 0;
            }
        }
    };

    // 销毁样例
    this.Destory = function () {
        console.log("未实现销毁");
    };
});
