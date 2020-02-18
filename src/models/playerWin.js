import { playerWin } from '../services/playerWin';
import {dictionary} from '../services/dictionary';
export default {
    namespace: 'playerWin',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            let mobileNumber = localStorage.getItem("mobileNumber");
            const response = yield call(playerWin.getByMobileNumber,mobileNumber);
            yield put({ type: 'save', payload: response });

             const paymentRules = yield call(dictionary.getReadRules);
            yield put({ type: 'save', paymentRules: paymentRules });
        },
        *fee({ payload: data }, { call, put }) {
            const value = {};
            value.MerchantID = 1;
            value.Amount = data.TransAmount;
            value.FeeType = data.ChangeType;

            const fee = yield call(playerWin.getFee, value);

            yield put({ type: "save", fee: fee });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/win') {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}