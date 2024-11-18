import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormSchema } from '../types/schema';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-bold">{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id}>
          <label className="block font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
            />
          ) : field.type === 'select' ? (
            <select {...register(field.id, { required: field.required })} className="w-full p-2 border rounded">
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input type="radio" value={option.value} {...register(field.id, { required: field.required })} />
                <span>{option.label}</span>
              </label>
            ))
          ) : null}
          {errors[field.id] && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default FormGenerator;

