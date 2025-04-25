import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip
} from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SubwayIcon from '@mui/icons-material/Subway';

function TransportSection({ transport }) {
  const { train_stations = [], bus_stops = [], tube_stations = [] } = transport || {};

  // Slice the arrays to get only the nearest 3 (or fewer if less than 3 exist)
  const nearest_train_stations = train_stations.slice(0, 3);
  const nearest_bus_stops = bus_stops.slice(0, 3);
  const nearest_tube_stations = tube_stations.slice(0, 3);

  // Only render the section if there's data for either type
  if (nearest_train_stations.length === 0 && nearest_bus_stops.length === 0 && nearest_tube_stations.length === 0) {
    return null; 
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Nearby Public Transport</Typography>
      
      {nearest_tube_stations.length > 0 && (
        <Box component={Paper} elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SubwayIcon sx={{ mr: 1 }}/> 
            Tube Stations (Nearest {nearest_tube_stations.length})
          </Typography>
          <List dense>
            {nearest_tube_stations.map((station, index) => (
              <ListItem key={`tube-${index}`} disablePadding>
                 <ListItemIcon sx={{ minWidth: 35 }}>
                    <Chip label={`${station.distance}m`} size="small" />
                 </ListItemIcon>
                 <ListItemText 
                    primary={station.name}
                    secondary={station.lines?.length > 0 ? `Lines: ${station.lines.join(', ')}` : ''}
                  />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {nearest_train_stations.length > 0 && (
        <Box component={Paper} elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TrainIcon sx={{ mr: 1 }}/> 
            Train Stations (Nearest {nearest_train_stations.length})
          </Typography>
          <List dense>
            {nearest_train_stations.map((station, index) => (
              <ListItem key={`train-${index}`} disablePadding>
                 <ListItemIcon sx={{ minWidth: 35 }}>
                    <Chip label={`${station.distance}m`} size="small" />
                 </ListItemIcon>
                 <ListItemText 
                    primary={station.name}
                    secondary={station.description}
                  />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {nearest_bus_stops.length > 0 && (
         <Box component={Paper} elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsBusIcon sx={{ mr: 1 }} /> 
            Bus Stops (Nearest {nearest_bus_stops.length})
          </Typography>
          <List dense>
            {nearest_bus_stops.map((stop, index) => (
               <ListItem key={`bus-${index}`} disablePadding>
                 <ListItemIcon sx={{ minWidth: 35 }}>
                    <Chip label={`${stop.distance}m`} size="small" />
                 </ListItemIcon>
                 <ListItemText 
                    primary={stop.name} 
                    secondary={stop.description}
                 />
              </ListItem>
            ))}
          </List>
         </Box>
      )}
      {/* TODO: Add details about routes/frequencies if API provides later */}
    </Box>
  );
}

export default TransportSection; 