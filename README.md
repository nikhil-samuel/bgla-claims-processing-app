# BGLA Claims Processing Application

A Next.js application for BGLA (Blue Green Life Assurance) insurance claims processing, based on Figma wireframes.

## Overview

This application provides a user interface for processing insurance claims for BGLA. It follows design specifications from Figma wireframes to create a consistent and user-friendly experience for managing insurance claims.

## Features

- Claims dashboard with statistics and recent claims
- Pending claims queue for quick access to waiting claims
- New claim submission through guided multi-step form
- Detailed claim status tracking
- Document uploading and management
- Form validation with visual feedback
- Status indicators for claim progress
- Responsive design that works on mobile and desktop

## User Paths

The application supports the following primary user paths:

### 1. Dashboard Overview
   - View key statistics (total claims, in progress, approved, requires attention)
   - See pending claims in a card-based queue view
   - Access recent claims in a tabular format
   - Quick links to common actions

### 2. Claims Queue View
   - View all pending claims requiring attention
   - Filter claims by various criteria
   - See claim metadata (patient, type, amount)
   - Status indicators to show processing state

### 3. New Claim Submission
   - Multi-step form with clear progress indication:
     - Step 1: Policy & Member information (pre-populated from system)
     - Step 2: Claim details (type, dates, medical information)
     - Step 3: Review and submit
   - Form validation with immediate feedback
   - Document upload capabilities
   - Success confirmation after submission

### 4. Claim Details
   - View all information about a specific claim
   - Track claim status through visual timeline
   - Access uploaded documents
   - Exchange messages with administrators
   - See information organized in tabs for easy navigation

### 5. Document Management
   - Upload and organize claim-related documents
   - Associate documents with specific claims
   - View and download existing documents

## Design System

The application implements a design system based on the Figma wireframes with:

- **Colors**: 
  - Primary blue (#1677FF) for key actions and active states
  - Success green (#52C41A) for approved status
  - Warning amber (#FAAD14) for pending status
  - Error red (#FF4D4F) for rejected status
  - Neutral grays for text hierarchy

- **Components**:
  - Status tags with icons for claim states
  - Form fields with validation states (success/error)
  - Collapsible section cards for organizing forms
  - Claim cards for consistent display in queues
  - Multi-step form progress indicators

- **Patterns**:
  - Consistent feedback for user actions
  - Progressive disclosure for complex forms
  - Card-based interfaces for summarizing information
  - Tabbed interfaces for organizing detailed content

## Technology Stack

- **Frontend**: 
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS for styling
  - Headless UI for accessible components
  - React Hook Form for form handling
  - Heroicons for consistent iconography

## Getting Started

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

## Project Structure

```
bgla-claims-processing-app/
├── src/
│   ├── app/                      # Next.js app router
│   │   ├── claims/               # Claims pages
│   │   │   ├── [id]/             # Individual claim details
│   │   │   ├── new/              # New claim submission
│   │   │   └── submission-successful/ # Claim success page
│   │   ├── dashboard/            # Dashboard page
│   │   ├── documents/            # Documents management
│   │   │   └── upload/           # Document upload page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Login page
│   │
│   ├── components/               # Reusable components
│   │   ├── Layout/               # Layout components
│   │   │   ├── AppHeader.tsx     # (Deprecated) Application header 
│   │   │   ├── AppLayout.tsx     # Main application layout
│   │   │   └── AppSidebar.tsx    # Sidebar navigation
│   │   ├── claims/               # Claim-specific components
│   │   │   └── ClaimCard.tsx     # Card component for claims
│   │   ├── ui/                   # Shared UI components
│   │   │   ├── FormField.tsx     # Form field with validation
│   │   │   ├── SectionCard.tsx   # Collapsible section container
│   │   │   └── StatusTag.tsx     # Status indicator tags
│   │   └── SignInForm.tsx        # Login form component
│   │
│   └── lib/                      # Utility functions and helpers
│
├── public/                       # Static assets
│
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Figma Design Implementation

The application has been developed to closely match the Figma wireframes provided in the "Claims Processing Wireframes" file. Key aspects of the implementation include:

- **Layout Structure**: The sidebar navigation, headers, and content areas follow the Figma layout specifications.
- **Component Design**: UI components like status tags, form fields, and cards are built to match the Figma components.
- **Color Scheme**: The color palette has been extracted from the Figma design and implemented in Tailwind CSS.
- **Typography**: Text styles for headers, labels, and content match the Figma specifications.
- **Spacing**: Padding, margins, and layout spacing follow the Figma design system.

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

- Backend API integration with real data persistence
- Real-time notifications for claim status changes
- Enhanced document preview and management
- Advanced search and filtering for claims
- Administrator interface for processing claims
- Mobile app version for on-the-go access

## License

This project is proprietary and intended for use by BGLA only.

## Acknowledgements

- Figma wireframes used as the basis for the UI design
- All icons provided by Heroicons
- UI components built with Tailwind CSS and Headless UI
