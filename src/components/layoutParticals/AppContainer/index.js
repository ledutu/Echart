/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { ApplicationStyles, Colors, Metrics } from '../../../themes';
import { Appbar, Badge } from 'react-native-paper';
import { Btn } from '../../buttons';

class AppContainer extends Component {

    render() {
        const {
            children,
            title,
            disabledScroll,
            style,
            hideHeader,
            onBackClick,
            onNotificationClick,
            onAddClick,
            bgHeaderColor,
            onEditClick,
            onDeleteClick,
            onConfirmClick,
            confirmTitle,
            confirmDisabled,
            onFilterClick,
            onOrderClick,
            onMenuClick,
            onCartClick,
            badge,
            onPauseClick,
            pauseTitle,
            onSellClick,
            refreshControl,
            onLevelUpClick,
            onAllBillClick,
            onLanguageClick
        } = this.props;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <SafeAreaView style={[styles.appContainer, style]}>
                    {!hideHeader && <Appbar.Header style={{ backgroundColor: bgHeaderColor }}>
                        {onBackClick && <Appbar.BackAction onPress={onBackClick} />}
                        {onNotificationClick && <Appbar.Action icon='bell' onPress={onNotificationClick} />}
                        {onMenuClick && <Appbar.Action icon='menu' onPress={onMenuClick} />}
                        {onLanguageClick && <Appbar.Action icon='earth' onPress={onLanguageClick} />}
                        <Appbar.Content title={title} style={styles.flexCenterMid} />
                        {onOrderClick && <Appbar.Action icon="artstation" onPress={onOrderClick} />}
                        {onAddClick && <Appbar.Action icon="plus" onPress={onAddClick} />}
                        {onEditClick && <Appbar.Action icon='pencil' onPress={onEditClick} />}
                        {onDeleteClick && <Appbar.Action icon='delete' onPress={onDeleteClick} />}
                        {onFilterClick && <Appbar.Action icon='filter' onPress={onFilterClick} />}
                        {onCartClick && <Appbar.Action icon='cart' onPress={onCartClick} />}
                        {onCartClick && badge && <Badge style={styles.text} size={18}>{badge}</Badge>}
                        {onSellClick && <Appbar.Action icon='food' onPress={onSellClick} />}
                        {onLevelUpClick && <Appbar.Action icon='arrow-up' onPress={onLevelUpClick} />}
                        {onAllBillClick && <Appbar.Action icon='newspaper' onPress={onAllBillClick} />}
                    </Appbar.Header>}
                    <View style={{ flex: 1 }}>{disabledScroll ? children : <ScrollView refreshControl={refreshControl} contentContainerStyle={{ flexGrow: 1 }}>
                        {children}
                    </ScrollView>}</View>
                    {onConfirmClick && !onPauseClick && <Btn
                        onPress={onConfirmClick}
                        square
                        backgroundColor={confirmDisabled && Colors.grey300}
                        disabled={confirmDisabled}
                    >{confirmTitle}</Btn>}

                    {onConfirmClick && onPauseClick && <View style={styles.flexRowMid}>
                        <Btn
                            onPress={onConfirmClick}
                            square
                            backgroundColor={confirmDisabled && Colors.grey300}
                            disabled={confirmDisabled}
                            style={{ width: Metrics.width / 2 }}
                        >{confirmTitle}</Btn>
                        <Btn
                            onPress={onPauseClick}
                            square
                            backgroundColor={Colors.waiting}
                            style={{ width: Metrics.width / 2 }}
                        >{pauseTitle}</Btn>
                    </View>}


                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    ...ApplicationStyles,
    container: {
        ...ApplicationStyles.appContainer,
        backgroundColor: Colors.main
    },
    text: {
        position: 'absolute',
        right: Metrics.width / 50,
        top: Metrics.width / 50,
        backgroundColor: Colors.waiting
    }
});

AppContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    disabledScroll: PropTypes.bool,
    hideHeader: PropTypes.bool,
    onBackClick: PropTypes.func,
    onNotificationClick: PropTypes.func,
    onAddClick: PropTypes.func,
    bgHeaderColor: PropTypes.string,
    onEditClick: PropTypes.func,
    confirmTitle: PropTypes.string,
    confirmDisabled: PropTypes.bool,
    badge: PropTypes.string,
    onCartClick: PropTypes.func,
    onPauseClick: PropTypes.func,
    pauseClick: PropTypes.string,
    refreshControl: PropTypes.node,
    // onLevelUpClick: PropTypes.func,
};

AppContainer.defaultProps = {
    bgHeaderColor: Colors.main,
    confirmTitle: 'Confirm',
    pauseTitle: 'Pause'
};

export { AppContainer };