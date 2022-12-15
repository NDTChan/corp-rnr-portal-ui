import { defaultValue, IOcrFileUpload } from 'app/shared/model/ocr-file-upload.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  uploaded: false,
  loading: false,
  errorMessage: null,
  data: defaultValue,
};

const apiUrl = '/ocr/file-upload';

export const getFieUploadInfo = createAsyncThunk(
  'personal/fetch_payload',
  async (formData: FormData) => {
    return axios.post<IOcrFileUpload>(apiUrl, formData, { timeout: 600000 });
  },
  { serializeError: serializeAxiosError }
);

export type PersonalState = Readonly<typeof initialState>;
export const PersonalSlice = createSlice({
  name: 'personal',
  initialState: initialState as PersonalState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFieUploadInfo.fulfilled, (state, action) => {
        state.uploaded = true;
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getFieUploadInfo.pending, state => {
        state.loading = true;
        state.uploaded = false;
      })
      .addCase(getFieUploadInfo.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.loading = false;
        state.uploaded = false;
      });
  },
});

export default PersonalSlice.reducer;
