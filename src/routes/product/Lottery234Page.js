import Lottery234 from "../../components/xsdt234/Lottery234";
import { connect } from "dva";
import { routerRedux } from "dva/router";

// const mapStateToProps = state => {
//   return {
//     // response: state.lottery234.data,
//     // err: state.lottery234.err
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAccept: data => {
//       dispatch(
//         routerRedux.push({ pathname: "/lottery-234-ac", payload: data })
//       );
//     },
//     onBack: () => {
//       dispatch(routerRedux.goBack());
//     }
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Lottery234);

function Lottery234Page() {

  return (
    <Lottery234/>
  );
}
export default connect()(Lottery234Page)