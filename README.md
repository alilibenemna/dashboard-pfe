# dashboard-pfe


## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account with Realtime Database

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd generator-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Set up a Realtime Database
   - Get your Firebase configuration
   - Update the configuration in `src/firebase-config.js`

4. Start the development server:
   ```
   npm start
   ```

5. Build for production:
   ```
   npm run build
   ```