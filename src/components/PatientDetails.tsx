import { toast } from "react-toastify";
import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientItem from "./PatientItem"

interface PatientDetailsProps {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

    const patientActions = usePatientStore(state => state.actions);

    function handleDelete(){
        patientActions.deletePatient(patient.id)
        toast.error('Paciente eliminado')
    }

    return (
        <div className="mx-5 my-10 px-5 py-5 bg-white shadow-md rounded-xl">
            <PatientItem label="Id" data={patient.id} />
            <PatientItem label="Nombre" data={patient.name} />
            <PatientItem label="Propietario" data={patient.caretaker} />
            <PatientItem label="Email" data={patient.email} />
            <PatientItem label="Fecha Alta" data={patient.date.toString()} />
            <PatientItem label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button type="button" onClick={() => patientActions.getPatientByID(patient.id)}
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
                    Editar
                </button>
                <button type="button" onClick={handleDelete}
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">
                    Eliminar
                </button>
            </div>
        </div>
    )
}
