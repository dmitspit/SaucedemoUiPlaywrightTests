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
   npm install

2. **Run all tests (headed mode):**
   npx playwright test

3. **View HTML report after test run:**
   npx playwright show-report

## Notes

All tests are atomic and business-readable.
Page Objects encapsulate locators and user actions.
Screenshots and HTML reports are generated automatically.
GitHub Copilot is leveraged for learning and rapid prototyping.
