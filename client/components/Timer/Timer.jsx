import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

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
    <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 48, marginBottom: 20 }}>
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