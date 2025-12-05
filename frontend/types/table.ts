// Table and Zone related types

export interface Zone {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
}

export interface Table {
  id: number;
  tableNumber: string;
  zoneId: number;
  zoneName: string;
  capacity: number;
  available: boolean;
  active: boolean;
  notes: string | null;
}

export interface ZoneWithTables extends Zone {
  tables: Table[];
  totalTables: number;
  availableTables: number;
  totalCapacity: number;
}

