# Audio Ace Scholar

An AI-powered study assistant that converts lecture recordings into summarized notes and Q&A materials.

## Features

- 🎙️ Audio file upload and management
- 📝 Automatic lecture summarization
- ❓ AI-generated Q&A from audio content
- 📚 Organized study material repository
- 🔍 Search through processed content
- 📈 Progress tracking and analytics

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite.js
- shadcn-ui
- Tailwind CSS

**Backend:**
- Django REST Framework
- PostgreSQL
- Python
- pydub (audio processing)

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd TandooriChickenBB
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up PostgreSQL database:
```bash
createdb stt_db
```

4. Run migrations:
```bash
python manage.py migrate
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd src  # Assuming frontend is in src directory
```

2. Install Node.js dependencies:
```bash
npm install
```

## Running the Application

1. **Start Backend** (from TandooriChickenBB directory):
```bash
python manage.py runserver
```

2. **Start Frontend** (from frontend directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/`

## Environment Variables

Create a `.env` file in the backend directory with:
```ini
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=postgres://postgres:pokemon11@localhost:5432/stt_db
```

## Project Structure
