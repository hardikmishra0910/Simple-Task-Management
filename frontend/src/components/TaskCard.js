import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import ConfirmDialog from './ConfirmDialog';

const TaskCard = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const response = await taskAPI.updateTask(task._id, { status: newStatus });
      onTaskUpdate(response.data.task);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await taskAPI.deleteTask(task._id);
      onTaskDelete(task._id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
        <h4 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </h4>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span>Due: {formatDate(task.dueDate)}</span>
          <span className={`status-badge status-${task.status}`}>
            {task.status}
          </span>
        </div>
        
        <div className="task-actions">
          <Link 
            to={`/task/${task._id}`}
            className="btn btn-secondary btn-small"
          >
            View
          </Link>
          
          <Link 
            to={`/edit-task/${task._id}`}
            className="btn btn-primary btn-small"
          >
            Edit
          </Link>
          
          <button
            onClick={handleStatusToggle}
            disabled={loading}
            className={`btn btn-small ${
              task.status === 'pending' ? 'btn-success' : 'btn-secondary'
            }`}
          >
            {loading ? 'Updating...' : 
             task.status === 'pending' ? 'Complete' : 'Reopen'}
          </button>
          
          <button
            onClick={() => setShowDeleteDialog(true)}
            disabled={loading}
            className="btn btn-danger btn-small"
          >
            Delete
          </button>
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

export default TaskCard;