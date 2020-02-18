import { paymenttickets } from "../services/paymenttickets";
import { dictionary } from "../services/dictionary";
export default {
  namespace: "paymenttickets",
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
        localStorage.getItem("mobileNumber"),
        localStorage.getItem("merchant_id")
      );
      yield put({ type: "save", player: player, payload: "" });
    },
    *add({ payload: data }, { call, put }) {
      const response = yield call(paymenttickets.orderAdd, data);
      yield put({ type: "save", payload: response });
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(paymenttickets.getFee, data);
      yield put({ type: "save", fee: response });
    },
    *addKeno({ payload: data }, { call, put }) {
      const kenoResponse = yield call(paymenttickets.addOrderKeno, data);
      yield put({ type: "save", kenoResponse: kenoResponse });
    },
    *getReceiverMobile({ payload: data }, { call, put }) {
      const receiverplayer = yield call(dictionary.getPlayerByMobile, data, localStorage.getItem("merchant_id"));
      yield put({ type: "save", receiverMobile: receiverplayer, payload: "" });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/paymenttickets") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
