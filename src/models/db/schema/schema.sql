DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (id),
  roles_id INT REFERENCES roles (id)
);