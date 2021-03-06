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
import {connect} from 'react-redux';
import counterpart from "counterpart";
import Translate from "react-translate-component";
import BalanceHeader from "./BalanceHeader"
import BalanceList from "./BalanceList"
import OpenOrdersList from './OpenOrdersList';
import RecentActivityList from './RecentActivityList';

import {addAssetToHidden, removeAssetToHidden} from "actions/RSettingsActions";

import DashboardPageActions from 'actions/DashboardPageActions';
import NavigateActions from 'actions/NavigateActions';

const CoreBalanceList = connect((state) => {
	return {
		list: state.dashboardPage.coreToken,
		showHideOption: false
	};
}, {})(BalanceList);

const CryptoBalanceList = connect((state) => {
	return {
		list: state.dashboardPage.cryptoTokens,
        showHideOption: false
	};
}, {})(BalanceList);

const OtherBalanceList = connect((state) => {
	return {
		list: state.dashboardPage.otherAssets,
        showHideOption: true
	};
}, {})(BalanceList);

@connect(
	(state)=> {
		return {
			coreSymbol: state.dashboardPage.coreSymbol,
			assetSymbol: state.dashboardPage.assetSymbol,
			precision: state.dashboardPage.precision,
			decimals: state.dashboardPage.decimals,

			showHiddenAssets: state.dashboardPage.showHiddenAssets,
			hiddenAssets: state.settings.hiddenAssets
		};
	},
	{
		removeAssetToHidden: removeAssetToHidden,
		addAssetToHidden: addAssetToHidden,
		toggleAssetHidden: DashboardPageActions.toggleAssetHidden,
		toggleShowHiddenAssets: DashboardPageActions.toggleShowHiddenAssets,
		navigateToSend: NavigateActions.navigateToSend,
        navigateToDepositWithDraw: NavigateActions.navigateToDepositWithDraw
	}
)
class Balances extends React.Component {

	onAfterChangeShow(type, value) {

		this.props.removeAssetToHidden(value);
		this.props.toggleAssetHidden(value, type, false);

	}

	onAfterChangeHide(type, value) {

		this.props.addAssetToHidden(value);
		this.props.toggleAssetHidden(value, type, true);

	}

	toggleShowHiddenAssets() {
		this.props.toggleShowHiddenAssets();
	}

	onNavigateToSend() {
		this.props.navigateToSend();
	}

	onNavigateToSendBySymbol(symbol) {
		this.props.navigateToSend(symbol);
	}

    onNavigateToDeposit(symbol) {
        this.props.navigateToDepositWithDraw(symbol);
	}

	render() {

		let {showHiddenAssets, assetSymbol, precision, decimals, hiddenAssets} = this.props;

		return (
			<section className="content content-aside">
				<div className="box">
					<div className="content__head db">
						{/*<h1 className="content__headTitle pull-left"><Translate content="dashboard.balances"/></h1>*/}
						{/*<button type="button" className="btn btn-content__head">
							<span className="content__headBtnIcon icon-arrows3"/>
							<span className=""><Translate content="dashboard.deposit_withdraw"/></span>
						</button>*/}
						<button type="button" className="btn btn-content__head pull-right" onClick={this.onNavigateToSend.bind(this)}>
							<span className="content__headBtnIcon icon-arrow2"/>
							<span className=""><Translate content="dashboard.send"/></span>
						</button>
                        {/*<button type="button" className="btn btn-content__head" onClick={this.onNavigateToMarkets.bind(this)}>
							<span className="content__headBtnIcon icon-chart"/>
							<span className=""><Translate content="dashboard.markets"/></span>
						</button>*/}
					</div>



					<CoreBalanceList onNavigateToDeposit={this.onNavigateToDeposit.bind(this)} onNavigateToSend={this.onNavigateToSendBySymbol.bind(this)} title={counterpart.translate("dashboard.core_tokens")} showHiddenAssets={showHiddenAssets} unit={assetSymbol} precision={precision} decimals={decimals} onAfterChangeShow={this.onAfterChangeShow.bind(this, 'coreToken')} onAfterChangeHide={this.onAfterChangeHide.bind(this, 'coreToken')}/>
					<CryptoBalanceList onNavigateToDeposit={this.onNavigateToDeposit.bind(this)} onNavigateToSend={this.onNavigateToSendBySymbol.bind(this)} title={counterpart.translate("dashboard.digital_currencies")} showHiddenAssets={showHiddenAssets} unit={assetSymbol} precision={precision} decimals={decimals} onAfterChangeShow={this.onAfterChangeShow.bind(this, 'cryptoTokens')} onAfterChangeHide={this.onAfterChangeHide.bind(this, 'cryptoTokens')}/>
					<OtherBalanceList onNavigateToDeposit={this.onNavigateToDeposit.bind(this)} onNavigateToSend={this.onNavigateToSendBySymbol.bind(this)} title={counterpart.translate("dashboard.other_assets")} showHiddenAssets={showHiddenAssets} unit={assetSymbol} precision={precision} decimals={decimals} onAfterChangeShow={this.onAfterChangeShow.bind(this, 'otherAssets')} onAfterChangeHide={this.onAfterChangeHide.bind(this, 'otherAssets')}/>

					{hiddenAssets.size == 0 ? null :
						<div className="table__btns">
							{
								showHiddenAssets
									?
									<button onClick={this.toggleShowHiddenAssets.bind(this)} className="btn btn-neutral2 btn-table js-toggleAssetsVis">
										<Translate content="dashboard.hide_hidden"/></button>
									:
									<button onClick={this.toggleShowHiddenAssets.bind(this)} className="btn btn-neutral2 btn-table js-toggleAssetsVis">
										<Translate content="dashboard.show_hidden"/></button>
							}
						</div>
					}

					{/*<OpenOrdersList />*/}

					<RecentActivityList />

					<div className="h100"></div>
				</div>
			</section>
		);
	}
}

export default Balances;