# SaucedemoUiPlaywrightTests

UI tests for Saucedemo using Playwright

# Saucedemo UI Playwright Tests

## Overview

This project is a UI automation framework for [Saucedemo](https://www.saucedemo.com) built with [Playwright](https://playwright.dev).  
It follows modern test architecture principles, including the Page Object Model (POM) for maintainability and scalability.

## Technologies Used

- **Playwright** – Fast, reliable end-to-end testing for web apps.
- **TypeScript** – Strongly typed language for robust test code.
- **Page Object Model** – Encapsulates page interactions for reusability.
- **GitHub Copilot** – Used for educational purposes and experimentation with AI-assisted coding.
- **Playwright MCP** – Enables AI-powered test generation and iteration via custom prompts.

## Project Structure

/pages → Page Object Models (LoginPage, InventoryPage, BasePage) /models → Data models (ProductModel) /enums → Enums for sorting, etc. /tests → Test specifications /test-data → Test user data /screenshots → Screenshots from test runs /playwright-report → HTML test reports

## How to Run Tests Locally

1. **Install dependencies:**

   ```shell
   npm install
   ```

2. **Run all tests (headed mode):**

   ```shell
   npx playwright test
   ```

3. **View HTML report after test run:**
   ```shell
   npx playwright show-report
   ```

## Running Tests by Category

You can run tests by category using CLI options. This is useful for executing only smoke, regression, or other tagged tests:

**Example:**

```shell
npx playwright test --project=qa-chrome --grep "@smoke"
```

Replace `@smoke` with any tag used in your tests (e.g., `@regression`).

This allows targeted test runs for faster feedback and focused validation.


## Running Playwright Tests in Docker

### 1. Requirements
To run tests in Docker, you need:

- **WSL 2** (Windows Subsystem for Linux) or any Linux environment
- **Docker Engine** installed in Linux/WSL
- Cloned project repository with the tests

### 2. Commands to Run Tests
In the terminal, execute:

1. Navigate to the project root:
   ```bash
   cd path/to/project
   ```

2. Build the Docker image and start the container with tests:
   ```bash
   docker compose up --build
   ```

3. To run tests using the existing image without rebuilding:
   ```bash
   docker compose up
   ```

4. To stop the tests:
   ```bash
   docker compose down
   ```

Test Report Location:
After the run, check your results here:
```
./playwright-report/index.html
```

## Notes

All tests are atomic and business-readable.
Page Objects encapsulate locators and user actions.
Screenshots and HTML reports are generated automatically.
GitHub Copilot is leveraged for learning and rapid prototyping.
