# CharltonEngineeringProject
## Team 2 - KV6002 project repository




To install git follow this video to the 14:00 mark. You DO NOT need to set up a repository as you will clone this one when the time comes. 
note: you will need to create a github account if you don't have one already. 
https://www.youtube.com/watch?v=J_Clau1bYco 

Once you have got to the 14 minute mark, i recommend installing a program called sublime-merge (it's free.) I've added an image below to help with the instructions.
https://www.sublimemerge.com/download 

![sublime_example](https://user-images.githubusercontent.com/70588090/155856885-34b0b319-6c68-4e55-9065-1eb778ecae93.png)

after you have cloned the files you should see all of the boiler plate files located in the master branch. 

# BEFORE MAKING ANY CHANGES!: 
create a new branch
    - open sublime merge
    - use file> open repository and point it to wherever you cloned the repository to when following the video 
    - * the middle of the top panel of sublime merge it should show you the branch you are currently on, this should be master at this point 
    - one the left panel of sublime it should have "BRANCHES", right click this and choose create branch.
    - enter a name in the dialog that pops up, follow the structure of < YOUR_NAME >_SPRINT (i.e. chris_cranston_01)
    - * you should now see in the middle of the top panel a new branch with whatever name you entered for it *

# MAKING CHANGES: 
assuming you are in your own branch you can make changes by doing the following:
    - Create files, or edit files that are already there using whatever IDE you want, i'm using VSCODE 
    - save the files as usual. 
    - once changes have been made and you are ready to do a commit (you should do this fairly regularly in case you break anything so you can roll back)
    - the right panel on sublime show's changes made to existing files, if a new file has been created it will show untracked files 
    - use stage to stage fore each change you want to commit, this makes them ready to be committed
        NOTE: if you click delete it will make the edit to your files, or remove the file completely.
    - when all of the files you are ready to commit have been staged, enter a commit message at the top left of the right panel
      try to make this a logical message in case you need to roll back i.e. "added button functionality"
    - when you are all ready to commit, click the commit button at the top of the right of the right panel of sublime merge
    - You will now see a (1) at the top middle of the page next to your branch name, this means you have committed the files (which should also be visible in the middle panel of sublime)
    - push the files, use the up arrow in the far right of the top panel of sublime to push your files to the repository. 


# INTEGRATION WEEKS: 
   - when we get to the end of an integration sprint, we will need to integrate the files into the master branch, to do this make sure you have committed and pushed your files (see above)
   - go to github.com, log in and go to the repository. 
   - at the top of the repository page (below the repoistory name) you will see pull requests, click that
   - then click the green button "New Pull Request" at the top right 
   - then using the second drop down box choose your branch. 
        NOTE: this should read as (merge symbol) [base: master] <- [your branch]
   - click create pull request
   - this will open a pull request, and will show you what files are going to be getting merged to the master branch 

   SOMEONE ELSE SHOULD MERGE YOUR BRANCH AFTER THE CHECK IT, DONT CLICK MERGE PULL REQUEST ON YOUR OWN BRANCH 


# AFTER INTEGRATION WEEKS:
I'm recommending we use seperate branches for the weeks second branch, so we are all branching off the same master and moving on to styling, to do this: 
    - open sublime merge
    - on the left panel double click on master to change to that branch (should be bold and change the top middle to master once moved to)
    - click the DOWN arrow at the very top right of sublime, this should pull all of the changes that have been made on the master branch to your local machine. 
    - follow the MAKING CHANGES section above but this time make a new branch with < YOUR_NAME >_SPRINT as the new integration sprint number (i.e. chris_cranston_02)
    - do development as mentioned above and merge requests again as above. 


# SUGGESTIONS:
- Because we will all be hosting our individual stuff seperate from one another during development, don't create an NPM app for react directly in the folder where you have cloned the repository, copy the files out work on them in seperate folder then copy the files your want to commit (src folder / images folder etc...) back into your repository before committing and pushing (we shouldnt be pushing any of the additional folders that come are created with the create-react-app command)
- react log file for if you install any react extensions, the boilerplate code will likely only have the react router dom in there, if you install any that need to be installed for your stuff to work keep a log of it in a file that you commit, maybe REACT_INSTALLS.TXT (this will make it easier for people to replicate your local environment and when it comes round to the demo we can make sure we have everything on whoevers machine we use for demoing)


# HOSTING SUGGESTIONS:
- for hosting the PHP / API side of things, i would suggest you use newnumyspace for now, create a folder called kv6002 directly under your public_html folder, if we all keep this the same it will make it easier for us all to test eachothers stuff / help with any issues. 
- as mentioned above for the react side of things i recommend having a seperate folder you work in for react, you should only need the contents of the src folder to be uploaded when the time comes, i'll do a brief intro to setting up react below. 




# REACT PREP:
   - Install node :You will need to install software called 'node'. This can be downloaded and installed from here: https://nodejs.org/en/
   - Create a folder : this will be where you have your work on your local computer, can be anywhere
   - Use powershell to go to that folder : open powershell then use the command 
        cd "folder/location/on/local/machine"
   - create the app: use the following command to create the app 
        npx create-react-app FOLDER_NAME_YOU_MADE
   - install react router dom (and any other that need to be installed based on other peoples work)
        npm install react-router-dom
   - move into the folder containing the react files 
        cd FOLDER_NAME_YOU_MADE
   - start the app 
        npm start 
        (this will open a browser page to http://localhost:3000/ , any changes made to the files inside of the app will automatically update the webpage.)
   - Quit app: Ctrl+c


# SQLite:
The boilerplate code will have the databse we designed with some initial values in but if you need to add any values or change anything you will need to use sqllite:
- Instructions from semester 1 web : https://gist.github.com/johnrooksby/407429440a687eb3da0a62d354890743
- installation video : https://www.youtube.com/watch?v=wXEZZ2JT3-k
- usage video :  https://www.youtube.com/watch?v=HQKwgk6XkIA 



