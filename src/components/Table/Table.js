import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ApplicationStyles, Colors } from '../../themes';
import { Text } from '../Text';

export const Table = ({ data, style }) => {
    return (
        <View style={style}>
            <View style={styles.flexRowBetweenMid}>
                <Text>COINS</Text>
                <Text>LIVE</Text>
                <Text>ORDER</Text>
                <Text>AMOUNT TIME</Text>
            </View>
            <ScrollView style={styles.flexRowBetweenMid}>
                <Text>DATA1</Text>
                <Text>DATA2</Text>
                <Text>DATA3</Text>
                <Text>DATA4</Text>
            </ScrollView>
        </View>
    )
};

Table.propTypes = {
    data: PropTypes.array,
};

const styles = StyleSheet.create({
    ...ApplicationStyles,
})



