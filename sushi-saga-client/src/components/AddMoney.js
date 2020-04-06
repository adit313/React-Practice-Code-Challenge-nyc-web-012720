import React from 'react';

export default class AddMoney extends React.Component {

    state = {
        amount: 0
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.persist()
        this.props.addMoney(event.target[0].value)
        this.setState({amount: 0})
    }

    handleChange = (event) => {
        this.setState({amount: event.target.value})
    }


    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit} >
                <label>
                    Take out a Loan: <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        );
    }
}