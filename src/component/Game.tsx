import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler' //for gesture detection and event
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]; //where snake render when game start
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }; //where food render when game start
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 35 }; //Area of effect
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10; //score increases with 10

export default function Game(): React.JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, useFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);

    const gestureHandle = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //Right-when we move our finger on screen from right to left we are moving in x-axis in positive side
                setDirection(Direction.Right)
            } else {
                //Left-when we move our finger on screen from left to right we are moving in x-axis in negative side
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                //Down-when we move our finger on screen from top to down we are moving in y-axis in positive side
                setDirection(Direction.Down)
            } else {
                //Up-when we move our finger on screen from down to up we are moving in x-axis in negative side
                setDirection(Direction.Up)
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={gestureHandle}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    }
})