import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabThreeScreen() {
     return (
    <View style={styles.container}>
      <Text style={styles.title}>text in the middle of the screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});