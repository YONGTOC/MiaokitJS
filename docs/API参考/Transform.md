# Transform（变换组件）

## 概述
变换组件用于描述一个3D图形对象在虚拟三维空间中的坐标，旋转和大小缩放。使用变换组件我们可以组合搭建出复杂场景，以及创造出各种动态效果。

## 构造函数
变换组件由3D图形对象自动创建，无法调用构造函数构造变换组件。

## 使用样例
```
let pObject = new MiaokitJS.GameObject();
let pTransform = pObject.transform;

pTransform.position = { x:0.0, y:1.0, z:0.0 };
pTransform.euler = { x:0.0, y:1.0, z:0.0 };
pTransform.scale = { x:0.0, y:1.0, z:0.0 };
```

## 属性
* ### .position : Vector3
    3D图形对象相对世界空间的坐标。
* ### .localPosition : Vector3
    3D图形对象相对父级对象空间的坐标。
* ### .euler : Vector3
    3D图形对象相对世界空间3个轴的旋转欧拉角（角度）。
* ### .localEuler : Vector3
    3D图形对象相对父级对象空间3个轴的旋转欧拉角（角度）。
* ### .rotation : Quaternion
    3D图形对象相对世界空间的旋转四元数。
* ### .localRotation : Quaternion
    3D图形对象相对父级对象空间的旋转四元数。
* ### .scale : Vector3
    3D图形对象相对世界空间3个轴的缩放倍数。
* ### .localScale : Vector3
    3D图形对象相对父级对象空间3个轴的缩放倍数。
* ### .right : Vector3 Readonly
    3D图形对象坐标空间X轴向量在世界空间中的表示。
* ### .up : Vector3 Readonly
    3D图形对象坐标空间Y轴向量在世界空间中的表示。
* ### .forward : Vector3 Readonly
    3D图形对象坐标空间Z轴向量在世界空间中的表示。

## 方法
* ### .Rotate(mEuler: Vector3, nRelativeTo: Int) : void
    3D图形对象绕XYZ轴旋转指定角度。参数说明：
    1. mEuler : 绕XYZ轴旋转的角度;
    2. nRelativeTo : 0-旋转相对世界空间的XYZ轴，1-旋转相对对象空间的XYZ轴；
* ### .Rotate2(mAxis: Vector3, nAngle: Float, nRelativeTo: Int) : void
    3D图形对象绕指定轴旋转指定角度。参数说明：
    1. mAxis : 围绕旋转的轴向量;
    2. nAngle : 指定旋转角度;
    2. nRelativeTo : 0-旋转轴在世界空间中表示，1-旋转轴在对象空间中表示；
* ### .Translate(mOffset: Vector3, nRelativeTo: Int) : void
    3D图形对象沿XYZ轴平移指定距离。参数说明：
    1. mOffset : 沿XYZ轴平移的距离;
    2. nRelativeTo : 0-平移相对世界空间的XYZ轴，1-平移相对对象空间的XYZ轴；

## 相关对象完整接口参见：
* [GameObject]()
* [Vector3]()
* [Quaternion]()