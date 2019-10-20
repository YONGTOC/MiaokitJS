# Attachment（实体对象附件）

## 概述
实体对象附件为SVE场景三维对象所绑定的属性数据。

## 构造函数
楼层对象由装载SVE工程数据时自动创建。

## 使用样例
```
```

## 属性
* ### .entityType : Int Readonly
    实体类型，值有：Group=1、Collection=2、Component=3、Placeholder=4、Work=5、Layer=6。
* ### .secondType : Int Readonly
    当1==entityType时，值有：Layer=1、Area=2、Group=3。

    当2==entityType时，值有：ATexture=101、AHoleModel=102、AEdgeModel=103、ETexture=201、EBuildingModel=202、EStoreyModel=203、EFurnitureModel=204、EAssetsModel=205、EPictureModel=206。

    当3==entityType时，值有：Panel=1、Edge=3、AreaBottom=4、AreaTop=5。
* ### .flag : Int Readonly
    实体属性标志集。
* ### .object3D : GameObject Readonly
    实体所绑定3D图形对象。
* ### .viewState : ViewState Readonly
    实体对象默认观察视角参数。

## 方法

## 相关对象完整接口参见：
* [GameObject]()