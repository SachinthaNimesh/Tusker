import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  CardActions,
  Button
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#9e9e9e';
      case 'in-progress':
        return '#2196f3';
      case 'completed':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '#8bc34a';
      case 'medium':
        return '#ff9800';
      case 'high':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }
      }}
      elevation={2}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 500 }}>
          {task.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
          {task.description ? task.description : 'No description provided'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
            size="small"
            sx={{ 
              bgcolor: `${getStatusColor(task.status)}20`, 
              color: getStatusColor(task.status),
              fontWeight: 500
            }}
          />
          <Chip 
            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
            size="small"
            sx={{ 
              bgcolor: `${getPriorityColor(task.priority)}20`, 
              color: getPriorityColor(task.priority),
              fontWeight: 500
            }}
          />
        </Box>
        
        <Typography variant="caption" color="text.secondary">
          Created on {formatDate(task.createdAt)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          component={Link} 
          to={`/tasks/${task._id}`}
          size="small" 
          startIcon={<EditIcon fontSize="small" />}
        >
          View Details
        </Button>
        <IconButton 
          size="small" 
          color="error" 
          onClick={() => onDelete(task._id)}
          aria-label="delete"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;