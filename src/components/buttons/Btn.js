/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Metrics, ApplicationStyles } from '../../themes';
import { Text } from '../Text';

export const Btn = (props) => {

    const {
        children,
        onPress,
        style,
        backgroundColor,
        icon,
        isRounded,
        isBordered,
        color,
        border,
        square
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            {...props}
            style={[
                styles.container,
                { backgroundColor },
                isBordered && { borderRadius: Metrics.radius },
                isRounded && { borderRadius: Metrics.radiusExtra },
                square && { borderRadius: 0 },
                border && styles.border,
                style
            ]}
        >
            {icon}
            <Text style={{ color }} size={'xl'}>{children}</Text>
        </TouchableOpacity>
    );
};

Btn.propTypes = {
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    icon: PropTypes.node,
    isRounded: PropTypes.bool,
    isBordered: PropTypes.bool,
    color: PropTypes.string,
    border: PropTypes.bool,
    square: PropTypes.bool
};

Btn.defaultProps = {
    backgroundColor: Colors.main,
    color: Colors.white,
    isRounded: false,
    isBordered: true,
}

const styles = StyleSheet.create({
    ...ApplicationStyles,
    container: {
        height: Metrics.buttonMedium,
        ...ApplicationStyles.flexCenterMid,
        borderRadius: Metrics.radiusExtra,
        flexDirection: 'row'
    }
});
