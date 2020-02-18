import { payment } from '../services/payment';
export default {
    namespace: 'result',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(payment.getOrderItemByCode,payload.orderCode);
            yield put({ type: 'save', payload: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/payment-history-item') {
                    // console.log(query)
                    // console.log(history)
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}