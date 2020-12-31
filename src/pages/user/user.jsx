import React, {Component} from 'react';
import {Card, Table, Button, Space, Modal, message} from 'antd'
import LinkButton from '../../components/link-button'
import {reqGetUser, reqDeleteUser, reqAddUser, reqUpdateUser} from '../../api/index'
import {formateDate} from '../../utils/date'
import UserForm from './components/userForm'

const { confirm } = Modal;

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, // 表格数据加载
            userList: [],  // 用户数据
            roleList: [], // 角色数据
            isShowModal: false  // 模态框
        };
    }

    /* 表格初始化 */
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                // width: 300,
                render: (user) => (
                    <Space size="middle">
                        <LinkButton onClick={() => this.updateShow(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.userDelete(user)}>删除</LinkButton>
                    </Space>
                )
            }
        ]
    }

    /* 获取角色对象 */
    initRoleName = roleList => {
        const roleNames = roleList.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        },{})
        this.roleNames = roleNames
    }

    /* 获取用户列表 */
    getUser = async () => {
        this.setState({
            loading: true
        });
        const result = await reqGetUser();
        this.setState({
            loading: false
        });
        const userList = result.data.users;
        const roleList = result.data.roles;
        this.initRoleName(roleList);
        if (result.status === 0) {
            this.setState({
                userList,
                roleList
            })
        }
    }

    /* 创建用户 */
    addShow = () => {
        this.user = null;
        console.log(this.user);
        this.titleName = '创建用户'
        this.setState({
            isShowModal: true,
        })
    }

    /* 修改用户 */
    updateShow = (user) => {
        this.user = user || {}
        console.log(this.user);
        this.titleName = '修改用户'
        this.setState({
            isShowModal: true,

        })
    }

    /* 添加修改用户确认 */
    addUpdateUser = () => {
        this.form.validateFields().then( async values => {
            this.setState({
                isShowModal: false,
            })
            this.form.resetFields();
            const user = values
            console.log(user);
            console.log(this.user);
            if (this.user) {
                user._id = this.user._id
                const result = await reqUpdateUser(user)
                if (result.status === 0) {
                    message.success('修改用户成功')
                }
            }else {
                const result = await reqAddUser(user)
                if (result.status === 0) {
                    message.success('添加用户成功')
                }
            }
            this.getUser()
        })

    }

    /* 删除用户 */
    userDelete = (user) => {
        confirm({
            title: '确认删除当前用户吗?',
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    this.getUser()
                }
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        const {loading, userList, isShowModal, roleList} = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={this.addShow}>创建用户</Button>
            </span>
        )
        return (
            <div>
                <Card title={title}>
                    <Table
                        loading={loading}
                        rowKey='_id'
                        bordered
                        columns={this.columns}
                        dataSource={userList}
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                </Card>

                <Modal
                    title={this.titleName}
                    visible={isShowModal}
                    onOk={this.addUpdateUser}
                    onCancel={() => {
                        this.form.resetFields();
                        this.setState({isShowModal: false})}}>
                    <UserForm user={this.user} roles={roleList} setForm={val => {this.form = val}}/>
                </Modal>
            </div>
        )
    }
}