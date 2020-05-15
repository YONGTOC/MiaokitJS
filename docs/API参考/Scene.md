# Scene（SVE场景对象）

## 概述
SVE场景对象，一个地图瓦片包含多个场景。

## 构造函数
SVE场景对象由装载SVE工程数据时自动创建，并将所有场景添加到全局场景列表中，每个场景被分配一个唯一的场景索引。

## 使用样例
```
```

## 属性
* ### .id : String Readonly
    场景ID。
* ### .object3D : GameObject Readonly
    场景根节点对象。
* ### .binding : String Readonly
    场景所绑定楼层对象。
* ### .viewState : ViewState Readonly
    场景预设默认观察视角参数。
* ### .layers : Generator Readonly
    场景楼层列表生成器。
* ### .layers.length : Int Readonly
    场景楼层数量。

## 方法
* ### .GetLayer(nIndex: Int) : Layer
    获取场景指定索引楼层对象。参数说明：
    1. nIndex : 楼层编号;

## 相关对象完整接口参见：
* [Scene]()