import {playerWin} from '../services/playerWin';
export default {
    namespace: 'changeVT',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            // const data = {};
            // data.MerchantID = payload.data.MerchantID;
            // data.Amount = payload.data.TransAmount;
            // data.FeeType = payload.data.ChangeType;
            
            // console.log(data)
            // const fee = yield call(playerWin.getFee,data);
            yield put({ type: 'save',resAdd:""});
        },
        *add({ payload: data }, { call, put }) {
            const response = yield call(playerWin.addTrans, data);
            yield put({ type: 'save', resAdd: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/viettel-ac') {
                    // console.log(history)
                    dispatch({ type: 'fetch',payload: history.location.payload});
                }
            });
        },
    }
    
}