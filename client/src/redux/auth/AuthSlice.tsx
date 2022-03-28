import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Iinitials {
  user: any | object | string;
  isLoading: boolean;
  isLoginErr: string;
  isRegisterErr: string;
  isSuccessMessage: string;
}

const userCookie: any = localStorage.getItem("user");
const user = userCookie && JSON.parse(userCookie);

const initialAuth: Iinitials = {
  user: user ? user : null,
  isLoading: false,
  isLoginErr: "",
  isRegisterErr: "",
  isSuccessMessage: "",
};

//
//
// register userCookies

const REGESTER_API = "/registeruser";

export const register = createAsyncThunk(
  "auth/register",
  async (user: object, thunkAPI) => {
    try {
      const fetch = await axios.post(REGESTER_API, user).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        const data = res.data;
        return data;
      });
      return thunkAPI.fulfillWithValue(fetch);
    } catch (e: any) {
      const error = e.response.data.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//
// login user
const LOGIN_API = "/login";
export const login = createAsyncThunk(
  "auth/login",
  async (user: object, thunkAPI) => {
    try {
      const fetch = await axios.post(LOGIN_API, user).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        const data = res.data;
        return data;
      });
      return thunkAPI.fulfillWithValue(fetch);
    } catch (e: any) {
      const error = e.response.data.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isLoginErr = "";
      state.isRegisterErr = "";
      state.isSuccessMessage = "";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    //
    //
    // regester user
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.isRegisterErr = String(action.payload);
    });
    //
    //
    // login user
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.isLoginErr = String(action.payload);
    });
    //
    //
    //
  },
});

export const { reset, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
