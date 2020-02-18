import { dictionary } from '../services/dictionary';
export default {
    namespace: 'power655',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const response = yield call(dictionary.getDrawPower);
            yield put({ type: 'save', payload: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/power655' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}