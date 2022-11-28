import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultValue, IPayload } from 'app/shared/model/payload.model';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { getParamStateWithQueryParams } from 'app/shared/util/entity-utils';

const initialState = {
  loading: true,
  errorMessage: null,
  data: defaultValue,
  rnrToken: null,
};

const apiUrl = 'apis/payloads';
const rnrToken = getParamStateWithQueryParams('token', location.search);

export const getPayload = createAsyncThunk(
  'organisation/fetch_payload',
  async () => {
    const requestUrl = `${apiUrl}/${rnrToken}`;
    return axios.get<IPayload>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type OrganisationState = Readonly<typeof initialState>;

export const OrganisationSlice = createSlice({
  name: 'organisation',
  initialState: initialState as OrganisationState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPayload.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.rnrToken = rnrToken;
      })
      .addCase(getPayload.pending, state => {
        state.loading = true;
        state.rnrToken = null;
      })
      .addCase(getPayload.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
        state.rnrToken = null;
      });
  },
});

export const { reset } = OrganisationSlice.actions;

// Reducer
export default OrganisationSlice.reducer;
