import React, { Component } from "react";
import { StyleSheet, View, Image, PanResponder, Animated, } from "react-native";

class HotImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHotImage: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY({ x: 150, y: 150 }),
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._val = { x: 150, y: 150 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 100
          }).start(() =>
            this.setState({
              showHotImage: false
            })
          );
        }
      }
    });
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderHotImage()}
      </View>
    );
  }

  renderHotImage() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;
    let rotate = '0deg';

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showHotImage) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View style={imageStyle} {...this.panResponder.panHandlers}>
            <Image style={styles.stretch} source={require('./../assets/kids.jpg')} />
          </Animated.View>
        </View>
      );
    }
  }
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height: 200
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexDirection: "row"
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  stretch: {
    width: 150,
    height: 100
  }
});

module.exports = { HotImage }