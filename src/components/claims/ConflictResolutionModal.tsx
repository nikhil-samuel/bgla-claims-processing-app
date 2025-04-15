import React, { useState } from 'react';
import { XCircleIcon } from "@heroicons/react/24/outline";

interface FieldSource {
  value: string;
  source: string;
  confidence: number;
  documentId: string | null;
}

interface ConflictResolutionModalProps {
  fieldName: string;
  sources: FieldSource[];
  onClose: () => void;
  onResolve: (selectedSource: FieldSource) => void;
}

const ConflictResolutionModal: React.FC<ConflictResolutionModalProps> = ({
  fieldName,
  sources,
  onClose,
  onResolve
}) => {
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  
  const handleSubmit = () => {
    onResolve(sources[selectedSourceIndex]);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Resolve Field Conflict</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            This field has different values from multiple sources. Please select the correct value:
          </p>
        </div>
        
        <div className="space-y-3 mb-6">
          {sources.map((source, idx) => (
            <div 
              key={idx} 
              className={`flex items-center border ${selectedSourceIndex === idx ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 hover:bg-gray-50 cursor-pointer`}
              onClick={() => setSelectedSourceIndex(idx)}
            >
              <input 
                type="radio" 
                name="conflictResolution" 
                checked={selectedSourceIndex === idx}
                onChange={() => setSelectedSourceIndex(idx)}
                className="h-4 w-4 text-blue-600 mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{source.value}</div>
                <div className="flex items-center text-sm text-gray-500">
                  {renderSourceIndicator(source.source)}
                  <span className="ml-1">{source.source}</span>
                  <span className={`ml-2 text-xs font-medium ${getConfidenceClass(source.confidence)}`}>
                    {source.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
          >
            Apply Resolution
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to render source indicators
const renderSourceIndicator = (source: string) => {
  switch(source) {
    case "API":
      return <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">API</span>;
    case "Database":
      return <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>;
    case "Claim Form":
    case "Invoice":
    case "Medical Report":
      return <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">DOC</span>;
    default:
      return null;
  }
};

// Helper function to get confidence class
const getConfidenceClass = (confidence: number) => {
  if (confidence >= 90) return "text-green-500";
  if (confidence >= 75) return "text-yellow-500";
  return "text-red-500";
};

export default ConflictResolutionModal;
