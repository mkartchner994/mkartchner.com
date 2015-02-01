/**
 * @jsx React.DOM
 */

var Router = window.ReactRouter;
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;


function setAnimation(self){
	setTimeout(function(){
		self.setState({mounted:true});
	},100);
	$("img.lazy").lazyload({
		threshold : 500,
		effect:'fadeIn'
	});
}

var NotFound = React.createClass({
	render: function() {
 		return (
	 			<div><Link to="app">Page Not Found</Link></div>
 		);
 	}
});

var App = React.createClass({
	scrollTop: function(e){
		e.preventDefault();
		var body = $("html, body");
		body.animate({scrollTop:0},'500','swing',function(){});
	},
	componentDidMount:function(){
		var self = this;
		window.addEventListener('scroll',function(e){
			var scroll = self.refs.scrolltop.getDOMNode();
			var nav = self.refs.navbar.getDOMNode();
			var body = e.target.body;
			if(body.scrollTop>0||window.scrollY>0){
				scroll.className = 'scroll';
				nav.className = 'top-bar scroll';
			} else {
				scroll.className = '';
				nav.className = 'top-bar';
			}
		});
	},
	render: function(){
		var year = new Date().getFullYear();
		return (
			<div>
				<nav ref="navbar" className="top-bar" data-topbar role="navigation">
				  <Link to="app">MK</Link><Link to="projects">Projects</Link><Link to="contact">Contact</Link>
				</nav>

				<div>
					<this.props.activeRouteHandler/>
				</div>

				<footer>&copy; {year}</footer>
				<div id="scrolltop" ref="scrolltop">
					<a href="#" onClick={this.scrollTop}><i className="fa fa-arrow-circle-up"></i></a>
				</div>
		    </div>
		);
	}
});

var ProjectOverview = React.createClass({
	statics: {
		willTransitionTo: function(transition,params){
			for (var i = projects.length - 1; i >= 0; i--) {
				if(params.name===projects[i].path){
					params.project = projects[i];
					break;
				}
			};
			if(!params.project){transition.redirect('projects');}
		}
	},
	getInitialState:function(){
		return {mounted:false,project:this.props.params.project};
	},
	componentWillMount:function(){
		document.body.className = 'project-overview';
	},
	componentDidMount:function(){
		document.title = 'MK | '+this.state.project.name;
		setAnimation(this);
	},
	render: function() {
 		var mounted = (this.state.mounted?'in':'');
 		return (
 			<div>
 				
	 			<div className={"page-heading "+mounted}>
		 			<h2>{this.state.project.name}</h2>
		 		</div>
			 	
		 		<div className={"page-content "+mounted}>
		 			<div className="page-container">
		 				<p className="page-desc">{this.state.project.longdesc}</p>
		 				<ul className="small-block-grid-1">
		 					{this.state.project.imgs.map(function(img){
		 						return (
		 							<li>
		 								<p><i className="fa fa-angle-right"></i> {img.desc}</p>
		 								<img className="lazy" data-original={img.src} width="800" height="500"/>
		 							</li>
		 						)
		 					})}
		 				</ul>
		 			</div>
		 		</div>

	 		</div>
 		);
 	}
});

var Projects = React.createClass({
	getInitialState:function(){
		return {mounted:false,projects:projects};
	},
	componentWillMount:function(){
		document.body.className = 'projects';
	},
	componentDidMount:function(){
		document.title = 'MK | Projects';
		setAnimation(this);
	},
	render: function() {
 		var mounted = (this.state.mounted?'in':'');
 		return (
 			<div>
 				
	 			<div className={"page-heading "+mounted}>
		 			<h2>Projects</h2>
		 		</div>
			 	
		 		<div className={"page-content "+mounted}>
		 			<div className="page-container">
		 				<p className="page-tagline">
		 					A list of a few projects I've worked on.
		 				</p>
		 				<ul className="small-block-grid-1 large-block-grid-2">
		 					{this.state.projects.map(function(project){
		 						return (									
									<li>
				 						<Link to="project-overview" params={{name:project.path}}>
				 							<img className="th lazy" data-original={project.thumb} width="744" height="440"/>
				 						</Link>
				 						<h5>{project.name}</h5>
				 						<p>{project.shortdesc}</p>
				 					</li>
		 						)
		 					})}
		 				</ul>
		 			</div>
		 		</div>

	 		</div>
 		);
 	}
});

var Resume = React.createClass({
	getInitialState:function(){
		var data = [];
		projects.map(function(project){
			data.push(project.name);
		});
		data = data.join(', ');
		return {mounted:false,projects:data};
	},
	componentWillMount:function(){
		document.body.className = 'resume';
	},
	componentDidMount:function(){
		document.title = 'MK | Resume';
		setAnimation(this);
	},
	render: function() {
 		var mounted = (this.state.mounted?'in':'');
 		return (
 			<div>
 				
	 			<div className={"page-heading "+mounted}>
		 			<h2>Morgan Kartchner</h2>
		 		</div>
			 	
		 		<div className={"page-content "+mounted}>
		 			<div className="page-container">
		 				<div className="row">
		 					<p className="small-12 columns text-center">
		 						<a href="mailto:mkartchner994@gmail.com">mkartchner994@gmail.com</a><br/>
		 						<a href="https://twitter.com/intent/tweet?screen_name=mak994" target="_blank">@mak994</a><br/>
		 						<a href="https://plus.google.com/104613662454260990596/" target="_blank">Google+</a>
		 					</p>
		 				</div>
						<hr />
						<div className="row">
							<div className="small-12 large-6 columns text-center"><h3>Experience</h3></div>
							<div className="small-12 large-6 columns">
								<p>
									<a href="http://www.viralevents.com/" target="_blank">Viral Events</a> from August 2013 – Present. 
									<a href="http://www.jacobs.com/" target="_blank"> Jacobs Technology</a> from June 2010 – August 2013 (3 years 3 months).
								</p>
							</div>
						</div>
						<hr />
						<div className="row">
							<div className="small-12 large-6 columns text-center"><h3>Education</h3></div>
							<div className="small-12 large-6 columns">
								<p>
									Bachelor of Science in Management Information Systems from
									Utah State University, GPA – 3.62, Institutional Honors: Cum Laude
								</p>
							</div>
						</div>
						<hr />
						<div className="row">
							<div className="small-12 large-6 columns text-center"><h3>Skills</h3></div>
							<div className="small-12 large-6 columns">
								<p>
									HTML5, CSS3, Bootstrap, Foundation, PHP, Apache, MySQL, 
									Javascript, jQuery, Node.js, AngularJS, KnockoutJS, ReactJS, 
									Mobile Apps, Heroku, MongoDB, MailChimp
								</p>
							</div>							
						</div>
						<hr />
						<div className="row">
							<div className="small-12 large-6 columns text-center">
								<h3>Projects</h3>								
							</div>
							<div className="small-12 large-6 columns">
								<p>
									{this.state.projects}
								</p>
								<p><Link to="projects">View Projects</Link></p>
							</div>							
						</div>
		 			</div>
		 		</div>

	 		</div>
 		);
 	}
});

var Contact = React.createClass({
	getInitialState:function(){
		return {mounted:false,form:'unsent'};
	},
	componentWillMount:function(){
		document.body.className = 'contact';
	},
	componentDidMount:function(){
		document.title = 'MK | Contact';
		setAnimation(this);
		$(this.refs.message.getDOMNode()).autosize();
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.setState({form:'sending'});
		var self = this, data = {};
		for(var prop in self.refs){
			if(prop==='contactform'){continue;}
			data[prop] = self.refs[prop].getDOMNode().value;
		}
		$.ajax({
			method:'POST',
			url: '/contact-submit',
			data: data
		}).done(function(){
			self.setState({form:'sent'});
			self.refs.contactform.getDOMNode().reset();
		}).fail(function(){
			alert('Something went wrong. Please try again later.');
		});
	},
	status: function(){
		switch(this.state.form){
			case 'unsent':
				return 'Send';
				break;
			case 'sending':
				return (<span><i className="fa fa-spin fa-circle-o-notch"></i> Sending</span>);
				break;
			case 'sent':
				return 'Sent!';
				break;
		}
	},
	render: function() {
 		var mounted = (this.state.mounted?'in':'');
 		return (
 			<div>
 				
	 			<div className={"page-heading "+mounted}>
		 			<h2>Contact</h2>
		 		</div>
			 	
		 		<div className={"page-content "+mounted}>
		 			<div className="page-container">
		 				<p className="page-tagline">
		 					Send an email to <a href="mailto:mkartchner994@gmail.com">mkartchner994@gmail.com</a> or send a message through here.
		 				</p>		 				
		 				<div>
		 					<form ref="contactform" action="/contact-submit" method="POST" onSubmit={this.handleSubmit}>
			 					<input ref="name" className="contact-input" type="text" placeholder="Name" required/>
			 					<input ref="email" className="contact-input" type="email" placeholder="Email" required/>
			 					<textarea ref="message" className="contact-input" rows="2" placeholder="Message" required></textarea>
			 					<div className="text-center"><button type="submit" className="button expand" value="Send">{this.status()}</button></div>
			 				</form>
		 				</div>
		 			</div>
		 		</div>

	 		</div>
 		);
 	}
});

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="projects" handler={Projects}/>
      <Route name="project-overview" path="/project/:name" handler={ProjectOverview}/>
      <Route name="contact" handler={Contact}/>
      <DefaultRoute name="resume" handler={Resume}/>
      
      <NotFoundRoute handler={NotFound}/>
    </Route>    
  </Routes>
);

function renderPage(){
	setTimeout(function(){
		React.renderComponent(routes, document.getElementById('app'));
	},500);
}

$(document).ready(function(){
	$.ajax({
		method: 'GET',
		url: 'https://googledrive.com/host/0B2vCWvrJOS-ENWUyMmkxelpIRkU/projects.json'
	}).done(function(data){
		window.projects = JSON.parse(data);
		renderPage();
	});
});