"use client";
import React, { useState } from "react";

// PUBLIC_INTERFACE
const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "products", label: "Products" },
  { key: "suppliers", label: "Suppliers" },
  { key: "transactions", label: "Transactions" },
  { key: "reports", label: "Reports" },
];

const COLOR = {
  primary: "#10f455",
  secondary: "#4FD1C5",
  accent: "#F6E05E",
};

// Sample summary data, would be fetched in real app
const inventorySummary = {
  totalProducts: 42,
  totalSuppliers: 7,
  lowStockItems: [{ name: "Red Paint", sku: "PR001", qty: 2 }],
  totalTransactions: 16,
  lastUpdated: "2024-06-07",
};

const placeholderInventory = [
  { sku: "PR001", name: "Red Paint", category: "Paint", stock: 2, min: 5, supplier: "ColorWorld" },
  { sku: "PR002", name: "Yellow Dye", category: "Dye", stock: 15, min: 5, supplier: "PigmentPro" },
  { sku: "PR003", name: "Blue Ink", category: "Ink", stock: 6, min: 5, supplier: "InkFlow" },
];

const placeholderSuppliers = [
  { id: 1, name: "ColorWorld", contact: "info@colorworld.com" },
  { id: 2, name: "PigmentPro", contact: "sales@pigmentpro.com" },
  { id: 3, name: "InkFlow", contact: "support@inkflow.com" },
];

const placeholderTransactions = [
  { id: 1, type: "Sale", product: "Red Paint", qty: 3, date: "2024-06-04" },
  { id: 2, type: "Purchase", product: "Yellow Dye", qty: 10, date: "2024-06-02" },
];

const placeholderReports = [
  { id: 1, name: "Weekly Sales", date: "2024-06-05" },
];

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}



function InventoryTable({ filter, setFilter }) {
  // Filter by SKU, name, or category (case-insensitive)
  const filtered = placeholderInventory.filter((item) =>
    filter.trim() === ""
      ? true
      : [item.sku, item.name, item.category].some((field) =>
          field.toLowerCase().includes(filter.trim().toLowerCase())
        )
  );
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto bg-white">
      <div className="p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold" style={{ color: COLOR.primary }}>Products Inventory</span>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search SKU, name, category..."
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:border-[var(--primary, #10f455)]"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-2 px-2 text-left">SKU</th>
            <th className="py-2 px-2 text-left">Name</th>
            <th className="py-2 px-2 text-left">Category</th>
            <th className="py-2 px-2 text-left">Supplier</th>
            <th className="py-2 px-2 text-left">Stock</th>
            <th className="py-2 px-2 text-left">Min</th>
            <th className="py-2 px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filtered.length === 0 && (
          <tr><td colSpan={7} className="py-2 text-center text-gray-400">No products found</td></tr>
        )}
        {filtered.map(item => (
          <tr key={item.sku} className={item.stock <= item.min ? "bg-yellow-100" : ""}>
            <td className="py-1 px-2">{item.sku}</td>
            <td className="py-1 px-2">{item.name}</td>
            <td className="py-1 px-2">{item.category}</td>
            <td className="py-1 px-2">{item.supplier}</td>
            <td className="py-1 px-2">{item.stock}</td>
            <td className="py-1 px-2">{item.min}</td>
            <td className="py-1 px-2">
              <button className="text-xs px-2 py-0.5 mr-2 bg-[var(--primary,#10f455)] text-white rounded" onClick={() => {}}>Edit</button>
              <button className="text-xs px-2 py-0.5 bg-red-400 text-white rounded" onClick={() => {}}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

function SuppliersTable({ filter, setFilter }) {
  const filtered = placeholderSuppliers.filter(
    (s) => filter.trim() === "" || s.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto bg-white">
      <div className="p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold" style={{ color: COLOR.secondary }}>Suppliers</span>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search supplier name..."
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:border-[var(--secondary,#4FD1C5)]"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-2 px-2 text-left">Supplier Name</th>
            <th className="py-2 px-2 text-left">Contact</th>
            <th className="py-2 px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={3} className="py-2 text-center text-gray-400">No suppliers found</td></tr>
          )}
          {filtered.map(s => (
            <tr key={s.id}>
              <td className="py-1 px-2">{s.name}</td>
              <td className="py-1 px-2">{s.contact}</td>
              <td className="py-1 px-2">
                <button className="text-xs px-2 py-0.5 mr-2 bg-[var(--secondary,#4FD1C5)] text-white rounded" onClick={() => {}}>Edit</button>
                <button className="text-xs px-2 py-0.5 bg-red-400 text-white rounded" onClick={() => {}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransactionsTable({ filter, setFilter }) {
  const filtered = placeholderTransactions.filter(
    (t) =>
      filter.trim() === "" ||
      t.product.toLowerCase().includes(filter.trim().toLowerCase()) ||
      t.type.toLowerCase().includes(filter.trim().toLowerCase())
  );
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto bg-white">
      <div className="p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold" style={{ color: COLOR.primary }}>Transactions</span>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search product or type..."
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:border-[var(--primary,#10f455)]"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-2 px-2 text-left">Type</th>
            <th className="py-2 px-2 text-left">Product</th>
            <th className="py-2 px-2 text-left">Quantity</th>
            <th className="py-2 px-2 text-left">Date</th>
            <th className="py-2 px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={5} className="py-2 text-center text-gray-400">No transactions found</td></tr>
          )}
          {filtered.map(t => (
            <tr key={t.id}>
              <td className="py-1 px-2">{t.type}</td>
              <td className="py-1 px-2">{t.product}</td>
              <td className="py-1 px-2">{t.qty}</td>
              <td className="py-1 px-2">{t.date}</td>
              <td className="py-1 px-2">
                <button className="text-xs px-2 py-0.5 mr-2 bg-[var(--primary,#10f455)] text-white rounded" onClick={() => {}}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportsTable() {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto bg-white">
      <div className="p-3">
        <span className="font-semibold" style={{ color: COLOR.accent }}>Reports</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-2 px-2 text-left">Report</th>
            <th className="py-2 px-2 text-left">Date</th>
            <th className="py-2 px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {placeholderReports.length === 0 && (
            <tr><td colSpan={3} className="py-2 text-center text-gray-400">No reports found</td></tr>
          )}
          {placeholderReports.map(r => (
            <tr key={r.id}>
              <td className="py-1 px-2">{r.name}</td>
              <td className="py-1 px-2">{r.date}</td>
              <td className="py-1 px-2">
                <button className="text-xs px-2 py-0.5 bg-[var(--accent,#F6E05E)] text-gray-800 rounded" onClick={() => {}}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Modal & Sidepanel primitive, client-side only mockups ---
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg border border-gray-200 relative">
        <div className="flex justify-between items-center border-b p-4">
          <span className="text-base font-bold">{title}</span>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
function SidePanel({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/20 z-40 flex">
      <div className="w-0 flex-1" onClick={onClose}></div>
      <div className="bg-white w-[22rem] h-full shadow-lg border-l border-gray-200">
        <div className="flex justify-between items-center border-b p-4">
          <span className="text-base font-bold">{title}</span>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function AlertArea({ lowStockItems }) {
  if (!lowStockItems || !lowStockItems.length) return null;
  return (
    <div className="bg-yellow-300/80 rounded border-l-4 border-yellow-600 p-3 flex flex-col gap-1 my-2">
      <span className="font-semibold uppercase text-yellow-800">
        Low Stock Alert
      </span>
      {lowStockItems.map(item => (
        <span key={item.sku} className="text-yellow-900">
          Product <span className="font-mono">{item.name}</span> (<b>{item.sku}</b>) is low: {item.qty} left!
        </span>
      ))}
    </div>
  );
}

export default function MainContainer() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  // State for filter/search per section
  const [productSearch, setProductSearch] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");
  const [transactionSearch, setTransactionSearch] = useState("");

  // Modal/side-panel state & placeholder handlers
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  // Container layout: sidebar + main area, sticky top nav for mobile
  return (
    <div className="min-h-screen bg-[var(--color-background,#fff)]">
      {/* Sidebar/nav for desktop, top nav for mobile */}
      <nav className="fixed sm:static z-30 w-full sm:w-60 sm:h-screen bg-white border-b sm:border-b-0 sm:border-r border-gray-200 flex sm:flex-col items-center sm:items-stretch justify-between px-2 sm:px-0 py-1 sm:py-6 shadow sm:shadow-none">
        <span className="font-bold text-2xl md:text-3xl py-2 mb-0 sm:mb-8" style={{ color: COLOR.primary }}>
          StockMaster
        </span>
        <ul className="flex sm:flex-col gap-2 w-full justify-center sm:justify-start text-base font-medium mt-0 sm:mt-8">
          {TABS.map((tab) => (
            <li key={tab.key}>
              <button
                className={classNames(
                  "w-full px-4 py-2 rounded flex gap-2 items-center transition font-semibold",
                  currentTab === tab.key
                    ? "bg-[var(--primary,#10f455)] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setCurrentTab(tab.key)}
                style={currentTab === tab.key ? { boxShadow: "0 2px 8px #10f45530" } : {}}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Add Entry buttons for quick-action on mobile */}
        <div className="flex gap-2 sm:hidden mt-2">
          <button className="text-xs px-3 py-1 bg-[var(--primary,#10f455)] rounded text-white" onClick={() => setShowProductModal(true)}>+ Product</button>
          <button className="text-xs px-3 py-1 bg-[var(--secondary,#4FD1C5)] rounded text-white" onClick={() => setShowSupplierModal(true)}>+ Supplier</button>
        </div>
      </nav>
      {/* Main area */}
      <main className="pl-0 sm:pl-64 flex flex-col min-h-screen">
        {/* Section heading */}
        <header className="px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-20 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: COLOR.primary }}>
            {TABS.find(tab => tab.key === currentTab)?.label || ""}
          </h1>
        </header>
        
        <section className="flex-1 p-4 sm:p-8 bg-[var(--color-background,#fff)]">
          {currentTab === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Section summary cards */}
                <div className="rounded-xl bg-white border border-gray-200 p-5 flex flex-col gap-1 shadow" style={{ borderColor: COLOR.primary }}>
                  <div className="text-md text-gray-500">Total Products</div>
                  <div className="text-3xl font-bold" style={{ color: COLOR.primary }}>{inventorySummary.totalProducts}</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-5 flex flex-col gap-1 shadow" style={{ borderColor: COLOR.secondary }}>
                  <div className="text-md text-gray-500">Suppliers</div>
                  <div className="text-3xl font-bold" style={{ color: COLOR.secondary }}>{inventorySummary.totalSuppliers}</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-5 flex flex-col gap-1 shadow" style={{ borderColor: COLOR.accent }}>
                  <div className="text-md text-gray-500">Transactions</div>
                  <div className="text-3xl font-bold" style={{ color: COLOR.accent }}>{inventorySummary.totalTransactions}</div>
                </div>
              </div>
              {/* Alerts */}
              <div className="mt-6">
                <AlertArea lowStockItems={inventorySummary.lowStockItems} />
              </div>
              <div className="mt-8">
                <div className="font-light text-xs text-gray-400">Data last updated: {inventorySummary.lastUpdated}</div>
              </div>
            </div>
          )}
          {currentTab === "products" && (
            <div>
              <div className="flex justify-end mb-2">
                <button className="px-4 py-2 bg-[var(--primary,#10f455)] rounded text-white" onClick={() => setShowProductModal(true)}>+ Add Product</button>
              </div>
              <InventoryTable filter={productSearch} setFilter={setProductSearch} />
            </div>
          )}
          {currentTab === "suppliers" && (
            <div>
              <div className="flex justify-end mb-2">
                <button className="px-4 py-2 bg-[var(--secondary,#4FD1C5)] rounded text-white" onClick={() => setShowSupplierModal(true)}>+ Add Supplier</button>
              </div>
              <SuppliersTable filter={supplierSearch} setFilter={setSupplierSearch} />
            </div>
          )}
          {currentTab === "transactions" && (
            <div>
              <TransactionsTable filter={transactionSearch} setFilter={setTransactionSearch} />
            </div>
          )}
          {currentTab === "reports" && (
            <ReportsTable />
          )}
        </section>
      </main>
      {/* Modals and Panels for Add/Edit forms (placeholders only) */}
      <Modal open={showProductModal} onClose={() => setShowProductModal(false)} title="Add Product">
        <form className="flex flex-col gap-3">
          <label>
            <span className="block mb-1 text-sm font-medium">Name</span>
            <input className="border px-2 py-1 rounded w-full" type="text" placeholder="Product Name" />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">SKU</span>
            <input className="border px-2 py-1 rounded w-full" type="text" placeholder="SKU" />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Category</span>
            <input className="border px-2 py-1 rounded w-full" type="text" placeholder="Category" />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Minimum Stock</span>
            <input className="border px-2 py-1 rounded w-full" type="number" min={0} placeholder="Minimum stock level" />
          </label>
          <div className="flex gap-2 justify-end pt-2">
            <button className="px-3 py-1 rounded bg-gray-100" type="button" onClick={() => setShowProductModal(false)}>Cancel</button>
            <button className="px-3 py-1 rounded bg-[var(--primary,#10f455)] text-white" type="submit">Save</button>
          </div>
        </form>
      </Modal>

      <SidePanel open={showSupplierModal} onClose={() => setShowSupplierModal(false)} title="Add Supplier">
        <form className="flex flex-col gap-3">
          <label>
            <span className="block mb-1 text-sm font-medium">Supplier Name</span>
            <input className="border px-2 py-1 rounded w-full" type="text" placeholder="Supplier Name" />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Contact</span>
            <input className="border px-2 py-1 rounded w-full" type="email" placeholder="Contact Email" />
          </label>
          <div className="flex gap-2 justify-end pt-2">
            <button className="px-3 py-1 rounded bg-gray-100" type="button" onClick={() => setShowSupplierModal(false)}>Cancel</button>
            <button className="px-3 py-1 rounded bg-[var(--secondary,#4FD1C5)] text-white" type="submit">Save</button>
          </div>
        </form>
      </SidePanel>
    </div>
  );
}
