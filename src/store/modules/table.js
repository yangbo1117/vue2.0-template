
import { reqList } from "@/api/table";
import types from '../types';

const getDefaultState = () => {
    return {
        lodaing: false,
        list: {},
        node: {}
    }
}

const state = getDefaultState()

const mutations = {
    [types.SAVE_LIST]: (state, { payload }) => {
        console.log(payload.list)
        state.list = payload.list
    },
    [types.TEST_MOCKJS]: (state, { payload }) => {
        state.node = payload.node
    },
}

const actions = {
    getList({ commit }) {
        new Promise((resolve, reject) => {
            reqList().then(res => {
                commit({
                    type: types.SAVE_LIST,
                    payload: { list: res.data }
                });
            }).catch(error => {
                return false;
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}