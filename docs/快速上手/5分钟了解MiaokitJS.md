# 5分钟了解MiaokitJS

## MiaokitJS安装
我们可以在SVE官网直接[下载](http://sve.yongtoc.com/)库脚本文件，并通过&lt;script&gt;标签引入。下载的库文件压缩包包含一下文件：
1. Miaokit.wasm - 核心模块二进制代码文件；
2. MiaokitLoader.js - 核心模块装载器脚本；
3. Miaokit.js - 接口封装和交互逻辑脚本；
4. MiaokitU3D - Unity引擎扩展文件夹；
5. MiaokitU3D/Build/UnityLoader.js - Unity引擎扩展Unity引擎装载器脚本；

## 基本程序框架
本帮助文档中所有样例程序中的框架实例名称都命名为MiaokitJS，这也是我们建议的命名，实例MiaokitJS是框架其它所有类和对象的唯一访问入口。  
每个框架实例在其独立的闭包环境中运行，我们可以在页面中创建多个框架实例。
```
<!DOCTYPE html>
<head>
    <title>MiaokitJS</title>
    <script src="js/Miaokit/MiaokitU3D/Build/UnityLoader.js"></script>
    <script src="js/Miaokit/MiaokitLoader.js"></script>
    <script src="js/Miaokit/Miaokit.js"></script>
    <script>
        // 新建一个MiaokitJS框架实例。
        let MiaokitJS = new MiaokitModule();
        // 预加载模块代码和默认瓦片数据。
        MiaokitJS.Preload();
    </script>
</head>
<body>
    <div id="unityContainer" style="width: 100%; height: 100%; margin: auto"></div>

    <script>
        // 启动框架程序，参数分别为框架启动完成回调函数和框架帧更新回调函数。
        MiaokitJS.Load(function () {
        }, function (nEventID) {
        });
    </script>
</body>
</html>
```
[在线运行]()

## 运行调试
我们需要将程序部署到WEB服务器中，通过浏览器访问，您也可以直访问我们的[在线编辑器]()进行快速体验。在部署完成并浏览器成功访问后，我们可以按F12键，打开浏览器调试控制台，控制台会打印出框架的一些运行信息。  
上面的基本程序框架样例运行后会打印出如下一些信息（数值为时间戳）：
> Track: 3 Preload  
> Track: 15 LoadEngine  
> Initialize engine version: 2019.1.0f2 (292b93d75a2c)  
> Creating WebGL 2.0 context.  
> Track: 1855 LoadEngine End  
> Track: 1855 LoadMiaokit  
> Track: 2435 LoadMiaokit End

## 接口访问
在框架实例启动完成后，我们可以通过以下方法访问框架提供的接口：
```
<script>
    MiaokitJS.Load(function () {
        let mPosition = new MiaokitJS.Vector3(0.0, 10.0, 0.0);
        let pObject = MiaokitJS.CreateGameObject();  

        pObject.transform.position = mPosition;
    }, function (nEventID) {
    });
</script>
```
以上代码创建一个3D图形对象并设置它的坐标位置，MiaokitJS实例的完成接口参见[MiaokitJS API参考]()。

## 框架配置
框架预加载前，我们可以对框架进行一些配置。
```
<script>
    // 新建一个MiaokitJS框架实例。
    let MiaokitJS = new MiaokitModule();

    // 设置用户标识。
    MiaokitJS.m_pID = "WWW.YONGTOC.COM";
    // 设置启动界面LOGO。
    MiaokitJS.m_pLogo = "logo.png";
    // 设置程序背景色。
    MiaokitJS.m_pBackground = new MiaokitJS.Color(1.0, 1.0, 1.0, 1.0);
    // 设置程序背景图片。
    MiaokitJS.m_pBackground = "background.jpg";
    // 设置背景天空盒图片。
    MiaokitJS.m_pBackground = ["front.jpg", "back.jpg", "left.jpg", "right.jpg", "up.jpg", "bottom.jpg"];
    // 设置渲染引擎标识，默认是Unity。
    MiaokitJS.m_pEngine = "Unity";
    // 设置渲染引擎路径。
    MiaokitJS.m_pEnginePath = "js/Miaokit/MiaokitU3D/Build/MiaokitU3D.json";
    // 设置核心模块路径。
    MiaokitJS.m_pModulePath = "./js/Miaokit/Miaokit.wasm";
    // 设置默认瓦片数据文件（SVE工程文件，可以同时装载多个工程）。
    MiaokitJS.m_aTiles = [
        {
            // 瓦片ID。
            m_pID: "MIAOKIT_TILE_0_0",
            // 瓦片数据地址。
            m_pPath: "./data/project.bin"
        }
    ];

    // 预加载模块代码和默认瓦片数据。
    MiaokitJS.Preload();
</script>
```
