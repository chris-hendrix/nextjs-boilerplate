# Next.js Boilerplate

### Description
A Typescript boilerplate web project using [Next.js](https://nextjs.org/) (App Router) and [Tailwind](https://tailwindcss.com/), and [Postgres](https://www.postgresql.org/). User authentication (username/password) has been set up using [NextAuth.js](https://next-auth.js.org/). 

This boilerplate contains:
- 🔑 User auth and session management using [NextAuth.js](https://next-auth.js.org/)
- 👪 ORM using [Prisma](https://www.prisma.io/)
- 📄 A user signup page, sign in page, and user list page using [React](https://reactjs.org/), [Tailwind](https://tailwindcss.com/), and [Daisy UI](https://daisyui.com/) 
- 🌍 State management using [Redux RTK query](https://redux-toolkit.js.org/rtk-query/overview)
- ✅ CI/CD using [Github Actions](https://github.com/features/actions)
- 💻 E2E testing using [Cypress](https://www.cypress.io/)
- 🤡 Unit testing using [Jest](https://jestjs.io/)

Note that [SSR](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering) is not included in this boilerplate as it is not really applicable user authentication (which uses redux to update state). Feel free to add SSR to your own pages though!

### Installation
1. Install [Node LTS](https://nodejs.org/en/)
2. Install [Docker](https://www.docker.com/)
3. Clone this repo
4. Create the following `.env` file
```
# testing
TEST_PREFIX=<anything>

# next-auth
SECRET=<anything>

# database
POSTGRES_HOSTNAME=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
```
5. Run the following in the root directory
```
npm run install
npm migrate
```
6. For [automatic tagging](https://github.com/anothrNick/github-tag-action), allow read and write permissions for workflows in your github repo's Settings > Actions > General > Workflow permissions section.

### Start locally
The following command will containerize, build, and start the database, backend, and frontend
```
npm run up
npm run dev
```

### Deploying to Vercel
1. Create a new project in [Vercel](vercel.com)
   - The install command should be overridden to be `npm install && npm run migrate`
2. Import your Git Repository
3. [Setup your Vercel Postgres database](https://vercel.com/guides/nextjs-prisma-postgres#step-2:-set-up-your-vercel-postgres-database)
4. Set a `DATABASE_URL` Environment Variable to be the connection string under the Storage Tab > <your_database> > Quickstart Section > psql (just the portion in the quotes)
5. Redeploy
