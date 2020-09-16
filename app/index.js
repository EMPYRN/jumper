import * as jumperClock from "./jumper-clock";
import * as jumperGame from "./jumper-game";
import * as jumperSettings from "./jumper-settings";

/**** BEGIN KPAY IMPORTS ****/
import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
import './kpay/release/kpay_filetransfer.js';
import './kpay/release/kpay_dialogs.js';
import './kpay/release/kpay_time_trial.js';
/**** END KPAY IMPORTS ****/

/** Initialize */

jumperSettings;
jumperClock;
jumperGame;
kpay.initialize();