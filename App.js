import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset, AppLoading, Constants, Font } from 'expo';
import App from './src/app';

export default class Feline extends Component {
  state = {
    ready: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      SFBold: require('./assets/fonts/SFBold.ttf'),
      SFRegular: require('./assets/fonts/SFRegular.ttf'),
      SFThin: require('./assets/fonts/SFThin.ttf'),
    });

    await Promise.all([
      Asset.fromModule(require('./assets/images/icon.png')).downloadAsync(),
      Asset.fromModule(require('./assets/images/row_bag.png')).downloadAsync(),
    ]);

    this.setState({ ready: true });
  };

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusBarUnderlay} />
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  statusBarUnderlay: {
    height: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});
