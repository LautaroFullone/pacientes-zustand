import { useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function PatientForm() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<DraftPatient>()
    
    const patientActions = usePatientStore(state => state.actions)
    const patients = usePatientStore(state => state.patients)
    const activeID = usePatientStore(state => state.activeID)

    useEffect( () => {
        if(activeID){
            const activePatient = patients.find(existingPatient => existingPatient.id == activeID)!
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeID])

    function savePatient(formData: DraftPatient) {

        if(activeID){
            patientActions.updatePatient(formData) 
            toast.success('Paciente Actualizado')
        } 
        else {
            patientActions.addPatient(formData)  
            toast.warning('Paciente Guardado')
        }  

        reset();
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form onSubmit={handleSubmit(savePatient)}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate>

                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register("name", {
                            required: 'El Nombre del paciente es obligatorio'
                        })}
                    />

                    {errors.name &&
                        <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El nombre del Propietario es obligatorio'
                        })}
                    />

                    {errors.caretaker &&
                        <ErrorMessage>{errors.caretaker.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: 'El Email del Propietario es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no válido",
                            },
                        })}
                    />

                    {errors.email &&
                        <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register("date", {
                            required: 'La Fecha de Alta es obligatoria'
                        })}
                    />

                    {errors.date &&
                        <ErrorMessage>{errors.date.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: 'Los Síntomas del paciente son obligatorios'
                        })}
                    ></textarea>

                    {errors.symptoms &&
                        <ErrorMessage>{errors.symptoms.message}</ErrorMessage>}
                </div>

                <input type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={`${activeID ? 'Actualizar' : 'Guardar'} paciente`}/>
            </form>
        </div>
    )
}