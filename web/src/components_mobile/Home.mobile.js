import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {load as loadPainting, loadHot as loadHotPainting} from "../redux/modules/models/Painting";
import PureListView from "./PureListView";
import {initialApp} from "../redux/modules/auth";
import OrderPainting from "./OrderPainting";


export default class Home extends Component {

  static propTypes = {
    painting: PropTypes.object,
    loadHotPainting: PropTypes.func,
    loadPainting: PropTypes.func
  };

  componentWillMount() {
    this.props.initialApp();
  }


  render() {
    const {component, painting, loadPainting, profile, orderPainting, loadHotPainting }=this.props;
    const load = orderPainting.orderType == '热门' ? loadHotPainting : loadPainting;
    const orderType = orderPainting.orderType == '热门' ? 'Hot' : 'Latest';
    return (
      <View>
        <OrderPainting/>
        <PureListView painting={painting}
                      component={component[orderType]}
                      orderType={orderType}
                      loadPainting={load}
                      navigator={this.props.navigator}
                      profile={profile}
        />
      </View>
    )
  }

}


export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    me: state.me,
    component: state.containers.Home,
    profile: state.models.profile,
    orderPainting: state.containers.orderPainting
  }),
  {
    loadPainting,
    loadHotPainting,
    initialApp
  }
)(Home);
