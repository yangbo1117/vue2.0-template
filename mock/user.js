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

export default {
    'POST /vue-admin-template/user/login': Mock.mock((req, res) => {
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
    }),

    `GET ${RegExp('/vue-admin-template/user/info' + ".*")}`: Mock.mock((req, res) => {
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
    }),

    'POST /vue-admin-template/user/logout':Mock.mock((req, res) => {
        return {
            code: 20000,
            data: 'success'
        }
    }),

    'POST /vue-admin-template/user/register': Mock.mock((req, res) => {
        const { username, password, checkPassword } = JSON.parse(req.body);
        return {
            code: 20000,
            data: { username, password, checkPassword }
        }
    })

}








