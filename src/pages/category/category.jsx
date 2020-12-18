import React, {Component} from 'react';
import { Card, Button, Table, Space } from 'antd';
import './category.less'
import { PlusOutlined } from '@ant-design/icons';
import {reqCategorys} from  '../../api/index'

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentId: '0',  // 一级分类id
            categorys: [] // 一级分类数据
        };
    }

    // 获取一级/二级分类数据
    getCategorys = async () => {
        const parentId = this.state
        const result = await reqCategorys(parentId)
        const categorys = result.data
        this.setState({
            categorys
        })
        console.log(result);
    }

    componentWillMount() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: () => (
                    <Space size="middle">
                        <a>修改分类</a>
                        <a>查看子分类</a>
                    </Space>
                ),
            },
        ]
        this.data = [
            {
                key: '1',
                name: '电器',
            },
            {
                key: '2',
                name: '电脑',
            },
            {
                key: '3',
                name: '图书',
            }
        ];
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        // card左侧
        const title = '一级分类列表';
        // card右侧
        const extra = (
            <Button type="primary">
                <PlusOutlined/>添加
            </Button>
        )
        const {parentId,category} = this.state
        return (
            <div className='category'>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={category}
                    />
                </Card>
            </div>
        )
    }
}