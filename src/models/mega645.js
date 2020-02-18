import { dictionary } from '../services/dictionary';
export default {
    namespace: 'mega645',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const response = yield call(dictionary.getDrawMega645);
            yield put({ type: 'save', payload: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/mega645' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}