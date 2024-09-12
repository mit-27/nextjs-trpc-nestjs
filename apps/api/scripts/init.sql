CREATE TABLE posts (
  id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  createdAt timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);

CREATE TABLE users (
  id text PRIMARY KEY,
  name text,
  email text UNIQUE NOT NULL,
  emailVerified boolean,
  image text,
  createdAt timestamp with time zone NOT NULL DEFAULT NOW(),
  updatedAt timestamp with time zone,
  CONSTRAINT users_id_unique UNIQUE (id),
  CONSTRAINT users_email_idx UNIQUE (email)
);
