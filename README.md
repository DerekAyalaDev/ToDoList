# ToDoList Full Stack Application - Backend (Spring Boot) and Frontend (React)

This repository contains two main projects:
- **Backend**: A Spring Boot application (located in the `Backend/` folder).
- **Frontend**: A React application (located in the `frontend/` folder).

## Prerequisites

### Backend (Spring Boot)
- Ensure you have **Java 21** installed.
- Ensure you have **Apache Maven** installed.
- Maven should be available in your system's PATH. You can check this by running:

```bash
mvn -v
```

If Maven is not installed, follow the instructions here to [install Maven](https://maven.apache.org/install.html).

### Frontend (React)
- Ensure you have **Node.js** installed. You can verify the installation by running the following commands:

```bash
node -v
npm -v
```

If Node.js is not installed, you can download it [here](https://nodejs.org/).

## Backend Setup and Run (Spring Boot)

1. Navigate to the `Backend/` directory:

```bash
cd Backend/
```

2. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

3. To run the tests for the backend:

```bash
mvn test
```

4. The backend should now be running on `http://localhost:9090`.

## Frontend Setup and Run (React)

1. Navigate to the `frontend/` directory:

```bash
cd frontend/
```

2. Install the dependencies:

```bash
npm install
```

3. Start the React application:

```bash
npm start
```

4. The frontend should now be running on `http://localhost:3000`.

## Project Structure

```
.
├── Backend/
│   ├── .mvn/
│   ├── src/
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
└── frontend/
    ├── public/
    ├── src/
    ├── .gitignore
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
```

## Notes
- Make sure the backend is running on `http://localhost:9090` and the frontend on `http://localhost:8080` for proper interaction between the two applications.
