import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { defaultValue, IOcrResult } from 'app/shared/model/ocr-result.model';

const initialState = {
  loading: false,
  errorMessage: null,
  data: defaultValue,
};

const apiUrl = '/submission/ocr-result';

export const submitOcrResult = createAsyncThunk(
  'ocr-result/fetch_payload',
  async (formData: FormData) => {
    return axios.post<IOcrResult>(apiUrl, formData, { timeout: 600000 });
  },
  { serializeError: serializeAxiosError }
);

export type OcrResultState = Readonly<typeof initialState>;

export const OcrResultSlice = createSlice({
  name: 'ocr-result',
  initialState: initialState as OcrResultState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitOcrResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(submitOcrResult.pending, state => {
        state.loading = true;
      })
      .addCase(submitOcrResult.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = OcrResultSlice.actions;

// Reducer
export default OcrResultSlice.reducer;
