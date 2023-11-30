// export default HelpAndSupport;
import React, {useState} from 'react';

import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const HelpAndSupport = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Use of state

  const [name, setName] = useState(`Jasim`, `React-Native`);

  const [course, setCourse] = useState(`React-Native`);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.viewSectionOne}>
        <Text style={styles.textStyle}>
          {name}, The end is Over for {course}
        </Text>
        <TouchableOpacity
          color="#ffffff"
          style={styles.buttonCustom}
          onPress={() => {
            Linking.openURL(`https://www.youtube.com/`);
          }}>
          <Text>Click Here</Text>
        </TouchableOpacity>

        <TouchableOpacity
          color="#ffffff"
          style={styles.buttonCustom2}
          onPress={() => {
            Linking.openURL(`https://www.linkedin.com/in/rajesh-r-588219119/`);
          }}>
          <Text>Click Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },

  viewSectionOne: {
    flex: 1,

    backgroundColor: `#FFF`,

    alignItems: `center`,

    justifyContent: `center`,
  },

  textStyle: {
    color: `#000`,

    fontSize: 16,

    fontStyle: 'italic',

    textAlign: `center`,
  },

  buttonCustom: {
    backgroundColor: `#f2f22f`,

    color: `#ffffff`,

    padding: 10,

    borderRadius: 10,

    margin: 10,
  },

  buttonCustom2: {
    backgroundColor: `#f2f2`,

    color: `#ffffff`,

    padding: 10,

    borderRadius: 10,

    margin: 10,
  },
});

export default HelpAndSupport;
