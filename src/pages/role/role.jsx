import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd'
import {reqGetRole, reqAddRole, reqUpdateRole} from '../../api/index'
import {formateDate} from '../../utils/date'
import AddForm from './components/addForm'
import UpdateForm from './components/updateForm'
import memory from '../../utils/memory'

export default class Role extends Component {
    constructor(props) {
        super(props);
        this.getMenus = React.createRef();
        this.state = {
            loading: false,
            roleList: [],
            role: {}, // 选中的role
            isShowAdd: false, // 添加角色弹窗是否显示
            isShowUpdate: false // 添加角色权限弹窗是否显示
        };
    }

    /* 表格初始化 */
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    /* 获取角色列表 */
    getRole = async () => {
        this.setState({
            loading: true
        });
        const result = await reqGetRole();
        this.setState({
            loading: false
        });
        const roleList = result.data;
        if (result.status === 0) {
            this.setState({
                roleList
            })
        }
    }

    /* 表格点击事件 */
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            }, // 点击行
        }
    }

    /* 添加角色确认 */
    addRole = () => {
        this.form.validateFields().then( async values => {
            this.setState({
                isShowAdd: false
            });
            const {roleName} = values;
            this.form.resetFields();
            const result = await reqAddRole(roleName);
            if (result.status === 0) {
                message.success('添加角色成功')
                // this.getRoles()
                // 新产生的角色
                const role = result.data;

                // 更新roles状态: 基于原本状态数据更新
                this.setState(state => ({
                    roleList: [...state.roleList, role]
                }))
                // this.getRole()
            } else {
                message.success('添加角色失败')
            }
        })

    }

    // 添加角色取消
    handleCancel = () => {
        this.form.resetFields();
        this.setState({
            isShowAdd: false,
        })
    }

    /* 设置角色权限确认 */
    updateRole = async () => {
        this.setState({
            isShowUpdate: false
        })
        const role = this.state.role
        role.menus = this.getMenus.current.menus()
        role.auth_time = Date.now()
        role.auth_name = memory.user.username

        const result = await reqUpdateRole(role)
        console.log(result);
        if (result.status === 0) {
            message.success('当前用户角色权限成功')
            // this.setState({
            //     roles: [...this.state.roles]
            // })
            this.getRole()
        }
    }


    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRole()
    }

    render() {
        const {loading, roleList, role, isShowAdd, isShowUpdate} = this.state
        const title = (
            <span>
                <Button type='primary' onClick={() => {this.setState({isShowAdd: true})}}>创建角色</Button> &nbsp; &nbsp;
                <Button type='primary' disabled={!role._id} onClick={() => {this.setState({isShowUpdate: true})}}>设置角色权限</Button>
            </span>
        )

        return (
            <div className='role'>
                <Card title={title}>
                    <Table
                        loading={loading}
                        rowKey='_id'
                        bordered
                        columns={this.columns}
                        dataSource={roleList}
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: [role._id],
                            onSelect: (role) => { // 选择某个radio时回调
                                this.setState({
                                    role
                                })
                            }
                        }}
                        onRow={this.onRow}
                    />
                </Card>

                <Modal title="创建角色" visible={isShowAdd} onOk={this.addRole} onCancel={this.handleCancel}>
                    <AddForm setForm={(form) => {this.form = form}}/>
                </Modal>

                <Modal title="设置角色权限" visible={isShowUpdate} onOk={this.updateRole} onCancel={() => {this.setState({isShowUpdate: false})}}>
                    <UpdateForm role={role} ref={this.getMenus}/>
                </Modal>
            </div>
        )
    }
}