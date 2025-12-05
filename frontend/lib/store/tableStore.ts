import { create } from 'zustand';
import type { Zone, Table } from '@/types/table';
import { tablesApi } from '@/lib/api/tables';

interface TableState {
  // Zones
  zones: Zone[];
  activeZones: Zone[];
  selectedZone: Zone | null;
  
  // Tables
  tables: Table[];
  tablesByZone: Record<number, Table[]>;
  selectedTable: Table | null;

  // Loading states
  isLoadingZones: boolean;
  isLoadingTables: boolean;
  error: string | null;

  // Actions
  fetchZones: () => Promise<void>;
  fetchActiveZones: () => Promise<void>;
  fetchZoneById: (zoneId: number) => Promise<void>;
  fetchAllTables: () => Promise<void>;
  fetchTablesByZone: (zoneId: number) => Promise<void>;
  fetchAvailableTablesByZone: (zoneId: number) => Promise<void>;
  
  // Selection
  setSelectedZone: (zone: Zone | null) => void;
  setSelectedTable: (table: Table | null) => void;

  // Filters
  capacityFilter: number | null;
  availabilityFilter: boolean | null;
  setCapacityFilter: (capacity: number | null) => void;
  setAvailabilityFilter: (available: boolean | null) => void;

  // Auto-refresh
  autoRefresh: boolean;
  setAutoRefresh: (enabled: boolean) => void;
}

export const useTableStore = create<TableState>((set, get) => ({
  // Initial state
  zones: [],
  activeZones: [],
  selectedZone: null,
  tables: [],
  tablesByZone: {},
  selectedTable: null,
  isLoadingZones: false,
  isLoadingTables: false,
  error: null,

  // Fetch all zones
  fetchZones: async () => {
    set({ isLoadingZones: true, error: null });
    try {
      const zones = await tablesApi.getAllZones();
      set({ zones, isLoadingZones: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโซนได้', 
        isLoadingZones: false 
      });
    }
  },

  // Fetch active zones
  fetchActiveZones: async () => {
    set({ isLoadingZones: true, error: null });
    try {
      const zones = await tablesApi.getActiveZones();
      set({ activeZones: zones, zones, isLoadingZones: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโซนได้', 
        isLoadingZones: false 
      });
    }
  },

  // Fetch zone by ID
  fetchZoneById: async (zoneId: number) => {
    set({ isLoadingZones: true, error: null });
    try {
      const zone = await tablesApi.getZoneById(zoneId);
      set({ selectedZone: zone, isLoadingZones: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโซนได้', 
        isLoadingZones: false 
      });
    }
  },

  // Fetch all tables
  fetchAllTables: async () => {
    set({ isLoadingTables: true, error: null });
    try {
      const tables = await tablesApi.getAllTables();
      set({ tables, isLoadingTables: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโต๊ะได้', 
        isLoadingTables: false 
      });
    }
  },

  // Fetch tables by zone
  fetchTablesByZone: async (zoneId: number) => {
    set({ isLoadingTables: true, error: null });
    try {
      const tables = await tablesApi.getTablesByZone(zoneId);
      set((state) => ({
        tablesByZone: { ...state.tablesByZone, [zoneId]: tables },
        isLoadingTables: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโต๊ะได้', 
        isLoadingTables: false 
      });
    }
  },

  // Fetch available tables by zone
  fetchAvailableTablesByZone: async (zoneId: number) => {
    set({ isLoadingTables: true, error: null });
    try {
      const tables = await tablesApi.getAvailableTablesByZone(zoneId);
      set((state) => ({
        tablesByZone: { ...state.tablesByZone, [zoneId]: tables },
        isLoadingTables: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลโต๊ะได้', 
        isLoadingTables: false 
      });
    }
  },

  // Selection
  setSelectedZone: (zone) => set({ selectedZone: zone }),
  setSelectedTable: (table) => set({ selectedTable: table }),

  // Filters
  capacityFilter: null,
  availabilityFilter: null,
  setCapacityFilter: (capacity) => set({ capacityFilter: capacity }),
  setAvailabilityFilter: (available) => set({ availabilityFilter: available }),

  // Auto-refresh
  autoRefresh: false,
  setAutoRefresh: (enabled) => set({ autoRefresh: enabled }),
}));

// Auto-refresh tables every 15 seconds
let refreshInterval: NodeJS.Timeout | null = null;

if (typeof window !== 'undefined') {
  useTableStore.subscribe((state) => {
    if (state.autoRefresh && !refreshInterval) {
      refreshInterval = setInterval(() => {
        if (state.selectedZone) {
          state.fetchTablesByZone(state.selectedZone.id);
        } else {
          state.fetchActiveZones();
        }
      }, 15000); // 15 seconds
    } else if (!state.autoRefresh && refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  });
}

