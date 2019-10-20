# Gis（GIS控制器对象）

## 概述
全局单例，提供3DGIS交互功能。

## 构造函数
全局单例，通过MiaokitJS.Miaokit.gis访问。

## 使用样例
```
MiaokitJS.Miaokit.gis.AddSvetile({
    m_nID: 1,
    m_nFlags: 0,
    m_pUrl: "data/upload/admin/project/20191018/5da9159b2005e.txt",
    m_mLngLat: { x: 110.326814, y: 25.248106 },
    m_mSize: { x: 1000.0, y: 1000.0 },
    OnActive: function(pTile, bActive){
        // ...
    }
});

MiaokitJS.Miaokit.gis.Update(110.326814 * (Math.PI / 180), 25.248106 * (Math.PI / 180), 10000);
```

## 属性

## 方法
* ### .Update(rLng: Float, rLat: Float, nHeight: Float) : void
    刷新地图显示：
    1. rLng : 聚焦经度;
    1. rLat : 聚焦纬度;
    1. nHeight : 观察离地高度;
* ### .AddSvetile(pDesc: any) : Scene
    添加SVE工程到地图中显示。参数说明：
    1. pDesc : SVE工程描述;

## 相关对象完整接口参见：
