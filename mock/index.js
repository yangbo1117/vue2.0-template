import Mock from 'mockjs'
import { parseSearchParams } from "./utils";

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name: 'Normal Editor'
    }
}

Mock.mock('/vue-admin-template/user/login', 'post', (req, res) => {
    const { username, password } = JSON.parse(req.body);
    const token = tokens[username]
    if (!token) {
        return {
            code: 60204,
            message: 'Account and password are incorrect.'
        }
    }
    return {
        code: 20000,
        data: token
    }
});
Mock.mock(RegExp('/vue-admin-template/user/info' + ".*"), "get", (req, res) => {
    const { token } = parseSearchParams(req.url);
    const info = users[token]

    // mock error
    if (!info) {
        return {
            code: 50008,
            message: 'Login failed, unable to get user details.'
        }
    }

    return {
        code: 20000,
        data: users['admin-token']
    }
});

Mock.mock('/vue-admin-template/user/logout', "post", (req, res) => {
    return {
        code: 20000,
        data: 'success'
    }
});

const data = Mock.mock({
    'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
    }]
})

Mock.mock('/vue-admin-template/table/list', "get", (req, res) => {
    const items = data.items
    return {
        code: 20000,
        data: {
            total: items.length,
            items: items
        }
    }
});




export default Mock;