import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageUploader = ({navigation}) => {
  const [image, setImage] = useState(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [manualAddress, setManualAddress] = useState('');

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const chooseImage = async () => {
    console.log('----> CAMERA Image\n');
    launchCamera(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('CANCEL EVENT');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        uploadImage(response);
      }
    });
  };

  const chooseFromGallery = async () => {
    console.log('----> GALLERY Image\n');

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('CANCEL EVENT');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    console.log(response.assets[0].fileName);
    setImage(response.assets[0].uri);
    // setImageUploading(true);
    console.log('Image URI : ', response.assets[0].uri);
    // console.log(
    //   'UPLOADING ERROR ============================================= \n',
    // );

    //   const reference = storage().ref(
    //     `/user-request-img/${response.assets[0].fileName}`,
    //   );

    //   const task = reference.putFile(response.assets[0].uri);
    //   task.on('state_changed', taskSnapshot => {
    //     const percentage =
    //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
    //     setUploadStatus(Math.floor(percentage / 10));
    //   });
    //   task.then(async () => {
    //     const url = await reference.getDownloadURL();
    //     setImage(url);
    //     setImageUploading(false);
    //   });
  };

  return (
    <View style={styles.imageUploadContainer}>
      <Text style={styles.imageUploadTitle}> Upload Your Selfie Image </Text>
      <Text style={styles.imageUploadSubtitle}>
        {' '}
        Note : Make sure your face is in center of image.
      </Text>
      <View style={styles.imageUploadOuter}>
        <View style={styles.imageBox}>
          {image ? (
            <>
              <Image source={{uri: image}} style={[styles.imageUploadBox]} />
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 120,
                  borderColor: '#D8000C',
                  borderWidth: 1,
                  marginTop: 15,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => {
                  setImage('');
                  setImageUploading(false);
                  setUploadStatus(null);
                }}>
                <Text
                  style={{
                    color: '#D8000C',
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  Remove Image
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {imageUploading ? (
                <View style={[styles.imageUploadBox, {borderStyle: 'dashed'}]}>
                  <ActivityIndicator size="large" color="#7f7f7f" />
                  <Text style={styles.imageUploadText}>
                    Image Upload in process...
                  </Text>
                  {setTimeout(setImageUploading(false), 2000)}
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.imageUploadBox, {borderStyle: 'dashed'}]}
                    onPress={() =>
                      Alert.alert(
                        '',
                        'Choose Your Method to upload image',
                        [
                          {
                            text: 'Camera',
                            onPress: () => {
                              chooseImage();
                            },
                          },
                          {
                            text: 'Gallery',
                            onPress: () => {
                              chooseFromGallery();
                            },
                          },
                        ],
                        {
                          cancelable: true,
                        },
                      )
                    }>
                    <Icon
                      name={'cloud-upload-outline'}
                      color="#7f7f7f"
                      size={39}
                    />
                    <Text style={styles.imageUploadText}>
                      {' '}
                      Click to Upload{' '}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const SelfiePoint = ({navigation}) => {
  const [addressOption, setAddressOption] = useState('0');

  return (
    <View style={styles.container}>
      <View style={styles.first}></View>

      <View style={styles.main}>
        <ImageUploader navigation={navigation} />

        <View style={[styles.buttonContainer, {borderWidth: 0}]}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              Alert.alert(
                'Confirm',
                'Are you sure you want to exit?',
                [
                  {
                    text: 'No',
                    // onPress: () => {
                    //   chooseImage();
                    // },
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      //   ImageUploader.setImage('');
                      navigation.navigate('HomeScreen');
                    },
                  },
                ],
                {
                  cancelable: true,
                },
              )
            }>
            <Text style={styles.buttonText2}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              alert('Submit');
            }}>
            <Text style={styles.buttonText1}> Save Image </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{height: 50}} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  first: {
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // paddingTop: 10,
    // paddingLeft: 15,
    // borderWidth: 1,
  },
  imageUploadContainer: {
    marginTop: 10,
  },
  imageUploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232323',
  },
  imageUploadSubtitle: {
    fontSize: 15,
    color: '#525252',
    marginTop: 10,
  },
  main: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  imageUploadOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    // borderWidth: 1,
  },
  imageUploadBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7f7f7f',
    height: 270,
    width: Dimensions.get('window').width - 60,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageUploadText: {
    color: '#7f7f7f',
    fontSize: 15,
    marginTop: 5,
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageName: {
    fontSize: 13,
    marginTop: 7,
    color: '#7f7f7f',
  },

  button: {
    width: 150,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#d7fcdf',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 7,
    borderWidth: 0.5,
    borderColor: '#2e3e7e',
    elevation: 3,
  },
  button1: {
    width: 130,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#2e3e7e',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
  },

  button2: {
    width: 140,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: '#2e3e7e',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#2e3e7e',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: -10,
  },
});

export default SelfiePoint;
