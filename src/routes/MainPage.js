import Main from '../components/Main';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
      response: state.main.payload,
      products: state.main.products,
      balance: state.main.balance,
      checkAddOrder: state.main.checkAddOrder,
      Terms: state.main.Terms,
      Noti: state.main.Noti,
      drawCodeKeno: state.main.drawCodeKeno,
      checkMobilePilot: state.main.checkMobilePilot,
      checkProductPilot: state.main.checkProductPilot,
      nextPeriod: state.main.nextPeriod
    };
    // return {}?
}

const mapDispatchToProps = (dispatch) => {
    return {
      onKeno: () => {
        dispatch(routerRedux.push({ pathname: "/keno" }));
      },
      onLottery123: () => {
        dispatch(routerRedux.push({ pathname: "/lottery-123" }));
      },
      onLottery234: () => {
        dispatch(routerRedux.push({ pathname: "/lottery-234" }));
      },
      onLottery235: () => {
        dispatch(routerRedux.push({ pathname: "/lottery-235" }));
      },
      onMax4D: () => {
        dispatch(routerRedux.push({ pathname: "/max4d" }));
      },
      onMax3D: () => {
        dispatch(routerRedux.push({ pathname: "/max3d" }));
      },
      onMax3DPlus: () => {
        dispatch(routerRedux.push({ pathname: "/max3dplus" }));
      },
      onCheckAddOrder: productID => {
        dispatch({ type: "main/checkAddOrder", payload: productID });
      },
      onMega645: () => {
        dispatch(routerRedux.push({ pathname: "/mega645" }));
      },
      onPower655: () => {
        dispatch(routerRedux.push({ pathname: "/power655" }));
      },
      onHistory: () => {
        dispatch(routerRedux.push({ pathname: "/paymenthistory" }));
      },
      onWin: () => {
        dispatch(routerRedux.push({ pathname: "/win" }));
      },
      onDrawResult: () => {
        dispatch(routerRedux.push({ pathname: "/draw-result" }));
      },
      onPersonalInfo: () => {
        dispatch(routerRedux.push({ pathname: "/info" }));
      },
      onNextPeriod: period => {
        dispatch({ type: "main/nextPeriod", payload: period });
      },
      onTerms: mes => {
        dispatch(
          routerRedux.push({
            pathname: "/terms",
            message: mes
          })
        );
      }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);