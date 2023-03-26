import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const InputField = (props) => {
  return (
    <View style={styles.textInput}>
      {props.icon}
      {props.inputType == "password" ? (
        <TextInput
          placeholder={props.label}
          keyboardType={props.keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          autoCapitalize="none"
          value={props.value}
          onChangeText={props.onChangeText}
        />
      ) : (
        <TextInput
          placeholder={props.label}
          keyboardType={props.keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          autoCapitalize="none"
          value={props.value}
          onChangeText={props.onChangeText}
        />
      )}
      <TouchableOpacity onPress={props.fieldButtonFunction}>
        <Text style={styles.text}>{props.fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  text: {
    color: "#AD40AF",
    fontWeight: "700",
  },
});

// export default function InputField({
//   label,
//   icon,
//   inputType,
//   keyboardType,
//   fieldButtonLabel,
//   fieldButtonFunction,
//   value,
//   onChangeText,
// }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         borderBottomColor: "#ccc",
//         borderBottomWidth: 1,
//         paddingBottom: 8,
//         marginBottom: 25,
//       }}
//     >
//       {icon}
//       {inputType == "password" ? (
//         <TextInput
//           placeholder={label}
//           keyboardType={keyboardType}
//           style={{ flex: 1, paddingVertical: 0 }}
//           secureTextEntry={true}
//           autoCapitalize="none"
//           value={value}
//           onChangeText={onChangeText}
//         />
//       ) : (
//         <TextInput
//           placeholder={label}
//           keyboardType={keyboardType}
//           style={{ flex: 1, paddingVertical: 0 }}
//           autoCapitalize="none"
//           value={value}
//           onChangeText={onChangeText}
//         />
//       )}
//       <TouchableOpacity onPress={fieldButtonFunction}>
//         <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
//           {fieldButtonLabel}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
