import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {RadioButton} from 'react-native-paper';
import SelectMultiple from 'react-native-select-multiple';

const RegisterUser = ({navigation}) => {
  const [block, setBlock] = React.useState('A');
  const [flatNumber, setFlatNumber] = React.useState(0);
  const [playerName, setPlayerName] = React.useState('');
  const [playerAge, setPlayerAge] = React.useState(0);
  const [playerGender, setPlayerGender] = React.useState('Male');
  const [playerGames, setPlayerGames] = useState([]);

  const gamesList = [
    'Table Tennis',
    'Chess',
    'Tug of War',
    'Carrom',
    'Badminton',
  ];

  const showError = txt => {
    console.log(txt);
  };

  const onSelectionsChange = playerGames => {
    // selectedFruits is array of { label, value }
    setPlayerGames(playerGames);
  };

  const formSubmit = () => {
    // check form validations and navigate

    if (!firstName) {
      return showError('Enter First Name');
    }
    if (!lastName) {
      return showError('Enter Last Name');
    }
    if (!dob) {
      return showError('Select DOB');
    }
    if (!gender) {
      return showError('Select Gender');
    }
    if (!state) {
      return showError('Select State');
    }
    if (!city) {
      return showError('Select City');
    }
    if (!appKnow) {
      return showError('Select APP KNOW');
    }

    // navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView>
        <View style={{marginLeft: 15, marginTop: 20}}>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#2e3e7e',
                marginBottom: 5,
              }}>
              {' '}
              Welcome{' '}
            </Text>
            <Text style={{fontSize: 16, color: '#7f7f7f'}}>
              {' '}
              Fill the details to register.{' '}
            </Text>
          </View>

          {/* Radio Button */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}> Select Block Name </Text>
            <RadioButton.Group
              onValueChange={newValue => setBlock(newValue)}
              value={block}>
              <View style={styles.radioButton}>
                <RadioButton value="A" color="#2e3e7e" />
                <Text style={styles.radioText}>A</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton value="B" color="#2e3e7e" />
                <Text style={styles.radioText}>B</Text>
              </View>
            </RadioButton.Group>
          </View>

          {/* Flat Number */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}> Flat Number </Text>
            <TextInput
              editable={true}
              keyboardType={'numeric'}
              style={styles.textInputBox}
              placeholder="Enter Only Flat Number (Eg. 201)"
              onChangeText={text => setFlatNumber(text)}
              // value={flatNumber}
            />
          </View>

          {/* Name */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}> Player Name </Text>
            <TextInput
              editable={true}
              style={styles.textInputBox}
              placeholder="Player Name"
              onChangeText={text => setPlayerName(text)}
              value={playerName}
            />
          </View>
          {/* Age */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}> Player Age </Text>
            <TextInput
              editable={true}
              keyboardType={'numeric'}
              style={styles.textInputBox}
              placeholder="Age"
              onChangeText={text => setPlayerAge(text)}
            />
          </View>
          {/* Gender */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}> Player Gender </Text>
            <RadioButton.Group
              onValueChange={newValue => setPlayerGender(newValue)}
              value={playerGender}>
              <View style={styles.radioButton}>
                <RadioButton value="Male" color="#2e3e7e" />
                <Text style={styles.radioText}>Male</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton value="Female" color="#2e3e7e" />
                <Text style={styles.radioText}>Female</Text>
              </View>
            </RadioButton.Group>
          </View>

          {/* Games */}
          <View style={{marginTop: 20}}>
            <Text style={styles.fieldLabel}>
              {' '}
              Select Games (you can select mutiple games)
            </Text>
            <SelectMultiple
              items={gamesList}
              selectedItems={playerGames}
              onSelectionsChange={onSelectionsChange}
            />
          </View>

          <View
            style={{
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginLeft: -20,
            }}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: '#fff', borderColor: '#2e3e7e'},
              ]}
              onPress={() => alert('clearForm')}>
              <Text style={[styles.buttonText, {color: '#2e3e7e'}]}>
                Clear Form
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert('formSubmit')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 80}}></View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  radioText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 5,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textInputBox: {
    width: '85%',
    height: 45,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: 'flex-start',
    borderColor: '#7f7f7f',
    paddingTop: 10,
    paddingLeft: 10,
    textAlignVertical: 'center',
    fontSize: 15,
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: '#2e3e7e',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#2e3e7e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default RegisterUser;
