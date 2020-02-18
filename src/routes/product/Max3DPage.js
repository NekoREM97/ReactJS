import Max3D from '../../components/max3d/Max3D';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    console.log(state)
    return {
        response : state.max3d.response,
        checkNumber: state.max3d.checkNumber,
        err:state.max3d.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(routerRedux.push({pathname : '/max3daccept',payload:data}))
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        },
        onCheckDup:(data) => {
            dispatch({ type: 'max3d/check', payload: data })
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Max3D);