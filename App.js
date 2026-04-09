import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function App() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState(3);
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);

  function formatCalories(value) {
    return Math.round(value).toLocaleString('en-US');
  }

  function calculate() {
    if (!age || !weight || !height) return;
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);
    let bmr = gender === 'male'
      ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
      : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    // 5 niveles de actividad
    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9];
    const maintenance = bmr * activityFactors[activity - 1];
    let target = maintenance;
    let goalLabel = 'Maintenance';
    if (goal === 'lose') {
      target = maintenance * 0.85;
      goalLabel = 'Lose (-15%)';
    } else if (goal === 'lose10') {
      target = maintenance * 0.9;
      goalLabel = 'Lose 10%';
    } else if (goal === 'gain') {
      target = maintenance * 1.1;
      goalLabel = 'Gain (+10%)';
    }
    setResult({ bmr, maintenance, target, goalLabel });
  }

  function clearForm() {
    setGender('male'); setAge(''); setWeight(''); setHeight(''); setActivity(1); setGoal('lose'); setResult(null);
  }

  // Responsive layout eliminado (no Dimensions)

  // Datos para gráfico de macros (ejemplo)
  const macrosData = result && !result.error ? [
    { name: 'Carbs', value: 216, color: '#4ade80' },
    { name: 'Protein', value: 138, color: '#22d3ee' },
    { name: 'Fat', value: 53, color: '#facc15' },
  ] : [];

  // Datos para gráfico circular de calorías
  const pieData = result && !result.error ? [
    { name: 'Kcal', value: result.calories || result.target, color: '#fb923c' },
    { name: 'Rest', value: ((result.calories || result.target) > 0 ? 2500 - (result.calories || result.target) : 0), color: '#f3f4f6' },
  ] : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 24, minHeight: '100vh', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>Calorie Calculator</Text>
        <Text style={{ color: '#555', marginBottom: 24, textAlign: 'center' }}>Calculate your daily calories for maintenance, cutting, or bulking.</Text>
        {/* Dos columnas: inputs a la izquierda, actividad a la derecha */}
        <View style={{ flexDirection: 'row', gap: 24, marginBottom: 24, maxWidth: 900, alignSelf: 'center', width: '100%' }}>
          {/* Columna izquierda: datos principales */}
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Sex</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: gender === 'male' ? '#db7c36' : '#fff', borderRadius: 8, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#db7c36' }} onPress={() => setGender('male')}><Text style={{ color: gender === 'male' ? '#fff' : '#db7c36', fontWeight: 'bold' }}>Male</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: gender === 'female' ? '#db7c36' : '#fff', borderRadius: 8, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#db7c36' }} onPress={() => setGender('female')}><Text style={{ color: gender === 'female' ? '#fff' : '#db7c36', fontWeight: 'bold' }}>Female</Text></TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Age (years)</Text>
            <TextInput style={[inputStyle, { maxWidth: 120, alignSelf: 'flex-start', width: '100%' }]} placeholder="e.g. 28" placeholderTextColor="#aaa" value={age} onChangeText={setAge} keyboardType="numeric" />
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Weight (kg)</Text>
            <TextInput style={[inputStyle, { maxWidth: 120, alignSelf: 'flex-start', width: '100%' }]} placeholder="e.g. 72.5" placeholderTextColor="#aaa" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Height (cm)</Text>
            <TextInput style={[inputStyle, { maxWidth: 120, alignSelf: 'flex-start', width: '100%' }]} placeholder="e.g. 175" placeholderTextColor="#aaa" value={height} onChangeText={setHeight} keyboardType="numeric" />
            <Text style={{ fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Goal</Text>
            <View style={{ gap: 8, marginBottom: 16 }}>
              <TouchableOpacity style={[goalBtn, goal === 'maintain' && goalBtnActive]} onPress={() => setGoal('maintain')}><Text style={[goalText, goal === 'maintain' && goalTextActive]}>Maintain weight</Text></TouchableOpacity>
              <TouchableOpacity style={[goalBtn, goal === 'lose' && goalBtnActive]} onPress={() => setGoal('lose')}><Text style={[goalText, goal === 'lose' && goalTextActive]}>Lose fat (-15%)</Text></TouchableOpacity>
              <TouchableOpacity style={[goalBtn, goal === 'gain' && goalBtnActive]} onPress={() => setGoal('gain')}><Text style={[goalText, goal === 'gain' && goalTextActive]}>Build muscle (+10%)</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={[calcBtnStyle, { maxWidth: 340, alignSelf: 'center', width: '100%' }]} onPress={calculate}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Calculate</Text></TouchableOpacity>
          </View>
          {/* Columna derecha: selector de actividad */}
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Activity level</Text>
            <View style={{ gap: 8, marginBottom: 8 }}>
              <TouchableOpacity style={[activityBtn, activity === 1 && activityBtnActive]} onPress={() => setActivity(1)}><Text style={[activityText, activity === 1 && activityTextActive]}>Sedentary (little or no exercise)</Text></TouchableOpacity>
              <TouchableOpacity style={[activityBtn, activity === 2 && activityBtnActive]} onPress={() => setActivity(2)}><Text style={[activityText, activity === 2 && activityTextActive]}>Light (1-3 days/week)</Text></TouchableOpacity>
              <TouchableOpacity style={[activityBtn, activity === 3 && activityBtnActive]} onPress={() => setActivity(3)}><Text style={[activityText, activity === 3 && activityTextActive]}>Moderate (3-5 days/week)</Text></TouchableOpacity>
              <TouchableOpacity style={[activityBtn, activity === 4 && activityBtnActive]} onPress={() => setActivity(4)}><Text style={[activityText, activity === 4 && activityTextActive]}>High (6-7 days/week)</Text></TouchableOpacity>
              <TouchableOpacity style={[activityBtn, activity === 5 && activityBtnActive]} onPress={() => setActivity(5)}><Text style={[activityText, activity === 5 && activityTextActive]}>Very high (physical job + training)</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ minHeight: 60, maxWidth: 400, alignSelf: 'center', width: '100%' }}>
          {result ? (
            <View>
              <Text style={{ color: '#222', fontSize: 18, marginBottom: 8 }}>Your result: <Text style={{ fontWeight: 'bold' }}>{Math.round(result.target)} kcal/day</Text></Text>
              {/* Cálculo de macros: 50% carbs, 30% proteína, 20% grasa */}
              {(() => {
                const kcal = result.target;
                const carbs = Math.round((kcal * 0.5) / 4); // 4 kcal/g
                const protein = Math.round((kcal * 0.3) / 4); // 4 kcal/g
                const fat = Math.round((kcal * 0.2) / 9); // 9 kcal/g
                // Distribución por comida
                const meals = [
                  { name: 'Desayuno', percent: 0.25 },
                  { name: 'Almuerzo', percent: 0.30 },
                  { name: 'Once', percent: 0.15 },
                  { name: 'Cena', percent: 0.30 },
                ];
                return (
                  <View>
                    <View style={{ marginTop: 8, backgroundColor: '#fff', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#f3e9da', marginBottom: 12 }}>
                      <Text style={{ color: '#db7c36', fontWeight: 'bold', marginBottom: 4 }}>Recommended daily macros:</Text>
                      <Text style={{ color: '#222', marginBottom: 2 }}>Carbohydrates: <Text style={{ fontWeight: 'bold' }}>{carbs} g</Text></Text>
                      <Text style={{ color: '#222', marginBottom: 2 }}>Protein: <Text style={{ fontWeight: 'bold' }}>{protein} g</Text></Text>
                      <Text style={{ color: '#222' }}>Fat: <Text style={{ fontWeight: 'bold' }}>{fat} g</Text></Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#f3e9da' }}>
                      <Text style={{ color: '#db7c36', fontWeight: 'bold', marginBottom: 8 }}>Distribución por comida:</Text>
                      {meals.map((meal, idx) => {
                        const mealKcal = Math.round(kcal * meal.percent);
                        const mealCarbs = Math.round(carbs * meal.percent);
                        const mealProtein = Math.round(protein * meal.percent);
                        const mealFat = Math.round(fat * meal.percent);
                        return (
                          <View key={meal.name} style={{ marginBottom: idx < meals.length - 1 ? 8 : 0 }}>
                            <Text style={{ color: '#222', fontWeight: 'bold' }}>{meal.name}</Text>
                            <Text style={{ color: '#555', marginLeft: 8 }}>Calorías: {mealKcal} kcal | Carbs: {mealCarbs} g | Proteína: {mealProtein} g | Grasa: {mealFat} g</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })()}
            </View>
          ) : (
            <Text style={{ color: '#888' }}>Complete the form to see your result.</Text>
          )}
        </View>
        {/* Barra naranja decorativa debajo del formulario */}
        <View style={{ height: 80, backgroundColor: '#fb923c', width: '100%', borderRadius: 0, marginTop: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}



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
  fontWeight: 'bold',
  letterSpacing: 0.2,
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
