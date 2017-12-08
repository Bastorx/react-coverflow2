import React, { Component } from "react";
import Coverflow from "../../lib/reactjs-coverflow";
import { Page1, Page2, Page3, Page4 } from "./page";

export default class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		};
	}
	handleMarginChange(e) {
		e.preventDefault();
		this.setState({ margin: parseFloat(e.currentTarget.value) });
	}
	prev(e) {
		e.preventDefault();
		this.refs.coverflow.previous();
	}
	next(e) {
		e.preventDefault();
		this.refs.coverflow.next();
		this.setState({});
	}
	onChange(index) {
		console.log(`New position: ${index}`);
	}
	getPosition(e) {
		e.preventDefault();
		console.log(this.refs.coverflow.getPosition());
	}
	goAt(num, e) {
		e.preventDefault();
		this.refs.coverflow.goAt(4);
	}
	getPage(num) {
		switch (num) {
			case 1:
				return Page1;
				break;
			case 2:
				return Page2;
				break;
			case 3:
				return Page3;
				break;
			case 4:
				return Page4;
				break;
		}
	}
	render() {
		const { page } = this.state;
		return (
			<div>
				<form>
					<button onClick={() => this.setState({ page: 1 })} type="button">
						Page 1
					</button>
					<button onClick={() => this.setState({ page: 2 })} type="button">
						Page 2
					</button>
					<button onClick={() => this.setState({ page: 3 })} type="button">
						Page 3
					</button>
					<button onClick={() => this.setState({ page: 4 })} type="button">
						Page 4
					</button>
					<Coverflow
						ref="coverflow"
						style={{ width: "100vw", height: "500px" }}
						startPosition={1}
						enableScroll={true}
						animationSpeed={0.6}
						rotate={page == 3 ? 0 : 40}
						translateX={"20%"}
						onChange={this.onChange}
					>
						{this.getPage(this.state.page)}
					</Coverflow>

					<input type="text" name="margin" onChange={this.handleMarginChange} />
					<button onClick={e => this.prev(e)} type="button">
						Prev
					</button>
					<button onClick={e => this.next(e)} type="button">
						Next
					</button>
					<button onClick={e => this.getPosition(e)} type="button">
						GetPosition
					</button>
					<button onClick={e => this.goAt(4, e)} type="button">
						Go At 5
					</button>
				</form>
			</div>
		);
	}
}
