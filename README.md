This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Duplicate the `.env.example` file and rename it to `.env`.
2. Run `npm i` to install all dependencies.
3. Run `npm run dev` to start the development server.
4. Run the "Create Payment In" endpoint in Postman.
5. Copy the `uuid` from the response.
6. Go to [http://localhost:3000/payin/{uuid}](http://localhost:3000/payin/{uuid}) and replace `{uuid}` with the `uuid` you copied from the response.
