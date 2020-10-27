# Internship Task

## Problem Statement: To provide a post match summary of cricket matches which were held between multiple teams using REST APIs.​

## Pre-requisites to be installed on your machine to run the project:

1. Python 3.7 
2. Node JS 
3. Yarn
4. pip
 
<hr>

## Steps to run the project on your machine

1. Clone this repository into your local machine by using<br> 
    ```git
    git clone https://github.com/pranjal2410/Internship-Task.git
   ```

* ### Running the Flask server:

1. Create a virtual environment using **python -m venv venv*
2. Activate venv using **venv\Scripts\activate**
3. Install the required python packages using **pip install -r requirements.txt**
4. Navigate to the Internship-Task directory and run the command:
    ```python
    python run.py
    ```
5. Deactivate the virtualenv using **deactivate**.

* ### Starting the frontend React server

1. Navigate to the frontend directory.
2. Run the following command to install dependencies:
    ```yarn
        yarn install
    ```
3. After the node modules are installed, run the following command:
    ```yarn
        yarn start 
   ```


### Database Information

| Table Name                     | Description                          |
| :-----------------------------:  | :--------------------------------    |
|Team  |This table contains all the required information like the team's name, coach's name, captain's name, etc.|
|Match  |This table contains complete information of a match which is related to the Team table via ForeignKey relationship|
|Tournament  |This table allows us to create multiple teams which play in various tournaments which is linked to the table via ForeignKey relationship|



