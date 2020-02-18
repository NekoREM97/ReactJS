import { payment } from "../services/payment";
import { dictionary } from "../services/dictionary";
export default {
  namespace: "payment",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // const response = yield call(dictionary.getProvince);
      // yield put({ type: 'save', province: response });
      const player = yield call(
        dictionary.getPlayerByMobile,
        localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id")
      );
      const terms = yield call(dictionary.getReadTerms);
      yield put({ type: "save", player: player, payload: "",terms: terms });
    },
    *add({ payload: data }, { call, put }) {
      const response = yield call(payment.orderAdd, data);
      yield put({ type: "save", payload: response });
    },
    *getFee({ payload: data }, { call, put }) {
        const response = yield call(payment.getFee, data);
        yield put({ type: 'save', fee: response });
    },
    *addKeno({ payload: data }, { call, put }) {
      const kenoResponse = yield call(payment.addOrderKeno, data);
      yield put({ type: "save", kenoResponse: kenoResponse });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/payment") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
