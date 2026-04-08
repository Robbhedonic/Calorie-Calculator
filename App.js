import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ACTIVITY_LEVELS = [
  { label: 'Sedentary (little or no exercise)', value: 1.2 },
  { label: 'Light (1-3 days/week)', value: 1.375 },
  { label: 'Moderate (3-5 days/week)', value: 1.55 },
  { label: 'High (6-7 days/week)', value: 1.725 },
  { label: 'Very high (physical job + training)', value: 1.9 },
];

const GOALS = [
  { label: 'Maintain weight', value: 'maintain' },
  { label: 'Lose fat (-15%)', value: 'cut' },
  { label: 'Build muscle (+10%)', value: 'bulk' },
];

function formatCalories(value) {
  return Math.round(value).toLocaleString('en-US');
}

function formatWeeks(value) {
  return value.toFixed(1);
}

function SelectGroup({ options, selectedValue, onSelect }) {
  return (
    <View style={styles.choiceWrap}>
      {options.map((option) => {
        const active = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={String(option.value)}
            style={[styles.choiceChip, active && styles.choiceChipActive]}
            onPress={() => onSelect(option.value)}
          >
            <Text style={[styles.choiceText, active && styles.choiceTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fatToLoseKg, setFatToLoseKg] = useState('4');
  const [activity, setActivity] = useState(1.2);
  const [goal, setGoal] = useState('maintain');
  const [submitted, setSubmitted] = useState(false);

  const calculation = useMemo(() => {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const fatTargetNum = Number(fatToLoseKg);

    if (!submitted || !ageNum || !weightNum || !heightNum) {
      return null;
    }

    const bmr =
      sex === 'male'
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

    const maintenance = bmr * activity;
    let target = maintenance;
    let goalLabel = 'Maintenance';

    if (goal === 'cut') {
      target = maintenance * 0.85;
      goalLabel = 'Cut (-15%)';
    }

    if (goal === 'bulk') {
      target = maintenance * 1.1;
      goalLabel = 'Bulk (+10%)';
    }

    const deficitPerDay = Math.max(maintenance - target, 0);
    const weeklyFatLossKg = (deficitPerDay * 7) / 7700;
    const weeksToGoal =
      goal === 'cut' && fatTargetNum > 0 && weeklyFatLossKg > 0
        ? fatTargetNum / weeklyFatLossKg
        : null;

    let cardioRecommendation = '2 sessions/week, 20-30 min each (zone 2).';
    if (goal === 'cut') {
      if (activity <= 1.375) {
        cardioRecommendation = '4-5 sessions/week, 25-35 min each (zone 2).';
      } else if (activity <= 1.55) {
        cardioRecommendation = '3-4 sessions/week, 20-30 min each (zone 2).';
      } else {
        cardioRecommendation = '2-3 sessions/week, 20-25 min each (zone 2).';
      }
    }

    let strengthPlan =
      '3 full-body sessions/week. Example: Mon, Wed, Fri (with rest days between).';
    if (goal === 'cut') {
      strengthPlan = '3-4 sessions/week. Example: Mon Upper, Tue Lower, Thu Upper, Fri Lower.';
    }
    if (goal === 'bulk') {
      strengthPlan = '4-5 sessions/week. Example: Push, Pull, Legs, rest, Upper, Lower.';
    }

    return {
      bmr,
      maintenance,
      target,
      goalLabel,
      weeksToGoal,
      cardioRecommendation,
      strengthPlan,
      fatTargetNum,
    };
  }, [activity, age, fatToLoseKg, goal, height, sex, submitted, weight]);

  const hasInvalidInput =
    submitted &&
    (!Number(age) ||
      !Number(weight) ||
      !Number(height) ||
      (goal === 'cut' && Number(fatToLoseKg) <= 0));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.title}>Calorie Calculator</Text>
            <Text style={styles.subtitle}>
              Calculate your daily calories for maintenance, cutting, or bulking.
            </Text>

            <Text style={styles.label}>Sex</Text>
            <View style={styles.rowTwo}>
              <TouchableOpacity
                style={[styles.toggle, sex === 'male' && styles.toggleActive]}
                onPress={() => setSex('male')}
              >
                <Text style={[styles.toggleText, sex === 'male' && styles.toggleTextActive]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggle, sex === 'female' && styles.toggleActive]}
                onPress={() => setSex('female')}
              >
                <Text style={[styles.toggleText, sex === 'female' && styles.toggleTextActive]}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Age (years)</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="e.g. 28"
              placeholderTextColor="#9c8e81"
            />

            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder="e.g. 72.5"
              placeholderTextColor="#9c8e81"
            />

            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="e.g. 175"
              placeholderTextColor="#9c8e81"
            />

            {goal === 'cut' && (
              <>
                <Text style={styles.label}>Fat to lose (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={fatToLoseKg}
                  onChangeText={setFatToLoseKg}
                  keyboardType="decimal-pad"
                  placeholder="e.g. 4"
                  placeholderTextColor="#9c8e81"
                />
              </>
            )}

            <Text style={styles.label}>Activity level</Text>
            <SelectGroup
              options={ACTIVITY_LEVELS}
              selectedValue={activity}
              onSelect={setActivity}
            />

            <Text style={styles.label}>Goal</Text>
            <SelectGroup options={GOALS} selectedValue={goal} onSelect={setGoal} />

            <TouchableOpacity style={styles.button} onPress={() => setSubmitted(true)}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            <View style={styles.resultBox}>
              {!submitted && (
                <Text style={styles.resultText}>Complete the form to see your result.</Text>
              )}
              {hasInvalidInput && (
                <Text style={styles.errorText}>
                  Please fill all fields with valid numbers (and a positive fat-loss target).
                </Text>
              )}
              {calculation && (
                <Text style={styles.resultText}>
                  {'Estimated daily result\n'}
                  {`BMR: ${formatCalories(calculation.bmr)} kcal\n`}
                  {`Maintenance: ${formatCalories(calculation.maintenance)} kcal\n`}
                  {`${calculation.goalLabel}: ${formatCalories(calculation.target)} kcal\n\n`}
                  {goal === 'cut' && calculation.weeksToGoal
                    ? `Estimated time to lose ${calculation.fatTargetNum} kg of fat: ${formatWeeks(calculation.weeksToGoal)} weeks\n\n`
                    : ''}
                  {`Cardio recommendation: ${calculation.cardioRecommendation}\n`}
                  {`Strength training schedule: ${calculation.strengthPlan}\n\n`}
                  Note: This is an estimate, not medical advice.
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f3ede7',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fffaf4',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e7d7c8',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2f241f',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 14,
    color: '#5a4b41',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '700',
    color: '#2f241f',
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 8,
  },
  toggle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e7d7c8',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toggleActive: {
    backgroundColor: '#d66f2f',
    borderColor: '#d66f2f',
  },
  toggleText: {
    color: '#2f241f',
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e7d7c8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2f241f',
    backgroundColor: '#fff',
  },
  choiceWrap: {
    gap: 8,
  },
  choiceChip: {
    borderWidth: 1,
    borderColor: '#e7d7c8',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  choiceChipActive: {
    borderColor: '#d66f2f',
    backgroundColor: '#fde7da',
  },
  choiceText: {
    color: '#3a2d26',
    fontSize: 13,
  },
  choiceTextActive: {
    color: '#8c3e16',
    fontWeight: '700',
  },
  button: {
    marginTop: 14,
    backgroundColor: '#d66f2f',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#dcb79f',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    minHeight: 88,
  },
  resultText: {
    color: '#2f241f',
    lineHeight: 22,
  },
  errorText: {
    color: '#af2b1e',
    fontWeight: '700',
    marginBottom: 6,
  },
});
