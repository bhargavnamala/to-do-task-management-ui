# to-do-task-management-ui

A Vue.js-based To-Do Task Management UI designed to provide a clean and responsive user experience.

The application handles task creation, updates, deletion, state management, and communicates with an external API for data storage and retrieval.



How to Run the Project

1\. Start the API



Run your backend API locally and copy its base URL.



2\. Open the Project in VS Code



Open the project folder in Visual Studio Code.



3\. Configure the API Base URL



Open the file: .env.local



Update the value of:



VITE\_API\_BASE\_URL=https://localhost:7051/api





Replace it with the actual URL of your running API.



4\. Run the Application



Use the following command to start the development server:



npm run dev





The app will start on http://localhost:5173 (default Vite port).





Assumptions



The API is already running locally and accessible through the URL provided.



No authentication or user system exists—every request is anonymous.



A simple flat list is sufficient (no nested tasks, subtasks, or categories).



Network reliability is normal (no offline mode required).



API responses follow a standard structure: JSON with id, title, description, isCompleted.





Future Enhancements (UI)



Feature				Description

User authentication		Login, register, JWT-based auth

Task Filtering \& Search		Filter by status, date, category

Pagination / Infinite 		Scroll	For large datasets

Dark mode			Theme toggle

Drag \& Drop task sorting	Improve UX for task prioritization

Task categories / projects	Organize tasks into groups

Offline mode			Using local storage or IndexedDB

PWA support			Installable app with push notifications

Improved animations		Page transitions and task state animations







