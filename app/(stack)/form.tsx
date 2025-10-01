import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import FormInputController from "@/components/FomInputController";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password cannot exceed 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form using React Hook Form</Text>

      <KeyboardAvoidingView
        style={{ width: "100%" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable onPress={Keyboard.dismiss}>
          <FormInputController
            controller={{ name: "username", control }}
            inputProps={{ placeholder: "Username" }}
            label="Username"
            error={errors.username?.message}
          />

          <FormInputController
            controller={{ name: "email", control }}
            inputProps={{ placeholder: "Email", keyboardType: "email-address" }}
            label="Email"
            error={errors.email?.message}
          />

          <FormInputController
            controller={{ name: "password", control }}
            inputProps={{ placeholder: "Password", secureTextEntry: true }}
            label="Password"
            error={errors.password?.message}
          />

          <FormInputController
            controller={{ name: "confirmPassword", control }}
            inputProps={{ placeholder: "Confirm Password", secureTextEntry: true }}
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          />

          <Button title="Submit" onPress={handleSubmit(handleFormSubmit)} />
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginVertical: 12,
    fontWeight: "bold",
  },
});
