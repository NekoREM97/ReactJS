import Payment from '../components/Payment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(state)
    return {
      response: state.payment.payload,
      // province: state.payment.province,
      // district: state.payment.district,
      // ward: state.payment.ward,
      // fee:state.payment.fee,
      player: state.payment.player,
      kenoResponse: state.payment.kenoResponse,
      terms: state.main.Terms,
      err: state.paymentHistory.err
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPayment: (data) => {
            dispatch({ type: 'payment/add', payload: data })
        },
        onGetDistrict: (provinceID) => {
            dispatch({ type: 'payment/getDistrict', payload: provinceID })
        },
        onGetWard: (districtID) => {
            dispatch({ type: 'payment/getWard', payload: districtID })
        },
        onGetFee: (data) => {
            dispatch({ type: 'payment/getFee', payload: data })
        },
        onPaymentKeno: (data) => {
            dispatch({type: 'payment/addKeno', payload: data })
        },
        onTerms: mes => {
            dispatch(
              routerRedux.push({
                pathname: "/terms",
                message: mes
              })
            );
          },
        onGoBack: data => {
          dispatch(
            routerRedux.replace({
              pathname: "/keno",
              payload: data
            })
          );
        },
        onGoBack234: data => {
          dispatch(
            routerRedux.replace({
              pathname: "/lottery-234",
              payload: data
            })
          );
        },
        onGoBack235: data => {
          dispatch(
            routerRedux.replace({
              pathname: "/lottery-235",
              payload: data
            })
          );
        }
    };
}

const PaymentPage = connect(mapStateToProps, mapDispatchToProps)(Payment)

export default PaymentPage;