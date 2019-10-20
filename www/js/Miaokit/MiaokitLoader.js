let MiaokitModule = function (pID = "WWW.YONGTOC.COM") {
    let MiaokitDC = this;
    MiaokitDC["m_pID"] = pID;
    MiaokitDC["Merge"](MiaokitDC);
};
let MiaokitMerge = (function (Module) {
    let aClosure = [];
    Module["Merge"] = Module["Merge"] || function (MiaokitDC) {
        for (let pClosure of aClosure) {
            let aMember = pClosure(MiaokitDC);
            if (aMember) {
                for (let pMember of aMember) {
                    MiaokitDC[pMember.name] = pMember;
                }
            }
        }
    };
    return function (pClosure) {
        aClosure.push(pClosure);
    };
})(MiaokitModule.prototype);
MiaokitMerge(MiaokitDC => {
    let GetObject = undefined;
    let Analyze = undefined;
    let pHandler = {};
    let Generator = function (pIter, bArray = undefined) {
        let nCur = 0;
        this.length = pIter(-1);
        this[Symbol.iterator] = function () {
            return {
                next() {
                    let nObject = pIter(nCur);
                    if (nObject) {
                        let pObject = GetObject(nObject);
                        nCur = bArray ? nCur + 1 : pObject.m_nObject;
                        return {
                            value: pObject,
                            done: false
                        };
                    }
                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        };
    };
    pHandler["Transform"] = function (pProto) {
        Object.defineProperty(pProto, 'position', {
            get: function () {
                let nAddr = this["_GetPosition"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetPosition"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'euler', {
            get: function () {
                let nAddr = this["_GetEuler"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetEuler"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'rotation', {
            get: function () {
                let nAddr = this["_GetRotation"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2], w: aMemory[nAddr + 3] };
            },
            set: function (mValue) {
                this["_SetRotation"](mValue.x, mValue.y, mValue.z, mValue.w);
            }
        });
        Object.defineProperty(pProto, 'scale', {
            get: function () {
                let nAddr = this["_GetScale"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetScale"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'localPosition', {
            get: function () {
                let nAddr = this["_GetLocalPosition"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetLocalPosition"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'localEuler', {
            get: function () {
                let nAddr = this["_GetLocalEuler"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetLocalEuler"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'localRotation', {
            get: function () {
                let nAddr = this["_GetLocalRotation"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2], w: aMemory[nAddr + 3] };
            },
            set: function (mValue) {
                this["_SetLocalRotation"](mValue.x, mValue.y, mValue.z, mValue.w);
            }
        });
        Object.defineProperty(pProto, 'localScale', {
            get: function () {
                let nAddr = this["_GetLocalScale"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetLocalScale"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'right', {
            get: function () {
                let nAddr = this["_GetRight"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function (mValue) {
                this["_SetRight"](mValue.x, mValue.y, mValue.z);
            }
        });
        Object.defineProperty(pProto, 'up', {
            get: function () {
                let nAddr = this["_GetUp"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function () {
                let nAddr = this["_SetUp"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            }
        });
        Object.defineProperty(pProto, 'forward', {
            get: function () {
                let nAddr = this["_GetForward"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            },
            set: function () {
                let nAddr = this["_SetForward"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            }
        });
        pProto["Rotate"] = function (mEuler, nRelativeTo) {
            this["_Rotate"](mEuler.x, mEuler.y, mEuler.z, nRelativeTo);
        };
        pProto["Rotate2"] = function (mAxis, nAngle, nRelativeTo) {
            this["_Rotate2"](mAxis.x, mAxis.y, mAxis.z, nAngle, nRelativeTo);
        };
        pProto["Translate"] = function (mOffset, nRelativeTo) {
            this["_Translate"](mOffset.x, mOffset.y, mOffset.z, nRelativeTo);
        };
    };
    pHandler["GameObject"] = function (pProto) {
        Object.defineProperty(pProto, 'transform', {
            get: function () {
                return GetObject(this["_GetTransform"]());
            }
        });
        Object.defineProperty(pProto, 'mesh', {
            get: function () {
                return GetObject(this["_GetMesh"]());
            },
            set: function (pMesh) {
                this["_SetMesh"](pMesh.m_nObject);
            }
        });
        Object.defineProperty(pProto, 'children', {
            get: function () {
                let pThis = this;
                return new Generator(function (pCur) {
                    return pThis._IterChild(pCur);
                }, true);
            }
        });
        Object.defineProperty(pProto, 'parent', {
            get: function () {
                return GetObject(this["_GetParent"]());
            }
        });
        Object.defineProperty(pProto, 'data', {
            get: function () {
                return GetObject(this["_GetUserData"]());
            },
            set: function (nDataID) {
            }
        });
        Object.defineProperty(pProto, 'enableCollider', {
            set: function (bActived) {
                this["_EnableCollider"](bActived);
            }
        });
        Object.defineProperty(pProto, 'active', {
            set: function (bActived) {
                this["_Active"](bActived);
            }
        });
        Object.defineProperty(pProto, 'highlight', {
            set: function (bActived) {
                this["_Highlight"](bActived);
            }
        });
        MiaokitDC["GameObject"] = function () {
            return GetObject(pProto._GameObject());
        };
    };
    pHandler["Miaokit"] = function (pProto) {
        pProto["LoadTile"] = function (aData) {
            let nAddr = this["_Malloc"](aData.byteLength);
            if (nAddr) {
                MiaokitDC["WASM"]["HEAPU8"](nAddr, aData.byteLength).set(new Uint8Array(aData));
                let nTileID = this["_LoadTile"](nAddr, aData.byteLength);
                let pTile = GetObject(nTileID);
                return pTile;
            }
            return null;
        };
        pProto["Analyze"] = function (nFps) {
            let nInfo = this["_Analyze"]();
            let nSize = MiaokitDC["WASM"].HEAP32()[nInfo / 4];
            let pInfo = MiaokitDC["WASM"].GetString(nInfo + 4, nSize);
            try {
                let jInfo = JSON.parse(pInfo);
                let aInfo = Analyze(nFps).concat(jInfo);
                return aInfo;
            }
            catch (e) {
                console.log(pInfo);
            }
            return null;
        };
        pProto["PickEntity"] = function (nLayers) {
            return GetObject(this["_PickEntity"](nLayers));
        };
        pProto["GetScene"] = function (nIndex) {
            return GetObject(this["_GetScene"](nIndex));
        };
        Object.defineProperty(pProto, 'camera', {
            get: function () {
                return GetObject(this["_GetCamera"]());
            }
        });
        Object.defineProperty(pProto, 'gis', {
            get: function () {
                if (!this._gis) {
                    this._gis = pHandler["Gis"]["g_pIns"];
                }
                return this._gis;
            }
        });
    };
    pHandler["Mesh"] = function (pProto) {
        pProto["SetVertices"] = function (pName, pArray) {
            this["m_aVertex"] = this["m_aVertex"] || [];
            this["m_aVertex"].push({
                m_pArray: pArray,
                m_nSlot: this["_SlotLut"][pName],
                m_nItemSize: this["_SizeLut"][pName]
            });
        };
        pProto["SetIndices"] = function (nSubmesh, pArray, nItemSize) {
            this["m_aIndex"] = this["m_aIndex"] || [];
            this["m_aIndex"][nSubmesh] = {
                m_pArray: pArray,
                m_nItemSize: nItemSize
            };
        };
        pProto["SetMaterial"] = function (nSubmesh, pMaterial) {
            this["_SetMaterial"](nSubmesh, pMaterial.m_nObject);
        };
        pProto["Apply"] = function () {
            let aVertex = this["m_aVertex"];
            let aIndex = this["m_aIndex"];
            if (!aVertex || !aIndex) {
                return;
            }
            let nDescSize = 2 + 2 * aVertex.length + 3 * aIndex.length;
            let nDescPtr = this._CreateBuffer(nDescSize);
            let aDesc = MiaokitDC["WASM"]["HEAP32"](nDescPtr, nDescSize * 4);
            let nIndex = 0;
            aDesc[nIndex++] = aVertex.length;
            aDesc[nIndex++] = aIndex.length;
            for (let i = 0; i < aVertex.length; i++) {
                aDesc[nIndex++] = aVertex[i].m_nSlot;
                aDesc[nIndex++] = aVertex[i].m_pArray.length / aVertex[i].m_nItemSize;
            }
            for (let i = 0; i < aIndex.length; i++) {
                aDesc[nIndex++] = 0;
                aDesc[nIndex++] = 0;
                aDesc[nIndex++] = aIndex[i].m_pArray.length;
            }
            this._CreateBuffer(0);
            for (let i = 0; i < aVertex.length; i++) {
                let aData = aVertex[i].m_pArray;
                let nBuffer = this._GetVertexBuffer(i);
                let pBuffer = MiaokitDC["WASM"]["HEAPF32"](nBuffer, aData.length * 4);
                pBuffer.set(aData);
            }
            for (let i = 0; i < aIndex.length; i++) {
                let aData = aIndex[i].m_pArray;
                let nBuffer = this._GetIndexBuffer(i);
                let pBuffer = MiaokitDC["WASM"]["HEAP32"](nBuffer, aData.length * 4);
                pBuffer.set(aData);
            }
            this._Apply();
            this["m_aVertex"] = undefined;
            this["m_aIndex"] = undefined;
        };
        pProto["_SlotLut"] = {
            "position": 0,
            "normal": 1,
            "uv": 2,
            "color": 3,
            "tangent": 4,
            "uv2": 9,
            "uv3": 10,
            "uv4": 11,
            "uv5": 12,
            "uv6": 13,
            "uv7": 14,
            "uv8": 15
        };
        pProto["_SizeLut"] = {
            "position": 3,
            "normal": 3,
            "uv": 2,
            "color": 4,
            "tangent": 4,
            "uv2": 2,
            "uv3": 2,
            "uv4": 2,
            "uv5": 2,
            "uv6": 2,
            "uv7": 2,
            "uv8": 2
        };
        Object.defineProperty(pProto, 'position', {
            set: function (value) {
                this.SetVertices("position", value);
            }
        });
        Object.defineProperty(pProto, 'normal', {
            set: function (value) {
                this.SetVertices("normal", value);
            }
        });
        Object.defineProperty(pProto, 'uv', {
            set: function (value) {
                this.SetVertices("uv", value);
            }
        });
        Object.defineProperty(pProto, 'triangles', {
            set: function (value) {
                this.SetIndices(0, value);
            }
        });
        Object.defineProperty(pProto, 'material', {
            set: function (value) {
                this.SetMaterial(0, value);
            }
        });
        MiaokitDC["Mesh"] = function () {
            return GetObject(pProto._Mesh());
        };
    };
    pHandler["Texture2D"] = function (pProto) {
        pProto["SetImageData"] = function (aData) {
            let nAddr = this._CreateBuffer(aData.byteLength);
            if (nAddr) {
                MiaokitDC["WASM"]["HEAPU8"](nAddr, aData.byteLength).set(new Uint8Array(aData));
                this._Apply();
            }
        };
        pProto["Load"] = function (pFileName) {
            let pThis = this;
            MiaokitDC["Fetch"](pFileName, function (aData) {
                if (aData) {
                    pThis.SetImageData(aData);
                }
            });
        };
        MiaokitDC["Texture2D"] = function () {
            return GetObject(pProto._Texture2D());
        };
    };
    pHandler["Material"] = function (pProto) {
        Object.defineProperty(pProto, 'mainTexture', {
            get: function () {
                return GetObject(this["_GetTexture"]());
            },
            set: function (pTexture) {
                this["_SetTexture"](pTexture.m_nObject);
            }
        });
        MiaokitDC["Material"] = function () {
            return GetObject(pProto._Material());
        };
    };
    pHandler["Tile"] = function (pProto) {
        Object.defineProperty(pProto, 'scenes', {
            get: function () {
                let pThis = this;
                return new Generator(function (pCur) {
                    return pThis._IterWork(pCur);
                });
            }
        });
    };
    pHandler["Scene"] = function (pProto) {
        pProto["GetLayer"] = function (nIndex) {
            return GetObject(this["_GetLayer"](nIndex));
        };
        Object.defineProperty(pProto, 'id', {
            get: function () {
                if (!this._id) {
                    let nSize = this._GetID(0);
                    let nAddr = this._GetID(1);
                    this._id = MiaokitDC["WASM"].GetString(nAddr, nSize);
                }
                return this._id;
            }
        });
        Object.defineProperty(pProto, 'layers', {
            get: function () {
                let pThis = this;
                return new Generator(function (pCur) {
                    return pThis._IterLayer(pCur);
                });
            }
        });
        Object.defineProperty(pProto, 'object3D', {
            get: function () {
                if (undefined === this._object3D) {
                    let nObject = this._GetObject(this.m_nObject);
                    if (0 === nObject) {
                        this._object3D = null;
                        return null;
                    }
                    this._object3D = GetObject(nObject);
                }
                return this._object3D;
            }
        });
        Object.defineProperty(pProto, 'viewState', {
            get: function () {
                return {
                    m_mTarget: { x: 0, y: 0, z: 0 },
                    m_nPitch: 45,
                    m_nYaw: 0,
                    m_nDistance: 60,
                    m_mOrthoTarget: { x: 0, y: 0, z: 0 },
                    m_nOrthoScaled: 0,
                    m_nOrthoRotate: 0
                };
            }
        });
        Object.defineProperty(pProto, 'binding', {
            get: function () {
                return GetObject(this._GetBinding());
            }
        });
    };
    pHandler["Layer"] = function (pProto) {
        Object.defineProperty(pProto, 'id', {
            get: function () {
                if (!this._id) {
                    let nSize = this._GetID(0);
                    let nAddr = this._GetID(1);
                    this._id = MiaokitDC["WASM"].GetString(nAddr, nSize);
                }
                return this._id;
            }
        });
        Object.defineProperty(pProto, 'sites', {
            get: function () {
                let pThis = this;
                return new Generator(function (pCur) {
                    return pThis._IterSite(pCur);
                });
            }
        });
        Object.defineProperty(pProto, 'object3D', {
            get: function () {
                if (undefined === this._object3D) {
                    let nObject = this._GetObject(this.m_nObject);
                    if (0 === nObject) {
                        this._object3D = null;
                        return null;
                    }
                    this._object3D = GetObject(nObject);
                }
                return this._object3D;
            }
        });
        Object.defineProperty(pProto, 'viewState', {
            get: function () {
                let nState = this["_GetViewState"]();
                if (0 < nState) {
                    let aState = MiaokitDC["WASM"]["HEAPF32"](nState, 4 * 11);
                    let nIndex = 0;
                    return {
                        m_mTarget: { x: aState[nIndex++], y: aState[nIndex++], z: aState[nIndex++] },
                        m_nPitch: aState[nIndex++],
                        m_nYaw: aState[nIndex++],
                        m_nDistance: aState[nIndex++],
                        m_mOrthoTarget: { x: aState[nIndex++], y: aState[nIndex++], z: aState[nIndex++] },
                        m_nOrthoScaled: aState[nIndex++],
                        m_nOrthoRotate: aState[nIndex++]
                    };
                }
                return null;
            }
        });
    };
    pHandler["Attachment"] = function (pProto) {
        Object.defineProperty(pProto, 'entityType', {
            get: function () {
                return this._GetEntityType();
            }
        });
        Object.defineProperty(pProto, 'secondType', {
            get: function () {
                return this._GetSecondType();
            }
        });
        Object.defineProperty(pProto, 'flag', {
            get: function () {
                return this._GetFlag();
            }
        });
        Object.defineProperty(pProto, 'object3D', {
            get: function () {
                return GetObject(this._GetObject());
            }
        });
        Object.defineProperty(pProto, 'viewState', {
            get: function () {
                return {
                    m_mTarget: { x: 0, y: 0, z: 0 },
                    m_nPitch: 45,
                    m_nYaw: 0,
                    m_nDistance: 100,
                    m_mOrthoTarget: { x: 0, y: 0, z: 0 },
                    m_nOrthoScaled: 0,
                    m_nOrthoRotate: 0
                };
            }
        });
    };
    pHandler["Site"] = function (pProto) {
        Object.defineProperty(pProto, 'id', {
            get: function () {
                if (!this._id) {
                    let nSize = this._GetID(0);
                    let nAddr = this._GetID(1);
                    this._id = MiaokitDC["WASM"].GetString(nAddr, nSize);
                }
                return this._id;
            }
        });
        Object.defineProperty(pProto, 'layer', {
            get: function () {
                return GetObject(this["_Layer"]());
            }
        });
        Object.defineProperty(pProto, 'scene', {
            get: function () {
                return GetObject(this["_Scene"]());
            }
        });
        Object.defineProperty(pProto, 'type', {
            get: function () {
                return this["_Type"]();
            }
        });
        Object.defineProperty(pProto, 'number', {
            get: function () {
                return this["_Number"]();
            }
        });
        Object.defineProperty(pProto, 'position', {
            get: function () {
                let nAddr = this["_Position"]() / 4;
                let aMemory = MiaokitDC["WASM"].HEAPF32();
                return { x: aMemory[nAddr], y: aMemory[nAddr + 1], z: aMemory[nAddr + 2] };
            }
        });
    };
    pHandler["Prefab"] = function (pProto) {
        pProto["Instantiate"] = function () {
            return GetObject(this["_Instantiate"]());
        };
        MiaokitDC["LoadPrefab"] = function (pUrl, pCallback) {
            MiaokitDC["Fetch"](pUrl, function (aData) {
                let pOut = null;
                if (aData) {
                    let nObjectID = pProto._Prefab();
                    let pObject = GetObject(nObjectID);
                    let nAddr = pObject.CreateBuffer(aData.byteLength);
                    if (nAddr) {
                        MiaokitDC["WASM"]["HEAPU8"](nAddr, aData.byteLength).set(new Uint8Array(aData));
                        pObject.Apply();
                        pOut = pObject;
                    }
                }
                pCallback(pOut);
            });
        };
    };
    pHandler["Gis"] = function (pProto) {
        pProto["Update"] = function (rLng, rLat, nHeight) {
            return this["_Update"](rLng, rLat, nHeight);
        };
        pProto["AddSvetile"] = function (pDesc) {
            let aUrl = MiaokitDC["WASM"]["EncodeString"](pDesc.m_pUrl);
            let nDesc = this["_CreateSvetileDesc"](aUrl.byteLength);
            let aDescI = MiaokitDC["WASM"]["HEAPU32"](nDesc, 4 * 8);
            aDescI[0] = pDesc.m_nID;
            aDescI[1] = pDesc.m_nFlags;
            MiaokitDC["WASM"]["HEAPU8"](aDescI[2], aUrl.byteLength).set(aUrl, 0);
            aDescI[3] = 0;
            aDescI[4] = MiaokitDC["WASM"]["RegisterDelegate"](function (nTile, nActive) {
                pDesc.OnActive(GetObject(nTile), 0 < nActive);
            });
            let aArea = MiaokitDC["WASM"]["HEAPF32"](nDesc + 20, 16);
            aArea[0] = pDesc.m_mLngLat.x;
            aArea[1] = pDesc.m_mLngLat.y;
            aArea[2] = pDesc.m_mSize.x;
            aArea[3] = pDesc.m_mSize.y;
            this["_AddSvetile"](nDesc);
        };
    };
    function LoadClass(pList, pGet, pAnalyze) {
        GetObject = pGet;
        Analyze = pAnalyze;
        for (let pClass of pList) {
            if (pClass) {
                let pProto = pClass.prototype;
                if (pHandler[pProto._type_name]) {
                    pHandler[pProto._type_name](pProto);
                }
                if ("Miaokit" === pProto._type_name) {
                    MiaokitDC["Miaokit"] = new pClass(0, 0);
                }
                else if ("CameraCtrl" === pProto._type_name) {
                    pHandler["CameraCtrl"]["g_pIns"] = new pClass(0, 0);
                }
                else if ("Gis" === pProto._type_name) {
                    pHandler["Gis"]["g_pIns"] = new pClass(0, 0);
                }
            }
        }
    }
    MiaokitDC["WASM"] = MiaokitDC["WASM"] || {};
    MiaokitDC["WASM"]["LoadClass"] = LoadClass;
    return [];
});
MiaokitMerge(MiaokitDC => {
    let POLYGON_STYLE = 5;
    let POLYGON3D_STYLE = 6;
    let aServer = [
        "https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
        "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
        "https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
        "https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv"
    ];
    let aOriginServer = ["https://pcor.baidu.com/"];
    let pVersion = "001";
    let pUdt = "20190919";
    let nPixelRatio = 1;
    let pFeatureStyle = undefined;
    let pWaite = [];
    function LoadFS(pCallback) {
        let pUrl = aServer[0] + "/sty/vpl.js?udt=" + pUdt + "&v=" + pVersion;
        MiaokitDC["Request"]("GET", "text", pUrl, null, null, function (aData) {
            pFeatureStyle = eval(aData.substring(20));
            pCallback();
        });
    }
    function LoadVectorTileData(nCol, nRow, nLevel, pCallback) {
        let pKey = GetTileKey(nCol, nRow, nLevel);
        let pUrl = GetTilesUrl(nCol, nRow, nLevel);
        if (!pFeatureStyle) {
            if (undefined === pFeatureStyle) {
                pFeatureStyle = null;
                LoadFS(function () {
                    for (let func of pWaite) {
                        func();
                    }
                });
            }
            pWaite.push(function () {
                MiaokitDC["Request"]("GET", "text", pUrl, null, null, function (aData) {
                    pCallback(pKey, aData);
                });
            });
        }
        else {
            MiaokitDC["Request"]("GET", "text", pUrl, null, null, function (aData) {
                pCallback(pKey, aData);
            });
        }
    }
    function GetTileKey(nCol, nRow, nLevel) {
        return "B_NORMAL_MAP" + "_" + nCol + "_" + nRow + "_" + nLevel;
    }
    function GetTilesUrl(nCol_, nRow_, nLeve_) {
        let nCol = CalcLoopParam(nCol_, nLeve_);
        let nRow = nRow_;
        let nPath = Math.abs(nCol + nRow) % aServer.length;
        let pPath = aServer[nPath];
        if (2 === Math.abs(nCol + nRow) % 3) {
            pPath = aOriginServer[0];
        }
        let nLimit = (nLeve_ >= 3 && 9 >= nLeve_) ? 100 : 80;
        let pScaler = nPixelRatio > 1 ? "&scaler=2" : "";
        let pParam = "x=" + nCol + "&y=" + nRow + "&z=" + nLeve_;
        pParam += "&styles=pl&p=0&cm=1&limit=" + nLimit + pScaler + "&udt=" + pUdt + "&v=" + pVersion;
        let pUrl = pPath + "/pvd/?qt=tile" + "&param=" + EncodeUrl(pParam);
        return pUrl;
    }
    function CalcLoopParam(nCol, nLevel) {
        let nCount = 6 * Math.pow(2, nLevel - 3);
        let nStart = -nCount / 2;
        let nEnd = nCount / 2 - 1;
        for (; nCol > nEnd;) {
            nCol -= nCount;
        }
        for (; nStart > nCol;) {
            nCol += nCount;
        }
        return nCol;
    }
    function EncodeUrl(pUrl) {
        let pBinaryUrl = "";
        for (let i = 0; i < pUrl.length; i++) {
            let nChar = pUrl.charCodeAt(i) << 1;
            let pBinary = nChar.toString(2);
            let pBinary8 = pBinary;
            if (8 > pBinary.length) {
                pBinary8 = "00000000" + pBinary;
                pBinary8 = pBinary8.substr(pBinary.length, 8);
            }
            pBinaryUrl += pBinary8;
        }
        let nGap = 5 - pBinaryUrl.length % 5;
        let pAppend = "";
        for (let i = 0; i < nGap; i++) {
            pAppend += "0";
        }
        pBinaryUrl = pAppend + pBinaryUrl;
        let pOut = "";
        for (let i = 0; i < pBinaryUrl.length / 5; i++) {
            let pSubstring = pBinaryUrl.substr(5 * i, 5);
            let nCode = parseInt(pSubstring, 2) + 50;
            let nChar = String.fromCharCode(nCode);
            pOut += nChar;
        }
        return pOut + nGap;
    }
    function ParseData(pData, nLevel) {
        let jData = undefined;
        eval("jData = " + pData);
        return ParseRegion(jData, nLevel);
    }
    function ParseRegion(jData, nLevel) {
        let aData = [];
        let nCount = 0;
        let jRegionList = jData[2];
        let jRoadList = jData[6];
        if (jRegionList) {
            for (let i = 0; i < jRegionList.length; i++) {
                let jRegion = jRegionList[i];
                let jFStyle = pFeatureStyle[jRegion[5]];
                if (18 <= nLevel && POLYGON3D_STYLE === jFStyle[0]) {
                    let pID = jRegion[1];
                    let nHeight = jRegion[3] * Math.pow(2, nLevel - 18);
                    aData.push(0.0);
                    aData.push(1.0);
                    aData.push(1.0);
                    aData.push(1.0);
                    aData.push(1.0);
                    aData.push(1.0);
                    aData.push(nHeight);
                    ParseFeature(jRegion, "Building", aData);
                    nCount++;
                }
                else if (POLYGON_STYLE === jFStyle[0]) {
                    if (jRegion[4] && "090301" === jRegion[4].toString()) {
                        continue;
                    }
                    let pColor = jFStyle[1];
                    let aColor = pColor.split(',');
                    aData.push(0.0);
                    aData.push(2.0);
                    aData.push(parseInt(aColor[0]));
                    aData.push(parseInt(aColor[1]));
                    aData.push(parseInt(aColor[2]));
                    aData.push(parseInt(aColor[3]));
                    aData.push(0.0);
                    ParseFeature(jRegion, "Area", aData);
                    nCount++;
                }
            }
        }
        if (jRoadList) {
            for (let i = 0; i < jRoadList.length; i++) {
                let jRegion = jRoadList[i];
                let jFStyle = pFeatureStyle[jRegion[5]];
                let pColor = jFStyle[1];
                let aColor = pColor.split(',');
                aData.push(0.0);
                aData.push(3.0);
                aData.push(parseInt(aColor[0]));
                aData.push(parseInt(aColor[1]));
                aData.push(parseInt(aColor[2]));
                aData.push(parseInt(aColor[3]));
                aData.push(0.0);
                ParseFeature(jRegion, "Road", aData);
                nCount++;
            }
        }
        return { m_nCount: nCount, m_aData: aData };
    }
    function ParseFeature(jRegion, pType, aData) {
        let jPolygon = jRegion[0];
        let x = 0.0;
        let z = 0.0;
        aData.push(jPolygon.length);
        if ("Building" === pType) {
            for (let i = 0; i < jPolygon.length; i++) {
                x += jPolygon[i][0] / 10;
                z += jPolygon[i][1] / 10;
                aData.push(x);
                aData.push(0.0);
                aData.push(z);
            }
        }
        else if ("Area" === pType || "Road" === pType) {
            for (let i = 0; i < jPolygon.length; i++) {
                x += jPolygon[i][0] / 10;
                z += jPolygon[i][1] / 10;
                aData.push(x);
                aData.push(0.0);
                aData.push(z);
            }
        }
    }
    function LoadBdmapTile(nCol, nRow, nLevel, pCallback) {
        LoadVectorTileData(nCol, nRow, nLevel, function (pKey, pText) {
            if (pText) {
                let pData = ParseData(pText, nLevel);
                pCallback(pData);
            }
            else {
                pCallback(null);
            }
        });
    }
    MiaokitDC["WASM"] = MiaokitDC["WASM"] || {};
    MiaokitDC["WASM"]["LoadBdmapTile"] = LoadBdmapTile;
    return [];
});
MiaokitMerge(MiaokitDC => {
    let m_pEngine = "Unity";
    let m_pEnginePath = "js/Miaokit/MiaokitU3D/Build/MiaokitU3D.json";
    let m_pModulePath = "./js/Miaokit/Miaokit.wasm";
    let m_aTiles = [];
    let pModuler = undefined;
    let bStarted = false;
    function Preload() {
        MiaokitDC["Track"]("Preload");
        MiaokitDC["Fetch"](m_pModulePath, function (aData) {
            if (pModuler) {
                pModuler(aData);
            }
            else {
                pModuler = aData;
            }
        });
        for (let i = 0; i < m_aTiles.length; i++) {
            let pTile = m_aTiles[i];
            MiaokitDC["Fetch"](pTile.m_pPath, function (aData) {
                pTile["m_pData"] = aData;
                pTile["m_pTile"] = null;
                if (m_aTiles["m_pLoader"]) {
                    m_aTiles["m_pLoader"](pTile);
                }
            });
        }
    }
    function Load(pStart, pUpdate) {
        MiaokitDC["Track"]("LoadEngine");
        MiaokitDC["WASM"]["LoadEngine"]({
            "OnEngineLoad": function (pApi) {
                MiaokitDC["Track"]("LoadEngine End");
                if (pModuler) {
                    MiaokitDC["Track"]("LoadMiaokit");
                    MiaokitDC["WASM"]["LoadMiaokit"](pModuler, pApi, function () {
                        Onload(function () {
                            pStart();
                            bStarted = true;
                        });
                    });
                }
                else {
                    MiaokitDC["Track"]("LoadMiaokit Delay");
                    pModuler = function (pBlob) {
                        MiaokitDC["WASM"]["LoadMiaokit"](pBlob, pApi, function () {
                            Onload(function () {
                                pStart();
                                bStarted = true;
                            });
                        });
                    };
                }
            },
            "OnPluginLoad": function () {
                MiaokitDC["Track"]("OnPluginLoad");
            },
            "OnPluginUnload": function () {
                MiaokitDC["Track"]("OnPluginUnload");
            },
            "OnRenderingEvent": function (nEventID) {
                if (bStarted) {
                    pUpdate(nEventID);
                }
            }
        });
    }
    function Onload(pCallback) {
        MiaokitDC["Track"]("LoadMiaokit End");
        let nCount = m_aTiles.length;
        if (0 == nCount) {
            pCallback();
        }
        m_aTiles["m_pLoader"] = function (pTile) {
            pTile["m_pTile"] = MiaokitDC["Miaokit"]["LoadTile"](pTile["m_pData"]);
            pTile["m_pData"] = null;
            if (0 === --nCount) {
                pCallback();
            }
        };
        for (let i = 0; i < m_aTiles.length; i++) {
            let pTile = m_aTiles[i];
            if (pTile["m_pData"]) {
                m_aTiles["m_pLoader"](pTile);
            }
        }
    }
    MiaokitDC["m_pLogo"] = null;
    MiaokitDC["m_pEngine"] = m_pEngine;
    MiaokitDC["m_pEnginePath"] = m_pEnginePath;
    MiaokitDC["m_pModulePath"] = m_pModulePath;
    MiaokitDC["m_aTiles"] = m_aTiles;
    return [Preload, Load];
});
MiaokitMerge(MiaokitDC => {
    class Mathf {
        static Clamp(v, min, max) {
            if (v > max) {
                return max;
            }
            if (v < min) {
                return min;
            }
            return v;
        }
    }
    class Vector3 {
        constructor(x, y, z) {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static Scale(s, a) {
            return { x: a.x * s, y: a.y * s, z: a.z * s };
        }
    }
    return [Mathf, Vector3];
});
MiaokitMerge(MiaokitDC => {
    let pTable = null;
    let pMemory = null;
    let pModule = null;
    let aDelegate = [null];
    let aObjectTable = [null];
    let nObjectFree = 1;
    let nObjectCount = 0;
    let aObjectCreater = [undefined];
    function InitImports(env) {
        let global = {
            "NaN": NaN,
            "Infinity": Infinity
        };
        env["memory"] = env["memory"] || new WebAssembly.Memory({ initial: 16, maximum: 32768 });
        env["__memory_start"] = env["__memory_start"] || function () {
            return env["memory"].buffer.byteLength;
        };
        env["__memory_grow"] = function (nSize) {
            env["memory"].grow(nSize / 64 / 1024);
        };
        env["__memory_recycle"] = function (nSize) {
            console.error("miaokit.__memory_recycle: can not recycle memory!");
        };
        env["__print"] = function (nMsgAddr, nMsgSize, nCtrl) {
            let pMsg = MiaokitDC["WASM"].GetString(nMsgAddr, nMsgSize);
            MiaokitDC["Track"](pMsg, nCtrl);
        };
        env["__load"] = function (nPathAddr, nPathLength, nObj, Alloc, Callback) {
            let pPath = MiaokitDC["WASM"].GetString(nPathAddr, nPathLength);
            let nObj_ = nObj;
            let Alloc_ = pTable.get(Alloc);
            let Callback_ = pTable.get(Callback);
            if (!pPath.startsWith("http")) {
                pPath = "http://sve.yongtoc.com/" + pPath;
            }
            MiaokitDC["Fetch"](pPath, function (aData) {
                if (aData) {
                    let nAddr = Alloc_(nObj_, aData.byteLength);
                    if (nAddr) {
                        MiaokitDC["WASM"]["HEAPU8"](nAddr, aData.byteLength).set(new Uint8Array(aData));
                    }
                }
                Callback_(nObj_);
            });
        };
        env["__create_js_obj"] = function (nType, nObject) {
            let nID = CreateObjectID();
            let pObject = new aObjectCreater[nType](nID, nObject);
            aObjectTable[nID] = pObject;
            aObjectCreater[nType].prototype._ins_count++;
            return nID;
        };
        env["__free_js_obj"] = function (pObject) {
            aObjectCreater[pObject._type_id].prototype._ins_count--;
            FreeObjectID(pObject["m_nID"]);
        };
        env["__do_action"] = function (nID, nObject, nCode, nData) {
            aDelegate[nID](nObject, nCode, nData);
        };
        env["__export_class"] = WrapModuleClass;
        env["__load_map_tile"] = LoadMapTile;
        env["__decode_ctm"] = DecodeCTM;
        env["__sin"] = Math.sin;
        env["__cos"] = Math.cos;
        env["__sqrt"] = Math.sqrt;
        env["__atan2"] = Math.atan2;
        env["__acos"] = Math.acos;
        env["__atan"] = Math.atan;
        env["__exp"] = Math.exp;
        env["__pow"] = Math.pow;
        pMemory = env["memory"];
        MiaokitDC["WASM"]["m_pMemory"] = MiaokitDC["WASM"]["m_pMemory"] || pMemory;
        return {
            "env": env,
            "global": global
        };
    }
    function LoadMiaokit(pBlob, pImports, pCallback) {
        pImports = InitImports(pImports);
        WebAssembly.instantiate(pBlob, pImports)
            .then(pModule_ => pModule_.instance)
            .then(pInstance => {
            pModule = pInstance.exports;
            pTable = pModule.__indirect_function_table;
            pInstance.exports.Start();
            pCallback();
        });
    }
    function GetObject(nID) {
        return aObjectTable[nID];
    }
    function CreateObjectID() {
        let nID = nObjectFree;
        if (aObjectTable.length > nObjectFree) {
            nObjectFree = aObjectTable[nObjectFree];
        }
        else {
            nObjectFree++;
        }
        nObjectCount++;
        return nID;
    }
    function FreeObjectID(nID) {
        aObjectTable[nID] = nObjectFree;
        nObjectFree = nID;
        nObjectCount--;
    }
    function Analyze(nFps) {
        let pInfo1 = "\'系统运行\':{";
        pInfo1 += "\'时间\':" + (MiaokitDC.Time() / 1000).toFixed(0);
        pInfo1 += ", \'帧率\':" + nFps;
        pInfo1 += ", \'WASM内存\':" + MiaokitDC.WASM.m_pMemory.buffer.byteLength / 1024 / 1024;
        pInfo1 += "}";
        let pInfo2 = "\'JS对象\':{";
        pInfo2 += "\'工厂\':[" + aObjectTable.length + ", " + nObjectCount + ", " + (aObjectTable.length - nObjectCount) + "]";
        for (let i = 1; i < aObjectCreater.length; i++) {
            pInfo2 += ", \'" + aObjectCreater[i].prototype._type_name + "\':" + aObjectCreater[i].prototype._ins_count;
        }
        pInfo2 += "}";
        return [pInfo1, pInfo2];
    }
    function WrapModuleClass(nAddr, nSize) {
        let aExport = MiaokitDC["WASM"]["HEAPU32"](nAddr, nSize);
        let nExportCount = aExport[0];
        let nIndex = aExport[1];
        for (let i = 0; i < nExportCount; i++) {
            let nCount = aExport[2 + i] - 1;
            let nSignAddr = aExport[nIndex++];
            let nSignSize = aExport[nIndex++];
            let pSign = MiaokitDC["WASM"].GetString(nSignAddr, nSignSize);
            let aSign = JSON.parse(pSign);
            let pClass = function (nID, nObject) {
                this["m_nID"] = nID;
                this["m_nObject"] = nObject;
            };
            let pProto = pClass.prototype;
            pProto["_type_name"] = aSign[0];
            pProto["_type_id"] = i + 1;
            pProto["_ins_count"] = 0;
            aObjectCreater[i + 1] = pClass;
            for (let j = 0; j < nCount; j++) {
                let pFunc_ = pTable.get(aExport[nIndex++]);
                nIndex++;
                let pFunc = function () {
                    let aArgs = Array.prototype.slice.call(arguments);
                    aArgs.unshift(this.m_nObject);
                    return pFunc_.apply(this, aArgs);
                };
                if (0 === j) {
                    pProto["_" + aSign[j]] = pFunc;
                }
                else {
                    pProto[aSign[j]] = pFunc;
                }
            }
        }
        MiaokitDC["WASM"]["LoadClass"](aObjectCreater, GetObject, Analyze);
    }
    function RegisterDelegate(pDelegate) {
        let nDelegate = aDelegate.length;
        aDelegate.push(pDelegate);
        return nDelegate;
    }
    function LoadMapTile(nID, nCol, nRow, nLevel, Alloc, Callback) {
        MiaokitDC["WASM"]["LoadBdmapTile"](nCol, nRow, nLevel, function (pData) {
            let Alloc_ = pTable.get(Alloc);
            let Callback_ = pTable.get(Callback);
            if (pData) {
                let nSize = 4 * pData.m_aData.length;
                let nAddr = Alloc_(nID, nSize);
                if (nAddr) {
                    MiaokitDC["WASM"]["HEAPF32"](nAddr, nSize).set(new Float32Array(pData.m_aData));
                }
                Callback_(nID, nAddr, pData.m_nCount);
            }
            else {
                Callback_(nID, 0, 0);
            }
        });
    }
    function DecodeCTM(nAddr, nSize) {
        let aData = MiaokitDC["WASM"]["HEAPU8"](nAddr, nSize);
        let pStream = new CTM.Stream(aData);
        let pFile = new CTM.File(pStream);
        let aIndex = pFile.body.indices;
        let aVertex = pFile.body.vertices;
        let aNormal = pFile.body.normals;
        let aUV = pFile.body.uvMaps;
        if (aUV && aUV.length) {
            aUV = aUV[0].uv;
        }
        let pMesh = MiaokitDC["CreateMesh"]();
        pMesh.SetGeometry({
            "Vertex": [
                { "Name": "Position", "Data": aVertex },
                { "Name": "UV", "Data": aUV },
            ],
            "Triangles": [aIndex]
        });
        return pMesh.m_nObject;
    }
    MiaokitDC["WASM"] = MiaokitDC["WASM"] || {};
    MiaokitDC["WASM"]["LoadMiaokit"] = LoadMiaokit;
    MiaokitDC["WASM"]["GetObject"] = GetObject;
    MiaokitDC["WASM"]["RegisterDelegate"] = RegisterDelegate;
    return [];
});
MiaokitMerge(MiaokitDC => {
    let m_nStartTime = Date.now();
    function Time() {
        return Date.now() - m_nStartTime;
    }
    function Track(pMsg, nCtrl = 0) {
        if (2 === nCtrl) {
            console.warn("Track:", Time(), pMsg);
        }
        else if (2 < nCtrl) {
            console.error("Track:", Time(), pMsg);
        }
        else {
            console.info("Track:", Time(), pMsg);
        }
    }
    function FetchX(pPath, pCallback, pProgress = undefined) {
        fetch(pPath)
            .then(pResponse => pResponse.arrayBuffer())
            .then(pBuffer => {
            if (null === pBuffer) {
                Track("Fetch failed: " + pPath, 2);
            }
            pCallback(pBuffer);
        }).catch(function (e) {
            Track("Fetch error: " + pPath, 2);
        });
        ;
    }
    function Fetch(pPath, pCallback, pProgress = undefined) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", pPath, true);
        xhr.responseType = "arraybuffer";
        xhr.onprogress = function (e) {
            if (0 < e.total && pProgress) {
                pProgress(e.loaded / e.total);
            }
        };
        xhr.onload = function (e) {
            if (xhr.status == 200) {
                pCallback(xhr.response);
            }
            else {
                Track(e, 2);
                pCallback(null);
            }
        };
        xhr.onerror = function (e) {
            Track(e, 2);
            pCallback(null);
        };
        xhr.send(null);
    }
    function Request(pType, pDataType, pUrl, pData, pProgress, pComplete) {
        let xhr = new XMLHttpRequest();
        xhr.onprogress = function (e) {
            if (0 < e.total && pProgress) {
                pProgress(e.loaded / e.total);
            }
        };
        xhr.onload = function (e) {
            if (xhr.status == 200) {
                pComplete(xhr.response);
            }
            else {
                Track(e, 2);
                pComplete(null);
            }
        };
        xhr.onerror = function (e) {
            Track(e, 2);
            pComplete(null);
        };
        xhr.responseType = pDataType;
        xhr.open(pType, pUrl, true);
        xhr.send(pData);
    }
    return [Time, Track, Fetch, Request];
});
MiaokitMerge(MiaokitDC => {
    if (!UnityLoader) {
        return [];
    }
    let pLogo = MiaokitDC["m_pLogo"] || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAJvNJREFUeNrsnQe4XUXVhufmpveQhIQiNYEYiEASAkiL9CKCGop0AUEUVBRB+KWIYpcuvQqCSpEeEZQqkIQAgohAgBBDgqGmt1v+/f3n2/9dd+7up9wT/N7nmefec/Y+s8vMrFlrzZqZhtbWVieE+O+ki16BEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghJAAEEJIAAghJACEEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAgJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghJAAEEJIAAghJACEEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQkgACCEkACL5RZD+GaSj9NqFqA8aWltbq32NbYJ0QZAmmO/+GKQTg/S2ikCIj68G8LMgPek1fvD5IL0cpONVBEJ8/DSAHYN0fpC2yHDuHUH6TpBmqjiEWLU1gG609R/J2PjBF4L0Ck0CIcQqqgHsEaSLgjSyjDweDNK3g/QPFY0Qq4YGMDBIlwRpcpmNH+wapBeDdIqKRoj61wAmsddfowr39kSQTg7SFBWTEPWlAQwL0m+CdGuVGj/YLkhPB+mHKiYh6kcDQK9/ZZAG1fA+XwjSV4I0VUUmROcIAPT0GNo7sBPv98dBOjNIzXX4Lnvw/j50pdgHjGx0dqBToyuNzPiFjM8rVP3/nwFBWi9ILeZdNfDvG0FanDO/1YI01nvvKIt5QXq+4D32DdKWzMfm2zVIrwdpRjUFwJGu5OjrUweF9VqQvhqkv9ZZJcKw57P8H0LgpSA9F6SngjTdleIcat3o9gnSoazYzlTs913J0bpYbf//+Czrd5PfPoJ0CE3RPGwfpLuNsA0b6p+pQRdhlCuNkvX1BAAEPCJtzyiSadck4eBKXn1kvmcdFRbu6S8ssB9SqtYDR5r/B9GHgYT4hiUUCNNcybkJx+ZbNdBkNg3SARHfQwB8fxUUAPBZ9XKlkafVg7RWkD4RpPWDtE6Qzg7Svwr2ruvGHOtVUPMaGPF9vzKffXDM/fQtmmnXFJX/lTquDCcEaT+qbp1tEqAy7p9wvDfVN6SvBWkBVUGYCo8G6ZkgvVeF+4rTOBZFmAVgPHuoppjjlaQ7BeJt/L830wBW9CF8r0NYF4cxhd8NYkOz4J3+tMC9JNWflgL5tRa4TpY8myqdb5IAeDdIv+9kmz+NX9aJP+ArLt9oSP8g7cD0PfoK4OB8OEj3BunNTnoOCIBTa3i9WykAvuhK80Z68t30KJgfNNWfe40WPec3g/SAK81GFd7LiWNlkA6qIxXbBzMKL6yTe/kP7bui7wqqLCZIXUQtobOotY9iCf/OoSo/tIzG7/juNvK+gwl7nisFqu2mJp8sAD4Tcc7edXjfC2JU7r2oRtaaq4O0e5A25/v6SZAe433mAR7nP/0X1kOEfr9TgXx6ufZOtgtc2xwT+AjucqVQ81WRhQmmxbJKmQDwrJ/OChwC+xQTfL5bRy9jnwjVH6rzTmU6WsplLtP9/AznFKZCT3Qlh+BGtHeTtJoFFbyfZQl27aI6Kk84JTG6M7zg75cGaT7ffTd2Ar+gv8UCE+NXQRoRpJOCtLxKz9OUwzcAzeeQDL6D4QnaEerWd1JM+rC9z6BpH+sDwFj2R0G6zHx3ClXUEXVQWS5k7+r3wOh5n3f1FSPwJlP4wj/lSguk7EihsIZXyLeWca11qAK3MiG/sTHn9qYGhYaD0Z5GVoyuNX4/1qONUZHtIyp+F9c2Jm8FGOrBdJpd7zB9yMY3nI0iDqxDAa//UTTfygECp4/xO7QmdEJd6eMItW8I6A29DrcIOzJl4bEkAQApCi/speyJfus5WF6rA1XxW953cAQebdSkSrImBWJ3V55XvJUVZAULHQ3vLAraPWmbzqS2VRRoP9dlPBfe9JsjtA84JE9w0Z7vJtroZ7An9cG9X8E61ZCx4Vin3B18H2+zUb/Pz1dG2PUrKQDeiskbwmBX3s9+MefsRU1t/3JUaFdykv+c9xSWdc+YcyHgXuD7wXu6ls9dSxYnmQDWJ3ATK+Xf+HkGG98FnSgAPud9PpGqT0hjha8HYXhEFbWDq9jrD2UvUo720lTm/aAuvMoUxxcS1FDEZdxQxvX/yOQT5ZhsyGDqzWPj/KWLX2sCGtID1HZbXLG5MX1d9hGgXq59vMEQo7E1dEaDSntgDEsN8tTvJzup8Z/g2g+PQcW7qMrXRKVYUqW8rUbxrsu2IhKeedMqPmsax8ZUVKjRk6twTz1deVPWITy+4UpBT3H8icKi6HXKFdoNNW78jXkEANS0h7zvJrnqB4n4PB6kX5vPfdx/n7cc2tefaZYN6ITrb06/RRR3uuoMF7eUKbBCznUlp5/PFdQOOtMh2ky1PCktotkY1+5W8py0fJYwn1gTIE5Nghp1Mj/PpfPkuhq9oBURdtxkV7t5CdVaODWryo6RBHi0v8jPcCReHKTDvfO6l3k/acOnR8eo/81lqv72PbdkbOitEY2hIaVjuoD3GmqNl1GrDDu6zqgffegHGRuhFfrvYATNxSjT5wb6qtLac0OaDyAO2NmI2AonRVzvSkFCu9egAX4pSB+Yz990Hb3F1Wz81fKMb5ThnEkUvn6c+mGuNNHofPPdK6wILaZXQK89ISLfhey1V/AZuzC/ONZhOUSBUOZyF2052JWiKZu9Ro77Wi9GM72GvV4XU7nxPMcFaVbMdS5mo4NQ/XqFNNmV7FlbTGPt5qJj9pt4bjjysoLfvVrAbLR84ApGj+ap3BhnH256LlTOd6rcE2O4wnpJN3C1dUL+25WGPxsLVBZUhNGuFOIaBWIZMMowJ+IYnII/cMnLpkPiY1TkQX7+m2tz2Fq/SZQAwLyDY1z2yD+oyYNjjl3misXLO69cJ+YUzNsU1GR+WuE6cjvfe4tp5Nu49iNoIY/xvTcyfZTjOt0TfAWFnd95BMBg2uHH8fMiagH3VKnxoWEc4n13q6stiyj4ijI34Rga+QERAg3DVwhdTXP2wUF2Cxv4GzHn9EhoQL0yCoCR7J2j+HuFyr9SIchLPWF0LoXw11LKohzmM1nWSLi/ovM8mgtoBhW3X471Kua9MZKuEnzOe+jDXXxgS72SNpX0KNc2ZjyAtv5kl83TD1vuRld8lCKr5/lMF+90hD29vM7eeSgA4Pk/nf6jhxI0hmrQLUd760JB3T0hdeM5rQll2S0ljx5RmkIR+xbOPzth5cgg7eyKh3FGAbt3uteTXew+foxxpcUoEPxySQ4Bdy9NhHICh2zD3YKV6FnvnN0TbH/0/jdV6D00VDCfJfQT2bUkR1OwnuRq57zOyk4U/Gk9fM8Ecxua8g4pHToa/x+cF3VYRABgyui+rjSxIrR59nWVW70Xzix/3gEqe/8aFEZXOp26FKx8zXRA5VFpEVvRz2Wbw/ACK/ZtZT4n7hMhqFvRl7Mzha4VAP1ZMRtjKuTFfOaik6+Wufbhs81eDxdGT8bZvs08bo8tYM8f5TuBFoPIOzhfT6sjAYA4m83LzGN4xg54WiU0gFD1u8t8nuoqN2FonwhbuVZz1Neko2ZAAbuqgRUQMdmv5rxmGggUgsf/0gh7s+hzIrZiYIxGAM6hhhLHKUwNBd5T2GmE7wlm5BOe/d5Mtf38iGtAwB5m7OlG8z20U3jFV4u5PsKdMQHnq6724//NEX6clhpef0WlBACGhRAie4NXIfZ12Ya34kCsgT/f4NwavqAG9ny9y/h9JaO6MMR0PYVrkXkYcfZ5T9cxXt3WBYT8npjynOWUc6tr76B820UvoHpMgjYGE/H1iO+fpTZ6Y4IvBSrzMGoKM6pQj+IaNbS8vahFw3mL4Km7O1P9KCeI4ccRlX2fMvJDof3K+w7e1K/U+J00lfnbSkVJYqLKRFdyvL6Ws0w/ycp9ZE7zB2xMTaOaO0cvz9DzYfThoAQBEgaI3ek6et2fp//ioYT8d3ElJ6FzlY9sjXMCIn7lPpq0e1MIrezM9l5OkAvUyINd+1GAV2kG/KJAflGzturJVqsFqAzP0VFzZ07NA6rvHnQqjXf54zPQIPuy5xxWB+/iuAS/D/wHX6bG2I8q/QGeRjCHmgzCfaMcmVhY9kzz/orSl36jjSl4N0mw6f0GuIRm4xtex7OcdaGby7dCEoTiugn+pI6ORiwLbtKC1ny87P0+TNNz5nNIRB4Dg9SUM5+/xdxP1rR+kJpbi7MwSKNMftvl/P0zQepR4L67BOnR1vL4VZBuaK0NS4O0SUo5vJ/w+6gyejVIYyLy6hqkS7xz7w/SIHPO/gnX2jHl3d8epOUF38PvWXa9g9QrSN2ZJ+rQ74J0cpAaeSwtod6MDNJ/Et7ZLv79lxvmOopq6iPe9/AF/DtjHpNddCzBt1zlp/emgRBZhJj2csmrswx10UulLXLtw5bz8in2VtcX6L2LLGwxn2oyotkmscfMYr/PYi/VkHIe3uPaBXrY7yY48eJMV5gM91KTfM4zy05guX2DKvghFXKmOj5j0XkYK1z7Gadoj1/n86MnR1AYJr1l3S0bw5+rxxxDG3240hoAuCdGMh6W4bcrKb2ifj+nwL2UqwFkTV+Nuf5k77ztUrSnqJ7sg5ieLC2dl+M9oZy/HaR1+duf5PjtiiBtFaSe7LniEo5/hmWcRwPYkseTWBSk12KO/Zvv3c8XPelxQVot4liSBrBDynu/ogxN6Hpzb3sF6amIc6YGqX+G8t8pQRNpCdJuUb+rhKMHgSwbRnx/I6VtEpjhtjTi+0muepuOlkt3DiFFkWe3ot+56ECeQdQAVst5XzNznIu5AOfRToaN/L2c11pMO3xJQlrm8kcpdqX/qGfKeejNj455f2vHOD+b+awfZLKN2/sbQq0D94VFPEabnnZezh5/Gp2s2LHpbH7fg/9vHfGbLXl+khaFe7okQROBZvRgpUcBLMcnNPC4oajbEoZAjqtjRx0805vFeLb/lLMRxk1sGlvAEz83xiSJcxr2oBf82ALvoLHC54Vg6DHL2na9aIbA8TfbO3YFVf2sXvEeLjkI6wzWVcx6nE51HEONx/B4ntWMEWPyaar5vzVCewnvOa68YLL8NEFoXkkHpIupA2fEmbSVmup6oGtbL8BvFPu5jqvFLHbxIaZrcoimHhno4vdgezyHrRZ6jy93pSCnzWLeKXrorMtYzzN2/QPUwOCN/mGMAICHGXEcGJeeUAfvdiyHx7LQyvf3D45E3c/PeNazWK+HsLygUQ12bbsNDacPZzC1LKS1UjTcKIZHaADz6X94l/6Uxoj2EDfM/DTrwq9jjp9Cbfls73sMnX8+4f4hOP6epHJVAqhdu7Pi+aBXvIkqT8gBCS/iy3Xc+//Ixa+MfI3LN57claonKmzckB9i1zFl9JyMJgDWbcDsvDBuYETK9WdSS7uPDsgo52KXGrxXNMarY3rippR6+jg1xonsPP7KBj6I+fVy1VnTYSj/4l1fRifbNL5TqO37F9C4ofWNT2gDZ1HND+MXfpKi7TzqOsbWVNwJGHJdgoMCuxC/x/PuSHFmTCnjHqrpBPxSwnX/HuPMTHIC/o8579aU5zqz4D1/Jya/mRxmtcNur5rjGH69OEgfxTgBN8t4/U9ndAJeG3Offw7StIjv4ezatMJDuHn5U8Jz7xDzm/szvLO+QXok5dqXsXySwHDgRmnXq6R03ztFZTuW9shhCeeNqBN11GfbBNUM/CzGmZmVU6k2xvEDOseqtXjkm9TKwg1Kz+bz9qzR++0Xo32c77JHZr7n4lcCqgZrJjjdyimnRdSWk3Y5hhP6hITjy+mjSJ2TUkkBMDRFCGBln1EueUvqL9Vh4x/nStMoB8Uc/yuPlwMiwdImUsHHcrOLX5mnXJ6nKn0lTZ2erjbqP4haDhymzEMu+9bXaDhvV+n+WtioPqSwhDPwGVe9OJXZ9CEUFWgnuYwLtVS6gNPmAqQV0M511vi3pn0eN2NvMRtuUwWuBYdc2lz1g+hT2aJKz3uHaxuBqeUuQU+49oE5y+nQW5mjjra6jiMCaY16GZ14SUN5/+NKe2ZOoFM13N3pqDK1vjRedqWAun/l+A2e53uu/a5eqY6oSvKZMh1B29dR44cwu5ae4yTV/NkKXhOSe1OXvEMwnEQY08W898vdxwP0dJhSvis/X8deNu9OwW9QaCxgb/0hTQP8xU5Dc9jYP+D3cLBi+BS7M90Yk+eDLmIefY2AVoZl8M7IeD4coufluUClBQCmiGIyxEsFfrtfDVXOLDb5OS45xPPODC8771zv+bT/MFFl7RRhCSm/F+11DPPUck/ERRU+LzSldmUj/WFBW/oSmmP/oRBYnlE7SwpY6t1JdXBPmn075vjNRFeaVXshBceSWgsA8LmCAmDbOmj4iL/GPm8HpJz3ois5NdMaXZGdiuG4wRDS3a5tqClJS1mfBf9+xPFqCAUI6YMzqNtQyUfkEOqP8+9ZLnql5CzMKfjbStvyRacXd2fDxyKmuxX4fTeah9dTm4QGe3uS6V0NATCu4O+26eTGjxd/tUtfoQfqKkKV383Q+I8v6H9BUMiBlOJJTr/3WFnejzk+sArvqdFli0vIywz2XDe4VZ8hOc9fm/b+ESnmXx424/vElPq7WJeecF5kbjUEQJGeHL3YqE4uNDhbnnEdNyC1QJJ+nr00bPFzXVvs+0Kq/M1sJNu45LXe0majYeYWPMGYM7BGjNp6hOk5N6f5BXsXzimstX/MKtRo5rHXal3FGjtWx9qQwngpO5C06E2YNhjd2I7aJjqfPGswNNG8yiLgEbF4HBN8Cthe7h4Kg6oIgOHUAqbn+M1udVCQGN45jNJyYkzPjwYZOv0w3XlCwV52uYuamtmRx2jnI258tHcM48D3m88Ipb3GqKANq1hDWtUafsgmbFBNFP5Zhk/XZtkV2egVHdV3WF8vyNl2Nmd6JxQA1XK67VTl86sFHEeYePFyxEvf2xNqcDQ9UvA659GPkIVweSs7cQp2sj9kCC/6StPDJBHO1hPlM5XaC0Yseqe0qbnmb96RBQw5I6x3BwqPl6k5nODybXoCjfHyLHZouVIxD2PqqEDn0P6eZ1RxNMCoiT5PFcj/WjbgPMym6QGT44oYGxw9wsyM+b0qAVAx4H+ZkkNYhCr8aS77ojl3UCvFqID1PcHkRMQmhs+vcunL0eP46c7EL1Qr2COPPd+bPoB6Ar0zFiMNF46MG856Ooe6jd4ZC6n+oKC6i8L+fkoPgYkpIzPkVc7mGM3UYN526SsCoVxPdPUzvFstoE7vl3IO3tedngZ5ZkJZtLKnh5r/UEreWAvxWOb1bde2n6XPDaHqX20BgKEIeMEXZjh3nKtdzHke7nbpSzZja2cElQzOUEHOKMNkyMobGYTQj1z7PR3iCKcM+zRSC3k9Qx7wRH8z4vvuOXwUXTJ+Vw7l+kumphyHin6M67hsG4KPEPexs2ee3cN3/HDO+4BGiiFkOOIxOoSRhT7mHjpontUSAChgOKUezSgAVmX17wZW9JaISgVnH+Lcf+Nqs/wzNJf51FiaKICXU0jBhAl3ss0Cfj+LdaTVNDyokb1y1IO3XPvdlRv4LlZmbJitERpTpZ2cDSbfIsIBu1lhGHMINbElVNXx7E+yQb8Vo00hdPcxCgfshv3bHP6hOMKdomGKY37NJPoPOvgKME3Xfl7gigWvRHGSy7aVNx744Apd80nXOQFFDa4+vNiQ9oNo4zWz8Te7YrvvouEPiFFNF7hsEXZdWZ8aPAEQ5pEWqASBM55mYov3++kueWJZHhBwtWnE/eBaiLLMso33Wjx/Kd/3Upd9jsi2NN/mVale9OO7aqmVBuBc9o0uR7pVn3oZwlpcwUbR5OIDjPLk8WEZv2/JoF5XgncLqNtRNn45PXY1WZjHvqoUWRv2Gk4I0SlUUwBkiWwaKgEgxMdTAAzP4E/A7MFGFYMQHz8BAE9x2vj+SBWBEB9PAeAyCIANVARCdB7VXvZpvZTj69bRu0AsNzZXwCwtzOzyl2JCdCPGeeHV9tc7wO+wvvxHrm3oC+O6/rbeo3kevOv+fAMMQw1g/rgXDOkhLNkP7hnD8zBk5C/6iOWq+sdcG9oWdrOBZx7zC5ZHmGyY1dbKZ7c76OCdbOPadoBC3hhy9ZfE6s9nhFk3w3UMfOnt2sK+MdYdtWBFA03DDXg+Yhre4jWbeWywSx5CRB6vuPbDdyiTT7NTajbPkDZEimHVcazL3Vk+eD+Iq8gSy4DZgRgRW4sd7rt89hkRzzCO7ycs+ykuen0DvOdN+JwLeS9RI1Gfcm2BQAha6zgDtYLLgsftOJu0LPFfK3y9cpYFxz55L3BJ7Ge4q2x4rDeX/saxGUEaYI71C9I/eWwyd0bG/49xOfTwvAFcehvHXuTeeeEx7Ff3Jo/dG6SX+L+/jPTQIM3msSnePa4RpHd4LGqJ9nPNst5HRxy/m79dHKRx3r55L8bsZLyHl8cXuAx4E5fN7uIdn8jrr+Bedv49HBikh4O0xLsWPt8SpG5cMruZqcnkt9J8j3SUyfdQlpHP09y/MKo+oHxOCdLrMUujH55Sn1YP0kUxu/Vib8MJ5txNuMfmCu+8uUE6LeI97s7nXcn8143ZYXmeOW+fai8LHsXaKccH1pEGMIe9AnqvjT3tZEPTs63PXsiaMRvz2MPsHRopoYd7GsRIHtvItd9P8ZPsYXDsL+Y+NnPtVyMew54kzH9dT4MYxmNRe+Zdyx4A4b3Hu/ZhvugZ9+ZvEbkYznrEeX9g3uhhnmNPEvZWiG23MfCN1IDwFxOo/M0xGnndbp72CY0Hoa9Y+2Ai/UdLqeUs5ef+7DG7MDXE5BceD3tX7DJ9I98xvnvWaHdbudK+eXt69wkNC1GTPzNm6gw+/zu83hspmi/m3Z9IrWsl39vzLANMxJptyhQLvX6W+c5g+a1g/cH8kYsitJKuTMg/ai1OhBcPNecN6AwfwPCU4/3rSACgkJ4wKq+d0LSlV8Hs7MXx/A4NBOvaTTPCzeaxlfm/u2s/FzwMmkIFfci1rTkwLCGPPq79rMtx5jmiAkteZyMLz93DHPs6nwFBROfyO8wbD3eVQWXdlWYAnvdYNkw0XMxGC4dyfTX0TNd+We/WmP/PdW17FMK8OpLq62i+J0zRxjqBLTw2nveHZ1jA393M34xlwgo4E9iIHc2InfgMeP4T2MhgZlzq2q/igz0Y9uL/KNMdeb1wkZedYoRs6Pz+jWvb7u1mlhvueWv+HjH6CMvFHJjL2VGi7LH9F+bRbMtrvmLKx27/5c89iVrExp+cFL28epVNgOkJKlI3qij1YgKEO/m0MK/TzfdXR+zMEh673KhrvanahnzDnHezl8cvzbEb+d2bVOs/Z847xpx3p5fHD8yx2/kdzIceMc/3CbNDU7iV+Siq/eD8iN16oE7vG5GX3VL8VH43KaJMTvW2sA7Zld9NMLsHwcxaM0d5DeN26uCCiOO/M9vQ7x5x/HxzPyfyu63M/WC77j4569ARJs+bUs79ojn36ojj2wdpGY8/Yky+07x3PI8mYPi79YL0oXfOdzvDBEja1GFAnWkAoaMkDOncwvTW49n7/Ns71mj+n06n1kuubYedccb5NY5SPir/sLeYSifdC65tCvJY877GMo853rHerm1vvykufkdm3P9V/H8XahAH8/fhluGOjspwpRmorVGbTFxpet9QhQ5jzd8zZgTmsH8i4Z0f7tomHJ3u8i3q2dO1TdbxHdpruLZZdlOokvtcZRyRYY//RZPXuS5/aHU4rwXOubNTzg179RUueuepx41WuqUxR0LT+T+sJ0Nd+9WDd+Y5s837HNgZJkDfhGsMcvnXfa824ay50DZrZOUdRY/yTTy2MW2v1Y2KHqrd7xo7eYzxIYxgw7jF2OwQgOsYn8ITRuV+2cvjk7wXFOhtxsvbnXmv7+URx695H6jk5xg7/ddGwG1k1PqnXPTy5m+a59zAtW12GnrhL6Uggmp9micg7P8TTH6PVrAsNzKq8pMxXvJXzWjJBhwpGGfK4Mmc1xxiTLvnXPKU6e5GaL/h4rfxetwI+Y29xjyd1wF2U559+fdBU6b9OkMA9Hbxc/0H1enQaDj55BMcwtmcggoV4n5W3IGsYKPYiFtc2+pALcY+3JC96RZ812+anmgoj3+S+aPxPM1jTcYPMIrvMeztX6GjMHSyrm8clMtd+uSZ2UYL+ALzx7TfS8w5w0zdmJWSV1i5+ptG1o8CMVwA48u8xyWeD6Cb8RO95fW2R9N+vpHJ2tVZGGy0g7iVd5q8ZxhCoR46hRflrDtDTUOb5ZInifVn3Qh78jhNw04yWt0TAHYS0/bscIe5thmx9xqhnEkAVLpH7uXiN1boW4XGW4mFRaYY4TXSta3s+3dK3NlmTD+skHOptvt5hOPiWxh1OlxDroGNP+wFZrr28QVPG3V8jBEAz1HYLGT5bWLyeMU4jtK0gLme0+s9z1tvG0kcLTFOvUYe+zHVW5TL9/nMzeb8LmY0otnLA6o45rIfynSYy7fSlDUJmjM+Q1fzu2aXf2OXbubdpU0F7mIEVNJ1ohyn/YyZ8YDpsMZQo1qN5fuYuY9MowDdK9wgexgpVwsBUIl5BWjIHxoP/2amUS81au9YIxymufaBM8+a3m688dZP4TDQy8arP8Y0+CVeHk0soy1d26rAUyn5w4a+jTn2lMsWnPK2qTi47zu84wsyjuSEE74WMTUYE6AP3+UNRtsYb/JuoHCYb3o32wFheSsMf/3RG6nJysKI+/RpMM+3kOW+2GgQvXLWnYXG/5I2GW6JKe8kc9huDvOupwGEmuJs49cJF9h9lEJ9eR4fAFYcvb7CjbJLgopWKfDif+oqs7vwXNPId6RNZ9X66abhjfXsNGfU2X8Zh8xoT60P7bbtjBDxbffXjH26G+38pea34d+JRgN4IsdzrkzoqWaYBrRlQuMfbZ53pSeAw3KHFvA+K/jXzDnh0OkMfh7p2s8NwTAelhO7sGA5zvSEcBTrmGvOYoMJx/f9eI+sdecd459JquOLzLVGJDhKQx/JcvoJupjGjO+WsacPbf/QeXuXuU6oNTSmNc7Haa9twga1qAINql8G1aYosKlPpgPnNNcxvLYIzaaR786KMMsIhWmmgMd4trttXGEDxVj1WmzMr3h5jKVjZ4XruLLsUpodYE/2BC+5tpV/nzGVe32en2ep6S6mF/SXvZpl8traVELLJNM7PZwg7HG/Fxizqb+5LphszMWTK2jWvWbMsh2MkLTsbxrTX4zjLFTnT8p5TTTGcAFPlPlxKec/aLThQyOOjzQ9+gt0KvZzbeG9obZyH/+O4zu2S9YvNu+xR9be+Z9sUBuwUGZWQQCU42+YSkGFF/Qrz36tBE97JsVU0yO+4KnIcDAlLRne1eS53PgClns97ssJ92HzaDYmQrNXZjM8E+siOi63zvn80HiuNBUHG5Gu52mK4Y618136dl4Xu3gv9y1G0zmCPf46MbZ8HqDZXGHexeVeLwvN7Hv8H/Xnt/z/NnOvh1B4+WtWrM22g3eDQCNE8oXReJebRodAqG97baA7hUP47OEyYIhY3Nuch2teamz3K/hM/U3bmW867ve9jvwdY2qE5dhRmGYMbmgM0pFBerJAcM7OMXl+t0BedzJIxlU5bezFo3/LHEMwxlRz7PcxeWzBWPWQr3hx5v8wx65NCEyyHOzNQbBx6pckBKQ85M1LQLqGx94N0loR125gIEvIbM4x+IP3bo43vwkDgRBMNdbL7zDvWXY1x3Y0AUrhPWFOwH1Bes18f0DE/I2PYp4/LKvbzO9n8blvNwE24Mve73YJ0kJz/G3G6t/COR4IvBkRpN3MOdNMoM5XvWfFHJA7GJj0LMt+MM890ptj8EcGBdmyvZ2Bc2HdnM/v7XyH+8z5h5rvf26eYQ3/HRVpHHtHRKQVEQCn58jjqiBtU4OGH6Ye3gSYT3vHr4uJ9rOpjylENIjNveO3mjyOjsljECMMw2i2jb3j95g8DvKOHWCO3R0hAK7nMVT0tROe4dKISSpgDiu6Pf8gc3xcRGN83Bz3I/PGB+nPntBs9QTQDt5v1jPC6IqYZ+jPBhWV7yw2wKjfTeSEqzgQHbmt+fywNznrME4ci8PWh6P5Pn1Wsu73NeduaY4fYr7/mokKtNGU5/D7ZRRa7Z6ziHp1HxPGHY+NsV3KcQ6GvE+17DLXcWputVlOVXRzz2sf8juqVk0uftOGcCun0fS0z/CO/4bq30rjxPH5iCrmCHqAfVPsOpogy1zHXYomU22Ef+CXET6Xu1zbhJsPE57hJPon9nBt04mhsv8h4r5fpLq/wnXcPhy/O4vDeysiTIJn6MTdjQ7W1c07+Cef7wXvNx/wHQ9x7fdJ9Ec0vsHf70a/xQr6Y7AMd1ywD2xobNx5IEdrBtI0+ogm3HSWyYX0Bf3Cc6jeyPcxif6HvizrcCehN82517B+HMiybqQK/wCdoUs9R+N5NAPs8uH3cuh6rjfE+xjb0HxvpKrkiPGWBS/CSDo7DnfR+9nvYhwsFtiQUVtcvUKb8lKXvoOuEKIKQ3R5va1wFCKq7VTjLXfGmxqFH3OAISxEfyHY4ydq/EKsGgIgBF7yn7vSEOIR7PUXuviJKQuZbqV6CZPiWhWJELWjEiaAEEIagBBCAkAIIQEghJAAEEJIAAghJACEEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghASAEEICQAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghJAAEEJIAAghJACEEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhhASAEEICQAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghJAAEEJIAAghASCEkAAQQkgACCEkAIQQEgBCCAkAIYQEgBBCAkAIIQEghJAAEEJIAAghJACEEBIAQggJACGEBIAQQgJACCEBIISQABBCSAAIISQAhBASAEIICQAhRNX5XwEGAHVg0DudDdzFAAAAAElFTkSuQmCC";
    UnityLoader.Progress.Styles.Dark.progressLogoUrl = pLogo;
    UnityLoader.Progress.Styles.Light.progressLogoUrl = pLogo;
    if (UnityLoader.SystemInfo.mobile) {
        UnityLoader.SystemInfo.mobile = false;
        UnityLoader.downloadJob = function (Module, job) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", job.parameters.url);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () { UnityLoader.Compression.decompress(new Uint8Array(xhr.response), function (decompressed) { job.complete(decompressed); }); };
            if (job.parameters.onprogress)
                xhr.addEventListener("progress", job.parameters.onprogress);
            if (job.parameters.onload)
                xhr.addEventListener("load", job.parameters.onload);
            xhr.send();
        };
    }
    UnityLoader.processWasmFrameworkJob = function (pModule, pJob) {
        let pCode = UnityLoader.Job.result(pModule, "downloadWasmFramework");
        UnityLoader.loadCode(pModule, pCode, function (pID, pBlob) {
            pModule["mainScriptUrlOrBlob"] = pBlob;
            if (pModule.isModularized) {
                UnityLoader[pID] = UnityModule;
            }
            pModule["instantiateWasm"] = function (pImports, pCallback) {
                InitImports(pModule, pImports["env"]);
                if (pModule["wasmBinary"]) {
                    WebAssembly.instantiate(pModule["wasmBinary"], pImports)
                        .then(module => { pCallback(module.instance, module.module); });
                }
                else {
                    console.info("MiaokitLoader.InitUnity.instantiateWasm error!");
                }
                return {};
            };
            UnityLoader[pID](pModule);
            pJob.complete();
        }, { Module: pModule, url: pModule["wasmFrameworkUrl"], isModularized: pModule.isModularized });
    };
    let pListener = null;
    let pUnity = null;
    let pApi = {};
    function InitImports(pModule, pImports) {
        Object.assign(pImports, {
            "_Init": function (nExportAddr, nExportSize) {
                MiaokitDC["WASM"]["m_pMemory"] = MiaokitDC["WASM"]["m_pMemory"] || pUnity.Module.wasmMemory;
                CollectAPI(pModule, pApi, nExportAddr, nExportSize);
                WrapAPI(pUnity, pApi);
                pListener.OnEngineLoad(pApi);
            },
            "_PluginLoad": function (pUnity) {
                pListener.OnPluginLoad(0);
            },
            "_PluginUnload": function () {
                pListener.OnPluginUnload();
            },
            "_RenderingEvent": function (nEventID) {
                pListener.OnRenderingEvent(nEventID);
            }
        });
        CreateWebGL(pImports, pApi);
    }
    function CreateWebGL(pModule, pApi) {
        pApi["glViewport"] = pModule._glViewport;
        pApi["glDrawArrays"] = pModule._glDrawArrays;
        pApi["glDrawArraysInstanced"] = pModule._glDrawArraysInstanced;
        pApi["glDrawElements"] = pModule._glDrawElements;
        pApi["glDrawElementsInstanced"] = pModule._glDrawElementsInstanced;
        pApi["glFlush"] = pModule._glFlush;
        pApi["glGenBuffers"] = pModule._glGenBuffers;
        pApi["glDeleteBuffers"] = pModule._glDeleteBuffers;
        pApi["glBindBuffer"] = pModule._glBindBuffer;
        pApi["glBindBufferBase"] = pModule._glBindBufferBase;
        pApi["glBindBufferRange"] = pModule._glBindBufferRange;
        pApi["glBufferData"] = pModule._glBufferData;
        pApi["glMapBufferRange"] = pModule._glMapBufferRange;
        pApi["glUnmapBuffer"] = pModule._glUnmapBuffer;
        pApi["glGenTextures"] = pModule._glGenTextures;
        pApi["glDeleteTextures"] = pModule._glDeleteTextures;
        pApi["glBindTexture"] = pModule._glBindTexture;
        pApi["glTexSubImage2D"] = pModule._glTexSubImage2D;
        pApi["glActiveTexture"] = pModule._glActiveTexture;
        pApi["glTexStorage2D"] = pModule._glTexStorage2D;
        pApi["glTexParameteri"] = pModule._glTexParameteri;
        pApi["glGenVertexArrays"] = pModule._glGenVertexArrays;
        pApi["glBindVertexArray"] = pModule._glBindVertexArray;
        pApi["glDeleteVertexArrays"] = pModule._glDeleteVertexArrays;
        pApi["glEnableVertexAttribArray"] = pModule._glEnableVertexAttribArray;
        pApi["glVertexAttribPointer"] = pModule._glVertexAttribPointer;
        pApi["glBindFramebuffer"] = pModule._glBindFramebuffer;
        pApi["glDrawBuffers"] = pModule._glDrawBuffers;
        pApi["glClearColor"] = pModule._glClearColor;
        pApi["glClear"] = pModule._glClear;
        pApi["glClearDepthf"] = pModule._glClearDepthf;
        pApi["glClearStencil"] = pModule._glClearStencil;
        pApi["glCreateShader"] = pModule._glCreateShader;
        pApi["glDeleteShader"] = pModule._glDeleteShader;
        pApi["glShaderSource"] = pModule._glShaderSource;
        pApi["glCompileShader"] = pModule._glCompileShader;
        pApi["glGetShaderiv"] = pModule._glGetShaderiv;
        pApi["glGetShaderInfoLog"] = pModule._glGetShaderInfoLog;
        pApi["glCreateProgram"] = pModule._glCreateProgram;
        pApi["glDeleteProgram"] = pModule._glDeleteProgram;
        pApi["glUseProgram"] = pModule._glUseProgram;
        pApi["glGetProgramBinary"] = pModule._glGetProgramBinary;
        pApi["glAttachShader"] = pModule._glAttachShader;
        pApi["glLinkProgram"] = pModule._glLinkProgram;
        pApi["glGetProgramiv"] = pModule._glGetProgramiv;
        pApi["glGetProgramInfoLog"] = pModule._glGetProgramInfoLog;
        pApi["glGetUniformBlockIndex"] = pModule._glGetUniformBlockIndex;
        pApi["glUniformBlockBinding"] = pModule._glUniformBlockBinding;
        pApi["glProgramBinary"] = pModule._glProgramBinary;
        pApi["glGetActiveUniform"] = pModule._glGetActiveUniform;
        pApi["glGetActiveUniformsiv"] = pModule._glGetActiveUniformsiv;
        pApi["glGetUniformLocation"] = pModule._glGetUniformLocation;
        pApi["glGetActiveUniformBlockName"] = pModule._glGetActiveUniformBlockName;
        pApi["glGetActiveUniformBlockiv"] = pModule._glGetActiveUniformBlockiv;
        pApi["glUniform1fv"] = pModule._glUniform1fv;
        pApi["glUniform2fv"] = pModule._glUniform2fv;
        pApi["glUniform3fv"] = pModule._glUniform3fv;
        pApi["glUniform4fv"] = pModule._glUniform4fv;
        pApi["glUniform1iv"] = pModule._glUniform1iv;
        pApi["glUniform2iv"] = pModule._glUniform2iv;
        pApi["glUniform3iv"] = pModule._glUniform3iv;
        pApi["glUniform4iv"] = pModule._glUniform4iv;
        pApi["glUniform1uiv"] = pModule._glUniform1uiv;
        pApi["glUniform2uiv"] = pModule._glUniform2uiv;
        pApi["glUniform3uiv"] = pModule._glUniform3uiv;
        pApi["glUniform4uiv"] = pModule._glUniform4uiv;
        pApi["glUniformMatrix2fv"] = pModule._glUniformMatrix2fv;
        pApi["glUniformMatrix2x3fv"] = pModule._glUniformMatrix2x3fv;
        pApi["glUniformMatrix2x4fv"] = pModule._glUniformMatrix2x4fv;
        pApi["glUniformMatrix3x2fv"] = pModule._glUniformMatrix3x2fv;
        pApi["glUniformMatrix3fv"] = pModule._glUniformMatrix3fv;
        pApi["glUniformMatrix3x4fv"] = pModule._glUniformMatrix3x4fv;
        pApi["glUniformMatrix4x2fv"] = pModule._glUniformMatrix4x2fv;
        pApi["glUniformMatrix4x3fv"] = pModule._glUniformMatrix4x3fv;
        pApi["glUniformMatrix4fv"] = pModule._glUniformMatrix4fv;
    }
    function CollectAPI(pModule, pApi, nAddr, nSize) {
        let pString = MiaokitDC.WASM.GetString(nAddr, nSize);
        let jApi = JSON.parse(pString);
        for (let pItem of jApi.List) {
            let _DynCall = function () {
                let aArgs = Array.prototype.slice.call(arguments);
                aArgs.unshift(_DynCall["m_nAddr"]);
                return _DynCall["m_pFunc"].apply(this, aArgs);
            };
            _DynCall["m_pFunc"] = pModule[pItem.Call];
            _DynCall["m_nAddr"] = pItem.Addr;
            pApi[pItem.Name] = _DynCall;
        }
    }
    function WrapAPI(pModule, pApi) {
        pApi["memory"] = (function (pModel) {
            let nSize2 = 32 * 1024 * 1024;
            let nAddr1 = pModel._memalign(16, nSize2);
            let nSize1 = nSize2 - nAddr1;
            pModel._free(nAddr1);
            let nAddr2 = pModel._memalign(16, nSize1 + nSize2);
            if (nAddr2 !== nAddr1) {
                console.error("miaokit.prememory: addr error", nAddr1, nAddr2);
                return;
            }
            if (nAddr2 + nSize1 + nSize2 !== 67108864) {
                console.error("miaokit.prememory: addr end error", (nAddr2 + nSize1 + nSize2));
                return;
            }
            pApi["__memory_reserve"] = nAddr2;
            return pModel.wasmMemory;
        })(pUnity.Module);
        pApi["__memory_start"] = function () {
            return 0;
        };
        pApi["__malloc"] = function (nSize) {
            if (0 === nSize) {
                return pApi["__memory_reserve"];
            }
            return pUnity.Module._memalign(16, nSize);
        };
        pApi["__free"] = function (nPtr) {
            pUnity.Module._free(nPtr);
        };
    }
    function LoadEngine(pListener_) {
        pListener = pListener_;
        pUnity = UnityLoader.instantiate("unityContainer", MiaokitDC["m_pEnginePath"]);
    }
    MiaokitDC["WASM"] = MiaokitDC["WASM"] || {};
    MiaokitDC["WASM"]["LoadEngine"] = LoadEngine;
    return [];
});
MiaokitMerge(MiaokitDC => {
    let aHeap = undefined;
    let pTextDecoder = new TextDecoder('utf-8');
    let pTextEncoder = new TextEncoder();
    function Heap(nType) {
        if (!aHeap || MiaokitDC["WASM"].m_pMemory.buffer.byteLength !== aHeap[0].byteLength) {
            if (!aHeap) {
                aHeap = [];
            }
            aHeap[0] = new Int8Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[1] = new Uint8Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[2] = new Int16Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[3] = new Uint16Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[4] = new Int32Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[5] = new Uint32Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[6] = new Float32Array(MiaokitDC["WASM"].m_pMemory.buffer);
            aHeap[7] = new Float64Array(MiaokitDC["WASM"].m_pMemory.buffer);
        }
        return aHeap[nType];
    }
    MiaokitDC["WASM"] = MiaokitDC["WASM"] || {};
    MiaokitDC["WASM"]["HEAP8"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(0);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr, nAddr + nSize);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAPU8"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(1);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr, nAddr + nSize);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAP16"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(2);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 2, (nAddr + nSize) / 2);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAPU16"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(3);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 2, (nAddr + nSize) / 2);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAP32"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(4);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 4, (nAddr + nSize) / 4);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAPU32"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(5);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 4, (nAddr + nSize) / 4);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAPF32"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(6);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 4, (nAddr + nSize) / 4);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["HEAPF64"] = function (nAddr = 0, nSize = 0) {
        let pHeap = Heap(7);
        if (nAddr && nSize) {
            return pHeap.subarray(nAddr / 8, (nAddr + nSize) / 8);
        }
        else {
            return pHeap;
        }
    };
    MiaokitDC["WASM"]["GetString"] = function (nAddr, nSize) {
        let aChar = MiaokitDC["WASM"].HEAPU8(nAddr, nSize);
        let pString = pTextDecoder.decode(aChar);
        return pString;
    };
    MiaokitDC["WASM"]["SetString"] = function (nAddr, pString) {
        let aChar = pTextEncoder.encode(pString);
        let pBuffer = MiaokitDC["WASM"].HEAPU8(nAddr, aChar.byteLength);
        pBuffer.set(aChar);
    };
    MiaokitDC["WASM"]["EncodeString"] = function (pString) {
        return pTextEncoder.encode(pString);
    };
    MiaokitDC["WASM"]["m_pMemory"] = null;
    return [];
});
