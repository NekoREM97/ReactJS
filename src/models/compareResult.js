import { playerWin } from '../services/playerWin';
export default {
    namespace: 'compareResult',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // console.log(payload.data.ID);//21761
            const response = yield call(playerWin.getOrderItemWin, payload.data.ID);
            // const response = yield call(playerWin.getOrderItemWin, "21761");
            yield put({ type: 'save', payload: response });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/compare-result') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }

}