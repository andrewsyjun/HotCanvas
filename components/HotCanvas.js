import React, { Component } from 'react';
import { HotImage } from './HotImage';
import { StyleSheet, View, TouchableOpacity, Alert, Image, Amimated } from 'react-native';


class HotCanvas extends Component {

  constructor(props) {
    super(props);
    //this.viewableObjects = [];
    this.state = {
      viewableObjects: []
    };
    this.viewableObjIndex = 0;
  }

  onPressAddObj = (e) => {
    //1. show a circle image
    //2. have the image follow the cursor
    //3. drop on a location when mouse is clicked 


    let newObj = [...this.state.viewableObjects, <HotImage />]
    this.setState({
      viewableObjects: [...this.state.viewableObjects, <HotImage />]
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={this.onPressAddObj}>

          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
            style={styles.FloatingButtonStyle}
          />

        </TouchableOpacity>
        {this.getRederables()}
      </View>
    )
  }

  getRederables() {
    let Render_Animated_View = this.state.viewableObjects.map((item, key) => {
      return (
        <HotImage key={key} />
      );
    });
    return (
      Render_Animated_View
    )
  }
}


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});

module.exports = { HotCanvas }