import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler' //for gesture detection and event
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import Food from './Food'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]; //where snake render when game start
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }; //where food render when game start
const GAME_BOUNDS = { xMin: 0, xMax: 32, yMin: 0, yMax: 71 }; //Area of effect
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10; //score increases with 10

export default function Game(): React.JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0)

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

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }; //creating a copy

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }
        if (checkEatsFood(newHead, food, 2)) {
            setSnake([newHead, ...snake]);
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    }

    return (
        <PanGestureHandler onGestureEvent={gestureHandle}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
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