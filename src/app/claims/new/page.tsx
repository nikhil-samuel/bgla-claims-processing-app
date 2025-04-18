"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Ecuador-specific provinces for dropdown
const ecuadorProvinces = [
  "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", 
  "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", 
  "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", 
  "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas", 
  "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
];

// Ecuador banks for dropdown
const ecuadorBanks = [
  "Banco Pichincha", "Banco Guayaquil", "Banco del Pacífico", 
  "Produbanco", "Banco Bolivariano", "Banco Internacional", 
  "Banco del Austro", "Banco Solidario", "Banco Procredit", 
  "Banco General Rumiñahui", "Banco Amazonas", "Banco de Loja", 
  "Banco de Machala", "Banco CoopNacional", "Banco D-Miro",
  "Banco Vision Fund Ecuador", "Banco Delbank"
];

export default function NewClaimPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  // Default to Ecuador specific information
  const [formData, setFormData] = useState({
    // Policy info
    policyNumber: "AW62-88-000111-HND",
    policyHolder: "Charles Heyer",
    idNumber: "1719876543", // Ecuador Cédula format
    memberId: "MEM12345",
    // Claim info
    requestType: "reimbursement",
    claimType: "medical",
    diagnosisCode: "S82.101A",
    diagnosisDescription: "Fractura de pierna",
    codeType: "ICD10",
    // Provider info
    providerId: "PROV-123",
    providerName: "Hospital General",
    providerType: "hospital",
    // Medical episode
    medicalEpisodeId: "EP-2025-12345",
    eventDate: "",
    eventCountry: "Ecuador",
    isPreventiveCare: false,
    isAccident: false,
    // Accident details
    accidentDate: "",
    accidentLocation: "",
    accidentDescription: "",
    // Symptom details
    firstSymptomDate: "",
    firstConsultationDate: "",
    // Other insurance
    hasOtherInsurance: false,
    otherInsuranceCompany: "",
    otherInsurancePolicyNumber: "",
    // Hospitalization
    isHospitalization: false,
    hospitalName: "",
    admissionDate: "",
    dischargeDate: "",
    // Bank info for reimbursement
    paymentMethod: "bank_transfer",
    accountHolder: "Charles Heyer",
    accountType: "CUENTA CORRIENTE",
    accountNumber: "12349008",
    swiftCode: "PICHECEQ",
    bankName: "Banco Pichincha",
    bankCity: "Quito",
    currency: "USD",
    // Documents
    documents: [] as File[],
    // Additional
    notes: ""
  });

  // Total number of steps in the form
  const totalSteps = 5; // Added more steps for Ecuador-specific details

  // Function to handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Function to handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    }
  };

  // Function to handle step navigation
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the form
      router.push("/claims/submission-successful");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1
                    ? "bg-primary text-white"
                    : currentStep === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-1 ${
                    currentStep > index + 1 ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium">
            {currentStep === 1 ? t("claim.policy") : null}
            {currentStep === 2 ? t("claim.medical") : null}
            {currentStep === 3 ? t("claim.accidentInfo") : null}
            {currentStep === 4 ? t("claim.bankInfo") : null}
            {currentStep === 5 ? t("claim.documents") : null}
          </span>
          <span className="text-sm text-gray-500">
            {t("claims.step")} {currentStep} {t("claims.of")} {totalSteps}
          </span>
        </div>
      </div>
    );
  };

  // Render the current step form
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Policy & Member Info
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.policy")}</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <select
                  id="requestType"
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="reimbursement">Reembolso</option>
                  <option value="preapproval">Pre-aprobación</option>
                  <option value="direct_payment">Pago Directo</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.policyNumber")}
                </label>
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID de Miembro
                </label>
                <input
                  type="text"
                  id="memberId"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="policyHolder" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.policyHolder")}
                </label>
                <input
                  type="text"
                  id="policyHolder"
                  name="policyHolder"
                  value={formData.policyHolder}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("ecuador.cedula")}
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="1719876543"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Formato: 10 dígitos sin guiones</p>
              </div>
              
              <div>
                <label htmlFor="claimType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Reclamo
                </label>
                <select
                  id="claimType"
                  name="claimType"
                  value={formData.claimType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="medical">Médico</option>
                  <option value="dental">Dental</option>
                  <option value="vision">Visión</option>
                  <option value="pharmacy">Farmacia</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 2: // Medical & Provider Info
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.medical")}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="diagnosisCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Diagnóstico (ICD)
                  </label>
                  <input
                    type="text"
                    id="diagnosisCode"
                    name="diagnosisCode"
                    value={formData.diagnosisCode}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ej: S82.101A"
                  />
                </div>
                
                <div>
                  <label htmlFor="codeType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Código
                  </label>
                  <select
                    id="codeType"
                    name="codeType"
                    value={formData.codeType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="ICD10">ICD-10</option>
                    <option value="ICD9">ICD-9</option>
                    <option value="CPT">CPT</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="diagnosisDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Diagnóstico
                </label>
                <input
                  type="text"
                  id="diagnosisDescription"
                  name="diagnosisDescription"
                  value={formData.diagnosisDescription}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ej: Fractura de pierna"
                />
              </div>
              
              <div>
                <label htmlFor="medicalEpisodeId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID del Episodio Médico
                </label>
                <input
                  type="text"
                  id="medicalEpisodeId"
                  name="medicalEpisodeId"
                  value={formData.medicalEpisodeId}
                  onChange={handleChange}
                  className="form-input"
                />
                <p className="text-xs text-gray-500 mt-1">Deje en blanco si es un nuevo episodio</p>
              </div>
              
              <div>
                <label htmlFor="providerId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID del Proveedor
                </label>
                <input
                  type="text"
                  id="providerId"
                  name="providerId"
                  value={formData.providerId}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Proveedor
                </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  value={formData.providerName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="providerType" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("ecuador.provider.type")}
                </label>
                <select
                  id="providerType"
                  name="providerType"
                  value={formData.providerType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="hospital">Hospital</option>
                  <option value="clinic">Clínica</option>
                  <option value="doctor">Médico Particular</option>
                  <option value="laboratory">Laboratorio</option>
                  <option value="pharmacy">Farmacia</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha del Evento
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="eventCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("ecuador.event_country")}
                  </label>
                  <select
                    id="eventCountry"
                    name="eventCountry"
                    value={formData.eventCountry}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="Ecuador">Ecuador</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Peru">Perú</option>
                    <option value="United States">Estados Unidos</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPreventiveCare"
                    name="isPreventiveCare"
                    checked={formData.isPreventiveCare}
                    onChange={handleChange}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <label htmlFor="isPreventiveCare" className="ml-2 block text-sm text-gray-700">
                    {t("ecuador.is_preventive")}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAccident"
                    name="isAccident"
                    checked={formData.isAccident}
                    onChange={handleChange}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <label htmlFor="isAccident" className="ml-2 block text-sm text-gray-700">
                    {t("ecuador.is_accident")}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isHospitalization"
                    name="isHospitalization"
                    checked={formData.isHospitalization}
                    onChange={handleChange}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <label htmlFor="isHospitalization" className="ml-2 block text-sm text-gray-700">
                    ¿Requirió Hospitalización?
                  </label>
                </div>
                
                {formData.isHospitalization && (
                  <div className="pl-6 pt-2 space-y-4 border-l-2 border-gray-200">
                    <div>
                      <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Hospital
                      </label>
                      <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de Ingreso
                        </label>
                        <input
                          type="date"
                          id="admissionDate"
                          name="admissionDate"
                          value={formData.admissionDate}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dischargeDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de Salida
                        </label>
                        <input
                          type="date"
                          id="dischargeDate"
                          name="dischargeDate"
                          value={formData.dischargeDate}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 3: // Accident Information & Other Insurance
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.accidentInfo")}</h2>
            
            {formData.isAccident ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="accidentDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha del Accidente
                    </label>
                    <input
                      type="date"
                      id="accidentDate"
                      name="accidentDate"
                      value={formData.accidentDate}
                      onChange={handleChange}
                      className="form-input"
                      required={formData.isAccident}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="accidentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("ecuador.event_location")}
                    </label>
                    <select
                      id="accidentLocation"
                      name="accidentLocation"
                      value={formData.accidentLocation}
                      onChange={handleChange}
                      className="form-input"
                      required={formData.isAccident}
                    >
                      <option value="">Seleccione</option>
                      <option value="home">Hogar</option>
                      <option value="work">Trabajo</option>
                      <option value="school">Escuela/Universidad</option>
                      <option value="public">Vía Pública</option>
                      <option value="sport">Evento Deportivo</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="accidentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del Accidente
                  </label>
                  <textarea
                    id="accidentDescription"
                    name="accidentDescription"
                    value={formData.accidentDescription}
                    onChange={handleChange}
                    rows={3}
                    className="form-input"
                    required={formData.isAccident}
                    placeholder="Por favor, proporcione una descripción detallada de cómo ocurrió el accidente"
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-500 text-sm">La sección de información de accidente no es aplicable ya que no se ha marcado como accidente.</p>
              </div>
            )}
            
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">{t("claim.otherInsurance")}</h2>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasOtherInsurance"
                  name="hasOtherInsurance"
                  checked={formData.hasOtherInsurance}
                  onChange={handleChange}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <label htmlFor="hasOtherInsurance" className="ml-2 block text-sm text-gray-700">
                  {t("form.hasOtherInsurance")}
                </label>
              </div>
              
              {formData.hasOtherInsurance && (
                <div className="pl-6 pt-2 space-y-4 border-l-2 border-gray-200">
                  <div>
                    <label htmlFor="otherInsuranceCompany" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("form.otherCompany")}
                    </label>
                    <input
                      type="text"
                      id="otherInsuranceCompany"
                      name="otherInsuranceCompany"
                      value={formData.otherInsuranceCompany}
                      onChange={handleChange}
                      className="form-input"
                      required={formData.hasOtherInsurance}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="otherInsurancePolicyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("form.otherPolicy")}
                    </label>
                    <input
                      type="text"
                      id="otherInsurancePolicyNumber"
                      name="otherInsurancePolicyNumber"
                      value={formData.otherInsurancePolicyNumber}
                      onChange={handleChange}
                      className="form-input"
                      required={formData.hasOtherInsurance}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mt-8">
                <h3 className="text-md font-medium">Fechas de Síntomas y Consulta</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstSymptomDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha del Primer Síntoma
                    </label>
                    <input
                      type="date"
                      id="firstSymptomDate"
                      name="firstSymptomDate"
                      value={formData.firstSymptomDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="firstConsultationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Primera Consulta
                    </label>
                    <input
                      type="date"
                      id="firstConsultationDate"
                      name="firstConsultationDate"
                      value={formData.firstConsultationDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4: // Bank Information
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.bankInfo")}</h2>
            
            {formData.requestType === "reimbursement" ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Método de Pago
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="bank_transfer">Transferencia Bancaria</option>
                    <option value="check">Cheque</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.accountHolder")}
                  </label>
                  <input
                    type="text"
                    id="accountHolder"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.accountType")}
                  </label>
                  <select
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="CUENTA CORRIENTE">Cuenta Corriente</option>
                    <option value="CUENTA DE AHORROS">Cuenta de Ahorros</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.accountNumber")}
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.bankName")}
                  </label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Seleccione un banco</option>
                    {ecuadorBanks.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="swiftCode" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("form.swiftCode")}
                    </label>
                    <input
                      type="text"
                      id="swiftCode"
                      name="swiftCode"
                      value={formData.swiftCode}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bankCity" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("form.bankCity")}
                    </label>
                    <input
                      type="text"
                      id="bankCity"
                      name="bankCity"
                      value={formData.bankCity}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.currency")}
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="USD">Dólar Americano (USD)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm">La información bancaria no es requerida para este tipo de solicitud.</p>
              </div>
            )}
          </div>
        );
      
      case 5: // Documents
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.documents")}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Documentos Requeridos</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Formulario de reclamo (original)</li>
                  <li>Facturas (originales)</li>
                  <li>Recetas médicas (originales)</li>
                  <li>Resultados de exámenes</li>
                  {formData.isHospitalization && (
                    <>
                      <li>Historia clínica</li>
                      <li>Informes de hospitalización</li>
                    </>
                  )}
                  {formData.isAccident && (
                    <li>Informe policial (si está disponible)</li>
                  )}
                </ul>
              </div>
              
              <div>
                <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("documents.title")}
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      {t("documents.upload")}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {t("documents.uploadHint")}
                    </p>
                    <input
                      id="documents"
                      name="documents"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("documents")?.click()}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Seleccionar archivos
                    </button>
                  </div>
                </div>
                
                {formData.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Archivos seleccionados:</p>
                    <ul className="mt-1 space-y-1">
                      {formData.documents.map((file, index) => (
                        <li key={index} className="text-sm text-gray-500 flex items-center">
                          <DocumentTextIcon className="h-4 w-4 mr-1 text-primary" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                  placeholder="Cualquier información adicional que quiera compartir..."
                ></textarea>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Información Importante</h3>
                <p className="text-sm text-blue-700">
                  Al enviar este formulario, declaro que toda la información proporcionada es verdadera y correcta. 
                  Entiendo que la presentación de información falsa puede resultar en la denegación del reclamo.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral">{t("dashboard.action.newClaim")}</h1>
            <p className="text-neutral-secondary">
              Por favor, complete el formulario a continuación para enviar un nuevo reclamo
            </p>
          </div>
          <Link href="/claims" className="flex items-center text-neutral-secondary hover:text-neutral">
            <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
            Volver a Reclamos
          </Link>
        </div>
      </div>
      
      {renderStepIndicator()}
      
      <form className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={currentStep === 1 ? "invisible" : ""}
          >
            {t("action.back")}
          </Button>
          <Button
            type="button"
            onClick={handleNextStep}
            className="flex items-center"
          >
            {currentStep === totalSteps ? "Enviar Reclamo" : t("action.next")}
            {currentStep !== totalSteps && <ChevronRightIcon className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}