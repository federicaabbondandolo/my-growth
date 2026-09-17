const STORAGE_KEY = "mygrowth.v1";

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5"/><path d="M7 10.8V20h10V10.8"/></svg>`,
  extra: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>`,
  scheda: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  movimento: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="5.2" r="1.6"/><path d="M8 21l2.2-6.2L7.5 12 10 8.5h4L16.5 12l-2.7 2.8L16 21"/></svg>`,
  cibo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
};

const ROUTINES = {
  A: {
    id: "A",
    title: "Forza",
    when: "Lunedì",
    blurb: "Carichi medi-alti. I riposi lunghi fanno parte dell’allenamento.",
    exercises: [
      { id: "hip-thrust", name: "Hip thrust", scheme: "3×6/8", sets: 3, hint: "Priorità glutei", rest: 150 },
      { id: "squat", name: "Squat", scheme: "3×8/10", sets: 3, hint: "O pressa, se la schiena lo chiede", rest: 150 },
      { id: "lat", name: "Lat machine", scheme: "3×8/10", sets: 3, hint: "Tiro completo, petto alto", rest: 90 },
      { id: "spinte-alto", name: "Spinte in alto", scheme: "3×8/10", sets: 3, hint: "Manubri, controllo", rest: 90 },
      { id: "alzate-laterali", name: "Alzate laterali", scheme: "2×12/15", sets: 2, hint: "Niente slancio", rest: 60 },
      { id: "addome", name: "Addome", scheme: "2–3 serie", sets: 3, hint: "Leggero, non a cedimento", rest: 60, hasLoad: false },
    ],
  },
  B: {
    id: "B",
    title: "Posteriori + spinta/tiro",
    when: "Mercoledì",
    blurb: "Oggi inserisci i pesi mentre li raggiungi. Non copiare i 100 kg dell’hip thrust sullo stacco.",
    exercises: [
      { id: "stacco-rumeno", name: "Stacco rumeno", scheme: "3×8/10", sets: 3, hint: "Schiena neutra, senti i femorali", rest: 150 },
      { id: "bulgarian", name: "Bulgarian squat", scheme: "3×8/10 a gamba", sets: 3, hint: "Equilibrio e controllo", rest: 150, unit: "kg/mano" },
      { id: "rematore", name: "Rematore", scheme: "3×8/12", sets: 3, hint: "Gomiti vicini al corpo", rest: 90 },
      { id: "chest-press", name: "Chest press", scheme: "3×8/12", sets: 3, hint: "Spinta controllata", rest: 90 },
      { id: "push-down", name: "Push down tricipiti", scheme: "2×10/15", sets: 2, hint: "Chiudi pulito", rest: 60 },
      { id: "curl", name: "Curl bicipiti", scheme: "2×10/15", sets: 2, hint: "Chiudi pulito", rest: 60 },
    ],
  },
  C: {
    id: "C",
    title: "Volume / pompaggio",
    when: "Venerdì o domenica",
    blurb: "I pesi li scrivi domenica, a fine seduta.",
    exercises: [
      { id: "hip-thrust", name: "Hip thrust", scheme: "3×10/12", sets: 3, hint: "Più ripetizioni della A", rest: 120 },
      { id: "pressa", name: "Pressa", scheme: "3×10/12", sets: 3, hint: "Controllo in discesa", rest: 120 },
      { id: "lat", name: "Lat machine o pullover", scheme: "3×10/12", sets: 3, hint: "Tiro completo", rest: 90 },
      { id: "spinte-alto", name: "Spinte spalle", scheme: "2–3×8/10", sets: 3, hint: "Controllo, niente slancio", rest: 90 },
      { id: "abductor", name: "Abductor", scheme: "3×12/20", sets: 3, hint: "Senti il gluteo medio", rest: 60 },
      { id: "alzate-laterali", name: "Alzate laterali + braccia", scheme: "2 serie ciascuno", sets: 2, hint: "Chiudi la settimana", rest: 60 },
    ],
  },
};

const MOVE_TYPES = ["Passeggiata", "Camminata veloce", "Yoga", "Stretching", "Bici", "Altro"];

const GYM = {
  A: { met: 5.0, minutes: 60 },
  B: { met: 5.0, minutes: 65 },
  C: { met: 4.8, minutes: 70 },
};

const MOVE_MET = {
  Passeggiata: 3.5,
  "Camminata veloce": 4.8,
  Yoga: 2.5,
  Stretching: 2.3,
  Bici: 6.8,
  Altro: 4.0,
};

const FOODS = [
  { name: "pasta", aliases: ["pasta", "spaghetti", "penne", "fusilli", "rigatoni"], kcal: 350, p: 13, portion: 80 },
  { name: "riso", aliases: ["riso", "basmati"], kcal: 350, p: 7, portion: 70 },
  { name: "pane", aliases: ["pane", "focaccia"], kcal: 270, p: 9, portion: 50 },
  { name: "pizza", aliases: ["pizza", "pizzetta"], kcal: 270, p: 11, portion: 250 },
  { name: "gnocchi", aliases: ["gnocchi"], kcal: 130, p: 4, portion: 200 },
  { name: "avena", aliases: ["avena", "porridge"], kcal: 370, p: 13, portion: 40 },
  { name: "olio", aliases: ["olio", "olio evo"], kcal: 884, p: 0, portion: 10 },
  { name: "burro", aliases: ["burro"], kcal: 717, p: 1, portion: 10 },
  { name: "uovo", aliases: ["uovo", "uova"], kcal: 143, p: 13, portion: 60 },
  { name: "yogurt greco", aliases: ["yogurt greco", "greco"], kcal: 97, p: 9, portion: 150 },
  { name: "yogurt", aliases: ["yogurt"], kcal: 63, p: 4, portion: 125 },
  { name: "mozzarella", aliases: ["mozzarella", "fior di latte"], kcal: 253, p: 18, portion: 100 },
  { name: "parmigiano", aliases: ["parmigiano", "grana"], kcal: 392, p: 33, portion: 20 },
  { name: "ricotta", aliases: ["ricotta"], kcal: 146, p: 11, portion: 100 },
  { name: "feta", aliases: ["feta"], kcal: 264, p: 14, portion: 40 },
  { name: "latte", aliases: ["latte"], kcal: 46, p: 3, portion: 200 },
  { name: "pollo", aliases: ["pollo", "petti di pollo", "petto di pollo"], kcal: 165, p: 31, portion: 150 },
  { name: "tacchino", aliases: ["tacchino"], kcal: 135, p: 29, portion: 120 },
  { name: "manzo", aliases: ["manzo", "carne", "bistecca"], kcal: 250, p: 26, portion: 150 },
  { name: "salmone", aliases: ["salmone"], kcal: 208, p: 20, portion: 130 },
  { name: "tonno", aliases: ["tonno"], kcal: 132, p: 29, portion: 80 },
  { name: "pesce", aliases: ["pesce", "orata", "branzino", "merluzzo"], kcal: 120, p: 20, portion: 150 },
  { name: "bresaola", aliases: ["bresaola"], kcal: 151, p: 32, portion: 50 },
  { name: "prosciutto", aliases: ["prosciutto", "crudo"], kcal: 220, p: 26, portion: 50 },
  { name: "ceci", aliases: ["ceci"], kcal: 164, p: 9, portion: 150 },
  { name: "lenticchie", aliases: ["lenticchie"], kcal: 116, p: 9, portion: 150 },
  { name: "hummus", aliases: ["hummus", "humus"], kcal: 237, p: 8, portion: 50 },
  { name: "mela", aliases: ["mela", "mele"], kcal: 52, p: 0, portion: 180 },
  { name: "banana", aliases: ["banana", "banane"], kcal: 89, p: 1, portion: 120 },
  { name: "frutta", aliases: ["frutta", "pera", "arancia", "kiwi"], kcal: 50, p: 1, portion: 150 },
  { name: "insalata", aliases: ["insalata", "verdura", "verdure", "insalatona"], kcal: 18, p: 1, portion: 150 },
  { name: "zucchine", aliases: ["zucchine", "zucchina"], kcal: 17, p: 1, portion: 200 },
  { name: "pomodori", aliases: ["pomodori", "pomodoro", "pomodorini"], kcal: 18, p: 1, portion: 150 },
  { name: "broccoli", aliases: ["broccoli", "broccolo"], kcal: 34, p: 3, portion: 150 },
  { name: "avocado", aliases: ["avocado"], kcal: 160, p: 2, portion: 70 },
  { name: "patate", aliases: ["patate", "patata"], kcal: 77, p: 2, portion: 200 },
  { name: "patatine", aliases: ["patatine"], kcal: 536, p: 7, portion: 80 },
  { name: "cioccolato", aliases: ["cioccolato", "cioccolata"], kcal: 546, p: 5, portion: 20 },
  { name: "gelato", aliases: ["gelato"], kcal: 200, p: 4, portion: 100 },
  { name: "brioche", aliases: ["brioche", "cornetto"], kcal: 406, p: 8, portion: 60 },
  { name: "miele", aliases: ["miele"], kcal: 304, p: 0, portion: 15 },
  { name: "zucchero", aliases: ["zucchero"], kcal: 387, p: 0, portion: 5 },
  { name: "vino", aliases: ["vino"], kcal: 85, p: 0, portion: 125 },
  { name: "birra", aliases: ["birra"], kcal: 43, p: 0, portion: 330 },
  { name: "cappuccino", aliases: ["cappuccino"], kcal: 54, p: 3, portion: 150 },
  { name: "caffè", aliases: ["caffe", "caffè"], kcal: 2, p: 0, portion: 30 },
  { name: "sugo", aliases: ["sugo", "pomodoro sugo"], kcal: 70, p: 2, portion: 80 },
  { name: "lasagna", aliases: ["lasagna", "lasagne"], kcal: 160, p: 8, portion: 250 },
  { name: "hamburger", aliases: ["hamburger", "burger"], kcal: 265, p: 15, portion: 180 },
  { name: "sushi", aliases: ["sushi"], kcal: 150, p: 6, portion: 200 },
];

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(iso, n) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

function mondayOf(iso) {
  const d = parseISO(iso);
  const wd = d.getDay() || 7;
  d.setDate(d.getDate() - (wd - 1));
  return toISO(d);
}

function weekRange() {
  const start = mondayOf(todayISO());
  return { start, end: addDays(start, 6) };
}

function inThisWeek(iso) {
  const { start, end } = weekRange();
  return iso >= start && iso <= end;
}

function plannedToday() {
  const js = parseISO(todayISO()).getDay();
  if (js === 1) return "A";
  if (js === 3) return "B";
  if (js === 5 || js === 0) return "C";
  return null;
}

function weightKg() {
  return Number(state.weightKg) || 60;
}

function defaultNutrition() {
  return {
    heightCm: "",
    age: "",
    waistCm: "",
    hipCm: "",
    goal: "ricomposizione",
    meals: [],
    chat: [{
      role: "app",
      text: "Scrivi quello che hai mangiato, con le quantità. Esempio: 80g pasta, 100g pollo, un’insalata, un cucchiaio d’olio.",
    }],
  };
}

function nutrition() {
  return { ...defaultNutrition(), ...(state.nutrition || {}) };
}

function todayMeals() {
  return (nutrition().meals || []).filter((item) => item.date === todayISO());
}

function todayFoodKcal() {
  return todayMeals().reduce((sum, item) => sum + Number(item.kcal || 0), 0);
}

function todayProtein() {
  return todayMeals().reduce((sum, item) => sum + Number(item.protein || 0), 0);
}

function tdeeKcal() {
  const kg = weightKg();
  const cm = Number(nutrition().heightCm);
  const age = Number(nutrition().age);
  if (!cm || !age) return null;
  const bmr = 10 * kg + 6.25 * cm - 5 * age - 161;
  return Math.round(bmr * 1.4);
}

function findFood(chunk) {
  const sorted = FOODS.flatMap((food) => food.aliases.map((alias) => ({ food, alias })))
    .sort((a, b) => b.alias.length - a.alias.length);
  return sorted.find((row) => chunk.includes(row.alias))?.food || null;
}

function parseQuantity(chunk, food) {
  const grams = chunk.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|gr|grammi|ml)\b/i);
  if (grams) {
    const n = Number(grams[1].replace(",", "."));
    return grams[2].toLowerCase() === "kg" ? n * 1000 : n;
  }
  const spoons = chunk.match(/(\d+(?:[.,]\d+)?)\s*(cucchiai[oa]?|cucchiaini[oa]?)\b/i);
  if (spoons) return Number(spoons[1].replace(",", ".")) * (chunk.includes("cucchiain") ? 5 : 10);
  const num = chunk.match(/\b(\d+(?:[.,]\d+)?)\b/);
  const words = { un: 1, una: 1, uno: 1, due: 2, tre: 3, quattro: 4, mezzo: 0.5, mezza: 0.5 };
  const word = Object.keys(words).find((key) => new RegExp(`\\b${key}\\b`, "i").test(chunk));
  if (word) return words[word] * food.portion;
  if (num && !/g|ml|kg/.test(chunk)) return Number(num[1].replace(",", ".")) * food.portion;
  if (/piatto|piattino/.test(chunk)) return food.portion * 1.4;
  return food.portion;
}

function parseFoodText(text) {
  const parts = String(text || "")
    .toLowerCase()
    .replace(/\be poi\b/g, ",")
    .split(/,|;|\s+\+\s+|\s+e\s+|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const items = [];
  const unknown = [];
  for (const part of parts) {
    const food = findFood(part);
    if (!food) {
      unknown.push(part);
      continue;
    }
    const grams = Math.max(5, Math.round(parseQuantity(part, food)));
    const kcalItem = Math.round(food.kcal * (grams / 100));
    const protein = Math.round(food.p * (grams / 100));
    items.push({
      name: food.name,
      grams,
      kcal: kcalItem,
      protein,
      label: `${food.name} (${grams}g)`,
    });
  }
  return { items, unknown };
}

function nutritionAdvice(eaten, protein) {
  const target = tdeeKcal();
  const needP = Math.round(weightKg() * 1.6);
  const goal = nutrition().goal;
  const bits = [];
  if (target) {
    bits.push(`Oggi ${eaten} kcal su circa ${target} di fabbisogno.`);
    if (eaten > target + 150) bits.push("Da ridurre: olio extra, pane, dolci, alcol.");
    else if (eaten < target - 350) bits.push("Sei un po’ bassa di calorie: intorno all’allenamento aumenta pasta, riso o frutta.");
    else bits.push("Sei in una zona buona rispetto al fabbisogno.");
  } else {
    bits.push(`Oggi ${eaten} kcal. Completa altezza ed età sopra, così stimo il fabbisogno.`);
  }
  if (protein < needP - 10) bits.push(`Proteine ${protein}g: meglio avvicinarti a ${needP}g (uova, yogurt greco, pollo, bresaola, pesce).`);
  else bits.push(`Proteine ${protein}g: ok.`);
  if (goal === "dimagrire") bits.push("Per dimagrire tieni l’olio a un cucchiaio a pasto e riempi il piatto di verdure.");
  if (goal === "ricomposizione") bits.push("Per ricomposizione: proteine ad ogni pasto, carboidrati soprattutto vicino alla sala.");
  bits.push("Da aumentare: verdure, acqua, proteine magre. Da evitare spesso: salse cremose, aperitivo, spuntini senza fame.");
  return bits.join(" ");
}

function sendFoodChat() {
  const text = document.getElementById("food-in")?.value?.trim();
  if (!text) return;
  ui.foodDraft = "";
  state.nutrition = nutrition();
  state.nutrition.chat.push({ role: "user", text });
  const summary = /^(oggi|totale|riepilogo|quanto)\b/i.test(text) && !/\d/.test(text);
  if (summary) {
    state.nutrition.chat.push({
      role: "app",
      text: nutritionAdvice(todayFoodKcal(), todayProtein()),
    });
    saveState();
    render();
    return;
  }
  const parsed = parseFoodText(text);
  if (!parsed.items.length) {
    state.nutrition.chat.push({
      role: "app",
      text: parsed.unknown.length
        ? `Non ho in elenco: ${parsed.unknown.join(", ")}. Prova con 80g pasta, 1 uovo, un yogurt, 100g pollo.`
        : "Scrivi alimento e quantità. Esempio: 80g pasta, 100g pollo, un’insalata.",
    });
    saveState();
    render();
    return;
  }
  const kcalTot = parsed.items.reduce((sum, item) => sum + item.kcal, 0);
  const proteinTot = parsed.items.reduce((sum, item) => sum + item.protein, 0);
  state.nutrition.meals.push({
    id: uid(),
    date: todayISO(),
    text,
    items: parsed.items,
    kcal: kcalTot,
    protein: proteinTot,
  });
  const extra = parsed.unknown.length ? ` Non ho contato: ${parsed.unknown.join(", ")}.` : "";
  const lines = parsed.items.map((item) => `${item.label}: ${item.kcal} kcal`).join(" · ");
  state.nutrition.chat.push({
    role: "app",
    text: `${lines}. Pasto ${kcalTot} kcal.${extra} ${nutritionAdvice(todayFoodKcal(), todayProtein())}`,
  });
  saveState();
  render();
}

function saveNutritionProfile() {
  state.nutrition = nutrition();
  const height = Number(document.getElementById("nut-height")?.value);
  const age = Number(document.getElementById("nut-age")?.value);
  const waist = Number(document.getElementById("nut-waist")?.value);
  const hip = Number(document.getElementById("nut-hip")?.value);
  const weight = Number(document.getElementById("nut-weight")?.value);
  if (weight > 30 && weight < 200) state.weightKg = weight;
  if (height) state.nutrition.heightCm = height;
  if (age) state.nutrition.age = age;
  if (waist) state.nutrition.waistCm = waist;
  if (hip) state.nutrition.hipCm = hip;
  saveState();
  ui.toast = tdeeKcal()
    ? `Profilo salvato · fabbisogno circa ${tdeeKcal()} kcal.`
    : "Profilo salvato. Metti anche altezza ed età per il fabbisogno.";
  render();
}

function kcal(met, minutes) {
  return Math.round(met * weightKg() * (minutes / 60));
}

function gymKcal(day, minutes) {
  const g = GYM[day];
  return kcal(g.met, minutes || g.minutes);
}

function moveKcal(item) {
  if (item.kcal) return item.kcal;
  return kcal(MOVE_MET[item.type] || 4, item.minutes);
}

function sessionKcal(session) {
  if (session.kcal) return session.kcal;
  return gymKcal(session.day, session.minutes);
}

function weekSessions() {
  return state.sessions.filter((s) => inThisWeek(s.date));
}

function weekMoves() {
  return state.movements.filter((m) => inThisWeek(m.date));
}

function doneDays() {
  return new Set(weekSessions().map((s) => s.day));
}

function weekTotals() {
  const sessions = weekSessions();
  const moves = weekMoves();
  const gymMin = sessions.reduce((sum, s) => sum + (s.minutes || GYM[s.day].minutes), 0);
  const extraMin = moves.reduce((sum, m) => sum + Number(m.minutes || 0), 0);
  const gymKcalTot = sessions.reduce((sum, s) => sum + sessionKcal(s), 0);
  const extraKcalTot = moves.reduce((sum, m) => sum + moveKcal(m), 0);
  return {
    sessions,
    moves,
    gymMin,
    extraMin,
    gymKcal: gymKcalTot,
    extraKcal: extraKcalTot,
    totalKcal: gymKcalTot + extraKcalTot,
    totalMin: gymMin + extraMin,
  };
}

function dayStatus(key) {
  if (doneDays().has(key)) return "fatto";
  if (plannedToday() === key || (key === "B" && !plannedToday() && !doneDays().has("B"))) return "oggi";
  return "in attesa";
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
}

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formatDay(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatKg(n) {
  if (n == null || n === "") return "—";
  const x = Number(n);
  if (Number.isNaN(x)) return "—";
  return Number.isInteger(x) ? String(x) : String(Math.round(x * 10) / 10);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function findExercise(day, id) {
  return ROUTINES[day].exercises.find((ex) => ex.id === id);
}

function defaultState() {
  return {
    weightKg: 60,
    lastDay: "A",
    lastDate: "2026-09-14",
    loads: {
      A: {
        "hip-thrust": 100,
        squat: 60,
        lat: 32,
        "spinte-alto": 8,
        "alzate-laterali": 5,
      },
      B: {},
      C: {},
    },
    sessions: [
      {
        id: "seed-a-14",
        date: "2026-09-14",
        day: "A",
        minutes: 60,
        kcal: 300,
        exercises: [
          { id: "hip-thrust", name: "Hip thrust", kg: 100, setsDone: 3, sets: 3 },
          { id: "squat", name: "Squat", kg: 60, setsDone: 3, sets: 3 },
          { id: "lat", name: "Lat machine", kg: 32, setsDone: 3, sets: 3 },
          { id: "spinte-alto", name: "Spinte in alto", kg: 8, setsDone: 3, sets: 3 },
          { id: "alzate-laterali", name: "Alzate laterali", kg: 5, setsDone: 2, sets: 2 },
        ],
      },
    ],
    history: [
      { id: "h1", date: "2026-09-14", day: "A", exerciseId: "hip-thrust", name: "Hip thrust", kg: 100 },
      { id: "h2", date: "2026-09-14", day: "A", exerciseId: "squat", name: "Squat", kg: 60 },
      { id: "h3", date: "2026-09-14", day: "A", exerciseId: "lat", name: "Lat machine", kg: 32 },
      { id: "h4", date: "2026-09-14", day: "A", exerciseId: "spinte-alto", name: "Spinte in alto", kg: 8 },
      { id: "h5", date: "2026-09-14", day: "A", exerciseId: "alzate-laterali", name: "Alzate laterali", kg: 5 },
    ],
    movements: [],
    events: [],
    hiddenCalUids: [],
    nutrition: defaultNutrition(),
    draft: null,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    const data = {
      ...base,
      ...parsed,
      loads: {
        A: { ...base.loads.A, ...(parsed.loads?.A || {}) },
        B: { ...(parsed.loads?.B || {}) },
        C: { ...(parsed.loads?.C || {}) },
      },
      events: Array.isArray(parsed.events) ? parsed.events : [],
      hiddenCalUids: Array.isArray(parsed.hiddenCalUids) ? parsed.hiddenCalUids : [],
      nutrition: { ...defaultNutrition(), ...(parsed.nutrition || {}) },
    };
    return moveTodaysWalkToTuesday(data);
  } catch {
    return defaultState();
  }
}

function moveTodaysWalkToTuesday(data) {
  if (data.migratedWalkTue) return data;
  const today = todayISO();
  const tuesday = addDays(mondayOf(today), 1);
  const walk = data.movements.find((item) => (
    item.date === today && (item.type === "Passeggiata" || item.type === "Camminata veloce")
  )) || data.movements.find((item) => item.date === today);
  if (walk) {
    walk.date = tuesday;
    data.migratedWalkTue = true;
  }
  return data;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveEventsDb();
}

const EVENTS_DB = "mygrowth.events";

function openEventsDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(EVENTS_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("impegni")) {
        db.createObjectStore("impegni", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

async function saveEventsDb() {
  if (!window.indexedDB) return;
  try {
    const db = await openEventsDb();
    const tx = db.transaction(["impegni", "meta"], "readwrite");
    const store = tx.objectStore("impegni");
    store.clear();
    for (const item of (state.events || [])) {
      if (item?.id) store.put(item);
    }
    tx.objectStore("meta").put({ key: "hiddenCalUids", value: state.hiddenCalUids || [] });
    await txDone(tx);
  } catch {
    /* localStorage resta il piano B */
  }
}

async function loadEventsDb() {
  if (!window.indexedDB) return null;
  try {
    const db = await openEventsDb();
    const tx = db.transaction(["impegni", "meta"], "readonly");
    const events = await new Promise((resolve, reject) => {
      const req = tx.objectStore("impegni").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
    const hidden = await new Promise((resolve) => {
      const req = tx.objectStore("meta").get("hiddenCalUids");
      req.onsuccess = () => resolve(req.result?.value || []);
      req.onerror = () => resolve([]);
    });
    return { events, hiddenCalUids: hidden };
  } catch {
    return null;
  }
}

const LOOK_KEY = "mygrowth.look";
const LOOK_DEFAULT = { font: "elegante", align: "centro", place: "centro" };

function loadLook() {
  try {
    return { ...LOOK_DEFAULT, ...JSON.parse(localStorage.getItem(LOOK_KEY) || "{}") };
  } catch {
    return { ...LOOK_DEFAULT };
  }
}

function applyLook() {
  document.documentElement.dataset.font = ui.look.font;
  document.documentElement.dataset.align = ui.look.align;
  document.documentElement.dataset.place = ui.look.place;
  localStorage.setItem(LOOK_KEY, JSON.stringify(ui.look));
}

const ui = {
  tab: "home",
  schedaDay: "B",
  progressDay: "B",
  toast: "",
  restUntil: 0,
  restLabel: "",
  moveType: "Passeggiata",
  moveDate: todayISO(),
  agendaForm: false,
  agendaEdit: null,
  foodDraft: "",
  look: loadLook(),
};

let state = loadState();
let restTimer = null;
if (state.migratedWalkTue) saveState();

function getLoad(day, id) {
  const value = state.loads[day]?.[id];
  return value == null || value === "" ? null : Number(value);
}

function startWorkout(day) {
  if (state.draft && state.draft.day === day) {
    ui.tab = "workout";
    render();
    return;
  }
  const routine = ROUTINES[day];
  state.draft = {
    day,
    startedAt: new Date().toISOString(),
    exercises: routine.exercises.map((ex) => ({
      ...ex,
      kg: ex.hasLoad === false ? null : getLoad(day, ex.id),
      done: Array.from({ length: ex.sets }, () => false),
    })),
  };
  saveState();
  ui.tab = "workout";
  render();
}

function bumpKg(id, delta) {
  const ex = state.draft?.exercises.find((item) => item.id === id);
  if (!ex || ex.hasLoad === false) return;
  const current = Number(ex.kg);
  const base = Number.isNaN(current) ? 0 : current;
  ex.kg = Math.max(0, Math.round((base + delta) * 10) / 10);
  saveState();
  const input = document.querySelector(`[data-kg-input="${id}"]`);
  if (input) input.value = ex.kg;
}

function setDraftKg(id, value) {
  const ex = state.draft?.exercises.find((item) => item.id === id);
  if (!ex || ex.hasLoad === false) return;
  if (value === "") ex.kg = null;
  else {
    const n = Number(value);
    if (!Number.isNaN(n)) ex.kg = Math.max(0, n);
  }
  saveState();
}

function toggleSet(id, index) {
  const ex = state.draft?.exercises.find((item) => item.id === id);
  if (!ex) return;
  ex.done[index] = !ex.done[index];
  saveState();
  const btn = document.querySelector(`[data-set="${id}-${index}"]`);
  if (btn) btn.classList.toggle("on", ex.done[index]);
  const card = document.querySelector(`[data-ex="${id}"]`);
  if (card) card.classList.toggle("done", ex.done.every(Boolean));
  if (ex.done[index] && !ex.done.every(Boolean)) startRest(ex.rest, ex.name);
  if (navigator.vibrate) navigator.vibrate(12);
}

function startRest(seconds, label) {
  ui.restUntil = Date.now() + seconds * 1000;
  ui.restLabel = label;
  if (restTimer) clearInterval(restTimer);
  restTimer = setInterval(tickRest, 250);
  renderRest();
}

function skipRest() {
  ui.restUntil = 0;
  ui.restLabel = "";
  if (restTimer) clearInterval(restTimer);
  renderRest();
}

function tickRest() {
  if (!ui.restUntil) return;
  if (Date.now() >= ui.restUntil) {
    skipRest();
    return;
  }
  const clock = document.querySelector("[data-rest-clock]");
  if (clock) clock.textContent = restClock();
}

function restClock() {
  const left = Math.max(0, Math.ceil((ui.restUntil - Date.now()) / 1000));
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
}

function pushHistory(day, ex) {
  if (ex.hasLoad === false || ex.kg == null || ex.kg === "") return;
  state.history.unshift({
    id: uid(),
    date: todayISO(),
    day,
    exerciseId: ex.id,
    name: ex.name,
    kg: Number(ex.kg),
  });
}

function finishWorkout() {
  const w = state.draft;
  if (!w) return;
  const session = {
    id: uid(),
    date: todayISO(),
    day: w.day,
    minutes: GYM[w.day].minutes,
    kcal: gymKcal(w.day),
    exercises: w.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      kg: ex.hasLoad === false ? null : ex.kg,
      setsDone: ex.done.filter(Boolean).length,
      sets: ex.sets,
    })),
  };
  state.sessions.unshift(session);
  state.lastDay = w.day;
  state.lastDate = session.date;
  w.exercises.forEach((ex) => {
    if (ex.hasLoad !== false && ex.kg != null && ex.kg !== "") {
      state.loads[w.day][ex.id] = Number(ex.kg);
      pushHistory(w.day, ex);
    }
  });
  state.draft = null;
  ui.tab = "movimento";
  ui.toast = `Allenamento ${w.day} salvato · ${gymKcal(w.day)} kcal.`;
  skipRest();
  saveState();
  render();
}

function discardDraft() {
  if (!window.confirm("Annullare la seduta? I check di oggi si perdono.")) return;
  state.draft = null;
  skipRest();
  saveState();
  ui.tab = "movimento";
  render();
}

function saveManualLoad() {
  const day = document.getElementById("manual-day")?.value;
  const exerciseId = document.getElementById("manual-ex")?.value;
  const kgRaw = document.getElementById("manual-kg")?.value;
  const kg = Number(kgRaw);
  if (!day || !exerciseId || kgRaw === "" || Number.isNaN(kg)) {
    ui.toast = "Scegli esercizio e scrivi i chili.";
    render();
    return;
  }
  const ex = findExercise(day, exerciseId);
  state.loads[day][exerciseId] = kg;
  pushHistory(day, { ...ex, kg });
  ui.progressDay = day;
  ui.toast = `${ex.name}: ${formatKg(kg)} kg salvati.`;
  saveState();
  render();
}

function addMovement() {
  const minutes = Number(document.getElementById("mov-min")?.value);
  const note = document.getElementById("mov-note")?.value?.trim() || "";
  if (!minutes || minutes <= 0) {
    ui.toast = "Scrivi i minuti.";
    render();
    return;
  }
  const date = ui.moveDate || todayISO();
  const burned = kcal(MOVE_MET[ui.moveType] || 4, minutes);
  state.movements.unshift({
    id: uid(),
    date,
    type: ui.moveType,
    minutes,
    kcal: burned,
    note,
  });
  ui.toast = `${ui.moveType}: ${minutes} min · ${formatDay(date)} · ${burned} kcal.`;
  saveState();
  render();
}

function removeMovement(id) {
  state.movements = state.movements.filter((item) => item.id !== id);
  saveState();
  render();
}

function statusLabel(key) {
  const map = { fatto: "fatto", oggi: "da fare oggi", "in attesa": "in attesa" };
  return map[dayStatus(key)];
}

function prettyTime(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":");
  const hour = Number(h);
  if (hour === 0) return `00:${m}`;
  return `${hour}:${m}`;
}

function eventWhen(item) {
  if (!item.start) return "Tutto il giorno";
  if (!item.end) return prettyTime(item.start);
  return `${prettyTime(item.start)}–${prettyTime(item.end)}`;
}

function allEvents() {
  return Array.isArray(state.events) ? state.events : [];
}

function sortedEvents(list) {
  return [...list].sort((a, b) => `${a.date}T${a.start || "00:00"}`.localeCompare(`${b.date}T${b.start || "00:00"}`));
}

function todayEvents() {
  const today = todayISO();
  return sortedEvents(allEvents().filter((item) => item.date === today));
}

function weekAgendaEvents() {
  return sortedEvents(allEvents().filter((item) => inThisWeek(item.date)));
}

function upcomingEvents() {
  const today = todayISO();
  return sortedEvents(allEvents().filter((item) => item.date >= today)).slice(0, 10);
}

function groupEventsByDate(list) {
  const map = new Map();
  for (const item of list) {
    if (!map.has(item.date)) map.set(item.date, []);
    map.get(item.date).push(item);
  }
  return [...map.entries()];
}

function findEvent(id) {
  return allEvents().find((item) => item.id === id);
}

function icsValue(block, key) {
  const match = block.match(new RegExp(`^${key}[^:\\n]*:(.*)$`, "mi"));
  return match ? match[1].trim() : "";
}

function unescapeIcs(value) {
  return String(value || "")
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function parseIcsStamp(value) {
  const compact = String(value || "").replace(/[^0-9]/g, "");
  if (compact.length < 8) return null;
  const date = `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`;
  const time = compact.length >= 12 ? `${compact.slice(8, 10)}:${compact.slice(10, 12)}` : "";
  return { date, time };
}

function parseIcs(text) {
  const unfolded = String(text || "").replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
  return unfolded.split(/BEGIN:VEVENT/i).slice(1).flatMap((raw) => {
    const block = raw.split(/END:VEVENT/i)[0];
    if (/^STATUS:CANCELLED/mi.test(block)) return [];
    const summary = unescapeIcs(icsValue(block, "SUMMARY"));
    const start = parseIcsStamp(icsValue(block, "DTSTART"));
    if (!summary || !start) return [];
    const end = parseIcsStamp(icsValue(block, "DTEND"));
    const note = unescapeIcs(icsValue(block, "LOCATION") || icsValue(block, "DESCRIPTION"));
    return [{
      id: uid(),
      calUid: icsValue(block, "UID") || `${summary}|${start.date}|${start.time}`,
      title: summary,
      date: start.date,
      start: start.time,
      end: end && end.date === start.date ? end.time : "",
      note: note.slice(0, 180),
    }];
  });
}

function mergeCalendarEvents(incoming) {
  if (!Array.isArray(incoming)) return 0;
  if (!Array.isArray(state.events)) state.events = [];
  const hidden = new Set(state.hiddenCalUids || []);
  const seen = new Set(state.events.map((item) => item.calUid).filter(Boolean));
  let added = 0;
  for (const item of incoming) {
    if (!item?.title || !item?.date || !item?.calUid) continue;
    if (hidden.has(item.calUid) || seen.has(item.calUid)) continue;
    seen.add(item.calUid);
    state.events.push({
      id: uid(),
      calUid: item.calUid,
      title: item.title,
      date: item.date,
      start: item.start || "",
      end: item.end || "",
      note: item.note || "",
      fromCalendar: true,
    });
    added += 1;
  }
  if (added) saveState();
  return added;
}

function scheduleMorningReminders() {
  const payload = allEvents().filter((item) => item.date >= todayISO());
  fetch("/api/schedule-reminders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

async function loadCalendarFeed(fromApi = false) {
  const urls = fromApi ? ["/api/calendar-sync", "./impegni.json"] : ["./impegni.json"];
  for (const url of urls) {
    try {
      const res = await fetch(`${url}?t=${Date.now()}`);
      if (!res.ok) continue;
      const incoming = await res.json();
      if (!Array.isArray(incoming)) continue;
      return mergeCalendarEvents(incoming);
    } catch {
      /* try next */
    }
  }
  return -1;
}

function importIcsFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const incoming = parseIcs(String(reader.result || ""));
    const from = mondayOf(todayISO());
    const to = addDays(todayISO(), 60);
    const seen = new Set(allEvents().map((item) => item.calUid || `${item.title}|${item.date}|${item.start || ""}`));
    let added = 0;
    if (!Array.isArray(state.events)) state.events = [];
    for (const item of incoming) {
      if (item.date < from || item.date > to) continue;
      if (seen.has(item.calUid)) continue;
      seen.add(item.calUid);
      state.events.push(item);
      added += 1;
    }
    ui.toast = added ? `${added} impegni portati da Calendar.` : "Nessun impegno nuovo in quel file.";
    saveState();
    render();
  };
  reader.readAsText(file);
}

function openAgendaForm(id = null) {
  ui.agendaForm = true;
  ui.agendaEdit = id;
  render();
}

function closeAgendaForm() {
  ui.agendaForm = false;
  ui.agendaEdit = null;
  render();
}

function saveAgendaEvent() {
  const title = document.getElementById("evt-title")?.value?.trim();
  const date = document.getElementById("evt-date")?.value;
  const start = document.getElementById("evt-start")?.value || "";
  const end = document.getElementById("evt-end")?.value || "";
  const note = document.getElementById("evt-note")?.value?.trim() || "";
  if (!title) {
    ui.toast = "Scrivi cosa devi fare.";
    render();
    return;
  }
  if (!date) {
    ui.toast = "Scegli il giorno.";
    render();
    return;
  }
  if (!Array.isArray(state.events)) state.events = [];
  if (ui.agendaEdit) {
    const current = findEvent(ui.agendaEdit);
    if (current) Object.assign(current, { title, date, start, end, note });
  } else {
    state.events.push({ id: uid(), title, date, start, end, note });
  }
  ui.toast = `${title} · ${formatDay(date)}`;
  ui.agendaForm = false;
  ui.agendaEdit = null;
  saveState();
  scheduleMorningReminders();
  render();
}

function removeEvent(id) {
  const current = findEvent(id);
  if (current?.calUid) {
    state.hiddenCalUids = [...(state.hiddenCalUids || []), current.calUid];
  }
  state.events = allEvents().filter((item) => item.id !== id);
  saveState();
  render();
}

function renderEventRow(item) {
  return `
    <article class="agenda-item">
      <button class="agenda-main" data-act="edit-event" data-id="${esc(item.id)}">
        <span class="when">${esc(eventWhen(item))}</span>
        <span>
          <h3>${esc(item.title)}</h3>
          ${item.note ? `<p class="muted">${esc(item.note)}</p>` : ""}
        </span>
      </button>
      <button class="btn ghost danger" style="min-height:40px;padding:0 10px" data-act="del-event" data-id="${esc(item.id)}">Togli</button>
    </article>
  `;
}

function renderAgendaList() {
  const today = todayEvents();
  if (today.length) {
    return `
      <h2 class="agenda-title">Oggi</h2>
      ${today.map(renderEventRow).join("")}
    `;
  }
  const week = weekAgendaEvents();
  if (week.length) {
    return `
      <h2 class="agenda-title">Questa settimana</h2>
      <p class="muted" style="margin:-4px 0 12px">Oggi niente. Ecco il resto.</p>
      ${groupEventsByDate(week).map(([date, items]) => `
        <p class="eye agenda-kicker">${esc(formatDay(date))}</p>
        ${items.map(renderEventRow).join("")}
      `).join("")}
    `;
  }
  const next = upcomingEvents();
  if (next.length) {
    return `
      <h2 class="agenda-title">Prossimi</h2>
      <p class="muted" style="margin:-4px 0 12px">Questa settimana è libera. Ecco cosa arriva dopo, dal Calendar.</p>
      ${groupEventsByDate(next).map(([date, items]) => `
        <p class="eye agenda-kicker">${esc(formatDay(date))}</p>
        ${items.map(renderEventRow).join("")}
      `).join("")}
    `;
  }
  return `
    <h2 class="agenda-title">Agenda</h2>
    <p class="muted">Niente in programma. Aggiungi un impegno.</p>
  `;
}

function renderAgendaForm() {
  const current = ui.agendaEdit ? findEvent(ui.agendaEdit) : null;
  return `
    <h2 class="agenda-title">${current ? "Modifica" : "Nuovo impegno"}</h2>
    <div class="field">
      <label for="evt-title">Cosa</label>
      <input id="evt-title" type="text" maxlength="80" placeholder="es. call, cena, visita" value="${esc(current?.title || "")}" />
    </div>
    <div class="field">
      <label for="evt-date">Giorno</label>
      <input id="evt-date" type="date" value="${esc(current?.date || todayISO())}" />
    </div>
    <div class="field-row">
      <div class="field">
        <label for="evt-start">Dalle</label>
        <input id="evt-start" type="time" value="${esc(current?.start || "")}" />
      </div>
      <div class="field">
        <label for="evt-end">Alle</label>
        <input id="evt-end" type="time" value="${esc(current?.end || "")}" />
      </div>
    </div>
    <div class="field">
      <label for="evt-note">Nota, se vuoi</label>
      <input id="evt-note" type="text" maxlength="180" placeholder="luogo o dettaglio" value="${esc(current?.note || "")}" />
    </div>
    <div class="finish-wrap">
      <button class="btn primary" data-act="save-event">${current ? "Salva" : "Aggiungi"}</button>
      <button class="btn ghost" data-act="cancel-event">Annulla</button>
    </div>
  `;
}

function renderHome() {
  return `
    <div class="home">
      ${ui.toast ? `<div class="toast">${esc(ui.toast)}</div>` : ""}
      <div class="home-hero">
        <div class="mark">MY GROWTH</div>
        <p class="eye" style="margin-top:14px">${esc(formatDay(todayISO()))}</p>
        <h1>Bentornata Federica</h1>
      </div>
      <section class="agenda">
        ${ui.agendaForm ? renderAgendaForm() : `
          ${renderAgendaList()}
          <div class="finish-wrap">
            <button class="btn primary" data-act="open-event">Aggiungi impegno</button>
          </div>
        `}
      </section>
    </div>
  `;
}

function kgLabel(day, ex) {
  if (ex.hasLoad === false) return "—";
  const kg = getLoad(day, ex.id);
  if (kg == null) return `<span class="empty-kg">da inserire</span>`;
  return `${esc(formatKg(kg))} ${esc(ex.unit || "kg")}`;
}

function renderScheda() {
  const day = ui.schedaDay;
  const routine = ROUTINES[day];
  const draftSame = state.draft && state.draft.day === day;
  return `
    ${ui.toast ? `<div class="toast">${esc(ui.toast)}</div>` : ""}
    <div class="top">
      <div class="mark">MY GROWTH</div>
      <div class="eye">${esc(formatDay(todayISO()))}</div>
    </div>
    <button class="btn ghost" data-act="tab" data-tab="movimento" style="margin-bottom:14px">Indietro a Movimento</button>
    <h1>Scheda di allenamento</h1>
    ${["A", "B", "C"].map((item) => {
      const st = dayStatus(item);
      const r = ROUTINES[item];
      return `
        <button class="dest${item === day ? " blush" : ""}" data-act="scheda-day" data-day="${item}">
          <div class="eye">${esc(r.when)} · ${esc(statusLabel(item))}</div>
          <h2>Allenamento ${item}</h2>
          <p>${esc(r.title)} · ${gymKcal(item)} kcal stimate</p>
        </button>
      `;
    }).join("")}
    <h2 style="margin:18px 0 8px">Allenamento ${esc(day)}</h2>
    <p class="muted" style="margin-bottom:12px">${esc(routine.blurb)}</p>
    ${routine.exercises.map((ex) => `
      <article class="card">
        <div class="row">
          <div>
            <h3>${esc(ex.name)}</h3>
            <p class="muted">${esc(ex.scheme)}</p>
          </div>
          <div class="kg">${kgLabel(day, ex)}</div>
        </div>
        <p class="muted" style="margin-top:8px">${esc(ex.hint)}</p>
      </article>
    `).join("")}
    <div class="finish-wrap">
      <button class="btn primary" data-act="start" data-day="${day}">${draftSame ? "Riprendi allenamento" : "Inizia Allenamento " + day}</button>
    </div>
  `;
}

function renderMovimento() {
  const tot = weekTotals();
  const { start, end } = weekRange();
  const days = ["L", "M", "M", "G", "V", "S", "D"];
  const todayJs = parseISO(todayISO()).getDay() || 7;
  return `
    ${ui.toast ? `<div class="toast">${esc(ui.toast)}</div>` : ""}
    <div class="top">
      <div class="mark">MY GROWTH</div>
      <div class="eye">riepilogo</div>
    </div>
    <h1>Movimento</h1>
    <p class="muted" style="margin:8px 0 14px">${esc(formatDay(start))} → ${esc(formatDay(end))}</p>
    <div class="week">
      ${days.map((label, i) => {
        const iso = addDays(start, i);
        const hasGym = tot.sessions.some((s) => s.date === iso);
        const hasExtra = tot.moves.some((m) => m.date === iso);
        const current = i + 1 === todayJs;
        return `<span class="week-day${current ? " now" : ""}${hasGym || hasExtra ? " on" : ""}">${label}</span>`;
      }).join("")}
    </div>
    <div class="stats">
      <div><strong>${tot.sessions.length}/3</strong><span>allenamenti</span></div>
      <div><strong>${tot.extraMin}</strong><span>min extra</span></div>
      <div><strong>${tot.totalKcal}</strong><span>kcal</span></div>
    </div>
    <h2 style="margin:8px 0 8px">In sala</h2>
    ${tot.sessions.length ? tot.sessions.map((s) => `
      <article class="card">
        <div class="row">
          <div>
            <h3>Allenamento ${esc(s.day)}</h3>
            <p class="muted">${esc(formatDay(s.date))} · ${esc(s.minutes || GYM[s.day].minutes)} min</p>
          </div>
          <div class="kg">${sessionKcal(s)} kcal</div>
        </div>
      </article>
    `).join("") : `<p class="muted">Nessuna seduta ancora questa settimana.</p>`}
    <h2 style="margin:18px 0 8px">Scheda</h2>
    <p class="muted" style="margin-bottom:12px">Apri A, B o C per allenarti.</p>
    <div class="finish-wrap" style="margin-top:0">
      <button class="btn ghost" data-act="tab" data-tab="scheda">Apri scheda di allenamento</button>
    </div>
    <h2 style="margin:18px 0 8px">Extra</h2>
    ${tot.moves.length ? tot.moves.map((m) => `
      <article class="card">
        <div class="row">
          <div>
            <h3>${esc(m.type)}</h3>
            <p class="muted">${esc(formatDay(m.date))} · ${esc(m.minutes)} min · ${moveKcal(m)} kcal</p>
          </div>
          <button class="btn ghost danger" style="min-height:40px;padding:0 10px" data-act="del-move" data-id="${esc(m.id)}">Togli</button>
        </div>
      </article>
    `).join("") : `<p class="muted">Niente extra questa settimana.</p>`}
    ${renderExtraForm()}
    <p class="muted" style="margin-top:16px">Stima su ${weightKg()} kg. Sala: A ${gymKcal("A")} · B ${gymKcal("B")} · C ${gymKcal("C")} kcal.</p>
  `;
}

function renderExtraForm() {
  const preview = kcal(MOVE_MET[ui.moveType], 30);
  const { start } = weekRange();
  const days = ["L", "M", "M", "G", "V", "S", "D"];
  const today = todayISO();
  if (!ui.moveDate) ui.moveDate = today;
  return `
    <p class="lede" style="margin:16px 0 8px">Aggiungi un extra: scegli il giorno, poi i minuti. Calcolo io le calorie.</p>
    <p class="eye" style="margin:16px 0 8px">Giorno</p>
    <div class="week">
      ${days.map((label, i) => {
        const iso = addDays(start, i);
        const future = iso > today;
        const selected = iso === ui.moveDate;
        return `<button class="week-day${selected ? " on" : ""}${iso === today ? " now" : ""}" data-act="move-date" data-date="${iso}" ${future ? "disabled" : ""} aria-pressed="${selected}">${label}</button>`;
      }).join("")}
    </div>
    <p class="muted" style="margin:-8px 0 16px">${esc(formatDay(ui.moveDate))}</p>
    <div class="chips">
      ${MOVE_TYPES.map((type) => `
        <button data-act="move-type" data-type="${esc(type)}" aria-pressed="${ui.moveType === type}">${esc(type)}</button>
      `).join("")}
    </div>
    <div class="field">
      <label for="mov-min">Minuti</label>
      <input id="mov-min" type="number" inputmode="numeric" min="1" step="5" placeholder="es. 30" />
    </div>
    <p class="muted" data-kcal-live style="margin-bottom:12px">Esempio: 30 min di ${esc(ui.moveType)} ≈ ${preview} kcal</p>
    <div class="field">
      <label for="mov-note">Nota, se vuoi</label>
      <textarea id="mov-note" placeholder="es. passeggiata al parco"></textarea>
    </div>
    <button class="btn primary" data-act="add-move">Aggiungi extra</button>
  `;
}

function renderExtra() {
  return renderMovimento();
}

function renderAlimentazione() {
  const n = nutrition();
  const target = tdeeKcal();
  const eaten = todayFoodKcal();
  return `
    ${ui.toast ? `<div class="toast">${esc(ui.toast)}</div>` : ""}
    <div class="top">
      <div class="mark">MY GROWTH</div>
      <div class="eye">cosa mangio</div>
    </div>
    <h1>Alimentazione</h1>
    <p class="lede">I tuoi numeri, poi la chat: scrivi il pasto, io conto le calorie e ti dico cosa tenere e cosa tagliare.</p>
    <div class="stats" style="margin-top:18px">
      <div><strong>${eaten}</strong><span>kcal oggi</span></div>
      <div><strong>${target || "—"}</strong><span>fabbisogno</span></div>
      <div><strong>${todayProtein()}</strong><span>proteine g</span></div>
    </div>
    <h2 class="agenda-title">Parametri</h2>
    <div class="field-row">
      <div class="field">
        <label for="nut-weight">Peso kg</label>
        <input id="nut-weight" type="number" inputmode="decimal" min="40" max="150" step="0.1" value="${esc(weightKg())}" />
      </div>
      <div class="field">
        <label for="nut-height">Altezza cm</label>
        <input id="nut-height" type="number" inputmode="numeric" min="140" max="200" value="${esc(n.heightCm)}" />
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label for="nut-age">Età</label>
        <input id="nut-age" type="number" inputmode="numeric" min="16" max="80" value="${esc(n.age)}" />
      </div>
      <div class="field">
        <label for="nut-waist">Vita cm</label>
        <input id="nut-waist" type="number" inputmode="decimal" min="50" max="140" step="0.5" value="${esc(n.waistCm)}" />
      </div>
    </div>
    <div class="field">
      <label for="nut-hip">Fianchi cm</label>
      <input id="nut-hip" type="number" inputmode="decimal" min="50" max="160" step="0.5" value="${esc(n.hipCm)}" />
    </div>
    <p class="eye" style="margin:4px 0 8px">Obiettivo</p>
    <div class="chips">
      ${["ricomposizione", "dimagrire", "mantenere"].map((goal) => `
        <button data-act="nut-goal" data-goal="${goal}" aria-pressed="${n.goal === goal}">${goal}</button>
      `).join("")}
    </div>
    <button class="btn ghost" data-act="save-nutrition" style="margin-bottom:22px">Salva parametri</button>
    <h2 class="agenda-title">Chat pasti</h2>
    <div class="chat-log" data-chat-log>
      ${(n.chat || []).map((msg) => `
        <div class="bubble ${msg.role === "user" ? "user" : "app"}">${esc(msg.text)}</div>
      `).join("")}
    </div>
    <div class="chips">
      <button data-act="food-example" data-text="80g pasta, 100g pollo, un’insalata, un cucchiaio d’olio">Esempio pranzo</button>
      <button data-act="food-example" data-text="yogurt greco, una banana">Esempio spuntino</button>
    </div>
    <div class="composer">
      <label class="visually-hidden" for="food-in">Cosa hai mangiato</label>
      <input id="food-in" type="text" maxlength="220" placeholder="es. 80g pasta, 1 mozzarella" value="${esc(ui.foodDraft || "")}" />
      <button class="btn primary" data-act="send-food">Calcola</button>
    </div>
  `;
}

function renderWorkout() {
  const w = state.draft;
  const routine = ROUTINES[w.day];
  return `
    <div class="top">
      <div class="mark">MY GROWTH</div>
      <div class="eye">in corso</div>
    </div>
    <p class="eye">${esc(formatDay(todayISO()))}</p>
    <h1>${esc(w.day)} — ${esc(routine.title)}</h1>
    <p class="lede">${esc(routine.blurb)}</p>
    <div style="height:12px"></div>
    ${w.exercises.map((ex) => {
      const complete = ex.done.every(Boolean);
      return `
        <article class="ex${complete ? " done" : ""}" data-ex="${esc(ex.id)}">
          <header>
            <div>
              <h3>${esc(ex.name)}</h3>
              <p class="muted">${esc(ex.scheme)}</p>
            </div>
          </header>
          <p class="hint">${esc(ex.hint)}</p>
          ${ex.hasLoad === false ? "" : `
            <div class="load">
              <button data-act="kg" data-id="${esc(ex.id)}" data-delta="-1" aria-label="Togli un chilo">−</button>
              <input data-kg-input="${esc(ex.id)}" type="number" inputmode="decimal" step="1" min="0" value="${ex.kg ?? ""}" placeholder="kg" aria-label="Chilogrammi ${esc(ex.name)}" />
              <button data-act="kg" data-id="${esc(ex.id)}" data-delta="1" aria-label="Aggiungi un chilo">+</button>
              <span class="unit">${esc(ex.unit || "kg")}</span>
            </div>
          `}
          <div class="sets">
            ${ex.done.map((on, i) => `
              <button class="${on ? "on" : ""}" data-act="set" data-id="${esc(ex.id)}" data-i="${i}" data-set="${esc(ex.id)}-${i}" aria-pressed="${on}">${i + 1}</button>
            `).join("")}
          </div>
        </article>
      `;
    }).join("")}
    <div class="finish-wrap">
      <button class="btn primary" data-act="finish">Salva allenamento</button>
      <button class="btn ghost danger" data-act="discard">Annulla</button>
    </div>
  `;
}

function renderNav() {
  if (ui.tab === "workout") return "";
  const tab = ui.tab === "scheda" || ui.tab === "extra" ? "movimento" : ui.tab;
  return `
    <nav class="nav" aria-label="Sezioni">
      <button data-act="tab" data-tab="home"${tab === "home" ? ' aria-current="page"' : ""}>${ICONS.home}Home</button>
      <button data-act="tab" data-tab="movimento"${tab === "movimento" ? ' aria-current="page"' : ""}>${ICONS.movimento}Movimento</button>
      <button data-act="tab" data-tab="alimentazione"${tab === "alimentazione" ? ' aria-current="page"' : ""}>${ICONS.cibo}Alimentazione</button>
    </nav>
  `;
}

function renderRest() {
  const bar = document.querySelector("[data-rest-bar]");
  if (!bar) return;
  if (!ui.restUntil || Date.now() >= ui.restUntil) {
    bar.innerHTML = "";
    bar.hidden = true;
    return;
  }
  bar.hidden = false;
  bar.innerHTML = `
    <div>
      <div class="eye">Riposo · ${esc(ui.restLabel)}</div>
      <strong data-rest-clock>${restClock()}</strong>
    </div>
    <button data-act="skip-rest">Fatto</button>
  `;
}

function render() {
  const root = document.getElementById("app");
  const screens = {
    home: renderHome,
    movimento: renderMovimento,
    scheda: renderScheda,
    extra: renderMovimento,
    alimentazione: renderAlimentazione,
    workout: renderWorkout,
  };
  root.innerHTML = `
    <main class="screen">${screens[ui.tab]()}</main>
    <div class="rest" data-rest-bar hidden></div>
    ${renderNav()}
  `;
  renderRest();
  const log = document.querySelector("[data-chat-log]");
  if (log) log.scrollTop = log.scrollHeight;
  if (ui.toast) setTimeout(() => { ui.toast = ""; }, 3200);
}

document.getElementById("app").addEventListener("click", (event) => {
  const btn = event.target.closest("[data-act]");
  if (!btn) return;
  const act = btn.dataset.act;
  if (act === "tab") ui.tab = btn.dataset.tab === "extra" ? "movimento" : btn.dataset.tab;
  if (act === "scheda-day") ui.schedaDay = btn.dataset.day;
  if (act === "progress-day") ui.progressDay = btn.dataset.day;
  if (act === "start") startWorkout(btn.dataset.day);
  if (act === "kg") bumpKg(btn.dataset.id, Number(btn.dataset.delta));
  if (act === "set") toggleSet(btn.dataset.id, Number(btn.dataset.i));
  if (act === "finish") finishWorkout();
  if (act === "discard") discardDraft();
  if (act === "skip-rest") skipRest();
  if (act === "save-manual") saveManualLoad();
  if (act === "add-move") {
    const w = Number(document.getElementById("weight-kg")?.value);
    if (w > 30 && w < 200) state.weightKg = w;
    addMovement();
    return;
  }
  if (act === "save-nutrition") {
    saveNutritionProfile();
    return;
  }
  if (act === "nut-goal") {
    state.nutrition = nutrition();
    state.nutrition.goal = btn.dataset.goal;
    saveState();
    render();
    return;
  }
  if (act === "food-example") {
    ui.foodDraft = btn.dataset.text;
    render();
    return;
  }
  if (act === "send-food") {
    sendFoodChat();
    ui.foodDraft = "";
    return;
  }
  if (act === "del-move") removeMovement(btn.dataset.id);
  if (act === "move-type") {
    ui.moveType = btn.dataset.type;
    render();
    return;
  }
  if (act === "move-date") {
    ui.moveDate = btn.dataset.date;
    render();
    return;
  }
  if (act === "open-event") {
    openAgendaForm();
    return;
  }
  if (act === "edit-event") {
    openAgendaForm(btn.dataset.id);
    return;
  }
  if (act === "save-event") {
    saveAgendaEvent();
    return;
  }
  if (act === "cancel-event") {
    closeAgendaForm();
    return;
  }
  if (act === "del-event") {
    removeEvent(btn.dataset.id);
    return;
  }
  if (act === "sync-calendar") {
    ui.toast = "Sto leggendo il Calendar…";
    render();
    loadCalendarFeed(true).then((added) => {
      if (added < 0) ui.toast = "Non riesco a leggere il Calendar adesso.";
      else if (added) ui.toast = `${added} impegni dal Calendar.`;
      else ui.toast = "Calendar già aggiornato.";
      scheduleMorningReminders();
      render();
    });
    return;
  }
  if (act === "import-ics") {
    document.getElementById("ics-file")?.click();
    return;
  }
  if (act === "look-font") {
    ui.look.font = btn.dataset.font;
    applyLook();
    render();
    return;
  }
  if (act === "look-align") {
    ui.look.align = btn.dataset.align;
    applyLook();
    render();
    return;
  }
  if (act === "look-place") {
    ui.look.place = btn.dataset.place;
    applyLook();
    render();
    return;
  }
  if (["tab", "scheda-day", "progress-day"].includes(act)) render();
});

document.getElementById("app").addEventListener("change", (event) => {
  if (event.target.id === "ics-file" && event.target.files?.[0]) {
    importIcsFile(event.target.files[0]);
    event.target.value = "";
    return;
  }
  if (event.target.id !== "manual-day") return;
  ui.progressDay = event.target.value;
  render();
  const select = document.getElementById("manual-day");
  if (select) select.value = ui.progressDay;
});

document.getElementById("app").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "food-in") {
    event.preventDefault();
    sendFoodChat();
    ui.foodDraft = "";
  }
});

document.getElementById("app").addEventListener("input", (event) => {
  const input = event.target.closest("[data-kg-input]");
  if (input) {
    setDraftKg(input.getAttribute("data-kg-input"), input.value);
    return;
  }
  if (event.target.id === "mov-min") {
    const live = document.querySelector("[data-kcal-live]");
    const min = Number(event.target.value);
    if (live && min > 0) live.textContent = `Stima: ${kcal(MOVE_MET[ui.moveType] || 4, min)} kcal`;
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js?v=16").catch(() => {});
}

applyLook();
(async function boot() {
  try {
    const fromDb = await loadEventsDb();
    if (fromDb?.events?.length) {
      state.events = fromDb.events;
      if (fromDb.hiddenCalUids?.length) state.hiddenCalUids = fromDb.hiddenCalUids;
    } else if ((state.events || []).length) {
      await saveEventsDb();
    }
  } catch {
    /* resta localStorage */
  }
  await loadCalendarFeed();
  render();
})();
