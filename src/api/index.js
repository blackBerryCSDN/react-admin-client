import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})

// 添加分类
export const reqAddCategorys = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')

// 修改分类
export const reqUpdateCategorys = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取角色列表
export const reqRoleList = () => ajax('/manage/role/list')

/*
json请求的接口请求函数
 */
// export const reqWeather = (city) => {
//
//     return new Promise((resolve, reject) => {
//         const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//         // 发送jsonp请求
//         jsonp(url, {}, (err, data) => {
//             console.log('jsonp()', err, data)
//             // 如果成功了
//             if (!err && data.status==='success') {
//                 // 取出需要的数据
//                 const {dayPictureUrl, weather} = data.results[0].weather_data[0]
//                 resolve({dayPictureUrl, weather})
//             } else {
//                 // 如果失败了
//                 message.error('获取天气信息失败!')
//             }
//
//         })
//     })
// }
// reqWeather('北京')
export const reqWeather =  city => {
    const  url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    return new Promise((resolve, reject) => {
        jsonp(url, {}, (error, data) => {
            if (!error && data.desc === 'OK') {
                const {fengxiang, type} = data.data.forecast[0]
                resolve({fengxiang, type})
            }else {
                message.error('获取天气信息失败!')
            }
        })
    })
}

