import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { defaultValue, IOcrPermission } from 'app/shared/model/ocr-permission.model';

const initialState = {
  loading: true,
  errorMessage: null,
  rnrToken: null,
  data: defaultValue,
};

const apiUrl = '/ocr/permission';

export const getOcrPermission = createAsyncThunk(
  'ocr-permission/fetch_payload',
  async (rnrToken: string) => {
    const requestUrl = `${apiUrl}?rnrToken=${rnrToken}`;
    return axios.get<IOcrPermission>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type OcrPermissionState = Readonly<typeof initialState>;

export const OcrPermissionSlice = createSlice({
  name: 'ocr-permission',
  initialState: initialState as OcrPermissionState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOcrPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getOcrPermission.pending, state => {
        state.loading = true;
      })
      .addCase(getOcrPermission.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = OcrPermissionSlice.actions;

// Reducer
export default OcrPermissionSlice.reducer;
