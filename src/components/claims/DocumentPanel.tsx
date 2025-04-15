import React from 'react';
import { ArrowUturnLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

interface FieldSource {
  value: string;
  source: string;
  confidence: number;
  documentId: string | null;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  lastEdited: string;
}

interface DocumentPanelProps {
  selectedDocument: string | null;
  selectedField: string | null;
  documents: Document[];
  fieldSources: FieldSource[];
  onClose: () => void;
  onDocumentClick: (docId: string) => void;
}

const DocumentPanel: React.FC<DocumentPanelProps> = ({
  selectedDocument,
  selectedField,
  documents,
  fieldSources,
  onClose,
  onDocumentClick
}) => {
  const selectedDocumentData = documents.find(d => d.id === selectedDocument);
  
  // Get the source that matches this document and field
  const relevantSource = fieldSources?.find(s => s.documentId === selectedDocument);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Document View</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
          Close
        </button>
      </div>
      
      {fieldSources.length > 0 && (
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Field Sources</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            {fieldSources.map((source, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-2 rounded ${source.confidence >= 90 ? "bg-green-50" : source.confidence >= 75 ? "bg-yellow-50" : "bg-red-50"}`}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <input 
                      type="radio" 
                      name="selectedSource" 
                      checked={idx === 0} // First one is selected by default
                      readOnly
                      className="h-4 w-4 text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{source.value}</p>
                    <div className="flex items-center">
                      {renderSourceIndicator(source.source)}
                      <span className="ml-1 text-xs text-gray-500">{source.source}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getConfidenceClass(source.confidence)}`}>
                  {source.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedDocument && (
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {selectedDocumentData?.type} - {selectedDocumentData?.name}
            </h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="mb-4 relative">
                <img src="/images/claim-form-placeholder.png" alt="Document Preview" className="w-full h-auto" />
                
                {/* Highlight extraction area if field is selected */}
                {relevantSource && (
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-12 border-2 border-yellow-500 bg-yellow-100 bg-opacity-50 flex items-center justify-center">
                    <span className="text-xs font-medium text-yellow-800">Extracted: {relevantSource.value}</span>
                  </div>
                )}
              </div>
              
              {relevantSource && (
                <div className="bg-yellow-100 p-2 text-yellow-700 rounded flex items-center">
                  <span className="font-medium mr-2">{selectedField}:</span>
                  <span className="bg-white px-2 py-1 rounded">{relevantSource.value}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {!selectedDocument && documents.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Documents</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">
                Request Documents
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                Filter
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded by
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Edited
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((document) => (
                  <tr 
                    key={document.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onDocumentClick(document.id)}
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-4 w-4 text-blue-500 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">
                          {document.uploadedBy.charAt(0)}
                        </div>
                        <div className="ml-2 text-sm text-gray-900">{document.uploadedBy}</div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {document.lastEdited}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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

export default DocumentPanel;
