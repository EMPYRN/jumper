/*
* K·Pay Integration Library - v1.3.5 - Copyright Kiezel 2020
* Last Modified: 2019-11-04
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

import document from "document";
import { vibration } from "haptics";
import { display } from "display";
import clock from "clock";
import { me } from "appbit";
import { gettext } from "i18n";
import * as kc from './kpay_core.js';
import * as kcfg from '../kpay_config.js';
import * as kcm from '../../../common/kpay/kpay_common.js';

var F = null, x = null, M = null, R = null, T = null, O = null, z = null, I = null;

function L() {
    console.log("KPay_dialogs - kpay_dialogs initialize called!"), me.permissions.granted("access_internet") || (console.log("KPay - ERROR: internet permission not enabled!"), 
    H(gettext("InternetRequired"))), kc.kp8(N, U, j);
}

function N(n) {
    console.log("KPay_dialogs - _mainLibInitialized()"), n && kcfg.KPAY_SHOW_PAID_APP_POPUP && (console.log("KPay_dialogs - Fresh install detected; showing paid app popup..."), 
    G());
}

function J(n) {
    return document.getElementById(n);
}

function q(n, e) {
    n && (n.style.display = e ? "inline" : "none");
}

function G() {
    var n = J("paidAppPopup");
    J("btnPaidAppOk").onclick = function(e) {
        q(n, !1);
    }, J("btnPaidAppAlreadyPaid").onclick = function(e) {
        var a = J("alreadyPaidPopup");
        J("btnAlreadyPaidOk").onclick = function(n) {
            q(a, !1);
        }, q(a, !0), q(n, !1);
    }, q(n, !0);
}

function U(n, e) {
    switch (console.log("KPay_dialogs - _handleEvent(e == " + n + ", extraData == " + e + ")"), 
    n) {
      case 5:
        W(gettext("PurchaseStarted"), e);
        break;

      case 6:
        W(gettext("CompletePurchase"), e);
        break;

      case 7:
        Y();
    }
}

function H(n) {
    console.log("KPay_dialogs - _showError() - message == " + n), F || (F = J("kpay_errorDialog"), 
    x = J("kpay_errorMessage")), x.text = n, B(), q(F, !0), V();
}

function W(n, e) {
    console.log("KPay_dialogs - _showTrialEnded() - message == " + n + "; code == " + e), 
    M || (M = J("kpay_trialEndedDialog"), R = J("kpay_trialEndedMessage"), T = J("kpay_trialEndedCode")), 
    T.text = X(e), R.text = n, B(), q(M, !0), V();
}

function Y() {
    console.log("KPay_dialogs - _showPurchaseSuccess()"), I || (I = J("kpay_purchaseSuccessDialog")), 
    B(), q(I, !0), M && q(M, !1), V("celebration-long"), setTimeout(j, 5e3);
}

function j() {
    console.log("KPay_dialogs - _hideAlert()"), Q(), F && q(F, !1), M && q(M, !1), I && q(I, !1);
}

function B() {
    O || (O = J("kpay_timeInDialog"), z = function() {
        var n = new Date(), e = ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2);
        O.text = e;
    }, clock.addEventListener("tick", function() {
        O && "inline" == O.style.display && z();
    })), O && (z(), q(O, !0));
}

function Q() {
    O && q(O, !1);
}

function V(n) {
    display.poke(), vibration.start(n || "nudge-max");
}

function X(n) {
    for (var e = ""; n > 0; ) e = String.fromCharCode(16 + n % 10) + e, n = n / 10 | 0;
    return e;
}

L();

