# Prefab（模型预制件）

## 概述
模型预制件，实例化生成模型对象。

## 构造函数
LoadPrefab(pUrl: String, pCallback)

加载构造一个预制件对象。

## 使用样例
```
MiaokitJS.LoadPrefab("prefab.assetbundle", function (pPrefab) {
    let pObject = pPrefab.Instantiate();
}
```

## 属性

## 方法
* ### .Instantiate() : GameObject
    实例化预制件生成对象。

## 相关对象完整接口参见：
