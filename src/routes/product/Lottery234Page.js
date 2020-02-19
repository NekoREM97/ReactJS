import Lottery234 from "../../components/xsdt234/Lottery234";
import { connect } from "dva";
import { routerRedux } from "dva/router";

// const mapStateToProps = state => {
//   return {
//     fee: state.payment.fee,
//     err: state.payment.err
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAccept: data => {
//       dispatch(routerRedux.push({ pathname: "/lottery-234-ac", payload: data }));
//     },
//     onTutorial: data => {
//       dispatch(routerRedux.push({ pathname: "/lottery-234-tutorial", payload: data }));
//     },
//     onBack: () => {
//       dispatch(routerRedux.goBack());
//     }
//   };
// };
const mapStateToProps = state => {
  return {
    // err:state.keno.err
    // drawCodeKeno: state.keno.drawCodeKeno,
    // tutorialKeno: state.keno.tutorialKeno,
    response: state.lottery123.data,
    err: state.lottery123.err,
    fee: state.keno.fee
    // err: state.payment.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAccept: data => {
      dispatch(routerRedux.push({ pathname: "/lottery-234-ac", payload: data }));
    },
    onBack: () => {
      dispatch(routerRedux.goBack());
    },
    onGetDrawCode: () => {
      dispatch({ type: "keno/getDrawCode" });
    },
    onTutorial: message => {
      dispatch(
        routerRedux.push({ pathname: "/lottery-234-tutorial", message: message })
      );
    },
    onPayment: (data, fee) => {
      dispatch(
        routerRedux.replace({
          pathname: "/payment",
          payload: data,
          fee: fee
        })
      );
    },
    onGetFee: data => {
      dispatch({ type: "keno/getFee", payload: data });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lottery234);

// function Lottery234Page() {

//   return (
//     <Lottery234/>
//   );
// }
// export default connect()(Lottery234Page)