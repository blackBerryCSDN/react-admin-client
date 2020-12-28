import React, {Component} from 'react';
import {Card, Button, Table} from 'antd'
import {reqRoleList} from '../../api/index'
import {formateDate} from '../../utils/date'

export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            roleList: []
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
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    /* 获取角色列表 */
    getRoleList = async () => {
        this.setState({
            loading: true
        });
        const result = await reqRoleList();
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
                console.log(role);
            }, // 点击行
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRoleList()
    }

    render() {
        const {loading, roleList} = this.state
        const title = (
            <span>
                <Button type='primary'>创建角色</Button> &nbsp; &nbsp;
                <Button type='primary' disabled>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    loading={loading}
                    rowKey='_id'
                    bordered
                    columns={this.columns}
                    dataSource={roleList}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    rowSelection={{type: 'radio'}}
                    onRow={this.onRow}
                />
            </Card>
        )
    }
}