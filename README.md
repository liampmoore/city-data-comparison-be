# Back-end

#### https://citrics-io.herokuapp.com/

https://dev.to/christse/how-to-use-heroku-postgresql-for-local-development-with-knex-js-54kp

# Auth - /api/auth
#### POST Register  - /api/auth/register
#### POST Login - /api/auth/login
#### GET logout - /api/auth/logout
#### GET Login Google - /api/auth/login/google
#### GET Login google redirect - /api/auth/login/google/redirect
#### GET Login linkedin - /api/auth/login/linkedin
#### GET Login linkedin redirect - /api/auth/login/linkedin/redirect
#### GET Login Facebook - /api/auth/login/facebook
#### GET Login Facebook redirect - /api/auth/login/facebook/redirect


# Users - /api/users 
## User 
#### GET users information by users ID - /api/users/profile/:id
Give user id in url
#### PUT users information by users ID - /api/users/profile/:id
Give user id in url


## User's Preferences 
#### GET user preference by user ID - /api/users/:id/preferences
#### POST new user preference  - /api/users/:id/preferences

## User's profile image
#### POST image for user  - /api/users
Requires users ID and a .jpeg or .png file
#### DELETE image for user - /api/users/profile/:id/image
Requires users ID 
#### GET image for user - /api/users/profile/:id/image
Requires users ID


# Preferences - /api/preferences 
#### GET all user preferences - /api/preferences
#### GET user preference by preference ID - /api/preferences/:id
#### DELETE user preference by preference ID  - /api/preferences/:id
#### PUT user preference by preference ID  - /api/preferences/:id


# Cities - /api/users/favs 
#### GET favorite cities for a single user - /api/users/favs/:id
Requires users ID

#### POST a city to favorites - /api/users/favs/:id
Requires users ID

#### DELETE a city from favorites - /api/users/favs
Requires table ID

### .env variables
GOOGLE_CLIENT

GOOGLE_SECRET

LINKEDIN_CLIENT

LINKEDIN_SECRET

FACEBOOK_CLIENT

FACEBOOK_SECRET

SESSION_COOKIE_KEY

SECRET_MESSAGE
