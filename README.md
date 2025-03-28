# EmployWise Assignment

## Overview
EmployWise is a React-based user management application that integrates with the [Reqres API](https://reqres.in/). The application consists of authentication, user listing, and user management functionalities, following a structured progression across three levels.

## Features
### Level 1: Authentication Screen
- Users can log in using the provided credentials:
  - **Email:** eve.holt@reqres.in
  - **Password:** cityslicka
- On successful authentication, the token is stored, and the user is redirected to the Users List page.

### Level 2: List All Users
- Displays a paginated list of users fetched from `GET /api/users?page=1`.
- Shows the first name, last name, and avatar.
- Implements pagination (or lazy loading) to navigate through different pages.

### Level 3: Edit, Delete, and Update Users
- **Edit:** Clicking Edit opens a form pre-filled with user data, allowing updates via `PUT /api/users/{id}`.
- **Delete:** Users can be removed from the list using `DELETE /api/users/{id}`.
- Displays appropriate success/error messages.

## Tech Stack
- **Frontend:** React (Next.js)
- **UI Components:** ShadCN UI
- **State Management:** Context API (Optional Redux)
- **HTTP Requests:** Axios / Fetch API
- **Styling:** Tailwind CSS

## Installation & Setup
### Prerequisites
- Node.js installed
- pnpm installed (or use npm/yarn)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/employwise.git
   cd employwise
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
app/
  (protected)/
  users/
    [id]/
      page.tsx
  login/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  ui/
  auth-provider.tsx
  header.tsx
  theme-provider.tsx
hooks/
  use-mobile.tsx
  use-toast.ts
lib/
  utils.ts
public/
styles/
  globals.css
next.config.mjs
package.json
pnpm-lock.yaml
```

## Assumptions & Considerations
- User authentication token is stored in local storage.
- Protected routes require authentication.
- API error handling ensures user-friendly error messages.
- Responsive UI using Tailwind CSS.
- Form validation is implemented in login and edit screens.

## Bonus Features (Implemented/Planned)
- [ ] Client-side search and filtering for user list.
- [ ] React Router for navigation.
- [ ] Deployment on a free hosting platform (e.g., Vercel, Netlify).

## Deployment
- Hosted URL: [[URL]](https://user-management-nine-theta.vercel.app/)

## License
This project is open-source and available under the MIT License.

## Contact
For any queries, contact [keshxvdayal@gmail.com] or create an issue in the repository.

