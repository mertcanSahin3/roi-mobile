import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IDepartment = "General" | "Information Communications Technology" | "Finance" | "Marketing" | "Human Resources"
export type IContact = {
    id: number
    department: IDepartment
    name: string
    phoneNumber: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
}
export type IContactStore = {
    contacts: IContact[]
    nextId: number
}
const initialState: IContactStore = {
    contacts: [],
    nextId: 1,
}
const contactsReducer = createSlice({
    name: 'contactsReducer',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<{ concact: IContact }>) => {
            state.contacts = [...state.contacts, action.payload.concact]
            state.nextId += 1
        },
        deleteContact: (state, action: PayloadAction<{ id: number }>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id)
        },
        updateContact: (state, action: PayloadAction<{ contact: IContact }>) => {
            const newContacts = state.contacts.map(item => {
                if (item.id == action.payload.contact.id) {
                    return action.payload.contact
                }
                return item
            })
            state.contacts = newContacts;
        }
    }
})

export const { addContact, deleteContact, updateContact } = contactsReducer.actions
export default contactsReducer.reducer