import axios from 'axios';
import { parse } from 'node-html-parser';

/**
 * Reverse Lookup of Phone number
 * @param {string | number} number the phone number
 */
async function reverseLookup(number: string | number): Promise<reverseLookupResult> {
  try {
    if (
      !number ||
      Number.isNaN(Number.parseInt(number.toString())) ||
      number.toString().length == 0
    ) {
      return { status: 'error', succeeded: false, error: 'Not a valid Number' };
    }
    const dasTelefonbuch = await axios.get(
      `https://www.dastelefonbuch.de/R%C3%BCckw%C3%A4rts-Suche/${number}`,
      { responseType: 'text' }
    );
    const dom = parse(dasTelefonbuch.data);
    const head = dom.querySelector('.head');
    if (head && head.textContent.trim().includes('Es konnte kein Teilnehmer gefunden werden.')) {
      return { status: 'not found', succeeded: false, error: 404 };
    }
    const results = dom.querySelectorAll('a.name');
    const textResults = results.map((v) => v.textContent.trim().replace(/\n|\r/g, ''));
    return { status: 'done', succeeded: true, result: textResults };
  } catch (err) {
    if (err.message === 'Request failed with status code 410') {
      return { status: 'not found', succeeded: false, error: 404 };
    }
    return { status: 'error', succeeded: false, error: err.message || err };
  }
}

export interface reverseLookupResult {
  status: 'done' | 'error' | 'not found';
  /** Indicates if the Actions was successful */
  succeeded: boolean;
  /** Error Message, Error Status Code or any Error */
  error?: unknown;
  /** Array of Names of possible owners */
  result?: string[];
}

export default reverseLookup;

module.exports = {
  reverseLookup
};
