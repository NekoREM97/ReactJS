import { playerWin } from '../services/playerWin';
export default {
    namespace: 'changeBankAc',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // const data = {};
            // data.MerchantID = 0;
            // data.Amount = payload.data.TransAmount;
            // data.FeeType = payload.data.ChangeType;

            // const fee = yield call(playerWin.getFee, data);
            yield put({ type: 'save',resAdd: "" });
        },
        *add({ payload: data }, { call, put }) {
            const response = yield call(playerWin.addTrans, data);
            yield put({ type: 'save', resAdd: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/bank-ac') {
                    // console.log(history)
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }

}