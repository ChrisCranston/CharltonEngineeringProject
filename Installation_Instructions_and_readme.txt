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

- The github used throughout the project can be found here, it has been made public as of 27/04/2022, no further commits were made by team members beyond this date:
https://github.com/ChrisCranston/CharltonEngineeringProject

- An example API endpoint can be seen at:
https://charltonengineeringdemo.com/kv6002/php/customerquery?tabletoget=clientType
- Due to the security implemented into the system it is not possible to directly view other API endpoints without using
  the website itself. 

- Access to the live database is possible by logging in to the hostgator account, this hostgator account has been made specifically
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

- Alternatively database files can be viewed directly in /DB/ folder once unzipped.





-- Recreating system -- 

- It is possible to view the react side of the application locally while still addressing the hosted database without modifying any files, 
  be aware any entries to the database will be reflected in the live demo system @ https://charltonengineeringdemo.com/
  To host the react locally use the following instructions:

((react setup))
1) Install Node on local machine: This can be downloaded and installed from here: https://nodejs.org/en/
2) Create a folder: this will be where you have your work on your local computer, can be anywhere
3) Use powershell to go to that folder: open powershell then use the command * cd "folder/location/on/local/machine"
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

((react run))
1) Copy the files from /react/ in the submission zip after unzipping into [FOLDER_CREATED_IN_STEP_2]/src
2) Copy the package.json file (optional, this will not impede local performance of the system)
3) Run the application with the command 'npm start' (this will open a window in a local browser)
NOTE: any edits / additions performed will add entries to the live database and will be visible on the live system, please use values that are easily
      identifiable during the demo. 
NOTE: Ctrl+c to stop the running of the app.
NOTE: local react instance can be found by going to localhost:3000 in a browser.


((PHP and DB recreation setup))
- To manually host the database and php files, an application such as newnumspace or XAMPP needs to be used and some small file changes are required to point
  to the new set-up. The instructions below are based on hosting the php files on newnumyspace.co.uk (university account) and database files on phpmyadmin (university account):

  STEP 1: Database files found in /DB/ should be imported to phpmyadmin. This can be done with the following steps:
	1) go to php my admin: http://phpmyadmin.newnumyspace.co.uk/.
	2) login with username : unn_[university_id_number] (i.e. unn_w18018468).
	   and password: [newnumyspacepassword].
	3) create a database in the left panel, or use an existing database. Take note of the name as it will be used later. 2 separate databases can be created or the files can be loaded into one. 
	4) select the database in the left panel.
	5) using the 'import' button from the top panel, upload the files and follow prompts, default values will work.

  STEP 2: Edit the files to target the new DB and php files by changing the following 2 files:
	1) config.php LN:18 onwards (inside of /php/config/ folder)
		define('LOCAL_BASEPATH', '/kv6002/php/'); <--- change second parameter to the subfolder after public_html on newnumspace, explained further in next step.
		define('DATABASE', 'charlemo_CES'); <--- change second parameter to the name of the database created in the step above (both can be uploaded to the same database or individual, if individual this address the *_CES file).
		define('CUSTOMER_DATABASE', 'charlemo_CESCUST'); <--- change second parameter to the name of the second database created in the step above (if the same name was used for the *_CESCUST file, use the same database name here).
		define('DB_USER', 'charlemo'); <-- change second parameter to your username for newnumyspace / phpmyadmin typically unn_[university_id_number] .
		define('DB_PASS','charltonEngineering'); <--- change second parameter to the password for newnumyspace / phpmyadmin.
		define('DB_HOST','localhost'); <--- shouldn't require changing unless a different hosting service has been used.

	2) url.js LN:1 (inside of /react/components/ folder)
		const URL = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/"; <-- change to newnumsapce address, for example: http://unn-w18018468.newnumyspace.co.uk/kv6002/php/, change unn-w18018468 to your [university_id_number] (this may change if STEP 3 folder structure is not used.
		


  STEP 3: The edited php files should then be uploaded to newnumspace, for ease it's recommended to upload into /[username]/public_html/kv6002/php/  (i.e. /w18018468/public_html/kv6002/php/) which will mean the LOCAL_BASEPATH does not need changing.

  STEP 4: complete the ((react run)) steps mentioned above, if the react is already running and the new url.js file is copied in it will automatically update and the website will need to be refreshed.





* if any issues occur with hosting the DB files locally, please contact Chris: chris.cranston@northumbria.ac.uk .


