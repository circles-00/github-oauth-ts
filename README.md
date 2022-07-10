# Typescript component

## Usage

## Import the module
```typescript
import GithubOauthClient from 'github-oauth-ts'
```

### Instantiate the OAuth Client
```typescript
const client = new GithubOauthClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
})
```

## API
### Get AccessToken
Note that you must have the authCode beforehand. You're gonna usually have this code by your front-end application
```typescript
  const accessToken = await client.getAccessToken(authCode)
```

### Get User Info
```typescript
const userInfo = await client.getUserInfo(accessToken)
```
