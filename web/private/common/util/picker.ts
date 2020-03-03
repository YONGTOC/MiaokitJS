
class EntityPicker {
    /// 构造函数。
    public constructor(pCameraCtrl) {
        this.m_pCameraCtrl = pCameraCtrl
    }

    /// 选中一个对象。
    public Select(): any {
        let pObject = MiaokitJS.Miaokit.PickEntity(0xFFFFFFF);
        if (pObject) {
            let nEntity = this.Stack(pObject);
            if (nEntity) {
                if (nEntity !== this.entity) {
                    nEntity.m_pViewState = nEntity.m_pUserData.viewState;

                    if (this.entity) {
                        this.entity.m_pObject3D.highlight = false;
                    }

                    //if ("Layer" === nEntity.m_pUserData._type_name) {
                    //    nEntity.m_pObject3D.enableCollider = false;
                    //    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
                    //}

                    this.m_aStack.push(nEntity);

                    this.entity.m_pObject3D.highlight = true;
                }
                else {
                    if ("Attachment" === nEntity.m_pUserData._type_name) {
                        /// 重复点击楼宇模型，切换到楼内场景
                        if (2 === nEntity.m_pUserData.entityType && 202 === nEntity.m_pUserData.secondType) {
                            this.EnterScene(nEntity.m_pUserData.flag);
                            return this.entity;
                        }
                    }
                }
            }

            if (1 === this.m_aStack.length) {
                this.m_pFirstView = this.m_pCameraCtrl.curView;
            }

            return nEntity;
        }

        return null;
    }

    /// 撤销选中当前对象。
    public UnSelect(): any {
        if (0 < this.m_aStack.length) {
            let pLast = this.m_aStack.pop();
            if (pLast) {
                pLast.m_pObject3D.highlight = false;
            }

            /// 堆栈中仍有对象，则高亮栈顶对象，否则将场景也移除出堆栈
            if (this.entity) {
                this.entity.m_pObject3D.highlight = true;
            }
            else {
                this.PopScene();
            }

            if (0 === this.m_aStack.length && this.m_pFirstView) {
                this.m_pCameraCtrl.Jump(this.m_pFirstView.m_eCtrlMode, this.m_pFirstView);
                this.m_pFirstView = null;
            }
        }
        else {
            this.PopScene();
        }

        return this.entity;
    }

    /// 选择合适的对象入栈。
    private Stack(pObject): any {
        if (null === this.scene) {
            this.FindScene(pObject);

            if (null === this.scene) {
                return null;
            }
        }

        /// 栈顶元素
        let pTop = this.entity;
        /// 上一个检测的元素
        let pLast = null;
        /// 待入栈对象
        let pPush = null;

        /// 不断向顶层尝试入栈，将最顶层能入栈对象入栈
        while (pObject) {
            let pItem = this.CheckStackable(pObject);
            if (pItem) {
                /// 找到栈顶元素，推出追寻
                if (pTop && pTop.m_pObject3D === pItem.m_pObject3D) {
                    pPush = pLast || pTop;
                    break;
                }
                else {
                    pLast = pItem;
                }
            }

            pObject = pObject.parent;
        }

        if (!pTop) {
            pPush = pLast;
        }

        return pPush;
    }

    /// 获得拾取对象所属场景。
    private FindScene(pObject): void {
        /// 不断向顶层尝试入栈，将最顶层能入栈对象入栈
        while (pObject) {
            let pItem = this.CheckStackable(pObject);
            if (pItem && "Scene" === pItem.m_pUserData._type_name) {
                this.PushScene(pItem.m_pUserData);
                return;
            }

            pObject = pObject.parent;
        }
    }

    /// 检测对象是否可以添加到拾取堆栈中。
    private CheckStackable(pObject): any {
        let pData = pObject.data;
        if (pData) {
            let bStackable = false;

            /// 当前未选中任何场景和实体时，追溯到场景节点
            if (null == this.scene && null == this.entity) {
                if ("Scene" === pData._type_name) {
                    bStackable = true;
                }
            }
            else {
                /// 当前场景有多层时，才会将场景根节点和楼层根节点添加到拾取堆栈中
                if (1 < this.scene.layers.length && ("Layer" === pData._type_name || "Scene" === pData._type_name)) {
                    bStackable = true;
                }
                /// 楼层对象可选中
                else if ("Layer" === pData._type_name) {
                    bStackable = true;
                }
                /// 实体对象可选中
                else if ("Attachment" === pData._type_name) {
                    /// 不选中楼宇模型打组的根节点
                    if (0 < pData.entityType && 1 < pData.secondType) {
                        bStackable = true;
                    }
                }
                /// 用户自定义对象片段
                else if (pData.stackable) {
                    bStackable = true;
                }
            }

            if (bStackable) {
                return {
                    /// 点击命中的3D对象。
                    m_pObject3D: pObject,
                    /// 3D对象绑定的数据。
                    m_pUserData: pData,
                    /// 3D对象的观察视角设定。
                    m_pViewState: null
                }
            }
        }

        return null;
    }

    /// 清空拾取队列。
    private ClearStack(): void {
        if (this.entity) {
            this.entity.m_pObject3D.highlight = false;
            this.m_aStack = [];
        }
    }

    /// 点击进入场景。
    public EnterScene(nIndex): void {
        let pScene = MiaokitJS.Miaokit.GetScene(nIndex);
        if (pScene) {
            this.ClearStack();
            this.PushScene(pScene);

            let pEntity = {
                /// 点击命中的3D对象。
                m_pObject3D: pScene.object3D,
                /// 3D对象绑定的数据。
                m_pUserData: pScene,
                /// 3D对象的观察视角设定。
                m_pViewState: pScene.viewState
            }

            this.m_aStack.push(pEntity);
            this.entity.m_pObject3D.highlight = true;

            console.log("进入场景:", pScene);
        }
    }

    /// 点击进入场景。
    public EnterScene2(pScene): void {
        if (pScene) {
            this.ClearStack();
            this.PushScene(pScene);

            let pEntity = {
                /// 点击命中的3D对象。
                m_pObject3D: pScene.object3D,
                /// 3D对象绑定的数据。
                m_pUserData: pScene,
                /// 3D对象的观察视角设定。
                m_pViewState: pScene.viewState
            }

            this.m_aStack.push(pEntity);
            this.entity.m_pObject3D.highlight = true;

            console.log("进入场景:", pScene);
        }
    }

    /// 将场景压入栈中。
    public PushScene(pScene): void {
        /// 第一个场景激活状态不改变
        if (1 < this.m_aSceneStack.length) {
            this.scene.object3D.active = false;
        }

        console.log("场景入栈：", pScene.id);

        this.m_aSceneStack.push(pScene);
        this.ActiveScene(pScene);

        let pBinding = pScene.binding;
        if (pBinding) {
            let pBindingObj = pBinding.object3D;
            if (pBindingObj) {
                pBindingObj.active = false;
            }
        }
    }

    /// 将场景从栈中移除。
    public PopScene(): void {
        if (0 < this.m_aSceneStack.length) {
            /// 第一个场景激活状态不改变
            if (1 < this.m_aSceneStack.length) {
                this.scene.object3D.active = false;
            }

            console.log("场景出栈：", this.scene.id);

            let pScene = this.m_aSceneStack.pop();
            let pBinding = pScene.binding;
            if (pBinding) {
                let pBindingObj = pBinding.object3D;
                if (pBindingObj) {
                    pBindingObj.active = true;
                }
            }
        }
    }

    /// 激活场景。
    public ActiveScene(pScene): void {
        if (pScene.OnSelect) {
            pScene.OnSelect();
        }

        pScene.object3D.active = true;
    }


    /// 当前选中实体。
    public get entity() {
        if (0 < this.m_aStack.length) {
            return this.m_aStack[this.m_aStack.length - 1];
        }

        return null;
    }

    /// 当前选中场景。
    public get scene() {
        if (0 < this.m_aSceneStack.length) {
            return this.m_aSceneStack[this.m_aSceneStack.length - 1];
        }

        return null;
    }

    /// 当前是否处于室内。
    public get indoor() {
        return 1 < this.m_aSceneStack.length;
    }


    /// 未选中任何对象前的视角。
    private m_pFirstView: any = [];
    /// 摄像机控制器。
    private m_pCameraCtrl: any = null;
    /// 选中实体堆栈。
    private m_aStack: any[] = [];
    /// 场景堆栈。
    private m_aSceneStack: any[] = [];
}


MiaokitJS.UTIL = MiaokitJS.UTIL || {};
MiaokitJS.UTIL.EntityPicker = EntityPicker;
