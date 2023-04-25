# Gamajun Client Application

![Logo](public/logo.png)

The Gamajun Client Application is a part of the Gamajun BPMN testing system.

The Gamajun Client Application is specifically designed for educators who are teaching BPMN modeling.
This application aims to facilitate an interactive learning experience by offering a comprehensive system to train and verify the knowledge of BPMN diagrams.
Instructors can use this tool to create engaging lessons that reinforce students' understanding of business process modeling and notations, while students can benefit from a hands-on approach to mastering the intricacies of BPMN diagrams.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Requirements
- Node.js 14.18.0 or newer
- MacOS, Windows (including WSL), and Linux are supported

## Installation
### Local Installation
1. Clone the repository ```git clone git@github.com:pan-sveta/gamajun-client.git```
2. Install dependencies ```yarn install```
3. Configure environment variables (see [Environment Variables](#environment-variables))
4. Run the development server ```yarn dev```

### Docker Installation
1. Clone the repository ```git clone git@github.com:pan-sveta/gamajun-client.git```
2. Configure environment variables (see [Environment Variables](#environment-variables))
3. Build the image ```docker build -t gamajun-client .```
4. Run the container ```docker run -p 3000:3000 gamajun-client```

## Environment Variables
The following environment variables are required to run the application:

- OAUTH2_CLIENT_ID - the client ID of the OAuth2 client
- OAUTH2_CLIENT_SECRET - the client secret of the OAuth2 client
- OAUTH2_PROVIDER_URL - the URL of the OAuth2 provider
- NEXTAUTH_URL - the URL of the Gamajun Client Application
- NEXTAUTH_SECRET - the secret used to encrypt the session cookie
- NEXT_PUBLIC_GAMAJUN_API_URL - the URL of the Gamajun API server
