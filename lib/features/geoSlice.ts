import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

/*
{
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Mountain View",
        "lat": 37.40599,
        "lng": -122.078514,
        "postalCode": "94043",
        "timezone": "-07:00",
        "geonameId": 5375481
    },
    "domains": [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn"
    ],
    "as": {
        "asn": 15169,
        "name": "Google LLC",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
}
*/

export interface GeoResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
}

const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchGeo = createAsyncThunk(
  'geo/fetchGeo',
  async (ipAddress: string) => {
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&ipAddress=${ipAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
);

export interface GeoState {
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
  domains: string[];
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
  isp: string;
}

const initialState: GeoState = {
  ip: '192.212.174.101',
  country: 'US',
  region: 'NY',
  city: 'Brooklyn',
  lat: 0,
  lng: 0,
  postalCode: '10001',
  timezone: '-07:00',
  geonameId: 0,
  domains: [],
  asn: 0,
  name: '',
  route: '',
  domain: '',
  type: '',
  isp: 'SpaceX Starlink',
};

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setValueAndId: (state, action: PayloadAction<GeoState>) => {
      state.ip = action.payload.ip;
      state.country = action.payload.country;
      state.region = action.payload.region;
      state.city = action.payload.city;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.postalCode = action.payload.postalCode;
      state.timezone = action.payload.timezone;
      state.geonameId = action.payload.geonameId;
      state.domains = action.payload.domains;
      state.asn = action.payload.asn;
      state.name = action.payload.name;
      state.route = action.payload.route;
      state.domain = action.payload.domain;
      state.type = action.payload.type;
      state.isp = action.payload.isp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGeo.fulfilled, (state, action) => {
      state.ip = action.payload.ip;
      state.country = action.payload.location.country;
      state.region = action.payload.location.region;
      state.city = action.payload.location.city;
      state.lat = action.payload.location.lat;
      state.lng = action.payload.location.lng;
      state.postalCode = action.payload.location.postalCode;
      state.timezone = action.payload.location.timezone;
      state.geonameId = action.payload.location.geonameId;
      state.domains = action.payload.domains;
      state.asn = action.payload.as.asn;
      state.name = action.payload.as.name;
      state.route = action.payload.as.route;
      state.domain = action.payload.as.domain;
      state.type = action.payload.as.type;
      state.isp = action.payload.isp;
    });
  }
});

export const { setValueAndId } = geoSlice.actions;

export const selectIp = (state: RootState) => state.geo.ip;
export const selectCountry = (state: RootState) => state.geo.country;
export const selectRegion = (state: RootState) => state.geo.region;
export const selectCity = (state: RootState) => state.geo.city;
export const selectLat = (state: RootState) => state.geo.lat;
export const selectLng = (state: RootState) => state.geo.lng;
export const selectPostalCode = (state: RootState) => state.geo.postalCode;
export const selectTimezone = (state: RootState) => state.geo.timezone;
export const selectGeonameId = (state: RootState) => state.geo.geonameId;
export const selectDomains = (state: RootState) => state.geo.domains;
export const selectAsn = (state: RootState) => state.geo.asn;
export const selectName = (state: RootState) => state.geo.name;
export const selectRoute = (state: RootState) => state.geo.route;
export const selectDomain = (state: RootState) => state.geo.domain;
export const selectType = (state: RootState) => state.geo.type;
export const selectIsp = (state: RootState) => state.geo.isp;

export default geoSlice.reducer;
