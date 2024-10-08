import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Home = () => {
  // State to hold WebSocket data
  const [webSocketData, setWebSocketData] = useState('Waiting for data...');

  useEffect(() => {
    // Use your IP address here
    const ws = new WebSocket('ws://192.168.56.1:8080');

    ws.onopen = () => { 
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      console.log('Received data:', event.data);
      setWebSocketData(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  // Example progress values
  const calorieProgress = 0.6;
  const distanceProgress = 0.4;
  const stepsProgress = 0.8;
  const newProgress = 0.75;
  const heartRateProgress = 0.7;

  const colors = {
    background: '#000000',
    sectionBackground: '#1D1D1D',
    text: '#FFFFFF',
    label: '#B0B0B0',
    newSectionBackground: '#1D1D1D',
    newSectionFill: '#4CAF50',
    heartRateBackground: '#1D1D1D',
    heartRateTint: '#FF3B30',
  };

  return (
    <View style={styles.container}>
      <View style={styles.verticalContainer}>
        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.activitySection}>
            <View style={styles.progressRow}>
              {['Calories', 'Distance', 'Steps'].map((metric, index) => (
                <View key={metric} style={styles.progressContainer}>
                  <AnimatedCircularProgress
                    size={100}
                    width={10}
                    fill={index === 0 ? calorieProgress * 100 : index === 1 ? distanceProgress * 100 : stepsProgress * 100}
                    tintColor={colors.heartRateTint}
                    backgroundColor={colors.sectionBackground}
                  >
                    {fill => (
                      <View style={styles.textContainer}>
                        <Text style={styles.progressText}>{Math.round(fill)}%</Text>
                        <Text style={styles.labelText}>{metric}</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Heart Rate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heart Rate</Text>
          <View style={styles.heartRateSection}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={heartRateProgress * 100}
              tintColor={colors.heartRateTint}
              backgroundColor={colors.heartRateBackground}
            >
              {fill => (
                <View style={styles.textContainer}>
                  <Text style={styles.progressText}>{Math.round(fill)}</Text>
                  <Text style={styles.labelText}>Heart Rate</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>

        {/* New Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal</Text>
          <View style={styles.newSection}>
            <View style={styles.linearProgressBarContainer}>
              <View style={[styles.linearProgressBarFill, { width: `${newProgress * 100}%` }]} />
            </View>
            <Text style={styles.newSectionContent}>Progress Made: {Math.round(newProgress * 100)}%</Text>
          </View>
        </View>
      </View>

      {/* Display WebSocket Data */}
      <View style={styles.webSocketDataContainer}>
        <Text style={styles.webSocketDataText}>{webSocketData}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
  },
  section: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: '#1D1D1D',
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  activitySection: {
    paddingVertical: 10,
    flex: 1,
  },
  heartRateSection: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  progressContainer: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  newSection: {
    paddingVertical: 10,
    flex: 1,
  },
  linearProgressBarContainer: {
    height: 20,
    backgroundColor: '#B0B0B0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  linearProgressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  newSectionContent: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  webSocketDataContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1D1D1D',
    padding: 5,
    borderRadius: 5,
  },
  webSocketDataText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default Home;
