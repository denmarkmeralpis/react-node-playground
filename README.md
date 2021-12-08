## Requirements
You should have the following: 

- MySQL
- NodeJS

## Installation

Configure your database in `server/index.js`

```yml
# default values

port: 3306,
host: 'localhost',
user: 'root',
password: 'root',
database: 'bbl_development',
socketPath: '/tmp/mysql.sock'
```

For database structure:
```
# Logs table

| name        | datatype     | default             | Description   |
| ----------- | ------------ | ------------------- | ------------- |
| id          | int          |                     | `PRIMARY_KEY` |
| book        | varchar(255) |                     |               |
| borrowed_at | datetime     | `CURRENT_TIMESTAMP` |               |
| borrower    | varchar(255) |                     |               |
| reference   | varchar(255) |                     |               |
| returned_at | datetime     |                     |               |
```

## Usage

`cd` on `client` and `server` folders and run `npm install`. Once done installing the package, run the apps:

For the server or backend run:

```
npm run devStart
```

or

```
npm start
```

and for the client, run:

```
npm start
```

## Todos:
- [ ] Revamp logs schema
- [ ] Modify book borrower logger
- [ ] Login Module(for Librarian)
- [ ] Homepage
- [ ] Book Management
- [ ] User Management
- [ ] Logout Module

### Revamped Schema:

```yaml
# subject to change

Books:
  - title
  - description
  - author
  - created_at
  - updated_at
  - status
User:
  - name
  - role
  - password_salt
  - status
  - created_at
  - updated_at
Logs:
  - borrower_name
  - book_id
  - user_id
  - borrowed_at
  - returned_at
  - status
```
