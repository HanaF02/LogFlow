# LogFlow Dashboard

A React dashboard for developers to manage and analyze logs from their applications. Built with React, Vite, and Tailwind CSS.

## Features

- Register and login as a developer
- View your unique API key
- Create and delete applications
- View all logs per application in a paginated table
- Filter logs by level (INFO / WARN / ERROR)
- Search logs by message
- Sort by most recent or most occurred
- Charts showing log level distribution and logs over time
- Light and dark mode

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- React Router v6
- Axios
- Formik + Yup
- Recharts

## Getting Started

### Prerequisites

- Node.js v18+
- [LogFlow API](https://github.com/HanaF02/LogApp-Backend) running locally or deployed

### Installation

```bash
git clone https://github.com/HanaF02/LogFlow.git
cd LogFlow
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5000
```

### Run

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Sign in with email and password |
| Register | `/register` | Create a new developer account |
| Applications | `/applications` | View, create, and delete applications |
| Logs | `/applications/:name/logs` | View and analyze logs for an app |
| 404 | `*` | Not found page |

---

## Usage with SDK

Once logged in, copy your API key from the navbar and use it with the [LogFlow SDK](https://www.npmjs.com/package/hana-logflow-sdk):

```bash
npm install hana-logflow-sdk
```

```js
import { init, log } from 'hana-logflow-sdk'

init({
  apiKey: 'your-api-key',
  appName: 'your-app-name',
  baseURL: 'http://localhost:5000'
})

await log('User signed up', 'INFO')
await log('Slow query detected', 'WARN')
await log('Payment service down', 'ERROR')
```

---

## Related

- [LogFlow API](https://github.com/HanaF02/LogApp-backend)
- [LogFlow SDK](https://github.com/HanaF02/logflow-sdk) — [npm](https://www.npmjs.com/package/hana-logflow-sdk)
