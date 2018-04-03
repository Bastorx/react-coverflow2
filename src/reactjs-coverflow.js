import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

module.exports = class Coverflow extends Component {
	static defaultProps = {
		enableScroll: true,
		startPosition: 0,
		rotate: 40,
		translateX: null
	};
	static propTypes = {
		startPosition: PropTypes.number,
		enableScroll: PropTypes.bool,
		rotate: PropTypes.number,
		margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		animationSpeed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		translateX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		onChange: PropTypes.func
	};
	constructor(props) {
		super(props);
		const childrens = props.children && props.children.length;
		this._handleWheel = this._handleWheel.bind(this);
		this._handleTouchStart = this._handleTouchStart.bind(this);
		this._handleTouchMove = this._handleTouchMove.bind(this);
		this._handleResize = this._handleResize.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.goAt = this.goAt.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._animation = this._animation.bind(this);
		this._loadCSS = this._loadCSS.bind(this);

		this.state = {
			position:
				props.startPosition > (childrens || 0)
					? (childrens || 0) - 1
					: props.startPosition,
			shouldUpdate: false
		};
	}
	componentWillMount() {
		this._loadCSS();
	}
	componentDidMount() {
		this._loadCSS();
		const coverflow = findDOMNode(this.refs.coverflow);
		const elements = coverflow.getElementsByClassName(
			"reactjs-coverflow_Element"
		);

		let offset = [];

		this._forEach(elements, e => {
			offset.push(e.offsetLeft);
		});

		this._forEach(elements, (e, key) => {
			const rotateY =
				this.state.position > key
					? ` rotateY(${this.props.rotate}deg)`
					: this.state.position < key
						? ` rotateY(-${this.props.rotate}deg)`
						: "";
			e.style.transform = rotateY;
			if (this.props.animationSpeed) {
				e.style.transition =
					"transform " +
					(typeof this.props.animationSpeed == "string"
						? this.props.animationSpeed
						: this.props.animationSpeed + "s");
			}
		});

		this.setState({
			offset: offset,
			elements: elements,
			coverflow: coverflow
		});
		window.addEventListener("resize", this._handleResize);
	}
	componentDidUpdate() {
		if (!this.state.shouldUpdate) return;
		this.setState({ shouldUpdate: false });
		this._handleResize();
	}
	componentWillReceiveProps(newProps) {
		if (newProps.margin != this.props.margin)
			this.setState({ shouldUpdate: true });
		if (newProps.children != this.props.children) {
			const childrens = newProps.children && newProps.children.length;
			if (this.state.position > (childrens || 0))
				this.setState({ position: (childrens || 0) - 1 });
			if (childrens && this.state.position < 0) this.setState({ position: 0 });
			this.setState({ shouldUpdate: true });
		}
	}
	render() {
		let translateX = 0;
		if (this.state.offset && this.state.offset[this.state.position]) {
			const activeElementWith =
				(this.state.elements[this.state.position] &&
					this.state.elements[this.state.position].offsetWidth / 2) ||
				0;
			translateX =
				!!this.props.translateX || this.props.translateX === 0
					? `translateX(${
							typeof this.props.translateX == "string"
								? this.props.translateX
								: `${this.props.translateX}px`
						}) translateX(${-this.state.offset[this.state.position]}px)`
					: `translateX(${this.state.coverflow.offsetWidth / 2 -
							activeElementWith -
							this.state.offset[this.state.position]}px)`;
		}
		const transition = this.props.animationSpeed
			? typeof this.props.animationSpeed == "string"
				? this.props.animationSpeed
				: this.props.animationSpeed + "s"
			: undefined;
		return (
			<div
				ref="coverflow"
				id={this.props.id}
				className={
					"reactjs-coverflow_Main" +
					(this.props.className ? " " + this.props.className : "")
				}
				style={this.props.style}
				onWheel={this.props.enableScroll ? this._handleWheel : ""}
				onTouchStart={this._handleTouchStart}
				onTouchMove={this._handleTouchMove}
			>
				<div
					className="reactjs-coverflow_Coverflow"
					style={{ transform: translateX, transition }}
				>
					{this.props.children &&
						this.props.children.map((element, i) => {
							return (
								<figure
									key={i}
									className={
										"reactjs-coverflow_Element" +
										(i == this.state.position ? " active" : "")
									}
									style={
										this.props.margin
											? {
													margin:
														"auto " +
														(typeof this.props.margin == "string"
															? this.props.margin
															: this.props.margin + "px")
												}
											: {}
									}
								>
									{element}
								</figure>
							);
						})}
				</div>
			</div>
		);
	}
	previous() {
		if (this.state.position > 0) {
			const position = this.state.position - 1;
			this.setState({ position });
			if (this.props.onChange) {
				this.props.onChange(position);
			}
			this._animation(position);
		}
	}
	next() {
		if (this.state.position < this.state.offset.length - 1) {
			const position = this.state.position + 1;
			this.setState({ position });
			if (this.props.onChange) {
				this.props.onChange(position);
			}
			this._animation(position);
		}
	}
	goAt(position) {
		if (position < 0) position = 0;
		else if (position >= this.state.offset.length)
			position = this.state.offset.length - 1;

		this.setState({ position });
		if (this.props.onChange) {
			this.props.onChange(position);
		}
		this._animation(position);
	}
	getPosition() {
		return this.state.position;
	}
	_handleWheel(e) {
		e.preventDefault();

		if (e.deltaY < 0) {
			this.previous();
		} else if (e.deltaY > 0) {
			this.next();
		}
	}
	_handleTouchStart(e) {
		e.preventDefault();

		this.setState({
			touchStart: e.nativeEvent.touches[0].clientX
		});
	}
	_handleTouchMove(e) {
		e.preventDefault();

		const clientX = e.nativeEvent.touches[0].clientX;
		const lastX = this.state.touchStart;

		const move = clientX - lastX;
		const width = this.state.elements[this.state.position].offsetWidth / 2;

		if (Math.abs(move) >= width) {
			this.setState({
				touchStart: e.nativeEvent.touches[0].clientX
			});
			if (move > 0) {
				this.previous();
			} else if (move < 0) {
				this.next();
			}
		}
	}
	_handleResize() {
		let offset = [];

		this._forEach(this.state.elements, e => {
			offset.push(e.offsetLeft);
		});

		this.setState({ offset: offset });
		this._animation(this.state.position, offset);
	}
	_animation(position, o) {
		const offset = o ? o : this.state.offset;
		const elementsNumber = this.state.elements.length;

		this._forEach(this.state.elements, (e, key) => {
			const rotateY =
				position > key
					? ` rotateY(${this.props.rotate}deg)`
					: position < key ? ` rotateY(-${this.props.rotate}deg)` : "";
			e.style.transform = rotateY;
			e.style.zIndex = elementsNumber - Math.abs(position - key);
		});
	}
	_loadCSS() {
		if (!this.constructor.cssLoaded && typeof document != "undefined") {
			this.constructor.cssLoaded = true;

			const css =
				".reactjs-coverflow_Main { position: relative; margin: 0; padding: 0; background-color: rgba(0, 0, 0, 0.1); overflow: hidden; } .reactjs-coverflow_Coverflow { width: 100%; height: 100%; display: flex; -webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 500px; perspective: 500px; align-items: center; transition: transform 0.7s; } .reactjs-coverflow_Element { position: relative; margin: auto 20px; transition: transform 0.7s; }";
			const head = document.head || document.getElementsByTagName("head")[0];
			let style = document.createElement("style");

			style.type = "text/css";
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			head.insertBefore(style, head.firstChild);
		}
	}
	_forEach(array, cb) {
		for (let i = 0; i < array.length; i++) {
			cb(array[i], i);
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this._handleResize);
	}
};
