import React from "react";
import { Checkbox } from 'antd-mobile';
import styles from "../Main.css";
import 'antd-mobile/dist/antd-mobile.css';

const AgreeItem = Checkbox.AgreeItem;

class RulesPaymentText extends React.Component {
  state = {
    message: "",
    balance:0,
    isCheck: false
  };
  componentWillMount() {
    if (this.props.location.message !== undefined) {
      this.setState({ message: this.props.location.message ,balance:this.props.location.balance});
    }
  }
  createMarkup() {
    return { __html: this.state.message };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  onChange = (val) => {
    this.setState({ isCheck: val.target.checked })
  }

  onNext() {
    if (this.state.isCheck)
      this.props.onViettel(this.state.balance);
  }

  render() {
    return <div className={styles.content}>
      <div style={{ background: "#FFF", padding: 12 }}>{this.rulesText()}</div>
      <div className={styles.fixed_bottom}>
        <AgreeItem onChange={e => this.onChange(e)}>Tôi đồng ý với các Quy định chuyển thưởng</AgreeItem>
        <div className={styles.primary_btn} style={{ margin: "4px 15px 15px 15px" }}
          onClick={() => this.onNext()}
        >
          Tiếp tục
        </div>
      </div>
    </div>;
  }
}

export default RulesPaymentText;
