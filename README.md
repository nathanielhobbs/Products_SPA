The file structure is as follows:

/app                    <!-- all our files for the node components (e.g. routes and models) -->
  /models       
/config                 <!-- all our configuration stuff will go here -->
  database.js 
/public                 <!-- this will hold all the files for the frontend (Angular Application stuff) -->
  /css
  /js
    /controllers
    /images
    /services
   productsApp.js       <!-- the angularjs code for our web app -->
  /views
  index.html            <!-- the main view -->
package.json            <!-- the npm configuration to install whatever depenedencies/models are needed for nodejs -->
server.js               <!-- the node configuration file -->     
README.md               <!-- the readme file -->


upon cloning, make sure to run "npm install" from the main directory to install all the dependencies.
