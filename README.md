# Brainteasers Web App

This is a beginner project to develop my full-stack skills. Still work to be done here. Components and code blocks need refactoring, some of my backend file structure needs work, and I'm not sure how I feel about the home page styling. All in due time!

Welcome to the Brainteasers Web App! A games site that features several word and math games to challenge and entertain users.

## Technologies Used

- **Frontend:** The frontend of this project is built with Vue using Vue CLI. Both Vue composition API and options API were utilized, for practice purposes.
- **Backend:** The backend is developed using Django and postgreSQL. I'm using the Python whitenoise library efficient serving of static files project-side.
- **Dependencies:** The project includes a `requirements.txt` file in the directory for the backend and a `package.json` file for the frontend.
- **Languages and Frameworks:** The app utilizes the following technologies:
  - JavaScript/Vue
  - Python/Django with /admin functionality
  - CSS/Bootstrap
- **Vue Packages:** Vue Router, Axios, and Simple-Keyboard are utilized in the frontend.
- **Django Packages:** Most notable: sendGrid, whitenoise. See requirements.txt for complete list.
- **API:** The app uses one web API, [DataMuse API](https://api.datamuse.com/words), to fetch words.
- **Relational database:** postgreSQL is used for user data, game scores, and site reviews.

## Features

The Brainteasers Web App offers several exciting features:

1. **Email Client:** The app includes an integrated email client that allows users to send and receive emails within the platform.
2. **User Authentication:** User authentication is implemented to secure user accounts and protect sensitive data.
3. **Game Score Recording:** Users can keep track of their scores and progress in the games.
4. **Reviews:** Users have the ability to leave site reviews, featured on the home page.
5. **Contact Site Administrator:** Allows users to get in touch with the site administrator for inquiries or feedback via SendGrid.

## Installation

To run the Brainteasers Web App locally, please follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies for the frontend using the command `npm install`.
3. Install the required backend packages using `pip install -r requirements.txt`.
4. Start the backend server by running `python manage.py runserver` in the project directory.
5. In a separate terminal, start the frontend development server with the command `npm run serve`.
6. Access the app in your web browser by visiting `http://localhost:8000`, or alternately as instructed in terminal.


## Acknowledgments

This is my first complete site and I have much to learn, any and all feedback is welcome!
You can contact me at TimothyMurphy123@gmail.com
