# G-Scores - Exam Score Lookup System

A web application for looking up exam scores and viewing statistical reports, built with Next.js, TypeScript, and Tailwind CSS.

## Features

* 🔍 Search scores by registration number
* 📊 View statistical reports by subject
* 🏆 List of outstanding students
* 📱 Responsive design, mobile-friendly
* 🎨 Interactive charts with Chart.js

## Technologies Used

* **Frontend**: Next.js 14, React 18, TypeScript
* **Styling**: Tailwind CSS, shadcn/ui
* **Charts**: Chart.js, react-chartjs-2
* **Deployment**: Docker, Docker Compose

## Getting Started

### Run Directly

```bash
# Move to the folder
cd .\g-scores-frontend\

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## API Endpoints

The app provides the following API endpoints:

* `GET /api/students/score/:registrationNumber` — Search scores by registration number
* `GET /api/reports/score-levels` — Score distribution report
* `GET /api/reports/top/group-a` — List of top-performing students in Group A

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── types/                # TypeScript type definitions
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
```

## Deployment Link
https://g-scores-frontend-six.vercel.app/
```

## Health Check

Verify that the app is running:

```bash
curl http://localhost:3000/api/health
```



