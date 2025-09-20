import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

const logDiv = document.getElementById('log');
const dataRef = ref(db, 'locations');

onValue(dataRef, (snapshot) => {
  const data = snapshot.val();

  if (!data) {
    logDiv.textContent = '目前尚無位置紀錄。';
    return;
  }

  const entries = Object.entries(data).sort((a, b) => b[0] - a[0]);
  logDiv.innerHTML = '';

  entries.forEach(([_, entry]) => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.textContent = entry.location;


    div.onclick = () => {
      const match = entry.location.match(/https:\/\/www\.google\.com\/maps\?q=[^\n\s]+/);
      const mapLink = match ? match[0] : null;

      if (mapLink) {
        navigator.clipboard.writeText(mapLink).then(() => {
          alert("已複製地圖連結！");
        });
      } else {
        alert("找不到地圖連結！");
      }
    };

    logDiv.appendChild(div);
  });
}, (error) => {
  console.error("讀取 Firebase 失敗:", error);
  logDiv.textContent = '讀取資料發生錯誤。';
});