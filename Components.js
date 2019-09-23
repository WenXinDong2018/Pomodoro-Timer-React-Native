import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Slider,
} from 'react-native';

export const TimerSlider = props => {
  if (props.status === true) {
    var minute = Math.floor(props.currentTime / 60);
    var second = props.currentTime - minute * 60;
    if (second < 10) {
      second = '0' + second;
    }
    return (
      <View style={styles.timer}>
        <Text style={styles.timerText}>
          {minute} : {second}{' '}
        </Text>
      </View>
    );
  }else if (props.workFlag === true){
      return (

      <Slider
        disabled ={true}
        style={styles.slider}
        maximumValue={props.workDuration}
        minimumValue={0}
        value={props.workDuration - props.currentTime}
      />
    );
  }else{

    return (
      <Slider
      disabled = {true}
        style={styles.slider}
        maximumValue={props.restDuration}
        minimumValue={0}
        value={props.restDuration - props.currentTime}
      />
    );

  }

  
};

export const StatusSign = props => {
  if (props.status === 'resting') {
    return (
      <View style={styles.statusSignWrap}>
        <Image
          source={require('./assets/resting.png')}
          style={styles.statusSign}
        />
      </View>
    );
  } else if (props.status === 'working') {
    return (
      <View style={styles.statusSignWrap}>
        <Image
          source={require('./assets/working.png')}
          style={styles.statusSign}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.statusSignWrap}>
        <Image
          source={require('./assets/paused.png')}
          style={styles.statusSign}
        />
      </View>
    );
  }
};

export const PauseBtn = props => {
  if (props.status === 'pausing') {
    return (
      <View style={styles.pauseBtnWrap}>
        <TouchableOpacity onPress={props.pauseTimer}>
          <Image
            source={require('./assets/play.png')}
            style={styles.pauseImg}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.pauseBtnWrap}>
        <TouchableOpacity onPress={props.pauseTimer}>
          <Image
            source={require('./assets/pause.png')}
            style={styles.pauseImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export const SkipBtn = props => {
  if (props.skipStatus === 'working') {
    return (
      <View style={styles.skipBtnWrap}>
        <TouchableOpacity onPress={props.switchMode}>
          <Image
            source={require('./assets/skipWork.png')}
            style={styles.skipImg}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.skipBtnWrap}>
        <TouchableOpacity onPress={props.switchMode}>
          <Image
            source={require('./assets/skipBreak.png')}
            style={styles.skipImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
};
export const SetWorkTime = props => {
  if (props.workSeconds < 10) {
    this.second = '0' + props.workSeconds;
  }
  return(
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('./assets/workFor.png')} style={styles.workForImg} />
    <TextInput
    keyboardType = 'numeric'
returnKeyType="done"
      onEndEditing={event => props.setWorkMinute(event.nativeEvent.text)}
      style={styles.timerInput}
      placeholder = {props.workMinute + ""}
      placeholderTextColor = {'black'}
      maxLength={3} 
    />
    <Text style = {{fontWeight:'bold'}}> : </Text>
    <TextInput
      keyboardType = 'numeric'
returnKeyType="done"
      onEndEditing={event => props.setWorkSeconds(event.nativeEvent.text)}
      style={styles.timerInput}
      placeholder = {this.second + ""}
      placeholderTextColor = {'black'}
      maxLength={2} 
    />
  </View>
  )}

export const SetRestTime = props =>  {
  if (props.restSeconds < 10) {
    this.second = '0' + props.restSeconds;
  }
  return(
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('./assets/restFor.png')} style={styles.workForImg} />
    <TextInput
    maxLength={3} 
    keyboardType = 'numeric'
returnKeyType="done"
      onEndEditing={event => props.setRestMinute(event.nativeEvent.text)}
      style={styles.timerInput}
      placeholder = {props.restMinute + ""}
      placeholderTextColor = {'black'}
    />
    <Text style = {{fontWeight:'bold'}}> : </Text>
    <TextInput
    maxLength={2} 
    keyboardType = 'number-pad'
	returnKeyType="done"
      onEndEditing={event => props.setRestSeconds(event.nativeEvent.text)}
      style={styles.timerInput}
      placeholder = {this.second + ""}
      placeholderTextColor = {'black'}
    />
  </View>
)};

const styles = StyleSheet.create({
  timerInput: {
    flex: 0,
    maxWidth: 30,
    width: 30,
    height: 30,
    maxHeight: 30,
    borderWidth: 1,
    backgroundColor: '#fff9d7',
    margin: 2,
    textAlign:'center',
  },

  workForImg: {
    width: 80,
    height: 20,
    resizeMode: 'contain',
    maxWidth: 80,
    maxHeight: 20,
    marginRight: 15,
  },

  timer: {
    marginLeft: 50,
    marginRight: 35,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 30,
  },
  statusSign: {
    width: 350,
    height: 120,
    resizeMode: 'contain',
  },
  statusSignWrap: {
    marginTop: 40,
    marginBottom: 20,
  },

  pauseImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  pauseBtnWrap: {
    marginBottom: 10,
  },
  skipImg: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  skipBtnWrap: {
    marginBottom: 10,
  },
  slider:{
    marginTop:17,
    marginBottom:15,
    marginLeft: 20,
    marginRight: 5, 
    width: 170,
  }
});

