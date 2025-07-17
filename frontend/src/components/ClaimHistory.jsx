import React, { useEffect, useState } from 'react';

export default function ClaimHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClaimHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/claim/history');
      const data = await res.json();
      if (data) setHistory(data);
    } catch (error) {
      console.error('Failed to fetch claim history', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaimHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-poppins">🎯 Claim History</h2>
        <div className="text-sm text-gray-500">
          Total Claims: <span className="font-semibold">{history.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No claim history available</td>
                  </tr>
                ) : (
                  history.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-700">
                            {entry.user?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-3 text-sm font-medium text-gray-900">{entry.user}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          +{entry.points} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {entry.claimedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing <span className="font-medium">1</span> to <span className="font-medium">{history.length}</span> of{' '}
            <span className="font-medium">{history.length}</span> claims
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
