# MiaokitJS帮助文档（测试版）
  
## 简介
【__注意：当前产品尚未可用，预计2019年10月发布上线__】  
MiaokitJS是一个轻量级的、移动WEB优先的3D数据可视化框架。框架基于Webassembly和TypeScript开发，具有体量轻、加载速度快、运行效率高等优势。  
框架的“图形渲染”模块参考Unity引擎设计语言设计，并支持Unity引擎扩展，有Unity开发经验的用户将能够很容易上手该框架。  
框架的“场景装载”模块支持装载和访问[SVE](http://sve.yongtoc.com/)所制作打包的三维场景，支持装载倾斜摄影实景模型，并且兼容WMTS标准。可以实现从地球视图到区域、园区、楼宇、楼层、房间、设备等不同级别对象的访问以及进行数据关联绑定。  
框架的“逻辑交互”模块提供了一些基本的三维可视化交互方法，使用户可以基于这些公开的API快速地实现一个可交互的三维可视化产品。
  
### 运行环境
MiaokitJS框架需要运行在支持ES6.0、WebGL2.0、Webassembly特性的浏览器环境中，目前主流的PC和移动端浏览器均已支持。
  
### 项目地址
MiaokitJS框架前端JavaScript代码目前已经开源在[GitHub](https://github.com/YONGTOC/MiaokitJS)上，欢迎为该项目做贡献。
  
### 项目交流
商务合作：400-808-3066 
技术交流QQ群：333184682
  
## 基本对象
通过理解以下列出的各个框架所包含的基本对象，我们将对MiaokitJS框架有个基本理解。  
  
### 图形渲染
- GameObject：3D图形对象，一个3D场景由多个GameObject组成；
- Mesh：3D网格组件，描述一个3D图形对象的三维空间形态；
- TileMesh：3D地图瓦片网格组件，不同于Mesh，它是基于瓦片数据的，经LOD管理的动态网格；
- Transform：3D变换组件，描述一个3D图形对象的空间位置，旋转和大小缩放，以及不同对象间的层级关系；
- Material：渲染材质，用于控制3D网格渲染效果；
- Texture2D：贴图，用于设置3D网格的表面纹理；
- Camera：摄像机组件，观察三维场景的抽象摄像机，用于将视野范围内的三维场景投影到画布上；
  
### 场景装载
- World：世界，虚拟的三维地球、GIS地图；
- Tile：地图瓦片，[SVE](http://sve.yongtoc.com/)导出的工程数据将被作为一个Tile装载到World中，World可以同时装载多个Tile，为了优化性能和内存开销，需要基于某些机制动态装载卸载Tile；
- Scene：三维场景，一个Tile可以包含多个Scene，通常是一个外景与多个建筑内景；
- Layer：场景图层，一个Scene可以由多个Layer叠加组成。通常，在[SVE](http://sve.yongtoc.com/)中，使用用Layer指代建筑内景中的一个楼层；
- Room：空间区域，一个Layer包含多个Room，通常，在[SVE](http://sve.yongtoc.com/)中，室内用Room指代一个房间、大厅、过道等空间区域；
- Object3D：三维对象。大楼、楼层、门、窗、幕墙、家具、设备、资产等不同级别的三维对象以及不可见对象都用Object3D表示，区别于GameObject，Object3D包含了UUID和资产属性等信息，这些信息一般关联着数据库记录；
- RoadPoint：路径节点，[SVE](http://sve.yongtoc.com/)规划路径中的节点对象，通常用于定位和导航规划；
- Site：位置标记。[SVE](http://sve.yongtoc.com/)规划路径中的位置标记对象，通常用于定位和导航规划；
  
### 逻辑交互
- MiaokitLoader：MiaokitJS框架装载器，使用MiaokitJS框架的唯一入口，每个框架实例在其独立的闭包环境中运行，即，可以在页面中创建多个框架实例显示多个可视化界面；
- SVE：[SVE](http://sve.yongtoc.com/)场景装载器，用于动态装载卸载瓦片数据，访问当前已装载瓦片的不同层级对象数据，控制不同层级对象的表现和行为；
- CameraCtrl：MiaokitJS框架提供的默认摄像机控制器，用于在三维场景中漫游查看；
- Navigator：导航路径生成器，用于搜索两个位置点间的最优路径；
- Navigation：MiaokitJS框架提供的默认导航控制器，提供包括路径绘制、模拟导航、实时导航、定位跟踪、语言播报、摄像机跟随等功能；
- 矢量数学库：Vector2、Vector3、Vector4等矢量数据的表示和计算；
- 辅助工具：包含计时器、数据异步加载器、调试跟踪器等辅助工具；