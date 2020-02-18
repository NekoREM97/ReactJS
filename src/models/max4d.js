import { dictionary } from '../services/dictionary';
export default {
    namespace: 'max4d',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const response = yield call(dictionary.getDrawMax4d);
            yield put({ type: 'save', response: response,checkNumber : "" });
        },
        *check({ payload: data }, { call, put }) {
            const checkNumber = yield call(dictionary.checkOutOfNumberMax4D, data);
            yield put({ type: "save", checkNumber: checkNumber });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // console.log(history);
                if (pathname === '/max4d' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}