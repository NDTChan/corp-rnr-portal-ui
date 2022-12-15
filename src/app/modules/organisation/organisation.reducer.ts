import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultValue, IPayload } from 'app/shared/model/payload.model';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: true,
  errorMessage: null,
  data: defaultValue,
};

const apiUrl = '/payloads';

export const getPayload = createAsyncThunk(
  'organisation/fetch_payload',
  async (rnrToken: string) => {
    const requestUrl = `${apiUrl}/${rnrToken}`;
    return axios.get<IPayload>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type OrganisationState = Readonly<typeof initialState>;

export const OrganisationSlice = createSlice({
  name: 'organisation',
  initialState: initialState as OrganisationState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPayload.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getPayload.pending, state => {
        state.loading = true;
      })
      .addCase(getPayload.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

// Reducer
export default OrganisationSlice.reducer;
