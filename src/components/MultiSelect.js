import React, {Component} from 'react';
import {View} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

const fruits = ['Apples', 'Oranges', 'Pears'];
// --- OR ---
// const fruits = [
//   { label: 'MultiSelectles', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

class MultiSelect extends Component {
  state = {selectedFruits: []};

  onSelectionsChange = selectedFruits => {
    // selectedFruits is array of { label, value }
    console.log('Other js');
    console.log('Other', selectedFruits);
    this.setState({selectedFruits});
  };

  render() {
    return (
      <View>
        <SelectMultiple
          items={fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange}
        />
      </View>
    );
  }
}
export default MultiSelect;
