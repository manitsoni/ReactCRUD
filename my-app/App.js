import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from "react-native-webview";

export default function App() {
  return (
     <View>
      <WebView
        source={{ uri: 'https://www.google.com' }}
        style={{ marginTop: 20 }}
      />
      <h1>hello</h1>
      {/* <StatusBar style="auto" />*/}
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
