import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface FieldSource {
  value: string;
  source: string;
  confidence: number;
  documentId: string | null;
}

interface MultiSourceFieldProps {
  fieldName: string;
  label: string;
  value: string;
  sources: FieldSource[];
  isSelected: boolean;
  onSelect: () => void;
  onShowConflictModal: () => void;
}

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

// Helper function to check if field has conflicts
const hasConflicts = (sources: FieldSource[]) => {
  if (!sources || sources.length <= 1) return false;
  
  // Check if values are different
  const firstValue = sources[0].value;
  return sources.some(s => s.value !== firstValue);
};

const MultiSourceField: React.FC<MultiSourceFieldProps> = ({
  fieldName,
  label,
  value,
  sources,
  isSelected,
  onSelect,
  onShowConflictModal
}) => {
  const hasFieldConflicts = hasConflicts(sources);
  const primarySource = sources && sources.length > 0 ? sources[0] : null;
  
  return (
    <div className={`${hasFieldConflicts ? "bg-yellow-50" : ""} rounded-lg p-4`}>
      <div className="flex items-center space-x-2">
        {hasFieldConflicts ? (
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
        ) : (
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        )}
        <span className="uppercase text-xs font-medium text-gray-500">{label}</span>
      </div>
      <div className="relative mt-2" onClick={onSelect}>
        <input
          type="text"
          value={value}
          readOnly
          className={`w-full p-2 pr-10 border ${isSelected ? "border-blue-500 ring-2 ring-blue-100" : hasFieldConflicts ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {hasFieldConflicts && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowConflictModal();
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <DocumentDuplicateIcon className="h-4 w-4 text-yellow-500" />
            </button>
          )}
          {primarySource && renderSourceIndicator(primarySource.source)}
          {primarySource && (
            <span className={`text-xs font-medium ${primarySource.confidence >= 90 ? "text-green-500" : primarySource.confidence >= 75 ? "text-yellow-500" : "text-red-500"}`}>
              {primarySource.confidence}%
            </span>
          )}
        </div>
      </div>
      {hasFieldConflicts && (
        <p className="text-xs text-yellow-600 mt-1 flex items-center">
          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
          Different values from multiple sources
        </p>
      )}
    </div>
  );
};

export default MultiSourceField;
