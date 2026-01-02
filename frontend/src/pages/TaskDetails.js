import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskAPI.getTask(id);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        if (error.response?.status === 404) {
          setError('Task not found');
        } else {
          setError('Failed to load task');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusToggle = async () => {
    setUpdating(true);
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const response = await taskAPI.updateTask(task._id, { status: newStatus });
      setTask(response.data.task);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskAPI.deleteTask(task._id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
      setDeleting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc2626';
      case 'Medium': return '#d97706';
      case 'Low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>{error}</h2>
        <Link to="/" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Task not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
              ← Back to Tasks
            </Link>
            <h1 style={{ 
              margin: '0.5rem 0',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              opacity: task.status === 'completed' ? 0.7 : 1
            }}>
              {task.title}
            </h1>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link 
              to={`/edit-task/${task._id}`}
              className="btn btn-primary btn-small"
            >
              Edit
            </Link>
            
            <button
              onClick={handleStatusToggle}
              disabled={updating}
              className={`btn btn-small ${
                task.status === 'pending' ? 'btn-success' : 'btn-secondary'
              }`}
            >
              {updating ? 'Updating...' : 
               task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
            </button>
            
            <button
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleting}
              className="btn btn-danger btn-small"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Task Details Card */}
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Status and Priority Badges */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <span className={`status-badge status-${task.status}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            
            <span style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: `${getPriorityColor(task.priority)}20`,
              color: getPriorityColor(task.priority),
              border: `1px solid ${getPriorityColor(task.priority)}40`
            }}>
              {task.priority} Priority
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>Description</h3>
              <p style={{ 
                color: '#6b7280', 
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {task.description}
              </p>
            </div>
          )}

          {/* Task Information Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Due Date</h4>
              <p style={{ color: '#6b7280' }}>{formatDate(task.dueDate)}</p>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Assigned To</h4>
              <p style={{ color: '#6b7280' }}>
                {task.assignedTo.name} ({task.assignedTo.email})
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Created By</h4>
              <p style={{ color: '#6b7280' }}>
                {task.createdBy.name} ({task.createdBy.email})
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Created At</h4>
              <p style={{ color: '#6b7280' }}>{formatDateTime(task.createdAt)}</p>
            </div>

            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Last Updated</h4>
              <p style={{ color: '#6b7280' }}>{formatDateTime(task.updatedAt)}</p>
            </div>
          </div>

          {/* Task ID (for reference) */}
          <div style={{ 
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
            fontSize: '0.875rem',
            color: '#9ca3af'
          }}>
            Task ID: {task._id}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default TaskDetails;