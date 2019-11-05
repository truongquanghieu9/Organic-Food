import React, {Component} from "react";
import Dashboard from "components/views/Dashboard";

class DashboardContain extends Component {
    state = {
        value: 0
    };

    handleChange = (e, value) => {
        this.setState({value})
    }

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        return <Dashboard
            {...this.props}
            handleChange={this.handleChange}
            handleChangeIndex={this.handleChangeIndex}
        />
    }
}

export default DashboardContain;
