import DrawResult from '../components/resultQSMT/DrawResult';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        max4d: state.drawResult.max4d,
        mega: state.drawResult.mega,
        power: state.drawResult.power,
        max3d: state.drawResult.max3d,
        keno: state.drawResult.keno,
        lottery_123: state.drawResult.lottery_123,
        checkProductPilot: state.main.checkProductPilot,
        err: state.drawResult.err
    }
}

export default connect(mapStateToProps, null)(DrawResult);