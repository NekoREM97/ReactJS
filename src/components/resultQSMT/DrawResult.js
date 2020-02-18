import React from "react";
import styles2 from "../Main.css";
import { Tabs, ActivityIndicator, Toast } from "antd-mobile";
import Max4DResult from "../resultQSMT/Max4DResult";
import MegaResult from "../resultQSMT/MegaResult";
import PowerResult from "../resultQSMT/PowerResult";
import Max3DResult from "../resultQSMT/Max3DResult";
import Lottery123Result from "../resultQSMT/Lottery123Result";
import KenoResult from "../resultQSMT/KenoResult";
const tabs = [{ title: "Các sản phẩm khác" }, { title: "Keno" }];
const tabOthers = [
  { title: "Mega 6/45" },
  { title: "Power 6/55" },
  { title: "Max 4D" },
  { title: "Max 3D" },
  { title: "XSDT 123" }
];

class ChangeViettelPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max4d: [],
      power: [],
      mega: [],
      max3d: [],
      lottery_123: [],
      keno: [],
      animating: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mega !== undefined &&
      this.state.mega.length === 0 &&
      nextProps.power !== undefined &&
      this.state.power.length === 0 &&
      nextProps.max4d !== undefined &&
      this.state.max4d.length === 0 &&
      nextProps.max3d !== undefined &&
      this.state.max3d.length === 0 &&
      nextProps.lottery_123 !== undefined &&
      this.state.lottery_123.length === 0
    ) {
      this.setState({ animating: false });
      // console.log(nextProps);
      if (
        nextProps.mega.data.Code === "00" &&
        nextProps.power.data.Code === "00" &&
        nextProps.max4d.data.Code === "00" &&
        nextProps.max3d.data.Code === "00" &&
        nextProps.lottery_123.data.Code === "00"
      ) {
        this.setState({
          mega: nextProps.mega.data.ListValue,
          power: nextProps.power.data.ListValue,
          max4d: nextProps.max4d.data.ListValue,
          max3d: nextProps.max3d.data.ListValue,
          lottery_123: nextProps.lottery_123.data.ListValue
          // keno: nextProps.keno.data.ListValue
        });
      }
    }
    if (nextProps.keno != undefined && nextProps.keno.data != undefined) {
      console.log(nextProps.keno);
      this.setState({ keno: nextProps.keno.data.ListValue });
    }
    if (nextProps.err !== undefined) {
      this.setState({ animating: false });
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }

  // componentDidUpdate() {
  //   if (
  //     this.state.max4d.length !== 0 &&
  //     this.state.mega.length !== 0 &&
  //     this.state.power.length !== 0 &&
  //     this.state.max3d.length !== 0 &&
  //     this.state.keno.length !== 0 &&
  //     this.state.animating
  //   ) {
  //     this.setState({ animating: false });
  //   }
  // }

  render() {
    return (
      <div className={styles2.content}>
        <ActivityIndicator
          className={styles2.spin}
          animating={this.state.animating}
          toast
        ></ActivityIndicator>
        <Tabs tabs={tabs} initialPage={1} swipeable={false}>
          <Tabs tabs={tabOthers} initialPage={0} swipeable={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
            <MegaResult result={this.state.mega} />
            <PowerResult result={this.state.power} />
            <Max4DResult result={this.state.max4d} />
            <Max3DResult result={this.state.max3d} />
            <Lottery123Result result={this.state.lottery_123} />
          </Tabs>
          <KenoResult result={this.state.keno} />
        </Tabs>
      </div>
    );
  }
}
export default ChangeViettelPay;
