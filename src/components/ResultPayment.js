import React from 'react';
import { Result, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import qs from 'query-string-es5';
import styles from '../index.css';
import styles2 from './Main.css';

// const resultImg = src => <img src={src} className={styles.spe} alt="" />;
const CustomIcon = ({ type, className, size = 'md', ...restProps }) => (
    <svg className={`${className}`} style={{ width: 60, height: 60 }}>
        {/* <use xlinkHref={type} /> svg-sprite-loader@0.3.x */}
        <use xlinkHref={`#${type.default.id}`} /> {/* svg-sprite-loader@latest */}
    </svg>
);

class ResultPayment extends React.Component {
    constructor(props) {
        super(props);

        this.state = { result: {} }
    }

    componentWillMount() {
        // console.log("dd")
        this.setState({ result: qs.parse(this.props.location.search) });
    }

    initView() {
        let message = "Mã hoá đơn " + this.state.result.billcode;
        
        if (this.state.result.payment_status === "1") {
            return (
                <Result
                    img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#1F90E6', width: 60, height: 60 }} />}
                    title="Giao dịch thành công"
                    message={message}
                    // buttonText="Trang chủ"
                    // buttonType="ghost"
                    // onButtonClick={this.props.onMain}
                />
            );
        }
        else if (this.state.result.payment_status === "0") {
            return (
                <Result
                    img={<CustomIcon type={require("../assets/waitting.svg")} style={{ fill: '#F13642' }} />}
                    title={this.getStatusName("0")}
                    message={message}
                    // buttonText="Trang chủ"
                    // buttonType="ghost"
                    // onButtonClick={this.props.onMain}
                />
            );
        }
        else {
            return (
                <Result
                    img={<Icon type="cross-circle-o" className={styles.spe} style={{ fill: '#F13642', width: 60, height: 60 }} />}
                    title={this.getStatusName(this.state.result.payment_status)}
                    message={message}
                    // buttonText="Trang chủ"
                    // buttonType="ghost"
                    // onButtonClick={this.props.onMain}
                />
            );
        }
    }

    getStatusName = (code) => {
        let name = "";
        switch (code) {
            case "0":
                name = "Giao dịch đang chờ xử lý";
                break;
            case "1":
                name = "Giao dịch thành công";
                break;
            case "3":
                name = "Giao dịch đã xử lý nhưng chưa có kết quả";
                break;
            case "5":
                name = "Khách hàng huỷ không thanh toán";
                break;
            default:
                name = "Giao dịch thất bại";
                break;
        }
        return name;
    }

    render() {
        return (
            <div style={{fontFamily: "Helvetica"}}>
            {this.initView()}
            <div className={styles2.primary_btn} style={{ margin: 10 }} onClick={this.props.onMain} >
            <div>Về trang chủ</div>
          </div>
            </div>
        );
    }
}

export default ResultPayment;