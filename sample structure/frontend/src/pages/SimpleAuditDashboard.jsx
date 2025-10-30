import React, { useState, useEffect } from 'react';
import { 
  getActiveUsersRequest, 
  getDailyFileChangesRequest 
} from '../lib/auditApi.js';

/**
 * Simplified Audit Dashboard for Boss
 * Shows only: Active Users + Daily File Changes
 */

const SimpleAuditDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [dailyChanges, setDailyChanges] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  // Load dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [usersRes, changesRes] = await Promise.all([
        getActiveUsersRequest(),
        getDailyFileChangesRequest(selectedDate)
      ]);

      if (usersRes.success) setActiveUsers(usersRes.data.activeUsers);
      if (changesRes.success) setDailyChanges(changesRes.data.userChanges);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // Refresh data every 2 minutes
    const interval = setInterval(loadDashboardData, 120000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  // Format time for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Get action icon
  const getActionIcon = (action) => {
    switch (action) {
      case 'FILE_CREATE': return '📝';
      case 'FILE_UPDATE': return '✏️';
      case 'FILE_DELETE': return '🗑️';
      case 'FILE_SHARE': return '🔗';
      case 'FILE_VIEW': return '👁️';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">👥 User Activity Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor active users and daily file changes</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Active Users Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              🟢 Currently Active Users 
              <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {activeUsers.filter(u => u.isCurrentlyActive).length} active
              </span>
            </h2>
            <p className="text-gray-600 mt-1">Users who logged in today and their clock in/out times</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {activeUsers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No users have logged in today
              </div>
            ) : (
              activeUsers.map((userSession, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        userSession.isCurrentlyActive ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {userSession.user.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{userSession.user.name}</h3>
                        <p className="text-sm text-gray-600">{userSession.user.email}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          userSession.user.role === 'boss' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {userSession.user.role}
                        </span>
                      </div>
                    </div>

                    {/* Clock In/Out Times */}
                    <div className="text-right">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">🔑 Clock In:</span>
                          <span className="font-medium">{formatTime(userSession.clockIn)}</span>
                        </div>
                        
                        {userSession.clockOut ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-red-600">🚪 Clock Out:</span>
                            <span className="font-medium">{formatTime(userSession.clockOut)}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-600">⏱️ Still Active:</span>
                            <span className="font-medium text-green-600">Online</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>📊 Session Duration:</span>
                          <span>{formatDuration(userSession.sessionDuration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Daily File Changes Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">📁 Daily File Changes</h2>
                <p className="text-gray-600 mt-1">File operations organized by user for selected date</p>
              </div>
              
              {/* Date Picker */}
              <div className="flex items-center space-x-3">
                <label htmlFor="date-picker" className="text-sm font-medium text-gray-700">
                  Select Date:
                </label>
                <input
                  id="date-picker"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {dailyChanges.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No file changes found for {new Date(selectedDate).toLocaleDateString()}
              </div>
            ) : (
              dailyChanges.map((userChanges, index) => (
                <div key={index} className="p-6">
                  
                  {/* User Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {userChanges.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{userChanges.user.name}</h3>
                        <p className="text-sm text-gray-600">{userChanges.user.email}</p>
                      </div>
                    </div>

                    {/* File Operation Summary */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {userChanges.totalChanges} total changes
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        {userChanges.fileOperations.creates > 0 && (
                          <span>📝 {userChanges.fileOperations.creates} created</span>
                        )}
                        {userChanges.fileOperations.updates > 0 && (
                          <span>✏️ {userChanges.fileOperations.updates} updated</span>
                        )}
                        {userChanges.fileOperations.deletes > 0 && (
                          <span>🗑️ {userChanges.fileOperations.deletes} deleted</span>
                        )}
                        {userChanges.fileOperations.shares > 0 && (
                          <span>🔗 {userChanges.fileOperations.shares} shared</span>
                        )}
                        {userChanges.fileOperations.views > 0 && (
                          <span>👁️ {userChanges.fileOperations.views} viewed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* File Changes List */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {userChanges.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getActionIcon(change.action)}</span>
                            <div>
                              <p className="font-medium text-gray-900">{change.fileName}</p>
                              <p className="text-sm text-gray-600">
                                {change.action.replace('FILE_', '').toLowerCase().replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right text-sm text-gray-500">
                            <div>{formatTime(change.timestamp)}</div>
                            <div className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              change.success 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {change.success ? '✅ Success' : '❌ Failed'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleAuditDashboard;