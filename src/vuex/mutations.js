import {
    GET_TITLE,
} from './mutation-types.js'

export default{
    [GET_TITLE](state, info) {
        console.log(info);
        state.title = info;
    },
}