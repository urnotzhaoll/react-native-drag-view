import React,{Component,PropTypes} from 'react';  
import {  
  AppRegistry,
  PanResponder,
  StyleSheet,
  View,
  processColor,
  TouchableOpacity,
} from 'react-native';

var CIRCLE_SIZE = 80;  
var CIRCLE_COLOR = 'blue';  
var CIRCLE_HIGHLIGHT_COLOR = 'green';

export default class Drag extends Component{

  constructor(props) {
    super(props);
  
    this.state = {};
    this. _panResponder={}
    this._previousLeft=0
    this._previousTop=0
    this._circleStyles={}
    this.circle=(null : ?{ setNativeProps(props: Object): void })
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._startShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._moveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  }

  componentDidMount(){
    this._updatePosition();
  }

  render(){
    return (
      <View style={styles.container}>
              <View
                ref={(circle) => {
                  this.circle = circle;
                }}
                style={styles.circle}
                {...this._panResponder.panHandlers}
              />
      </View>
    );
  }

  _startShouldSetPanResponder(e: Object, gestureState: Object){
    return true;
  }

  _moveShouldSetPanResponder(e: Object, gestureState: Object){
    return true;
  }

  _highlight(){
    const circle = this.circle;
    circle && circle.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
      }
    });
  }

  _unHighlight(){
    const circle = this.circle;
    circle && circle.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_COLOR)
      }
    });
  }

  _updatePosition(){
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    this._highlight();
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    if(gestureState.dx==0&&gestureState.dy==0){
       this.props.onPress();
    }
  }

}

var styles = StyleSheet.create({  
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
});

Drag.propTypes = {
  //img: PropTypes.string,
  onPress: PropTypes.func
  //describe: PropTypes.string.,
};

