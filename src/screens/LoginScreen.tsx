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

  const logueo = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (!result.ok) throw new Error("Error de autenticacion");
      console.log(result);
    } catch (err) {
      console.error(`Error en autenticacion: ${err.message}`);
      setError(`Correo y/o contraseña incorrecta`);
    } finally {
      setLoading(false);
    }
  };

  const provider = new GoogleAuthProvider();
  const signInGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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
