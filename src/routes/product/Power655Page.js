import Power655 from '../../components/power/Power655';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.main.products)}`)
    // console.log(state.main.payload.data);
    return {
        response : state.power655.data,
        err:state.power655.err,
        // responseMain : state.main.payload.data
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(
              routerRedux.replace({
                pathname: "/mega645accept",
                payload: data
              })
            );
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        }
    };
}

const Power655Page = connect(mapStateToProps,mapDispatchToProps)(Power655)

export default Power655Page;