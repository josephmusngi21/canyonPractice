import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Timer() {
    // State to keep track of the elapsed time
    const [time, setTime] = useState(0.00);
    // State to keep track of whether the timer is running or not
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        let interval;
        if (pressed) {
            // If the timer is running, set an interval to update the time every 10 milliseconds
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 0.01);
            }, 10);
        } else {
            // If the timer is stopped, clear the interval
            clearInterval(interval);
        }
        // Cleanup the interval on component unmount or when pressed changes
        return () => clearInterval(interval);
    }, [pressed]);

    // Function to start the timer
    const onStart = () => {
        setPressed(true);
        console.log('Start button clicked');
    };

    // Function to stop the timer
    const onEnd = () => {
        setPressed(false);
        console.log('Stop button clicked');
    };

    // Function to reset the timer
    const onReset = () => {
        setPressed(false);
        setTime(0.00);
        console.log('Reset button clicked');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {time.toFixed(2)}s
            </Text>
            {!pressed && <Button onPress={onStart} title="Start" />}
            {pressed && <Button onPress={onEnd} title="Stop" />}
            <Button onPress={onReset} title="Reset" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    timerText: {
        fontSize: 48,
        marginBottom: 20
    }
});
