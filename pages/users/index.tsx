import { selectUserState, setUserState } from '@/store/userSlice';
import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { MinusCircleIcon } from '@heroicons/react/20/solid'
import Router from 'next/router';
import Loader from '@/components/shared/Loader';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const { handleSubmit, register, control, formState: { isValid, errors }, watch } = useForm({
        defaultValues: {
            userName: '',
            phones: [{ phoneNumber: "" }],
            address: '',
            ektp: '',
            job: '',
            dob: '',
            familyMembers: [{ name: "", dob: "", relationshipStatus: "" }, { name: "", dob: "", relationshipStatus: "" }]
        },
        mode: 'onChange'
    });
    const {
        fields: phoneFields,
        append: phoneAppend,
        remove: phoneRemove,
    } = useFieldArray({
        control,
        name: "phones"
    });
    const {
        fields: familyMemberFields,
        append: familyMemberAppend,
        remove: familyMemberRemove,
    } = useFieldArray({
        control,
        name: "familyMembers"
    });

    const handleRegistration = (data: any) => {
        setLoaded(true)
        dispatch(setUserState({ ...data }))
        setTimeout(() => {
            setLoaded(false);
            Router.push('/')
        }, 1000);

    }

    if (loaded) {
        return (
            <Loader />
        );
    }

    return (
        <>
            <Navbar />
            <form className="space-y-6 m-12" onSubmit={handleSubmit(handleRegistration)}>
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-500">Use correct data to your personal Information.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <input
                                        {...register('userName', {
                                            required: true
                                        })}
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.userName?.type === 'required' && <p className='text-red-500 text-sm'>Name is required</p>}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>

                                    {phoneFields.map((each, index) =>
                                    (
                                        <div key={each.id} className="grid grid-cols-5 gap-6">
                                            <div className="col-span-5 sm:col-span-4">
                                                <input
                                                    {...register(`phones.${index}.phoneNumber`, { required: true })}
                                                    type="text"
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phones?.[index]?.phoneNumber?.type === 'required' && <p className='text-red-500 text-sm'>Phone number is required</p>}
                                            </div>
                                            {index > 0 && (
                                                <div className="col-span-5 sm:col-span-1">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 py-1 px-2 mt-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                        onClick={() => phoneRemove(index)}
                                                    >
                                                        <MinusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                                        Remove
                                                    </button>
                                                </div>)}
                                        </div>)
                                    )}

                                    <button
                                        type="button"
                                        className="rounded bg-indigo-50 py-1 px-2 mt-3 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                        onClick={() => {
                                            phoneAppend({ phoneNumber: "" });
                                        }}
                                    >
                                        Add phone number
                                    </button>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register('address', {
                                                required: true
                                            })}
                                            id="address"
                                            name="address"
                                            rows={3}
                                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    {errors.address?.type === 'required' && <p className='text-red-500 text-sm'>Address is required</p>}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ektp" className="block text-sm font-medium leading-6 text-gray-900">
                                        eKTP
                                    </label>
                                    <input
                                        {...register('ektp', {
                                            required: true
                                        })}
                                        type="text"
                                        name="ektp"
                                        id="ektp"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.ektp?.type === 'required' && <p className='text-red-500 text-sm'>e-KTP is required</p>}
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="job" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job
                                    </label>
                                    <input
                                        {...register('job', {
                                            required: true
                                        })}
                                        type="text"
                                        name="job"
                                        id="job"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.job?.type === 'required' && <p className='text-red-500 text-sm'>Job is required</p>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                        Date of Birth
                                    </label>
                                    <input
                                        {...register('dob', {
                                            required: true
                                        })}
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.dob?.type === 'required' && <p className='text-red-500 text-sm'>Date of birth is required</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">{`Family Members (${familyMemberFields.length})`}</h3>
                            <p className="mt-1 text-sm text-gray-500">Please add all family members you have.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-7 gap-6">
                                <div className="col-span-7 sm:col-span-2 lg:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                </div>

                                <div className="col-span-7 sm:col-span-2 lg:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        Date of Birth
                                    </label>
                                </div>

                                <div className="col-span-7 sm:col-span-2 lg:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        Relationship Status
                                    </label>
                                </div>
                            </div>
                            {familyMemberFields.map((each, index) => (
                                <div key={each.id} className="grid grid-cols-7 gap-6">
                                    <div className="col-span-7 sm:col-span-3 lg:col-span-2">
                                        <input
                                            {...register(`familyMembers.${index}.name`, { required: true })}
                                            type="text"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.familyMembers?.[index]?.name?.type === 'required' && <p className='text-red-500 text-sm'>Name is required</p>}
                                    </div>

                                    <div className="col-span-7 sm:col-span-3 lg:col-span-2">
                                        <input
                                            {...register(`familyMembers.${index}.dob`, { required: true })}
                                            type="date"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.familyMembers?.[index]?.dob?.type === 'required' && <p className='text-red-500 text-sm'>Date of birth is required</p>}
                                    </div>

                                    <div className="col-span-7 sm:col-span-3 lg:col-span-2">
                                        <select
                                            {...register(`familyMembers.${index}.relationshipStatus`, { required: true })}
                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option>Parent</option>
                                            <option>Brother</option>
                                            <option>Sister</option>
                                            <option>Child</option>
                                            <option>Spouse</option>
                                        </select>
                                        {errors.familyMembers?.[index]?.relationshipStatus?.type === 'required' && <p className='text-red-500 text-sm'>Relationship status is required</p>}
                                    </div>
                                    <div className="col-span-7 sm:col-span-3 lg:col-span-1">
                                        {index > 1 && (
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 py-1 px-2 mt-3 ml-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                onClick={() => familyMemberRemove(index)}
                                            >
                                                <MinusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                                Remove
                                            </button>)}
                                    </div>
                                </div>)
                            )}
                            <button
                                onClick={() => {
                                    familyMemberAppend({ name: "", dob: "", relationshipStatus: "" });
                                }}
                                type="button"
                                className="rounded bg-indigo-50 py-1 px-2 mt-3 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                            >
                                Add family member
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-4 sm:px-0">
                    <button
                        type="button"
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}