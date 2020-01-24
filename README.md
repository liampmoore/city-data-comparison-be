# Back-end

#### https://citrics-staging.herokuapp.com/

# Auth - /api/auth
#### POST Register  - https://citrics-staging.herokuapp.com/api/auth/register
#### POST Login - https://citrics-staging.herokuapp.com/api/auth/login
#### GET logout - https://citrics-staging.herokuapp.com/api/auth/logout
#### GET Login Google - https://citrics-staging.herokuapp.com/api/auth/login/google
#### GET Login google redirect - https://citrics-staging.herokuapp.com/api/auth/login/google/redirect
#### GET Login linkedin - https://citrics-staging.herokuapp.com/api/auth/login/linkedin
#### GET Login linkedin redirect - https://citrics-staging.herokuapp.com/api/auth/login/linkedin/redirect
#### GET Login Facebook - https://citrics-staging.herokuapp.com/api/auth/login/facebook
#### GET Login Facebook redirect - https://citrics-staging.herokuapp.com/api/auth/login/facebook/redirect


# Users - /api/users 
## User 
#### GET users information by users ID - https://citrics-staging.herokuapp.com/api/users/:id/profile
Give user id in url
#### PUT users information by users ID - https://citrics-staging.herokuapp.com/api/users/:id/profile
Give user id in url


## User's Preferences 
#### GET user preference by user ID - https://citrics-staging.herokuapp.com/api/users/:id/preferences
#### POST new user preference  - https://citrics-staging.herokuapp.com/api/users/:id/preferences

## User's profile image
#### POST image for user  - https://citrics-staging.herokuapp.com/api/users
Requires users ID and a .jpeg or .png file



# Preferences - /api/preferences 
#### GET all user preferences - https://citrics-staging.herokuapp.com/api/preferences
#### GET user preference by preference ID - https://citrics-staging.herokuapp.com/api/preferences/:id
#### DELETE user preference by preference ID  - https://citrics-staging.herokuapp.com/api/preferences/:id
#### PUT user preference by preference ID  - https://citrics-staging.herokuapp.com/api/preferences/:id


# Cities - /api/favs 
#### GET favorite cities for a single user 
#### POST a city to favorites
#### DELETE a city from favorites