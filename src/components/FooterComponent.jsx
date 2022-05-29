import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">수원대학교 졸업프로젝트</span>

                </footer>
            </div>
        );
    }
}

export default FooterComponent;