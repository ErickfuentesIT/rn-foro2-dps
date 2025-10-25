// src/screens/HomeScreen.tsx
import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 20 }}>¡Sesión iniciada! 🎉</Text>
      <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
    </View>
  );
}
