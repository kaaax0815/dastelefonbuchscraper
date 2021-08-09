import reverseLookup, { reverseLookupResult } from './index';

async function test() {
  const badresult = await reverseLookup('097626762');
  console.log(testResult(badresult, true));
  const goodresult = await reverseLookup('0977194800');
  console.log(testResult(goodresult, false));
}

function testResult(result: reverseLookupResult, bad: boolean) {
  if (bad) {
    if (
      result.status !== 'not found' &&
      result.succeeded !== false &&
      result.error !== 404 &&
      result.results
    ) {
      throw new Error(JSON.stringify(result) + ' - ' + 'Did not match test case');
    }
  } else {
    if (
      result.status !== 'done' &&
      result.succeeded !== true &&
      result.results?.[0].name !== 'Hotline zum Thema Coronavirus' &&
      result.results?.[0].type !== 'company' &&
      result.error
    ) {
      throw new Error(JSON.stringify(result) + ' - ' + 'Did not match test case');
    }
  }
  return JSON.stringify(result) + ' - ' + 'Did match test case';
}

test();
