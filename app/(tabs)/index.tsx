import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit'; // Import PieChart
import { Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg'; // Import SVG for custom drawing

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [21, 17, 12, 20, 22, 10],
    }
  ]
};

// Calculate the average value
const average = data.datasets[0].data.reduce((a, b) => a + b) / data.datasets[0].data.length;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  fillShadowGradient: '#4287f5',
  fillShadowGradientOpacity: 2,
  useShadowColorFromDataset: false,
};

const pieData = data.labels.map((label, index) => ({
  name: label,
  population: data.datasets[0].data[index],
  color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  legendFontColor: "#7F7F7F",
  legendFontSize: 15
}));
 
const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name of Organization</Text>
        <Text style={styles.location}>Location.....</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Attendance Insights</Text>
        <View style={styles.row}>
          <Text style={styles.attendanceText}>Present Today</Text>
          <Text style={styles.attendanceNumber}>10</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <Text style={styles.chartLabel}>Attendance Over the Months</Text>

          <BarChart
            data={data}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true} // Ensure the bars start from zero
            showValuesOnTopOfBars={true} // Display values on top of bars
          />
          
          {/* Custom SVG for average line */}
          <Svg
            height="220" // Same height as the chart
            width={screenWidth * 0.9} // Same width as the chart
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {/* Red line at the average value */}
            <Line
              x1="0"
              y1={(1 - average / Math.max(...data.datasets[0].data)) * 500} // Correct height
              x2={screenWidth * 0.9}
              y2={(1 - average / Math.max(...data.datasets[0].data)) * 500} // Correct height
              stroke="red"
              strokeWidth="2"
            />
          </Svg>

          {/* Add "Details" button below the chart */}
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerChart}>
        <Text style={styles.footerChartLabel}>Attendance Breakdown</Text>
        <PieChart
          data={pieData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Make sure the chart is sized correctly
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingTop: 30, // Add space from the top
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    color: 'gray',
    marginTop: 5,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  attendanceText: {
    fontSize: 16,
    color: '#333',
  },
  attendanceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  viewButton: {
    backgroundColor: '#ffeb3b',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  chart: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  chartLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
     fontWeight: 'bold'
  },
  detailsButton: {
    backgroundColor: '#4287f5',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15, // Space between chart and button
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerChart: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20, // Space from the bottom
  },
  footerChartLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 30,
     fontWeight: 'bold'
  },
});

export default App;
