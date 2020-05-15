# GameObject（3D图形对象）

## 概述
3D图形对象是用于添加到虚拟三维空间中的对象，通常用于表现一个立体模型。

## 构造函数
GameObject()

该构造函数构造一个空的3D图形对象。

## 使用样例
```
let pObject = new MiaokitJS.GameObject();
for(let pChild of pObject.children){
    pChild.active = false;
}
```

## 属性
* ### .transform : Transform Readonly
    3D图形对象变换组件。
* ### .mesh : Mesh
    3D图形对象网格组件。
* ### .children : Generator Readonly
    3D图形对象子级列表生成器。
* ### .children.length : Int Readonly
    3D图形对象子级数量。
* ### .parent : GameObject 
    3D图形对象父级对象。
* ### .active : Boolean
    3D图形对象激活状态。
* ### .highlight : Boolean
    3D图形对象高亮状态。
* ### .enableCollider : Boolean
    3D图形对象碰撞器启用状态。
* ### .data : any
    3D图形对象绑定自定义数据。

## 方法

## 相关对象完整接口参见：
* [Transform]()
* [Mesh]()