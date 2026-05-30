# Contact Email Backend

This server receives enquiries from the React contact form and sends them to your business email.

## Setup

1. Copy `.env.example` to `.env`.
2. Put your real email values in `.env`.
3. Install server packages:

```bash
npm install
```

4. Start the backend:

```bash
npm run dev
```

The API runs at:

```txt
http://localhost:5000/api/contact
```

## Gmail Note

For Gmail, use an app password instead of your normal Gmail password.

`SMTP_FROM`, `SMTP_USER`, and `BUSINESS_EMAIL` can usually be the same email address.
