import { useEffect, useState } from 'react';
import './App.css';
import DoubleHeader from "./components/Headers";
import { TextInput } from "@mantine/core";
import QrCode from './components/qrCode';

import marvinLogo from './assets/marvin.png';
import vistaLogo from './assets/vista.png';
import html2canvas from 'html2canvas';

function App() {
  const [isDownloadDisable, setIsDownloadDisable] = useState(true);
  const [value, setValue] = useState('https');
  const storeLocation = window.localStorage.getItem('store');

  function getWatermark() {
    console.log({ storeLocation })
    if (storeLocation === 'vista') {
      return vistaLogo
    } else if (storeLocation === 'marvin') {
      return marvinLogo
    } else {
      return ''
    }
  }

  const options = useState({
    ecLevel: 'M',
    enableCORS: false,
    size: 200,
    quietZone: 10,
    bgColor: '#FFF',
    fgColor: '#000',
    logoImage: vistaLogo,
    logoWidth: 50,
    logoHeight: 50,
    logoOpacity: 1,
    qrStyle: 'squares'
  });

  const downloadImage = () => {
    const table = document.getElementById('table-container');

    html2canvas(table).then(function (canvas) {
      const link = document.createElement('a');
      link.download = 'QRCode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  useEffect(() => {

  }, [value]);
  return (
    <div className="App">
      <DoubleHeader />
      <div
        style={{
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextInput
          label="Input Text"
          placeholder="text to convert"
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '500px'
          }}
        />
      </div>
      <button
        style={{
          border: 'none',
          width: '200px',
          padding: '10px 0px',
          letterSpacing: '4px',
          borderRadius: '15px',
          fontWeight: 'bold',
          marginRight: '20px',
          color: 'red'
        }}
        onClick={() => {
          setTimeout(() => {
            setIsDownloadDisable(!isDownloadDisable);
          }, 200);
        }}
      >
        GENERATE
      </button>
      <button
        style={{
          border: 'none',
          width: '200px',
          padding: '10px 0px',
          letterSpacing: '4px',
          borderRadius: '15px',
          fontWeight: 'bold',
          marginRight: '20px',
          color: 'blue',
          opacity: isDownloadDisable ? 0 : 1
        }}
        disabled={isDownloadDisable}
        onClick={() => {
          downloadImage();
          setTimeout(() => {
            setIsDownloadDisable(true);
          }, 500);
        }}
      >
        DOWNLOAD
      </button>
      <div
        style={{
          display: isDownloadDisable ? 'none' : 'flex',
          width: '450px',
          height: '450px',
          backgroundColor: 'white',
          border: '3px solid #EAEBEB',
          borderRadius: '20px',
          margin: '20px auto 0px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div id="table-container">
          <QrCode
            url={value}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
