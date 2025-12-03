# User Component - Refactored Structure

## Overview
The User component has been refactored to match the Profile component structure with modular, maintainable files.

## File Structure

```
User/
├── User.jsx                    # Main component (simplified)
├── User_Old_Backup.jsx         # Backup of original file
├── UserSkeleton.jsx            # Loading skeleton
├── UserHeader.jsx              # Hero section with avatar & follow button
├── UserStats.jsx               # Stats cards component
├── UserTabs.jsx                # Tabbed portfolio section
└── README.md                   # This file
```

## Components

### User.jsx (Main)
- **Purpose**: Main container component
- **Responsibilities**:
  - State management
  - Fetch user data from API
  - Check follow status
  - Handle follow/unfollow logic
  - Modal handling
  - Orchestrating sub-components
- **Size**: ~250 lines (down from 400+)

### UserSkeleton.jsx
- **Purpose**: Loading state UI
- **Shows**: Skeleton placeholders while user data loads
- **When**: Displayed during API fetch

### UserHeader.jsx
- **Purpose**: Hero section
- **Contains**:
  - Cover image
  - Profile avatar
  - Follow/Following button (dynamic)
  - Share button
- **Props**: `user_`, `coverGradient`, `ifol`, `ifoli`, `my_fun`, `check`

### UserStats.jsx
- **Purpose**: Display user statistics
- **Contains**:
  - Projects count
  - Followers count (clickable)
  - Following count (clickable)
- **Props**: `project_`, `followers`, `following`, `onFollowersClick`, `onFollowingClick`

### UserTabs.jsx
- **Purpose**: Tabbed portfolio sections
- **Contains**:
  - Tab navigation
  - Projects tab (read-only)
  - Education tab
  - Experience tab (with fresher support)
  - Skills tab
  - Certifications tab
- **Props**: `activeTab`, `setActiveTab`, `user_`, `project_`, `backend_url`, `state`

## Key Differences from Profile Component

1. **Follow Button**: Shows Follow/Following/Follow Back based on relationship
2. **Read-Only Projects**: User can't edit other user's projects
3. **No Profile Completion**: Doesn't show completion tracker
4. **No Upload Button**: Can't upload projects on other user's profile
5. **API Fetch**: Fetches user data from `/auser` endpoint
6. **Follow Status Check**: Checks relationship with `/checkfollow` endpoint

## Benefits

1. **Consistency**: Matches Profile component structure
2. **Maintainability**: Each component has a single responsibility
3. **Reusability**: Components can be reused
4. **Readability**: Smaller, focused files
5. **Scalability**: Easy to add features

## Usage

```jsx
import User from './User/User';

// Use in your app with route parameter
<Route path="/user/:user_id" element={<User />} />
```

## Props Flow

```
User (Main)
├── UserSkeleton (if loading)
└── (if loaded)
    ├── UserHeader (with Follow button)
    ├── UserStats
    ├── UserTabs
    │   ├── ProjectsTab (read-only)
    │   ├── EducationTab
    │   ├── ExperienceTab
    │   ├── SkillsTab
    │   └── CertificationsTab
    └── FollowListModal
```

## API Endpoints Used

- `POST /auser` - Fetch user details and projects
- `POST /checkfollow` - Check follow relationship status

## Shared Resources

- Uses `../Profile/Profile.css` for styling
- Uses `../Profile/utils/profileHelpers.js` for helper functions
- Shares same UI components (FollowListModal, Follow, Project)
