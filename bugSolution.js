```javascript
import * as React from 'react';
import { Camera, BarCodeScanner } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = debounce((data) => {
    setScanned(true);
    setBarcodeData(data);
    // Additional logic to process barcode data
    console.log('Barcode scanned:', data);
  });

  if (hasPermission === null) {
    return <View />; // Wait for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scanner} />
      </Camera>
      {scanned && (
        <Text>Barcode scanned: {JSON.stringify(barcodeData, null, 2)}</Text>
      )}
    </View>
  );
}
```