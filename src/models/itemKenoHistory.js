import { payment } from "../services/payment";
export default {
  namespace: "itemKenoHistory",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(
    //     payment.getOrderItemKeno,
    //     payload.data.OrderCode
    //   );
    //   yield put({ type: "save", response: response, ErrorOrder: "" });
    // },
    *getOrderItem({ payload }, { call, put }) {
      // console.log(payload)
      const response = yield call(
        payment.getOrderItemKeno,
        payload
      );
      yield put({ type: "save", response: response, ErrorOrder: "" });
    },

    *report({ payload: data }, { call, put }) {
      const ErrorOrder = yield call(payment.ReportErrorOrder, data);
      yield put({ type: "save", ErrorOrder: ErrorOrder });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // console.log(pathname);
        if (pathname === "/item-keno") {
          dispatch({ type: "fetch", payload: history.location.payload });
        }
      });
    }
  }
};
