/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../themes';
import { Text } from '../Text';
import PropTypes from 'prop-types'

export const TextField = (props) => {
    const { style, isRounded, onPress, value, icon, inputStyle } = props
    return (
        <TouchableOpacity style={[
            styles.borderBottom,
            style,
            isRounded && styles.border,
            styles.flexRowBetweenMid,
        ]}
            onPress={onPress}
            activeOpacity={onPress ? 0.8 : 1}
        >
            {icon}
            <TextInput
                {...props}
                style={[styles.textInputView, inputStyle]}
                value={value}
            />
        </TouchableOpacity>
    );
};

TextField.propTypes = {
    isRounded: PropTypes.bool,
    onSearchClick: PropTypes.func,
    onUnitClick: PropTypes.func,
    unit: PropTypes.string,
    icon: PropTypes.node,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    ...ApplicationStyles,
    textInputView: {
        height: Metrics.textInput,
        flex: 1,
    },
    border: {
        ...ApplicationStyles.border,
        borderRadius: Metrics.radiusExtra,
        paddingHorizontal: Metrics.paddingContent,
    },
    unitText: {
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
});
