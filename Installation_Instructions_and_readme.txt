Team 2 - Supervisor: Jill Bradnum 
-----------------------------------
Chris Cranston - W18018468
Matthew Dawson - W18002221
Kess Strongman - W18011712
Christopher Ewart - W18012997
Stephen Campbell - V09016986 (removed self from group during easter)



-- System Access --

- The live system is available to view at:
https://charltonengineeringdemo.com/
- There are no logins required to use / demo the system. 

- The github used throughout the project can be found here, it has been made public as of 27/04/2022, no further commits were made by teammembers beyond this date.:
https://github.com/ChrisCranston/CharltonEngineeringProject

- An example API endpoint can be seen at:
https://charltonengineeringdemo.com/kv6002/php/customerquery?tabletoget=clientType

- Due to the security implemented into the system it is not possible to directly view other API endpoints without using
  the website itself. 

- Access to the live databse is possible by logging in to the hostgator account, this hostgator account has been made specifically
  for this project to demo to the university and client, it will not be the live system and all personal details / bank details have been removed.
  The DB can be viewed at:
https://portal.hostgator.com/login

- Using the following details:

-------------------------------------------------
|Username                  | Password            |
-------------------------------------------------
|sheffizleism2@gmail.com   | charltonEngineering |
-------------------------------------------------

- The database in use can then be observed by selecting:
'Launch cPanel' -> 'phpMyAdmin' -> Then selecting 'charlemo' in the left panel.

- Database files can be viewed directly in /DB/ folder once unzipped.




-- Local installation instructions --

- Due to formatting the application to be hosted on hostgator (the same hosting system as the clients existing website)
  it is not possible to host the PHP files locally without modification. It is possible to host the react 
  files locally with the following instructions without modifying files, be aware any entries to the database will be reflected in the live demo system @ https://charltonengineeringdemo.com/: 

1) Install Node on local machine: This can be downloaded and installed from here: https://nodejs.org/en/
2) Create a folder : this will be where you have your work on your local computer, can be anywhere
3) Use powershell to go to that folder : open powershell then use the command * cd "folder/location/on/local/machine"
4) Create the app: use the following command to create the app * npx create-react-app FOLDER_NAME_YOU_MADE
5) Install the following react packages using the format by pasting them into powershell:
	- npm install react-router-dom
	- npm install jwt-decode
	- npm install qrcode.react
	- npm install react-to-print
	- npm install react-modal --force
	- npm install modern-react-qr-reader --force
	- npm install google-maps-react@2.0.6
	- npm install react-twitter-embed
	- npm install @fortawesome/free-solid-svg-icons
	- npm install @fortawesome/react-fontawesome
	- npm install prop-types
	- npm install react-toastify
6) Copy the files from /react/ in the submission zip after unzipping into [FOLDER_CREATED_IN_STEP_2]/src
7) Copy the package.json file (optional, will not impede local performance of the system)
8) Run the application with the command 'npm start' (this will open a window in a local browser)
NOTE: any edits / additions performed will add entries to the live databse and will be visible on the live system, please use values that are easily
      identifiable during the demo. 



- To host the database locally, upload the files found in /DB/ to newnumyspace-phpmyadmin. 
- Host the PHP files via newnumspace inside of /public_url/[FOLDER LOCATION]
- Changes will then need to be made to address the local database. This can be done by changing the following files:
	1) config.php Ln:18 (inside of /php/ folder)
		- define('LOCAL_BASEPATH', '/kv6002/php');
		  change to: define('LOCAL_BASEPATH', '[NEWNUMYSPACE_URL+FOLDER LOCATION]');
		  for example: define('LOCAL_BASEPATH', 'https://unn-w18018468.newnumyspace.co.uk/kv6002/php/');
	2) url.js Ln:1 (inside of /react/components/)
		- const URL = "https://charltonengineeringdemo.com/kv6002/php/";
		  change to: const URL = "[NEWNUMYSPACE_URL+FOLDER LOCATION]";
		  for example: const URL = "https://unn-w18018468.newnumyspace.co.uk/kv6002/php/"

- Once these files have been changed you will need to restart the react with `npm start`






* if any issues occur with hosting the DB files locally please contact Chris @ chris.cranston@northumbria.ac.uk .


