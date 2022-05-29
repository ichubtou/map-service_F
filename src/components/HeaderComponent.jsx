import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <header>
                    <navs className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a align="center" href="http://localhost:3000" className="navbar-brand" > 어린이 안전 지도</a></div>
                    </navs>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
