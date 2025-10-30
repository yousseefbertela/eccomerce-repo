import { api } from '../lib/axios.js';

/**
 * Audit API Functions for Boss Dashboard
 * Provides access to comprehensive audit trails and user activity
 */

// Get currently active users with clock in/out times
export const getActiveUsersRequest = async () => {
  try {
    const response = await api.get('/audit/active-users');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch active users:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch active users' 
    };
  }
};

// Get daily file changes organized by user
export const getDailyFileChangesRequest = async (date = null) => {
  try {
    const params = date ? `?date=${date}` : '';
    const response = await api.get(`/audit/daily-changes${params}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch daily file changes:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch daily file changes' 
    };
  }
};

// Get recent activity feed for dashboard
export const getRecentActivityRequest = async (limit = 50, groupBy = 'none') => {
  try {
    const params = new URLSearchParams({ 
      limit: limit.toString(),
      groupBy 
    });
    const response = await api.get(`/audit/recent?${params}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch recent activity:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch recent activity' 
    };
  }
};

// Get activities organized by employee and day
export const getEmployeeActivityRequest = async (days = 7) => {
  try {
    const params = new URLSearchParams({ days: days.toString() });
    const response = await api.get(`/audit/employees?${params}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch employee activities:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch employee activities' 
    };
  }
};

// Get audit statistics for dashboard
export const getAuditStatisticsRequest = async (timeRange = '7d') => {
  try {
    const response = await api.get(`/audit/statistics?range=${timeRange}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch audit statistics:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch audit statistics' 
    };
  }
};

// Get activity for a specific user
export const getUserActivityRequest = async (userId, limit = 100) => {
  try {
    const response = await api.get(`/audit/user/${userId}?limit=${limit}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch user activity:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch user activity' 
    };
  }
};

// Search audit logs with filters
export const searchAuditLogsRequest = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.action) params.append('action', filters.action);
    if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
    if (filters.success !== undefined) params.append('success', filters.success);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.limit) params.append('limit', filters.limit);
    
    const response = await api.get(`/audit/search?${params.toString()}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to search audit logs:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to search audit logs' 
    };
  }
};

// Get security alerts
export const getSecurityAlertsRequest = async (limit = 100) => {
  try {
    const response = await api.get(`/audit/alerts?limit=${limit}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to fetch security alerts:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch security alerts' 
    };
  }
};

// Export audit logs as CSV
export const exportAuditLogsRequest = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.action) params.append('action', filters.action);
    if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
    
    const response = await api.get(`/audit/export?${params.toString()}`, {
      responseType: 'blob'
    });
    
    // Create download link
    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true, message: 'Audit logs exported successfully' };
  } catch (error) {
    console.error('Failed to export audit logs:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to export audit logs' 
    };
  }
};

// Get currently active sessions (who's logged in)
export const getActiveSessionsRequest = async () => {
  try {
    // This would require a separate endpoint to track active sessions
    // For now, we'll get recent login activities
    const response = await api.get('/audit/search?action=LOGIN&limit=50');
    
    // Filter to show only recent logins (within last 24 hours)
    const recentLogins = response.data.logs.filter(log => {
      const loginTime = new Date(log.timestamp);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      return hoursDiff <= 24 && log.success;
    });
    
    // Group by user and get the most recent login for each
    const activeUsers = {};
    recentLogins.forEach(login => {
      const userId = login.userId;
      if (!activeUsers[userId] || new Date(login.timestamp) > new Date(activeUsers[userId].timestamp)) {
        activeUsers[userId] = {
          userId: login.userId,
          userName: login.userName,
          userEmail: login.userEmail,
          userRole: login.userRole,
          lastActivity: login.timestamp,
          ipAddress: login.ipAddress
        };
      }
    });
    
    return { 
      success: true, 
      data: { 
        activeSessions: Object.values(activeUsers),
        total: Object.keys(activeUsers).length
      }
    };
  } catch (error) {
    console.error('Failed to fetch active sessions:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch active sessions' 
    };
  }
};

export default {
  getRecentActivityRequest,
  getAuditStatisticsRequest,
  getUserActivityRequest,
  searchAuditLogsRequest,
  getSecurityAlertsRequest,
  exportAuditLogsRequest,
  getActiveSessionsRequest
};