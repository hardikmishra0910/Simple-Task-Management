import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
    priority: ''
  });

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks(filters);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
      setError('');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when component mounts or filters change
  useEffect(() => {
    fetchTasks();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filtering
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };

  // Handle task updates
  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  // Handle task deletion
  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  // Group tasks by priority
  const groupTasksByPriority = () => {
    const grouped = {
      High: [],
      Medium: [],
      Low: []
    };

    tasks.forEach(task => {
      if (grouped[task.priority]) {
        grouped[task.priority].push(task);
      }
    });

    return grouped;
  };

  const groupedTasks = groupTasksByPriority();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1>My Tasks</h1>
        <Link to="/create-task" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      {/* Filters */}
      <div style={{ 
        background: 'white', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label style={{ marginRight: '0.5rem' }}>Status:</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '0.5rem' }}>Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '0.5rem' }}>Per Page:</label>
          <select
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '8px' 
        }}>
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
          <Link to="/create-task" className="btn btn-primary">
            Create Task
          </Link>
        </div>
      ) : (
        <>
          {/* Priority-based task columns */}
          <div className="task-grid">
            {Object.entries(groupedTasks).map(([priority, priorityTasks]) => (
              <div key={priority} className={`priority-column priority-${priority.toLowerCase()}`}>
                <h3>{priority} Priority ({priorityTasks.length})</h3>
                {priorityTasks.length === 0 ? (
                  <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                    No {priority.toLowerCase()} priority tasks
                  </p>
                ) : (
                  priorityTasks.map(task => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onTaskUpdate={handleTaskUpdate}
                      onTaskDelete={handleTaskDelete}
                    />
                  ))
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
              >
                Previous
              </button>
              
              <span className="current-page">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
              >
                Next
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
            Total: {pagination.totalTasks} tasks
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;