
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

function App() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('28');
  const [weight, setWeight] = useState('72');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState(3);
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (!ageNum || !weightNum || !heightNum) {
      setResult(null);
      return;
    }

    const bmr =
      gender === 'male'
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9];
    const maintenance = bmr * activityFactors[activity - 1];

    let target = maintenance;
    if (goal === 'lose') target = maintenance * 0.85;
    if (goal === 'gain') target = maintenance * 1.1;

    const carbs = Math.round((target * 0.5) / 4);
    const protein = Math.round((target * 0.3) / 4);
    const fat = Math.round((target * 0.2) / 9);

    setResult({
      target: Math.round(target),
      macros: { carbs, protein, fat },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>
          Calorie Calculator
        </Text>
        <Text style={{ color: '#555', marginBottom: 24, textAlign: 'center' }}>
          Calculate your daily calories for maintenance, cutting, or bulking.
        </Text>

        <Text style={label}>Sex</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <TouchableOpacity style={[optionBtn, gender === 'male' && optionBtnActive]} onPress={() => setGender('male')}>
            <Text style={[optionText, gender === 'male' && optionTextActive]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[optionBtn, gender === 'female' && optionBtnActive]} onPress={() => setGender('female')}>
            <Text style={[optionText, gender === 'female' && optionTextActive]}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={label}>Age (years)</Text>
        <TextInput style={inputStyle} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="28" />

        <Text style={label}>Weight (kg)</Text>
        <TextInput style={inputStyle} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="72" />

        <Text style={label}>Height (cm)</Text>
        <TextInput style={inputStyle} value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="175" />

        <Text style={label}>Activity level</Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <TouchableOpacity key={lvl} style={[activityBtn, activity === lvl && activityBtnActive]} onPress={() => setActivity(lvl)}>
              <Text style={[activityText, activity === lvl && activityTextActive]}>
                {lvl === 1 && 'Sedentary'}
                {lvl === 2 && 'Light'}
                {lvl === 3 && 'Moderate'}
                {lvl === 4 && 'High'}
                {lvl === 5 && 'Very high'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={label}>Goal</Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          <TouchableOpacity style={[goalBtn, goal === 'maintain' && goalBtnActive]} onPress={() => setGoal('maintain')}>
            <Text style={[goalText, goal === 'maintain' && goalTextActive]}>Maintain</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[goalBtn, goal === 'lose' && goalBtnActive]} onPress={() => setGoal('lose')}>
            <Text style={[goalText, goal === 'lose' && goalTextActive]}>Lose fat (-15%)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[goalBtn, goal === 'gain' && goalBtnActive]} onPress={() => setGoal('gain')}>
            <Text style={[goalText, goal === 'gain' && goalTextActive]}>Build muscle (+10%)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={calcBtnStyle} onPress={calculate}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Calculate</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          {result ? (
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>{result.target} kcal/day</Text>
              <Text style={{ marginTop: 8, color: '#444' }}>Carbs: {result.macros.carbs} g</Text>
              <Text style={{ color: '#444' }}>Protein: {result.macros.protein} g</Text>
              <Text style={{ color: '#444' }}>Fat: {result.macros.fat} g</Text>
            </View>
          ) : (
            <Text style={{ color: '#888' }}>Complete the form and tap Calculate.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const label = {
  fontWeight: 'bold',
  marginBottom: 6,
  color: '#222',
};

const inputStyle = {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: 16,
  color: '#222',
  marginBottom: 12,
  borderWidth: 1.5,
  borderColor: '#e5e7eb',
};

const optionBtn = {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 12,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#db7c36',
};

const optionBtnActive = {
  backgroundColor: '#db7c36',
};

const optionText = {
  color: '#db7c36',
  fontWeight: 'bold',
};

const optionTextActive = {
  color: '#fff',
};

const activityBtn = {
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 12,
  borderWidth: 1,
  borderColor: '#f3e9da',
};

const activityBtnActive = {
  backgroundColor: '#fbe9d6',
  borderColor: '#db7c36',
};

const activityText = {
  color: '#db7c36',
  fontWeight: 'bold',
};

const activityTextActive = {
  color: '#db7c36',
  fontWeight: 'bold',
};

const goalBtn = {
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 12,
  borderWidth: 1,
  borderColor: '#f3e9da',
};

const goalBtnActive = {
  backgroundColor: '#fbe9d6',
  borderColor: '#db7c36',
};

const goalText = {
  color: '#db7c36',
  fontWeight: 'bold',
};

const goalTextActive = {
  color: '#db7c36',
  fontWeight: 'bold',
};

const calcBtnStyle = {
  backgroundColor: '#db7c36',
  borderRadius: 8,
  padding: 16,
  alignItems: 'center',
  marginTop: 8,
  marginBottom: 0,
};
