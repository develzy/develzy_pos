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
  store_logo?: string;
  business_type: "Retail" | "Bengkel" | "Laundry" | "Cafe" | "Servis HP";
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
  updateUserPlan: (plan: string) => void;
  updateUserBusinessType: (type: "Retail" | "Bengkel" | "Laundry" | "Cafe" | "Servis HP") => void;

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

// Dummy data removed for production D1 Database usage

export const useAppStore = create<StoreState>((set, get) => ({
  user: null,
  login: async (email, pass) => {
    // Simulasi pengecekan database lokal untuk keperluan testing UI (karena binding D1 di dev mode butuh setup ekstra)
    await new Promise(r => setTimeout(r, 800)); // fake network delay
    
    if (email === 'dev@develzy.com' && pass === 'developer123') {
      set({ user: { id: 'DEV-001', name: 'Developer Develzy', email, role: 'superadmin', plan: 'Enterprise', store_name: 'DEVELZY SYSTEM', store_logo: 'https://github.com/shadcn.png', business_type: 'Retail' } });
      return true;
    } else if (email === 'premium@develzy.com' && pass === 'premium123') {
      set({ user: { id: 'USR-PREMIUM', name: 'Toko Premium', email, role: 'admin', plan: 'Premium', store_name: 'DEVELZY Premium Store', store_logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80', business_type: 'Bengkel' } });
      return true;
    } else if (email === 'bisnis@develzy.com' && pass === 'bisnis123') {
      set({ user: { id: 'USR-BISNIS', name: 'Toko Bisnis', email, role: 'admin', plan: 'Bisnis', store_name: 'DEVELZY Bisnis Store', store_logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&q=80', business_type: 'Cafe' } });
      return true;
    } else if (email === 'basic@develzy.com' && pass === 'basic123') {
      set({ user: { id: 'USR-BASIC', name: 'Toko Basic', email, role: 'admin', plan: 'Basic', store_name: 'DEVELZY Basic Store', store_logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80', business_type: 'Retail' } });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null });
    if (typeof window !== 'undefined') window.location.href = '/login';
  },
  updateUserPlan: (plan: string) => set((state) => ({ user: state.user ? { ...state.user, plan } : null })),
  updateUserBusinessType: (type: "Retail" | "Bengkel" | "Laundry" | "Cafe" | "Servis HP") => set((state) => {
    return { 
      user: state.user ? { ...state.user, business_type: type } : null
    };
  }),

  products: [],
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          set({ products: data.data });
        }
      }
    } catch (e) {
      console.error("Failed to fetch products from D1", e);
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
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        if (data.data) set({ services: data.data });
      }
    } catch (e) {
      console.error("Failed to fetch services from D1", e);
    }
  },
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  deleteService: (id) => set((state) => ({ services: state.services.filter(s => s.id !== id) })),

  employees: [],
  fetchEmployees: async () => {
    try {
      const res = await fetch('/api/employees');
      if (res.ok) {
        const data = await res.json();
        if (data.data) set({ employees: data.data });
      }
    } catch (e) {
      console.error("Failed to fetch employees from D1", e);
    }
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
