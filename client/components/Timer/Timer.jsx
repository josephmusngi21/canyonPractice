import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Timer() {
    const [time, setTime] = useState(0.00);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        let interval;
        if (pressed) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 0.01);
            }, 10);
        } else if (!pressed && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [pressed]);

    const onStart = () => {
        setPressed(true);
        console.log('Button clicked');
    };

    const onEnd = () => {
        setPressed(false);
        console.log('Button clicked');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {time.toFixed(2)}s
            </Text>
            {!pressed && <Button onPress={onStart} title="Start" />}
            {pressed && (
                <>
                    <Button onPress={onEnd} title="End" />
                </>
            )}
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