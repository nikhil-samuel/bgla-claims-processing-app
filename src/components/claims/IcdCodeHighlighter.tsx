"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-context";

interface IcdCodeHighlighterProps {
  documentText: string;
  onCodeSelected?: (code: string, description: string) => void;
}

// Sample ICD-10 codes with descriptions for demo
const sampleIcdCodes = [
  { code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
  { code: "I10", description: "Essential (primary) hypertension" },
  { code: "J45.909", description: "Unspecified asthma, uncomplicated" },
  { code: "M54.5", description: "Low back pain" },
  { code: "K21.9", description: "Gastro-esophageal reflux disease without esophagitis" },
  { code: "F41.9", description: "Anxiety disorder, unspecified" },
  { code: "M17.9", description: "Osteoarthritis of knee, unspecified" },
  { code: "N18.3", description: "Chronic kidney disease, stage 3" },
  { code: "K29.70", description: "Gastritis, unspecified, without bleeding" },
  { code: "M54.16", description: "Radiculopathy, lumbar region" },
  { code: "M23.2", description: "Derangement of meniscus due to old tear or injury" },
  { code: "E78.0", description: "Pure hypercholesterolemia" },
  { code: "G89.29", description: "Other chronic pain" },
];

export default function IcdCodeHighlighter({ documentText, onCodeSelected }: IcdCodeHighlighterProps) {
  const { t } = useI18n();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedCodes, setDetectedCodes] = useState<Array<{code: string, description: string, confidence: number}>>([]);
  const [highlightedText, setHighlightedText] = useState(documentText);

  // Function to simulate ICD code detection
  const analyzeDocument = () => {
    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // For demo purposes, we'll pretend to find some ICD codes in the text
      const detected = sampleIcdCodes
        .filter(() => Math.random() > 0.7) // Randomly select some codes
        .map(code => ({
          ...code,
          confidence: Math.round((0.75 + Math.random() * 0.24) * 100) / 100 // Random confidence between 75-99%
        }))
        .sort((a, b) => b.confidence - a.confidence);
      
      setDetectedCodes(detected);
      
      // Create highlighted version of text (simple implementation for demo)
      let highlighted = documentText;
      detected.forEach(({ code }) => {
        const regex = new RegExp(code, 'g');
        highlighted = highlighted.replace(regex, `<mark class="bg-yellow-200 px-1 rounded">${code}</mark>`);
      });
      
      setHighlightedText(highlighted);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleCodeClick = (code: string, description: string) => {
    if (onCodeSelected) {
      onCodeSelected(code, description);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Diagnosis Codes (ICD)</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={analyzeDocument}
          disabled={isAnalyzing}
          className="flex items-center gap-1"
        >
          {isAnalyzing ? (
            <>
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <MagnifyingGlassIcon className="h-4 w-4" />
              Auto-Detect Codes
            </>
          )}
        </Button>
      </div>
      
      <div className="p-4 flex gap-4">
        {/* Document preview with highlighted codes */}
        <div className="flex-1">
          <div className="text-sm font-medium mb-2">Document Text</div>
          <div 
            className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm h-64 overflow-auto"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
        
        {/* Detected codes list */}
        <div className="w-60">
          <div className="text-sm font-medium mb-2">Detected Codes</div>
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 h-64 overflow-auto">
            {detectedCodes.length === 0 ? (
              <div className="text-sm text-gray-500 italic">
                {isAnalyzing ? "Analyzing document..." : "No codes detected yet"}
              </div>
            ) : (
              <ul className="space-y-2">
                {detectedCodes.map(({ code, description, confidence }) => (
                  <li 
                    key={code} 
                    className="text-sm p-2 bg-white rounded border border-gray-200 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleCodeClick(code, description)}
                  >
                    <div className="font-medium">{code}</div>
                    <div className="text-xs text-gray-600 truncate" title={description}>
                      {description}
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${confidence > 0.9 ? 'bg-success' : 'bg-warning'}`}
                          style={{ width: `${confidence * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{Math.round(confidence * 100)}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}