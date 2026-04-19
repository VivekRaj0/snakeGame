import { StyleSheet, View } from "react-native";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";

interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): React.JSX.Element {
    return (
        <>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {

                }
                return <View key={index} style={[styles.snake, segmentStyle]}/>
            })}
        </>
    )
}

const styles = StyleSheet.create({
    snake: {
        height: 15,
        width: 15,
        borderRadius:7,
        backgroundColor: Colors.primary,
        position:'absolute',
    }
})