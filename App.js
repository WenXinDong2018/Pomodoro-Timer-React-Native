import React from 'react';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Vibration
} from 'react-native';
import {
  StatusSign,
  PauseBtn,
  SkipBtn,
  SetWorkTime,
  SetRestTime,
  TimerSlider,
} from './Components';
import { Feather } from '@expo/vector-icons';
import { AppLoading} from 'expo';
import KeepAwake from 'expo-keep-awake';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pause: true,
      workDuration: 1500,
      restDuration: 300,
      currentTime: 1500,
      workFlag: true,
      workMinute: 25,
      workSeconds: 0,
      restMinute: 5,
      restSeconds: 0,
      timer: true,
      isReady: false,
      soundObject: new Audio.Sound(),
    };
  }
  alarm = async () => {
    try {
      
      const { sound:soundObject, status } = await Audio.Sound.createAsync(
        require('./assets/alarm.mp3'),
        { shouldPlay: true }
      );
    } catch (error) {
      // An error occurred!
    }
  }
  componentDidMount() {

    this.interval = setInterval(this.dec, 1000);
  }


  componentWillUnmount() {

    clearInterval(this.interval);
  }

  dec = () => {
    if (this.state.pause === false) {
      if (this.state.currentTime > 0) {
        this.setState(prevState => ({
          currentTime: prevState.currentTime - 1,
        }));
      } else {
        this.alarm()
        Vibration.vibrate(3000)
        this.switchMode();
      }
    }
  };

  pauseTimer = () => {
    this.setState(prevState => ({
      pause: !prevState.pause,
    }));
  };

  switchMode() {
    if (this.state.workFlag === true) {
      this.setState(prevState => ({
        pause: false,
        currentTime: prevState.restDuration,
        workFlag: false,
      }));
    } else {
      this.setState(prevState => ({
        pause: false,
        currentTime: prevState.workDuration,
        workFlag: true,
      }));
    }
  }

  resetTimer = () => {
    if (this.state.workFlag === true) {
      this.setState(prevState => ({
        pause: false,
        currentTime: prevState.workDuration,
      }));
    } else {
      this.setState(prevState => ({
        pause: false,
        currentTime: prevState.restDuration,
      }));
    }
  };

  setWorkMinute(minute) {

    if (isNaN(minute)) {
      //console.log(minute);
      this.setState(prevState => ({
        workMinute: 25,
        workDuration: 25 * 60 + prevState.workSeconds,
      }));
    } else {
      this.setState(prevState => ({
        workMinute: minute,
        workDuration: minute * 60 + prevState.workSeconds,
      }));
    }
    if (this.state.workFlag === true) {
      this.resetTimer();
    }
  }

  setWorkSeconds(seconds) {
    if (isNaN(seconds)) {
      //console.log(seconds);
      this.setState(prevState => ({
        workSeconds: 0,
        workDuration: prevState.workMinute * 60,
      }));
    } else {
      this.setState(prevState => ({
        workSeconds: seconds,
        workDuration: prevState.workMinute * 60 + seconds,
      }));
    }
    if (this.state.workFlag === true) {
      this.resetTimer();
    }
  }

  setRestMinute(minute) {
    if (isNaN(minute)) {
      //console.log(minute);
      this.setState(prevState => ({
        restMinute: 5,
        restDuration: 5 * 60 + prevState.restSeconds,
      }));
    } else {
      this.setState(prevState => ({
        restMinute: minute,
        restDuration: minute * 60 + prevState.restSeconds,
      }));
    }
    if (this.state.workFlag === false) {
      this.resetTimer();
    }
  }
  setRestSeconds(seconds) {
    if (isNaN(seconds)) {
      //console.log(seconds);
      this.setState(prevState => ({
        restseconds: 0,
        restDuration: prevState.restMinute * 60,
      }));
    } else {
      this.setState(prevState => ({
        restSeconds: seconds,
        restDuration: prevState.restMinute * 60 + seconds,
      }));
    }
    if (this.state.workFlag === false) {
      this.resetTimer();
    }
  }
  switchTimer() {
    console.log('switchTimer!');
    this.setState(prevState => ({
      timer: !prevState.timer,
    }));
  }


  _cacheResourcesAsync = async() => {

    const images = [
      require('./assets/pause.png'),
      require('./assets/paused.png'),
      require('./assets/play.png'),
      require('./assets/restFor.png'),
      require('./assets/resting.png'),
      require('./assets/skipBreak.png'),
      require('./assets/skipWork.png'),
      require('./assets/workFor.png'),
      require('./assets/working.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }



    if (this.state.pause === true) {
      this.status = 'pausing';
    } else if (this.state.workFlag === true) {
      this.status = 'working';
    } else {
      this.status = 'resting';
    }

    if (this.state.workFlag === true) {
      this.skipStatus = 'working';
    } else {
      this.skipStatus = 'resting';
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusSign status={this.status} />
        
        <View style={styles.timerRow}>
          <TouchableOpacity
            style={styles.sliderBtn}
            onPress={() => this.switchTimer()}>
            <Feather name={'git-commit'} size={40} color="black" />
          </TouchableOpacity>

          <TimerSlider
            currentTime={this.state.currentTime}
            workDuration={this.state.workDuration}
            restDuration={this.state.restDuration}
            status={this.state.timer}
            workFlag={this.state.workFlag}
          />

          <TouchableOpacity style={styles.resetBtn} onPress={this.resetTimer}>
            <Feather name={'rotate-cw'} size={40} color="black" />
          </TouchableOpacity>
        </View>

        <PauseBtn status={this.status} pauseTimer={this.pauseTimer} />

        <SkipBtn
          skipStatus={this.skipStatus}
          switchMode={() => this.switchMode()}
        />

        <SetWorkTime
          workMinute={this.state.workMinute}
          workSeconds={this.state.workSeconds}
          setWorkMinute={minute => this.setWorkMinute(parseInt(minute))}
          setWorkSeconds={seconds => this.setWorkSeconds(parseInt(seconds))}
        />
        <SetRestTime
          restMinute={this.state.restMinute}
          restSeconds={this.state.restSeconds}
          setRestMinute={minute => this.setRestMinute(parseInt(minute))}
          setRestSeconds={seconds => this.setRestSeconds(parseInt(seconds))}
        />
        <View style={{ height: 60 }} />
        <KeepAwake />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
