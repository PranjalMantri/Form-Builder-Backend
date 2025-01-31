# Form Builder API Documentation

This document provides a detailed overview of the Form Builder API, including endpoints for authentication and form management.

## Table of Contents

1. [Authentication](#authentication)
   - [User Register](#user-register)
   - [Login](#login)
   - [Get User Info](#get-user-info)
2. [Form Management](#form-management)
   - [Create a Form](#create-a-form)
   - [Get All Forms](#get-all-forms)
   - [Get Specific Form](#get-specific-form)
   - [Add Field to a Form](#add-field-to-a-form)
   - [Update Field](#update-field)
   - [Delete a Form Field](#delete-a-form-field)
   - [Submit Response](#submit-response)
   - [Get All Form Submissions](#get-all-form-submissions)
   - [Get Specific Submission](#get-specific-submission)
   - [Delete Submission](#delete-submission)

---

## Authentication

### User Register

Register a new user.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Body:**
  ```json
  {
    "name": "Pranjal Mantri",
    "email": "pranjalmantri@gmail.com",
    "password": "12345"
  }
  ```

````

### Login

Authenticate a user and retrieve a token.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Body:**
  ```json
  {
    "email": "pranjalmantri@gmail.com",
    "password": "12345"
  }
  ```
- **Response Handling:**
  ```javascript
  const jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set("authToken", jsonData.token);
  }
  ```

### Get User Info

Retrieve information about the authenticated user.

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:**
  - `Authorization: Bearer <token>`

---

## Form Management

### Create a Form

Create a new form.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/forms`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Survey Form",
    "description": "A survey to collect feedback.",
    "fields": [
      { "label": "Name", "type": "text" },
      { "label": "Age", "type": "number" }
    ],
    "isPublic": true
  }
  ```

### Get All Forms

Retrieve all forms.

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/forms`
- **Headers:**
  - `Authorization: Bearer <token>`

### Get Specific Form

Retrieve a specific form by its ID.

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/forms/<form_id>`
- **Headers:**
  - `Authorization: Bearer <token>`

### Add Field to a Form

Add a new field to an existing form.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/forms/<form_id>/fields`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "label": "Email Address",
    "type": "email",
    "required": true
  }
  ```

### Update Field

Update an existing field in a form.

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/forms/<form_id>/fields/<field_id>`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "label": "Email Address",
    "type": "email",
    "required": true
  }
  ```

### Delete a Form Field

Delete a field from a form.

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/forms/<form_id>/fields/<field_id>`
- **Headers:**
  - `Authorization: Bearer <token>`

### Submit Response

Submit a response to a form.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/forms/<form_id>/submit`
- **Body:**
  ```json
  {
    "responses": [
      {
        "fieldId": "679cf26e7a694f25e6daa8a3",
        "value": "pranjal@example.com"
      },
      {
        "fieldId": "679cf26e7a694f25e6daa8a4",
        "value": 20
      }
    ]
  }
  ```

### Get All Form Submissions

Retrieve all submissions for a specific form.

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/forms/<form_id>/submissions`
- **Headers:**
  - `Authorization: Bearer <token>`

### Get Specific Submission

Retrieve a specific submission by its ID.

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/forms/<form_id>/submissions/<submission_id>`
- **Headers:**
  - `Authorization: Bearer <token>`

### Delete Submission

Delete a specific submission.

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/forms/<form_id>/submissions/<submission_id>`
- **Headers:**
  - `Authorization: Bearer <token>`

````
