const STORAGE_KEY = "ledgerly-data-v1";

const categories = {
  expense: ["Housing", "Food", "Transport", "Health", "Shopping", "Entertainment", "Bills", "Travel", "Other"],
  income: ["Salary", "Freelance", "Investments", "Gift", "Other"]
};

const palette = ["#16845b", "#315f91", "#b77b12", "#c8503d", "#7062a8", "#288b94", "#8b5a2b", "#6a746d", "#a65374"];

const icons = {
  "layout-dashboard": '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect>',
  "receipt-text": '<path d="M5 3v18l2-1.4L9 21l2-1.4 2 1.4 2-1.4 2 1.4 2-1.4V3z"></path><path d="M8 8h8"></path><path d="M8 12h8"></path><path d="M8 16h5"></path>',
  "wallet-cards": '<path d="M4 7h16a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1z"></path><path d="M16 12h5v4h-5a2 2 0 0 1 0-4z"></path><path d="M6 7V5a2 2 0 0 1 2-2h9"></path>',
  sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"></path><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"></path><path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8z"></path>',
  "trash-2": '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 15H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>',
  landmark: '<path d="M3 21h18"></path><path d="M5 10h14"></path><path d="M6 10v8"></path><path d="M10 10v8"></path><path d="M14 10v8"></path><path d="M18 10v8"></path><path d="M12 3l8 4H4z"></path>',
  "trending-up": '<path d="M3 17l6-6 4 4 8-8"></path><path d="M15 7h6v6"></path>',
  "trending-down": '<path d="M3 7l6 6 4-4 8 8"></path><path d="M15 17h6v-6"></path>',
  "piggy-bank": '<path d="M19 9h2v5h-2"></path><path d="M5 11a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5H8l-2 2v-3.5A5 5 0 0 1 5 11z"></path><path d="M9 10h.01"></path><path d="M13 6V4h3"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  save: '<path d="M5 3h12l2 2v16H5z"></path><path d="M8 3v6h8V3"></path><path d="M8 21v-7h8v7"></path>',
  x: '<path d="M6 6l12 12"></path><path d="M18 6L6 18"></path>'
};

const state = {
  type: "expense",
  transactions: [],
  budgets: {},
  month: ""
};

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  balanceValue: document.querySelector("#balanceValue"),
  incomeValue: document.querySelector("#incomeValue"),
  expenseValue: document.querySelector("#expenseValue"),
  savingsValue: document.querySelector("#savingsValue"),
  categoryInput: document.querySelector("#categoryInput"),
  budgetCategory: document.querySelector("#budgetCategory"),
  budgetAmount: document.querySelector("#budgetAmount"),
  budgetList: document.querySelector("#budgetList"),
  transactionForm: document.querySelector("#transactionForm"),
  budgetForm: document.querySelector("#budgetForm"),
  descriptionInput: document.querySelector("#descriptionInput"),
  amountInput: document.querySelector("#amountInput"),
  dateInput: document.querySelector("#dateInput"),
  transactionTable: document.querySelector("#transactionTable"),
  filterCategory: document.querySelector("#filterCategory"),
  filterType: document.querySelector("#filterType"),
  emptyState: document.querySelector("#emptyState"),
  categoryChart: document.querySelector("#categoryChart"),
  topCategory: document.querySelector("#topCategory"),
  seedDemo: document.querySelector("#seedDemo"),
  clearData: document.querySelector("#clearData")
};

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function monthKey(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

function monthLabel(key) {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    transactions: state.transactions,
    budgets: state.budgets
  }));
}

function load() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  state.transactions = Array.isArray(saved.transactions) ? saved.transactions : [];
  state.budgets = saved.budgets || {};
  state.month = monthKey();
  els.dateInput.valueAsDate = new Date();
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach(el => {
    const name = el.dataset.icon;
    const path = icons[name];
    if (!path) return;
    el.innerHTML = `<svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  });
}

function fillSelect(select, values, selected = values[0]) {
  select.innerHTML = values.map(value => `<option value="${value}">${value}</option>`).join("");
  select.value = selected;
}

function populateControls() {
  fillSelect(els.categoryInput, categories[state.type]);
  fillSelect(els.budgetCategory, categories.expense);
  fillSelect(els.filterCategory, ["All categories", ...new Set([...categories.expense, ...categories.income])], "All categories");
}

function populateMonths() {
  const keys = new Set([monthKey()]);
  state.transactions.forEach(item => keys.add(item.date.slice(0, 7)));
  els.monthSelect.innerHTML = [...keys].sort().reverse().map(key => `<option value="${key}">${monthLabel(key)}</option>`).join("");
  els.monthSelect.value = state.month;
}

function monthTransactions() {
  return state.transactions.filter(item => item.date.startsWith(state.month));
}

function totals(items = monthTransactions()) {
  const income = items.filter(item => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = items.filter(item => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  return { income, expense, balance: income - expense };
}

function byCategory(items, type = "expense") {
  return items
    .filter(item => item.type === type)
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});
}

function drawChart() {
  const ctx = els.categoryChart.getContext("2d");
  const width = els.categoryChart.width;
  const height = els.categoryChart.height;
  const data = Object.entries(byCategory(monthTransactions()))
    .sort((a, b) => b[1] - a[1]);
  const total = data.reduce((sum, [, value]) => sum + value, 0);

  ctx.clearRect(0, 0, width, height);
    ctx.font = "700 14px system-ui, sans-serif";
  ctx.textBaseline = "middle";

  if (!total) {
    ctx.fillStyle = "#6a746d";
    ctx.textAlign = "center";
    ctx.fillText("Add expenses to see your spending mix", width / 2, height / 2);
    els.topCategory.textContent = "No spending yet";
    return;
  }

  const max = data[0][1];
  els.topCategory.textContent = `${data[0][0]} leads`;

  data.forEach(([category, value], index) => {
    const y = 28 + index * 32;
    const barWidth = Math.max(18, (value / max) * (width - 190));
    ctx.fillStyle = palette[index % palette.length];
    ctx.fillRect(130, y - 9, barWidth, 18);
    ctx.fillStyle = "#17201b";
    ctx.textAlign = "right";
    ctx.fillText(category, 116, y);
    ctx.textAlign = "left";
    ctx.fillText(formatMoney(value), 142 + barWidth, y);
  });
}

function renderSummary() {
  const currentTotals = totals();
  const savingsRate = currentTotals.income ? Math.round((currentTotals.balance / currentTotals.income) * 100) : 0;
  els.balanceValue.textContent = formatMoney(currentTotals.balance);
  els.incomeValue.textContent = formatMoney(currentTotals.income);
  els.expenseValue.textContent = formatMoney(currentTotals.expense);
  els.savingsValue.textContent = `${Math.max(savingsRate, 0)}%`;
}

function renderBudgets() {
  const spent = byCategory(monthTransactions());
  els.budgetList.innerHTML = categories.expense.map(category => {
    const limit = Number(state.budgets[category] || 0);
    const used = spent[category] || 0;
    const percent = limit ? Math.min((used / limit) * 100, 130) : 0;
    const status = limit && used > limit ? "over" : percent >= 80 ? "warning" : "";
    const label = limit ? `${formatMoney(used)} / ${formatMoney(limit)}` : `${formatMoney(used)} spent`;
    return `
      <div class="budget-item">
        <strong>${category}</strong>
        <div class="progress-track" aria-label="${category} budget usage">
          <div class="progress-fill ${status}" style="width: ${Math.min(percent, 100)}%"></div>
        </div>
        <span>${label}</span>
      </div>
    `;
  }).join("");
}

function renderTransactions() {
  const category = els.filterCategory.value;
  const type = els.filterType.value;
  const rows = monthTransactions()
    .filter(item => category === "All categories" || item.category === category)
    .filter(item => type === "all" || item.type === type)
    .sort((a, b) => b.date.localeCompare(a.date));

  els.transactionTable.innerHTML = rows.map(item => `
    <tr>
      <td><strong>${item.description}</strong></td>
      <td><span class="category-pill">${item.category}</span></td>
      <td>${new Date(`${item.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
      <td class="amount-cell ${item.type === "income" ? "income-text" : "expense-text"}">
        ${item.type === "income" ? "+" : "-"}${formatMoney(item.amount)}
      </td>
      <td>
        <button class="delete-row" type="button" data-delete="${item.id}" aria-label="Delete transaction" title="Delete transaction">
          <span data-icon="x"></span>
        </button>
      </td>
    </tr>
  `).join("");

  els.emptyState.classList.toggle("show", rows.length === 0);
  renderIcons();
}

function render() {
  populateMonths();
  renderSummary();
  renderBudgets();
  renderTransactions();
  drawChart();
}

function setType(type) {
  state.type = type;
  document.querySelectorAll("[data-type]").forEach(button => {
    button.classList.toggle("active", button.dataset.type === type);
  });
  fillSelect(els.categoryInput, categories[type]);
}

function seedDemoData() {
  const today = new Date();
  const currentMonth = monthKey(today);
  state.transactions = [
    ["income", "Salary", "Salary", 5200, `${currentMonth}-01`],
    ["income", "Freelance project", "Freelance", 850, `${currentMonth}-10`],
    ["expense", "Apartment rent", "Housing", 1650, `${currentMonth}-02`],
    ["expense", "Groceries", "Food", 420, `${currentMonth}-06`],
    ["expense", "Metro card", "Transport", 86, `${currentMonth}-07`],
    ["expense", "Pharmacy", "Health", 64, `${currentMonth}-09`],
    ["expense", "Dinner with friends", "Entertainment", 118, `${currentMonth}-12`],
    ["expense", "Internet bill", "Bills", 72, `${currentMonth}-15`]
  ].map(([type, description, category, amount, date]) => ({
    id: crypto.randomUUID(),
    type,
    description,
    category,
    amount,
    date
  }));
  state.budgets = { Housing: 1700, Food: 600, Transport: 160, Health: 180, Shopping: 300, Entertainment: 250, Bills: 180, Travel: 400, Other: 150 };
  state.month = currentMonth;
  save();
  render();
}

document.querySelectorAll("[data-type]").forEach(button => {
  button.addEventListener("click", () => setType(button.dataset.type));
});

els.transactionForm.addEventListener("submit", event => {
  event.preventDefault();
  state.transactions.push({
    id: crypto.randomUUID(),
    type: state.type,
    description: els.descriptionInput.value.trim(),
    category: els.categoryInput.value,
    amount: Number(els.amountInput.value),
    date: els.dateInput.value
  });
  els.transactionForm.reset();
  els.dateInput.valueAsDate = new Date();
  setType(state.type);
  save();
  render();
});

els.budgetForm.addEventListener("submit", event => {
  event.preventDefault();
  state.budgets[els.budgetCategory.value] = Number(els.budgetAmount.value || 0);
  els.budgetAmount.value = "";
  save();
  render();
});

els.transactionTable.addEventListener("click", event => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  state.transactions = state.transactions.filter(item => item.id !== button.dataset.delete);
  save();
  render();
});

els.monthSelect.addEventListener("change", event => {
  state.month = event.target.value;
  render();
});

els.filterCategory.addEventListener("change", renderTransactions);
els.filterType.addEventListener("change", renderTransactions);
els.seedDemo.addEventListener("click", seedDemoData);
els.clearData.addEventListener("click", () => {
  if (!confirm("Clear all transactions and budgets?")) return;
  state.transactions = [];
  state.budgets = {};
  save();
  render();
});

load();
populateControls();
render();
renderIcons();
