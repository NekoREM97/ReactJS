import { dictionary } from '../services/dictionary';
import {playerWin} from '../services/playerWin';
export default {
  namespace: "changeBank",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(dictionary.getBank);
      // console.log(response)
      yield put({ type: "save", payload: response, resAdd: "" });
    },
    *add({ payload: data }, { call, put }) {
      const response = yield call(playerWin.addTrans, data);
      yield put({ type: "save", resAdd: response });
    },
    *fee({ payload: data }, { call, put }) {
      const value = {};
      value.MerchantID = 0;
      value.Amount = data.TransAmount;
      value.FeeType = data.ChangeType;
      const fee = yield call(playerWin.getFee, value);

      yield put({ type: "save", fee: fee });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/bank") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};