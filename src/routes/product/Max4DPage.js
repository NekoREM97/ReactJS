import Max4D from "../../components/max4d/Max4D";
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.max4d.data)}`)
    return {
        response : state.max4d.response,
        checkNumber: state.max4d.checkNumber,
        err:state.max4d.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(routerRedux.push({pathname : '/max4daccept',payload:data}))
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        },
        onCheckOutOfNum:(data) => {
            dispatch({ type: 'max4d/check', payload: data })
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Max4D);