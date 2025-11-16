# Health-Bridge API Endpoints

This document outlines the API endpoints required for the Health-Bridge platform.

## Base URL

`/api/v1`

---

## 1. Authentication

### `POST /auth/patient/login`
- **Description**: Authenticates a patient using their registered identifier (e.g., mobile number and OTP).
- **Request Body**: `{ "mobile": "string", "otp": "string" }`
- **Response**: `{ "token": "JWT_TOKEN", "patient": { ...patientObject } }`

### `POST /auth/doctor/login`
- **Description**: Authenticates a doctor.
- **Request Body**: `{ "email": "string", "password": "string" }`
- **Response**: `{ "token": "JWT_TOKEN", "doctor": { ...doctorObject } }`

---

## 2. Patient Endpoints

### `GET /patients/{patientId}`
- **Description**: Retrieves a patient's profile information.
- **Auth**: Patient, Doctor
- **Response**: `{ "id": "uuid", "name": "string", "age": "number", ... }`

### `GET /patients/{patientId}/history`
- **Description**: Retrieves a patient's complete medical history (past checkups and consultations).
- **Auth**: Patient, Doctor
- **Response**: `[{ ...checkupObject }, { ...consultationObject }]`

---

## 3. Checkup Endpoints

### `POST /checkups`
- **Description**: Submits the results of a new checkup from a health cubicle.
- **Auth**: Patient (via cubicle session)
- **Request Body**:
  ```json
  {
    "patientId": "uuid",
    "vitals": {
      "temperature": "number",
      "bloodPressure": { "systolic": "number", "diastolic": "number" },
      "bloodSugar": "number",
      "oxygenSaturation": "number",
      "weight": "number",
      "pulse": "number"
    }
  }
  ```
- **Response**: `{ "checkupId": "uuid", "status": "completed", "reportUrl": "url" }`

### `GET /checkups/{checkupId}`
- **Description**: Retrieves the details and report of a specific checkup.
- **Auth**: Patient, Doctor
- **Response**: `{ ...checkupObject }`

---

## 4. Doctor & Consultation Endpoints

### `GET /doctors/available`
- **Description**: Retrieves a list of currently available doctors and their specialities.
- **Auth**: Patient
- **Response**:
  ```json
  [
    {
      "id": "uuid",
      "name": "Dr. Name",
      "speciality": "General Physician"
    },
    {
      "id": "uuid",
      "name": "Dr. Other Name",
      "speciality": "Pediatrician"
    }
  ]
  ```

### `GET /doctors/specialities`
- **Description**: Get a list of all unique doctor specialities available on the platform.
- **Auth**: Public/Patient
- **Response**: `["General Physician", "Pediatrician", "Cardiologist", "Diabetologist"]`

### `POST /consultations/request`
- **Description**: A patient requests an immediate video consultation. The system should match them with an available doctor.
- **Auth**: Patient
- **Request Body**: `{ "patientId": "uuid", "checkupId": "uuid", "preferredSpeciality": "string" (optional) }`
- **Response**: `{ "consultationId": "uuid", "status": "pending", "doctor": { ...doctorObject }, "videoCallLink": "url" }`

### `POST /consultations/{consultationId}/end`
- **Description**: The doctor ends the consultation and submits a prescription/diagnosis.
- **Auth**: Doctor
- **Request Body**: `{ "diagnosis": "string", "prescription": { ...prescriptionObject }, "referralNeeded": "boolean" }`
- **Response**: `{ "status": "completed" }`

---

## 5. Admin/Partner Endpoints

### `GET /admin/devices/status`
- **Description**: Monitor the status and connectivity of all health cubicles.
- **Auth**: Admin
- **Response**: `[{ "cubicleId": "uuid", "location": "string", "status": "online|offline", "lastSeen": "timestamp" }]`

### `GET /admin/analytics/usage`
- **Description**: Get usage analytics (e.g., number of checkups, consultations per day/week/month).
- **Auth**: Admin
- **Response**: `{ ...analyticsData }`
