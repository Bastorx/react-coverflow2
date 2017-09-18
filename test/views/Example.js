import React, { Component } from "react";
import Coverflow from "../../lib/reactjs-coverflow";

export default class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		};
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
						translateX={page == 3 ? 40 : undefined}
					>
						{this.getPage(this.state.page)}
					</Coverflow>

					<input type="text" name="margin" onChange={this.handleMarginChange} />
					<button onClick={this.prev.bind(this)} type="button">
						Prev
					</button>
					<button onClick={this.next.bind(this)} type="button">
						Next
					</button>
					<button onClick={this.getPosition.bind(this)} type="button">
						GetPosition
					</button>
					<button onClick={this.goAt.bind(this, 4)} type="button">
						Go At 5
					</button>
				</form>
			</div>
		);
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
				return [
					<div
						key="0"
						style={{ width: "150px", height: "150px", backgroundColor: "pink" }}
					/>,
					<div
						key="1"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "yellow"
						}}
					/>,
					<div
						key="2"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "green"
						}}
					/>,
					<div
						key="3"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "orange"
						}}
					/>,
					<div
						key="4"
						style={{ width: "150px", height: "150px", backgroundColor: "blue" }}
					/>,
					<div
						key="5"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "purple"
						}}
					/>,
					<div
						key="6"
						style={{
							width: "100px",
							height: "150px",
							backgroundColor: "#000000"
						}}
					/>,
					<div
						key="7"
						style={{ width: "200px", height: "150px", backgroundColor: "pink" }}
					/>
				];
				break;
			case 2:
				return null;
				break;
			case 3:
				return [
					<div
						key="0"
						style={{ width: "150px", height: "150px", backgroundColor: "pink" }}
					/>,
					<div
						key="1"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "yellow"
						}}
					/>,
					<div
						key="2"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "green"
						}}
					/>,
					<div
						key="3"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "orange"
						}}
					/>,
					<div
						key="4"
						style={{ width: "150px", height: "150px", backgroundColor: "blue" }}
					/>,
					<div
						key="5"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "purple"
						}}
					/>,
					<div
						key="6"
						style={{
							width: "100px",
							height: "150px",
							backgroundColor: "#000000"
						}}
					/>,
					<div
						key="7"
						style={{ width: "200px", height: "150px", backgroundColor: "pink" }}
					/>,
					<div
						key="8"
						style={{ width: "150px", height: "150px", backgroundColor: "pink" }}
					/>,
					<div
						key="9"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "yellow"
						}}
					/>,
					<div
						key="10"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "green"
						}}
					/>,
					<div
						key="11"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "orange"
						}}
					/>,
					<div
						key="12"
						style={{ width: "150px", height: "150px", backgroundColor: "blue" }}
					/>,
					<div
						key="13"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "purple"
						}}
					/>,
					<div
						key="14"
						style={{
							width: "100px",
							height: "150px",
							backgroundColor: "#000000"
						}}
					/>,
					<div
						key="15"
						style={{ width: "200px", height: "150px", backgroundColor: "pink" }}
					/>
				];
				break;
			case 4:
				return [
					<div
						key="0"
						style={{ width: "150px", height: "150px", backgroundColor: "pink" }}
					/>,
					<div
						key="1"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "yellow"
						}}
					/>
				];
				break;
		}
	}
}
