// src/screens/LoginScreen.tsx
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ Reemplaza con tus Client IDs de Google (Google Cloud Console)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "TU_EXPO_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "TU_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "TU_IOS_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "TU_WEB_CLIENT_ID.apps.googleusercontent.com",
    // No pongas useProxy aquí. Se pasa al llamar a promptAsync().
  });

  // Procesa el resultado de Google y loguea en Firebase
  useEffect(() => {
    const run = async () => {
      if (response?.type === "success") {
        try {
          setLoading(true);
          // idToken puede venir en authentication o en params según la versión
          const idToken =
            response.authentication?.idToken ||
            (response as any)?.params?.id_token;

          if (!idToken) throw new Error("No se recibió id_token de Google.");

          const cred = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, cred);
        } catch (e: any) {
          Alert.alert("Error con Google", e?.message ?? String(e));
        } finally {
          setLoading(false);
        }
      }
    };
    run();
  }, [response]);

  const signInEmail = async () => {
    try {
      if (!email.trim() || !pass) {
        Alert.alert(
          "Completa los campos",
          "Correo y contraseña son requeridos."
        );
        return;
      }
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (e: any) {
      Alert.alert("Error al iniciar sesión", e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  const registerEmail = async () => {
    try {
      if (!email.trim() || !pass) {
        Alert.alert(
          "Completa los campos",
          "Correo y contraseña son requeridos."
        );
        return;
      }
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
      Alert.alert("Cuenta creada", "Ya puedes iniciar sesión.");
    } catch (e: any) {
      Alert.alert("Error al registrar", e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    try {
      // En desarrollo con Expo Go usa el proxy:
      await promptAsync({ useProxy: true, showInRecents: true });
    } catch (e: any) {
      Alert.alert("Error Google", e?.message ?? String(e));
    }
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
          <Button title="Ingresar" onPress={signInEmail} />
          <Button title="Crear cuenta" onPress={registerEmail} />
          <View style={{ height: 8 }} />
          <Button
            title="Continuar con Google"
            onPress={signInGoogle}
            disabled={!request}
          />
        </>
      )}

      <Text style={{ textAlign: "center", opacity: 0.6, marginTop: 16 }}>
        Autenticación por correo y Google usando Firebase.
      </Text>
    </View>
  );
}
