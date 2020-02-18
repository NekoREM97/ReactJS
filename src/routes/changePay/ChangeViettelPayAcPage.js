import ChangeViettelPayAccept from "../../components/changePay/ChangeViettelPayAccept";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        resAdd: state.changeVT.resAdd,
        err:state.changeVT.err}
    // return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOK: (data) => {
            dispatch({ type: 'changeVT/add', payload: data })
        },
        onWin: () => {
            dispatch(routerRedux.replace({pathname : '/win'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeViettelPayAccept);