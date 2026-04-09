
import { SafeAreaView, StatusBar, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

function App() {
  // Responsive layout removed (no Dimensions)

  // Data for macros chart (example)

  // Data for calories pie chart

  // ...aquí van tus hooks y lógica de estado...

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ padding: 24, minHeight: '100vh', justifyContent: 'flex-start' }}
      >
        {/* ...todo el JSX anterior aquí... */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;


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
