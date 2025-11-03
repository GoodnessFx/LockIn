import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const FilterModal = ({ visible, onClose, onApplyFilters, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    showOnlineOnly: !!currentFilters.showOnlineOnly,
    minStreak: currentFilters.minStreak ?? 0,
  });

  const apply = () => {
    onApplyFilters?.(filters);
    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Filters</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Online only</Text>
            <Switch value={filters.showOnlineOnly} onValueChange={(v) => setFilters({ ...filters, showOnlineOnly: v })} />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.apply]} onPress={apply}>
              <Text style={[styles.buttonText, styles.applyText]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: '#222',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#f0f0f0',
  },
  apply: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  applyText: {
    color: '#fff',
  },
});

export default FilterModal;