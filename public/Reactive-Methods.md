Reactive Methods are methods from the server that are exposed to the client through web sockets. So instead of creating an action inside a controller that would sends JSON through XmlHttpRequests, you simply have to expose a method (converting it to a _reactive_ method) to the client and use it.

## Warning!
This feature can be very dangerous is used incorrectly. **DO NOT** expose methods that could damage any part of your project(s). You've been warned!

## HOWTO: Convert a controller/repository method to a reactive method

### Server-side
These methods must be binded in the object's "init" method. See the following examples for repositories and controllers.

#### Repositories

In the "init" method of the object, add:

	// initializing a reactive method
	var that = this;
	this.sockets.createReactiveMethod('methodNameForClient', function(parameters, callback){
		that.methodFromTheObject(parameters.code, function(result){
			// sends result to client
			callback(project);
		});
	});

#### Controllers

It's almost the same procedure for controllers, but to get them working you'll have to **(1)** add a callback to the controller and **(2)** call the controller without any parameters except for the callback method.

##### 1: add a callback to the controller

	// reactiveMethodCallback is there to make the method usable via reactive methods
	list: function(req, res, params, reactiveMethodCallback) {
		var that = this;

		this.Projects.getAllByDate(function(projects) {
			// if called from reactive method
			if (!res) {
				return reactiveMethodCallback(projects);
			} else {
				res.render("viewname", { projects: projects });
			}
		});
	},

##### 2: call the controller without any parameters except for the callback method

	this.sockets.createReactiveMethod('methodNameForClient', function(parameters, callback){
		that.actionFromTheController(null, null, function(result){
			callback(projects);        
		});
	});


### Client-side

For client-side, first you'll need to **(1)** include thinair.js to the page and **(2)** call the reactive method to get its result.

##### 1: include thinair.js to the page

	<script src="/js/thinair.js"></script>

##### 2: call the reactive method to get its result

	<script>
	// gets a project object
	callReactiveMethod('getProject', { code: "project-code" }, function(project){
		console.log(project);
	});
	</script>

***

&laquo; [[Views]] | [[Home]] | None &raquo;