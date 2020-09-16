/*
* K·Pay Integration Library - v1.3.5 - Copyright Kiezel 2020
* Last Modified: 2020-08-07
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

import * as fs from "fs";
import * as messaging from 'messaging';
import * as kcm from '../../../common/kpay/kpay_common.js';
import * as kcfg from '../kpay_config.js';
import * as kp from './kpay.js';
export var kp0 = null, n = !1, e = {
    o: !1,
    i: !1,
    t: !1
}, a = null, o = null, t = null, s = null, u = !1, f = function() {
    return !1;
}, y = function() {}, g = function() {}, p = function() {}, P = function() {}, _ = function() {}, m = function() {
    return !1;
};

var KPAY_APP_ID = 25274006;
export function init() {
    console.log("KPay - _initialize()"), D() ? (console.log("KPay - Fresh install detected; generating new State..."), 
    kp0 = {
        sl: !1,
        it: new Date().getTime()
    }, P(!0), y(!0), console.log("KPay - Storing new State on fs"), kp11()) : (console.log("KPay - Loading existing State from fs"), 
    E(), console.log("KPay - Loaded State: " + JSON.stringify(kp0)), P(!1), y(!1)), 
    messaging.peerSocket.addEventListener("open", _), 0 === messaging.peerSocket.readyState && _();
}

export function useFileTransfer() {
    n = !0;
}

export function processMessageFromCompanion(n) {
    console.log("_onMessageFromCompanion()"), A(n) ? (console.log("KPay - Message from companion: " + JSON.stringify(n)), 
    C(n)) : n && "start" === n.purchase ? (console.log("KPay - 'StartPurchase' message from companion"), 
    startPurchase()) : n && "cancel" === n.purchase && (console.log("KPay - 'CancelPurchase' message from companion"), 
    cancelPurchase());
}

function K() {
    console.log("KPay - _cancelFailsafeStatusCheckTimer()"), null !== o && (clearTimeout(o), 
    o = null);
}

export function kp1(n) {
    console.log("KPay - s tartStatusChecksWithFailsafe(immediateCheck == " + n + ")"), 
    e.t = !1, kp2(n);
}

export function kp2(n) {
    console.log("KPay - s cheduleFailsafeStatusCheck(immediateCheck == " + n + ")"), 
    K(), e.t ? console.log("KPay - kp2() - checking finished") : (n && h(), null === o && (console.log("KPay - scheduling failsafe check for over 15 seconds..."), 
    o = setTimeout(function() {
        kp2(!0);
    }, 15e3)));
}

export function kp3() {
    console.log("KPay - e ndStatusReached()"), K(), e.t = !0;
}

function h() {
    console.log("KPay - _statusCheck()"), e.t = !1, t || (t = Math.round(4294967295 * Math.random()));
    var n = b(KPAY_APP_ID, t, k(kcfg.KPAY_TEST_MODE, !u));
    console.log("KPay - Sending status request message to companion..."), v(n);
}

function k(a, o) {
    var t = 1;
    return a && (console.log("KPay - FLAG: testmode"), t |= 2), (o || e.i) && (console.log("KPay - FLAG: trialDisabled/purchaseStarted"), 
    t |= 4), t |= 32, n && (console.log("KPay - FLAG: filetransfer"), t |= 64), t;
}

function v(n) {
    console.log("KPay - _sendMessageToCompanion()");
    try {
        if (0 === messaging.peerSocket.readyState) return messaging.peerSocket.send(n), 
        void console.log("KPay - message sent succesfull!");
    } catch (n) {
        console.error(JSON.stringify(n));
    }
    S(n);
}

function S(n) {
    console.log("KPay - _outboxFailedHandler(): message sending failed!"), console.log("KPay - try again in a little while..."), 
    kp1(!1);
}

export function startPurchase() {
    console.log("KPay - s tartPurchase()"), kp0.sl || (kp0.te = !0, e.i = !0, e.t = !1, 
    kp11(), kp1(!0));
}

export function cancelPurchase() {
    console.log("KPay - c ancelPurchase()");
    var n = w();
    console.log("KPay - sending cancelPurchase message..."), v(n), kp0.sl || (kp0.te = !1, 
    e.i = !1, kp11(), kp3(), p(), a = null);
}

function b(n, e, a) {
    return {
        isKpayMsg: !0,
        type: 0,
        appId: n,
        random: e,
        flags: a
    };
}

function w() {
    return {
        isKpayMsg: !0,
        type: 3
    };
}

function A(n) {
    return kcm.isKPayMessage(n) && 1 === n.type;
}

export function getStatus() {
    return kp0.sl ? "licensed" : kp0.ts && !kp0.te ? "trial" : "unlicensed";
}

function C(n) {
    console.log("KPay - _handleStatusResult");
    var o = n.serverResponse;
    if (console.log("KPay - Server response received: " + JSON.stringify(o)), "licensed" == o.status) kp0.sl = !0, 
    kp11(), kp5(7, null, !1), e.o = !1, kp3(); else if ("unlicensed" == o.status) {
        kp0.sl = !1, kp11(), 7 === a && (a = null), e.o = !0;
        var t = o.paymentCode, u = t != s;
        s = t, "waitForUser" == o.purchaseStatus ? kp5(5, t, u) : "inProgress" == o.purchaseStatus && kp5(6, t, u), 
        kp1(!0);
    } else m(o) || (console.log("KPay - Unsupported status: " + o.status), kp1(!0));
}

export function kp5(n, o, t) {
    if (console.log("KPay - f ireEvent()"), a !== n || t) {
        a = n, console.log("KPay - firing event callback for event " + n);
        try {
            f(n, o) || 7 === n && !e.o || g(n, o);
        } catch (n) {
            console.error("KPay - Error in event callback:" + n);
        }
    }
}

export function kp6() {
    return a;
}

export function kp7() {
    a = null;
}

export function setEventHandler(n) {
    f = n;
}

export function kp8(n, e, a) {
    y = n, g = e, p = a;
}

export function kp9(n, e, a) {
    u = !0, P = n, _ = e, m = a;
}

function D() {
    try {
        var n = fs.statSync("kps");
        return !(n && n.size);
    } catch (n) {
        return !0;
    }
}

function E() {
    D() || (kp0 = fs.readFileSync("kps", "cbor"));
}

export function kp11() {
    console.log("KPay - s aveState()"), fs.writeFileSync("kps", kp0, "cbor");
}

