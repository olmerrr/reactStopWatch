import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
	state = {
		count: 0,
		isCounting: false,
	};
	handleStart = () => {
		this.setState({ isCounting: true });
		this.counterId = setInterval(() => {
			this.setState({ count: this.state.count + 1 })
		}, 1000)

	}

	handleStop = () => {
		this.setState({ isCounting: false });
		// останавливает счетчик
		clearInterval(this.counterId);
	}

	handleReset = () => {
		this.setState({ count: 0, isCounting: false });
		clearInterval(this.counterId);

	}
	componentDidMount() {
		const userTimer = localStorage.getItem('timer');

		if (userTimer) {
			this.setState({ count: +userTimer })
			// по этому я добавил унарный +
		}
	}

	componentDidUpdate() {
		localStorage.setItem('timer', this.state.count)
		// то что я записаю в localStorage будет в формате строки

	}

	componentWillUnmount() {
		clearInterval(this.counterId);
	}

	render() {
		return (
			<div className="App">
				<h1>React Timer</h1>
				<h3>{this.state.count}</h3>

				<div className="actions">
					{!this.state.isCounting ? (
						<button
							className='btn' 
							onClick={this.handleStart}>Start</button>
					) : (
						<button 
							className='btn' 
							onClick={this.handleStop}>Stop</button>
					)}
					<button 
						className='btn' 
						onClick={this.handleReset}>Reset</button> </div>
			</div>
		);
	}
}
