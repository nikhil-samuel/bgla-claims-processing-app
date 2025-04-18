"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the supported languages
export type Language = 'en' | 'es';

// Define the context types
type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const I18nContext = createContext<I18nContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key,
});

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.total': 'Total Claims',
    'dashboard.stats.inProgress': 'In Progress',
    'dashboard.stats.approved': 'Approved',
    'dashboard.stats.attention': 'Requires Attention',
    'dashboard.queue': 'Claims Queue',
    'dashboard.viewAll': 'View all',
    'dashboard.recentClaims': 'Recent Claims',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.action.newClaim': 'Submit New Claim',
    'dashboard.action.uploadDocuments': 'Upload Documents',
    'dashboard.action.contactSupport': 'Contact Support',
    
    // Claims Table
    'claims.id': 'Claim ID',
    'claims.patient': 'Patient',
    'claims.type': 'Type',
    'claims.submitted': 'Submitted',
    'claims.amount': 'Amount',
    'claims.status': 'Status',
    'claims.view': 'View',
    'claims.step': 'Step',
    'claims.of': 'of',
    
    // Status Tags
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.processing': 'Processing',
    'status.in_clearinghouse': 'In Clearinghouse',
    
    // Claim Details
    'claim.policy': 'Policy & Member',
    'claim.details': 'Claim',
    'claim.medical': 'Medical & Provider',
    'claim.reimbursement': 'Reimbursement',
    'claim.documents': 'Documents',
    'claim.additionalInfo': 'Additional Member Information',
    'claim.bankInfo': 'Bank Information',
    'claim.accidentInfo': 'Accident Information',
    'claim.hospitalization': 'Hospitalization',
    'claim.otherInsurance': 'Other Insurance',
    
    // Form Fields
    'form.policyNumber': 'Policy Number',
    'form.policyHolder': 'Policy Holder Name',
    'form.idNumber': 'ID / Passport Number',
    'form.policyEffective': 'Policy Effective Date',
    'form.planName': 'Plan Name',
    'form.hasOtherInsurance': 'Has Other Insurance',
    'form.otherCompany': 'Other Insurance Company',
    'form.otherPolicy': 'Other Policy Number',
    'form.gender': 'Gender',
    'form.yes': 'Yes',
    'form.no': 'No',
    'form.male': 'Male',
    'form.female': 'Female',
    'form.other': 'Other',
    'form.accountHolder': 'Account Holder',
    'form.accountType': 'Account Type',
    'form.accountNumber': 'Account Number',
    'form.swiftCode': 'SWIFT Code',
    'form.bankName': 'Bank Name',
    'form.bankCity': 'Bank City',
    'form.currency': 'Currency',
    
    // Document Related
    'documents.title': 'Documents',
    'documents.request': 'Request Documents',
    'documents.filter': 'Filter',
    'documents.name': 'Name',
    'documents.uploadedBy': 'Uploaded by',
    'documents.lastEdited': 'Last Edited',
    'documents.upload': 'Click or drag missing documents to this area to upload',
    'documents.uploadHint': 'Support for a single or bulk upload.',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.claims': 'Claims',
    'nav.documents': 'Documents',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.language': 'Language',
    
    // Language
    'language.english': 'English',
    'language.spanish': 'Spanish',
    
    // Errors & Validation
    'error.conflict': 'Conflicting info from different sources',
    
    // Common Actions
    'action.back': 'Back',
    'action.next': 'Next',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.close': 'Close',
    'action.confirm': 'Confirm',
    
    // Ecuador specific
    'ecuador.cedula': 'Cédula',
    'ecuador.province': 'Province',
    'ecuador.canton': 'Canton',
    'ecuador.reimbursement': 'Reimbursement',
    'ecuador.provider.type': 'Provider Type',
    'ecuador.is_preventive': 'Is Preventive Care',
    'ecuador.is_accident': 'Is Accident',
    'ecuador.event_location': 'Event Location',
    'ecuador.event_country': 'Event Country',
  },
  es: {
    // Dashboard
    'dashboard.title': 'Tablero',
    'dashboard.welcome': 'Bienvenido de nuevo',
    'dashboard.stats.total': 'Reclamos Totales',
    'dashboard.stats.inProgress': 'En Progreso',
    'dashboard.stats.approved': 'Aprobados',
    'dashboard.stats.attention': 'Requiere Atención',
    'dashboard.queue': 'Cola de Reclamos',
    'dashboard.viewAll': 'Ver todos',
    'dashboard.recentClaims': 'Reclamos Recientes',
    'dashboard.quickActions': 'Acciones Rápidas',
    'dashboard.action.newClaim': 'Enviar Nuevo Reclamo',
    'dashboard.action.uploadDocuments': 'Subir Documentos',
    'dashboard.action.contactSupport': 'Contactar Soporte',
    
    // Claims Table
    'claims.id': 'ID de Reclamo',
    'claims.patient': 'Paciente',
    'claims.type': 'Tipo',
    'claims.submitted': 'Presentado',
    'claims.amount': 'Monto',
    'claims.status': 'Estado',
    'claims.view': 'Ver',
    'claims.step': 'Paso',
    'claims.of': 'de',
    
    // Status Tags
    'status.pending': 'Pendiente',
    'status.approved': 'Aprobado',
    'status.rejected': 'Rechazado',
    'status.processing': 'Procesando',
    'status.in_clearinghouse': 'En Centro de Procesamiento',
    
    // Claim Details
    'claim.policy': 'Póliza y Miembro',
    'claim.details': 'Reclamo',
    'claim.medical': 'Médico y Proveedor',
    'claim.reimbursement': 'Reembolso',
    'claim.documents': 'Documentos',
    'claim.additionalInfo': 'Información Adicional del Miembro',
    'claim.bankInfo': 'Información Bancaria',
    'claim.accidentInfo': 'Información del Accidente',
    'claim.hospitalization': 'Hospitalización',
    'claim.otherInsurance': 'Otro Seguro',
    
    // Form Fields
    'form.policyNumber': 'Número de Póliza',
    'form.policyHolder': 'Nombre del Titular de la Póliza',
    'form.idNumber': 'Cédula / Número de Pasaporte',
    'form.policyEffective': 'Fecha Efectiva de la Póliza',
    'form.planName': 'Nombre del Plan',
    'form.hasOtherInsurance': 'Tiene Otro Seguro',
    'form.otherCompany': 'Otra Compañía de Seguros',
    'form.otherPolicy': 'Otro Número de Póliza',
    'form.gender': 'Género',
    'form.yes': 'Sí',
    'form.no': 'No',
    'form.male': 'Masculino',
    'form.female': 'Femenino',
    'form.other': 'Otro',
    'form.accountHolder': 'Titular de la Cuenta',
    'form.accountType': 'Tipo de Cuenta',
    'form.accountNumber': 'Número de Cuenta',
    'form.swiftCode': 'Código SWIFT',
    'form.bankName': 'Nombre del Banco',
    'form.bankCity': 'Ciudad del Banco',
    'form.currency': 'Moneda',
    
    // Document Related
    'documents.title': 'Documentos',
    'documents.request': 'Solicitar Documentos',
    'documents.filter': 'Filtrar',
    'documents.name': 'Nombre',
    'documents.uploadedBy': 'Subido por',
    'documents.lastEdited': 'Última Edición',
    'documents.upload': 'Haga clic o arrastre los documentos faltantes a esta área para subirlos',
    'documents.uploadHint': 'Soporte para carga única o múltiple.',
    
    // Navigation
    'nav.dashboard': 'Tablero',
    'nav.claims': 'Reclamos',
    'nav.documents': 'Documentos',
    'nav.reports': 'Informes',
    'nav.settings': 'Configuración',
    'nav.language': 'Idioma',
    
    // Language
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    
    // Errors & Validation
    'error.conflict': 'Información conflictiva de diferentes fuentes',
    
    // Common Actions
    'action.back': 'Atrás',
    'action.next': 'Siguiente',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.close': 'Cerrar',
    'action.confirm': 'Confirmar',
    
    // Ecuador specific
    'ecuador.cedula': 'Cédula',
    'ecuador.province': 'Provincia',
    'ecuador.canton': 'Cantón',
    'ecuador.reimbursement': 'Reembolso',
    'ecuador.provider.type': 'Tipo de Proveedor',
    'ecuador.is_preventive': 'Es Cuidado Preventivo',
    'ecuador.is_accident': 'Es Accidente',
    'ecuador.event_location': 'Lugar del Evento',
    'ecuador.event_country': 'País del Evento',
  }
};

// Provider component
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Spanish for Ecuador focus
  const [language, setLanguage] = useState<Language>('es');

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  // Update localStorage when language changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to use the i18n context
export const useI18n = () => useContext(I18nContext);