import React from "react";
import styles2 from "../Main.css";
import { InputItem, Text, Toast, Picker, List } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";

class ChangeBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      mobileNumber: "",
      amount: 0,
      bankList: [],
      bankID: 0,
      accountNumber: "",
      fullName: "",
      branch: ""
    };
  }
  componentWillMount() {
    this.setState({
      mobileNumber: localStorage.getItem("mobileNumber"),
      balance: this.props.location.balance
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.bank !== undefined) {
      if (nextProps.bank.data.Code === "00") {
        // console.log(nextProps.bank.ListValue)
        const _bankList = nextProps.bank.data.ListValue.map(
          (item, index, data) => {
            let _bank = {};
            _bank.value = item.ID;
            _bank.label = item.Code;
            return _bank;
          }
        );
        this.setState({ bankList: _bankList });
      } else {
        Toast.info("Lỗi tải danh mục ngân hàng", 5);
      }
    }

    if (nextProps.fee !== undefined) {
      if (nextProps.fee.data.Code === "00") {
        let BankName = this.state.bankList.find(element => {
          return element.value === this.state.bankID;
        });
        let data = {};
        data.MerchantID = 6;
        data.TransAmount = this.state.amount;
        data.TransType = 2;
        data.MobileNumber = this.state.mobileNumber;
        data.BankID = this.state.bankID;
        data.ChangeType = 2;
        data.TransDetails = this.state.accountNumber;
        data.FullName = this.state.fullName;
        data.BranchName = this.state.branch;
        data.BankName = BankName.label;
        data.Fee = nextProps.fee.data.Value;
        data.Balance = this.state.balance;

        this.props.onOK(data);
      } else {
        Toast.info(nextProps.fee.data.Message, 2);
      }
    }

    if (nextProps.err !== undefined) {
      this.setState({ animating: false });
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }

  onChangeAmout = value => {
    this.setState({ amount: value });
  };

  onChangeAccount = value => {
    this.setState({ accountNumber: value });
  };

  onChangeFullName = value => {
    this.setState({ fullName: value });
  };

  onChangeBranch = value => {
    this.setState({ branch: value });
  };

  onOk = () => {
    // console.log(this.state.bank)
    if (this.state.amount <= 0 || this.state.amount === "") {
      Toast.info("Bạn chưa nhập số tiền đổi thưởng", 2);
      return;
    }
    if (this.state.amount > this.state.balance) {
      Toast.info("Số tiền đổi thưởng không được lớn hơn tổng tiền thưởng", 2);
      return;
    }
    if (this.state.bankID === 0) {
      Toast.info("Bạn chưa chọn ngân hàng", 2);
      return;
    }
    if (this.state.accountNumber === "") {
      Toast.info("Bạn chưa nhập số tài khoản", 2);
      return;
    }
    if (this.state.fullName === "") {
      Toast.info("Bạn chưa nhập tên chủ tài khoản", 2);
      return;
    }
    if (this.state.branch === "") {
      Toast.info("Bạn chưa nhập chi nhánh", 2);
      return;
    }

    let data = {};
    data.MerchantID = 6;
    data.TransAmount = this.state.amount;
    data.TransType = 2;
    data.MobileNumber = this.state.mobileNumber;
    data.BankID = this.state.bankID;
    data.ChangeType = 2;
    data.TransDetails = this.state.accountNumber;
    data.FullName = this.state.fullName;
    data.BranchName = this.state.branch;
    // console.log(data)
    // this.props.onOK(data);
    this.props.onFee(data);
  };

  render() {
    return (
      <div style={{ background: "#FFFFFF", paddingBottom: 15 }} className={styles2.content}>
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130 }}
              className="am-input-label am-input-label-5"
            >
              <div>Tổng tiền thưởng</div>
            </div>
            <div className="am-input-control">
              <Text
                style={{
                  float: "right",
                  color: "rgb(255, 0, 0)",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontFamily: "sans-serif"
                }}
              >
                {stringToNumberFormat(this.state.balance) + " đ"}
              </Text>
            </div>
          </div>
        </div>
        <InputItem
          value={stringToNumberFormat(this.state.amount)}
          style={{
            textAlign: "right",
            fontWeight: "bold",
            color: "rgb(255, 0, 0)"
          }}
          type="number"
          clear
          onChange={this.onChangeAmout}
        >
          Số tiền ĐT
        </InputItem>

        <Picker
          title="Chọn Ngân hàng"
          extra="Ngân hàng"
          data={this.state.bankList}
          cols={1}
          className="forss"
          okText="Chọn"
          dismissText="Đóng"
          disabled={false}
          value={[this.state.bankID]}
          onOk={v => {
            this.setState({ bankID: v[0] });
          }}
        >
          <List.Item style={{ fontSize: 16, border: "none" }} arrow="down">
            Ngân hàng
          </List.Item>
        </Picker>
        <div style={{ background: "#ddd", height: 1, marginLeft: 15 }} />
        <InputItem
          style={{ textAlign: "right", fontFamily: "Times", fontSize: 16 }}
          value={this.state.accountNumber}
          onChange={this.onChangeAccount}
          clear
          placeholder="Số tài khoản"
        >
          Số TK
        </InputItem>
        <InputItem
          style={{ textAlign: "right", fontFamily: "Times", fontSize: 16 }}
          value={this.state.fullName}
          onChange={this.onChangeFullName}
          clear
          placeholder="Chủ tài khoản"
        >
          Chủ TK
        </InputItem>
        <InputItem
          style={{ textAlign: "right", fontFamily: "Times", fontSize: 16 }}
          value={this.state.branch}
          onChange={this.onChangeBranch}
          clear
          placeholder="Chi nhánh"
        >
          Chi nhánh
        </InputItem>
        <div
          onClick={() => this.onOk()}
          className={styles2.primary_btn}
          style={{ margin: 15, height: 40 }}
        >
          Tiếp tục
        </div>
      </div>
    );
  }
}
export default ChangeBank;
