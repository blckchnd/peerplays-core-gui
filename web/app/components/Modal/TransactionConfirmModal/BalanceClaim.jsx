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

import React from 'react'
import Translate from "react-translate-component";
import { connect } from 'react-redux';
import asset_utils from "common/asset_utils";


@connect(state => {
    return {
        transaction: state.transactionConfirm.transaction.transactionObject,
        assets: state.transactionConfirm.transaction.assets,
        account: state.transactionConfirm.transaction.account,
        ownerKey: state.transactionConfirm.transaction.ownerKey
    };
})
class BalanceClaim extends React.Component {

    render() {

        let transaction = this.props.transaction,
            trx = transaction.serialize(),
            operations = trx.operations,
            operation = trx.operations[0][1],
            assets = this.props.assets,
            assetsHash = {},
            account = this.props.account;

        assets.forEach((asset) => {
            assetsHash[asset.get('id')] = asset;
        });

        return (
            <div className="mConf__content">
                <div className="mConf__table">
                    <div className="mConf__tableRow">
                        <div className="mConf__tableLeft"><Translate content="transaction.claimed" /></div>
                        <div className="mConf__tableRight">

                            {operations.map((op) => {

                                let operation = op[1],
                                    asset = assetsHash[operation.total_claimed.asset_id],
                                    amountValue = asset && operation.total_claimed.amount ? operation.total_claimed.amount / Math.pow(10, asset.get('precision')) : 0;

                                return (
                                    <div key={operation.total_claimed.asset_id}>
                                        <span className="mark2">
                                            {amountValue} / {asset ? asset_utils.getSymbol(asset.get('symbol')) : operation.total_claimed.asset_id}
                                        </span>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                    <div className="mConf__tableRow">
                        <div className="mConf__tableLeft"><Translate content="transaction.deposit_to" /></div>
                        <div className="mConf__tableRight">
                            <span className="mark2">
                                {account ? account.get('name') : operation.deposit_to_account}
                            </span>
                        </div>
                    </div>
                    <div className="mConf__tableRow">
                        <div className="mConf__tableLeft"><Translate content="transaction.balance_id" /></div>
                        <div className="mConf__tableRight">
                            <span className="mark2">
                                {operation.balance_to_claim}
                            </span>
                        </div>
                    </div>
                    <div className="mConf__tableRow">
                        <div className="mConf__tableLeft"><Translate content="transaction.balance_owner_key" /></div>
                        <div className="mConf__tableRight">
                            <span className="mark2">
                                {this.props.ownerKey.substring(0,10)}...
                            </span>
                        </div>
                    </div>
                    <div className="mConf__tableRow">
                        <div className="mConf__tableLeft">Public key</div>
                        <div className="mConf__tableRight">
                            <span className="mark2">
                                {operation.balance_owner_key.substring(0,10)}...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BalanceClaim;
