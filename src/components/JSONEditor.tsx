import React, { useState } from "react";

interface JSONEditorProps {
  jsonValue: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ jsonValue, onChange, error }) => {
  const [copyStatus, setCopyStatus] = useState<string>("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonValue);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000); // Reset message after 2 seconds
    } catch (err) {
      setCopyStatus("Failed to copy.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">JSON Editor</h2>
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Copy JSON
        </button>
      </div>
      <textarea
        value={jsonValue}
        onChange={handleChange}
        className="w-full h-5/6 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter JSON Schema"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {copyStatus && <p className="text-green-500 text-sm mt-2">{copyStatus}</p>}
    </div>
  );
};

export default JSONEditor;
