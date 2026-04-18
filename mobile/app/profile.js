// Inriser - Profile Settings Screen
// This screen ONLY handles rendering the UI.

import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { Colors } from "../src/theme/tokens";
import useProfile, { BIO_MAX_LENGTH } from "../src/hooks/useProfile";
import styles from "../src/styles/profile.styles";

export default function ProfileScreen() {
  // All state and logic comes from the custom hook
  const {
    displayName,
    setDisplayName,
    bio,
    setBio,
    notificationsEnabled,
    setNotificationsEnabled,
    loading,
    saving,
    error,
    updatedAt,
    nameError,
    setNameError,
    hasChanges,
    handleSave,
    handleReset,
    fetchProfile,
    formatTimestamp,
  } = useProfile();

  // ---- Loading Screen ----
  // Jab data load ho raha ho toh spinner dikhao
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading profile…</Text>
      </View>
    );
  }

  // ---- Error Screen ----
  // Agar API call fail ho gayi toh error aur retry button dikhao
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠ {error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchProfile}>
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---- Main Form Screen ----
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Brand / Company Logo */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>inriser</Text>
        <View style={styles.brandDot} />
      </View>
      {/* Screen ka heading */}
      <Text style={styles.heading}>Profile Settings</Text>

      {/* ---- Display Name Field ---- */}
      <View style={styles.field}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          value={displayName}
          onChangeText={(text) => {
            setDisplayName(text);
            // Jaise hi user type kare, error hatao
            if (text.trim() !== "") setNameError("");
          }}
          placeholder="Enter your display name"
          placeholderTextColor={Colors.textMuted}
        />
        {/* Agar validation error hai toh red text mein dikhao */}
        {nameError ? (
          <Text style={styles.validationError}>{nameError}</Text>
        ) : null}
      </View>

      {/* ---- Bio Field with Character Counter ---- */}
      <View style={styles.field}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Bio</Text>
          {/* Character counter - kitne characters type ho chuke hain */}
          <Text
            style={[
              styles.counter,
              bio.length >= BIO_MAX_LENGTH && styles.counterLimit,
            ]}
          >
            {bio.length}/{BIO_MAX_LENGTH}
          </Text>
        </View>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={(text) => {
            // Sirf max limit tak allow karo
            if (text.length <= BIO_MAX_LENGTH) setBio(text);
          }}
          placeholder="Tell us about yourself"
          placeholderTextColor={Colors.textMuted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* ---- Notifications Toggle ---- */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{
            false: Colors.switchTrackOff,
            true: Colors.switchTrackOn,
          }}
          thumbColor={
            notificationsEnabled ? Colors.switchThumbOn : Colors.switchThumbOff
          }
        />
      </View>

      {/* ---- Last Updated Timestamp ---- */}
      {/* Yeh dikhata hai ki profile last baar kab update hua tha */}
      {updatedAt ? (
        <Text style={styles.timestamp}>
          Last updated: {formatTimestamp(updatedAt)}
        </Text>
      ) : null}

      {/* ---- Save & Reset Buttons ---- */}
      <View style={styles.actions}>
        {/* Save Button - disabled jab koi change nahi hua ya saving chal rahi hai */}
        <TouchableOpacity
          style={[
            styles.btn,
            styles.saveBtn,
            (!hasChanges || saving) && styles.saveBtnDisabled,
          ]}
          onPress={handleSave}
          disabled={!hasChanges || saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={Colors.backgroundSurface} />
          ) : (
            <Text style={styles.saveBtnText}>Save</Text>
          )}
        </TouchableOpacity>

        {/* Reset Button - last saved values wapas lata hai */}
        <TouchableOpacity
          style={[styles.btn, styles.resetBtn]}
          onPress={handleReset}
          disabled={saving}
        >
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
