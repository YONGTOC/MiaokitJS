# Miaokit（MiaokitJS核心对象）

## 概述
全局单例，提供若干辅助方法和其他接口入口。

## 构造函数
全局单例，通过MiaokitJS.Miaokit访问。

## 使用样例
```
let aAnalyze = MiaokitJS.Miaokit.Analyze(60);
console.log(aAnalyze);
```

## 属性
* ### .camera : GameObject
    主场景摄像机对象。
* ### .gis : Gis
    GIS控制器对象。

## 方法
* ### .LoadTile(aData: ArrayBuffer) : Tile
    加载SVE工程数据，返回工程瓦片对象。参数说明：
    1. aData : SVE工程数据;
* ### .GetScene(nIndex: Int) : Scene
    获取所有已加载工程中所有场景中的指定场景。参数说明：
    1. nIndex : 场景编号;
* ### .PickEntity(nLayers: Int) : GameObject
    鼠标拾取对象。参数说明：
    1. nLayers : 拾取过滤层标志集;
* ### .Analyze(nFps) : Json[]
    获取MiaokitJS模块剖析数据。参数说明：
    1. nFps : 当前刷新帧率;

## 相关对象完整接口参见：
* [Gis]()
* [Tile]()
* [Scene]()
* [GameObject]()