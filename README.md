# Ledgerly - Personal Finance Tracker

Ledgerly is a simple, from-scratch personal finance tracker built with plain HTML, CSS, and JavaScript. It helps you record income and expenses, review monthly cash flow, monitor spending by category, and set basic monthly budgets.

The project is intentionally lightweight: there is no framework, build step, package manager, or backend server required. Data is stored in the browser with `localStorage`.

## Features

- Add income and expense transactions
- Categorize transactions by type
- View monthly balance, income, expenses, and savings rate
- Filter transactions by category and type
- Track monthly category budgets
- Visualize expense breakdown with a built-in canvas chart
- Load demo data for quick testing
- Delete individual transactions
- Clear all stored finance data
- Fully local static site with no external dependencies

## Tech Stack

- `HTML5` for structure
- `CSS3` for responsive layout and styling
- `JavaScript` for state management, rendering, charts, and browser storage
- `localStorage` for persistence
- `Canvas API` for the spending breakdown chart

## Project Structure

```text
Ledgerly-Finance-Tracker-
├── index.html      # Main page structure
├── styles.css      # App layout, responsive design, and visual styling
├── app.js          # Finance logic, rendering, storage, and interactions
├── LICENSE         # Project license
└── README.md       # Project documentation
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/badboy010/Ledgerly-Finance-Tracker-.git
cd Ledgerly-Finance-Tracker-
```

### 2. Open the App

Open `index.html` directly in your browser.

No installation is required.

## How to Use

1. Choose whether the transaction is an `Expense` or `Income`.
2. Enter a description, amount, date, and category.
3. Click `Add transaction`.
4. Use the month selector to review a specific month.
5. Add budget limits in the Budgets section.
6. Use the filters to narrow the transaction table.
7. Click the sparkle button to load demo data.
8. Click the trash button to clear all saved data.

## Data Storage

Ledgerly stores all transactions and budgets in your browser using `localStorage`.

This means:

- Your data stays on your device.
- Refreshing the page will not remove your data.
- Clearing browser storage or using another browser/device will not carry the data over.
- There is no login, account sync, or cloud database.

## Main Files

### `index.html`

Contains the page layout, including:

- Sidebar navigation
- Month selector
- Summary cards
- Transaction form
- Budget controls
- Spending chart
- Transaction table

### `styles.css`

Controls the full visual design, including:

- Responsive grid layout
- Sidebar and dashboard panels
- Buttons, inputs, and filters
- Budget progress bars
- Transaction table styling
- Mobile-friendly adjustments

### `app.js`

Contains the application behavior, including:

- App state
- Transaction creation and deletion
- Budget updates
- Month filtering
- Summary calculations
- Category breakdown calculations
- Canvas chart rendering
- Demo data generation
- Saving and loading from `localStorage`

## Future Improvements

Possible features to add later:

- Edit existing transactions
- Export data to CSV
- Import saved finance data
- Multiple currency support
- Dark mode
- Recurring transactions
- Yearly analytics
- Account-based tracking
- Cloud sync with authentication

## License

This project is licensed under the terms included in the `LICENSE` file.
