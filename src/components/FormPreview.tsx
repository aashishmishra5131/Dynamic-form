import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormPreviewProps {
  schema: { formTitle: string; formDescription: string; fields: FormField[] };
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Form submission handler
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    setFormData(data);
    setSubmitted(true);
    alert("Form submitted successfully!");
  };

  // Download JSON file
  const handleDownload = () => {
    if (formData) {
      const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "form-submission.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{schema.formTitle}</h2>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{schema.formDescription}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="border rounded p-2 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern
                    ? new RegExp(field.validation.pattern)
                    : undefined,
                })}
                className="border rounded p-2 dark:bg-gray-800 dark:text-white"
              />
            )}
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {field.validation?.message || `${field.label} is required`}
              </span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Show Download Button */}
      {submitted && formData && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
        Download JSON 
        </button>
      )}
    </div>
  );
};

export default FormPreview;
