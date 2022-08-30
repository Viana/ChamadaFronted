import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../services/authService";
import chamadaService from "../services/chamadaService";

// const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    chamada: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

// Post chamada
export const chamadaRegister = createAsyncThunk(
    "chamada/register",
    async (chamada, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await chamadaService.chamadaRegister(chamada, token)
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)


export const chamadaSlice = createSlice({
    name: "chamada",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(chamadaRegister.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(chamadaRegister.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.chamada = action.payload
            state.message=`Chamada inserida com sucesso!`
        }).addCase(chamadaRegister.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.chamada = {}
        })
    }
})

export const { resetMessage } = chamadaSlice.actions

export default chamadaSlice.reducer