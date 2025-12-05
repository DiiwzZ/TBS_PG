import apiClient from './axios';
import type { Zone, Table } from '@/types/table';

export const tablesApi = {
  // Get all zones
  getAllZones: async (): Promise<Zone[]> => {
    const response = await apiClient.get<Zone[]>('/api/zones');
    return response.data;
  },

  // Get only active zones
  getActiveZones: async (): Promise<Zone[]> => {
    const response = await apiClient.get<Zone[]>('/api/zones/active');
    return response.data;
  },

  // Get zone by ID
  getZoneById: async (zoneId: number): Promise<Zone> => {
    const response = await apiClient.get<Zone>(`/api/zones/${zoneId}`);
    return response.data;
  },

  // Get all tables
  getAllTables: async (): Promise<Table[]> => {
    const response = await apiClient.get<Table[]>('/api/tables');
    return response.data;
  },

  // Get table by ID
  getTableById: async (tableId: number): Promise<Table> => {
    const response = await apiClient.get<Table>(`/api/tables/${tableId}`);
    return response.data;
  },

  // Get tables by zone
  getTablesByZone: async (zoneId: number): Promise<Table[]> => {
    const response = await apiClient.get<Table[]>(`/api/tables/zone/${zoneId}`);
    return response.data;
  },

  // Get available tables by zone
  getAvailableTablesByZone: async (zoneId: number): Promise<Table[]> => {
    const response = await apiClient.get<Table[]>(`/api/tables/zone/${zoneId}/available`);
    return response.data;
  },
};

export default tablesApi;

