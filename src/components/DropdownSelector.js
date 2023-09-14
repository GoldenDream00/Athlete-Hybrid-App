import React from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
const DropdownSelector = ( {currentValue, onValueChange} ) => {
  return (
    <DropDownPicker
    items={[
        {label: 'Slider', value: 'Slider'},
        {label: 'Text Box', value: 'Text Box'},
    ]}
    defaultNull
    placeholder='Select question type'
    containerStyle={{height: 40, marginHorizontal: 5, marginBottom:10}}
    onChangeItem={item => onValueChange(item.value)}
    />
    /*
    <Picker
        selectedValue={currentValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
      >
        <Picker.Item label="label1" value="Slider" />
        <Picker.Item label="label2" value="Text Box" />
    </Picker>
    */
  )
};

const styles = StyleSheet.create({
  
});

export default DropdownSelector;
