# SouthTrack React Application
<img width="1438" alt="Screenshot 2023-10-03 at 18 04 43" src="https://github.com/audiprevio/southTrackReactv001/assets/126348614/7886e849-4752-4bfd-9583-122c7efb7b56">

### Welcome to SouthTrack v.0.0.1a (Alpha) documentation. SouthTrack is a React and LeafletJS-based GUI for Latitude Longitude Penguin Tracker API.

### Livelink: [south-track.netlify.app](https://south-track.netlify.app)

## Tech Stack

SouthTrack employs a robust tech stack to provide a reliable and efficient solution:

-   React: The core framework for building the user interface.
-   React Router: For handling client-side routing and navigation.
-   LeafletJS: A library for creating interactive maps.
-   Ant Design: A design system and UI library for React applications.
-   TypeScript: To enhance code quality and maintainability.
-   Yup: A schema validation library for form validation.
-   fetch API: For making HTTP requests to interact with the server.

## Layout

SouthTrack features a user-friendly layout designed to display penguin tracking data seamlessly. It consists of two main components: a map for visualizing penguin locations and a navigation panel for user interaction.

## Main Components

### MapComponent

The `MapComponent` is responsible for rendering the map and displaying penguin markers. It interacts with the LeafletJS library to provide an interactive mapping experience. Penguins are represented as markers on the map, with additional information available in pop-up windows. This component also handles fetching penguin data from the server.

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ... (MapComponent code) `
```

### PublicLayout

The `PublicLayout` component serves as the layout for public pages. It combines the map and navigation panel, ensuring an integrated user experience. This component is responsible for user authentication and redirection to the login page when necessary.

```tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (PublicLayout code)`
``````

### LoginForm

The `LoginForm` component handles user login. Users can input their username and password to access the application. Upon successful login, a JSON Web Token (JWT) is stored in local storage, allowing access to protected routes.

```tsx

import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Card, message, Form as AntForm, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

// ... (LoginForm code)`
``````

### RegisterForm

The `RegisterForm` component allows users to register as administrators. It collects user information, including username, employee ID, password, and role. Upon successful registration, users can log in using their credentials.

```tsx

import React, { useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Card, message, Form as AntForm, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

// ... (RegisterForm code)
```

### UpdatePenguinModal

The `UpdatePenguinModal` component provides a modal for updating a penguin's movement. Users can input the latest position, and the component sends a PUT request to update the data on the server.


```tsx
import React from 'react';
import { Modal, Button, Input, message, Divider } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// (UpdatePenguinModal code)
```

### Logic Flow
----------

1.  Upon loading, the `MapComponent` initializes the map and fetches penguin data from the server.

2.  Penguin data is displayed as markers on the map, and additional information is available in pop-up windows.

3.  The `PublicLayout` component handles user authentication. If a user is not authenticated (no JWT token), they are redirected to the login page.

4.  Users can access the navigation panel to interact with the application. Navigation includes viewing the penguin list, adding new penguins, and logging out.

5.  The `LoginForm` and `RegisterForm` components manage user authentication and registration, communicating with the server using the fetch API.

6.  The `UpdatePenguinModal` component provides a modal for updating a penguin's movement. Users can input the latest position, and the component sends a PUT request to update the data on the server.

These components collectively form the SouthTrack project. Refer to this documentation for detailed insights into their functionality and usage.

## Project Structure

The project is structured into several directories and files, each serving a specific purpose:

- `src/`: This is the main directory where all the source code of the application resides.
  - `App.tsx`: This is the main component of the application.
  - `Containers/`: This directory contains container components which are responsible for managing and passing down the state to other components.
  - `Layouts/`: This directory contains layout components which are used to maintain a consistent layout across different pages.
  - `Pages/`: This directory contains components for different pages of the application.
  - `assets/`: This directory contains static assets used across the application.
  - `components/`: This directory contains reusable components that can be used across different parts of the application.
  - `config.ts`: This file contains configuration related to the application.
  - `main.tsx`: This is the entry point of the application.
  - `tests/`: This directory contains test files for different components of the application.

- `public/`: This directory contains public assets that are accessible in the public URL.

- `package.json`: This file contains the list of package dependencies for the project.

- `tsconfig.json`: This file is used to specify the roots files and the compiler options required to compile the project.

- `.env`: This file is used to define environment variables.

- `.gitignore`: This file specifies the files and directories that are ignored by Git.

- `README.md`: This is the file you are currently reading. It provides an overview of the project.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/username/southTrackReact.git`
2. Navigate into the directory: `cd southTrackReact`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`

## Testing

To run the tests, use the following command: `npm test`

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
