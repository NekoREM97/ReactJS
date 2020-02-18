import { dictionary } from '../services/dictionary';
import {player} from '../services/player';
export default {
    namespace: 'infoUpdate',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const info = yield call(dictionary.getPlayerByMobile,
                localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            yield put({ type: 'save', info: info, updateInf: "" });
        },
        *update({ payload: data }, { call, put }) {
            const updateInf = yield call(player.updateInfo, data);
            yield put({ type: "save", updateInf: updateInf });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/updateinfo') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}