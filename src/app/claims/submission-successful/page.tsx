"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, DocumentTextIcon, ArrowLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SubmissionSuccessfulPage() {
  const { t } = useI18n();
  
  // Mock data for the newly created claim using the API response format
  const newClaim = {
    id: "SYS-REQ-001234",
    request_id: "REQ-2025-12345",
    status: "received",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    message: "Solicitud recibida exitosamente",
    client_status: {
      bgla_status: "in_clearinghouse",
      amigos_plus_id: "AP-789012",
      docuface_id: "DF-456789"
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-EC', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Map status to Spanish
  const mapStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'received': 'Recibido',
      'processing': 'En procesamiento',
      'in_clearinghouse': 'En centro de procesamiento',
      'approved': 'Aprobado',
      'rejected': 'Rechazado'
    };
    
    return statusMap[status] || status;
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Reclamo Enviado Exitosamente!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Su reclamo ha sido recibido y está siendo procesado.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">ID del Sistema</p>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  BGLA
                </span>
              </div>
              <p className="text-xl font-medium text-gray-900 mb-4">{newClaim.id}</p>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">ID de Solicitud</p>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Referencia
                </span>
              </div>
              <p className="text-xl font-medium text-gray-900 mb-4">{newClaim.request_id}</p>
              
              <p className="text-sm text-gray-500 mb-1">Fecha de Envío</p>
              <p className="text-gray-900 mb-4">{formatDate(newClaim.created_at)}</p>
              
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Estado</p>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {mapStatus(newClaim.client_status.bgla_status)}
                </span>
              </div>
              <p className="text-gray-900 mb-4">{newClaim.message}</p>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ID en Amigos Plus</p>
                    <p className="text-sm font-medium">{newClaim.client_status.amigos_plus_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ID en DocuFace</p>
                    <p className="text-sm font-medium">{newClaim.client_status.docuface_id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mr-3">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-blue-800">Seguimiento de su Reclamo</h3>
                <p className="text-sm text-blue-600">
                  Puede verificar el estado de su reclamo en cualquier momento desde el tablero.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 mr-3">
                <InformationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-yellow-800">Tiempo de Procesamiento</h3>
                <p className="text-sm text-yellow-600">
                  El tiempo estimado de procesamiento es de 3-5 días hábiles.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-medium mb-2">Información Importante</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Guarde el número de ID de solicitud para futuras referencias.</li>
              <li>Si necesita enviar documentos adicionales, asegúrese de mencionar este ID.</li>
              <li>Para consultas, contáctenos al 1-800-BGLA-ECU o support@bgla-ecuador.com</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="flex items-center justify-center">
              <Link href="/claims">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Volver a Reclamos
              </Link>
            </Button>
            
            <Button asChild className="flex items-center justify-center">
              <Link href="/dashboard">
                Ver Tablero
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}