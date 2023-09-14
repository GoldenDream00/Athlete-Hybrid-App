import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const PlottingView = () => {
    return (
        <View style = {styles.viewStyle}>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        height: 300,
        width: 400,
        backgroundColor: '#696969',
        marginTop: 20,
        alignItems: 'center',
    },
    textStyle: {
        color: '#8ecfff',
    }

});

export default PlottingView;