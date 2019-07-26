import * as React from 'react';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class BackHandlerAndroid extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
        if (props.name) {
          console.log('didFocus', props.name)
        }
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
        if (this.props.name) {
          console.log('willBlur', this.props.name)
        }
      }
    );
  }

  onBackPressed = () => {
    if (this.props.name) {
      console.log('onBackPressed', this.props.name)
    }
    return this.props.onBackPress();
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = BackHandlerAndroid;
