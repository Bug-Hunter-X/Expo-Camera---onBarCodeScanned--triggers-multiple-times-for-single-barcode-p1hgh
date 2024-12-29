# Expo Camera: Multiple `onBarCodeScanned` Triggers

This repository demonstrates a bug in Expo's Camera API where the `onBarCodeScanned` callback function can fire multiple times for a single barcode scan. This issue is intermittent, making it difficult to reproduce consistently, but it significantly impacts performance and application logic when it occurs.

## Reproduction

The `bug.js` file contains a basic implementation showcasing the problem.  Run the Expo app and try scanning a barcode multiple times to see if the problem occurs.  You might need to try it several times or use a different barcode scanner.

## Solution

The `bugSolution.js` file provides a potential workaround using a debounce function. This ensures that the `onBarCodeScanned` function only executes once within a specified timeframe.  This approach mitigates the multiple-trigger issue effectively.

## Note

The exact cause of this intermittent behavior in Expo's Camera API is unclear. This solution works as a workaround; a more thorough investigation by the Expo team would be beneficial.