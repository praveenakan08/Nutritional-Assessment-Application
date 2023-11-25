import axios from "axios";
import API_URL from ".";

interface LoginProps {
  email: string | undefined;
  password: string | undefined;
}

interface RegisterUserProps {
  name: string;
  email: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  password: string;
}

interface ViewAssessmentHistoryProps {
  email: string | null;
}

interface GetUserDetailsProps {
  email: string | null;
}

export const login = async ({ email, password }: LoginProps) => {
  try {
    const result = await axios.get(
      API_URL + `/login?email=${email}&password=${password}`
    );

    if (result.data.status === 200) {
      localStorage.setItem("email", email || "");
      return { success: true, message: "Login successful" };
    } else if (result.data.status === 403) {
      return { success: false, message: "Wrong password! Try again" };
    } else {
      return { success: false, message: "Not registered" };
    }
  } catch (error) {
    return { success: false, message: "Not registered" };
  }
};

export const registerUser = async ({
  name,
  email,
  gender,
  age,
  height,
  weight,
  password,
}: RegisterUserProps) => {
  try {
    const result = await axios.post(API_URL + "/register", {
      name,
      email,
      gender,
      age,
      height,
      weight,
      password,
    });

    if (result.data.status === 200) {
      return { success: true, message: result.data.message };
    } else {
      return { success: false, message: result.data.message };
    }
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getUserDetails = async ({ email }: GetUserDetailsProps) => {
  try {
    const response = await axios.get(API_URL + `/viewProfile?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const viewAssessmentHistory = async ({ email }: ViewAssessmentHistoryProps) => {
  try {
    const result = await axios.get(
      API_URL + `/viewAssessmentHistory?email=${email}`
    );
    return result.data;
  } catch (error) {
    return { success: false, message: "Could not fetch lol" };
  }
};
