import { Component } from "react";
import { Link } from "react-router-dom";

import { PATH } from "../../constants/paths";
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(err) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        // Save the error to log or something
        console.log(error);
    }

    reload() {
        this.setState({ hasError: false })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles['error-boundary-container']}>
                    <h2>Oops! Something went wrong.</h2>
                    <p>We apologize for the inconvenience. Please try again later.</p>
                    <p>
                        <Link to={PATH.EXPLORE} onClick={this.reload}>Reload</Link>
                    </p>
                </div>
            )
        }

        return this.props.children;
    }
}