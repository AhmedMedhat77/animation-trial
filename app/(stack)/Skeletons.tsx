import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Skeleton from "@/components/skeleton/Skeleton";

const skeletons = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Card 1 - With Glow Effect */}
        <View style={styles.card}>
          <Skeleton variant="image" width="100%" height={120} color="blue" glowEffect={true} />
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Skeleton variant="circle" width={40} height={40} color="blue" glowEffect={true} />
              <View style={styles.textContainer}>
                <Skeleton variant="text" width={120} height={16} color="blue" glowEffect={true} />
                <Skeleton variant="text" width={80} height={12} color="blue" />
              </View>
            </View>
            <Skeleton variant="text" width="100%" height={14} color="blue" />
            <Skeleton variant="text" width="80%" height={14} color="blue" />
            <Skeleton variant="text" width="60%" height={14} color="blue" />
          </View>
        </View>

        {/* Card 2 - Purple Glow */}
        <View style={styles.card}>
          <Skeleton variant="image" width="100%" height={120} color="purple" glowEffect={true} />
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Skeleton variant="circle" width={40} height={40} color="purple" glowEffect={true} />
              <View style={styles.textContainer}>
                <Skeleton variant="text" width={100} height={16} color="purple" glowEffect={true} />
                <Skeleton variant="text" width={90} height={12} color="purple" />
              </View>
            </View>
            <Skeleton variant="text" width="100%" height={14} color="purple" />
            <Skeleton variant="text" width="70%" height={14} color="purple" />
          </View>
        </View>

        {/* Card 3 - Green Glow */}
        <View style={styles.card}>
          <Skeleton variant="image" width="100%" height={120} color="green" glowEffect={true} />
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Skeleton variant="circle" width={40} height={40} color="green" glowEffect={true} />
              <View style={styles.textContainer}>
                <Skeleton variant="text" width={110} height={16} color="green" glowEffect={true} />
                <Skeleton variant="text" width={70} height={12} color="green" />
              </View>
            </View>
            <Skeleton variant="text" width="100%" height={14} color="green" />
            <Skeleton variant="text" width="85%" height={14} color="green" />
            <Skeleton variant="text" width="50%" height={14} color="green" />
          </View>
        </View>

        {/* Card 4 - Mixed Effects */}
        <View style={styles.card}>
          <Skeleton variant="image" width="100%" height={120} />
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Skeleton variant="circle" width={40} height={40} />
              <View style={styles.textContainer}>
                <Skeleton variant="text" width={100} height={16} />
                <Skeleton variant="text" width={80} height={12} />
              </View>
            </View>
            <Skeleton variant="text" width="100%" height={14} />
            <Skeleton variant="text" width="75%" height={14} />
            <Skeleton variant="text" width="60%" height={14} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default skeletons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
});
