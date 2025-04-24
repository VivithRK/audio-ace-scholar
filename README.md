
# AudioAce - Audio to Summary Application

AudioAce is a web application that allows users to upload audio recordings (such as lectures) and automatically converts them into concise text summaries and Q&A pairs for easier studying.

## Project Structure

This project consists of two main components:

1. **Frontend**: A React application built with TypeScript, Vite, and Tailwind CSS
2. **Backend**: A Django REST API that handles audio processing, transcription, and AI-driven summarization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- PostgreSQL (recommended for production)

### Frontend Setup

1. Navigate to the project root directory:

```bash
cd audio-ace
```

2. Install the frontend dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`.

### Backend Setup

1. Navigate to the backend directory:

```bash
cd TandooriChickenBB
```

2. Create a Python virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required Python packages:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:
   Create a `.env` file in the `TandooriChickenBB` directory with the following:

```
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_django_secret_key
```

5. Run database migrations:

```bash
python manage.py migrate
```

6. Start the Django development server:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`.

## How the Application Works

### Key Features

- **Audio File Upload**: Users can upload audio recordings (lectures, podcasts, etc.)
- **Automated Transcription**: The backend converts audio to text using AI speech-to-text
- **Summary Generation**: AI processes the transcription to create concise summaries
- **Q&A Generation**: AI extracts key questions and answers from the content
- **Library Management**: Users can access all their summaries in one place

### Technical Flow

1. **Upload Process**:
   - User uploads an audio file through the frontend
   - File is sent to the Django backend via a POST request to `/api/STT/`
   - Backend processes the audio using AI speech-to-text services
   - The transcription is passed to another AI model to generate summaries and Q&A pairs
   - Results are stored in the database

2. **Library Access**:
   - Frontend fetches all processed audio files from `/api/audio-files/`
   - Each audio file's metadata is displayed in a card format
   - Users can search for specific summaries

3. **Summary Viewing**:
   - When a user selects an audio file, details are fetched from `/api/audio-files/:id/`
   - Users can toggle between viewing the summary or Q&A pairs

## API Endpoints

- **POST `/api/STT/`**: Upload and process audio files
- **GET `/api/audio-files/`**: Get all processed audio files
- **GET `/api/audio-files/:id/`**: Get details for a specific audio file

## Deployment

### Frontend Deployment

- Build the frontend for production:
  ```bash
  npm run build
  ```

### Backend Deployment

- Configure a production web server (e.g., Gunicorn, Nginx)
- Set up proper environment variables
- Configure static files serving and media storage

## Troubleshooting

- **Backend Connection Issues**: Ensure the API is running and accessible
- **Audio Processing Errors**: Check the API logs for detailed error information
- **Empty Summaries**: Verify that the audio quality is good and the API key is valid
