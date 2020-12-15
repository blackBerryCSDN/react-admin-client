/*后台管理主路由组件 */
import React from 'react'
import {Redirect} from 'react-router-dom'
import memory from '../../utils/memory'

export default class Admin extends React.Component{
    render() {
        const user = memory.user;
        if (!user || !user._id) {
            return <Redirect to='/login' />
        }
        return (
            <div>admin</div>
        )
    }
}