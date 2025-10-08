import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { targetDate: string };

export default function CountdownTimer({ targetDate }: Props) {
const [days, setDays] = React.useState<number>(0);

React.useEffect(() => {
function tick() {
const now = Date.now();
const target = new Date(targetDate).getTime();
const diff = Math.max(0, target - now);
setDays(Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
tick();
const id = setInterval(tick, 60 * 60 * 1000);
return () => clearInterval(id);
}, [targetDate]);

return (
<View style={styles.container}>
<Text style={styles.number}>{days}</Text>
<Text>days left</Text>
</View>
);
}

const styles = StyleSheet.create({
container: { alignItems: "center" },
number: { fontSize: 42, fontWeight: "700" }
});

