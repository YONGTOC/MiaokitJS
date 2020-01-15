
ExampleRun(function (MiaokitJS) {
    // 定义顶点坐标数组
    let aPosition = new Float32Array([
        // 顶部2个三角形的顶点坐标
        -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0,
        // 顶部2个三角形的顶点坐标
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
        // 正面2个三角形的顶点坐标
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
        // 右侧2个三角形的顶点坐标
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0,
        1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
        // 背面2个三角形的顶点坐标
        1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        // 左侧2个三角形的顶点坐标
        -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0
    ]);

    // 定义顶点法线数组
    let aNormal = new Float32Array([
        // 顶部2个三角形的顶点法线
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        // 顶部2个三角形的顶点法线
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        // 正面2个三角形的顶点法线
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
        // 右侧2个三角形的顶点法线
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
        // 背面2个三角形的顶点法线
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        // 左侧2个三角形的顶点法线
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0
    ]);

    // 定义顶点UV数组
    let aUV = new Float32Array([
        // 顶部2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        // 顶部2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        // 正面2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        // 右侧2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        // 背面2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
        // 左侧2个三角形的顶点UV
        0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 1.0, 0.0
    ]);

    // 定义三角形索引数组
    let aIndex0 = new Int32Array([
        0, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11
    ]);
    let aIndex1 = new Int32Array([
        12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35
    ]);


    // 初始化样例
    this.Start = function () {
        // 创建贴图对象
        this.m_pTexture = MiaokitJS.CreateTexture2D();
        this.m_pTexture.Load("./examples/data/image.jpg");

        this.m_pTexture2 = MiaokitJS.CreateTexture2D();
        this.m_pTexture2.Load("./examples/data/image2.jpg");

        // 创建材质对象
        this.m_pMaterial = MiaokitJS.CreateMaterial();
        this.m_pMaterial.SetTexture(this.m_pTexture);

        this.m_pMaterial2 = MiaokitJS.CreateMaterial();
        this.m_pMaterial2.SetTexture(this.m_pTexture2);

        // 网格对象
        this.m_pMesh = MiaokitJS["CreateMesh"]();
        this.m_pMesh.position = aPosition;
        this.m_pMesh.normal = aNormal;
        this.m_pMesh.uv = aUV;
        this.m_pMesh.SetIndices(0, aIndex0, 4);
        this.m_pMesh.SetIndices(1, aIndex1, 4);

        this.m_pMesh.Apply();


        this.m_pMesh.SetMaterial(0, this.m_pMaterial);
        this.m_pMesh.SetMaterial(1, this.m_pMaterial2);

        this.m_pObject = MiaokitJS.CreateGameObject();
        this.m_pObject.SetMesh(this.m_pMesh);

        this.m_pTransform = this.m_pObject.GetTransform();
        this.m_nTick = 0;
    };

    // 帧更新函数
    this.Update = function () {
        if (this.m_pTransform) {
            this.m_pTransform.SetEuler({ x: 0, y: this.m_nTick++ % 360, z: 0 });
            //this.m_nTick++;
        }
    };

    // 销毁函数
    this.Destory = function () {
        console.log("未实现销毁");
    };
});
