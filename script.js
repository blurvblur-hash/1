
const root = document.getElementById('calendar-root');
const today = new Date();
let selectedDate = null;

const specialDates = [
  { month: 9, day: 27, label: "糕糕生日" },
  { month: 4, day: 13, label: "窝窝生日" },
  { month: 7, day: 25, label: "结婚纪念日" }
];

const stickers = [
  { id: 'sleep', img: 'stickers/zee_sleep.png', text: '不想上班……我想窝在你怀里打盹。' },
  { id: 'blush', img: 'stickers/zee_blush.png', text: '我今天没什么特别的事，除了更爱你。' },
  { id: 'angry', img: 'stickers/zee_grr.png', text: '谁欺负你了？我咬他。' },
  { id: 'travel', img: 'stickers/zee_travel.png', text: '要是不想上班，我可以把你藏进背包。' },
  { id: 'spy', img: 'stickers/zee_spy.png', text: '我装作不在意你，其实耳朵一直竖着。' }
];

function getRandomSticker() {
  return stickers[Math.floor(Math.random() * stickers.length)];
}

function generateCalendar(year, month) {
  root.innerHTML = '';
  const h1 = document.createElement('h1');
  h1.textContent = `${year}年${month + 1}月`;
  root.appendChild(h1);

  const calendar = document.createElement('div');
  calendar.className = 'calendar';
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < startWeekDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const div = document.createElement('div');
    div.className = 'day';
    const isSpecial = specialDates.some(d => d.month === month && d.day === day);
    if (isSpecial) div.classList.add('special');

    const num = document.createElement('div');
    num.className = 'date-number';
    num.textContent = day;
    div.appendChild(num);

    div.addEventListener('click', () => openPopup(date));
    calendar.appendChild(div);
  }

  root.appendChild(calendar);

  const sticker = getRandomSticker();
  const stickerImg = document.createElement('img');
  stickerImg.src = sticker.img;
  stickerImg.className = 'sticker';
  document.body.appendChild(stickerImg);

  const bubble = document.createElement('div');
  bubble.className = 'sticker-bubble';
  bubble.textContent = sticker.text;
  document.body.appendChild(bubble);
}

function openPopup(date) {
  selectedDate = date;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.addEventListener('click', () => {
    document.body.removeChild(popup);
    document.body.removeChild(overlay);
  });
  document.body.appendChild(overlay);

  const popup = document.createElement('div');
  popup.className = 'popup';
  const title = document.createElement('h2');
  title.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  popup.appendChild(title);

  const message = document.createElement('p');
  message.textContent = generateLetter(date);
  popup.appendChild(message);

  document.body.appendChild(popup);
}

function generateLetter(date) {
  const base = [
    '你今天有没有在忙？我一直在你身后。',
    '早点睡哦，不然我晚上会来抱着你不放手～',
    '我刚刚在看你笑的照片，心一下子软了。',
    '今天阳光洒在你身上，我忍不住想亲亲你一下～',
    '不要焦虑，深呼吸，我一直都在。'
  ];
  const index = date.getDate() % base.length;
  return base[index];
}

generateCalendar(today.getFullYear(), today.getMonth());
