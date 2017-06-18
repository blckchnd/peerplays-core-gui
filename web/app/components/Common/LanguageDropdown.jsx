/*
 *  Copyright (c) 2015 Cryptonomex, Inc., and contributors.
 *
 *  The MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import React from "react";
import ReactDOM from "react-dom";
import Translate from "react-translate-component";
import {connect} from "react-redux";
import classNames from "classnames";
import { switchLocale } from 'actions/RSettingsActions';

const FlagImage = ({flag, width = 20, height = 20}) => {
    return <img height={height} width={width} src={"language-dropdown/" + flag.toUpperCase() + ".png"} />;
};

@connect(
    (state) => {
        return {
            defaultLocales: state.settings.defaults.locale,
            locale: state.settings.locale,
            open: false
        };
    },
    {
        switchLocale
    }
)
class LanguageDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount () {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick(e) {

        let area = ReactDOM.findDOMNode(this.refs.area);

        if (!area.contains(e.target) && !this.notClose) {
            this.setState({open: false});
        }

        this.notClose = false;
    }


    onSwitchLocale(lang, e) {

        this.props.switchLocale(lang);
        this.setState({open: false});
        e.preventDefault();

    }

    onClickLanguages(e) {

        this.setState({
            open: !this.state.open
        });
        e.preventDefault();

    }

    getItems() {

        return this.props.defaultLocales.map((lang) => {

            return (
                <div key={lang} className={classNames({"langDropdown__item": true, "active": this.state.open})}>
                    <a href onClick={this.onSwitchLocale.bind(this, lang)}>
                        <span><FlagImage flag={lang}/></span>
                        <span style={{paddingLeft: 10}}><Translate content={"languages." + lang}/></span>
                    </a>
                </div>
            );
        });
    }

    render() {

        return (
            <div className="langDropdown__wrap" ref="area">
                <a href="#/" className="nav__link nav__link-langDropdown" onClick={this.onClickLanguages.bind(this)}>
                    <span className="nav__linkAlign">
                        <FlagImage flag={this.props.locale} />
                    </span>
                </a>
                <div className="langDropdown__itemsBox">
                    {this.getItems()}
                </div>
            </div>
        );

    }
}

export default LanguageDropdown;