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

import React, {Component, PropTypes} from "react";
import connectToStores from "alt/utils/connectToStores"
import BalanceClaimActiveStore from "stores/BalanceClaimActiveStore"
import FormattedAsset from "components/Utility/FormattedAsset";
import Translate from "react-translate-component";

@connectToStores
export default class BalanceClaimAssetTotals extends Component {
    
    static getStores() {
        return [BalanceClaimActiveStore]
    }
    
    static getPropsFromStores() {
        var props = BalanceClaimActiveStore.getState()
        return props
    }
    
    render() {
        
        if( this.props.balances === undefined )
            return <div><Translate content="wallet.loading_balances"/>&hellip;</div>
        
        var total_by_asset = this.props.balances
            .groupBy( v => v.balance.asset_id )
            .map( l => l.reduce( (r,v) => r + Number(v.balance.amount), 0 ))

        if( ! total_by_asset.size)
            return <div>None</div>
        
        return <div>
            {total_by_asset.map( (total, asset_id) =>
                <div key={asset_id}>
                    <FormattedAsset color="info" amount={total} asset={asset_id} />
                </div>
            ).toArray()}
        </div>
    }
}

