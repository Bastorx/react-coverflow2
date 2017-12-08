# React Coverflow

[![npm version](https://badge.fury.io/js/reactjs-coverflow.svg)](http://badge.fury.io/js/reactjs-coverflow)

[![NPM](https://nodei.co/npm/reactjs-coverflow.png)](https://nodei.co/npm/reactjs-coverflow/)

---

(Inspired from https://github.com/andyyou/react-coverflow)

React Coverflow is a React component for building cover flow style carousel in a
convenient way.

Features of `reactjs-coverflow`

* Flexbox styles of CSS 3.
* Support scroll in the component.
* Support navigation buttons optional
* Using css-module
* Support mobile
* Support different div's size

## Getting started

Install `reactjs-coverflow` using npm.

```
$ npm install reactjs-coverflow
```

The required stylesheet using `css-module` and include in package(js file), so
you don't need include other stylesheet.

## Usage

Exemple :

```
var React = require('react');
var Coverflow = require('reactjs-coverflow');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<form>
					<Coverflow ref="coverflow"
					style={{width: "100vw", height:"500px"}}
					margin={(this.state && this.state.margin + "px") || undefined}
					startPosition={4}
					enableScroll={true}
					rotate={30}
					translateX={200}
					animationSpeed={0.8}>
					    <div style={{width: '150px', height: '150px', backgroundColor: 'pink'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'yellow'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'green'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'orange'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'blue'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'purple'}} />
					    <div style={{width: '100px', height: '150px', backgroundColor: '#000000'}} />
					    <div style={{width: '200px', height: '150px', backgroundColor: 'pink'}} />
					</Coverflow>

					<input type="text" name="margin" onChange={this.handleMarginChange} />
					<button onClick={this.prev} type="button">Prev</button>
					<button onClick={this.next} type="button">Next</button>
					<button onClick={this.getPosition} type="button">GetPosition</button>
					<button onClick={this.goAt} type="button">Go At 5</button>
				</form>
			</div>
		);
	},
	handleMarginChange: function(e) {
		e.preventDefault();
		this.setState({margin: parseFloat(e.currentTarget.value)});
	},
	prev: function(e) {
		e.preventDefault();
		this.refs.coverflow.previous();
	},
	next: function(e) {
		e.preventDefault();
		this.refs.coverflow.next();
	},
	getPosition: function(e) {
		e.preventDefault();
		console.log(this.refs.coverflow.getPosition());
	},
	goAt: function(num, e) {
		e.preventDefault();
		this.refs.coverflow.goAt(4);
	}
});
```

#### Options

* startPosition [number]: Start at 0, determine the starting element of your
	coverflow (default: 0)
* enableScroll [boolean]: Enable scrolling feature. ((default: true)
* margin [string or number (px)]: margin between elements in coverflow (default:
	USE CSS) !! Don't use margin proprety if you prefer to use media queries,
	overwrite the CSS and the class .reactjs-coverflow_Element!!
* animationSpeed [string or number (second)]: Speed of animation coverflow in
	second (default: USE CSS) !! Same that margin !!
* rotate [number]: Define rotation of non-active element (default: 40°)
* translateX [string or number (px)]: Define the initial translateX (default:
	Compute the center of the coverflow)
* onChange [function]: Will be call when the position change. This function
	receive the new position (first is 0) as parameter (in beta)

#### Refs

You can get some function of your coverflow with a ref proprety

* next(): go to next slide
* previous(): go to previous slide
* goAt(number): go to {number slide} (First is 0)
* getPosition(): get position of current slide (First is 0)

You can use it to create some button

#### CSS

```
.reactjs-coverflow_Main {
	position: relative;
	margin: 0;
	padding: 0;
	background-color: rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

.reactjs-coverflow_Coverflow {
	width: 100%;
	height: 100%;
	display: flex;
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-perspective: 500px;
	perspective: 500px;
	align-items: center;
	transition: transform 0.7s;
}

.reactjs-coverflow_Element {
	position: relative;
	-webkit-box-reflect: below 1px -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)
				20%, transparent 30%, transparent);
	margin: auto 20px;
	transition: transform 0.7s;
}
```

You can easely overwrite style propreties.

## Major Update

* Since 1.0.0 : react-coverflow-X is replace to reactjs-coverflow in the style.
* Since 2.0.0 : translateX proprety can be a string (px, %... are supported),
	elements of the coverflow doesn't move, it's the entire coverflow whom moves.
	Increase of perf.

## Minor Update

* Since 1.1.0 : Lodash dependencies has been removed.
* Since 1.2.0 : New props rotate to define the rotation of a non-active element,
	New props translateX to define the initial translateX

* Since 2.1.0 : Add a callback function onChange. If the position must change,
	the call back this.props.onChange will be call. This function will have one
	parameter, the new position (if you need to have the last position, I propose
	you to save it in your states)

## Contributors

* [Bastorx](https://github.com/Bastorx)

Use [Github issues](https://github.com/Bastorx/reactjs-coverflow/issues) for
requests

`reactjs-coverflow` is a community project and wouldn't be what it is without
contributions! We encourage and support contributions. The `reactjs-coverflow`
source code is released under the MIT License.

Feel free to fork and improve/enhance `reactjs-coverflow` any way you want. If
you feel that `reactjs-coverflow` will benefit from your changes, please open a
pull request.

## Development

If you want to custom the component there are some commands that can help you.

```
$npm install --dev
```

```
# Build component to lib/
$ npm run build

# Build source of site
$ npm run build-test

# Run test-server (default port: 4000)
$ npm run dev

# You can run all this command with the following command:
$ npm run dev
```

PS: In development, gulp is installed and watch the code. It automatically
rebuild when you use npm run dev.
