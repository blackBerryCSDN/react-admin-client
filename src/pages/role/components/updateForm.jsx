import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd'
import menuList from '../../../config/menuConfig'
const Item = Form.Item;

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus
        };
    }

    /* 获取权限树 */
    getNodes = menuList => {
        const treeData = [
            {
                title: '平台权限',
                key: 'all',
            },
        ];
        treeData[0].children = menuList
        return treeData
    }

    /* 选中事件 */
    onCheck = checkedKeys => {
        this.setState({checkedKeys});
    };

    /*为父组件提交获取最新menus数据*/
    menus = () => this.state.checkedKeys

    UNSAFE_componentWillMount() {
        this.treeData = this.getNodes(menuList)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        })
    }

    render() {
        const treeData = this.treeData;
        const {role} = this.props;
        const  checkedKeys = this.state.checkedKeys;
        return (
            <div>
                <Item label="角色名称">
                    <Input value={role.name} disabled/>
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                />
            </div>
        )
    }
}