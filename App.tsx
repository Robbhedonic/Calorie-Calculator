import React from 'react';
import { Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function App() {
  // Variables and functions for app logic (you can uncomment and use when adding the rest of the UI)
  // const [gender, setGender] = useState<'male' | 'female'>('male');
  // const [age, setAge] = useState<string>('');
  // const [weight, setWeight] = useState<string>('');
  // const [height, setHeight] = useState<string>('');
  // const [activity, setActivity] = useState<number>(3);
  // const [goal, setGoal] = useState<'maintain' | 'lose' | 'lose10' | 'gain'>('maintain');
  // const [result, setResult] = useState<any>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          minHeight: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#222',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          Calorie Calculator
        </Text>
        <Text style={{ color: '#555', marginBottom: 24, textAlign: 'center' }}>
          Calculate your daily calories for maintenance, cutting, or bulking.
        </Text>
        {/* ...rest of your UI... */}
      </ScrollView>
    </SafeAreaView>
  );
}
