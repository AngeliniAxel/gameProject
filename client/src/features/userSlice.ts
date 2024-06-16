import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_API_ROUTE: string = 'http://localhost:5000';

interface UserInfo {
  name: string;
  lastName: string;
  email: string;
}

interface UserInitialState {
  loading: boolean;
  user: UserInfo | null;
  error: string | null;
  success: boolean;
  isAuth: boolean;
}

export const fetchUserData = createAsyncThunk<UserInfo, void>(
  'user/fetchUserData',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_API_ROUTE}/dashboard`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      const userData: UserInfo = {
        name: parseRes.user_name,
        lastName: parseRes.user_last_name,
        email: parseRes.user_email,
      };

      return userData;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Unexpected error');
      }
    }
  }
);

const initialState: UserInitialState = {
  loading: false,
  user: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.success = true; // registration successful
        state.user = action.payload;
      }
    );
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logoutUser, setIsAuth } = userSlice.actions;
export default userSlice.reducer;
