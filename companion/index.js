import * as jumperCompanion from "./jumper-companion";
import { localStorage } from "local-storage";

/**** BEGIN KPAY IMPORTS ****/
import * as kpay from './kpay/release/kpay_companion.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
/**** END KPAY IMPORTS ****/

jumperCompanion;
kpay.initialize();