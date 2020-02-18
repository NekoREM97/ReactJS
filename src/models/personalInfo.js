import {player} from '../services/player';
import {dictionary} from '../services/dictionary';
export default {
    namespace: 'personalInfo',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const balance = yield call(player.getTransRefBalance,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', balance: balance});

            const info = yield call(dictionary.getPlayerByMobile,
                localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            yield put({ type: 'save', info: info });
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/info') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}