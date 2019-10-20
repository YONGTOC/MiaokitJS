# Texture2D（二维贴图对象）

## 概述
通常用于表现网格表面纹理。

## 构造函数
Texture2D()

该构造函数构造一个空的二维贴图对象。

## 使用样例
```
let pTexture = new Texture2D();
pTexture.Load("image.jpg");
```

## 属性

## 方法
* ### .Load(pUrl: String) : void
    加载网络图片，填充贴图对象。参数说明：
    1. pUrl : 网络图片URL;
* ### .SetImageData(aData: ArrayBuffer) : void
    获取所有已加载工程中所有场景中的指定场景。参数说明：
    1. aData : JPG/PNG图片数据;

## 相关对象完整接口参见：
