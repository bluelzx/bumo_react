import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadHot as loadHotPainting} from 'redux/modules/models/Painting';
import {Link} from 'react-router';
import './Home.scss';
import Waypoint from 'react-waypoint';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';


@connect(
  state => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    component: state.containers.HotPainting
  }),
  dispatch => bindActionCreators({
    loadHotPainting
  }, dispatch)
)

export default class HotPainting extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    component: PropTypes.object,
    paintingDetail: PropTypes.object,
    loadHotPainting: PropTypes.func
  };

  // componentWillMount() {
  // }

  loadMore() {
    const { page, loading } = this.props.component;
    if(loading) return;
    this.props.loadHotPainting(page);
    console.log('load more', page);
  }

  render() {
    const {painting, component,paintingHeat} = this.props;
    const { page, pageMeta } = this.props.component;
    return (<div className="Home">
      <h1>Home</h1>
      <p>Example for all paintings</p>
      <div className="paintingInfo">
        {component.loaded ?
          component.indexes.map((paintingId)=>(
            <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[painting[paintingId].heat]} painting={painting[paintingId]}/>))
          :
          ''}
      </div>

      <div>{component.loaded && pageMeta.next === null ?
        <div>已到最后一页</div> :
        <div>{component.loaded && (page-1) % 2 == 0 ?
          <button onClick={this.loadMore.bind(this)}>加载更多</button> :
          <Waypoint className="waypoint" key={'waypoint' + page} style={{position: 'relative'}}
                    onEnter={this.loadMore.bind(this)}/>}
        </div>}
      </div>
    </div>);
  }
}