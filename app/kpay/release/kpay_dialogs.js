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

var I=null,O=null,C=null,K=null,R=null,T=null,q=null,F=null;function N(){me.permissions.granted("access_internet")||B(gettext("InternetRequired")),kc.kp8(J,z,L)}function J(n){n&&kcfg.KPAY_SHOW_PAID_APP_POPUP&&j()}function U(n){return document.getElementById(n)}function Y(n,t){n&&(n.style.display=t?"inline":"none")}function j(){var n=U("paidAppPopup");U("btnPaidAppOk").onclick=function(t){Y(n,!1)},U("btnPaidAppAlreadyPaid").onclick=function(t){var e=U("alreadyPaidPopup");U("btnAlreadyPaidOk").onclick=function(n){Y(e,!1)},Y(e,!0),Y(n,!1)},Y(n,!0)}function z(n,t){switch(n){case 5:G(gettext("PurchaseStarted"),t);break;case 6:G(gettext("CompletePurchase"),t);break;case 7:H()}}function B(n){I||(I=U("kpay_errorDialog"),O=U("kpay_errorMessage")),O.text=n,Q(),Y(I,!0),W()}function G(n,t){C||(C=U("kpay_trialEndedDialog"),K=U("kpay_trialEndedMessage"),R=U("kpay_trialEndedCode")),R.text=X(t),K.text=n,Q(),Y(C,!0),W()}function H(){F||(F=U("kpay_purchaseSuccessDialog")),Q(),Y(F,!0),C&&Y(C,!1),W("celebration-long"),setTimeout(L,5e3)}function L(){V(),I&&Y(I,!1),C&&Y(C,!1),F&&Y(F,!1)}function Q(){T||(T=U("kpay_timeInDialog"),q=function(){var n=new Date,t=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2);T.text=t},clock.addEventListener("tick",function(){T&&"inline"==T.style.display&&q()})),T&&(q(),Y(T,!0))}function V(){T&&Y(T,!1)}function W(n){display.poke(),vibration.start(n||"nudge-max")}function X(n){for(var t="";n>0;)t=String.fromCharCode(16+n%10)+t,n=n/10|0;return t}N();