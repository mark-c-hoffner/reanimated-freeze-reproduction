import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import {runOnJS, runOnUI} from 'react-native-reanimated';

export default function App() {
  const [succeedsResult, setSucceedsResult] = useState('Press to find out.');
  const [failsResult, setFailsResult] = useState('Give it a try!');

  const setResultText = (s, r) => {
    if (s.localeCompare('succeeds') === 0) {
      setSucceedsResult(r);
    } else {
      setFailsResult(r);
    }
  };

  const anArray = [];

  const aFunction = (s) => {
    try {
      anArray.push(s);
      setResultText(s, 'success!');
    } catch (err) {
      console.error(err);
      setResultText(s, 'failure...');
    }
  };

  const anObject = {
    anArray,
    aFunction,
  };

  const aSucceedingWorklet = () => {
    'worklet';
    runOnJS(aFunction)('succeeds');
  };

  const aSucceedingJSFunction = () => {
    runOnUI(aSucceedingWorklet)();
  };

  const aFailingWorklet = () => {
    'worklet';
    runOnJS(anObject.aFunction)('fails');
  };

  const aFailingJSFunction = () => {
    runOnUI(aFailingWorklet)();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingOne}>reanimated - freeze test</Text>
      <Button onPress={aSucceedingJSFunction} title={'start "it succeeds" test'} />
      <Text style={styles.headingTwo}>"It Succeeds" Result:</Text>
      <Text style={styles.headingThree}>{succeedsResult}</Text>
      <Button onPress={aFailingJSFunction} title={'start "it fails" test'} />
      <Text style={styles.headingTwo}>"It Fails" Result:</Text>
      <Text style={styles.headingThree}>{failsResult}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '10%',
  },
  headingOne: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: '20%',
  },
  headingTwo: {
    fontSize: 20,
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  headingThree: {
    fontSize: 22,
    paddingBottom: '20%',
  },
});
