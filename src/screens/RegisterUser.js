import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {RadioButton} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import SelectMultiple from 'react-native-select-multiple';
import {gamesList} from '../utils/gamesList';

// Import API
import {createPlayer} from '../admin/PlayerApi';
import {getGames} from '../admin/GamesApi';

const RegisterUser = ({navigation}) => {
  const [playerDetails, setPlayerDetails] = useState({
    block: '',
    flatNumber: '',
    name: '',
    age: '',
    gender: '',
    playerGames: [],
  });

  const [block, setBlock] = React.useState('A');
  const [flatNumber, setFlatNumber] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [playerAge, setPlayerAge] = React.useState('');
  const [playerGender, setPlayerGender] = React.useState('Male');
  const [playerGames, setPlayerGames] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const preloadGames = async () => {
    setIsLoading(true);
    await getGames().then(data => {
      // console.log("API Data : ", data);
      if (data.error) {
        showError('Unable to fetch games');
      } else {
        // console.table(data);
        setGames(data);
        setIsLoading(false);
      }
    });
  };

  const newPlayerAdd = async () => {
    // console.log("newPlayerAdd called");
    //backend request fired
    await createPlayer({
      playerName,
      games: playerGames.map(game => game.value),
      homeNumber: block.toUpperCase() + flatNumber.toString(),
      age: playerAge,
      gender: playerGender,
    }).then(data => {
      if (data.error) {
        showError('Error saving player ');
      } else {
        // showError('Player registered successfully ');
      }
    });
  };

  useEffect(() => {
    preloadGames();
  }, []);

  const onSelectionsChange = playerGames => {
    // selectedFruits is array of { label, value }
    setPlayerGames(playerGames);
  };
  console.log(playerGames);
  const clearForm = forSubmit => {
    // const [clearConf, setClearConf] = useState(false);

    const clearDeatils = () => {
      setPlayerDetails({
        block: '',
        flatNumber: '',
        name: '',
        age: '',
        gender: '',
        players: [],
      });

      setBlock('A');
      setFlatNumber('');
      setPlayerName('');
      setPlayerAge('');
      setPlayerGender('Male');
      setPlayerGames([]);

      return (
        !forSubmit &&
        Snackbar.show({
          text: 'Form Data Cleared.',
          duration: Snackbar.LENGTH_SHORT,
        })
      );
    };

    if (forSubmit) {
      clearDeatils();
    }

    return (
      !forSubmit &&
      Alert.alert(
        'Confirm',
        'Are you sure, you want to clear the form?',
        [
          {text: 'No', onPress: () => console.log('No'), style: 'cancel'},
          {
            text: 'Yes',
            onPress: () => {
              console.log('Yes'), clearDeatils();
            },
          },
        ],
        {cancelable: false},
      )
    );
  };

  const showError = txt => {
    console.log(txt);
    Snackbar.show({
      text: txt,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const formSubmit = async () => {
    // check form validations and navigate
    if (3 > 2) {
      if (!block) {
        return showError('Enter Block Name');
      }
      if (!flatNumber) {
        return showError('Enter Flat Number');
      }
      if (isNaN(flatNumber)) {
        return showError('Flat Number must be between 101 and 604');
      }
      if (flatNumber.length !== 3) {
        return showError('Flat Number must be between 101 and 604');
      }
      if (parseInt(flatNumber) > 604 || parseInt(flatNumber) < 101) {
        return showError('Flat Number must be between 101 and 604');
      }
      if (flatNumber[1] !== '0') {
        return showError('Flat Number not entered correctly');
      }
      if (parseInt(flatNumber[0]) > 6 || parseInt(flatNumber[0]) < 1) {
        return showError('Flat Number not entered correctly');
      }
      if (parseInt(flatNumber[2]) > 4 || parseInt(flatNumber[2]) < 1) {
        return showError('Flat Number not entered correctly');
      }
      if (!playerName) {
        return showError('Enter Player Name');
      }
      if (playerName.length < 3) {
        return showError('Player Name must be at least 3 characters');
      }
      if (!playerAge) {
        return showError('Enter Player Age');
      }
      if (isNaN(playerAge)) {
        return showError('Player Age must be between 1 to 100');
      }
      if (parseInt(playerAge) < 1 || parseInt(playerAge) > 100) {
        return showError('Player Age must be between 1 and 100');
      }
      if (!playerGender) {
        return showError('Enter Block Name');
      }
      if (playerGames.length < 1) {
        return showError('Select at least one Game');
      }
    }

    // console.log('\n--------------------\n');
    // console.log(`Block : ${block}`);
    // console.log(`Flat Number : ${flatNumber}`);
    // console.log(`Name : ${playerName}`);
    // console.log(`Gender : ${playerGender}`);
    // console.log(`Age : ${playerAge}`);
    // console.log(`Games : ${playerGames}`);
    // console.log('\n--------------------\n');

    // save the above data to databases

    await newPlayerAdd();

    setTimeout(() => {
      console.log('Your details are saved.');
      clearForm(true);
      navigation.navigate('RegisterSuccess');
    }, 100);
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
        <View style={{marginLeft: 15, marginTop: 20}}>
          <View style={{marginHorizontal: 8, marginVertical: 12}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#2e3e7e',
                marginBottom: 5,
              }}>
              Welcome{' '}
            </Text>
            <Text style={{fontSize: 16, color: '#7f7f7f'}}>
              Fill the below mentioned details to register a player.{' '}
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
              value={flatNumber}
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
              value={playerAge}
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
              Select Games (you can select multiple games)
            </Text>
            <SelectMultiple
              items={games.map(game => ({
                label: game.name,
                value: game.gameId,
              }))}
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
              onPress={() => clearForm(false)}>
              <Text style={[styles.buttonText, {color: '#2e3e7e'}]}>
                Clear Form
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => formSubmit()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 30}}></View>
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
