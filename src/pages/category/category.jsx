import React, {Component} from 'react';
import { Card, Button, Table, Space, Message, Modal } from 'antd';
import './category.less'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategorys, reqUpdateCategorys } from  '../../api/index'
import LinkButton from '../../components/link-button'
import AddForm from './components/addForm'
import UpdateForm from './components/updateForm'

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, // 表格加载
            parentId: '0',  // 一级分类id
            parentName: '',  // 一级分类名称
            categorys: [], // 一级分类数据
            subCategorys: [], // 二级分类数据
            formModalShow: 0  // 0两个都关闭，1打开添加模态框，2打开修改模态框
        };
    }

    // 表格初始化
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <Space size="middle">
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ?   <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                    </Space>
                ),
            },
        ]
    }

    // 查看分类
    showSubCategorys = categorys => {
        this.setState({
            parentId: categorys._id,
            parentName: categorys.name
        }, () => {
            console.log(this.state.parentId);
            this.getCategorys()
        })
    }

    // 添加分类
    showAdd = () => {
        this.setState({
            formModalShow: 1
        })
    }

    // 添加分类确认
    addCategory = () => {
        this.setState({
            formModalShow: 0
        })
    }

    // 修改分类
    showUpdate = (category) => {
        this.category = category
        this.setState({
            formModalShow: 2
        })
    }

    // 修改分类确认
    updateCategory = () => {
        this.form.validateFields().then( async value => {
            this.setState({
                formModalShow: 0
            });
            const categoryId = this.category._id;
            const {categoryName} = value;
            console.log(this.form.resetFields());
            this.form.resetFields();
            const result = await reqUpdateCategorys(categoryId, categoryName);
            if (result.status === 0) {
                this.getCategorys()
            }
        })
    };


    // 取消模态框
    handleCancel = () => {
        // 清除输入数据
        console.log(this.form.resetFields());
        this.form.resetFields()

        this.setState({
            formModalShow: 0
        })
    }

    // 返回一级分类
    backCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
        this.getCategorys()
    }

    // 获取一级/二级分类数据
    getCategorys = async () => {
        const parentId = this.state.parentId
        this.setState({
            loading: true
        })
        const result = await reqCategorys(parentId)
        this.setState({
            loading: false
        })
        const categorys = result.data
        if (result.status === 0) {
            if (parentId === '0') {
                this.setState({
                    categorys
                })
            }else {
                this.setState({
                    subCategorys: categorys
                })
            }
        }else {
            Message.error("请求数据失败!")
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const {loading, parentId, parentName, categorys, subCategorys, formModalShow} = this.state
        const category = this.category
        // card左侧
        const title = parentId === '0' ?  '一级分类列表' : (
            <span>
                <LinkButton onClick={this.backCategorys}>一级分类列表</LinkButton>&nbsp;&nbsp;
                <ArrowRightOutlined />&nbsp;
                <span>{parentName}</span>
            </span>
        )
        // card右侧
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <PlusOutlined/>添加
            </Button>
        )

        return (
            <div className='category'>
                <Card title={title} extra={extra}>
                    <Table
                        loading={loading}
                        rowKey='_id'
                        bordered
                        columns={this.columns}
                        dataSource={parentId === '0' ? categorys : subCategorys}
                        pagination={{ defaultPageSize: 8, showQuickJumper: true }}
                    />
                </Card>

                <Modal title="添加分类" visible={formModalShow === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm></AddForm>
                </Modal>

                <Modal title="修改分类" visible={formModalShow === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    {/*<UpdateForm categoryName={category.name} updateForm={() => {this.updateForm}} />*/}
                    <UpdateForm categoryName={category} setForm={(val) => {this.form = val}} />
                </Modal>
            </div>
        )
    }
}