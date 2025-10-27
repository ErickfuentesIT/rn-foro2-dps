// src/screens/LoginScreen.tsx
import { useState } from "react";
import { View, TextInput, Button, Text, ActivityIndicator } from "react-native";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Bienvenido
      </Text>

      <TextInput
        placeholder="Correo"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Button title="Ingresar" onPress={logueo} disabled={loading} />
          <View style={{ height: 8 }} />
          <Button
            title="Continuar con Google"
            onPress={signInGoogle}

            // disabled={!request}
          />
          {error && (
            <p
              style={{
                color: "red",
                backgroundColor: "#ffe6e6",
                border: "1px solid #ff9999",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "0.9rem",
              }}
            >
              ⚠️ {error}
            </p>
          )}
        </>
      )}

      <Text style={{ textAlign: "center", opacity: 0.6, marginTop: 16 }}>
        Autenticación por correo y Google usando Firebase.
      </Text>
    </View>
  );
}
