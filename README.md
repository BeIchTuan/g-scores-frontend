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

### Method 1: Run Directly

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Method 2: Use Docker Compose

```bash
# Build and run with Docker Compose
npm run docker:compose:build

# Or just run
npm run docker:compose

# Stop containers
npm run docker:stop
```

### Method 3: Manual Docker

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
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
└── nginx.conf            # Nginx configuration
```

## Deployment

### Docker Compose (Recommended)

```bash
docker-compose up -d
```

The application will run at:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Nginx (reverse proxy): [http://localhost:80](http://localhost:80)

### Docker

```bash
docker build -t g-scores .
docker run -p 3000:3000 g-scores
```

## Environment Variables

Create a `.env.local` file if needed:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Health Check

Verify that the app is running:

```bash
curl http://localhost:3000/api/health
```



