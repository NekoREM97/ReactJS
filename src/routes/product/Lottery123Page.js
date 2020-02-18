import Lottery123 from "../../components/xsdt123/Lottery123";
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
      dispatch(
        routerRedux.push({ pathname: "/lottery-123-ac", payload: data })
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
)(Lottery123);
