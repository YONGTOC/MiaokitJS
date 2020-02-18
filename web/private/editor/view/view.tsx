import * as React from "react";
import * as ReactDOM from "react-dom";
import { Layout, Menu, Icon, Row, Col, Tree, InputNumber  } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { TreeNode } = Tree;

declare var MiaokitJS: any;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.OnSelect = this.OnSelect.bind(this);

        App.g_pIns = this;
    }

    public OnSelect(pInfo) {
        return;
        this.setState({
            tree_data: [{
                key: "0",
                title: "World",
                children: [
                    {
                        key: "0-0",
                        title: "GOXX:0",
                    },
                    {
                        key: "0-1",
                        title: "GOXX:1",
                    }
                ]
            }]
        });
    }

    public render() {
        return (
            <Layout style={{ width: '100%', height: '100%', padding: 0 }}>
                <Sider breakpoint="lg" collapsed={true} collapsedWidth="64" style={{ background: '#000000' }}>
                    <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} style={{ width: '100%', background: '#000000' }}>
                        <Menu.Item key="1" style={{ width: '64px', height: '64px', lineHeight: '64px' }}>
                            <Icon type="solution" style={{ fontSize: '40px', position: 'absolute', left: 12, top: 12 }} />
                            <span className="nav-text">项目</span>
                        </Menu.Item>
                        <Menu.Item key="2" style={{ width: '64px', height: '64px', lineHeight: '64px' }}>
                            <Icon type="play-circle" style={{ fontSize: '40px', position: 'absolute', left: 12, top: 12 }} />
                            <span className="nav-text">运行</span>
                        </Menu.Item>
                        <Menu.Item key="3" style={{ width: '64px', height: '64px', lineHeight: '64px' }}>
                            <Icon type="import" style={{ fontSize: '40px', position: 'absolute', left: 12, top: 12 }} />
                            <span className="nav-text">导入</span>
                        </Menu.Item>
                        <Menu.Item key="4" style={{ width: '64px', height: '64px', lineHeight: '64px' }}>
                            <Icon type="export" style={{ fontSize: '40px', position: 'absolute', left: 12, top: 12 }} />
                            <span className="nav-text">导出</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ height: '40px', lineHeight: '40px', paddingLeft: 25, background: '#2D2D30', borderBottomColor: '#505050', borderBottomWidth: '1px', borderBottomStyle: 'solid' }}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '30px', marginTop: '5px', background: '#2D2D30' }}
                            onSelect={this.OnSelect}
                        >
                            <Menu.Item key="1">文件111111</Menu.Item>
                            <Menu.Item key="2">编辑</Menu.Item>
                            <Menu.Item key="3">资源</Menu.Item>
                            <Menu.Item key="4">组件</Menu.Item>
                            <Menu.Item key="5">对象</Menu.Item>
                            <Menu.Item key="6">窗口</Menu.Item>
                            <Menu.Item key="7">帮助</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ background: '#1E1E1E' }}>
                        <Row style={{ height: '100%' }}>
                            <Col span={15} style={{ height: '100%' }}>
                                <div id="unityContainer" style={{ width: '100%', height: '100%', background: '#0000FF', margin: 'auto' }}></div>
                            </Col>
                            <Col span={9} style={{ height: '100%' }}>
                                <Row style={{ height: '100%' }}>
                                    <Col span={10} style={{ height: '100%', background: '#252526', borderColor: '#505050', borderWidth: '1px', borderStyle: 'solid' }}>
                                        <TreeView data={this.state.tree_data} />
                                    </Col>
                                    <Col span={14} style={{ height: '100%', borderColor: '#505050', borderWidth: '1px', borderStyle: 'solid' }}>
                                        <TransformView transform={this.state.transform} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ height: '24px', padding: 1, background: '#2D2D30', color: '#F1F1F1', textAlign: 'center', borderTopColor: '#505050', borderTopWidth: '1px', borderTopStyle: 'solid' }}>MiaokitJS ©2020 浙江永拓信息科技有限公司</Footer>
                </Layout>
            </Layout>
        );
    }

    public state = {
        tree_data: [{
            key: "0",
            title: "World",
            children: [
                {
                    key: "0-0",
                    title: "GO:0",
                },
                {
                    key: "0-1",
                    title: "GO:1",
                },
                {
                    key: "0-2",
                    title: "GO:2",
                    children: [
                        {
                            key: "0-2-0",
                            title: "GO:0",
                        },
                        {
                            key: "0-2-1",ctrl
                            title: "GO:1",
                        }
                    ]
                }
            ]
        }],
        transform: {
            localPosition: { x: 0, y: 0, z: 0 },
            localEuler: { x: 0, y: 0, z: 0 },
            localScale: { x: 1, y: 1, z: 1 }
        }
    };

    public static g_pIns: App = null;
    public Update(pObject) {
        let pTree = this.ctrl.Update(pObject);
        if (pTree) {
            this.setState({
                tree_data: pTree
            });
            console.log(pTree);
        }
    }
    public ctrl: Ctrl = new Ctrl();

    public set curTransform(transform_) {
        this.setState({
            transform: transform_
        });
    }
}

class TreeView extends React.Component<{ data: any[] }, {}> {
    public constructor(props) {
        super(props);

        this.OnDragEnter = this.OnDragEnter.bind(this);
        this.OnDrop = this.OnDrop.bind(this);
        this.OnSelect = this.OnSelect.bind(this);
    }

    public OnDragEnter(pInfo) {
        console.log(pInfo);
    }

    public OnDrop(pInfo) {
        console.log(pInfo);
    }

    public OnSelect(pInfo) {
        let pObject = MiaokitJS["WASM"]["GetObject"](parseInt(pInfo[0]));
        App.g_pIns.curTransform = pObject.transform;
        console.log(pObject);
    }

    public render() {
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.key} title={<span style={{ color: '#F1F1F1' }}>{item.title}</span>}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }

                return <TreeNode key={item.key} title={<span style={{ color: '#F1F1F1' }}>{item.title}</span>} />;
            });

        return (
            <Tree style={{ width: '100%', height: '100%', padding: 0, overflow: 'auto', color: '#F1F1F1' }}
                className="draggable-tree"
                draggable
                blockNode
                defaultExpandedKeys={['0']}
                onDragEnter={this.OnDragEnter}
                onDrop={this.OnDrop}
                onSelect={this.OnSelect}
            >
                {loop(this.props.data)}
            </Tree>
        );
    }
}

class TransformView extends React.Component<{ transform: { localPosition: any, localEuler: any, localScale: any } }, {}> {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div style={{ padding: 16 }}>
                <Row style={{ padding: 2 }}>
                    <Col span={6}>
                        <div style={{ width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' }}>Position</div>
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>X</div>
                        <InputNumber theme="dark" size="small" defaultValue={0} value={this.props.transform.localPosition.x} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Y</div>
                        <InputNumber size="small" defaultValue={0} value={this.props.transform.localPosition.y} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Z</div>
                        <InputNumber size="small" defaultValue={0} value={this.props.transform.localPosition.z} style={{ width: '80%', float: 'left' }} />
                    </Col>
                </Row>
                <Row style={{ padding: 2 }}>
                    <Col span={6}>
                        <div style={{ width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' }}>Rotation</div>
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>X</div>
                        <InputNumber theme="dark" size="small" defaultValue={0} value={this.props.transform.localEuler.x} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Y</div>
                        <InputNumber size="small" defaultValue={0} value={this.props.transform.localEuler.y} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Z</div>
                        <InputNumber size="small" defaultValue={0} value={this.props.transform.localEuler.z} style={{ width: '80%', float: 'left' }} />
                    </Col>
                </Row>
                <Row style={{ padding: 2 }}>
                    <Col span={6}>
                        <div style={{ width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' }}>Scale</div>
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>X</div>
                        <InputNumber theme="dark" size="small" defaultValue={1} value={this.props.transform.localScale.x} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Y</div>
                        <InputNumber size="small" defaultValue={1} value={this.props.transform.localScale.y} style={{ width: '80%', float: 'left' }} />
                    </Col>
                    <Col span={6}>
                        <div style={{ width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' }}>Z</div>
                        <InputNumber size="small" defaultValue={1} value={this.props.transform.localScale.z} style={{ width: '80%', float: 'left' }} />
                    </Col>
                </Row>
            </div>            
        );
    }
}

class Ctrl {
    public Update(pObject) {
        if (this.m_bLoading) {
            if (0 === MiaokitJS.Miaokit.progress) {
                this.m_bLoading = false;

                if (pObject) {
                    return this.FlushWorld(pObject, null);
                }
                console.error("刷新场景");
            }
        }
        else {
            if (MiaokitJS.Miaokit.progress) {
                this.m_bLoading = true;
            }
        }

        return null;
    }

    public FlushWorld(pObject, aTree) {
        //if (!pRoot) {
        //    return;
        //}

        if (!aTree) {
            aTree = [];
        }

        let pNode = {
            key: pObject.m_nID,
            title: pObject.name,
            children: [
            ]
        };

        aTree.push(pNode);

        for (let pChild of pObject.children) {
            this.FlushWorld(pChild, pNode.children);
        }

        return aTree;
    }

    private m_bLoading = true;
}

ReactDOM.render(<App />, document.getElementById('viewContainer'));

export default App;
