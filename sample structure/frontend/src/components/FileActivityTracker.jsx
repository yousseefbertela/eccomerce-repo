import React from 'react';

/**
 * Simple File Activity Tracker Placeholder
 * This component was simplified as part of the audit dashboard redesign
 */

const FileActivityTracker = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <span className="text-blue-600 text-lg">ℹ️</span>
        <div>
          <h3 className="text-sm font-medium text-blue-800">
            File Activity Tracking Active
          </h3>
          <p className="text-sm text-blue-600">
            All file operations are automatically tracked and viewable in the User Activity dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileActivityTracker;