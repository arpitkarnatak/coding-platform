# Coding Platform

## Demo
https://github.com/user-attachments/assets/fbefde8d-703c-4e1a-b6f6-170d79ee8091


## Design Choices

### Zustand 
(TLDR: Personal preference)
Redux has a lot of boilerplate for a personal project. Zustand is lightweight, easy to get started with.

### Serverless Functions
`NOTE FOR NEW DEVS: ALWAYS RUN ARBITRARY CODE IN A SANDBOX ENVIRONMENT,NOT ON YOUR REAL MACHINE.`

For a sandbox environment, we could either send our code to some VM running Python (or even a docker container)
Since the code execution time is quite small for running the code (Max timeout is ~5 seconds for the code) we can use serverless to cut down on hardware costs.

`NOTE 2: Do not use serverless functions for long running functions`

#### Why Appwrite functions
(Not a paid post) They were the simplest to get started with, and free (no credit card required).
Vercel functions could be used too, but I was needed a Python runtime.

Alternatives include AWS Lambda and Cloudflare Worker (they have generous free tiers but will require a card), and Open Source alternatives are OpenFaas or Nuclio (the setup was proving to be a hassle).

## Next Steps

1. Add Clerk Authentication (halfway done with the PR) for tracking user progress.
2. Adding Submissions table for tracking submissions.
3. Checking for stats like time and memory of the code.
4. Maybe a GUI for adding new problems

## Instructions to build locally

1. Clone the repository.
2. Start the postgres db instance using `docker compose up -d`
3. Head to the directory `/coding-platform`, install dependencies with `npm install`
4. Run the migrations with `npx prisma db push` and fill the database with the command `npm run seed-db`.
5. Add the following variables to your `.env` 
```.env
DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
APPWRITE_FUNCTION_ENDPOINT=<GET FROM APPWRITE FUNCTIONS CONSOLE>
```
6. Run it with `npm run dev`

## Instructions for setting up Appwrite

1. Create an application on Appwrite, and create a Function. Set the location of the function to `./coding-platform/appwrite/main.py`
2. On your console, use the following commands to work with the serverless function locally (install appwrite cli with `npm i appwrite-cli@latest`
3. `npx appwrite init` and then link to existing project. The function would be pulled from Appwrite console.
4. `npx appwrite run functions --port 8000` to start the local server. You can use `APPWRITE_FUNCTION_ENDPOINT=http://localhost:8000` in the env while running this.


