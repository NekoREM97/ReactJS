import Lottery235 from "../../components/xsdt235/Lottery235";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    response: state.lottery123.data,
    err: state.lottery123.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAccept: data => {
      // console.log('a',data); 
      
      dispatch(
       // routerRedux.push({ pathname: "/lottery-235-ac", payload: data })
        routerRedux.push({ pathname: "/payment", payload: data })
      );
    },
    onBack: () => {
      dispatch(routerRedux.goBack());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lottery235);
