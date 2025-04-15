# BGLA Claims Processing Application

A Next.js application for BGLA (Blue Green Life Assurance) insurance claims processing, based on Figma wireframes.

## Overview

This application provides a user interface for processing insurance claims for BGLA. The application allows users to view, submit, and track insurance claims through a streamlined process.

## Features

- Claims dashboard overview
- New claim submission
- Claim status tracking
- Document uploading and management
- Form validation
- User notifications

## User Paths

The application supports the following primary user paths:

1. **New Claim Submission**
   - User logs in and navigates to the dashboard
   - User clicks "Submit New Claim" to start the process
   - User completes the three-step form:
     - Step 1: Enter claim details (type, policy number, patient info, provider, amount)
     - Step 2: Upload supporting documents
     - Step 3: Review and submit the claim
   - User receives confirmation of successful submission

2. **Claim Status Tracking**
   - User logs in and navigates to the dashboard to see recent claims
   - User can view all claims by clicking "Claims" in the navigation
   - User selects a specific claim to view its detailed status
   - User can track the claim's progress through the timeline tab
   - User can communicate with BGLA through the messages tab

3. **Document Management**
   - User navigates to "Documents" section
   - User can view all previously uploaded documents
   - User can upload new documents by clicking "Upload Document"
   - User associates documents with specific claims
   - User can download or delete existing documents

## Technology Stack

- **Frontend**: 
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS for styling
  - Headless UI for accessible components
  - React Hook Form for form handling
  - Heroicons for icons

- **Features**:
  - Responsive design
  - Form validation
  - Multi-step forms
  - File uploads
  - Dynamic routing
  - Interactive UI components

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikhil-samuel/bgla-claims-processing-app.git
   cd bgla-claims-processing-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Build for Production

To build the application for production deployment:

```bash
npm run build
npm run start
```

## Project Structure

```
bgla-claims-processing-app/
├── src/
│   ├── app/                     # Next.js app router
│   │   ├── claims/              # Claims pages
│   │   │   ├── [id]/            # Individual claim details
│   │   │   ├── new/             # New claim submission
│   │   │   └── submission-successful/ # Claim success page
│   │   ├── dashboard/           # Dashboard page
│   │   ├── documents/           # Documents management
│   │   │   └── upload/          # Document upload page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Login page
│   │
│   ├── components/              # Reusable components
│   │   ├── Layout/              # Layout components
│   │   │   ├── AppHeader.tsx    # Application header
│   │   │   └── AppLayout.tsx    # Main application layout
│   │   └── SignInForm.tsx       # Login form component
│   │
│   └── lib/                     # Utility functions and helpers
│
├── public/                      # Static assets
│
├── .gitignore                   # Git ignore file
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Usage Notes

### Authentication

This prototype uses a simplified authentication flow. In a production environment, you'd want to integrate with a proper authentication system.

To test the app:
1. Use any email and password on the login page
2. The system will redirect you to the dashboard without actual authentication

### Data Persistence

This is a frontend prototype without backend integration. Data is not persisted between sessions. In a production environment, you would:

1. Connect to a backend API for data persistence
2. Set up proper authentication
3. Implement server-side validation

## Future Enhancements

- Backend API integration
- Real-time notifications
- Enhanced document preview
- Advanced search and filtering
- Role-based access control (admin, user, provider)

## License

This project is proprietary and intended for use by BGLA only.

## Acknowledgements

- Figma wireframes used as the basis for the UI design
- All icons provided by Heroicons
- UI components built with Tailwind CSS and Headless UI
