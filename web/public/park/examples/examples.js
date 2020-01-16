
let Example = {
    // 加载样例脚本
    LoadScript: function (pFile, pCallback) {
        let pThis = this;
        let nTick = ++this.m_nTick;

        fetch(pFile)
            .then(pResponse => pResponse.text())
            .then(pText => {
                if (nTick === pThis.m_nTick) {
                    pThis.Load(pText);

                    if (pCallback) {
                        pCallback(pText);
                    }
                }
                else {
                    if (pCallback) {
                        pCallback(pText);
                    }
                }
            });
    },

    // 加载新样例
    Load: function (pText) {
        if (!pText) {
            return;
        }

        eval(pText);
    },

    // 启动新样例
    Start: function (Script) {
        if (!Script) {
            return;
        }

        if (this.m_pScript) {
            this.m_pScript.Destory();
            this.m_pScript = null;
        }

        this.m_pScript = new Script(MiaokitJS);
        this.m_pScript.Start();
    },

    // 帧更新样例
    Update: function () {
        if (this.m_pScript) {
            this.m_pScript.Update();
        }
    },

    /// 销毁样例
    Destory: function () {
        if (this.m_pScript) {
            this.m_pScript.Destory();
            this.m_pScript = null;
        }
    },

    /// 当前样例脚本对象
    m_pScript: undefined,
    /// 装载计数
    m_nTick: 0
};

function ExampleRun(Script) {
    Example.Start(Script);
}
