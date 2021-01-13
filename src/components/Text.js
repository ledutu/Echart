import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextNative, StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors } from '../themes';
import { Helpers } from '../utils';

const fontSize = {
    sm: { fontSize: Fonts.size.small, color: Colors.grey300 },
    md: { fontSize: Fonts.size.medium, color: Colors.grey300 },
    lg: { fontSize: Fonts.size.regular },
    xl: { fontSize: Fonts.size.normal },
    xxl: { ...Fonts.style.title }
}

export const Text = (props) => {
    const { size, center, left, right } = props;
    const style = Helpers.style(
        [
            {
                ...styles.text,
                ...fontSize[size],

            },
            center && { textAlign: 'center' },
            left && { textAlign: 'left' },
            right && { textAlign: 'right' }
        ],
        props.style
    );

    return (
        <TextNative {...props} style={style}>
            {props.children}
        </TextNative>
    );
};

Text.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl','xxl']),
    center: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
}

Text.defaultProps = {
    size: 'lg',
}

const styles = StyleSheet.create({
    ...ApplicationStyles,
    text: {
        ...Fonts.style.normal,
        color: Colors.grey,
    },
});