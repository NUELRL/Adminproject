import React, { useState } from 'react';
import { Users, Building2, FileText, Check, X, Eye, Calendar, Clock, Search, Filter } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for demonstration
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      registeredAt: '2024-06-20',
      documents: [
        { id: 1, name: 'ID_Card.pdf', type: 'Identity', status: 'pending', uploadedAt: '2024-06-20' },
        { id: 2, name: 'Proof_Address.pdf', type: 'Address', status: 'pending', uploadedAt: '2024-06-20' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      registeredAt: '2024-06-19',
      documents: [
        { id: 3, name: 'Passport.pdf', type: 'Identity', status: 'approved', uploadedAt: '2024-06-19' },
        { id: 4, name: 'Utility_Bill.pdf', type: 'Address', status: 'rejected', uploadedAt: '2024-06-19' }
      ]
    }
  ]);

  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: 'Tech Solutions Ltd',
      email: 'contact@techsolutions.com',
      registeredAt: '2024-06-21',
      documents: [
        { id: 5, name: 'Business_License.pdf', type: 'License', status: 'pending', uploadedAt: '2024-06-21' },
        { id: 6, name: 'Tax_Certificate.pdf', type: 'Tax', status: 'pending', uploadedAt: '2024-06-21' }
      ]
    },
    {
      id: 2,
      name: 'Green Energy Co',
      email: 'info@greenenergy.com',
      registeredAt: '2024-06-18',
      documents: [
        { id: 7, name: 'Registration_Cert.pdf', type: 'Registration', status: 'approved', uploadedAt: '2024-06-18' },
        { id: 8, name: 'Environmental_Permit.pdf', type: 'Permit', status: 'pending', uploadedAt: '2024-06-18' }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('users');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleDocumentAction = (documentId, action, isUser = true) => {
    const updateFunction = isUser ? setUsers : setBusinesses;
    const dataArray = isUser ? users : businesses;
    
    updateFunction(dataArray.map(item => ({
      ...item,
      documents: item.documents.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: action }
          : doc
      )
    })));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (statusFilter === 'all') return matchesSearch;
      
      const hasStatus = item.documents.some(doc => doc.status === statusFilter);
      return matchesSearch && hasStatus;
    });
  };

  const DocumentCard = ({ document, onApprove, onReject }) => (
    <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-sm">{document.name}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
          {document.status}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        Type: {document.type} • Uploaded: {document.uploadedAt}
      </div>
      {document.status === 'pending' && (
        <div className="flex space-x-2">
          <button
            onClick={() => onApprove(document.id)}
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center space-x-1"
          >
            <Check className="w-4 h-4" />
            <span>Approve</span>
          </button>
          <button
            onClick={() => onReject(document.id)}
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center justify-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Reject</span>
          </button>
        </div>
      )}
    </div>
  );

  const ItemCard = ({ item, isUser, onViewDetails }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.email}</p>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Registered: {item.registeredAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="w-3 h-3" />
              <span>{item.documents.length} documents</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(item)}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">View</span>
        </button>
      </div>
      
      <div className="border-t pt-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {item.documents.map(doc => (
            <span key={doc.id} className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
              {doc.type}: {doc.status}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {item.documents.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onApprove={(id) => handleDocumentAction(id, 'approved', isUser)}
              onReject={(id) => handleDocumentAction(id, 'rejected', isUser)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const currentData = activeTab === 'users' ? users : businesses;
  const filteredData = filterData(currentData);
  const pendingCount = currentData.reduce((acc, item) => 
    acc + item.documents.filter(doc => doc.status === 'pending').length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Businesses</p>
                <p className="text-2xl font-semibold text-gray-900">{businesses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.reduce((acc, u) => acc + u.documents.length, 0) + 
                   businesses.reduce((acc, b) => acc + b.documents.length, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Users ({users.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('businesses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'businesses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>Businesses ({businesses.length})</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {filteredData.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {activeTab === 'users' ? <Users className="w-8 h-8 text-gray-400" /> : <Building2 className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredData.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isUser={activeTab === 'users'}
                    onViewDetails={setSelectedItem}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selectedItem.name} Details</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p><strong>Email:</strong> {selectedItem.email}</p>
                <p><strong>Registered:</strong> {selectedItem.registeredAt}</p>
                <p><strong>Documents:</strong> {selectedItem.documents.length}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Documents:</h3>
                {selectedItem.documents.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onApprove={(id) => handleDocumentAction(id, 'approved', activeTab === 'users')}
                    onReject={(id) => handleDocumentAction(id, 'rejected', activeTab === 'users')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;