import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles';

const TransportSectionPdf = ({ transport }) => {
  const { train_stations = [], bus_stops = [], tube_stations = [] } = transport || {};

  // Slice to get nearest 3
  const nearest_train = train_stations.slice(0, 3);
  const nearest_bus = bus_stops.slice(0, 3);
  const nearest_tube = tube_stations.slice(0, 3);

  if (nearest_train.length === 0 && nearest_bus.length === 0 && nearest_tube.length === 0) {
    return null;
  }

  // Helper to render list items
  const renderListItem = (item, index, type) => {
    let details = '';
    if (type === 'tube' && item.lines?.length > 0) {
      details = `Lines: ${item.lines.join(', ')}`;
    } else if (type === 'train' || type === 'bus') {
      details = item.description || '';
    }

    return (
      <View key={`${type}-${index}`} style={{ flexDirection: 'row', marginBottom: 5 }}>
        <Text style={{ width: 45, fontSize: 10, fontWeight: 'bold', marginRight: 5 }}>{`${item.distance}m:`}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{item.name}</Text>
          {details && (
            <Text style={{ fontSize: 10, color: '#555555' }}>{details}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.h3}>Nearby Public Transport</Text>

      {nearest_tube.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={globalStyles.h4}>Tube Stations (Nearest {nearest_tube.length})</Text>
           <View style={globalStyles.listContainer}> {/* Assumes listContainer adds appropriate margin/padding */}
             {nearest_tube.map((station, index) => renderListItem(station, index, 'tube'))}
          </View>
        </View>
      )}

      {nearest_train.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={globalStyles.h4}>Train Stations (Nearest {nearest_train.length})</Text>
           <View style={globalStyles.listContainer}>
             {nearest_train.map((station, index) => renderListItem(station, index, 'train'))}
          </View>
        </View>
      )}

      {nearest_bus.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={globalStyles.h4}>Bus Stops (Nearest {nearest_bus.length})</Text>
          <View style={globalStyles.listContainer}>
            {nearest_bus.map((stop, index) => renderListItem(stop, index, 'bus'))}
          </View>
        </View>
      )}
    </View>
  );
};

export default TransportSectionPdf; 