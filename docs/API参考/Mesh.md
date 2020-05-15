# Mesh（网格组件）

## 概述
网格组件用于表示3D图形对象的几何结构。

## 构造函数
Mesh()

该构造函数构造一个空的网格组件。

## 使用样例
```
let aPosition = new Float32Array([...]);
let aNormal = new Float32Array([...]);
let aUV = new Float32Array([...]);
let aIndex = new Int32Array([...]);

let pMesh = new Mesh();
pMesh.position = aPosition;
pMesh.normal = aNormal;
pMesh.uv = aUV;
pMesh.triangles = aIndex;
pMesh.Apply();
```

## 属性
* ### .position : Float32Array
    网格顶点坐标数组。
* ### .normal : Float32Array
    网格顶点法线数组。
* ### .uv : Float32Array
    网格顶点UV数组。
* ### .triangles : Int32Array
    网格索引数组。
* ### .material : Material
    网格渲染材质。

## 方法
* ### .SetVertices(pName: String, pArray: TypeArray) : void
    设置网格顶点数组。参数说明：
    1. pName : 顶点数组类型名称，可选值有
    ["position", "normal", "uv", "color", "tangent", "uv2", ..., "uv8"];
    2. pArray : 顶点数组对象;
* ### .SetIndices(nSubmesh: Int, pArray: TypeArray, nItemSize: Int) : void
    设置网格索引数组。参数说明：
    1. nSubmesh : 子网格索引;
    2. pArray : 索引数组对象;
    3. nItemSize : 索引数组类型，2-Int16Array, 4-Int32Array;
* ### .SetMaterial(nSubmesh: Int, pMaterial: Material) : void
    设置网格材质。参数说明：
    1. nSubmesh : 子网格索引;
    2. pMaterial : 材质对象;
* ### .Apply() : void
    应用当前网格数据应用。

## 相关对象完整接口参见：
* [Material]()