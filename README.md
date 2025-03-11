# Scratch Quest Solutions

Welcome to the official repository of **Scratch Quest Solutions**. This project is a dynamic and customizable website built using Angular SSR and Strapi CMS. The codebase is still in development, but it aims to provide an easily editable site configuration, images, texts, and more.

## Overview

Scratch Quest Solutions is designed to be the home page and main page of our company. It leverages the power of Angular for server-side rendering (SSR) and Strapi CMS for content management, making it a robust and flexible solution for our needs.

### Key Features

- **Angular SSR**: Ensures fast load times and improved SEO by rendering pages on the server.
- **Strapi CMS**: Provides a user-friendly interface for managing content, including images, texts, and configurations.
- **Responsive Design**: The site is fully responsive, ensuring a seamless experience across all devices.
- **Customizable**: Easily update site content without touching the codebase.

## Project Structure

The project is divided into two main parts:

1. **sqs-client**: The Angular application that handles the frontend and server-side rendering.
2. **sqs-strapi-cms**: The Strapi CMS backend that manages the content.

## Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 6.0.0)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/scratch-quest-solutions.git
    cd scratch-quest-solutions
    ```

2. Install dependencies for both the Angular client and Strapi CMS:

    ```sh
    cd sqs-client
    npm install
    cd ../sqs-strapi-cms
    npm install
    ```

### Development

#### Angular Client

To start the Angular development server, run:

```sh
cd sqs-client
npm start
```

Navigate to `http://localhost:4200/` to see the application in action. The application will automatically reload if you change any of the source files.

#### Strapi CMS

To start the Strapi development server, run:

```sh
cd sqs-strapi-cms/scratchquestsol
npm run develop
```

Navigate to `http://localhost:1337/admin` to access the Strapi admin panel.

### Building

To build the Angular application for production, run:

```sh
cd sqs-client
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running in Production

To serve the Angular SSR application in production, run:

```sh
cd sqs-client
npm run serve:ssr
```

The server will start on `http://localhost:4000/`.

## Contributing

We welcome contributions to improve this project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Angular](https://angular.io/)
- [Strapi](https://strapi.io/)

---

**Note**: This project is still in development. Stay tuned for more updates and features!
