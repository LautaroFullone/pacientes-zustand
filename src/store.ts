import { create } from "zustand"
import { v4 as uuid } from "uuid"
import { DraftPatient, Patient } from "./types"
import { devtools } from "zustand/middleware"

interface PatientActions {
    addPatient: (data: DraftPatient) => void
    deletePatient: (patientID: Patient['id']) => void
    getPatientByID: (patientID: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

interface PatientState {
    patients: Patient[]
    activeID: Patient['id']
    actions: PatientActions
}

export const usePatientStore = create<PatientState>()(
    devtools((set) => ({
        patients: [],
        activeID: '',
        actions: {
            addPatient: (data) => {
                const newPatient: Patient = {
                    id: uuid(),
                    ...data
                }

                set(state => ({
                    patients: [...state.patients, newPatient]
                }))
            },
            deletePatient: (patientID) => {
                set(state => ({
                    patients: state.patients.filter(existingPatient => existingPatient.id !== patientID)
                }))
            },
            getPatientByID: (patientID) => {
                set({ activeID: patientID })
            },
            updatePatient: (data) => {
                set(state => ({
                    patients: state.patients.map(existingPatient => {
                        if(existingPatient.id === state.activeID)
                            return { id: state.activeID, ...data }
                        return existingPatient
                    }),
                    activeID: ''
                }))
            },
        }
    }))
)




