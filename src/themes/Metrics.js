import { Dimensions, Platform } from 'react-native';
// import { isIphoneX } from 'react-native-iphone-x-helper'

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
    heightHeader: 48,

    paddingContent: 20,
    heightBottom: 50,
    iconSmall: 30,
    iconTiny: 20,
    iconMedium: 40,

    buttonMedium: 40,
    textInput: 50,
    radiusExtra: 24,
    radius: 8,
    radiusLight: 3,
    borderWidth: .5,

    width: width,
    height: height
};

export default metrics;
