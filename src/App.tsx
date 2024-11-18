import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormGenerator from './components/FormGenerator';
import { FormSchema } from './types/schema';

const App: React.FC = () => {
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify({
    formTitle: "Sample Form",
    formDescription: "This is a dynamically generated form.",
    fields: []
  }, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<FormSchema | null>(null);

  const handleJSONChange = (value: string) => {
    setJsonValue(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError(null);
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <JSONEditor jsonValue={jsonValue} onChange={handleJSONChange} error={error} />
      </div>
      <div className="w-1/2 p-4">
        {schema ? <FormGenerator schema={schema} /> : <p>Enter valid JSON to see the form preview.</p>}
      </div>
    </div>
  );
};

export default App;
