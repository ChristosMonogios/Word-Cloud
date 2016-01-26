# Word-Cloud
This repository contains a web application which creates and presents random sized [word clouds](https://en.wikipedia.org/wiki/Tag_cloud) and their meta information. The size and the color of a word varies based on the popularity of the word.

You can find the application online hosted on heroku: http://customwordcloud.herokuapp.com/. During the first request the page is going to load slower since the heroku dyno sleeps after a while of inactivity.
The online version uses MongoDB as database. Continue reading and you will see why I mention that.

The page passes the W3 validation tests with no errors: https://validator.w3.org/nu/?doc=http%3A%2F%2Fcustomwordcloud.herokuapp.com%2F

## Technologies used
- IDE: Visual Studio code
- Backend: Node v4.2.6 with Express
- Database: MongoDB
- Frontend: 
 - JavaScript: plain JavaScript code with no external library dependencies
 - CSS: Dependency to Bootstrap. The Bootstrap file is customized. Only the used components are contained in the file.

## Browser support
The JavaScript code uses only ECMAScript 5 features, making the application fully functional in old and new browsers. The application was also tested against the following browsers:
- IE6, IE7, IE8, IE9, IE10, IE11, IEedge
- Chrome
- Firefox
- Safari
- Opera

## How to start the application
0. Navigate to the root folder of the project.
1. Install the npm dependencies using *npm install*.
2. There are two ways to receive the content of the topics.json file in the client:
 - From a MongoDB collection.
 - From the json file itself.
3. If you want to use the database do the following steps:
 - Install MongoDB, if you don't already have it on your computer.
 - On the command prompt type the command that follows. **Important:** Use the *topicsMongo.json* file provided on the **root** folder of the repository. The reason is, that the topics array has been removed from the file so that the topics are structure on the top hierachy of the collection inside Mongo. If you do not want to define a relative path, put the file under the *C:\Users\UserName* which is the default place where Mongo will search (of course this counts only for Windows users).
 The command will create a *wordCloud* database with a *topics* collection. The application is already parametrized to query this database.
 ```
 mongoimport --db wordCloud --collection topics --type json --file topicsMongo.json --jsonArray
 ```
 More information about this command can be found [here](http://zaiste.net/2012/08/importing_json_into_mongodb/)
 - Uncomment the code for *Option 1* in the *routes/index.js* file inside the *router.get('/topics', function(req, res, next)* function.
 - Comment the code for *Option 2* in the same function
 - Start Mongo by running the *mongod* command in the command prompt.
4. If you want to use the topics.json file directly, then you can start the application without any code change. This is the default way.
5. Start node and navigate to http://localhost:3000
6. The page with the word cloud is loaded.
7. Click on a word and the meta information is presented on the right side of the page.
 
## Few words about the implementation on the backend
The application is hosted on a node server and the default template from Express structures the code. The views were written with Jade. For the database access I used the mongoose plugin.

### Backend dependencies
The server application has only two dependencies (including their own dependencies):
- Express
- Mongoose

### Folder structure
The following folders can be found in the backend code:
- crossCutting: Contains files available to the whole server-code. For example configurations or in the future the localization files.
- data: Contains the data layer of the server-application and the connection to the database. For the purposes of this demo application the folder also contains the topics.json file.
- models: Contains the database models of the application. Currently there is only one Mongo collection named topic.
- public: Contains the frontend CSS and JavaScript code.
- routes: Contains the Express routes of the application.
- views: Contains the HTML code of the application.

## Few words about the implementation on the frontend
The frontend-application uses vanilla JavaScript. All the JavaScript files are combined into one and the resulted file is minified. The client receives the "production" version of the JavaScript code. The size of the generated file is less than 7KB. To use the development JS-files uncomment them in the layout.jade view and comment out the .min file.

The CSS code is produced from a LESS file. The LESS files comes minified to the client.

The combination of the JS files and the minification of the JS and CSS files is done with this [VS code extension](https://marketplace.visualstudio.com/items/HookyQR.minify)

The code is tested with QUnit. To start the tests navigate with your windows explorer to *public/javascripts/tests/* and load the *tests.html* file on your browser. You are going to see a list with all the tested cases.

### The JavaScript-files structure
The following files can be found in the public/javascripts/ folder:
- models folder:
 - metaData: The model for the meta information of a word in the word cloud.
- communicationModule: This module is responsible for doing AJAX calls.
- dataBindingModule: This module is responsible for binding the UI with the property of an object and reverse. A more detailed explanation about how this feature works follows.
- expectionHandlingModule: A "catch all" handler and a module for presenting error messages to the user.
- main: The start point of the application.
- mathModule: The module containing the mathematical operations that are used for the construction of the word cloud.
- uiHelpersModule: The module is responsible for doing the interaction with the UI.
- wordCloudModule The module that creates a random word cloud.
- tests folder:
 - tests.html: The "test-runner" file.
 - dataBindingModuleTests: Contains the tests for the dataBinding module.
 - mathModuleTests: Contains the tests for the math module.
 - metaDataTests: Contains the tests for the metaData model.
 - uiHelpersModule: Contains the tests for the ui module.
 - wordCloudModuleTests: Contains the tests for the word cloud module.
 
## The implementation of the word cloud
The algorithm for creating the word cloud is implemented from me. On the internet I found several cloud implementations that use the d3 framework, but I decided to implement my own framework for it.
My implementation uses the [normal distribution algorithm](https://en.wikipedia.org/wiki/Normal_distribution) to create a random cloud and position the words in random place inside the cloud. Here is the pseudo-code of my implementation:
1. Create a random cloud with multiple div elements using normal distribution. These div elements have random width and left margins.
2. Use normal distribution to sort the words based on their popularity. Thus, the most popular words come into the middle of the array while the less popular remain on the outer area.
2. Populate the divs with words starting with the first div.
 - If the total width of the words added till now is smaller than the width of the div continue adding words to this div.
 - If the total width of the words is greater than the width of the div, then remove the last added word and added on the next div.
3. While populating the words into the divs, define their size based on the popularity and their color based on their sentiment score.

The word cloud is responsive, since percentage values were used for the widths of the elements.

## Changing the meta information in the meta-data area
When the user clicks on a word, the information on the right side of the page is refreshed and the new values are shown. For this "communication" between the UI and the model a custom and simple two way binding framework was build. Angular or any other MVVM framework was not used because the whole application uses only plain JavaScript. 

Objects can initialize their properties with using a new instance of the TwoWayBind "class". Doing this way the property is subscribed to a binder and each time the value of the property is changed the functions subscribed for this property are fired. Currently there are two default actions that are subscribed to each property which uses TwoWayBind.
 - The UIToModel function which informs the model when changes on the UI happen.
 - The ModelToUI function which informs the UI when changes on the Model happen.
 
To use the two way binding with a property of an object we have to do the following:
 - Define a new JavaScript "class" and use the TwoWayBind object for the properties of the "class" that you want to be observed. The first parameter of the TwoWayBind instance should always be the calling object itself and the second the name of the property we want to observe. Inside the TwoWayBind a new property is going to be created with custom getter and setter. For this property a shadow property is created to store the actual value.
 ```
var TestClass = (function() {       
        function TestClass() {
            this.label = new TwoWayBind(this, "label");
        }
        
        return TestClass;
})();
 ``` 
 - Add the following data-attribute in an HTML-element inside your HTML code:
 ```
 data-binding="ObjectName-PropertyName"
 ```
 Now for example, if the attribute was added into an input field then when you type something and take the focus away from the input, the value in the property is going to be updated. The value in the input field will also updated when you update the property with JavaScript code.
 
 Future work for the two way binding is to implement a dependency injection based on strings for the name of the object and the property, because currently I cannot minimize the file containing the MetaData model.
 
 ## Final words
 I hope you enjoy playing with the application as much I enjoyed implementing it :)