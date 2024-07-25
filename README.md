This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The first page to load should be home. however, if you are not logged in it will redirect you to login page from which you can go to register if you are opening the site for the first time.

If you are, just register if successful it will take you to login page and after logging in. It will take you to home page.

## Login

The Login feature is created using PostreSQL and Model Object Prisma ORM:

- It has different models for user, images and videos
- Every update is saved in the Remote database which deployed on render.com
- Login is done using next-auth for better token and payload transfer experience, so that there is not need to send userId etc to front-end
- Backend is handled using api routes provided by NextJS for secure access and verified access.

## FabricJS

The Home page consists of Canvas, gallery and navbar which will help us create, upload and retrieve the data:

- FabricJs has options to create shapes which you can upload as an image. Image will be uploaded to demo public AWS S3 bucket.
- Gallery auto retrieves the items under userID from S3 bucket and displays on the homepage.
- It has Images and Video tab Which shows seperate images and uploaded videos

## Screen Capture

Added functionality to record yourself editing on the canvas: 

- It can reacord anything on the browser not just the canvas.
- It records the file and uploads it to AWS S3 bucket with the associated userID
