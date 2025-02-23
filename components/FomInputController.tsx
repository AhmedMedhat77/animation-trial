import { StyleSheet, TextInput, View, TextInputProps, Text, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface IFormController {
  controller: Omit<ControllerProps<any>, "render">; // Generalized for flexibility
  inputProps?: TextInputProps; // Allows additional props for customization
  label?: string;
  error?: string; // Optional error message for validation
}

const FormInputController: React.FC<IFormController> = ({
  controller,
  inputProps,
  label,
  error,
}) => {
  const [isSecure, setIsSecure] = useState(inputProps?.secureTextEntry);

  const toggleSecureTextEntry = useCallback(() => {
    setIsSecure((prev) => !prev);
  }, [inputProps?.secureTextEntry]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        {...controller}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                {...inputProps} // Spread additional props
                onChangeText={onChange} // Controlled input handler
                onBlur={onBlur}
                value={value}
                secureTextEntry={isSecure}
                style={[styles.input, inputProps?.style]} // Allow external styling
              />
              {inputProps?.secureTextEntry && (
                <Pressable onPress={toggleSecureTextEntry}>
                  <Ionicons name={isSecure ? "eye" : "eye-off"} size={24} color={"#777"} />
                </Pressable>
              )}
            </View>
            {/* Show error message if available */}
            {error && <Text style={styles.error}>{error}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default FormInputController;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    flex: 1,
    paddingHorizontal: 8,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
    color: "#777",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
