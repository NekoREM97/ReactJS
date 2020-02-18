import { dictionary } from "../services/dictionary";
import { keno } from "../services/keno";
import moment from "moment";
export default {
  namespace: "main",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
       const mobileNumber = localStorage.getItem("mobileNumber");
     
      const drawCodeKeno = yield call(keno.getDrawPeriod);
      yield put({ type: "save", drawCodeKeno: drawCodeKeno });

      let data = {};
      data.MerchantID = 6;
      data.ProductID = 6;
      data.MobileNumber = mobileNumber;
      const checkProductPilot = yield call(keno.checkProductPilot,data);
      yield put({ type: "save", checkProductPilot: checkProductPilot });

      let currentDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      let drawdatePower = localStorage.getItem("drawDatePower") + " 19:00:00";
      let drawdateMega = localStorage.getItem("drawDateMega") + " 19:00:00";
      let StrdatePower = drawdatePower.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$2/$1/$3"
      );
      let StrdateMega = drawdateMega.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$2/$1/$3"
      );
      let StrCurrentDate = currentDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$2/$1/$3"
      );
      if (
        localStorage.getItem("amountMega") === null ||
        localStorage.getItem("drawDateMega") === null ||
        localStorage.getItem("amountPower") === null ||
        localStorage.getItem("amountPower") === null ||
        new Date(StrCurrentDate) > new Date(StrdatePower) ||
        new Date(StrCurrentDate) > new Date(StrdateMega)
      ) {
        const response = yield call(dictionary.getProductAmount);
        yield put({
          type: "save",
          payload: response,
          checkAddOrder: "",
          Noti: "",
          Terms: ""
        });
        // console.log(response)
        response.data.ListValue.map((item, index, data) => {
          if (item.Type === 2) {
            localStorage.setItem("amountMega", item.Amount);
            localStorage.setItem("drawDateMega", item.DrawDate);
          }
          if (item.Type === 1) {
            localStorage.setItem("amountPower", item.Amount);
            localStorage.setItem("drawDatePower", item.DrawDate);
          }
        });
      }
      // const products = yield call(dictionary.getProduct);
      // yield put({ type: 'save', products : products });

      const balance = yield call(
        dictionary.getBalanceByMobileNumber,
        mobileNumber
      );
      yield put({ type: "save", balance: balance });

         const Terms = yield call(dictionary.getReadTerms);
      yield put({ type: "save", Terms: Terms });

      const Noti = yield call(dictionary.WinnerNoification, mobileNumber);
      yield put({ type: "save", Noti: Noti });
    },
    *checkAddOrder({ payload: data }, { call, put }) {
      const check = yield call(dictionary.checkAddOrder, data);
      yield put({ type: "save", checkAddOrder: check });
    },
    *nextPeriod({ payload: period }, { call, put }) {
      yield put({ type: "save", nextPeriod: period });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (
          pathname === "/" ||
          (pathname === "/main" && history.location.payload === undefined)
        ) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
