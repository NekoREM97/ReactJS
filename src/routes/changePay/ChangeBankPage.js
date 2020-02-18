import ChangeBank from "../../components/changePay/ChangeBank";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log( state.changeBank)
    // console.log( state.changeBank)
    return {
      bank: state.changeBank.payload,
      response: state.changeBank.resAdd,
      fee: state.changeBank.fee,
      err: state.changeBank.err
    };
    // return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOK: (data) => {
            dispatch(routerRedux.push({pathname : '/bank-ac',payload : {data}}))
        },
        onFee: (data) => {
            dispatch({ type: "changeBank/fee", payload: data });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBank);