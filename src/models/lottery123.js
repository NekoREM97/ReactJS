import { lottery } from "../services/lottery";
export default {
  namespace: "lottery123",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(lottery.getLottery123Draw);
      yield put({ type: "save", payload: response });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/lottery-123" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
