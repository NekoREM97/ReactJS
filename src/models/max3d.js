import { dictionary } from '../services/dictionary';
export default {
    namespace: 'max3d',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const response = yield call(dictionary.getDrawMax3D);
            yield put({ type: 'save', response: response,checkNumber : "" });
        },
        *check({ payload: data }, { call, put }) {
            const checkNumber = yield call(dictionary.checkOutOfNumber, data);
            yield put({ type: "save", checkNumber: checkNumber });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/max3d' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}