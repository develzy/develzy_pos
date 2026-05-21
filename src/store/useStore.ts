import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  image: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  store_name: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Kasir" | "Teknisi" | "Manajer";
  phone: string;
  status: "Aktif" | "Nonaktif";
};

export type Transaction = {
  id: string;
  total: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
  items: CartItem[];
  method: string;
  cashReceived?: number;
  change?: number;
  date: string;
};

type StoreState = {
  // Auth
  user: UserProfile | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;

  // Products
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProductStock: (id: string, qtyDelta: number) => void;

  // Services
  services: Service[];
  fetchServices: () => Promise<void>;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;

  // Employees
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;

  // Customers
  customers: any[];
  fetchCustomers: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product | Service, type?: "PRODUCT" | "SERVICE") => void;
  updateCartQty: (id: string, delta: number) => void;
  clearCart: () => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

// Initial Dummy Products
const initialProducts: Product[] = [
  { id: "PRD-001", name: "Kopi Kenangan Mantan", sku: "KMN-01", price: 18000, stock: 45, category: "Minuman", status: "Aktif", image: "https://images.unsplash.com/photo-1550133730-695473e544be?w=100&q=80" },
  { id: "PRD-002", name: "Mie Goreng Spesial", sku: "MGS-01", price: 25000, stock: 20, category: "Makanan", status: "Aktif", image: "https://images.unsplash.com/photo-1612929633738-8fe01f7467c9?w=100&q=80" },
  { id: "PRD-003", name: "Es Teh Manis", sku: "ETM-01", price: 5000, stock: 150, category: "Minuman", status: "Aktif", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=100&q=80" },
  { id: "PRD-004", name: "Kentang Goreng", sku: "KTG-01", price: 15000, stock: 0, category: "Snack", status: "Habis", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&q=80" },
  { id: "PRD-005", name: "Nasi Goreng Gila", sku: "NGG-01", price: 28000, stock: 12, category: "Makanan", status: "Aktif", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&q=80" },
];

const initialServices: Service[] = [
  { id: "SRV-001", name: "Ganti Oli Mesin", category: "Ringan", price: 35000, description: "Jasa penggantian oli mesin motor bebek/matic", status: "Aktif" },
  { id: "SRV-002", name: "Servis Karburator", category: "Sedang", price: 75000, description: "Pembersihan dan setting karburator", status: "Aktif" },
  { id: "SRV-003", name: "Tune Up Lengkap", category: "Berat", price: 150000, description: "Pengecekan dan pembersihan menyeluruh", status: "Aktif" },
  { id: "SRV-004", name: "Ganti Ban Luar", category: "Ringan", price: 25000, description: "Jasa pasang ban luar per roda", status: "Aktif" },
];

const initialEmployees: Employee[] = [
  { id: "EMP-001", name: "Budi Santoso", email: "budi@develzy.com", role: "Kasir", phone: "08123456789", status: "Aktif" },
  { id: "EMP-002", name: "Ahmad Teknisi", email: "ahmad@develzy.com", role: "Teknisi", phone: "08198765432", status: "Aktif" },
  { id: "EMP-003", name: "Siti Manajer", email: "siti@develzy.com", role: "Manajer", phone: "08111222333", status: "Aktif" },
];

export const useAppStore = create<StoreState>((set) => ({
  user: null,
  login: async (email, pass) => {
    // Simulasi pengecekan database lokal untuk keperluan testing UI (karena binding D1 di dev mode butuh setup ekstra)
    await new Promise(r => setTimeout(r, 800)); // fake network delay
    
    if (email === 'dev@develzy.com' && pass === 'developer123') {
      set({ user: { id: 'DEV-001', name: 'Developer Develzy', email, role: 'superadmin', plan: 'Enterprise', store_name: 'DEVELZY SYSTEM' } });
      return true;
    } else if (email === 'premium@develzy.com' && pass === 'premium123') {
      set({ user: { id: 'USR-PREMIUM', name: 'Toko Premium', email, role: 'admin', plan: 'Premium', store_name: 'DEVELZY Premium Store' } });
      return true;
    } else if (email === 'bisnis@develzy.com' && pass === 'bisnis123') {
      set({ user: { id: 'USR-BISNIS', name: 'Toko Bisnis', email, role: 'admin', plan: 'Bisnis', store_name: 'DEVELZY Bisnis Store' } });
      return true;
    } else if (email === 'basic@develzy.com' && pass === 'basic123') {
      set({ user: { id: 'USR-BASIC', name: 'Toko Basic', email, role: 'admin', plan: 'Basic', store_name: 'DEVELZY Basic Store' } });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null });
    if (typeof window !== 'undefined') window.location.href = '/login';
  },

  products: [],
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          set({ products: data.data });
        }
      } else {
        // Fallback to initial dummy data if API fails (e.g. binding not set in dev)
        set({ products: initialProducts });
      }
    } catch (e) {
      set({ products: initialProducts });
    }
  },
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProductStock: (id, qtyDelta) => set((state) => ({
    products: state.products.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, p.stock + qtyDelta), status: p.stock + qtyDelta <= 0 ? "Habis" : "Aktif" } : p
    )
  })),

  services: [],
  fetchServices: async () => {
    set({ services: initialServices });
  },
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  deleteService: (id) => set((state) => ({ services: state.services.filter(s => s.id !== id) })),

  employees: [],
  fetchEmployees: async () => {
    set({ employees: initialEmployees });
  },
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter(e => e.id !== id) })),

  customers: [],
  fetchCustomers: async () => {
    try {
      const res = await fetch('/api/customers');
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          set({ customers: data.data });
        }
      }
    } catch (e) {
      console.error("Failed to fetch customers", e);
    }
  },

  cart: [],
  addToCart: (item, type = "PRODUCT") => set((state) => {
    // Check if item exists in cart
    const existing = state.cart.find(c => c.product.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map(c => 
          c.product.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      };
    }
    // Typecast needed here because cart item product can now be either Product or Service but for POS logic we treat it with same interface for price/name
    return { cart: [...state.cart, { product: item as any, qty: 1 }] };
  }),
  updateCartQty: (id, delta) => set((state) => ({
    cart: state.cart.map(item => {
      if (item.product.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0)
  })),
  clearCart: () => set({ cart: [] }),

  transactions: [],
  addTransaction: (transaction) => set((state) => {
    // When a transaction is added, deduct stock for products only (services have no stock)
    const newProducts = [...state.products];
    transaction.items.forEach(item => {
      const pIdx = newProducts.findIndex(p => p.id === item.product.id);
      if (pIdx >= 0) {
        newProducts[pIdx] = {
          ...newProducts[pIdx],
          stock: Math.max(0, newProducts[pIdx].stock - item.qty),
          status: newProducts[pIdx].stock - item.qty <= 0 ? "Habis" : "Aktif"
        };
      }
    });
    
    return {
      transactions: [transaction, ...state.transactions],
      products: newProducts,
      cart: [] // Clear cart after transaction
    };
  }),
}));
