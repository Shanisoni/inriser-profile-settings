  // =============================================
  // useProfile — Custom Hook
  // Manages all profile data, API calls,
  // validation, and form state.
  // =============================================

  import { useEffect, useState, useCallback } from "react";
  import { Alert } from "react-native";
  import { API_URL } from "../utils/apiUrl";

  // Bio field ki maximum length limit
  export const BIO_MAX_LENGTH = 150;




  export default function useProfile() {
    // ---- State Variables ----

    // Yeh saare states form ke fields ko track karte hain

    const [displayName, setDisplayName] = useState("");       // User ka display name
    const [bio, setBio] = useState("");                       // User ka bio / tagline
    const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Notification on/off
    const [updatedAt, setUpdatedAt] = useState(null);         // Last save ka timestamp (database se aata hai)

    const [loading, setLoading] = useState(true);             // Pehli baar data load ho raha hai ya nahi
    const [saving, setSaving] = useState(false);              // Save button press hone ke baad ka loading state
    const [error, setError] = useState(null);                 // Agar API call fail ho toh error message




    // Validation error - jab user bina name ke save kare
    const [nameError, setNameError] = useState("");



    // Original values - Reset button ke liye
    
    // Jab user Reset press karega toh yeh values wapas aa jayengi
    const [original, setOriginal] = useState({
      displayName: "",
      bio: "",
      notificationsEnabled: false,
    });









    // ---- Data Fetch ----
    // App kholte hi database se profile data load hota hai
    const fetchProfile = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        // Backend API ko call karo - GET /profile
        const response = await fetch(`${API_URL}/profile`);

        // Agar server ne error diya toh throw karo
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Agar data mila toh saare fields mein set karo
        if (data) {
          setDisplayName(data.display_name || "");
          setBio(data.bio || "");
          setNotificationsEnabled(!!data.notifications_enabled);
          setUpdatedAt(data.updated_at || null);

          // Original values bhi save karo (Reset ke liye)
          setOriginal({
            displayName: data.display_name || "",
            bio: data.bio || "",
            notificationsEnabled: !!data.notifications_enabled,
          });
        }
      } catch (err) {
        // Koi bhi error aaye toh user ko dikhao
        setError(err.message);
        console.error("Fetch profile error:", err);
      } finally {
        // Loading band karo chahe success ho ya fail
        setLoading(false);
      }
    }, []);







    // Component mount hote hi data fetch karo
    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);





    // ---- Validation ----


    // Save karne se pehle check karo ki form sahi bhara hai ya nahi
    const validateForm = () => {
      // Display name khali nahi hona chahiye
      if (displayName.trim() === "") {
        setNameError("Display name is required");
        return false; // Validation fail
      }

      // Sab sahi hai toh error hatao
      setNameError("");
      return true; // Validation pass
    };



    // ---- Has Changes Check ----


    // Yeh check karta hai ki user ne koi field change kiya hai ya nahi
    // Agar kuch nahi badla toh Save button disabled rahega
    const hasChanges =
      displayName.trim() !== original.displayName ||
      bio.trim() !== original.bio ||
      notificationsEnabled !== original.notificationsEnabled;



    // ---- Save Handler ----



    // Jab user Save button press kare
    const handleSave = async () => {
      // Pehle validation check karo
      if (!validateForm()) {
        return; // Agar validation fail toh save mat karo
      }

      try {
        setSaving(true);

        // Backend API ko call karo - PUT /profile
        const response = await fetch(`${API_URL}/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            display_name: displayName.trim(),
            bio: bio.trim(),
            notifications_enabled: notificationsEnabled,
          }),
        });

        // Agar server ne error diya
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();

        // Save successful - original values update karo
        setOriginal({
          displayName: displayName.trim(),
          bio: bio.trim(),
          notificationsEnabled,
        });

        // Agar server ne updated_at bheja toh usse use karo, warna current time dikhao
        if (result.updated_at) {
          setUpdatedAt(result.updated_at);
        } else {
          setUpdatedAt(new Date().toISOString());
        }

        // Success message dikhao
        Alert.alert("Success", "Profile updated successfully!");
      } catch (err) {
        // Error message dikhao
        Alert.alert("Error", `Failed to save: ${err.message}`);
      } finally {
        setSaving(false);
      }
    };






    // ---- Reset Handler ----




    // Jab user Reset button press kare - last saved values wapas lao
    const handleReset = () => {
      setDisplayName(original.displayName);
      setBio(original.bio);
      setNotificationsEnabled(original.notificationsEnabled);
      setNameError(""); // Validation error bhi hatao
    };





    // ---- Timestamp Ko Readable Format Mein Convert Karo ----
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return null;
      const date = new Date(timestamp);
      return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };





    // ---- Return Everything the Screen Needs ----



    // Screen component ko sirf yeh values chahiye, internal logic
    // (validateForm, original, etc.) bahar expose nahi karte
    return {
      // Form field values and setters
      displayName,
      setDisplayName,
      bio,
      setBio,
      notificationsEnabled,
      setNotificationsEnabled,

      // UI states
      loading,
      saving,
      error,
      updatedAt,

      // Validation
      nameError,
      setNameError,

      // Computed values
      hasChanges,

      // Actions
      handleSave,
      handleReset,
      fetchProfile,

      // Utilities
      formatTimestamp,
    };
  }
