import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

export interface UserState {
    userName: string,
    phones: [],
    address: string,
    ektp: string,
    job: string,
    dob: string,
    familyMembers: []
}

const initialState = {
    users: [{
        userName: 'Harris V Sibuea',
        phones: [{ phoneNumber: '081212121212' }],
        address: 'Jakarta Selatan',
        ektp: '121267833939393',
        job: 'Frontend Engineer',
        dob: '12-12-2012',
        familyMembers: [{ name: 'Brad Pitt', dob: '12-12-2012', relationshipStatus: 'brother' }]
    }]
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState(state, action) {
            state.users = [...state.users, action.payload];
        },
    },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;